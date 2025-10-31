import { siteConfig } from "@/config/site";

export type NavChildLink = {
  label: string;
  href: string;
};

export type NavLinkItem = {
  label: string;
  href?: string;
  children?: NavChildLink[];
};

export const navLinks: NavLinkItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about-us",
    children: [
      { label: "Our Story", href: "/about-us" },
      { label: "History", href: "/history" }
    ]
  },
  { label: "Gallery", href: "/gallery" },
  {
    label: "Plan Visit",
    href: "/plan-your-visit",
    children: [
      { label: "Planning Guide", href: "/plan-your-visit" },
      { label: "Why Visit", href: "/why-visit" },
      { label: "Guest House", href: "/guest-house" },
      { label: "Guest Experiences", href: "/guides/guest-house-experiences" }
    ]
  },
  {
    label: "Services",
    href: "/services",
    children: siteConfig.services.map((service) => ({
      label: service.name,
      href: `/services/${service.slug}`
    }))
  },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/#visit" }
];

export const heroContent = {
  eyebrow: "Tridhara Milan Mandir",
  title: "Panchmura’s Living Confluence of Bhakti",
  subtitle:
    "Experience Radha-Krishna darshan at Panchmura's Tridhara Milan Mandir—where 2,000 devotees gather daily for integrated Shaiva-Vaishnava-Shakta worship.",
  ctaDonation: { label: "Donate Now", href: "/services/donation-and-seva" },
  ctaPrimary: { label: "Plan Your Visit", href: "/plan-your-visit" },
  ctaSecondary: { label: "Why Visit Tridhara", href: "/why-visit" },
  backgroundImage: "/images/tridhara-radha-krishna-mandir.png"
} as const;

export const napContent = {
  name: siteConfig.name,
  phone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  addressLines: [
    siteConfig.address.streetAddress,
    `${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion} ${siteConfig.address.postalCode}`,
    siteConfig.address.addressCountry
  ],
  mapLink: siteConfig.map.listingUrl,
  directionsLink: siteConfig.map.directionsUrl,
  hours: siteConfig.openingHours
} as const;

export const aboutContent = {
  eyebrow: "About the Mandir",
  title: "Where Three Streams of Faith Flow Together",
  copy:
    "Consecrated on 1 July 2022 at Panchmura, Bankura, Tridhara Milan Mandir unites Vaishnavism, Shaivism, and Shaktism in devotion to Radha–Krishna. The complex houses sanctums for Radha-Krishna, Kali, Mahadev, Rama–Sita, Hanuman, and Chaitanya Mahaprabhu, with murals narrating Krishna lila and the Dasavataras. Its Nagara-style shikhara, shegun-beamed ceilings, and tulsi mancha evoke Vrindavan even as seva programmes extend learning, health, and nutrition to neighbouring villages.",
  mission: {
    statement:
      "Our mission is to harmonise diverse Hindu traditions through inclusive worship, prasada seva, and transparent support for education and healthcare.",
    values: [
      {
        label: "Inclusive Devotion",
        description: "Integrated aratis and shared sanctums honour Shaiva, Vaishnava, and Shakta lineages side by side."
      },
      {
        label: "Community Service",
        description: "Scholarships, anna-daan, and health camps ensure seva reaches marginalised families."
      },
      {
        label: "Cultural Stewardship",
        description: "Artisans, musicians, and temple guides preserve Vrindavan-inspired heritage for new generations."
      }
    ]
  },
  action: { label: "Learn More About Our Story", href: "/about-us" }
} as const;

export const destinationContent = {
  eyebrow: "Experience",
  title: "Highlights of Tridhara Milan Mandir",
  lead:
    "Discover the shrines, rituals, and seva practices that make Tridhara Milan Mandir a revered Radha–Krishna pilgrimage for devotees across Bengal.",
  cards: [
    {
      title: "Radha-Krishna Darshan",
      description:
        "Offer prayers before the presiding deities amid melodic kirtan, temple bells, and fragrant pushpanjali that celebrate divine love in the Vrindavan tradition.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      duration: "Daily Aarti",
      href: "/#visit"
    },
    {
      title: "Tridhara Arati & Mantrashala",
      description:
        "Witness the confluence of Shaiva, Vaishnava, and Shakta chants as priests offer trishul, chakra, and devi stotras in a single integrated arati sequence.",
      image:
        "https://images.unsplash.com/photo-1541849546-216549ae2161?auto=format&fit=crop&w=1200&q=80",
      duration: "Special Evenings",
      href: "/#visit"
    },
    {
      title: "Prasad & Community Kitchen",
      description:
        "Share the midday bhog that now nourishes 2,000 devotees daily—an anna-daan initiative that began with 600 diners and continues to grow through community support.",
      image:
        "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=80",
      duration: "Midday Bhog",
      href: "/#visit"
    }
  ]
} as const;

