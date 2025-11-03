'use client';

import { useState, useEffect, useRef } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { DarshanBookingFormNew } from './DarshanBookingFormNew';
import { trackModalOpen, trackModalClose, trackBookingConfirmationView } from '@/lib/analytics';

export function DarshanBookingModalNew() {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [bookingType, setBookingType] = useState('');
  const modalOpenTime = useRef<number>(0);

  const handleSuccess = (id: string) => {
    setBookingId(id);
    // Keep modal open so user can take screenshot or save booking ID
    // User can manually close it when ready
  };

  const handleClose = () => {
    // Calculate time modal was open
    const timeOpen = modalOpenTime.current > 0
      ? Math.round((Date.now() - modalOpenTime.current) / 1000)
      : 0;

    // Track modal close
    trackModalClose({
      modalName: 'darshan_booking',
      completed: !!bookingId,
      timeOpen,
    });

    setIsOpen(false);
    setTimeout(() => {
      setBookingId('');
      setBookingType('');
    }, 300);
  };

  const handleOpen = () => {
    setBookingId(''); // Clear any previous booking ID
    setBookingType('');
    modalOpenTime.current = Date.now(); // Track when modal opened
    setIsOpen(true);

    // Track modal open
    trackModalOpen('darshan_booking');
  };

  // Track booking confirmation view
  useEffect(() => {
    if (bookingId) {
      trackBookingConfirmationView({
        bookingId,
        bookingType: bookingType || 'unknown',
      });
    }
  }, [bookingId, bookingType]);

  return (
    <>
      <Button onClick={handleOpen} className="justify-center" variant="primary">
        Request a Darshan Slot
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={bookingId ? "Booking Confirmed" : "Request a Darshan Booking"}
        size="lg"
        closeOnOverlayClick={true}
      >
        {bookingId ? (
          /* Success State */
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
              Your booking ID is: <span className="font-mono font-semibold text-brand-primary">{bookingId}</span>
            </p>
            <p className="text-sm text-neutral-500">
              We have sent a confirmation email. Our team will contact you within 24 hours.
            </p>
          </div>
        ) : (
          /* Form State */
          <>
            <div className="mb-6 rounded-2xl border border-brand-primary/10 bg-brand-light/30 p-4">
              <p className="text-sm text-neutral-600">
                Fill out the form below to request a darshan slot. Our team will contact you within 24 hours to confirm your preferred time.
              </p>
            </div>
            <DarshanBookingFormNew onSuccess={handleSuccess} />
          </>
        )}
      </Modal>
    </>
  );
}
