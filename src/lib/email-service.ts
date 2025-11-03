/**
 * Comprehensive Email Service for Tridhara Milan Mandir
 *
 * This module provides helper functions for sending various types of emails
 * using ZeptoMail and react-email templates.
 */

import { render } from '@react-email/render';
import { ZeptoMailService, ZeptoMailConfig } from './zeptomail';

// Import all email templates
import ContactFormEmail, { ContactFormEmailProps } from '@/emails/ContactFormEmail';
import WelcomeVolunteerEmail, { WelcomeVolunteerEmailProps } from '@/emails/WelcomeVolunteerEmail';
import DonationReceiptEmail, { DonationReceiptEmailProps } from '@/emails/DonationReceiptEmail';
import EventRegistrationEmail, { EventRegistrationEmailProps } from '@/emails/EventRegistrationEmail';
import NewsletterEmail, { NewsletterEmailProps } from '@/emails/NewsletterEmail';
import FollowUpEmail, { FollowUpEmailProps } from '@/emails/FollowUpEmail';

/**
 * Email Service class for handling all email operations
 */
export class EmailService {
  private zeptoMail: ZeptoMailService;
  private defaultFromEmail: string;
  private defaultFromName: string;

  constructor(config: ZeptoMailConfig) {
    this.zeptoMail = new ZeptoMailService(config);
    this.defaultFromEmail = config.fromEmail;
    this.defaultFromName = config.fromName;
  }

