import { Heading, Text, Section, Hr, Link } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/EmailLayout';

export interface EventRegistrationEmailProps {
  attendeeName: string;
  email: string;
  phone?: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation?: string;
  eventDescription?: string;
  registrationId: string;
  numberOfAttendees?: number;
  specialRequests?: string;
}

export const EventRegistrationEmail = ({
  attendeeName = 'Anita Patel',
  email = 'anita@example.com',
  phone = '+91 98765 43210',
  eventName = 'Janmashtami Celebration 2025',
  eventDate = 'August 26, 2025',
  eventTime = '6:00 PM - 10:00 PM',
  eventLocation = 'Tridhara Milan Mandir Main Hall',
  eventDescription = 'Join us for a divine celebration of Lord Krishna\'s birth with bhajans, aarti, and prasad distribution.',
  registrationId = 'EVT-2025-0001',
  numberOfAttendees = 2,
  specialRequests,
}: EventRegistrationEmailProps) => {
  return (
    <EmailLayout
      previewText={`Event Registration Confirmed: ${eventName}`}
      headerIcon="🎉"
      headerTitle="Event Registration Confirmed"
      headerSubtitle="We look forward to seeing you"
    >
      {/* Confirmation Message */}
      <Heading style={heading}>Namaste {attendeeName}!</Heading>

      <Text style={paragraph}>
        Your registration for <strong>{eventName}</strong> has been successfully confirmed.
        We're excited to have you join us for this special occasion!
      </Text>

      {/* Registration Badge */}
      <Section style={badge}>
        <Text style={badgeText}>Registration ID</Text>
        <Text style={badgeId}>{registrationId}</Text>
        <Text style={badgeSubtext}>Please keep this for your records</Text>
      </Section>

      {/* Event Details */}
      <Section style={card}>
        <Heading style={cardTitle}>📅 Event Details</Heading>

        <Section style={eventDetail}>
          <Text style={iconText}>🎊</Text>
          <Section>
            <Text style={eventLabel}>Event Name</Text>
            <Text style={eventValue}>{eventName}</Text>
          </Section>
        </Section>

        <Section style={eventDetail}>
          <Text style={iconText}>📆</Text>
          <Section>
            <Text style={eventLabel}>Date</Text>
            <Text style={eventValue}>{eventDate}</Text>
          </Section>
        </Section>

        <Section style={eventDetail}>
          <Text style={iconText}>⏰</Text>
          <Section>
            <Text style={eventLabel}>Time</Text>
            <Text style={eventValue}>{eventTime}</Text>
          </Section>
        </Section>

        {eventLocation && (
          <Section style={eventDetail}>
            <Text style={iconText}>📍</Text>
            <Section>
              <Text style={eventLabel}>Location</Text>
              <Text style={eventValue}>{eventLocation}</Text>
              <Link
                href="https://maps.google.com/?q=Tridhara+Milan+Mandir+Indus+Bankura"
                style={linkStyle}
              >
                Get Directions →
              </Link>
            </Section>
          </Section>
        )}

        {numberOfAttendees && numberOfAttendees > 1 && (
          <Section style={eventDetail}>
            <Text style={iconText}>👥</Text>
            <Section>
              <Text style={eventLabel}>Number of Attendees</Text>
              <Text style={eventValue}>{numberOfAttendees} people</Text>
            </Section>
          </Section>
        )}
      </Section>

      {/* Event Description */}
      {eventDescription && (
        <Section style={card}>
          <Heading style={cardTitle}>ℹ️ About This Event</Heading>
          <Text style={paragraph}>{eventDescription}</Text>
        </Section>
      )}

      {/* Special Requests */}
      {specialRequests && (
        <Section style={infoBox}>
          <Text style={infoTitle}>📝 Your Special Requests</Text>
          <Text style={infoText}>{specialRequests}</Text>
          <Text style={infoText}>
            We've noted your requirements and will do our best to accommodate them.
          </Text>
        </Section>
      )}

      {/* What to Bring */}
      <Section style={card}>
        <Heading style={cardTitle}>🎒 What to Bring</Heading>

        <Section style={checklist}>
          <Text style={checklistItem}>✓ This confirmation email (digital or printed)</Text>
          <Text style={checklistItem}>✓ Valid ID for entry</Text>
          <Text style={checklistItem}>✓ Comfortable traditional attire (recommended)</Text>
          <Text style={checklistItem}>✓ An open heart and devotional spirit</Text>
        </Section>
      </Section>

      {/* Important Information */}
      <Section style={importantBox}>
        <Heading style={importantTitle}>⚠️ Important Information</Heading>

        <Text style={importantText}>
          • Please arrive 15 minutes early for check-in
          <br />
          • Prasad will be distributed to all attendees
          <br />
          • Photography is welcome during appropriate times
          <br />
          • Please maintain temple decorum and silence during ceremonies
          <br />
          • Footwear must be removed before entering the main hall
        </Text>
      </Section>

      <Hr style={divider} />

      {/* Need to Make Changes */}
      <Text style={paragraph}>
        <strong>Need to make changes to your registration?</strong>
      </Text>

      <Section style={contactBox}>
        <Text style={contactText}>
          📞 Call: <Link href="tel:+919609175202" style={linkStyle}>+91 96091 75202</Link>
        </Text>
        <Text style={contactText}>
          📧 Email: <Link href="mailto:info@tridharamandir.com" style={linkStyle}>info@tridharamandir.com</Link>
        </Text>
        <Text style={contactText}>
          💬 Reply to this email with your registration ID
        </Text>
      </Section>

      <Hr style={divider} />

      {/* Calendar Reminder */}
      <Section style={calendarBox}>
        <Text style={calendarTitle}>📲 Add to Calendar</Text>
        <Text style={calendarText}>
          Don't forget to add this event to your calendar so you don't miss it!
        </Text>
        {/* Note: In production, add actual calendar links (Google, iCal, Outlook) */}
      </Section>

      <Hr style={divider} />

      {/* Closing */}
      <Text style={paragraph}>
        We're honored that you've chosen to celebrate with us. This event promises
        to be a memorable spiritual experience for all attendees.
      </Text>

      <Text style={signature}>
        See you soon!<br />
        <strong>Tridhara Milan Mandir Events Team</strong>
      </Text>

      {/* Share Event */}
      <Section style={shareBox}>
        <Text style={shareText}>
          💙 Know someone who might be interested? Feel free to forward this event
          information to friends and family. Registration is open to all!
        </Text>
      </Section>
    </EmailLayout>
  );
};

