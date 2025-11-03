import { Heading, Text, Section, Hr, Link } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/EmailLayout';

export interface DonationReceiptEmailProps {
  donorName: string;
  email: string;
  phone?: string;
  amount: number;
  currency?: string;
  donationType: string;
  transactionId: string;
  donationDate: string;
  receiptNumber: string;
  panNumber?: string;
  address?: string;
}

export const DonationReceiptEmail = ({
  donorName = 'Rajesh Kumar',
  email = 'rajesh@example.com',
  phone = '+91 98765 43210',
  amount = 5000,
  currency = 'INR',
  donationType = 'General Donation',
  transactionId = 'TXN123456789',
  donationDate = new Date().toLocaleDateString('en-IN', {
    dateStyle: 'long',
  }),
  receiptNumber = 'TMM-2025-0001',
  panNumber,
  address,
}: DonationReceiptEmailProps) => {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);

  return (
    <EmailLayout
      previewText={`Donation Receipt - ${formattedAmount} - ${receiptNumber}`}
      headerIcon="🙏"
      headerTitle="Donation Receipt"
      headerSubtitle="Thank you for your generous contribution"
    >
      {/* Thank You Message */}
      <Heading style={heading}>Thank You, {donorName}!</Heading>

      <Text style={paragraph}>
        We are deeply grateful for your generous donation to Tridhara Milan Mandir.
        Your contribution helps us continue our spiritual and community services.
      </Text>

      <Section style={badge}>
        <Text style={badgeText}>
          Donation Amount: <strong style={amountText}>{formattedAmount}</strong>
        </Text>
      </Section>

      {/* Receipt Details */}
      <Section style={card}>
        <Heading style={cardTitle}>📄 Receipt Details</Heading>

        <Section style={detailRow}>
          <Text style={detailLabel}>Receipt Number:</Text>
          <Text style={detailValue}>{receiptNumber}</Text>
        </Section>

        <Section style={detailRow}>
          <Text style={detailLabel}>Transaction ID:</Text>
          <Text style={detailValue}>{transactionId}</Text>
        </Section>

        <Section style={detailRow}>
          <Text style={detailLabel}>Donation Date:</Text>
          <Text style={detailValue}>{donationDate}</Text>
        </Section>

        <Section style={detailRow}>
          <Text style={detailLabel}>Donation Type:</Text>
          <Text style={detailValue}>{donationType}</Text>
        </Section>

        <Section style={detailRow}>
          <Text style={detailLabel}>Amount:</Text>
          <Text style={detailValue}>{formattedAmount}</Text>
        </Section>
      </Section>

      {/* Donor Information */}
      <Section style={card}>
        <Heading style={cardTitle}>👤 Donor Information</Heading>

        <Section style={detailRow}>
          <Text style={detailLabel}>Name:</Text>
          <Text style={detailValue}>{donorName}</Text>
        </Section>

        <Section style={detailRow}>
          <Text style={detailLabel}>Email:</Text>
          <Text style={detailValue}>
            <Link href={`mailto:${email}`} style={linkStyle}>
              {email}
            </Link>
          </Text>
        </Section>

        {phone && (
          <Section style={detailRow}>
            <Text style={detailLabel}>Phone:</Text>
            <Text style={detailValue}>
              <Link href={`tel:${phone}`} style={linkStyle}>
                {phone}
              </Link>
            </Text>
          </Section>
        )}

        {panNumber && (
          <Section style={detailRow}>
            <Text style={detailLabel}>PAN Number:</Text>
            <Text style={detailValue}>{panNumber}</Text>
          </Section>
        )}

        {address && (
          <Section style={detailRow}>
            <Text style={detailLabel}>Address:</Text>
            <Text style={detailValue}>{address}</Text>
          </Section>
        )}
      </Section>

      {/* Tax Information */}
      <Section style={taxInfoBox}>
        <Text style={taxInfoTitle}>💡 Tax Exemption Information</Text>
        <Text style={taxInfoText}>
          Tridhara Milan Mandir is registered under Section 80G of the Income Tax Act.
          This donation is eligible for tax deduction as per applicable laws.
          Please consult with your tax advisor for specific guidance.
        </Text>
        <Text style={taxInfoText}>
          <strong>Organization Details:</strong>
          <br />
          Tridhara Milan Mandir
          <br />
          Indus, Bankura, West Bengal 722205
          <br />
          PAN: [To be provided by temple]
        </Text>
      </Section>

      <Hr style={divider} />

      {/* Impact Message */}
      <Section style={impactBox}>
        <Heading style={impactTitle}>✨ Your Impact</Heading>
        <Text style={paragraph}>
          Your contribution helps us:
        </Text>
        <Text style={impactList}>
          • Maintain daily puja and religious ceremonies
          <br />
          • Support community welfare programs
          <br />
          • Preserve and promote spiritual heritage
          <br />
          • Organize cultural and educational events
          <br />
          • Provide prasad and services to devotees
        </Text>
      </Section>

      <Hr style={divider} />

      {/* Contact Information */}
      <Text style={paragraph}>
        For any queries regarding your donation, please contact us:
      </Text>

      <Section style={contactBox}>
        <Text style={contactText}>
          📞 Phone: <Link href="tel:+919609175202" style={linkStyle}>+91 96091 75202</Link>
        </Text>
        <Text style={contactText}>
          📧 Email: <Link href="mailto:info@tridharamandir.com" style={linkStyle}>info@tridharamandir.com</Link>
        </Text>
      </Section>

      <Hr style={divider} />

      {/* Closing */}
      <Text style={paragraph}>
        May the blessings of the divine be with you and your family always.
      </Text>

      <Text style={signature}>
        With heartfelt gratitude,<br />
        <strong>Tridhara Milan Mandir</strong>
      </Text>

      {/* Important Notice */}
      <Section style={noticeBox}>
        <Text style={noticeText}>
          <strong>Important:</strong> Please save this email for your tax records.
          For a physical receipt, please visit the temple office or reply to this email.
        </Text>
      </Section>
    </EmailLayout>
  );
};

export default DonationReceiptEmail;

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
  backgroundColor: '#fef3c7',
  border: '2px solid #E5B76A',
  borderRadius: '12px',
  padding: '20px',
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const badgeText = {
  color: '#92400e',
  fontSize: '18px',
  margin: '0',
  lineHeight: '1.4',
};

const amountText = {
  color: '#452937',
  fontSize: '28px',
  fontWeight: '700',
  display: 'block',
  marginTop: '8px',
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

const detailRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
  paddingBottom: '12px',
  borderBottom: '1px solid #e5e7eb',
};

const detailLabel = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const detailValue = {
  color: '#374151',
  fontSize: '14px',
  fontWeight: '400',
  margin: '0',
  textAlign: 'right' as const,
};

const taxInfoBox = {
  backgroundColor: '#eff6ff',
  border: '1px solid #93c5fd',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '24px',
};

const taxInfoTitle = {
  color: '#1e40af',
  fontSize: '16px',
  fontWeight: '700',
  margin: '0 0 12px 0',
};

const taxInfoText = {
  color: '#1e3a8a',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 12px 0',
};

const impactBox = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #86efac',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '24px',
};

const impactTitle = {
  color: '#15803d',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 12px 0',
};

const impactList = {
  color: '#166534',
  fontSize: '15px',
  lineHeight: '1.8',
  margin: '0',
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

const noticeBox = {
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '8px',
  padding: '16px',
  marginTop: '24px',
};

const noticeText = {
  color: '#991b1b',
  fontSize: '13px',
  margin: '0',
  lineHeight: '1.6',
};
