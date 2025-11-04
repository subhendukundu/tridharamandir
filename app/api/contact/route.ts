import { NextRequest, NextResponse } from 'next/server';
import { ZeptoMailService } from '@/lib/zeptomail';
import { contactFormSchema } from '@/lib/validations/contact-form';
import { z } from 'zod';

// Note: Runtime is automatically edge on Cloudflare Workers

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate form data
    const validatedData = contactFormSchema.parse(body);

    // Get ZeptoMail configuration from environment variables
    const zeptoConfig = {
      apiKey: process.env.ZEPTOMAIL_API_KEY || '',
      fromEmail: process.env.ZEPTOMAIL_FROM_EMAIL || '',
      fromName: process.env.ZEPTOMAIL_FROM_NAME || 'Tridhara Mandir',
      toEmail: process.env.ZEPTOMAIL_TO_EMAIL || 'info@tridharamandir.com',
    };

    // Validate environment variables
    if (!zeptoConfig.apiKey || !zeptoConfig.fromEmail) {
      console.error('Missing ZeptoMail configuration');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact us directly.' },
        { status: 500 }
      );
    }

    // Initialize ZeptoMail service
    const zeptoMail = new ZeptoMailService(zeptoConfig);

    // Send email
    const result = await zeptoMail.sendContactFormEmail(validatedData);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email. Please try again or contact us directly.' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon.',
      },
      { status: 200 }
    );

  } catch (error) {
    // Handle validation errors
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

    // Handle other errors
    console.error('Error in contact API route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Return 405 Method Not Allowed for other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
