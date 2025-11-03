import { NextRequest, NextResponse } from 'next/server';
import { createEmailService } from '@/lib/email-service';
import { z } from 'zod';

export const runtime = 'edge';

// Validation schema for event registration
const eventRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  eventSlug: z.string(), // e.g., 'janmashtami', 'rath-yatra'
  eventName: z.string(),
  eventDate: z.string(),
  eventTime: z.string(),
  numberOfAttendees: z.number().min(1).max(50).default(1),
  specialRequests: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = eventRegistrationSchema.parse(body);

    // Generate unique registration ID
    const registrationId = `EVT-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Create email service
    const emailService = createEmailService();

    // Send confirmation email to attendee
    const confirmationResult = await emailService.sendEventRegistrationEmail({
      attendeeName: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      eventName: validatedData.eventName,
      eventDate: validatedData.eventDate,
      eventTime: validatedData.eventTime,
      eventLocation: 'Tridhara Milan Mandir Main Hall',
      eventDescription: `Join us for ${validatedData.eventName} at Tridhara Milan Mandir.`,
      registrationId,
      numberOfAttendees: validatedData.numberOfAttendees,
      specialRequests: validatedData.specialRequests,
    });

    if (!confirmationResult.success) {
      console.error('Failed to send confirmation email:', confirmationResult.message);
      return NextResponse.json(
        { error: 'Failed to send confirmation email. Please contact us directly.' },
        { status: 500 }
      );
    }

    // TODO: Store registration in database (optional)
    // await db.eventRegistrations.insert({
    //   registrationId,
    //   ...validatedData,
    //   createdAt: new Date(),
    // });

    return NextResponse.json(
      {
        success: true,
        message: 'Registration confirmed! Check your email for details.',
        registrationId,
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

    console.error('Error in event registration API route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
