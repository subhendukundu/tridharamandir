# Email System Architecture

Complete guide to how all email templates get their data and when they're sent.

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Email System Flow                        │
└─────────────────────────────────────────────────────────────┘

USER FORMS (Website)          API ROUTES              ZEPTOMAIL
     │                            │                        │
     ├─ Contact Form ────────────►│                        │
     │                        /api/contact                 │
     │                            ├──► Validate Data       │
     │                            ├──► Generate HTML       │
     │                            └──► Send Email ─────────►
     │                                                      │
     ├─ Volunteer Form ──────────►│                        │
     │                    /api/volunteer                   │
     │                            ├──► Validate Data       │
     │                            ├──► Generate HTML       │
     │                            └──► Send Welcome ───────►
     │                                                      │
     ├─ Event Registration ──────►│                        │
                          /api/event-registration          │
                                   ├──► Validate Data       │
                                   ├──► Generate HTML       │
                                   └──► Send Confirmation ──►


ADMIN/MANUAL                  SCRIPTS/API              ZEPTOMAIL
     │                            │                        │
     ├─ Payment Received ────────►│                        │
     │                   Payment Webhook                   │
     │                            ├──► Generate Receipt    │
     │                            └──► Send Receipt ───────►
     │                                                      │
     ├─ Monthly Newsletter ──────►│                        │
     │                    Admin Script                     │
     │                            ├──► Load Subscribers    │
     │                            └──► Send to All ────────►
     │                                                      │
     └─ Follow-Up Email ─────────►│                        │
                          Admin Trigger                    │
                                   └──► Send Follow-Up ────►
```

---

## 🎯 How Each Template Gets Its Data

### 1. Contact Form Email ✅ **AUTOMATED**

**Data Source:** User fills contact form on website

**Flow:**
```
User fills form → /api/contact → ZeptoMail → info@tridharamandir.com
```

**Implementation:**
- Form: Already exists on homepage ([src/components/forms/ContactForm.tsx](../src/components/forms/ContactForm.tsx))
- API: [app/api/contact/route.ts](../app/api/contact/route.ts)
- Template: [src/emails/ContactFormEmail.tsx](../src/emails/ContactFormEmail.tsx)

**Required Data:**
```typescript
{
  name: string;           // From form input
  email: string;          // From form input
  phone?: string;         // From form input (optional)
  inquiryType: string;    // From form dropdown
  message: string;        // From form textarea
  preferredContact?: string; // From form select (optional)
}
```

**Status:** ✅ **Fully Implemented** - Working now!

---

### 2. Welcome Volunteer Email ⚠️ **NEEDS FORM**

**Data Source:** User applies through volunteer form

**Flow:**
```
User applies → /api/volunteer → ZeptoMail → volunteer@email.com
                              └──► Also notifies admin
```

**Implementation:**
- Form: **NEED TO CREATE** volunteer application form
- API: ✅ Created ([app/api/volunteer/route.ts](../app/api/volunteer/route.ts))
- Template: ✅ Created ([src/emails/WelcomeVolunteerEmail.tsx](../src/emails/WelcomeVolunteerEmail.tsx))

**Required Data:**
```typescript
{
  volunteerName: string;  // From form
  email: string;          // From form
  phone?: string;         // From form
  interests?: string;     // What they want to help with
  availability?: string;  // When they're available
}
```

**Status:** ⚠️ **Needs Volunteer Form** on website

**To Complete:**
1. Create volunteer application form component
2. Add form to a page (e.g., `/volunteer` or services page)
3. Form submits to `/api/volunteer`

---

### 3. Donation Receipt Email ⚠️ **NEEDS PAYMENT INTEGRATION**

**Data Source:** After payment is confirmed (Razorpay/Stripe/Manual)

**Flow:**
```
Payment gateway → Webhook → /api/webhooks/payment → ZeptoMail → donor@email.com
                                                   └──► Store in database
```

**Implementation:**
- Payment: **NEED TO INTEGRATE** payment gateway
- API: **NEED TO CREATE** webhook handler
- Template: ✅ Created ([src/emails/DonationReceiptEmail.tsx](../src/emails/DonationReceiptEmail.tsx))

**Required Data:**
```typescript
{
  donorName: string;        // From payment form
  email: string;            // From payment form
  phone?: string;           // From payment form
  amount: number;           // From payment gateway
  currency: string;         // "INR"
  donationType: string;     // From form/default
  transactionId: string;    // From payment gateway
  donationDate: string;     // Current date
  receiptNumber: string;    // Generated (e.g., TMM-2025-0001)
  panNumber?: string;       // From form (optional, for tax)
  address?: string;         // From form (optional, for tax)
}
```

**Status:** ⚠️ **Needs Payment Integration**

**Options:**
1. **Razorpay** (Popular in India)
2. **Stripe** (International)
3. **Manual** - Admin sends receipts after bank transfer

---

### 4. Event Registration Email ⚠️ **NEEDS FORM**

**Data Source:** User registers for event

**Flow:**
```
User registers → /api/event-registration → ZeptoMail → attendee@email.com
                                         └──► Store registration
