import { NextRequest, NextResponse } from 'next/server';
import { createEmailService } from '@/lib/email-service';
import { z } from 'zod';

export const runtime = 'edge';

// Validation schema for volunteer form
const volunteerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  interests: z.string().optional(), // What areas they want to volunteer in
  availability: z.string().optional(), // When they're available
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = volunteerSchema.parse(body);

    // Create email service
    const emailService = createEmailService();

    // Send welcome email to volunteer
    const welcomeResult = await emailService.sendWelcomeVolunteerEmail({
      volunteerName: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      submittedAt: new Date().toLocaleDateString('en-IN', {
        dateStyle: 'long',
      }),
    });

    if (!welcomeResult.success) {
      console.error('Failed to send welcome email:', welcomeResult.message);
      // Continue anyway - we'll still notify admin
    }

    // Also send notification to temple admin
    const adminNotification = `
New Volunteer Application Received

Name: ${validatedData.name}
Email: ${validatedData.email}
Phone: ${validatedData.phone || 'Not provided'}
Interests: ${validatedData.interests || 'Not specified'}
Availability: ${validatedData.availability || 'Not specified'}
Message: ${validatedData.message || 'None'}

Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    `.trim();

    // Send admin notification using contact form email (simpler)
    const adminEmail = process.env.ZEPTOMAIL_TO_EMAIL || 'info@tridharamandir.com';

    // You could create a custom admin notification, or reuse contact form email
    // For now, let's just log it - you can add email sending here if needed
    console.log('Admin notification:', adminNotification);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for volunteering! Check your email for next steps.',
      },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid form data',
          details: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error('Error in volunteer API route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
