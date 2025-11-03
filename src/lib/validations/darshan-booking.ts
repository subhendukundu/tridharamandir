import { z } from 'zod';

// For select fields, we need to accept empty string and refine it
const requiredSelect = (fieldName: string) =>
  z.string().refine((val) => val !== '', {
    message: `Please select ${fieldName}`,
  });

export const darshanBookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),

  email: z.string().min(1, 'Email is required').email('Please enter a valid email address').toLowerCase(),

  phone: z.string().min(1, 'Phone number is required').refine(
    (val) => {
      // Indian phone number format: +91 XXXXX XXXXX or 10 digits
      return /^(\+91[-\s]?)?[6-9]\d{9}$/.test(val.replace(/\s/g, ''));
    },
    'Please enter a valid Indian phone number'
  ),

  preferredDate: z.string().min(1, 'Please select a preferred date'),

  preferredTime: requiredSelect('a preferred time slot'),

  numberOfPeople: z.number().min(1, 'At least 1 person required').max(50, 'Maximum 50 people per booking'),

  bookingType: requiredSelect('booking type'),

  specialRequests: z.string().max(500, 'Special requests must be less than 500 characters').optional(),

  wheelchairAccess: z.boolean().optional(),
});

export type DarshanBookingData = z.infer<typeof darshanBookingSchema>;
