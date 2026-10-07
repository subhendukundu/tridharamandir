# Email Templates Guide

Complete guide to all email templates for Tridhara Milan Mandir.

## Overview

We've created **6 professional email templates** using react-email for all temple communications:

1. **Contact Form Email** - Inquiry notifications
2. **Welcome Volunteer Email** - New volunteer onboarding
3. **Donation Receipt Email** - Donation acknowledgments
4. **Event Registration Email** - Event confirmations
5. **Newsletter Email** - Monthly updates
6. **Follow-Up Email** - Multi-purpose follow-ups

All templates share a consistent design with:
- Temple branding (gradient header, colors matching brand)
- Professional layout
- Mobile-responsive design
- Plain text fallbacks
- Accessibility features

## 📧 Email Templates

### 1. Contact Form Email

**File:** [`/src/emails/ContactFormEmail.tsx`](/src/emails/ContactFormEmail.tsx)

**Purpose:** Sent to temple admin when someone submits the contact form

**Features:**
- Displays all form fields
- Inquiry type badge
- Click to call/email links
- Reply-to set to submitter

**Usage:**
```typescript
import { createEmailService } from '@/lib/email-service';

const emailService = createEmailService();

await emailService.sendContactFormEmail('info@tridharamandir.com', {
  name: 'Rajesh Kumar',
  email: 'rajesh@example.com',
  phone: '+91 98765 43210',
  inquiryType: 'General Inquiry',
  message: 'I would like to visit the temple next week.',
  preferredContact: 'Email',
  submittedAt: new Date().toLocaleString(),
});
```

---

### 2. Welcome Volunteer Email

**File:** [`/src/emails/WelcomeVolunteerEmail.tsx`](/src/emails/WelcomeVolunteerEmail.tsx)

**Purpose:** Sent to new volunteers after they apply

**Features:**
- Warm welcome message
- Next steps with numbered timeline
- Volunteer opportunities overview
- Contact information

**Usage:**
```typescript
await emailService.sendWelcomeVolunteerEmail({
  volunteerName: 'Priya Sharma',
  email: 'priya@example.com',
  phone: '+91 98765 43210',
  submittedAt: 'January 15, 2025',
});
```

**When to Send:**
- Immediately after volunteer application
- Or within 24 hours with personalized message

---

### 3. Donation Receipt Email

**File:** [`/src/emails/DonationReceiptEmail.tsx`](/src/emails/DonationReceiptEmail.tsx)

**Purpose:** Sent as receipt/acknowledgment for donations

**Features:**
- Official receipt format
- Tax exemption information (80G)
- Transaction details
- Donor information
- Impact statement
- Professional styling for record-keeping

**Usage:**
```typescript
await emailService.sendDonationReceiptEmail({
  donorName: 'Amit Patel',
  email: 'amit@example.com',
  phone: '+91 98765 43210',
  amount: 5000,
  currency: 'INR',
  donationType: 'General Donation',
  transactionId: 'TXN123456789',
  donationDate: 'January 15, 2025',
  receiptNumber: 'TMM-2025-0001',
  panNumber: 'ABCDE1234F', // Optional
  address: '123 Main St, Mumbai 400001', // Optional
});
```

**Important:**
- Always include transaction ID
- Use sequential receipt numbers
- Keep records for tax purposes
- Update PAN number in template

---

### 4. Event Registration Email

**File:** [`/src/emails/EventRegistrationEmail.tsx`](/src/emails/EventRegistrationEmail.tsx)

**Purpose:** Confirmation for event registrations

**Features:**
- Event details with icons
- Registration ID
- What to bring checklist
- Important information
- Calendar reminder (can add iCal links)
- Map/directions link

**Usage:**
```typescript
await emailService.sendEventRegistrationEmail({
  attendeeName: 'Anita Desai',
  email: 'anita@example.com',
  phone: '+91 98765 43210',
  eventName: 'Janmashtami Celebration 2025',
  eventDate: 'August 26, 2025',
  eventTime: '6:00 PM - 10:00 PM',
  eventLocation: 'Tridhara Milan Mandir Main Hall',
  eventDescription: 'Join us for a divine celebration...',
  registrationId: 'EVT-2025-0001',
  numberOfAttendees: 2,
  specialRequests: 'Wheelchair accessible seating',
});
```

