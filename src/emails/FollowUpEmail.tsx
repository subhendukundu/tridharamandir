import { Heading, Text, Section, Hr, Link } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/EmailLayout';

export interface FollowUpEmailProps {
  recipientName: string;
  email: string;
  followUpType: 'inquiry' | 'donation' | 'visit' | 'volunteer' | 'event' | 'general';
  originalDate?: string;
  message: string;
  callToAction?: {
    text: string;
    link: string;
  };
  additionalInfo?: string;
}

export const FollowUpEmail = ({
  recipientName = 'Amit Gupta',
  email = 'amit@example.com',
  followUpType = 'inquiry',
  originalDate = 'January 15, 2025',
  message = 'We wanted to follow up on your recent inquiry and see if you have any questions or need additional information.',
  callToAction,
  additionalInfo,
}: FollowUpEmailProps) => {
  // Customize content based on follow-up type
  const getTypeConfig = () => {
    switch (followUpType) {
      case 'inquiry':
        return {
          icon: '💬',
          title: 'Following Up on Your Inquiry',
          subtitle: "We're here to help",
        };
      case 'donation':
        return {
          icon: '🙏',
          title: 'Thank You for Your Support',
          subtitle: 'Your generosity makes a difference',
        };
      case 'visit':
        return {
          icon: '🏛️',
          title: 'Hope You Enjoyed Your Visit',
          subtitle: "We'd love to hear your feedback",
        };
      case 'volunteer':
        return {
          icon: '👥',
          title: 'Volunteer Application Follow-Up',
          subtitle: 'Join our temple community',
        };
      case 'event':
        return {
          icon: '🎉',
          title: 'Thank You for Attending',
          subtitle: 'We hope you had a meaningful experience',
        };
      default:
        return {
          icon: '✉️',
          title: 'Following Up With You',
          subtitle: 'Stay connected with us',
        };
    }
  };

  const config = getTypeConfig();

  return (
    <EmailLayout
      previewText={`${config.title} - Tridhara Milan Mandir`}
      headerIcon={config.icon}
      headerTitle={config.title}
      headerSubtitle={config.subtitle}
    >
      {/* Greeting */}
      <Heading style={heading}>Namaste {recipientName},</Heading>

      {/* Main Message */}
      <Text style={paragraph}>{message}</Text>

      {/* Reference to Original Date */}
      {originalDate && (
        <Section style={infoBox}>
          <Text style={infoText}>
            <strong>Original Contact:</strong> {originalDate}
          </Text>
        </Section>
      )}

      {/* Type-Specific Content */}
      {followUpType === 'inquiry' && (
        <Section style={card}>
          <Heading style={cardTitle}>How Can We Assist You?</Heading>
          <Text style={paragraph}>
            Whether you have questions about:
          </Text>
          <Text style={listText}>
            • Temple timings and services
            <br />
            • Upcoming events and festivals
            <br />
            • Donation and seva opportunities
            <br />
            • Volunteer programs
            <br />
            • Guest house facilities
          </Text>
          <Text style={paragraph}>
            We're here to provide all the information you need.
          </Text>
        </Section>
      )}

      {followUpType === 'donation' && (
        <Section style={thankYouBox}>
          <Heading style={thankYouTitle}>Your Impact Continues</Heading>
          <Text style={paragraph}>
            Thanks to generous donors like you, we've been able to:
          </Text>
          <Text style={listText}>
            ✓ Serve 500+ devotees daily with prasad
            <br />
            ✓ Maintain regular puja and ceremonies
            <br />
            ✓ Support community welfare programs
            <br />
            ✓ Preserve our spiritual heritage
          </Text>
        </Section>
      )}

      {followUpType === 'visit' && (
        <Section style={feedbackBox}>
          <Heading style={feedbackTitle}>Share Your Experience</Heading>
          <Text style={paragraph}>
            Your feedback helps us improve our services and create a better
            experience for all devotees. We'd love to hear about your visit!
          </Text>
        </Section>
      )}

      {followUpType === 'volunteer' && (
        <Section style={volunteerBox}>
          <Heading style={volunteerTitle}>Next Steps</Heading>
          <Text style={paragraph}>
            We're excited about your interest in volunteering with us. Here's what happens next:
          </Text>
          <Section style={stepsList}>
            <Section style={step}>
              <Text style={stepNumber}>1</Text>
              <Text style={stepText}>Schedule an orientation session</Text>
            </Section>
            <Section style={step}>
              <Text style={stepNumber}>2</Text>
              <Text style={stepText}>Complete basic training</Text>
            </Section>
            <Section style={step}>
              <Text style={stepNumber}>3</Text>
              <Text style={stepText}>Begin your seva journey</Text>
            </Section>
          </Section>
        </Section>
      )}

      {followUpType === 'event' && (
        <Section style={eventBox}>
          <Heading style={eventTitle}>What's Next?</Heading>
          <Text style={paragraph}>
            Don't miss our upcoming events! Check our calendar for more opportunities
            to connect with the community and deepen your spiritual practice.
          </Text>
        </Section>
      )}

      {/* Additional Information */}
      {additionalInfo && (
        <>
          <Hr style={divider} />
          <Section style={card}>
            <Text style={paragraph}>{additionalInfo}</Text>
          </Section>
        </>
      )}

      <Hr style={divider} />

      {/* Call to Action */}
      {callToAction ? (
        <Section style={ctaBox}>
          <Link href={callToAction.link} style={ctaButton}>
            {callToAction.text}
          </Link>
        </Section>
      ) : (
        <Section style={ctaBox}>
          <Text style={ctaText}>
            Have questions? We're just a message away!
          </Text>
          <Link href={`mailto:info@tridharamandir.com?subject=Reply%20to%20Follow-Up`} style={ctaButton}>
            Reply to This Email
          </Link>
        </Section>
      )}

      <Hr style={divider} />

      {/* Contact Information */}
      <Section style={contactBox}>
        <Heading style={contactTitle}>📞 Get in Touch</Heading>

        <Text style={contactText}>
          <strong>Phone:</strong>{' '}
          <Link href="tel:+919609175202" style={linkStyle}>
            +91 96091 75202
          </Link>
        </Text>

        <Text style={contactText}>
          <strong>Email:</strong>{' '}
          <Link href="mailto:info@tridharamandir.com" style={linkStyle}>
            info@tridharamandir.com
          </Link>
        </Text>

        <Text style={contactText}>
          <strong>Website:</strong>{' '}
          <Link href="https://tridharamandir.com" style={linkStyle}>
            tridharamandir.com
          </Link>
        </Text>

        <Text style={contactText}>
          <strong>Visit Us:</strong> Tridhara Milan Mandir Road, Panchmura, West Bengal 722156
        </Text>
      </Section>

      <Hr style={divider} />

      {/* Closing */}
      <Text style={paragraph}>
        We appreciate your connection with Tridhara Milan Mandir and look forward
        to serving you. May you always be blessed with peace and prosperity.
      </Text>

      <Text style={signature}>
        With warm regards,<br />
        <strong>Tridhara Milan Mandir Team</strong>
      </Text>

      {/* Stay Connected */}
      <Section style={socialBox}>
        <Text style={socialText}>Stay connected with us:</Text>
        <Section style={socialLinks}>
          <Link href="https://facebook.com" style={socialLink}>
            Facebook
          </Link>
          {' | '}
          <Link href="https://instagram.com" style={socialLink}>
            Instagram
          </Link>
          {' | '}
          <Link href="https://youtube.com" style={socialLink}>
            YouTube
          </Link>
        </Section>
      </Section>
    </EmailLayout>
  );
};

