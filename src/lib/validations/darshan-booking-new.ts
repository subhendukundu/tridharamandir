import { z } from 'zod';

/**
 * Darshan Booking Form Validation Schema
 * Built from scratch following React Hook Form best practices
 */

export const darshanBookingSchema = z.object({
  // Text inputs - required
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase(),

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^(\+91[-\s]?)?[6-9]\d{9}$/, 'Please enter a valid Indian phone number'),

  preferredDate: z
    .string()
    .min(1, 'Preferred date is required'),

  // Select dropdowns - use string validation with refine
  preferredTime: z
    .string()
    .min(1, 'Please select a preferred time slot'),

  bookingType: z
    .string()
    .min(1, 'Please select booking type'),

  // Number input
  numberOfPeople: z
    .number()
    .int('Must be a whole number')
    .min(1, 'At least 1 person required')
    .max(50, 'Maximum 50 people per booking'),

  // Optional fields
  specialRequests: z
    .string()
    .max(500, 'Special requests must be less than 500 characters')
    .optional()
    .or(z.literal('')),

  wheelchairAccess: z
    .boolean()
    .optional(),
});

export type DarshanBookingFormData = z.infer<typeof darshanBookingSchema>;