export const donationContent = {
  eyebrow: "Give Seva, Grow Community",
  title: "Support Scholarships, Health Camps, and Anna-Daan",
  summary:
    "Every contribution keeps Panchmura’s anna-daan kitchen, student stipends, and mobile health clinics running with transparency and quarterly reporting.",
  highlights: [
    {
      label: "₹1,001",
      description: "Feeds 80 devotees through the anna-daan mid-day prasadam service."
    },
    {
      label: "₹5,001",
      description: "Sponsors medical supplies for quarterly community eye and health camps."
    },
    {
      label: "₹11,001",
      description: "Funds textbooks, instruments, and travel for five heritage arts students."
    }
  ],
  ctas: [
    { label: "Donate to Seva", href: "/services/donation-and-seva" },
    {
      label: "Request Impact Report",
      href: "mailto:info@tridharamandir.com?subject=Donation%20Impact%20Report%20Request"
    }
  ]
} as const;

export const faqContent = {
  eyebrow: "Visitor Info",
  title: "Frequently Asked Questions About Tridhara Milan Mandir",
  lead:
    "Essential information for visiting Tridhara Milan Mandir, from timings and location to dress code and facilities.",
  featured: {
    question: "What are the temple timings?",
    answer:
      "Daily darshan: 5:00 AM - 9:00 PM (weekdays), 5:00 AM - 9:30 PM (weekends). Special aarti at 5:00 AM, 6:30 PM, and integrated Tridhara aarti in the evening."
  },
  items: [
    {
      question: "Where is Tridhara Milan Mandir located?",
      answer:
        "Tridhara Milan Mandir is located in Panchmura village, Bankura district, West Bengal - exactly 30 km from Bishnupur (45 minutes by car). The temple is also known as Panchmura Milan Mandir or Naba-Vrindavan. It's 180 km from Kolkata (4 hours drive). Accessible by local buses, hired cars, or shared trekkers from Bishnupur and Bankura town."
    },
    {
      question: "How do I reach Panchmura temple from Bishnupur?",
      answer:
        "From Bishnupur, Panchmura is 30 km away (45 minutes). Take a shared trekker from Bishnupur bus stand (₹30-40 per person, departs every 30 minutes). Private taxis cost ₹600-800. You can also take local buses heading towards Panchmura. The temple is well-signposted once you reach Panchmura village."
    },
    {
      question: "What is Tridhara Milan Mandir famous for?",
      answer:
        "Tridhara Milan Mandir is India's only temple with integrated Shaiva-Vaishnava-Shakta worship in a single arati ceremony. It serves 2,000 free prasad meals daily, has an on-site guest house, and is affectionately known as 'Naba-Vrindavan' (Second Vrindavan). The temple was consecrated on July 1, 2022, during Rath Yatra."
    },
    {
      question: "Is prasad free at Tridhara Milan Mandir?",
      answer:
        "Yes, prasad is completely free at Tridhara Milan Mandir. Our anna-daan (community kitchen) serves approximately 2,000 meals daily to all visitors. Prasad is served at 12:30 PM after the midday bhog. Everyone is welcome regardless of background. The temple operates on voluntary donations."
    },
    {
      question: "Can I stay overnight at the temple?",
      answer:
        "Yes, Tridhara Milan Mandir has an on-site guest house with 8 suites located just 100 meters from the temple courtyard. Rooms range from ₹3,600-15,600 per night and include anna-daan meals, temple access, and optional terracotta workshops. Email info@tridharamandir.com to book. Alternatively, guest houses are available in Bishnupur (30 km away) or Bankura town (45 km away)."
    },
    {
      question: "What are the Panchmura Radha Krishna temple photos?",
      answer:
        "Tridhara Milan Mandir features stunning Nagara-style architecture with a 45-foot shikhara, Radha-Krishna idols in the main sanctum, terracotta relief panels depicting Krishna lila and Dasavataras, tulsi courtyard, and integrated shrines for Shiva, Kali, and Rama-Sita. Photography is permitted in the courtyard; please seek permission for interior sanctum photos. Visit our website's gallery section for photos."
    },
    {
      question: "Why is it called Naba-Vrindavan (Second Vrindavan)?",
      answer:
        "Devotees affectionately call Tridhara Milan Mandir 'Naba-Vrindavan' (New Vrindavan) or 'Second Vrindavan' because the temple's Vrindavan-inspired architecture, tulsi courtyard, and Krishna-centric worship create an atmosphere similar to the original Vrindavan. The nickname is an informal devotee honorific, not an official title."
    },
    {
      question: "What is the best time to visit Panchmura temple?",
      answer:
        "Best time: October to March (festival season, pleasant weather). Avoid July-August monsoons. Major festivals: Janmashtami (August), Rath Yatra (June-July), and Navaratri (October). For the unique integrated tridhara arati, visit during evening arati (6:30-8:00 PM). Weekdays are less crowded than weekends."
    },
    {
      question: "Is there a dress code?",
      answer:
        "Dress modestly with shoulders and knees covered. Remove shoes and leather belts before entering the sanctum. Silence is observed during aarti."
    },
    {
      question: "Do I need to book in advance?",
      answer:
        "Regular darshan is open to all without booking. For group visits (10+ people), guest house stays, special pujas, or temple marriage ceremonies, contact us in advance at +91 96091 75202 or info@tridharamandir.com."
    },
    {
      question: "Is parking available?",
      answer:
        "Limited street parking is available near the temple. The temple does not manage parking directly. For longer stays, consider booking the on-site guest house which has designated parking areas."
    },
    {
      question: "Is the temple accessible for differently abled visitors?",
      answer:
        "Yes, wheelchair access is available from the eastern gate with volunteer assistance during peak hours. Wheelchair ramps and railings support entry. Please email ahead for special assistance during festivals. Restrooms and drinking water are accessible."
    },
    {
      question: "What facilities are available on-site?",
      answer:
        "You will find drinking water stations, shaded seating, and restrooms near the anna-daan hall. Lockers for small bags are available beside the eastern entrance. First-aid is available during major festivals."
    },
    {
      question: "Can I visit both Bishnupur and Panchmura temples in one day?",
      answer:
        "Yes! Tridhara Milan Mandir (Panchmura) is only 30 km from Bishnupur's famous terracotta temples. Plan a combined itinerary: Morning at Bishnupur's Rasmancha, Jor-Bangla, and Madan Mohan temples (2-3 hours), then drive to Panchmura for midday prasad (12:30 PM) and evening tridhara arati (6:30 PM). This makes an ideal day trip covering both Bankura heritage sites."
    },
    {
      question: "How can I volunteer or join seva rotations?",
      answer:
        "Submit a volunteer request via info@tridharamandir.com with your skills and dates. Orientation sessions run every second Saturday covering kitchen seva, scholarship mentoring, and health camp support."
    }
  ]
} as const;

