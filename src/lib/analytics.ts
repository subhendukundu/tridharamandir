/**
 * Google Analytics Event Tracking
 *
 * This file provides utilities for tracking custom events in Google Analytics.
 * Events help us understand user behavior and conversion metrics.
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Generic event tracking function
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log('GA Event:', eventName, eventParams);
  }
};

/**
 * Track darshan booking submission
 */
export const trackDarshanBooking = (params: {
  bookingId: string;
  bookingType: string;
  numberOfPeople: number;
  preferredDate: string;
  preferredTime: string;
  wheelchairAccess?: boolean;
}) => {
  trackEvent('darshan_booking_submitted', {
    event_category: 'Booking',
    event_label: params.bookingType,
    booking_id: params.bookingId,
    booking_type: params.bookingType,
    number_of_people: params.numberOfPeople,
    preferred_date: params.preferredDate,
    preferred_time: params.preferredTime,
    wheelchair_access: params.wheelchairAccess || false,
    value: params.numberOfPeople, // Can be used for funnel analysis
  });
};

/**
 * Track form errors
 */
export const trackFormError = (params: {
  formName: string;
  errorField: string;
  errorMessage: string;
}) => {
  trackEvent('form_error', {
    event_category: 'Form',
    event_label: params.formName,
    form_name: params.formName,
    error_field: params.errorField,
    error_message: params.errorMessage,
  });
};

/**
 * Track form abandonment (user starts but doesn't complete)
 */
export const trackFormAbandonment = (params: {
  formName: string;
  fieldsCompleted: string[];
  timeOnForm: number; // in seconds
}) => {
  trackEvent('form_abandoned', {
    event_category: 'Form',
    event_label: params.formName,
    form_name: params.formName,
    fields_completed: params.fieldsCompleted.join(','),
    time_on_form: params.timeOnForm,
  });
};

/**
 * Track when user opens the booking modal
 */
export const trackModalOpen = (modalName: string) => {
  trackEvent('modal_opened', {
    event_category: 'Engagement',
    event_label: modalName,
    modal_name: modalName,
  });
};

/**
 * Track when user closes the booking modal
 */
export const trackModalClose = (params: {
  modalName: string;
  completed: boolean;
  timeOpen: number; // in seconds
}) => {
  trackEvent('modal_closed', {
    event_category: 'Engagement',
    event_label: params.modalName,
    modal_name: params.modalName,
    completed: params.completed,
    time_open: params.timeOpen,
  });
};

/**
 * Track contact form submission
 */
export const trackContactFormSubmission = (params: {
  inquiryType: string;
  preferredContact?: string;
}) => {
  trackEvent('contact_form_submitted', {
    event_category: 'Contact',
    event_label: params.inquiryType,
    inquiry_type: params.inquiryType,
    preferred_contact: params.preferredContact,
  });
};

/**
 * Track when users view booking confirmation
 */
export const trackBookingConfirmationView = (params: {
  bookingId: string;
  bookingType: string;
}) => {
  trackEvent('booking_confirmation_viewed', {
    event_category: 'Booking',
    event_label: params.bookingType,
    booking_id: params.bookingId,
    booking_type: params.bookingType,
  });
};

/**
 * Track email link clicks (when user clicks "Get Directions", calls, etc. from email)
 * This won't work directly in emails, but can be used on thank-you pages
 */
export const trackEmailLinkClick = (params: {
  linkType: string;
  bookingId?: string;
}) => {
  trackEvent('email_link_clicked', {
    event_category: 'Email',
    event_label: params.linkType,
    link_type: params.linkType,
    booking_id: params.bookingId,
  });
};
