import { z } from "zod";

export const eventRegistrationFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[+]?[0-9\s()-]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  eventSlug: z
    .string()
    .min(1, "Please select an event"),
  eventName: z
    .string()
    .min(1, "Event name is required"),
  eventDate: z
    .string()
    .min(1, "Event date is required"),
  eventTime: z
    .string()
    .min(1, "Event time is required"),
  numberOfAttendees: z
    .number()
    .min(1, "At least 1 attendee is required")
    .max(50, "Maximum 50 attendees allowed. For larger groups, please contact us directly."),
  specialRequests: z
    .string()
    .max(500, "Special requests must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

export type EventRegistrationFormData = z.infer<typeof eventRegistrationFormSchema>;