export default EventRegistrationEmail;

// Styles
const heading = {
  color: '#452937',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 16px 0',
  lineHeight: '1.3',
};

const paragraph = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px 0',
};

const badge = {
  backgroundColor: '#f0fdf4',
  border: '2px solid #86efac',
  borderRadius: '12px',
  padding: '24px',
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const badgeText = {
  color: '#166534',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 8px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const badgeId = {
  color: '#15803d',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 8px 0',
  fontFamily: 'monospace',
};

const badgeSubtext = {
  color: '#16a34a',
  fontSize: '12px',
  margin: '0',
};

const card = {
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '24px',
  border: '1px solid #e5e7eb',
};

const cardTitle = {
  color: '#452937',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 20px 0',
};

const eventDetail = {
  display: 'flex',
  marginBottom: '20px',
  alignItems: 'flex-start',
};

const iconText = {
  fontSize: '24px',
  marginRight: '16px',
  lineHeight: '1',
  paddingTop: '4px',
};

const eventLabel = {
  color: '#6b7280',
  fontSize: '13px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 4px 0',
};

const eventValue = {
  color: '#374151',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 4px 0',
  lineHeight: '1.4',
};

const infoBox = {
  backgroundColor: '#eff6ff',
  border: '1px solid #93c5fd',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '24px',
};

const infoTitle = {
  color: '#1e40af',
  fontSize: '16px',
  fontWeight: '700',
  margin: '0 0 12px 0',
};

const infoText = {
  color: '#1e3a8a',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 8px 0',
};

const checklist = {
  marginTop: '16px',
};

const checklistItem = {
  color: '#374151',
  fontSize: '15px',
  margin: '0 0 12px 0',
  lineHeight: '1.6',
};

const importantBox = {
  backgroundColor: '#fff7ed',
  border: '2px solid #fb923c',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '24px',
};

const importantTitle = {
  color: '#9a3412',
  fontSize: '16px',
  fontWeight: '700',
  margin: '0 0 12px 0',
};

const importantText = {
  color: '#7c2d12',
  fontSize: '14px',
  lineHeight: '1.8',
  margin: '0',
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '24px 0',
};

const contactBox = {
  backgroundColor: '#f9fafb',
  borderLeft: '4px solid #E5B76A',
  padding: '16px',
  marginBottom: '24px',
};

const contactText = {
  color: '#374151',
  fontSize: '15px',
  margin: '8px 0',
  lineHeight: '1.5',
};

const linkStyle = {
  color: '#A96842',
  textDecoration: 'none',
  fontWeight: '600',
};

const calendarBox = {
  backgroundColor: '#faf5ff',
  border: '1px solid #d8b4fe',
  borderRadius: '12px',
  padding: '20px',
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const calendarTitle = {
  color: '#6b21a8',
  fontSize: '16px',
  fontWeight: '700',
  margin: '0 0 8px 0',
};

const calendarText = {
  color: '#7e22ce',
  fontSize: '14px',
  margin: '0',
};

const signature = {
  color: '#452937',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '24px 0 0 0',
};

const shareBox = {
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  padding: '16px',
  marginTop: '24px',
  textAlign: 'center' as const,
};

const shareText = {
  color: '#0c4a6e',
  fontSize: '13px',
  margin: '0',
  lineHeight: '1.6',
};