  /**
   * Send contact form email
   */
  async sendContactFormEmail(
    to: string,
    data: ContactFormEmailProps & { inquiryType: string }
  ): Promise<{ success: boolean; message: string }> {
    try {
      const htmlBody = await render(ContactFormEmail(data));
      const textBody = this.generatePlainTextFromContact(data);

      return await this.sendEmail({
        to,
        subject: `New ${data.inquiryType} Inquiry - ${data.name}`,
        html: htmlBody,
        text: textBody,
        replyTo: { email: data.email, name: data.name },
      });
    } catch (error) {
      console.error('Error sending contact form email:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }

  /**
   * Send welcome volunteer email
   */
  async sendWelcomeVolunteerEmail(
    data: WelcomeVolunteerEmailProps
  ): Promise<{ success: boolean; message: string }> {
    try {
      const htmlBody = await render(WelcomeVolunteerEmail(data));
      const textBody = this.generatePlainTextFromVolunteer(data);

      return await this.sendEmail({
        to: data.email,
        subject: `Welcome to Tridhara Milan Mandir Volunteer Program!`,
        html: htmlBody,
        text: textBody,
      });
    } catch (error) {
      console.error('Error sending welcome volunteer email:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }

  /**
   * Send donation receipt email
   */
  async sendDonationReceiptEmail(
    data: DonationReceiptEmailProps
  ): Promise<{ success: boolean; message: string }> {
    try {
      const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: data.currency || 'INR',
        minimumFractionDigits: 0,
      }).format(data.amount);

      const htmlBody = await render(DonationReceiptEmail(data));
      const textBody = this.generatePlainTextFromDonation(data);

      return await this.sendEmail({
        to: data.email,
        subject: `Donation Receipt ${data.receiptNumber} - ${formattedAmount}`,
        html: htmlBody,
        text: textBody,
      });
    } catch (error) {
      console.error('Error sending donation receipt email:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }

  /**
   * Send event registration confirmation email
   */
  async sendEventRegistrationEmail(
    data: EventRegistrationEmailProps
  ): Promise<{ success: boolean; message: string }> {
    try {
      const htmlBody = await render(EventRegistrationEmail(data));
      const textBody = this.generatePlainTextFromEvent(data);

      return await this.sendEmail({
        to: data.email,
        subject: `Event Registration Confirmed: ${data.eventName}`,
        html: htmlBody,
        text: textBody,
      });
    } catch (error) {
      console.error('Error sending event registration email:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }

  /**
   * Send newsletter email
   */
  async sendNewsletterEmail(
    to: string,
    data: NewsletterEmailProps
  ): Promise<{ success: boolean; message: string }> {
    try {
      const htmlBody = await render(NewsletterEmail(data));
      const textBody = this.generatePlainTextFromNewsletter(data);

      return await this.sendEmail({
        to,
        subject: `Tridhara Milan Mandir Newsletter - ${data.month} ${data.year}`,
        html: htmlBody,
        text: textBody,
      });
    } catch (error) {
      console.error('Error sending newsletter email:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }

  /**
   * Send follow-up email
   */
  async sendFollowUpEmail(
    data: FollowUpEmailProps
  ): Promise<{ success: boolean; message: string }> {
    try {
      const htmlBody = await render(FollowUpEmail(data));
      const textBody = this.generatePlainTextFromFollowUp(data);

      const subjectMap = {
        inquiry: 'Following Up on Your Inquiry',
        donation: 'Thank You for Your Support',
        visit: 'Hope You Enjoyed Your Visit',
        volunteer: 'Volunteer Application Follow-Up',
        event: 'Thank You for Attending',
        general: 'Following Up With You',
      };

      return await this.sendEmail({
        to: data.email,
        subject: `${subjectMap[data.followUpType]} - Tridhara Milan Mandir`,
        html: htmlBody,
        text: textBody,
      });
    } catch (error) {
      console.error('Error sending follow-up email:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }

  /**
   * Internal method to send email via ZeptoMail
   */
  private async sendEmail({
    to,
    subject,
    html,
    text,
    replyTo,
  }: {
    to: string;
    subject: string;
    html: string;
    text: string;
    replyTo?: { email: string; name: string };
  }): Promise<{ success: boolean; message: string }> {
    try {
      const payload = {
        from: {
          address: this.defaultFromEmail,
          name: this.defaultFromName,
        },
        to: [
          {
            email_address: {
              address: to,
              name: '',
            },
          },
        ],
        subject,
        htmlbody: html,
        textbody: text,
        ...(replyTo && {
          reply_to: [
            {
              address: replyTo.email,
              name: replyTo.name,
            },
          ],
        }),
      };

      const response = await fetch('https://api.zeptomail.in/v1.1/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.zeptoMail['config'].apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('ZeptoMail API Error:', errorData);
        throw new Error(`ZeptoMail API error: ${response.status}`);
      }

      return {
        success: true,
        message: 'Email sent successfully',
      };
    } catch (error) {
      console.error('Error sending email via ZeptoMail:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }

  // Plain text generation methods
  private generatePlainTextFromContact(data: ContactFormEmailProps & { inquiryType: string }): string {
    return `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Inquiry Type: ${data.inquiryType}
Preferred Contact: ${data.preferredContact || 'Not specified'}

Message:
${data.message}

---
Sent from Tridhara Mandir Website
Received at: ${data.submittedAt}
    `.trim();
  }

  private generatePlainTextFromVolunteer(data: WelcomeVolunteerEmailProps): string {
    return `
Welcome to Tridhara Milan Mandir Volunteer Program!

Namaste ${data.volunteerName},

We are delighted to welcome you to the Tridhara Milan Mandir volunteer family!

We'll contact you within 2-3 business days to schedule your orientation.

Contact:
Phone: +91 96091 75202
Email: info@tridharamandir.com

With gratitude and blessings,
Tridhara Milan Mandir Team

Application received on ${data.submittedAt}
    `.trim();
  }

  private generatePlainTextFromDonation(data: DonationReceiptEmailProps): string {
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: data.currency || 'INR',
      minimumFractionDigits: 0,
    }).format(data.amount);

    return `
Donation Receipt - Tridhara Milan Mandir

Thank You, ${data.donorName}!

Receipt Number: ${data.receiptNumber}
Transaction ID: ${data.transactionId}
Date: ${data.donationDate}
Amount: ${formattedAmount}
Type: ${data.donationType}

Your contribution helps us continue our spiritual and community services.

Contact:
Phone: +91 96091 75202
Email: info@tridharamandir.com

With heartfelt gratitude,
Tridhara Milan Mandir
    `.trim();
  }

  private generatePlainTextFromEvent(data: EventRegistrationEmailProps): string {
    return `
Event Registration Confirmed

Namaste ${data.attendeeName}!

Registration ID: ${data.registrationId}

Event: ${data.eventName}
Date: ${data.eventDate}
Time: ${data.eventTime}
${data.eventLocation ? `Location: ${data.eventLocation}` : ''}

We look forward to seeing you!

Contact:
Phone: +91 96091 75202
Email: info@tridharamandir.com

Tridhara Milan Mandir Events Team
    `.trim();
  }

  private generatePlainTextFromNewsletter(data: NewsletterEmailProps): string {
    const greeting = data.recipientName ? `Namaste ${data.recipientName}` : 'Namaste';

    return `
Tridhara Milan Mandir Newsletter - ${data.month} ${data.year}

${greeting},

${data.headline}

${data.message}

${data.news.map(item => `${item.title}\n${item.description}`).join('\n\n')}

Visit our website: https://tridharamandir.com

With divine blessings,
Tridhara Milan Mandir
    `.trim();
  }

  private generatePlainTextFromFollowUp(data: FollowUpEmailProps): string {
    return `
Follow-Up - Tridhara Milan Mandir

Namaste ${data.recipientName},

${data.message}

${data.originalDate ? `Original Contact: ${data.originalDate}` : ''}

${data.additionalInfo || ''}

Contact:
Phone: +91 96091 75202
Email: info@tridharamandir.com
Website: https://tridharamandir.com

With warm regards,
Tridhara Milan Mandir Team
    `.trim();
  }
}

/**
 * Factory function to create EmailService instance with environment variables
 */
export function createEmailService(): EmailService {
  const config: ZeptoMailConfig = {
    apiKey: process.env.ZEPTOMAIL_API_KEY || '',
    fromEmail: process.env.ZEPTOMAIL_FROM_EMAIL || '',
    fromName: process.env.ZEPTOMAIL_FROM_NAME || 'Tridhara Mandir',
    toEmail: process.env.ZEPTOMAIL_TO_EMAIL || 'info@tridharamandir.com',
  };

  return new EmailService(config);
}
