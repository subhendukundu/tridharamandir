# Contact Form Setup Guide

This guide will help you set up the contact form system with ZeptoMail integration for Tridhara Mandir website.

## 📋 Overview

The contact form system allows visitors to submit inquiries directly through the website. Form submissions are sent to your email via ZeptoMail (Zoho's transactional email service).

### Features

- ✅ Beautiful, accessible contact form matching temple aesthetics
- ✅ Client-side validation with instant feedback
- ✅ Server-side validation for security
- ✅ Email notifications via ZeptoMail
- ✅ Mobile-responsive design
- ✅ Support for multiple inquiry types
- ✅ Reply-to functionality (replies go to the submitter)
- ✅ HTML and plain text email formats

## 🚀 Quick Start

### Step 1: Set Up ZeptoMail Account

1. **Go to [ZeptoMail](https://www.zeptomail.com/)**
   - Sign up or log in with your Zoho account

2. **Verify Your Domain**
   - Go to "Mail Agents" → "Add Mail Agent"
   - Add your domain: `tridharamandir.com`
   - Follow the DNS verification steps:
     - Add SPF record
     - Add DKIM record
     - Add MX record (optional, for receiving)
   - Wait for verification (usually takes 10-30 minutes)

3. **Create a Mail Agent**
   - After domain verification, create a mail agent
   - Recommended: `noreply@tridharamandir.com`
   - This will be the "From" address for all form emails

4. **Generate API Token**
   - Go to "Mail Agents" → Select your mail agent
   - Click "Send Mail Token"
   - Copy the token (starts with `Zoho-enczapikey...`)
   - **Important:** Keep this token secure!

### Step 2: Configure Environment Variables

1. **Create `.env.local` file** (if it doesn't exist):
   ```bash
   cp .env.example .env.local
   ```

2. **Add your ZeptoMail credentials** to `.env.local`:
   ```bash
   # ZeptoMail Configuration
   ZEPTOMAIL_API_KEY=Zoho-enczapikey_YOUR_ACTUAL_TOKEN_HERE
   ZEPTOMAIL_FROM_EMAIL=noreply@tridharamandir.com
   ZEPTOMAIL_FROM_NAME=Tridhara Mandir
   ZEPTOMAIL_TO_EMAIL=info@tridharamandir.com
   ```

3. **Important Notes:**
   - Never commit `.env.local` to Git (it's in `.gitignore`)
   - The `FROM_EMAIL` must match your verified Mail Agent
   - The `TO_EMAIL` is where you'll receive inquiries

### Step 3: Deploy Environment Variables

For **Cloudflare Workers** deployment:

1. **Add secrets via Wrangler CLI:**
   ```bash
   npx wrangler secret put ZEPTOMAIL_API_KEY
   # Paste your token when prompted

   npx wrangler secret put ZEPTOMAIL_FROM_EMAIL
   # Enter: noreply@tridharamandir.com

   npx wrangler secret put ZEPTOMAIL_FROM_NAME
   # Enter: Tridhara Mandir

   npx wrangler secret put ZEPTOMAIL_TO_EMAIL
   # Enter: info@tridharamandir.com
   ```

2. **Or add via Cloudflare Dashboard:**
   - Go to Workers & Pages → Your site
   - Settings → Environment Variables
   - Add each variable manually

### Step 4: Test Locally

1. **Start development server:**
   ```bash
   yarn dev
   ```

2. **Navigate to the contact section:**
   - Go to `http://localhost:3000/#visit`
   - Scroll to "Send Us a Message" section

3. **Test the form:**
   - Fill out all required fields
   - Submit the form
   - Check for success message
   - Check your `TO_EMAIL` inbox for the notification

### Step 5: Deploy to Production

```bash
yarn deploy
```

After deployment, test the form on your live site.

## 📧 Email Template

Emails are built using **[react-email](https://react.email)** - a modern React-based email templating system.

When a form is submitted, you'll receive a beautiful HTML email with:

- **Subject:** `New [Inquiry Type] Inquiry - [Name]`
- **From:** Your Mail Agent (e.g., `noreply@tridharamandir.com`)
- **Reply-To:** The submitter's email (so you can reply directly)
- **Content:**
  - Temple-branded header with gradient background
  - Inquiry type badge (color-coded)
  - Name, email, phone (clickable links)
  - Preferred contact method
  - Full message in styled message box
  - Timestamp (IST timezone)
  - Professional footer

### Preview Email Templates

You can preview your email templates locally:

```bash
yarn email:dev
```

This opens a browser at `http://localhost:3001` showing all your email templates with live reload. Perfect for designing and testing emails without sending them!

## 🎨 Form Locations

The contact form is currently integrated into:

1. **[Home Page](/)** - Contact Section (`/#visit`)
2. Ready to add to:
   - `/services/donation-and-seva` (for donation inquiries)
   - `/guest-house` (for booking inquiries)
   - Dedicated `/contact` page (optional)

### Adding Form to Other Pages

Example for `/guest-house` page:

```tsx
import { ContactForm } from "@/components/forms/ContactForm";

export default function GuestHousePage() {
  return (
    <div>
      {/* Your existing content */}

      <section className="py-16">
        <h2>Book Your Stay</h2>
        <ContactForm
          tone="light"
          defaultInquiryType="Guest House Booking"
        />
      </section>
    </div>
  );
}
```

## 🔧 Form Configuration

### Available Inquiry Types

- General Inquiry
- Service Booking
- Donation/Seva
- Volunteer Application
- Guest House Booking
- Event Information

### Form Validation Rules

- **Name:** 2-100 characters, letters and spaces only
- **Email:** Valid email format, converted to lowercase
- **Phone:** Optional, Indian format (+91 XXXXXXXXXX or 10 digits)
- **Inquiry Type:** Required, must select from dropdown
- **Message:** 10-1000 characters
- **Preferred Contact:** Optional (Email, Phone, WhatsApp)

### Customizing the Form

Edit [`/src/lib/validations/contact-form.ts`](/src/lib/validations/contact-form.ts) to:
- Add/remove inquiry types
- Modify validation rules
- Add new fields

### Customizing Email Templates

Edit [`/src/emails/ContactFormEmail.tsx`](/src/emails/ContactFormEmail.tsx) to:
- Change colors and styling
- Modify layout
- Add/remove sections
- Update branding

**Pro tip:** Run `yarn email:dev` while editing to see changes in real-time!

## 🔐 Security Features

- ✅ Server-side validation with Zod
- ✅ Environment variables for sensitive data
- ✅ CSRF protection (Next.js built-in)
- ✅ Rate limiting (via Cloudflare)
- ✅ Input sanitization
- ✅ No email addresses exposed to client

## 📊 Monitoring & Debugging

### Check Logs

**Local development:**
```bash
# Console logs will show in terminal
yarn dev
```

**Production (Cloudflare):**
```bash
npx wrangler tail
```

### Common Issues

#### Issue: "Email service is not configured"

**Solution:** Environment variables not set correctly
- Check `.env.local` for local dev
- Check Cloudflare secrets for production
- Ensure variable names match exactly

#### Issue: "Failed to send email"

**Solutions:**
1. Verify ZeptoMail API token is correct
2. Check domain verification status
3. Ensure Mail Agent is active
4. Check ZeptoMail dashboard for send logs

#### Issue: Form submits but no email received

**Solutions:**
1. Check spam/junk folder
2. Verify `ZEPTOMAIL_TO_EMAIL` is correct
3. Check ZeptoMail dashboard → Analytics
4. Look at Cloudflare Workers logs

## 📈 ZeptoMail Quotas

**Free Tier:**
- 10,000 emails/month
- 100 emails/hour
- Perfect for most temple inquiry volumes

**Monitor usage:**
- ZeptoMail Dashboard → Analytics
- Set up alerts for quota limits

## 🎯 Next Steps (Optional Enhancements)

### 1. Add Database Storage

Store form submissions in Cloudflare D1 or Supabase for:
- Lead management
- Analytics
- Follow-up tracking

### 2. Add Auto-Reply Email

Send confirmation email to submitters:
```
"Thank you for contacting Tridhara Mandir. We've received your message and will respond within 24-48 hours."
```

### 3. Add Google Sheets Integration

Automatically log submissions to Google Sheets for easy tracking.

### 4. Add WhatsApp Integration

Send notifications to WhatsApp using WhatsApp Business API.

### 5. Add Admin Dashboard

Create a simple dashboard to view/manage submissions.

## 📞 Support

If you encounter issues:

1. Check this documentation
2. Review ZeptoMail docs: https://www.zoho.com/zeptomail/help/
3. Check Cloudflare Workers logs
4. Test locally first before debugging production

## 📝 File Reference

### Core Files

- [`/src/components/forms/ContactForm.tsx`](/src/components/forms/ContactForm.tsx) - Main form component
- [`/src/components/forms/FormField.tsx`](/src/components/forms/FormField.tsx) - Form field components
- [`/src/lib/validations/contact-form.ts`](/src/lib/validations/contact-form.ts) - Validation schema
- [`/src/lib/zeptomail.ts`](/src/lib/zeptomail.ts) - ZeptoMail service
- [`/app/api/contact/route.ts`](/app/api/contact/route.ts) - API endpoint

### Email Templates

- [`/src/emails/ContactFormEmail.tsx`](/src/emails/ContactFormEmail.tsx) - react-email template

### Integration Files

- [`/src/components/sections/ContactSection.tsx`](/src/components/sections/ContactSection.tsx) - Home page contact section

---

**Last Updated:** 2025-01-03
**Version:** 1.0.0
