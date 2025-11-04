import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { darshanBookingSchema } from '@/lib/validations/darshan-booking-new';
import { render } from '@react-email/render';
import DarshanBookingEmail from '@/emails/DarshanBookingEmail';

// Note: Runtime is automatically edge on Cloudflare Workers

// Generate unique booking ID
function generateBookingId(): string {
  const year = new Date().getFullYear();
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `DRS-${year}-${timestamp.toString().slice(-6)}${random}`;
}

// Format date for email display
function formatDateForEmail(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate form data
    const validatedData = darshanBookingSchema.parse(body);

    // Generate booking ID
    const bookingId = generateBookingId();

    // Format date for email
    const formattedDate = formatDateForEmail(validatedData.preferredDate);

    // Prepare email data
    const emailData = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      preferredDate: formattedDate,
      preferredTime: validatedData.preferredTime,
      numberOfPeople: validatedData.numberOfPeople,
      bookingType: validatedData.bookingType,
      bookingId,
      specialRequests: validatedData.specialRequests,
      wheelchairAccess: validatedData.wheelchairAccess,
    };

    // Send confirmation email to user
    // Render user confirmation email
    const userEmailHtml = await render(DarshanBookingEmail(emailData));
    const userEmailText = generatePlainText(emailData);

    console.log('Sending user confirmation email to:', validatedData.email);
    const userEmailResult = await sendEmail({
      to: validatedData.email,
      subject: `Darshan Booking Confirmed - ${formattedDate}`,
      html: userEmailHtml,
      text: userEmailText,
      apiKey: process.env.ZEPTOMAIL_API_KEY || '',
      fromEmail: process.env.ZEPTOMAIL_FROM_EMAIL || '',
      fromName: process.env.ZEPTOMAIL_FROM_NAME || 'Tridhara Mandir',
    });

    if (!userEmailResult.success) {
      console.error('Failed to send user confirmation email:', userEmailResult.message);
    } else {
      console.log('User confirmation email sent successfully to:', validatedData.email);
    }

    // Send admin notification email
    const adminEmailHtml = generateAdminNotificationHtml(emailData);
    const adminEmailText = generateAdminNotificationText(emailData);

    const adminEmail = process.env.ZEPTOMAIL_TO_EMAIL || 'info@tridharamandir.com';
    console.log('Sending admin notification email to:', adminEmail);
    const adminEmailResult = await sendEmail({
      to: adminEmail,
      subject: `New Darshan Booking Request - ${bookingId}`,
      html: adminEmailHtml,
      text: adminEmailText,
      apiKey: process.env.ZEPTOMAIL_API_KEY || '',
      fromEmail: process.env.ZEPTOMAIL_FROM_EMAIL || '',
      fromName: process.env.ZEPTOMAIL_FROM_NAME || 'Tridhara Mandir',
      replyTo: {
        email: validatedData.email,
        name: validatedData.name,
      },
    });

    if (!adminEmailResult.success) {
      console.error('Failed to send admin notification email:', adminEmailResult.message);
    } else {
      console.log('Admin notification email sent successfully to:', adminEmail);
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Darshan booking submitted successfully',
        bookingId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing darshan booking:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid form data',
          details: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: 'Failed to process darshan booking',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

// Helper function to send email via ZeptoMail
async function sendEmail({
  to,
  subject,
  html,
  text,
  apiKey,
  fromEmail,
  fromName,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
  apiKey: string;
  fromEmail: string;
  fromName: string;
  replyTo?: { email: string; name: string };
}): Promise<{ success: boolean; message: string }> {
  try {
    const payload = {
      from: {
        address: fromEmail,
        name: fromName,
      },
      to: [
        {
          email_address: {
            address: to,
            name: '',
          },
        },
      ],
      subject,
      htmlbody: html,
      textbody: text,
      ...(replyTo && {
        reply_to: [
          {
            address: replyTo.email,
            name: replyTo.name,
          },
        ],
      }),
    };

    const response = await fetch('https://api.zeptomail.in/v1.1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('ZeptoMail API Error:', errorData);
      throw new Error(`ZeptoMail API error: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('ZeptoMail API Response:', responseData);

    return {
      success: true,
      message: 'Email sent successfully',
    };
  } catch (error) {
    console.error('Error sending email via ZeptoMail:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}

// Generate plain text version of user confirmation email
function generatePlainText(data: {
  name: string;
  bookingId: string;
  preferredDate: string;
  preferredTime: string;
  numberOfPeople: number;
  bookingType: string;
  wheelchairAccess?: boolean;
  specialRequests?: string;
}): string {
  return `
Darshan Booking Confirmed

Namaste ${data.name},

Your darshan booking at Tridhara Milan Mandir has been confirmed.

Booking ID: ${data.bookingId}
Please keep this for your records

Your Booking Details:
- Preferred Date: ${data.preferredDate}
- Preferred Time: ${data.preferredTime}
- Number of People: ${data.numberOfPeople} ${data.numberOfPeople === 1 ? 'person' : 'people'}
- Booking Type: ${data.bookingType}
${data.wheelchairAccess ? '- Accessibility: Wheelchair Access Requested\n' : ''}
${data.specialRequests ? `\nYour Special Requests:\n${data.specialRequests}\n\nWe have noted your requirements and will do our best to accommodate them.\n` : ''}
Important Information:
- This is a booking request. Our team will contact you to confirm the exact time
- Please arrive 15 minutes before your preferred time slot
- Bring this confirmation email (digital or printed)
- Temple dress code: Traditional/modest attire recommended
- Footwear must be removed before entering the main hall
- Photography is allowed during appropriate times

Temple Timings:
Monday - Friday: 5:00 AM - 9:00 PM
Saturday - Sunday: 5:00 AM - 9:30 PM

Need to modify your booking or have questions?
Phone: +91 96091 75202
Email: info@tridharamandir.com

Address: Tridhara Milan Mandir Road, Panchmura, West Bengal 722156
From Bishnupur: 30 km by road (45 minutes)
From Bankura: 45 km by road (1 hour)

May your visit to Tridhara Milan Mandir bring you peace, blessings, and spiritual fulfillment.

With devotion and service,
Tridhara Milan Mandir Team
  `.trim();
}

// Generate admin notification email HTML
function generateAdminNotificationHtml(data: {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  numberOfPeople: number;
  bookingType: string;
  bookingId: string;
  wheelchairAccess?: boolean;
  specialRequests?: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Darshan Booking</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #452937 0%, #1B0A2C 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
      <h1 style="color: #E5B76A; margin: 0; font-size: 24px;">🙏 New Darshan Booking Request</h1>
    </div>

    <div style="background-color: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #f0fdf4; border: 2px solid #86efac; border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: center;">
        <p style="color: #166534; font-size: 14px; font-weight: 600; margin: 0 0 8px 0; text-transform: uppercase;">Booking ID</p>
        <p style="color: #15803d; font-size: 24px; font-weight: 700; margin: 0; font-family: monospace;">${data.bookingId}</p>
      </div>

      <h2 style="color: #452937; font-size: 18px; margin: 0 0 20px 0;">Visitor Details</h2>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Name</td>
          <td style="padding: 12px 0; color: #374151; font-size: 14px; font-weight: 600; text-align: right;">${data.name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Email</td>
          <td style="padding: 12px 0; color: #374151; font-size: 14px; font-weight: 600; text-align: right;">
            <a href="mailto:${data.email}" style="color: #A96842; text-decoration: none;">${data.email}</a>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Phone</td>
          <td style="padding: 12px 0; color: #374151; font-size: 14px; font-weight: 600; text-align: right;">
            <a href="tel:${data.phone}" style="color: #A96842; text-decoration: none;">${data.phone}</a>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Preferred Date</td>
          <td style="padding: 12px 0; color: #374151; font-size: 14px; font-weight: 600; text-align: right;">${data.preferredDate}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Preferred Time</td>
          <td style="padding: 12px 0; color: #374151; font-size: 14px; font-weight: 600; text-align: right;">${data.preferredTime}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Number of People</td>
          <td style="padding: 12px 0; color: #374151; font-size: 14px; font-weight: 600; text-align: right;">${data.numberOfPeople}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Booking Type</td>
          <td style="padding: 12px 0; color: #374151; font-size: 14px; font-weight: 600; text-align: right;">${data.bookingType}</td>
        </tr>
        ${data.wheelchairAccess ? `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Accessibility</td>
          <td style="padding: 12px 0; color: #374151; font-size: 14px; font-weight: 600; text-align: right;">♿ Wheelchair Access</td>
        </tr>
        ` : ''}
      </table>

      ${data.specialRequests ? `
      <div style="background-color: #eff6ff; border: 1px solid #93c5fd; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="color: #1e40af; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">Special Requests:</p>
        <p style="color: #1e3a8a; font-size: 14px; margin: 0; line-height: 1.6;">${data.specialRequests}</p>
      </div>
      ` : ''}

      <div style="background-color: #fef3c7; border: 1px solid #fde047; border-radius: 8px; padding: 16px; margin-top: 24px;">
        <p style="color: #92400e; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">⚠️ Action Required:</p>
        <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.6;">
          Please contact the visitor within 24 hours to confirm the darshan time and provide any additional instructions.
        </p>
      </div>
    </div>

    <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
      <p style="margin: 0;">Tridhara Milan Mandir</p>
      <p style="margin: 4px 0;">Tridhara Milan Mandir Road, Panchmura, West Bengal 722156</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Generate admin notification email plain text
function generateAdminNotificationText(data: {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  numberOfPeople: number;
  bookingType: string;
  bookingId: string;
  wheelchairAccess?: boolean;
  specialRequests?: string;
}): string {
  return `
New Darshan Booking Request

Booking ID: ${data.bookingId}

Visitor Details:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}
- Preferred Date: ${data.preferredDate}
- Preferred Time: ${data.preferredTime}
- Number of People: ${data.numberOfPeople}
- Booking Type: ${data.bookingType}
${data.wheelchairAccess ? '- Accessibility: Wheelchair Access Requested\n' : ''}
${data.specialRequests ? `\nSpecial Requests:\n${data.specialRequests}\n` : ''}
ACTION REQUIRED:
Please contact the visitor within 24 hours to confirm the darshan time and provide any additional instructions.

---
Tridhara Milan Mandir
Tridhara Milan Mandir Road, Panchmura, West Bengal 722156
  `.trim();
}
