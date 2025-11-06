# Manual Email Sending Guide

Some emails need to be sent manually by temple administrators (not triggered by website forms). Here's how to send them.

## When to Send Manually

1. **Donation Receipts** - After receiving payment
2. **Newsletters** - Monthly updates
3. **Follow-Up Emails** - After events, donations, inquiries

---

## Option 1: Create Admin Script (Recommended)

Create a simple Node.js script to send emails from command line:

### Setup

Create `/scripts/send-email.ts`:

\`\`\`typescript
import { createEmailService } from '../src/lib/email-service';

const emailService = createEmailService();

async function sendDonationReceipt() {
  const result = await emailService.sendDonationReceiptEmail({
    donorName: 'Amit Patel',
    email: 'amit@example.com',
    phone: '+91 98765 43210',
    amount: 5000,
    currency: 'INR',
    donationType: 'General Donation',
    transactionId: 'TXN123456789',
    donationDate: new Date().toLocaleDateString('en-IN', { dateStyle: 'long' }),
    receiptNumber: 'TMM-2025-0001',
    panNumber: 'ABCDE1234F', // Optional
    address: '123 Main St, Mumbai 400001', // Optional
  });

  console.log(result);
}

async function sendNewsletter() {
  // Get list of subscribers from your database/CSV
  const subscribers = [
    'subscriber1@example.com',
    'subscriber2@example.com',
  ];

  for (const email of subscribers) {
    const result = await emailService.sendNewsletterEmail(email, {
      recipientName: 'Devotee', // Optional, can personalize
      month: 'January',
      year: '2025',
      headline: 'Spreading Divine Blessings',
      message: 'As we step into a new month...',
      news: [
        {
          title: 'New Prasad Distribution Schedule',
          description: 'Extended timings on weekends...',
          link: 'https://tridharamandir.com/services',
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
        text: 'The mind acts like an enemy for those who do not control it.',
        author: 'Bhagavad Gita 6.6',
      },
    });

    console.log(\`Sent to \${email}:\`, result);

    // Add delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

async function sendFollowUp() {
  const result = await emailService.sendFollowUpEmail({
    recipientName: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    followUpType: 'donation', // or 'inquiry', 'visit', 'volunteer', 'event'
    originalDate: 'January 10, 2025',
    message: 'We wanted to thank you again for your generous donation...',
    callToAction: {
      text: 'View Your Impact',
      link: 'https://tridharamandir.com/impact',
    },
  });

  console.log(result);
}

// Run the function you need
const action = process.argv[2];

switch (action) {
  case 'donation':
    sendDonationReceipt();
    break;
  case 'newsletter':
    sendNewsletter();
    break;
  case 'followup':
    sendFollowUp();
    break;
  default:
    console.log('Usage: tsx scripts/send-email.ts [donation|newsletter|followup]');
}
\`\`\`

### Usage

\`\`\`bash
# Install tsx for running TypeScript
npm install -g tsx

# Send donation receipt
tsx scripts/send-email.ts donation

# Send newsletter to all subscribers
tsx scripts/send-email.ts newsletter

# Send follow-up
tsx scripts/send-email.ts followup
\`\`\`

---

## Option 2: Admin API Endpoint (Protected)

Create protected API endpoints that require authentication:

### `/app/api/admin/send-donation-receipt/route.ts`

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server';
import { createEmailService } from '@/lib/email-service';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  // Verify admin authentication
  const apiKey = request.headers.get('x-api-key');
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const emailService = createEmailService();
    const result = await emailService.sendDonationReceiptEmail(body);

    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch (error) {
    console.error('Error sending donation receipt:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
\`\`\`

### Usage via API

\`\`\`bash
curl -X POST https://tridharamandir.com/api/admin/send-donation-receipt \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_SECRET_KEY" \\
  -d '{
    "donorName": "Amit Patel",
    "email": "amit@example.com",
    "amount": 5000,
    "transactionId": "TXN123456789",
    "receiptNumber": "TMM-2025-0001",
    "donationDate": "January 15, 2025"
  }'
\`\`\`

---

## Option 3: Integrate with Payment Gateway

If using Razorpay/Stripe/PayPal, trigger donation receipts automatically:

### Example: Razorpay Webhook

\`\`\`typescript
// /app/api/webhooks/razorpay/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createEmailService } from '@/lib/email-service';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  // Verify Razorpay webhook signature
  const body = await request.text();
  const signature = request.headers.get('x-razorpay-signature');

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest('hex');

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(body);

  // Handle payment success
  if (event.event === 'payment.captured') {
    const payment = event.payload.payment.entity;

    // Generate receipt number
    const receiptNumber = \`TMM-\${new Date().getFullYear()}-\${String(payment.id).slice(-6)}\`;

    // Send donation receipt email
    const emailService = createEmailService();
    await emailService.sendDonationReceiptEmail({
      donorName: payment.notes.donor_name,
      email: payment.email,
      phone: payment.contact,
      amount: payment.amount / 100, // Razorpay uses paise
      currency: payment.currency,
      donationType: payment.notes.donation_type || 'General Donation',
      transactionId: payment.id,
      donationDate: new Date(payment.created_at * 1000).toLocaleDateString('en-IN'),
      receiptNumber,
    });
  }

  return NextResponse.json({ success: true });
}
\`\`\`

---

## Best Practices

### For Donation Receipts
1. Generate sequential receipt numbers
2. Store in database for accounting
3. Send immediately after payment confirmation
4. Include PAN number for tax exemption (80G)
5. Keep backup of all receipts

### For Newsletters
1. Maintain subscriber list in database/CSV
2. Send in batches (avoid rate limits)
3. Add unsubscribe link
4. Track open rates
5. Send at consistent time (e.g., 1st week of month)

### For Follow-Ups
1. Wait appropriate time (1-7 days)
2. Personalize based on interaction type
3. Include relevant CTAs
4. Track responses
5. Don't over-follow-up (max 2-3 times)

---

## Subscriber Management

### Store Subscribers

\`\`\`typescript
// Simple CSV approach
import fs from 'fs';
import { parse } from 'csv-parse/sync';

function getSubscribers() {
  const csv = fs.readFileSync('./data/subscribers.csv', 'utf-8');
  return parse(csv, {
    columns: true,
    skip_empty_lines: true,
  });
}
\`\`\`

### Or use Cloudflare D1 (SQL)

\`\`\`sql
CREATE TABLE subscribers (
  email TEXT PRIMARY KEY,
  name TEXT,
  subscribed_at DATETIME,
  unsubscribed BOOLEAN DEFAULT FALSE
);
\`\`\`

---

## Monitoring

Check ZeptoMail dashboard for:
- Delivery rates
- Bounce rates
- Open rates (if enabled)
- API quota usage

**ZeptoMail Free Tier:** 10,000 emails/month

---

## Security Notes

1. **Never expose API keys** in client code
2. **Use environment variables** for all secrets
3. **Validate all input** data
4. **Rate limit** admin endpoints
5. **Log all email sends** for audit trail

---

## Summary

| Email Type | How to Trigger | When |
|------------|---------------|------|
| Contact Form | Automatic (user submits form) | Instant |
| Volunteer Welcome | Automatic (user applies) | Instant |
| Event Registration | Automatic (user registers) | Instant |
| Donation Receipt | Manual/Webhook (after payment) | After payment confirmed |
| Newsletter | Manual script (admin runs) | Monthly (scheduled) |
| Follow-Up | Manual/Automated (admin triggers) | Days after event |

---

**Next Steps:**
1. Decide which emails need forms (we can create them)
2. Set up payment gateway webhooks for donation receipts
3. Create admin scripts for newsletters
4. Set up database for tracking (optional)
