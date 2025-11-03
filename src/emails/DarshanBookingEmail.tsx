import { Heading, Text, Section, Hr, Link } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/EmailLayout';

export interface DarshanBookingEmailProps {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  numberOfPeople: number;
  bookingType: string;
  bookingId: string;
  specialRequests?: string;
  wheelchairAccess?: boolean;
}

export const DarshanBookingEmail = ({
  name = 'Rajesh Kumar',
  email = 'rajesh@example.com',
  phone = '+91 98765 43210',
  preferredDate = 'January 20, 2025',
  preferredTime = 'Morning Darshan (6:00 AM - 9:00 AM)',
  numberOfPeople = 4,
  bookingType = 'Individual/Family Darshan',
  bookingId = 'DRS-2025-0001',
  specialRequests,
  wheelchairAccess = false,
}: DarshanBookingEmailProps) => {
  return (
    <EmailLayout
      previewText={`Darshan Booking Confirmed - ${preferredDate}`}
      headerIcon="🙏"
      headerTitle="Darshan Booking Confirmed"
      headerSubtitle="We look forward to welcoming you"
    >
      {/* Greeting */}
      <Heading style={heading}>Namaste {name},</Heading>

      <Text style={paragraph}>
        Your darshan booking at Tridhara Milan Mandir has been confirmed. We are honored
        that you have chosen to visit our sacred temple.
      </Text>

      {/* Booking ID Badge */}
      <Section style={badge}>
        <Text style={badgeText}>Booking ID</Text>
        <Text style={badgeId}>{bookingId}</Text>
        <Text style={badgeSubtext}>Please keep this for your records</Text>
      </Section>

      {/* Booking Details */}
      <Section style={card}>
        <Heading style={cardTitle}>📅 Your Booking Details</Heading>

        <Section style={detailRow}>
          <Text style={detailLabel}>Preferred Date</Text>
          <Text style={detailValue}>{preferredDate}</Text>
        </Section>

        <Section style={detailRow}>
          <Text style={detailLabel}>Preferred Time</Text>
          <Text style={detailValue}>{preferredTime}</Text>
        </Section>

        <Section style={detailRow}>
          <Text style={detailLabel}>Number of People</Text>
          <Text style={detailValue}>{numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}</Text>
        </Section>

        <Section style={detailRow}>
          <Text style={detailLabel}>Booking Type</Text>
          <Text style={detailValue}>{bookingType}</Text>
        </Section>

        {wheelchairAccess && (
          <Section style={detailRow}>
            <Text style={detailLabel}>Accessibility</Text>
            <Text style={detailValue}>♿ Wheelchair Access Requested</Text>
          </Section>
        )}
      </Section>

      {/* Special Requests */}
      {specialRequests && (
        <Section style={requestsBox}>
          <Text style={requestsTitle}>📝 Your Special Requests</Text>
          <Text style={requestsText}>{specialRequests}</Text>
          <Text style={requestsNote}>
            We have noted your requirements and will do our best to accommodate them.
          </Text>
        </Section>
      )}

      {/* Important Information */}
      <Section style={card}>
        <Heading style={cardTitle}>📌 Important Information</Heading>

        <Text style={paragraph}>
          <strong>Please Note:</strong>
        </Text>

        <Text style={listText}>
          • This is a booking request. Our team will contact you to confirm the exact time
          <br />
          • Please arrive 15 minutes before your preferred time slot
          <br />
          • Bring this confirmation email (digital or printed)
          <br />
          • Temple dress code: Traditional/modest attire recommended
          <br />
          • Footwear must be removed before entering the main hall
          <br />
          • Photography is allowed during appropriate times
        </Text>
      </Section>

      {/* What to Expect */}
      <Section style={experienceBox}>
        <Heading style={experienceTitle}>✨ What to Expect</Heading>

        <Section style={experienceItem}>
          <Text style={experienceIcon}>🕉️</Text>
          <Section>
            <Text style={experienceLabel}>Integrated Darshan</Text>
            <Text style={experienceDesc}>
              Visit shrines of Radha-Krishna, Kali, Mahadev, Rama-Sita, Hanuman, and Chaitanya Mahaprabhu
            </Text>
          </Section>
        </Section>

        <Section style={experienceItem}>
          <Text style={experienceIcon}>🎵</Text>
          <Section>
            <Text style={experienceLabel}>Arati Ceremonies</Text>
            <Text style={experienceDesc}>
              Experience Mangal Arati, Sandhya Arati, or special Tridhara Arati
            </Text>
          </Section>
        </Section>

        <Section style={experienceItem}>
          <Text style={experienceIcon}>🙏</Text>
          <Section>
            <Text style={experienceLabel}>Prasad Distribution</Text>
            <Text style={experienceDesc}>
              Receive blessed prasad after darshan (complimentary)
            </Text>
          </Section>
        </Section>
      </Section>

      <Hr style={divider} />

      {/* Temple Timings */}
      <Section style={timingsBox}>
        <Heading style={timingsTitle}>🕒 Temple Timings</Heading>

        <Section style={timingItem}>
          <Text style={timingDay}>Monday - Friday</Text>
          <Text style={timingHours}>5:00 AM - 9:00 PM</Text>
        </Section>

        <Section style={timingItem}>
          <Text style={timingDay}>Saturday - Sunday</Text>
          <Text style={timingHours}>5:00 AM - 9:30 PM</Text>
        </Section>
      </Section>

      <Hr style={divider} />

      {/* Contact & Directions */}
      <Text style={paragraph}>
        <strong>Need to modify your booking or have questions?</strong>
      </Text>

      <Section style={contactBox}>
        <Text style={contactText}>
          📞 Call: <Link href="tel:+919609175202" style={linkStyle}>+91 96091 75202</Link>
        </Text>
        <Text style={contactText}>
          📧 Email: <Link href="mailto:info@tridharamandir.com" style={linkStyle}>info@tridharamandir.com</Link>
        </Text>
        <Text style={contactText}>
          💬 Reply to this email with your booking ID
        </Text>
      </Section>

      <Section style={directionsBox}>
        <Text style={directionsTitle}>📍 How to Reach</Text>
        <Text style={directionsText}>
          <strong>Address:</strong> Tridhara Milan Mandir Road, Panchmura, West Bengal 722156
        </Text>
        <Text style={directionsText}>
          <strong>From Bishnupur:</strong> 30 km by road (45 minutes)
          <br />
          <strong>From Bankura:</strong> 45 km by road (1 hour)
        </Text>
        <Link
          href="https://maps.google.com/?q=Tridhara+Milan+Mandir+Panchmura"
          style={directionsLink}
        >
          Get Directions on Google Maps →
        </Link>
      </Section>

      <Hr style={divider} />

      {/* Closing */}
      <Text style={paragraph}>
        May your visit to Tridhara Milan Mandir bring you peace, blessings, and spiritual
        fulfillment. We are honored to serve you.
      </Text>

      <Text style={signature}>
        With devotion and service,<br />
        <strong>Tridhara Milan Mandir Team</strong>
      </Text>

      {/* Share */}
      <Section style={shareBox}>
        <Text style={shareText}>
          💙 Visiting with family or friends? Forward this email to share your booking details!
        </Text>
      </Section>
    </EmailLayout>
  );
};

