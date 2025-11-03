'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { darshanBookingSchema, type DarshanBookingFormData } from '@/lib/validations/darshan-booking-new';
import { trackDarshanBooking, trackFormError } from '@/lib/analytics';

type DarshanBookingFormProps = {
  onSuccess?: (bookingId: string) => void;
};

export function DarshanBookingFormNew({ onSuccess }: DarshanBookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DarshanBookingFormData>({
    resolver: zodResolver(darshanBookingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      numberOfPeople: 1,
      bookingType: '',
      specialRequests: '',
      wheelchairAccess: false,
    },
  });

  // Track form validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      // Track the first error encountered
      const firstErrorKey = Object.keys(errors)[0];
      const firstError = errors[firstErrorKey as keyof typeof errors];

      if (firstError?.message) {
        trackFormError({
          formName: 'darshan_booking',
          errorField: firstErrorKey,
          errorMessage: firstError.message,
        });
      }
    }
  }, [errors]);

  const onSubmit = async (data: DarshanBookingFormData) => {
    console.log('📝 Form submission data:', data);
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/darshan-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit booking');
      }

      const result = await response.json();
      console.log('✅ Booking successful:', result);

      // Track successful booking in Google Analytics
      trackDarshanBooking({
        bookingId: result.bookingId,
        bookingType: data.bookingType,
        numberOfPeople: data.numberOfPeople,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        wheelchairAccess: data.wheelchairAccess,
      });

      reset();
      if (onSuccess) {
        onSuccess(result.bookingId);
      }
    } catch (error) {
      console.error('❌ Submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name and Email Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-brand-primary/80">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            id="name"
            type="text"
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-brand-primary transition focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-2 text-xs font-medium text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-brand-primary/80">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            id="email"
            type="email"
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-brand-primary transition focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-2 text-xs font-medium text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-brand-primary/80">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          {...register('phone')}
          id="phone"
          type="tel"
          className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-brand-primary transition focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          placeholder="+91 98765 43210"
        />
        {errors.phone && (
          <p className="mt-2 text-xs font-medium text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Date and Time Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Preferred Date */}
        <div>
          <label htmlFor="preferredDate" className="mb-2 block text-sm font-semibold text-brand-primary/80">
            Preferred Date <span className="text-red-500">*</span>
          </label>
          <input
            {...register('preferredDate')}
            id="preferredDate"
            type="date"
            min={getMinDate()}
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-brand-primary transition focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          />
          {errors.preferredDate && (
            <p className="mt-2 text-xs font-medium text-red-600">{errors.preferredDate.message}</p>
          )}
        </div>

        {/* Preferred Time Slot */}
        <div>
          <label htmlFor="preferredTime" className="mb-2 block text-sm font-semibold text-brand-primary/80">
            Preferred Time Slot <span className="text-red-500">*</span>
          </label>
          <select
            {...register('preferredTime')}
            id="preferredTime"
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-brand-primary transition focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          >
            <option value="">Select a time slot</option>
            <option value="Morning Darshan (6:00 AM - 9:00 AM)">Morning Darshan (6:00 AM - 9:00 AM)</option>
            <option value="Mid-Morning (9:00 AM - 12:00 PM)">Mid-Morning (9:00 AM - 12:00 PM)</option>
            <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
            <option value="Evening Sandhya Arati (5:00 PM - 7:00 PM)">Evening Sandhya Arati (5:00 PM - 7:00 PM)</option>
            <option value="Evening (7:00 PM - 9:00 PM)">Evening (7:00 PM - 9:00 PM)</option>
          </select>
          {errors.preferredTime && (
            <p className="mt-2 text-xs font-medium text-red-600">{errors.preferredTime.message}</p>
          )}
        </div>
      </div>

      {/* Number of People and Booking Type Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Number of People */}
        <div>
          <label htmlFor="numberOfPeople" className="mb-2 block text-sm font-semibold text-brand-primary/80">
            Number of People <span className="text-red-500">*</span>
          </label>
          <input
            {...register('numberOfPeople', { valueAsNumber: true })}
            id="numberOfPeople"
            type="number"
            min="1"
            max="50"
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-brand-primary transition focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          />
          {errors.numberOfPeople && (
            <p className="mt-2 text-xs font-medium text-red-600">{errors.numberOfPeople.message}</p>
          )}
        </div>

        {/* Booking Type */}
        <div>
          <label htmlFor="bookingType" className="mb-2 block text-sm font-semibold text-brand-primary/80">
            Booking Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register('bookingType')}
            id="bookingType"
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-brand-primary transition focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          >
            <option value="">Select booking type</option>
            <option value="Individual/Family Darshan">Individual/Family Darshan</option>
            <option value="Group Darshan">Group Darshan</option>
            <option value="Special Puja/Ceremony">Special Puja/Ceremony</option>
            <option value="Festival Visit">Festival Visit</option>
          </select>
          {errors.bookingType && (
            <p className="mt-2 text-xs font-medium text-red-600">{errors.bookingType.message}</p>
          )}
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label htmlFor="specialRequests" className="mb-2 block text-sm font-semibold text-brand-primary/80">
          Special Requests (Optional)
        </label>
        <textarea
          {...register('specialRequests')}
          id="specialRequests"
          rows={4}
          className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-brand-primary transition focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          placeholder="Any special requirements or requests..."
        />
        {errors.specialRequests && (
          <p className="mt-2 text-xs font-medium text-red-600">{errors.specialRequests.message}</p>
        )}
      </div>

      {/* Wheelchair Access */}
      <div className="flex items-center gap-3">
        <input
          {...register('wheelchairAccess')}
          id="wheelchairAccess"
          type="checkbox"
          className="h-5 w-5 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/50"
        />
        <label htmlFor="wheelchairAccess" className="cursor-pointer text-sm font-medium text-brand-primary/80">
          ♿ I require wheelchair accessible facilities
        </label>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Request Darshan Booking'}
        </button>

        {submitError && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            ⚠️ {submitError}
          </div>
        )}
      </div>

      {/* Important Notes */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-xs text-blue-800">
        <p className="mb-2 font-semibold">📌 Please Note:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>This is a booking request. We'll contact you to confirm the exact time</li>
          <li>Please arrive 15 minutes before your preferred time</li>
          <li>Temple dress code: Traditional or modest attire recommended</li>
          <li>For groups of 25+, please call us directly at +91 96091 75202</li>
        </ul>
      </div>
    </form>
  );
}
