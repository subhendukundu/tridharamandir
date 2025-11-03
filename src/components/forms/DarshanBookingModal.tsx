'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { DarshanBookingForm } from './DarshanBookingForm';

export function DarshanBookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [formKey, setFormKey] = useState(0); // Key to force form remount

  const handleOpen = () => {
    setIsOpen(true);
    setFormKey(prev => prev + 1); // Increment key to remount form
  };

  const handleSuccess = (id: string) => {
    setBookingId(id);
    setShowSuccessMessage(true);

    // Keep modal open for 3 seconds to show success message, then close
    setTimeout(() => {
      setIsOpen(false);
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset success state when modal closes
    setTimeout(() => {
      setShowSuccessMessage(false);
      setBookingId('');
    }, 300); // Wait for modal close animation
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="justify-center"
        variant="primary"
      >
        Request a Darshan Slot
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Request a Darshan Booking"
        size="lg"
        closeOnOverlayClick={!showSuccessMessage}
      >
        {showSuccessMessage ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-display text-2xl text-brand-primary">
              Booking Request Submitted!
            </h3>
            <p className="mb-4 text-neutral-600">
              Your booking ID is: <span className="font-semibold text-brand-primary">{bookingId}</span>
            </p>
            <p className="text-sm text-neutral-500">
              We have sent a confirmation email. Our team will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 rounded-2xl border border-brand-primary/10 bg-brand-light/30 p-4">
              <p className="text-sm text-neutral-600">
                Fill out the form below to request a darshan slot. Our team will contact you within 24 hours to confirm your preferred time.
              </p>
            </div>
            <DarshanBookingForm key={formKey} tone="light" onSuccess={handleSuccess} />
          </>
        )}
      </Modal>
    </>
  );
}
