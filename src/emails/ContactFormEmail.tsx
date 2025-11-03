import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

export interface ContactFormEmailProps {
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
  preferredContact?: string;
  submittedAt: string;
}

export const ContactFormEmail = ({
  name = 'Rajesh Kumar',
  email = 'rajesh@example.com',
  phone = '+91 98765 43210',
  inquiryType = 'General Inquiry',
  message = 'I would like to know more about the temple services and timings.',
  preferredContact = 'Email',
  submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long',
  }),
}: ContactFormEmailProps) => {
  const previewText = `New ${inquiryType} from ${name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with temple branding */}
          <Section style={header}>
            <Text style={headerIcon}>🕉️</Text>
            <Heading style={headerTitle}>
              New Contact Form Submission
            </Heading>
            <Text style={headerSubtitle}>From Tridhara Milan Mandir Website</Text>
          </Section>

          {/* Inquiry Type Badge */}
          <Section style={badgeSection}>
            <Text style={badge}>{inquiryType}</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            {/* Name */}
            <Section style={field}>
              <Text style={fieldLabel}>Name</Text>
              <Text style={fieldValue}>{name}</Text>
            </Section>

            {/* Email */}
            <Section style={field}>
              <Text style={fieldLabel}>Email</Text>
              <Link href={`mailto:${email}`} style={linkStyle}>
                {email}
              </Link>
            </Section>

            {/* Phone (if provided) */}
            {phone && (
              <Section style={field}>
                <Text style={fieldLabel}>Phone</Text>
                <Link href={`tel:${phone}`} style={linkStyle}>
                  {phone}
                </Link>
              </Section>
            )}

            {/* Preferred Contact (if provided) */}
            {preferredContact && (
              <Section style={field}>
                <Text style={fieldLabel}>Preferred Contact Method</Text>
                <Text style={fieldValue}>{preferredContact}</Text>
              </Section>
            )}

            <Hr style={divider} />

            {/* Message */}
            <Section style={field}>
              <Text style={fieldLabel}>Message</Text>
              <Section style={messageBox}>
                <Text style={messageText}>{message}</Text>
              </Section>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Received at: {submittedAt}
            </Text>
            <Text style={footerText}>
              Reply directly to this email to contact {name}
            </Text>
            <Hr style={footerDivider} />
            <Text style={footerSubtext}>
              This inquiry was submitted through the contact form on{' '}
              <Link href="https://tridharamandir.com" style={footerLink}>
                tridharamandir.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactFormEmail;

// Styles
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", "Helvetica Neue", Arial, sans-serif',
  padding: '20px',
};

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  maxWidth: '600px',
  margin: '0 auto',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const header = {
  background: 'linear-gradient(135deg, #452937 0%, #1B0A2C 100%)',
  padding: '40px 30px',
  textAlign: 'center' as const,
};

const headerIcon = {
  fontSize: '48px',
  margin: '0 0 10px 0',
  lineHeight: '1',
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 8px 0',
  lineHeight: '1.2',
};

const headerSubtitle = {
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '14px',
  fontWeight: '400',
  margin: '0',
  lineHeight: '1.4',
};

const badgeSection = {
  padding: '20px 30px 10px',
  textAlign: 'center' as const,
};

const badge = {
  display: 'inline-block',
  backgroundColor: '#E5B76A',
  color: '#452937',
  padding: '8px 20px',
  borderRadius: '20px',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
  lineHeight: '1',
};

const content = {
  padding: '10px 30px 30px',
};

const field = {
  marginBottom: '24px',
};

const fieldLabel = {
  color: '#452937',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 8px 0',
  lineHeight: '1.4',
};

const fieldValue = {
  color: '#4b5563',
  fontSize: '16px',
  fontWeight: '400',
  margin: '0',
  lineHeight: '1.6',
};

const linkStyle = {
  color: '#A96842',
  fontSize: '16px',
  fontWeight: '400',
  textDecoration: 'none',
  lineHeight: '1.6',
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '24px 0',
};

const messageBox = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '16px',
  marginTop: '8px',
};

const messageText = {
  color: '#374151',
  fontSize: '15px',
  fontWeight: '400',
  margin: '0',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
};

const footer = {
  backgroundColor: '#f9fafb',
  padding: '30px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e5e7eb',
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '400',
  margin: '0 0 10px 0',
  lineHeight: '1.5',
};

const footerDivider = {
  borderColor: '#e5e7eb',
  margin: '20px 0',
};

const footerSubtext = {
  color: '#9ca3af',
  fontSize: '12px',
  fontWeight: '400',
  margin: '0',
  lineHeight: '1.5',
};

const footerLink = {
  color: '#A96842',
  textDecoration: 'none',
};
