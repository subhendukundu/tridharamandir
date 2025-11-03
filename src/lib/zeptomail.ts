/**
 * ZeptoMail integration for sending transactional emails
 * Documentation: https://www.zoho.com/zeptomail/help/api/email-sending.html
 */

import { render } from '@react-email/render';
import ContactFormEmail from '@/emails/ContactFormEmail';

export interface ZeptoMailConfig {
  apiKey: string;
  fromEmail: string;
  fromName: string;
  toEmail: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
  preferredContact?: string;
}

export class ZeptoMailService {
  private apiUrl = 'https://api.zeptomail.in/v1.1/email';
  private config: ZeptoMailConfig;

  constructor(config: ZeptoMailConfig) {
    this.config = config;
  }

  async sendContactFormEmail(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const emailBody = await this.formatContactFormEmail(formData);

      const payload = {
        from: {
          address: this.config.fromEmail,
          name: this.config.fromName,
        },
        to: [
          {
            email_address: {
              address: this.config.toEmail,
              name: 'Tridhara Mandir',
            },
          },
        ],
        subject: `New ${formData.inquiryType} Inquiry - ${formData.name}`,
        htmlbody: emailBody.html,
        textbody: emailBody.text,
        reply_to: [
          {
            address: formData.email,
            name: formData.name,
          },
        ],
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.config.apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('ZeptoMail API Error:', errorData);
        throw new Error(`ZeptoMail API error: ${response.status}`);
      }

      const result = await response.json();
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

  private async formatContactFormEmail(formData: ContactFormData): Promise<{ html: string; text: string }> {
    const submittedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    // Render HTML email using react-email
    const htmlBody = await render(
      ContactFormEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        inquiryType: formData.inquiryType,
        message: formData.message,
        preferredContact: formData.preferredContact,
        submittedAt,
      })
    );

    // Plain text fallback
    const textBody = `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Inquiry Type: ${formData.inquiryType}
Preferred Contact: ${formData.preferredContact || 'Not specified'}

Message:
${formData.message}

---
Sent from Tridhara Mandir Website
Received at: ${submittedAt}
    `.trim();

    return { html: htmlBody, text: textBody };
  }
}
