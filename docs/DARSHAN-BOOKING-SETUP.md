# Darshan Booking System

Complete setup guide for the Darshan Booking feature at Tridhara Milan Mandir.

## Overview

The Darshan Booking System allows devotees to request darshan slots online. The system includes:

- **User-facing booking form** on `/services/darshan-and-timings`
- **Automated email confirmations** to devotees
- **Admin notifications** for new bookings
- **Unique booking IDs** for tracking

## Features

### Booking Form Fields

1. **Full Name** (required) - Visitor's name
2. **Email Address** (required) - For confirmation email
3. **Phone Number** (required) - For contact
4. **Preferred Date** (required) - Minimum: tomorrow
5. **Preferred Time Slot** (required) - 5 predefined slots:
   - Morning Darshan (6:00 AM - 9:00 AM)
   - Mid-Morning (9:00 AM - 12:00 PM)
   - Afternoon (12:00 PM - 4:00 PM)
   - Evening Sandhya Arati (5:00 PM - 7:00 PM)
   - Evening (7:00 PM - 9:00 PM)
6. **Number of People** (required) - Range: 1-50
7. **Booking Type** (required):
   - Individual/Family Darshan
   - Group Darshan
   - Special Puja/Ceremony
   - Festival Visit
8. **Special Requests** (optional) - Up to 500 characters
9. **Wheelchair Access** (optional) - Accessibility checkbox

### Validation Rules

All validation is handled by Zod schema in [src/lib/validations/darshan-booking.ts](../src/lib/validations/darshan-booking.ts):

- Name: 2-100 characters
- Email: Valid email format
- Phone: Valid Indian phone number format
- Date: Must be tomorrow or later
- Number of People: 1-50
- All required fields must be filled

## Architecture

### 1. Form Component

**File:** [src/components/forms/DarshanBookingForm.tsx](../src/components/forms/DarshanBookingForm.tsx)

- Uses React Hook Form for state management
- Zod validation via @hookform/resolvers
- Submits to `/api/darshan-booking`
- Shows success message with booking ID
- Handles error states

### 2. API Route

**File:** [app/api/darshan-booking/route.ts](../app/api/darshan-booking/route.ts)

**Process Flow:**

1. Receives form submission (POST request)
2. Validates data with darshanBookingSchema
3. Generates unique booking ID: `DRS-{year}-{timestamp}{random}`
4. Formats date for email display
5. Sends confirmation email to devotee
6. Sends admin notification email to temple
7. Returns booking ID in response

**Edge Runtime:** Uses Cloudflare Workers for fast, global deployment

### 3. Email Template

**File:** [src/emails/DarshanBookingEmail.tsx](../src/emails/DarshanBookingEmail.tsx)

**User Confirmation Email Includes:**

- Booking ID badge (green highlight)
- All booking details (date, time, people, type)
- Special requests (if provided)
- Wheelchair access note (if requested)
- Important information (dress code, arrival time)
- Temple timings
- Contact information
- Directions with distance from major cities

**Admin Notification Email Includes:**

- Booking ID
- Visitor contact details (clickable phone/email)
- All booking information
- Special requests highlighted
- Action required notice

### 4. Page Integration

**File:** [app/services/[slug]/page.tsx](../app/services/[slug]/page.tsx)

The booking form appears only on the darshan-and-timings service page, added as a new section at the bottom of the page.

## Setup Instructions

### 1. Environment Variables

Ensure these are set in your `.env` file:

```bash
ZEPTOMAIL_API_KEY=your_zeptomail_api_key
ZEPTOMAIL_FROM_EMAIL=noreply@tridharamandir.com
ZEPTOMAIL_FROM_NAME=Tridhara Mandir
ZEPTOMAIL_TO_EMAIL=info@tridharamandir.com
```

### 2. ZeptoMail Configuration

