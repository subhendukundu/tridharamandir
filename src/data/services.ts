import { siteConfig } from "@/config/site";

export type ServiceDetail = {
  slug: string;
  title: string;
  summary: string;
  metaDescription: string;
  hero: {
    image: string;
    alt: string;
  };
  highlights: Array<{
    title: string;
    description: string;
  }>;
  schedule?: Array<{
    label: string;
    value: string;
  }>;
  steps?: Array<{
    title: string;
    description: string;
  }>;
  pricing?: Array<{
    title: string;
    amount: string;
    description: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  resources?: Array<{
    label: string;
    href: string;
    description?: string;
  }>;
  cta?: {
    label: string;
    href: string;
  };
};

type ServiceMap = Record<string, ServiceDetail>;

export const servicesContent: ServiceMap = {
  "darshan-and-timings": {
    slug: "darshan-and-timings",
    title: "Darshan & Timings",
    summary:
      "Plan your darshan with daily mangal, sandhya, and Tridhara arati schedules along with guidance for group seva bookings.",
    metaDescription:
      "View Tridhara Milan Mandir darshan timings, daily arati schedule, and instructions for group visits and seva bookings in Panchmura, Bankura.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1540040599908-04b414d0c402?auto=format&fit=crop&w=1600&q=80",
      alt: "Devotees attending aarti at Tridhara Milan Mandir"
    },
    highlights: [
      {
        title: "Daily Schedule",
        description:
          "Mangal arati begins at 5:00 AM, followed by Jhulan and Raj-bhog darshan. Sandhya arati and the signature Tridhara arati take place from 6:30 PM."
      },
      {
        title: "Special Darshan Days",
        description:
          "Ekadashi, Purnima, and Amavasya witness extended hours with kirtan through the night. Navaratri evenings include Devi Bhava darshan."
      },
      {
        title: "Group Visits",
        description:
          "Schools, spiritual groups, and yatras can reserve guided tours and seva slots with at least seven days’ notice using our booking form."
      }
    ],
    schedule: [
      { label: "Mangal Arati", value: "5:00 AM – Tulsi parikrama and Govinda nam sankirtan" },
      { label: "Jhulan & Raj-Bhog Darshan", value: "7:30 AM – 12:00 PM daily" },
      { label: "Anna-Daan Recess", value: "12:30 PM – 2:00 PM (kitchen seva and prasad)" },
      { label: "Sandhya & Tridhara Arati", value: "6:30 PM – 8:00 PM integrated Shaiva-Vaishnava-Shakta arati" }
    ],
    steps: [
      {
        title: "Send a Booking Request",
        description:
          "Email us at info@tridharamandir.com with proposed dates, group size, and preferred seva (bhog, arati participation, cultural showcase)."
      },
      {
        title: "Receive Confirmation",
        description:
          "A volunteer will confirm availability within 48 hours and share donation guidelines for special pujas."
      },
      {
        title: "Arrive 30 Minutes Early",
        description:
          "Report to the seva desk near the eastern gate. Volunteers will guide you to the mandir hall and help with prasad arrangements."
      }
    ],
    pricing: [
      {
        title: "Group Darshan Facilitation",
        amount: "₹2,001",
        description: "Covers guided entry, seating, and sankirtan support for groups up to 40 devotees."
      },
      {
        title: "Special Arati Seva",
        amount: "₹5,001",
        description: "Includes personalised sankalpa, garland offering, and priority queue during Tridhara arati."
      },
      {
        title: "Festival Day Pass",
        amount: "₹1,201",
        description: "Reserved courtyard access and souvenir prasadam during Rath Yatra or Janmashtami."
      }
    ],
    faqs: [
      {
        question: "How early should I arrive for darshan?",
        answer: "Arrive 30 minutes before arati to find seating and deposit footwear at the seva desk."
      },
      {
        question: "Can we book guided tours in Bengali or Hindi?",
        answer: "Yes. Volunteer interpreters are available with 48 hours’ notice; include your language preference in the booking email."
      },
      {
        question: "Is photography allowed during rituals?",
        answer: "Photography is allowed in courtyards. Please avoid flash or interior photography during arati."
      }
    ],
    resources: [],
    cta: {
      label: "Request a Darshan Slot",
      href: "mailto:info@tridharamandir.com?subject=Darshan%20Booking%20Request"
    }
  },
  "bhog-and-prasad": {
    slug: "bhog-and-prasad",
    title: "Bhog & Prasad",
    summary:
      "Participate in Tridhara’s annadan programme serving over 2,000 devotees daily with freshly prepared bhog and prasadam.",
    metaDescription:
      "Learn how to book bhog and prasad at Tridhara Milan Mandir, Panchmura. Support the daily anna-daan programme serving 2,000 devotees.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1582719471384-894f5a05be0d?auto=format&fit=crop&w=1600&q=80",
      alt: "Volunteers distributing prasad at Tridhara Milan Mandir"
    },
    highlights: [
      {
        title: "Daily Anna-Daan",
        description:
          "Midday bhog is served from 12:30 PM. The kitchen currently feeds 2,000 devotees daily, up from 600 when the programme began."
      },
      {
        title: "Prasad Booking",
        description:
          "Offerings for birthdays, anniversaries, or remembrance ceremonies can be booked with a minimum contribution of ₹1,001."
      },
      {
        title: "Volunteer Opportunities",
        description:
          "Help prepare vegetables, distribute prasad, or assist with post-seva cleanup—ideal for college NSS groups and corporate CSR teams."
      }
    ],
    schedule: [
      { label: "Kitchen Prep", value: "9:30 AM – Volunteers chop vegetables, soak pulses, and prep spices." },
      { label: "Bhog Offering", value: "12:00 PM – Offerings placed before Sri Sri Radha-Krishna in the main mandir." },
      { label: "Prasad Distribution", value: "12:30 PM – 2:00 PM daily serving queue near anna-daan hall." },
      { label: "Evening Light Meal", value: "5:30 PM – Sweet prasad and herbal tea during festivals." }
    ],
    steps: [
      {
        title: "Choose Your Offering",
        description:
          "Select from Khichuri bhog, Panchamrit, or special sweet prasadam prepared by temple cooks using seasonal produce."
      },
      {
        title: "Confirm Quantity",
        description:
          "Share the number of devotees you intend to serve. The kitchen scales recipes and resources responsibly to minimise waste."
      },
      {
        title: "Join the Distribution",
        description:
          "Arrive by 11:00 AM to participate in the kitchen rituals and offer the first serving to Sri Sri Radha-Krishna."
      }
    ],
    pricing: [
      {
        title: "Khichuri Seva",
        amount: "₹1,001",
        description: "Feeds approximately 75 devotees with khichuri, sabji, and chutney."
      },
      {
        title: "Festival Anna-Daan",
        amount: "₹5,001",
        description: "Funds large cauldron prep with sweets for festival crowds up to 400 people."
      },
      {
        title: "Monthly Kitchen Patron",
        amount: "₹11,001",
        description: "Supports pantry staples, spices, and LPG for four weeks of mid-day seva."
      }
    ],
    faqs: [
      {
        question: "Do you accommodate dietary preferences?",
        answer: "Prasad is sattvic and onion-free; special requests for allergies can be noted in your booking email."
      },
      {
        question: "Can corporate teams volunteer?",
        answer: "Yes, CSR and college NSS groups can register for kitchen or distribution shifts at least two weeks in advance."
      },
      {
        question: "Is takeaway prasad available?",
        answer: "Packaged prasadam can be arranged for elders or shut-in devotees with a nominal ₹300 packaging contribution."
      }
    ],
    resources: [],
    cta: {
      label: "Book Bhog or Prasad",
      href: "mailto:info@tridharamandir.com?subject=Bhog%20%26%20Prasad%20Booking"
    }
  },
  "marriage-and-rituals": {
    slug: "marriage-and-rituals",
    title: "Marriage & Rituals",
    summary:
      "Sanctify life events with Vedic rites—from Radha-Krishna kalyanam to Bhoomi Pujan, vehicle puja and sacred thread ceremonies in the mandir complex.",
    metaDescription:
      "Arrange temple weddings, Bhoomi Pujan, vehicle puja, and sacred thread ceremonies at Tridhara Milan Mandir with guidance from our resident priests.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
      alt: "Wedding rituals being performed at the mandir courtyard"
    },
    highlights: [
      {
        title: "Temple Weddings",
        description:
          "Conduct Radha-Krishna themed weddings with floral mandap, kirtan processions, and prasadam catering for up to 400 guests."
      },
      {
        title: "Sanskar Ceremonies",
        description:
          "Book priest services for Annaprashan, Namkaran, Upanayan (Poite), Bhoomi Puja, and Griha Pravesh with personalised sankalpa."
      },
      {
        title: "Vehicle & Business Puja",
        description:
          "Bless new vehicles, shops, or factories under the guidance of temple acharyas with Navagraha homa and Lakshmi Narayan archanas."
      }
    ],
    schedule: [
      { label: "Wedding Mandap Availability", value: "6:00 AM – 11:00 AM and 4:00 PM – 9:00 PM daily" },
      { label: "Sanskar Slots", value: "Weekdays 7:00 AM – 10:00 AM; Weekends 3:00 PM – 6:00 PM" },
      { label: "Priest Consultation", value: "Evenings 7:30 PM – 8:30 PM (appointment recommended)" }
    ],
    steps: [
      {
        title: "Share Your Ritual Requirements",
        description:
          "Provide preferred dates, attendee count, and any specific traditions or regional mantras you would like included."
      },
      {
        title: "Fix Priest & Logistics",
        description:
          "We allocate archakas, kirtan groups, decoration partners, and prasad menu options suited to your budget."
      },
      {
        title: "Complete Documentation",
        description:
          "For marriages, submit identity proof, passport-sized photographs, and affidavits as per local municipal guidelines."
      }
    ],
    pricing: [
      {
        title: "Temple Wedding Package",
        amount: "₹31,001",
        description: "Includes mandap decor, priest dakshina, kirtan group, and anna-daan for 200 guests."
      },
      {
        title: "Sanskar Ceremony",
        amount: "₹7,501",
        description: "Covers priest, havan samagri, and prasadam for Annaprashan, Namkaran, or Upanayan."
      },
      {
        title: "Bhoomi Pujan (Land Blessing)",
        amount: "₹5,001",
        description: "Complete ground-breaking ceremony with Vastu Shaanti, Navagraha homa, and prasadam for construction projects."
      },
      {
        title: "Vehicle / Business Puja",
        amount: "₹3,001",
        description: "One-hour ritual with Navagraha sankalpa and protective blessings for new ventures."
      }
    ],
    faqs: [
      {
        question: "Do you assist with wedding catering and lodging?",
        answer: "Preferred caterers and Panchmura guest-house partners are available; mention requirements in your enquiry."
      },
      {
        question: "What documents are needed for marriages?",
        answer: "Provide Aadhaar IDs, passport photos, and local registrar forms; our volunteers assist with notarisation."
      },
      {
        question: "Do you perform Bhoomi Pujan for construction projects?",
        answer: "Yes, we conduct complete Bhoomi Pujan ceremonies with Vastu Shaanti and Navagraha homa for home construction, commercial buildings, or land purchases. Our priests can travel to your site or perform the ritual at the temple with symbolic earth from your land."
      },
      {
        question: "Can rituals be conducted in Bengali or Hindi?",
        answer: "Yes, priests conduct ceremonies in Sanskrit with Bengali or Hindi guidance. Regional bhajans can be included."
      }
    ],
    resources: [
    ],
    cta: {
      label: "Plan Your Ceremony",
      href: "mailto:info@tridharamandir.com?subject=Ritual%20%2F%20Wedding%20Enquiry"
    }
  },
  "donation-and-seva": {
    slug: "donation-and-seva",
    title: "Donation & Seva",
    summary:
      "Support scholarships, health camps, and temple maintenance by joining Tridhara's seva circles or contributing securely online.",
    metaDescription:
      "Donate to Tridhara Milan Mandir's seva initiatives for education, healthcare, anna-daan, and heritage preservation in Panchmura.",
    hero: {
      image: "/images/tridhara-milan-mandir-prasad-food-offering-panchmura.jpg",
      alt: "Traditional prasad food offerings with flowers and decorations at Tridhara Milan Mandir, Panchmura"
    },
    highlights: [
      {
        title: "Scholarships & Education",
        description:
          "Sponsor school supplies for 120 village students or contribute to the Sanskrit and music training bursaries."
      },
      {
        title: "Health & Relief Camps",
        description:
          "Medical practitioners and donors help run quarterly eye-care and general health check-up camps in nearby villages."
      },
      {
        title: "Heritage Stewardship",
        description:
          "Fund the upkeep of murals, lighting, and sound systems that narrate Tridhara’s interfaith heritage to visiting pilgrims."
      }
    ],
    schedule: [
      { label: "Seva Desk Hours", value: "8:00 AM – 6:00 PM daily" },
      { label: "Quarterly Impact Circles", value: "First Sunday of Jan, Apr, Jul, Oct at Vrindavan Sabha" }
    ],
    steps: [
      {
        title: "Select a Seva Initiative",
        description:
          "Choose anna-daan, student scholarships, medical aid, or infrastructure upkeep. Each option has transparent budgets."
      },
      {
        title: "Confirm Contribution",
        description:
          "Donate via bank transfer, UPI, or cheque. Donation receipts are issued within 48 hours."
      },
      {
        title: "Stay Connected",
        description:
          "Receive quarterly impact reports and volunteer invitations by subscribing to our seva newsletter."
      }
    ],
    pricing: [
      {
        title: "Monthly Seva Circle",
        amount: "₹1,501",
        description: "Enrolls donors in monthly anna-daan support with digital impact notes."
      },
      {
        title: "Quarterly Impact Patron",
        amount: "₹10,001",
        description: "Funds scholarships, health camps, and heritage lighting upgrades with quarterly briefings."
      },
      {
        title: "Heritage Steward",
        amount: "₹25,001",
        description: "Supports restoration, archival recordings, and trilingual signage installations."
      }
    ],
    faqs: [
      {
        question: "Is my donation tax exempt?",
        answer: "We are actively working on obtaining 80G certification for tax exemption. Currently, we issue donation receipts within 48 hours of contribution confirmation. Please check with us for the latest status on 80G compliance."
      },
      {
        question: "Can I volunteer remotely?",
        answer: "Remote volunteers help with communications, translation, and fundraising outreach—email us with your skills."
      },
      {
        question: "How do I receive impact reports?",
        answer: "Impact PDF summaries and event invites are emailed quarterly; join the seva newsletter to stay updated."
      }
    ],
    resources: [
    ],
    cta: {
      label: "Contribute to Seva",
      href: "mailto:info@tridharamandir.com?subject=Donation%20Enquiry"
    }
  }
};

export const servicesList = siteConfig.services.map((service) => ({
  ...service,
  ...servicesContent[service.slug]
}));