export default DarshanBookingEmail;

// Styles
const heading = {
  color: '#D97706', // Bright amber that works on both light and dark
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 16px 0',
  lineHeight: '1.3',
};

const paragraph = {
  color: '#F59E0B', // Lighter amber for readability
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
  color: '#DC2626', // Bright red that stands out
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 20px 0',
};

const detailRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
  paddingBottom: '12px',
  borderBottom: '1px solid #e5e7eb',
};

const detailLabel = {
  color: '#10B981', // Bright green for labels
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const detailValue = {
  color: '#3B82F6', // Bright blue for values
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
  textAlign: 'right' as const,
};

const requestsBox = {
  backgroundColor: '#eff6ff',
  border: '1px solid #93c5fd',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '24px',
};

const requestsTitle = {
  color: '#1e40af',
  fontSize: '16px',
  fontWeight: '700',
  margin: '0 0 12px 0',
};

const requestsText = {
  color: '#1e3a8a',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 12px 0',
  fontStyle: 'italic',
};

const requestsNote = {
  color: '#3b82f6',
  fontSize: '13px',
  margin: '0',
};

const listText = {
  color: '#FBBF24', // Bright yellow-amber for list items
  fontSize: '15px',
  lineHeight: '1.8',
  margin: '0 0 16px 0',
};

const experienceBox = {
  backgroundColor: '#fef3c7',
  border: '1px solid #fde047',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '24px',
};

const experienceTitle = {
  color: '#92400e',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 20px 0',
};

const experienceItem = {
  display: 'flex',
  marginBottom: '16px',
  alignItems: 'flex-start',
};

const experienceIcon = {
  fontSize: '24px',
  marginRight: '12px',
  lineHeight: '1',
  paddingTop: '4px',
};

const experienceLabel = {
  color: '#78350f',
  fontSize: '15px',
  fontWeight: '700',
  margin: '0 0 4px 0',
};

const experienceDesc = {
  color: '#92400e',
  fontSize: '14px',
  margin: '0',
  lineHeight: '1.5',
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '24px 0',
};

const timingsBox = {
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '24px',
};

const timingsTitle = {
  color: '#DC2626', // Bright red for timings title
  fontSize: '16px',
  fontWeight: '700',
  margin: '0 0 16px 0',
};

const timingItem = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
};

const timingDay = {
  color: '#8B5CF6', // Bright purple for days
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const timingHours = {
  color: '#EC4899', // Bright pink for hours
  fontSize: '14px',
  margin: '0',
};

const contactBox = {
  backgroundColor: '#f9fafb',
  borderLeft: '4px solid #E5B76A',
  padding: '16px',
  marginBottom: '24px',
};

const contactText = {
  color: '#059669', // Bright emerald green
  fontSize: '15px',
  margin: '8px 0',
  lineHeight: '1.5',
};

const linkStyle = {
  color: '#2563EB', // Bright blue for links
  textDecoration: 'none',
  fontWeight: '600',
};

const directionsBox = {
  backgroundColor: '#fff7ed',
  border: '1px solid #fed7aa',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '24px',
};

const directionsTitle = {
  color: '#EA580C', // Bright orange for directions title
  fontSize: '16px',
  fontWeight: '700',
  margin: '0 0 12px 0',
};

const directionsText = {
  color: '#F97316', // Lighter orange for directions text
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 12px 0',
};

const directionsLink = {
  color: '#DC2626', // Bright red for action link
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
};

const signature = {
  color: '#A855F7', // Bright purple for signature
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
