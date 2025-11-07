"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  eventRegistrationFormSchema,
  type EventRegistrationFormData,
} from "@/lib/validations/event-registration-form";
import { InputField, TextareaField, SelectField } from "./FormField";
import { Button } from "@/components/ui/Button";
import clsx from "clsx";
import { trackFormError } from "@/lib/analytics";
import { eventsContent } from "@/data/events";

type EventRegistrationFormProps = {
  tone?: "light" | "dark";
  className?: string;
  defaultEventSlug?: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function EventRegistrationForm({
  tone = "light",
  className,
  defaultEventSlug,
}: EventRegistrationFormProps) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [registrationId, setRegistrationId] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EventRegistrationFormData>({
    resolver: zodResolver(eventRegistrationFormSchema),
    defaultValues: {
      eventSlug: defaultEventSlug || "",
      numberOfAttendees: 1,
    },
  });

  // Watch selected event to update hidden fields
  const selectedEventSlug = watch("eventSlug");
  const selectedEvent = eventsContent.find((e) => e.slug === selectedEventSlug);

  // Update hidden fields when event is selected
  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    const event = eventsContent.find((ev) => ev.slug === slug);

    if (event) {
      setValue("eventSlug", slug);
      setValue("eventName", event.name);
      setValue("eventDate", event.startDate);
      setValue("eventTime", event.timetable[0]?.time || "All day");
    }
  };

  const eventOptions = [
    { value: "", label: "Select an event" },
    ...eventsContent.map((event) => ({
      value: event.slug,
      label: `${event.name} (${new Date(event.startDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })})`,
    })),
  ];

  const onSubmit = async (data: EventRegistrationFormData) => {
    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/event-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to register for event");
      }

      const result = await response.json();
      setRegistrationId(result.registrationId || "");
      setSubmitStatus("success");
      reset(); // Clear form

      // Reset success message after 10 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
        setRegistrationId("");
      }, 10000);
    } catch (error) {
      console.error("Error submitting event registration:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to register for event. Please try again."
      );

      // Track form error in GA
      trackFormError({
        formName: "event_registration",
        errorField: "submission",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Event Selection */}
        <div>
          <SelectField
            {...register("eventSlug")}
            id="eventSlug"
            label="Select Event"
            error={errors.eventSlug}
            tone={tone}
            required
            onChange={handleEventChange}
          >
            <option value="">Select an event</option>
            {eventOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>

          {/* Show event details when selected */}
          {selectedEvent && (
            <div
              className={clsx(
                "mt-3 p-4 rounded-xl border",
                tone === "light"
                  ? "bg-brand-light/30 border-brand-primary/20"
                  : "bg-brand-dark/30 border-brand-secondary/20"
              )}
            >
              <p className="font-semibold text-brand-primary">{selectedEvent.name}</p>
              <p
                className={clsx(
                  "text-sm mt-1",
                  tone === "light" ? "text-neutral-700" : "text-neutral-300"
                )}
              >
                {selectedEvent.summary}
              </p>
              <div className="flex gap-4 mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                <span>📅 {new Date(selectedEvent.startDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}</span>
                {selectedEvent.timetable[0] && (
                  <span>🕐 {selectedEvent.timetable[0].time}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Hidden fields for API */}
        <input type="hidden" {...register("eventName")} />
        <input type="hidden" {...register("eventDate")} />
        <input type="hidden" {...register("eventTime")} />

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

        {/* Number of Attendees */}
        <InputField
          {...register("numberOfAttendees", { valueAsNumber: true })}
          id="numberOfAttendees"
          label="Number of Attendees"
          type="number"
          min={1}
          max={50}
          placeholder="1"
          error={errors.numberOfAttendees}
          tone={tone}
          required
          helpText="For groups larger than 50, please contact us directly"
        />

        {/* Special Requests */}
        <TextareaField
          {...register("specialRequests")}
          id="specialRequests"
          label="Special Requests"
          placeholder="Any dietary requirements, accessibility needs, or other requests?"
          rows={4}
          error={errors.specialRequests}
          tone={tone}
          helpText="Optional: Let us know if you have any special requirements"
        />

        {/* Privacy Notice */}
        <p
          className={clsx(
            "text-xs",
            tone === "light" ? "text-neutral-600" : "text-neutral-400"
          )}
        >
          By registering, you agree to our privacy policy. We'll use your information
          only to coordinate event participation.
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
              ? "Registering..."
              : submitStatus === "success"
              ? "Registered Successfully! ✓"
              : "Register for Event"}
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
              <p className="font-semibold">Registration Confirmed! 🎉</p>
              {registrationId && (
                <p className="text-sm mt-1 font-mono">
                  Registration ID: {registrationId}
                </p>
              )}
              <p className="text-sm mt-1">
                We've sent a confirmation email with event details. See you there!
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
              <p className="font-semibold">⚠️ Registration Failed</p>
              <p className="text-sm mt-1">{errorMessage}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
