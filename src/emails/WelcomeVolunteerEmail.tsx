import { Heading, Text, Section, Hr, Link } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/EmailLayout';

export interface WelcomeVolunteerEmailProps {
  volunteerName: string;
  email: string;
  phone?: string;
  submittedAt?: string;
}

export const WelcomeVolunteerEmail = ({
  volunteerName = 'Priya Sharma',
  email = 'priya@example.com',
  phone = '+91 98765 43210',
  submittedAt = new Date().toLocaleDateString('en-IN', {
    dateStyle: 'long',
  }),
}: WelcomeVolunteerEmailProps) => {
  return (
    <EmailLayout
      previewText={`Welcome to Tridhara Milan Mandir, ${volunteerName}!`}
      headerIcon="🙏"
      headerTitle="Welcome, Volunteer!"
      headerSubtitle="Thank you for joining our seva"
    >
      {/* Greeting */}
      <Heading style={heading}>Namaste {volunteerName},</Heading>

      <Text style={paragraph}>
        We are delighted to welcome you to the Tridhara Milan Mandir volunteer family!
        Your dedication to serving the temple community is truly appreciated.
      </Text>

      {/* Next Steps */}
      <Section style={card}>
        <Heading style={cardTitle}>📋 Next Steps</Heading>

        <Section style={listItem}>
          <Text style={listNumber}>1</Text>
          <Text style={listText}>
            <strong>Orientation:</strong> We&apos;ll contact you within 2-3 business days
            to schedule your volunteer orientation session.
          </Text>
        </Section>

        <Section style={listItem}>
          <Text style={listNumber}>2</Text>
          <Text style={listText}>
            <strong>Training:</strong> Learn about our temple operations, safety protocols,
            and service areas.
          </Text>
        </Section>

        <Section style={listItem}>
          <Text style={listNumber}>3</Text>
          <Text style={listText}>
            <strong>Get Started:</strong> Begin your seva journey with us and make a
            meaningful impact in our community.
          </Text>
        </Section>
      </Section>

      {/* Volunteer Opportunities */}
      <Section style={card}>
        <Heading style={cardTitle}>🎯 Volunteer Opportunities</Heading>

        <Text style={paragraph}>
          <strong>Temple Services:</strong> Assist with daily puja, aarti ceremonies,
          and festival preparations.
        </Text>

        <Text style={paragraph}>
          <strong>Community Outreach:</strong> Help organize events, workshops, and
          cultural programs.
        </Text>

        <Text style={paragraph}>
          <strong>Administrative Support:</strong> Assist with documentation,
          communication, and coordination.
        </Text>

        <Text style={paragraph}>
          <strong>Guest Services:</strong> Welcome visitors, provide information,
          and ensure a memorable experience.
        </Text>
      </Section>

      <Hr style={divider} />

      {/* Contact Info */}
      <Text style={paragraph}>
        If you have any questions or need to reschedule, please don&apos;t hesitate to
        contact us:
      </Text>

      <Section style={contactBox}>
        <Text style={contactText}>
          📞 Phone: <Link href={`tel:+919609175202`} style={linkStyle}>+91 96091 75202</Link>
        </Text>
        <Text style={contactText}>
          📧 Email: <Link href="mailto:info@tridharamandir.com" style={linkStyle}>info@tridharamandir.com</Link>
        </Text>
      </Section>

      <Hr style={divider} />

      {/* Closing */}
      <Text style={paragraph}>
        Once again, thank you for choosing to serve with us. Your time and energy
        will help us create a welcoming spiritual home for all.
      </Text>

      <Text style={signature}>
        With gratitude and blessings,<br />
        <strong>Tridhara Milan Mandir Team</strong>
      </Text>

      {/* Application Details */}
      <Text style={metaText}>
        Application received on {submittedAt}
      </Text>
    </EmailLayout>
  );
};

export default WelcomeVolunteerEmail;

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

const listItem = {
  display: 'flex',
  marginBottom: '16px',
};

const listNumber = {
  backgroundColor: '#E5B76A',
  color: '#452937',
  fontSize: '14px',
  fontWeight: '700',
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '12px',
  flexShrink: 0,
};

const listText = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
  paddingTop: '4px',
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '24px 0',
};

const contactBox = {
  backgroundColor: '#fff7ed',
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

const signature = {
  color: '#452937',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '24px 0 0 0',
};

const metaText = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '24px 0 0 0',
  fontStyle: 'italic',
};
