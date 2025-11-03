import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase(),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // Optional field
        // Indian phone number format: +91 XXXXX XXXXX or 10 digits
        return /^(\+91[-\s]?)?[6-9]\d{9}$/.test(val.replace(/\s/g, ''));
      },
      'Please enter a valid Indian phone number'
    ),

  inquiryType: z.enum([
    'General Inquiry',
    'Service Booking',
    'Donation/Seva',
    'Volunteer Application',
    'Guest House Booking',
    'Event Information',
  ], {
    message: 'Please select an inquiry type',
  }),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),

  preferredContact: z
    .enum(['Email', 'Phone', 'WhatsApp'])
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
