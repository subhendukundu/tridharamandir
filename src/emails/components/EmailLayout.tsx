import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Link,
} from '@react-email/components';
import * as React from 'react';

interface EmailLayoutProps {
  children: React.ReactNode;
  previewText: string;
  headerIcon?: string;
  headerTitle: string;
  headerSubtitle?: string;
}

export const EmailLayout = ({
  children,
  previewText,
  headerIcon = '🕉️',
  headerTitle,
  headerSubtitle,
}: EmailLayoutProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with temple branding */}
          <Section style={header}>
            <Text style={headerIconStyle}>{headerIcon}</Text>
            <Text style={headerTitleStyle}>{headerTitle}</Text>
            {headerSubtitle && (
              <Text style={headerSubtitleStyle}>{headerSubtitle}</Text>
            )}
          </Section>

          {/* Main Content */}
          <Section style={content}>{children}</Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerTitle}>Tridhara Milan Mandir</Text>
            <Text style={footerAddress}>
              Tridhara Milan Mandir Road, Panchmura, West Bengal 722156, India
            </Text>
            <Text style={footerContact}>
              📞 +91 96091 75202 | 📧 info@tridharamandir.com
            </Text>
            <Hr style={footerDivider} />
            <Text style={footerLinks}>
              <Link href="https://tridharamandir.com" style={linkStyle}>
                Visit Website
              </Link>
              {' | '}
              <Link href="https://tridharamandir.com/plan-your-visit" style={linkStyle}>
                Plan Your Visit
              </Link>
              {' | '}
              <Link href="https://tridharamandir.com/services" style={linkStyle}>
                Our Services
              </Link>
            </Text>
            <Text style={footerSubtext}>
              This email was sent from Tridhara Milan Mandir. If you have any questions,
              please reply to this email or contact us directly.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

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

const headerIconStyle = {
  fontSize: '48px',
  margin: '0 0 10px 0',
  lineHeight: '1',
};

const headerTitleStyle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 8px 0',
  lineHeight: '1.2',
};

const headerSubtitleStyle = {
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '14px',
  fontWeight: '400',
  margin: '0',
  lineHeight: '1.4',
};

const content = {
  padding: '30px',
};

const footer = {
  backgroundColor: '#f9fafb',
  padding: '30px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e5e7eb',
};

const footerTitle = {
  color: '#452937',
  fontSize: '16px',
  fontWeight: '700',
  margin: '0 0 8px 0',
};

const footerAddress = {
  color: '#6b7280',
  fontSize: '13px',
  margin: '0 0 8px 0',
  lineHeight: '1.5',
};

const footerContact = {
  color: '#6b7280',
  fontSize: '13px',
  margin: '0 0 16px 0',
  lineHeight: '1.5',
};

const footerDivider = {
  borderColor: '#e5e7eb',
  margin: '20px 0',
};

const footerLinks = {
  color: '#6b7280',
  fontSize: '13px',
  margin: '0 0 16px 0',
  lineHeight: '1.5',
};

const linkStyle = {
  color: '#A96842',
  textDecoration: 'none',
};

const footerSubtext = {
  color: '#9ca3af',
  fontSize: '11px',
  margin: '0',
  lineHeight: '1.5',
};