export default FollowUpEmail;

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

const infoBox = {
  backgroundColor: '#f9fafb',
  borderLeft: '4px solid #E5B76A',
  padding: '16px',
  marginBottom: '24px',
};

const infoText = {
  color: '#374151',
  fontSize: '14px',
  margin: '0',
  lineHeight: '1.5',
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
  margin: '0 0 16px 0',
};

const listText = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '1.8',
  margin: '0 0 16px 0',
};

const thankYouBox = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #86efac',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '24px',
};

const thankYouTitle = {
  color: '#15803d',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 16px 0',
};

const feedbackBox = {
  backgroundColor: '#eff6ff',
  border: '1px solid #93c5fd',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '24px',
};

const feedbackTitle = {
  color: '#1e40af',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 16px 0',
};

const volunteerBox = {
  backgroundColor: '#fff7ed',
  border: '1px solid #fed7aa',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '24px',
};

const volunteerTitle = {
  color: '#9a3412',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 16px 0',
};

const stepsList = {
  marginTop: '16px',
};

const step = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
};

const stepNumber = {
  backgroundColor: '#E5B76A',
  color: '#452937',
  fontSize: '14px',
  fontWeight: '700',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '12px',
  flexShrink: 0,
};

const stepText = {
  color: '#7c2d12',
  fontSize: '15px',
  margin: '0',
};

const eventBox = {
  backgroundColor: '#faf5ff',
  border: '1px solid #d8b4fe',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '24px',
};

const eventTitle = {
  color: '#6b21a8',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 16px 0',
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '24px 0',
};

const ctaBox = {
  textAlign: 'center' as const,
  padding: '24px',
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
};

const ctaText = {
  color: '#374151',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 16px 0',
};

const ctaButton = {
  backgroundColor: '#A96842',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  padding: '14px 32px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-block',
};

const contactBox = {
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '24px',
};

const contactTitle = {
  color: '#452937',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 16px 0',
};

const contactText = {
  color: '#374151',
  fontSize: '15px',
  margin: '0 0 12px 0',
  lineHeight: '1.6',
};

const linkStyle = {
  color: '#A96842',
  textDecoration: 'none',
  fontWeight: '600',
};

const signature = {
  color: '#452937',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '24px 0 0 0',
};

const socialBox = {
  textAlign: 'center' as const,
  padding: '20px',
  marginTop: '24px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
};

const socialText = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 12px 0',
};

const socialLinks = {
  fontSize: '14px',
};

const socialLink = {
  color: '#A96842',
  textDecoration: 'none',
  fontWeight: '600',
};
