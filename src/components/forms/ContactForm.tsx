"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact-form";
import { InputField, TextareaField, SelectField } from "./FormField";
import { Button } from "@/components/ui/Button";
import clsx from "clsx";

type ContactFormProps = {
  tone?: "light" | "dark";
  className?: string;
  defaultInquiryType?: ContactFormData["inquiryType"];
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm({ tone = "light", className, defaultInquiryType }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      inquiryType: defaultInquiryType,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message");
      }

      setSubmitStatus("success");
      reset(); // Clear form

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message. Please try again.");
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

        {/* Inquiry Type Field */}
        <SelectField
          {...register("inquiryType")}
          id="inquiryType"
          label="Inquiry Type"
          error={errors.inquiryType}
          tone={tone}
          required
        >
          <option value="">Select an inquiry type</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Service Booking">Service Booking</option>
          <option value="Donation/Seva">Donation/Seva</option>
          <option value="Volunteer Application">Volunteer Application</option>
          <option value="Guest House Booking">Guest House Booking</option>
          <option value="Event Information">Event Information</option>
        </SelectField>

        {/* Preferred Contact Method */}
        <SelectField
          {...register("preferredContact")}
          id="preferredContact"
          label="Preferred Contact Method"
          error={errors.preferredContact}
          tone={tone}
        >
          <option value="">Select preferred contact method</option>
          <option value="Email">Email</option>
          <option value="Phone">Phone Call</option>
          <option value="WhatsApp">WhatsApp</option>
        </SelectField>

        {/* Message Field */}
        <TextareaField
          {...register("message")}
          id="message"
          label="Message"
          placeholder="Please share your inquiry or message..."
          error={errors.message}
          tone={tone}
          rows={5}
          required
        />

        {/* Submit Button */}
        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            variant={tone === "light" ? "primary" : "inverted"}
            disabled={isSubmitting || submitStatus === "success"}
            className="w-full"
          >
            {isSubmitting ? "Sending..." : submitStatus === "success" ? "Message Sent!" : "Send Message"}
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
              🙏 Thank you for contacting us! We&apos;ll get back to you soon.
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

        {/* Privacy Notice */}
        <p className={clsx(
          "text-xs text-center",
          tone === "light" ? "text-neutral-500" : "text-white/60"
        )}>
          By submitting this form, you agree to our privacy policy. We&apos;ll only use your information to respond to your inquiry.
        </p>
      </form>
    </div>
  );
}