```

**Implementation:**
- Form: **NEED TO CREATE** event registration form
- API: ✅ Created ([app/api/event-registration/route.ts](../app/api/event-registration/route.ts))
- Template: ✅ Created ([src/emails/EventRegistrationEmail.tsx](../src/emails/EventRegistrationEmail.tsx))

**Required Data:**
```typescript
{
  attendeeName: string;       // From form
  email: string;              // From form
  phone?: string;             // From form
  eventName: string;          // From event details
  eventDate: string;          // From event details
  eventTime: string;          // From event details
  eventLocation?: string;     // "Tridhara Milan Mandir Main Hall"
  numberOfAttendees?: number; // From form
  specialRequests?: string;   // From form (wheelchair, etc.)
}
```

**Status:** ⚠️ **Needs Registration Form**

**To Complete:**
1. Create event registration form
2. Add to events page
3. Form submits to `/api/event-registration`

---

### 5. Newsletter Email 📅 **MANUAL/SCHEDULED**

**Data Source:** Admin creates content & sends monthly

**Flow:**
```
Admin creates newsletter → Script loads subscribers → ZeptoMail → subscribers
```

**Implementation:**
- Content: **ADMIN CREATES** (news, events, quote)
- Subscribers: **NEED TO MANAGE** (database/CSV)
- Script: **NEED TO CREATE** sending script
- Template: ✅ Created ([src/emails/NewsletterEmail.tsx](../src/emails/NewsletterEmail.tsx))

**Required Data:**
```typescript
{
  recipientName?: string;     // Optional, from database
  month: string;              // "January"
  year: string;               // "2025"
  headline: string;           // Admin writes
  message: string;            // Admin writes
  news: Array<{               // Admin provides
    title: string;
    description: string;
    link?: string;
    imageUrl?: string;
  }>;
  upcomingEvents?: Array<{    // From events database
    name: string;
    date: string;
    time: string;
    link?: string;
  }>;
  quote?: {                   // Admin selects
    text: string;
    author: string;
  };
}
```

**Status:** ⚠️ **Needs Admin Process**

**To Complete:**
1. Create subscriber management system
2. Create admin script to compose & send
3. Set up monthly schedule/reminder

---

### 6. Follow-Up Email 📅 **MANUAL/AUTOMATED**

**Data Source:** Admin triggers or automated based on events

**Flow:**
```
Admin/Automation → Script/API → ZeptoMail → recipient@email.com
```

**Implementation:**
- Trigger: **ADMIN DECIDES** when to send
- API/Script: **NEED TO CREATE**
- Template: ✅ Created ([src/emails/FollowUpEmail.tsx](../src/emails/FollowUpEmail.tsx))

**Required Data:**
```typescript
{
  recipientName: string;              // From original interaction
  email: string;                      // From original interaction
  followUpType: 'inquiry' | 'donation' | 'visit' | 'volunteer' | 'event' | 'general';
  originalDate?: string;              // When they contacted/visited
  message: string;                    // Admin writes custom message
  callToAction?: {                    // Optional CTA
    text: string;
    link: string;
  };
  additionalInfo?: string;            // Optional extra info
}
```

**Status:** ⚠️ **Needs Admin Process**

**Use Cases:**
- 2-3 days after inquiry (no response)
- 1 week after donation (thank you)
- Next day after event (feedback)
- Monthly check-in with volunteers

---

## 🛠️ Implementation Priority

### Phase 1: Automated User Forms (High Priority)

1. ✅ **Contact Form** - Already done!
2. 🔨 **Volunteer Form** - Create form + integrate with API
3. 🔨 **Event Registration** - Create form + integrate with API

### Phase 2: Payment Integration (High Priority if accepting online donations)

4. 🔨 **Donation Receipts** - Integrate Razorpay/Stripe + webhook

### Phase 3: Admin/Manual Processes (Medium Priority)

5. 🔨 **Newsletter** - Admin script + subscriber management
6. 🔨 **Follow-Ups** - Admin tool/script

---

## 🎯 What You Need to Decide

### Question 1: Volunteer Applications
**Do you want volunteers to apply through the website?**
- ✅ Yes → We create volunteer form
- ❌ No → Keep mailto: links, send welcome emails manually

### Question 2: Event Registrations
**Do you want event registrations on the website?**
- ✅ Yes → We create registration form for each event
- ❌ No → People contact via phone/email, you send confirmations manually

### Question 3: Online Donations
**Do you want to accept online donations?**
- ✅ Yes → We integrate Razorpay/Stripe + automatic receipts
- ❌ No → People donate via bank transfer, you send receipts manually

### Question 4: Newsletter
**Do you want to send monthly newsletters?**
- ✅ Yes → We set up subscriber management + sending script
- ❌ No → Skip for now

---

## 📝 Next Steps Recommendation

**I recommend we do this in order:**

1. **Create Volunteer Application Form** (1-2 hours)
   - Simple form with name, email, interests
   - Automatically sends welcome email
   - Notifies you of new volunteers

2. **Create Event Registration Form** (1-2 hours)
   - Form with name, email, event selection
   - Automatically sends confirmation with registration ID
   - Stores registrations (database or simple file)

3. **Set Up Darshan Booking Form** (since you asked about it!)
   - Let users request darshan slots
   - Choose date/time
   - Send confirmation email

4. **Payment Integration** (if needed) (2-4 hours)
   - Razorpay for Indian donations
   - Automatic receipt generation
   - Tax information included

5. **Newsletter System** (later) (2-3 hours)
   - Subscriber management
   - Admin script for sending
   - Unsubscribe handling

**Would you like me to start with #1 (Volunteer Form) or #3 (Darshan Booking Form)?**

Or if you have different priorities, let me know!
