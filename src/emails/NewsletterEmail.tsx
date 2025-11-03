import { Heading, Text, Section, Hr, Link, Img } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from './components/EmailLayout';

export interface NewsItem {
  title: string;
  description: string;
  link?: string;
  imageUrl?: string;
}

export interface UpcomingEvent {
  name: string;
  date: string;
  time: string;
  link?: string;
}

export interface NewsletterEmailProps {
  recipientName?: string;
  month: string;
  year: string;
  headline: string;
  message: string;
  news: NewsItem[];
  upcomingEvents?: UpcomingEvent[];
  quote?: {
    text: string;
    author: string;
  };
}

export const NewsletterEmail = ({
  recipientName,
  month = 'January',
  year = '2025',
  headline = 'Spreading Divine Blessings',
  message = 'As we step into a new month, we share updates from our temple community and invite you to upcoming celebrations.',
  news = [
    {
      title: 'New Prasad Distribution Schedule',
      description: 'We are pleased to announce extended prasad distribution timings on weekends to serve more devotees.',
      link: 'https://tridharamandir.com/services',
    },
    {
      title: 'Temple Renovation Progress',
      description: 'Thanks to your generous donations, our temple beautification project is progressing well.',
    },
  ],
  upcomingEvents = [
    {
      name: 'Janmashtami Celebration',
      date: 'August 26, 2025',
      time: '6:00 PM',
      link: 'https://tridharamandir.com/events',
    },
  ],
  quote = {
    text: 'The mind acts like an enemy for those who do not control it.',
    author: 'Bhagavad Gita 6.6',
  },
}: NewsletterEmailProps) => {
  const greeting = recipientName ? `Namaste ${recipientName}` : 'Namaste';

  return (
    <EmailLayout
      previewText={`${month} ${year} Newsletter - ${headline}`}
      headerIcon="📰"
      headerTitle="Temple Newsletter"
      headerSubtitle={`${month} ${year} Edition`}
    >
      {/* Greeting */}
      <Heading style={heading}>{greeting},</Heading>

      {/* Headline */}
      <Section style={headlineBox}>
        <Text style={headlineText}>{headline}</Text>
      </Section>

      {/* Opening Message */}
      <Text style={paragraph}>{message}</Text>

      <Hr style={divider} />

      {/* News & Updates */}
      <Heading style={sectionHeading}>📰 News & Updates</Heading>

      {news.map((item, index) => (
        <Section key={index} style={newsCard}>
          {item.imageUrl && (
            <Img
              src={item.imageUrl}
              alt={item.title}
              style={newsImage}
            />
          )}
          <Heading style={newsTitle}>{item.title}</Heading>
          <Text style={newsDescription}>{item.description}</Text>
          {item.link && (
            <Link href={item.link} style={readMoreLink}>
              Read More →
            </Link>
          )}
        </Section>
      ))}

      <Hr style={divider} />

      {/* Upcoming Events */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <>
          <Heading style={sectionHeading}>🎉 Upcoming Events</Heading>

          {upcomingEvents.map((event, index) => (
            <Section key={index} style={eventCard}>
              <Section style={eventHeader}>
                <Text style={eventIcon}>📅</Text>
                <Section>
                  <Heading style={eventName}>{event.name}</Heading>
                  <Text style={eventDetails}>
                    {event.date} • {event.time}
                  </Text>
                </Section>
              </Section>
              {event.link && (
                <Link href={event.link} style={registerLink}>
                  Register Now →
                </Link>
              )}
            </Section>
          ))}

          <Hr style={divider} />
        </>
      )}

      {/* Spiritual Quote */}
      {quote && (
        <Section style={quoteBox}>
          <Text style={quoteIcon}>"</Text>
          <Text style={quoteText}>{quote.text}</Text>
          <Text style={quoteAuthor}>— {quote.author}</Text>
        </Section>
      )}

      <Hr style={divider} />

      {/* Call to Action */}
      <Section style={ctaBox}>
        <Heading style={ctaHeading}>Stay Connected</Heading>

        <Section style={ctaButtons}>
          <Section style={ctaButtonContainer}>
            <Link href="https://tridharamandir.com/events" style={ctaButton}>
              View All Events
            </Link>
          </Section>
          <Section style={ctaButtonContainer}>
            <Link href="https://tridharamandir.com/services/donation-and-seva" style={ctaButton}>
              Make a Donation
            </Link>
          </Section>
        </Section>
      </Section>

      <Hr style={divider} />

      {/* Volunteer Opportunity */}
      <Section style={volunteerBox}>
        <Heading style={volunteerTitle}>🙏 Volunteer With Us</Heading>
        <Text style={volunteerText}>
          Be a part of our temple seva. We're always looking for dedicated volunteers
          to help with various activities. Contact us to learn more!
        </Text>
        <Link href="https://tridharamandir.com/#visit" style={volunteerLink}>
          Join Our Team →
        </Link>
      </Section>

      <Hr style={divider} />

      {/* Social Media */}
      <Section style={socialBox}>
        <Text style={socialText}>Follow us on social media for daily updates:</Text>
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

      <Hr style={divider} />

      {/* Closing */}
      <Text style={paragraph}>
        Thank you for being a valued member of our temple community. We look forward
        to welcoming you soon!
      </Text>

      <Text style={signature}>
        With divine blessings,<br />
        <strong>Tridhara Milan Mandir</strong>
      </Text>

      {/* Unsubscribe */}
      <Section style={unsubscribeBox}>
        <Text style={unsubscribeText}>
          You received this email because you're subscribed to our newsletter.
          {' '}
          <Link href="https://tridharamandir.com/unsubscribe" style={unsubscribeLink}>
            Unsubscribe
          </Link>
        </Text>
      </Section>
    </EmailLayout>
  );
};

