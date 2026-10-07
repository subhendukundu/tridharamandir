# Contact Form - Quick Start Guide

## What's Been Implemented

A complete contact form system similar to your previous Wix setup, but better:

- Beautiful contact form matching your temple aesthetic
- Email notifications via ZeptoMail (Zoho)
- **Gorgeous email templates using react-email** (component-based, maintainable)
- Client & server-side validation
- Mobile responsive
- Integrated into homepage ([/#visit](/#visit))
- Email preview tool for development (`yarn email:dev`)

## Next Steps to Go Live

### 1. Set Up ZeptoMail (10 minutes)

1. Go to https://www.zeptomail.com/
2. Sign up with your Zoho account
3. Add and verify domain `tridharamandir.com`
   - Add DNS records (SPF, DKIM)
   - Wait 10-30 minutes for verification
4. Create Mail Agent: `noreply@tridharamandir.com`
5. Generate API Token (starts with `Zoho-enczapikey...`)

### 2. Add Environment Variables

Create `.env.local` file in project root:

```bash
ZEPTOMAIL_API_KEY=Zoho-enczapikey_YOUR_TOKEN_HERE
ZEPTOMAIL_FROM_EMAIL=noreply@tridharamandir.com
ZEPTOMAIL_FROM_NAME=Tridhara Mandir
ZEPTOMAIL_TO_EMAIL=info@tridharamandir.com
```

### 3. Preview Email Templates (Optional but Recommended)

See your email designs in the browser:

```bash
yarn email:dev
# Opens at http://localhost:3001
# Edit templates and see changes instantly!
```

### 4. Test Locally

```bash
yarn dev
# Visit http://localhost:3000/#visit
# Test the form
```

### 5. Deploy to Production

Add environment variables to Cloudflare:

```bash
npx wrangler secret put ZEPTOMAIL_API_KEY
npx wrangler secret put ZEPTOMAIL_FROM_EMAIL
npx wrangler secret put ZEPTOMAIL_FROM_NAME
npx wrangler secret put ZEPTOMAIL_TO_EMAIL
```

Then deploy:

```bash
yarn deploy
```

## What You'll Receive

When someone submits the form, you'll get a beautiful HTML email with:

- Subject: "New [Inquiry Type] Inquiry - [Name]"
- Temple-branded header with gradient
- Color-coded inquiry type badge
- All form details formatted nicely with clickable links
- Professional message styling
- Reply-to set to submitter's email (just hit reply!)
- Timestamp in IST
- Fully responsive design (looks great on mobile!)

## Form Fields

- Name (required)
- Email (required)
- Phone (optional)
- Inquiry Type (dropdown):
  - General Inquiry
  - Service Booking
  - Donation/Seva
  - Volunteer Application
  - Guest House Booking
  - Event Information
- Preferred Contact Method (optional)
- Message (required)

## Free Tier Limits

ZeptoMail Free: 10,000 emails/month (plenty for temple inquiries!)

## Full Documentation

See [docs/CONTACT-FORM-SETUP.md](docs/CONTACT-FORM-SETUP.md) for detailed setup, troubleshooting, and customization options.

## Dev Tools

**Preview Emails:**
```bash
yarn email:dev  # Opens at localhost:3001
```

**Test Site Locally:**
```bash
yarn dev  # Opens at localhost:3000
```

## Support

Questions? Check the full documentation or review the code in:
- [/src/components/forms/ContactForm.tsx](src/components/forms/ContactForm.tsx)
- [/src/emails/ContactFormEmail.tsx](src/emails/ContactFormEmail.tsx) - Email template
- [/app/api/contact/route.ts](app/api/contact/route.ts)