1. Log in to [ZeptoMail](https://www.zoho.com/zeptomail/)
2. Verify your domain (`tridharamandir.com`)
3. Generate an API key
4. Add the API key to your `.env` file

### 3. Test the System

1. Visit: `https://tridharamandir.com/services/darshan-and-timings`
2. Scroll to "Request a Darshan Booking" section
3. Fill out the form with test data
4. Submit and verify:
   - Success message appears with booking ID
   - Confirmation email arrives at submitted email
   - Admin notification arrives at temple email

## Booking ID Format

Format: `DRS-{year}-{timestamp_last_6_digits}{3_digit_random}`

Example: `DRS-2025-456789123`

- `DRS` = Darshan booking prefix
- `2025` = Current year
- `456789` = Last 6 digits of timestamp
- `123` = Random 3-digit number

This ensures:
- Unique IDs for every booking
- Easy year-based identification
- Short enough to read over phone

## Email Flow

### User Experience

1. User submits booking form
2. Form validates client-side (instant feedback)
3. API validates server-side
4. Booking ID generated
5. **User receives confirmation email** with:
   - Booking details
   - What to expect at temple
   - Contact information
6. Success message shows booking ID
7. User can save/print email for reference

### Admin Experience

1. **Admin receives notification email** when booking submitted
2. Email contains all visitor details
3. Reply-to is set to visitor's email (easy to respond)
4. Admin contacts visitor within 24 hours
5. Admin confirms exact time and provides instructions

## Important Notes

### This is a Request System

The booking form creates a **request**, not a guaranteed booking. The email clearly states:

> "This is a booking request. Our team will contact you to confirm the exact time"

### Admin Action Required

For each booking:

1. Contact visitor within 24 hours
2. Confirm exact darshan time
3. Provide any additional instructions
4. Address special requests
5. Send final confirmation

### Large Groups

For groups of 25+ people, the form suggests:

> "For groups of 25+, please call us directly at +91 96091 75202"

## Error Handling

### Client-Side Validation

- Real-time field validation
- Clear error messages
- Required field indicators
- Disabled submit during submission

### Server-Side Validation

- Zod schema validation
- HTTP 400 for validation errors
- HTTP 500 for server errors
- Detailed error responses

### Email Failures

If email sending fails:

- Error logged to console
- User still receives booking ID
- Admin notification attempt continues
- System returns success (booking created)

**Recommendation:** Set up email monitoring to catch delivery failures

## Customization

### Modify Time Slots

Edit [src/lib/validations/darshan-booking.ts](../src/lib/validations/darshan-booking.ts):

```typescript
preferredTime: z.enum([
  'Morning Darshan (6:00 AM - 9:00 AM)',
  'Add your custom slot here',
  // ...
])
```

Also update in [src/components/forms/DarshanBookingForm.tsx](../src/components/forms/DarshanBookingForm.tsx) option elements.

### Modify Booking Types

Edit the bookingType enum in the validation schema and form component.

### Change Minimum Date

In [src/components/forms/DarshanBookingForm.tsx](../src/components/forms/DarshanBookingForm.tsx):

```typescript
const getMinDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Change +1 to +7 for 1 week advance
  return tomorrow.toISOString().split('T')[0];
};
```

### Customize Email Template

Edit [src/emails/DarshanBookingEmail.tsx](../src/emails/DarshanBookingEmail.tsx) to:

- Change colors/styling
- Add/remove sections
- Modify content
- Add temple-specific information

Preview changes with: `yarn email:dev`

## Database Integration (Optional Enhancement)

Currently, bookings are only sent via email. To store bookings in a database:

### 1. Add Database Schema

Example with Prisma:

```prisma
model DarshanBooking {
  id              String   @id @default(cuid())
  bookingId       String   @unique
  name            String
  email           String
  phone           String
  preferredDate   DateTime
  preferredTime   String
  numberOfPeople  Int
  bookingType     String
  specialRequests String?
  wheelchairAccess Boolean @default(false)
  status          String   @default("pending") // pending, confirmed, cancelled
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### 2. Update API Route

Add database save in [app/api/darshan-booking/route.ts](../app/api/darshan-booking/route.ts):

```typescript
// After generating booking ID
await prisma.darshanBooking.create({
  data: {
    bookingId,
    name: validatedData.name,
    email: validatedData.email,
    // ... other fields
  }
});
```

### 3. Benefits

- Track all bookings
- Admin dashboard for managing bookings
- Analytics and reporting
- Automated reminders
- Status tracking (pending → confirmed → completed)

## Troubleshooting

### Form Not Appearing

**Check:**
1. Are you on `/services/darshan-and-timings` page?
2. Is JavaScript enabled?
3. Check browser console for errors

### Booking Submission Fails

**Check:**
1. Environment variables are set correctly
2. ZeptoMail API key is valid
3. Domain is verified in ZeptoMail
4. Check API route logs: `app/api/darshan-booking/route.ts`

### Emails Not Arriving

**Check:**
1. ZeptoMail API key is valid
2. Sending domain is verified
3. Check spam/junk folder
4. Verify email addresses in environment variables
5. Check ZeptoMail dashboard for delivery status

### Date Picker Not Working

**Browser compatibility issue:**
- HTML5 date input may not work in all browsers
- Consider using a date picker library like react-datepicker

## Future Enhancements

### Priority 1: Essential

- [ ] **Database storage** for booking records
- [ ] **Admin dashboard** to view/manage bookings
- [ ] **Email delivery monitoring** and retry logic
- [ ] **SMS confirmations** via Twilio/similar

### Priority 2: Nice to Have

- [ ] **Calendar integration** (iCal download)
- [ ] **Automated reminders** (1 day before darshan)
- [ ] **Capacity management** (limit bookings per slot)
- [ ] **Real-time availability** checking
- [ ] **Online payment** for special pujas
- [ ] **Multi-language support** (Bengali, Hindi)

### Priority 3: Advanced

- [ ] **Booking modification** (reschedule/cancel)
- [ ] **Group coordinator** features
- [ ] **QR code check-in** system
- [ ] **Feedback collection** after visit
- [ ] **Analytics dashboard** (bookings over time, popular slots)

## Security Considerations

### Current Implementation

✅ Input validation (Zod schema)
✅ Edge runtime (Cloudflare security)
✅ Environment variables for secrets
✅ HTTPS only (enforced by Next.js)

### Recommended Additions

- [ ] **Rate limiting** on API route (prevent spam)
- [ ] **CAPTCHA** on form (prevent bots)
- [ ] **Email verification** (confirm email ownership)
- [ ] **Honeypot field** (catch bots)
- [ ] **Request logging** (audit trail)

### Example: Rate Limiting

Using `@upstash/ratelimit`:

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 requests per hour
});

// In API route
const identifier = request.headers.get("x-forwarded-for") || "anonymous";
const { success } = await ratelimit.limit(identifier);

if (!success) {
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    { status: 429 }
  );
}
```

## Support

### For Users

- **Phone:** +91 96091 75202
- **Email:** info@tridharamandir.com
- **Website:** https://tridharamandir.com

### For Developers

- **Documentation:** See [/docs](../docs) folder
- **Email Templates:** Run `yarn email:dev` to preview
- **API Testing:** Use Postman or curl

### Example API Test

```bash
curl -X POST https://tridharamandir.com/api/darshan-booking \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "preferredDate": "2025-01-15",
    "preferredTime": "Morning Darshan (6:00 AM - 9:00 AM)",
    "numberOfPeople": 2,
    "bookingType": "Individual/Family Darshan",
    "specialRequests": "Test booking",
    "wheelchairAccess": false
  }'
```

## Related Documentation

- [Email Templates Guide](./EMAIL-TEMPLATES-GUIDE.md) - All email templates
- [Contact Form Setup](./CONTACT-FORM-SETUP.md) - General contact form
- [Email System Architecture](./EMAIL-SYSTEM-ARCHITECTURE.md) - Overall email system

---

**Last Updated:** 2025-01-03
**Version:** 1.0.0
**Status:** Production Ready ✅