export const visitContent = {
  eyebrow: "Visit Us",
  title: "Plan Your Visit to Tridhara Milan Mandir, Panchmura",
  description:
    "Find directions, darshan guidance, and accessibility support for experiencing Tridhara Milan Mandir in Panchmura.",
  summary: siteConfig.branding.summary,
  visitLink: {
    label: "View visitor guide",
    href: "/plan-your-visit"
  }
} as const;

export const testimonialContent = {
  eyebrow: "Visitor Stories",
  title: "Visitor Testimonials from Tridhara Milan Mandir",
  lead:
    "Pilgrims, scholars, and local families share why devotees lovingly refer to Tridhara Milan Mandir as Panchmura's \"Second Vrindavan,\" an informal honorific born of inclusive worship.",
  quote:
    "\"Tridhara's arati brings Shaiva, Vaishnava, and Shakta mantras into one seamless flow. Standing before Radha-Krishna while the bells ring feels like being transported straight to Vrindavan.\"",
  author: "Devotee",
  location: "Bishnupur, West Bengal",
  avatars: [
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80"
  ]
} as const;

export const ctaContent = {
  title: "Join the Tridhara Circle",
  subtitle: "Get festival updates, seva announcements, and archival stories delivered to your inbox.",
  action: { label: "Subscribe", href: "/#visit" },
  image:
    "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80"
} as const;

export const footerContent = {
  brand: siteConfig.name,
  nickname: siteConfig.branding.nickname,
  tagline: siteConfig.branding.tagline,
  summary: siteConfig.branding.summary,
  donateCta: { label: "Donate Now", href: "/services/donation-and-seva" },
  visitLink: { label: "Plan Your Visit", href: "/plan-your-visit" },
  newsletterPlaceholder: "Your email address",
  newsletterCta: "Subscribe",
  legal: "Tridhara Milan Mandir © 2025. All rights reserved.",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/TridharaMilanMandir" },
    { label: "Instagram", href: "https://www.instagram.com/tridharamilanmandir" },
    { label: "YouTube", href: "https://www.youtube.com/@tridharamandir" }
  ]
} as const;