**When to Send:**
- Immediately after registration
- Send reminder 1 day before event
- Send thank-you after event

---

### 5. Newsletter Email

**File:** [`/src/emails/NewsletterEmail.tsx`](/src/emails/NewsletterEmail.tsx)

**Purpose:** Monthly updates to temple community

**Features:**
- News & updates section
- Upcoming events
- Spiritual quote
- CTA buttons
- Volunteer opportunities
- Social media links
- Unsubscribe link

**Usage:**
```typescript
await emailService.sendNewsletterEmail('subscriber@example.com', {
  recipientName: 'Devotee Name', // Optional
  month: 'January',
  year: '2025',
  headline: 'Spreading Divine Blessings',
  message: 'As we step into a new month...',
  news: [
    {
      title: 'New Prasad Distribution Schedule',
      description: 'Extended timings on weekends...',
      link: 'https://tridharamandir.com/services',
      imageUrl: 'https://example.com/image.jpg', // Optional
    },
  ],
  upcomingEvents: [
    {
      name: 'Janmashtami Celebration',
      date: 'August 26, 2025',
      time: '6:00 PM',
      link: 'https://tridharamandir.com/events',
    },
  ],
  quote: {
    text: 'The mind acts like an enemy...',
    author: 'Bhagavad Gita 6.6',
  },
});
```

**Best Practices:**
- Send monthly (first week of the month)
- Keep news items to 3-4
- Always include upcoming events
- Use high-quality images
- Maintain unsubscribe list

---

### 6. Follow-Up Email

**File:** [`/src/emails/FollowUpEmail.tsx`](/src/emails/FollowUpEmail.tsx)

**Purpose:** Multi-purpose follow-up communications

**Types:**
- `inquiry` - Follow up on inquiries
- `donation` - Thank donors, show impact
- `visit` - Get feedback after visit
- `volunteer` - Check in with volunteers
- `event` - Thank attendees
- `general` - Generic follow-up

**Features:**
- Type-specific content
- Customizable message
- Call-to-action button
- Contact information
- Social media links

**Usage:**
```typescript
await emailService.sendFollowUpEmail({
  recipientName: 'Rajesh Kumar',
  email: 'rajesh@example.com',
  followUpType: 'inquiry',
  originalDate: 'January 10, 2025',
  message: 'We wanted to follow up on your recent inquiry...',
  callToAction: {
    text: 'Reply to This Email',
    link: 'mailto:info@tridharamandir.com',
  },
  additionalInfo: 'We have extended hours during festivals.',
});
```

**When to Send:**
- Inquiries: 2-3 days after initial contact
- Donations: 1 week after donation
- Visits: 1-2 days after visit
- Volunteers: Monthly check-ins
- Events: Same day or next day after event

---

## 🎨 Previewing Email Templates

Preview all templates in your browser with live reload:

```bash
yarn email:dev
```

This opens `http://localhost:3001` showing all email templates. Edit templates and see changes instantly!

---

## 🎨 Customization

### Colors

All templates use consistent colors from your brand:

- **Primary:** #452937 (Deep purple)
- **Secondary:** #A96842 (Warm brown)
- **Accent:** #E5B76A (Gold)
- **Dark:** #1B0A2C (Very dark purple)
- **Light:** #F5EEE7 (Cream)

### Layout Component

All templates use shared `EmailLayout` component:

**File:** [`/src/emails/components/EmailLayout.tsx`](/src/emails/components/EmailLayout.tsx)

This provides:
- Consistent header/footer
- Temple branding
- Contact information
- Social links

To customize globally, edit this file.

### Individual Templates

Each template has its own styles defined inline. To customize:

