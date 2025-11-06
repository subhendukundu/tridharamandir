import { z } from "zod";

export const volunteerFormSchema = z.object({
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
  interests: z
    .string()
    .min(1, "Please select at least one area of interest"),
  availability: z
    .string()
    .min(10, "Please provide your availability details (at least 10 characters)")
    .max(500, "Availability details must be less than 500 characters"),
  message: z
    .string()
    .max(1000, "Message must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;
