"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { volunteerFormSchema, type VolunteerFormData } from "@/lib/validations/volunteer-form";
import { InputField, TextareaField, SelectField } from "./FormField";
import { Button } from "@/components/ui/Button";
import clsx from "clsx";
import { trackFormError } from "@/lib/analytics";

type VolunteerFormProps = {
  tone?: "light" | "dark";
  className?: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const interestOptions = [
  { value: "", label: "Select an area of interest" },
  { value: "temple-services", label: "Temple Services (Puja, Aarti, Decoration)" },
  { value: "community-outreach", label: "Community Outreach & Events" },
  { value: "guest-services", label: "Guest Services & Hospitality" },
  { value: "administrative", label: "Administrative Support" },
  { value: "maintenance", label: "Temple Maintenance & Cleaning" },
  { value: "kitchen-prasad", label: "Kitchen & Prasad Distribution" },
  { value: "education", label: "Teaching & Educational Programs" },
  { value: "other", label: "Other (please specify in message)" },
];

export function VolunteerForm({ tone = "light", className }: VolunteerFormProps) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerFormSchema),
  });

  const onSubmit = async (data: VolunteerFormData) => {
    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit application");
      }

      setSubmitStatus("success");
      reset(); // Clear form

      // Reset success message after 8 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 8000);
    } catch (error) {
      console.error("Error submitting volunteer form:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit application. Please try again."
      );

      // Track form error in GA
      trackFormError({
        formName: "volunteer_application",
        errorField: "submission",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <InputField
          {...register("name")}
          id="name"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          error={errors.name}
          tone={tone}
          required
        />

        {/* Email Field */}
        <InputField
          {...register("email")}
          id="email"
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          error={errors.email}
          tone={tone}
          required
        />

        {/* Phone Field */}
        <InputField
          {...register("phone")}
          id="phone"
          label="Phone Number"
          type="tel"
          placeholder="+91 98765 43210"
          error={errors.phone}
          tone={tone}
        />

        {/* Area of Interest */}
        <SelectField
          {...register("interests")}
          id="interests"
          label="Area of Interest"
          error={errors.interests}
          tone={tone}
          required
        >
          {interestOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>

        {/* Availability */}
        <TextareaField
          {...register("availability")}
          id="availability"
          label="Availability"
          placeholder="Please describe your availability (e.g., weekends, weekday evenings, specific days, hours per week)"
          rows={4}
          error={errors.availability}
          tone={tone}
          required
          helpText="Tell us when you're available to volunteer"
        />

        {/* Message */}
        <TextareaField
          {...register("message")}
          id="message"
          label="Additional Message"
          placeholder="Tell us why you'd like to volunteer and any relevant experience"
          rows={5}
          error={errors.message}
          tone={tone}
          helpText="Optional: Share your motivation and any skills you bring"
        />

        {/* Privacy Notice */}
        <p className={clsx(
          "text-xs",
          tone === "light" ? "text-neutral-600" : "text-neutral-400"
        )}>
          By submitting this form, you agree to our privacy policy. We'll use your
          information only to coordinate volunteer activities.
        </p>

        {/* Submit Button */}
        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting || submitStatus === "success"}
          >
            {isSubmitting
              ? "Submitting..."
              : submitStatus === "success"
              ? "Application Submitted! ✓"
              : "Submit Application"}
          </Button>

          {/* Success Message */}
          {submitStatus === "success" && (
            <div
              role="alert"
              className={clsx(
                "rounded-xl p-4 text-center",
                "bg-green-50 text-green-800 border border-green-200",
                "dark:bg-green-900/20 dark:text-green-200 dark:border-green-800"
              )}
            >
              <p className="font-semibold">Thank you for volunteering! 🙏</p>
              <p className="text-sm mt-1">
                We've sent a confirmation email with next steps. We'll contact you soon!
              </p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === "error" && errorMessage && (
            <div
              role="alert"
              className={clsx(
                "rounded-xl p-4 text-center",
                "bg-red-50 text-red-800 border border-red-200",
                "dark:bg-red-900/20 dark:text-red-200 dark:border-red-800"
              )}
            >
              <p className="font-semibold">⚠️ Submission Failed</p>
              <p className="text-sm mt-1">{errorMessage}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