1. Open template file
2. Find style definitions at the bottom
3. Modify colors, spacing, etc.
4. Run `yarn email:dev` to preview

---

## 📤 Sending Emails

### Using Email Service

**Recommended:** Use the `EmailService` class:

```typescript
import { createEmailService } from '@/lib/email-service';

// Create service instance
const emailService = createEmailService();

// Send any type of email
await emailService.sendWelcomeVolunteerEmail({...});
await emailService.sendDonationReceiptEmail({...});
// etc.
```

### Environment Variables Required

```bash
ZEPTOMAIL_API_KEY=your_api_key
ZEPTOMAIL_FROM_EMAIL=noreply@tridharamandir.com
ZEPTOMAIL_FROM_NAME=Tridhara Mandir
ZEPTOMAIL_TO_EMAIL=info@tridharamandir.com
```

### Direct API Route Usage

Contact form already has an API route at `/api/contact`.

For other email types, create similar routes:

**Example:** `/app/api/volunteer/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createEmailService } from '@/lib/email-service';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const emailService = createEmailService();
    const result = await emailService.sendWelcomeVolunteerEmail(data);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in volunteer API route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
```

---

## 📊 Email Analytics

Consider tracking:

- Open rates (ZeptoMail provides this)
- Click-through rates
- Conversion rates (donations, registrations)
- Unsubscribe rates (newsletters)

ZeptoMail dashboard shows delivery statistics.

---

## 🔐 Best Practices

### Security

- Never expose API keys in client code
- Always validate input data
- Use environment variables
- Rate limit API endpoints

### Deliverability

- Use verified domain
- Don't send too many emails at once
- Honor unsubscribe requests
- Maintain clean email lists
- Test in spam checkers

### Content

- Keep subject lines under 50 characters
- Use clear call-to-action buttons
- Optimize images (< 200KB each)
- Always provide plain text version
- Test in multiple email clients

### Accessibility

- Use semantic HTML
- Provide alt text for images
- Use sufficient color contrast
- Test with screen readers
- Keep line length readable

---

## 📝 Email Templates Checklist

When creating new email templates:

- [ ] Extends `EmailLayout` for consistency
- [ ] Includes preview text
- [ ] Has proper TypeScript types
- [ ] Provides plain text fallback
- [ ] Mobile responsive
- [ ] Tested in email preview (`yarn email:dev`)
- [ ] Tested in multiple email clients
- [ ] Includes contact information
- [ ] Has clear call-to-action
- [ ] Uses brand colors
- [ ] Proper spacing and readability
- [ ] Documented in this guide

---

## 🆘 Troubleshooting

### Email not sending

1. Check environment variables
2. Verify ZeptoMail API key
3. Check domain verification
4. Review API rate limits
5. Check server logs

### Email looks broken

1. Test in email preview first
2. Check HTML syntax
3. Verify inline styles
4. Test in multiple clients
5. Check image URLs

### Plain text looks bad

1. Update plain text generation method
2. Keep it simple and readable
3. Include all essential information
4. Test by sending to yourself

---

## 📚 Resources

- **react-email Docs:** https://react.email
- **ZeptoMail API Docs:** https://www.zoho.com/zeptomail/help/api/
- **Email Design Best Practices:** https://www.smashingmagazine.com/email-newsletter-design/
- **HTML Email Guide:** https://www.campaignmonitor.com/css/

---

## 🎯 Next Steps

### Recommended Enhancements

1. **Add iCal calendar files** for event emails
2. **QR codes** for event check-ins
3. **Dynamic content** based on user preferences
4. **A/B testing** for newsletters
5. **Automated campaigns** for festivals
6. **Welcome series** for new volunteers
7. **Re-engagement** campaigns
8. **Donation reminders** (respectfully)

### Future Templates

Consider creating:
- Festival announcement emails
- Prayer request confirmations
- Guest house booking confirmations
- Prasad delivery notifications
- Birthday/anniversary wishes
- Volunteer appreciation
- Year-end giving campaigns

---

**Last Updated:** 2025-01-03
**Version:** 1.0.0