export default NewsletterEmail;

// Styles
const heading = {
  color: '#452937',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 24px 0',
  lineHeight: '1.3',
};

const paragraph = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px 0',
};

const headlineBox = {
  backgroundColor: '#fef3c7',
  borderLeft: '4px solid #E5B76A',
  padding: '20px',
  marginBottom: '24px',
};

const headlineText = {
  color: '#92400e',
  fontSize: '20px',
  fontWeight: '700',
  margin: '0',
  lineHeight: '1.4',
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const sectionHeading = {
  color: '#452937',
  fontSize: '22px',
  fontWeight: '700',
  margin: '0 0 20px 0',
};

const newsCard = {
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '20px',
  border: '1px solid #e5e7eb',
};

const newsImage = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  marginBottom: '16px',
};

const newsTitle = {
  color: '#452937',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 12px 0',
};

const newsDescription = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 12px 0',
};

const readMoreLink = {
  color: '#A96842',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
};

const eventCard = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #86efac',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '16px',
};

const eventHeader = {
  display: 'flex',
  marginBottom: '12px',
};

const eventIcon = {
  fontSize: '28px',
  marginRight: '12px',
  lineHeight: '1',
};

const eventName = {
  color: '#15803d',
  fontSize: '16px',
  fontWeight: '700',
  margin: '0 0 4px 0',
};

const eventDetails = {
  color: '#166534',
  fontSize: '14px',
  margin: '0',
};

const registerLink = {
  color: '#15803d',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
};

const quoteBox = {
  backgroundColor: '#faf5ff',
  border: '2px solid #d8b4fe',
  borderRadius: '12px',
  padding: '32px',
  textAlign: 'center' as const,
};

const quoteIcon = {
  color: '#9333ea',
  fontSize: '48px',
  fontWeight: '700',
  margin: '0',
  lineHeight: '1',
};

const quoteText = {
  color: '#6b21a8',
  fontSize: '18px',
  fontStyle: 'italic',
  lineHeight: '1.6',
  margin: '16px 0',
};

const quoteAuthor = {
  color: '#7e22ce',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const ctaBox = {
  backgroundColor: '#eff6ff',
  borderRadius: '12px',
  padding: '32px',
  textAlign: 'center' as const,
};

const ctaHeading = {
  color: '#1e40af',
  fontSize: '20px',
  fontWeight: '700',
  margin: '0 0 20px 0',
};

const ctaButtons = {
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
};

const ctaButtonContainer = {
  margin: '0 8px',
};

const ctaButton = {
  backgroundColor: '#A96842',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600',
  padding: '12px 24px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-block',
};

const volunteerBox = {
  backgroundColor: '#fff7ed',
  border: '1px solid #fed7aa',
  borderRadius: '12px',
  padding: '24px',
  textAlign: 'center' as const,
};

const volunteerTitle = {
  color: '#9a3412',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 12px 0',
};

const volunteerText = {
  color: '#7c2d12',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 16px 0',
};

const volunteerLink = {
  color: '#9a3412',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
};

const socialBox = {
  textAlign: 'center' as const,
  padding: '20px',
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

const signature = {
  color: '#452937',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '24px 0 0 0',
};

const unsubscribeBox = {
  marginTop: '32px',
  paddingTop: '20px',
  borderTop: '1px solid #e5e7eb',
  textAlign: 'center' as const,
};

const unsubscribeText = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0',
  lineHeight: '1.5',
};

const unsubscribeLink = {
  color: '#6b7280',
  textDecoration: 'underline',
};
