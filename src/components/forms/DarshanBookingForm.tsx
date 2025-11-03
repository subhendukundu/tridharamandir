"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { darshanBookingSchema, type DarshanBookingData } from "@/lib/validations/darshan-booking";
import { InputField, TextareaField, SelectField } from "./FormField";
import { Button } from "@/components/ui/Button";
import clsx from "clsx";

type DarshanBookingFormProps = {
  tone?: "light" | "dark";
  className?: string;
  onSuccess?: (bookingId: string) => void;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function DarshanBookingForm({ tone = "light", className, onSuccess }: DarshanBookingFormProps) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [bookingId, setBookingId] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DarshanBookingData>({
    resolver: zodResolver(darshanBookingSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      numberOfPeople: 1,
      bookingType: "",
      specialRequests: "",
      wheelchairAccess: false,
    },
  });

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const onSubmit = async (data: DarshanBookingData) => {
    console.log('Form data before submission:', data);
    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/darshan-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit booking");
      }

      const result = await response.json();
      setBookingId(result.bookingId);
      setSubmitStatus("success");
      reset(); // Clear form

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(result.bookingId);
      }

      // Reset success message after 10 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
        setBookingId("");
      }, 10000);
    } catch (error) {
      console.error("Error submitting booking:", error);
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit booking. Please try again.");
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid gap-6 md:grid-cols-2">
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
        </div>

        {/* Phone Field */}
        <InputField
          {...register("phone")}
          id="phone"
          label="Phone Number"
          type="tel"
          placeholder="+91 98765 43210"
          error={errors.phone}
          tone={tone}
          required
        />

        {/* Date and Time Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <InputField
            {...register("preferredDate")}
            id="preferredDate"
            label="Preferred Date"
            type="date"
            min={getMinDate()}
            error={errors.preferredDate}
            tone={tone}
            required
          />

          <SelectField
            {...register("preferredTime")}
            id="preferredTime"
            label="Preferred Time Slot"
            error={errors.preferredTime}
            tone={tone}
            required
          >
            <option value="">Select a time slot</option>
            <option value="Morning Darshan (6:00 AM - 9:00 AM)">Morning Darshan (6:00 AM - 9:00 AM)</option>
            <option value="Mid-Morning (9:00 AM - 12:00 PM)">Mid-Morning (9:00 AM - 12:00 PM)</option>
            <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
            <option value="Evening Sandhya Arati (5:00 PM - 7:00 PM)">Evening Sandhya Arati (5:00 PM - 7:00 PM)</option>
            <option value="Evening (7:00 PM - 9:00 PM)">Evening (7:00 PM - 9:00 PM)</option>
          </SelectField>
        </div>

        {/* Number of People and Booking Type Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="numberOfPeople"
              className={clsx(
                "text-sm font-semibold block mb-2",
                tone === "light" ? "text-brand-primary/80" : "text-white/90"
              )}
            >
              Number of People <span className="text-red-500">*</span>
            </label>
            <input
              {...register("numberOfPeople", { valueAsNumber: true })}
              id="numberOfPeople"
              type="number"
              min="1"
              max="50"
              className={clsx(
                "h-12 w-full rounded-xl border px-4 text-sm font-medium transition",
                "focus:outline-none focus:ring-2 focus:ring-brand-primary/50",
                tone === "light"
                  ? "border-neutral-300 bg-white text-brand-primary"
                  : "border-brand-accent/50 bg-white/10 text-white",
                errors.numberOfPeople && "border-red-500 focus:ring-red-500/50"
              )}
            />
            {errors.numberOfPeople && (
              <p className="text-xs text-red-600 font-medium mt-2">
                {errors.numberOfPeople.message}
              </p>
            )}
          </div>

          <SelectField
            {...register("bookingType")}
            id="bookingType"
            label="Booking Type"
            error={errors.bookingType}
            tone={tone}
            required
          >
            <option value="">Select booking type</option>
            <option value="Individual/Family Darshan">Individual/Family Darshan</option>
            <option value="Group Darshan">Group Darshan</option>
            <option value="Special Puja/Ceremony">Special Puja/Ceremony</option>
            <option value="Festival Visit">Festival Visit</option>
          </SelectField>
        </div>

        {/* Special Requests */}
        <TextareaField
          {...register("specialRequests")}
          id="specialRequests"
          label="Special Requests (Optional)"
          placeholder="Any special requirements or requests..."
          error={errors.specialRequests}
          tone={tone}
          rows={4}
        />

        {/* Wheelchair Access Checkbox */}
        <div className="flex items-center gap-3">
          <input
            {...register("wheelchairAccess")}
            id="wheelchairAccess"
            type="checkbox"
            className="h-5 w-5 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/50"
          />
          <label
            htmlFor="wheelchairAccess"
            className={clsx(
              "text-sm font-medium cursor-pointer",
              tone === "light" ? "text-brand-primary/80" : "text-white/90"
            )}
          >
            ♿ I require wheelchair accessible facilities
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            variant={tone === "light" ? "primary" : "inverted"}
            disabled={isSubmitting || submitStatus === "success"}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : submitStatus === "success" ? "Booking Submitted!" : "Request Darshan Booking"}
          </Button>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div
              className={clsx(
                "rounded-xl p-4 text-sm font-medium",
                "bg-green-50 text-green-800 border border-green-200"
              )}
              role="alert"
            >
              <div className="font-bold mb-2">🙏 Booking Request Received!</div>
              <div className="space-y-1">
                <p>Your booking ID: <strong className="font-mono">{bookingId}</strong></p>
                <p>Check your email for confirmation and details.</p>
                <p className="text-xs mt-2">Our team will contact you within 24 hours to confirm your darshan time.</p>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div
              className={clsx(
                "rounded-xl p-4 text-sm font-medium",
                "bg-red-50 text-red-800 border border-red-200"
              )}
              role="alert"
            >
              ⚠️ {errorMessage || "Something went wrong. Please try again or contact us directly."}
            </div>
          )}
        </div>

        {/* Important Note */}
        <div
          className={clsx(
            "rounded-xl p-4 text-xs border",
            tone === "light"
              ? "bg-blue-50 text-blue-800 border-blue-200"
              : "bg-blue-900/20 text-blue-100 border-blue-700/50"
          )}
        >
          <p className="font-semibold mb-2">📌 Please Note:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>This is a booking request. We'll contact you to confirm the exact time</li>
            <li>Please arrive 15 minutes before your preferred time</li>
            <li>Temple dress code: Traditional or modest attire recommended</li>
            <li>For groups of 25+, please call us directly at +91 96091 75202</li>
          </ul>
        </div>
      </form>
    </div>
  );
}
