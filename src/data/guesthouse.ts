import { siteConfig } from "@/config/site";

export type GuestRoom = {
  name: string;
  description: string;
  capacity: string;
  price: string;
  amenities: string[];
  image: string;
};

export type GuestPackage = {
  name: string;
  description: string;
  price: string;
  includes: string[];
};

export type GuestFaq = {
  question: string;
  answer: string;
};

export type GuestExperience = {
  title: string;
  subtitle: string;
  description: string;
  anchor?: string;
};

export const guesthouseContent = {
  hero: {
    eyebrow: "Tridhara Guest House",
    title: "Stay beside Panchmura’s Sacred Courtyard",
    subtitle:
      "Wake up to mangal arati bells, enjoy anna-daan brunch, and unwind in heritage-inspired suites moments away from Tridhara Milan Mandir.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=80",
    ctaPrimary: {
      label: "Book Your Stay",
      href: "mailto:info@tridharamandir.com?subject=Guest%20House%20Stay%20Request"
    },
    ctaSecondary: {
      label: "View Packages",
      href: "/guest-house#packages"
    }
  },
  overview: {
    checkIn: "02:00 PM",
    checkOut: "11:00 AM",
    rating: {
      value: null,
      count: null
    },
    description:
      "The guest house hosts eight boutique suites crafted with terracotta accents, tulsi courtyard views, and concierge access to darshan, seva, and heritage tours. Newly accepting bookings for pilgrims and cultural travelers."
  },
  rooms: [
    {
      name: "Vrindavan Courtyard Suite",
      description:
        "King-bed suite with private balcony overlooking the tulsi courtyard, handcrafted bamboo furniture, and dedicated meditation alcove.",
      capacity: "2 adults + 1 child",
      price: "₹4,500 / night",
      amenities: ["Ensuite bath", "All-season AC", "Evening prasad hamper", "High-speed Wi-Fi"],
      image: "https://images.unsplash.com/photo-1505692794403-34d4982c64b5?auto=format&fit=crop&w=1400&q=80"
    },
    {
      name: "Pilgrim Family Room",
      description:
        "Two interconnected queen rooms ideal for families or seva groups with shared lounge and writing desks.",
      capacity: "4 adults",
      price: "₹5,800 / night",
      amenities: ["Complimentary breakfast", "Workstation", "Filtered water carafe", "Prayer kit"],
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80"
    },
    {
      name: "Shanti Deluxe Studio",
      description:
        "Cozy studio with twin beds, reading nook, and access to the rooftop yoga terrace with sunrise views.",
      capacity: "2 adults",
      price: "₹3,600 / night",
      amenities: ["Tea & snack bar", "Ceiling fan + AC", "Organic toiletries", "Laundry on request"],
      image: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=1400&q=80"
    }
  ],
  amenities: [
    "Complimentary anna-daan brunch and evening herbal tea",
    "Temple shuttle for darshan and festival processions",
    "Rooftop yoga deck with sunrise meditation sessions",
    "Library lounge featuring Bhakti literature and local travel guides",
    "On-call doctor and curated village craft tours"
  ],
  packages: [
    {
      name: "Weekend Seva Retreat",
      description:
        "Two-night stay with guided darshan, anna-daan volunteering, and Panchmura terracotta trail.",
      price: "₹9,800 / couple",
      includes: ["2 nights lodging", "Breakfast + brunch", "Seva kit", "Craft village transport"]
    },
    {
      name: "Festival Immersion",
      description:
        "Three-night stay aligned to Rath Yatra or Janmashtami with priority seating and cultural showcases.",
      price: "₹14,500 / person",
      includes: ["Festival access pass", "Evening cultural seating", "Special prasad hamper", "Photo documentation"]
    },
    {
      name: "Heritage & Wellness",
      description:
        "Yoga-led mornings, Bishnupur heritage circuits, and satsang evenings curated for mindful travellers.",
      price: "₹11,200 / couple",
      includes: ["Daily yoga", "Heritage guide", "Healthy breakfast bowls", "Evening satsang circle"]
    },
    {
      name: "Temple, Terracotta & Terraces",
      description:
        "Immersive three-day experience featuring temple storytelling, Bishnupur terracotta tours, and guest-house creative workshops.",
      price: "₹12,800 / person",
      includes: [
        "3 nights lodging",
        "Temple dawn/evening sessions",
        "Bishnupur + Panchmura excursions",
        "Artist-led mural or clay workshop"
      ]
    },
    {
      name: "Artisans’ Studio Passport",
      description:
        "Hands-on terracotta residency with daily craft demonstrations, clay modelling, and direct patronage of Panchmura potters.",
      price: "₹9,200 / person",
      includes: ["Workshop kit", "Wheel session with master artisan", "Souvenir firing", "Lunch at craft village"]
    },
    {
      name: "Art & Wellness Retreat",
      description:
        "Four-day programme combining rooftop yoga, guided meditation, clay therapy, and Baul or kirtan evenings.",
      price: "₹15,600 / couple",
      includes: ["Sunrise yoga blocks", "Clay therapy class", "Spa-inspired vegetarian dinners", "Baul/kirtan performance"]
    },
    {
      name: "Family & School Discovery",
      description:
        "Educational stay designed for families or student groups with interactive clay trails, quizzes, and creative kits.",
      price: "₹18,000 / group (4 pax)",
      includes: ["Heritage presentation", "Clay quiz trail & rewards", "DIY painting kit per guest", "Group seva experience"]
    },
    {
      name: "Terracotta Residency",
      description:
        "Two to four week creative residency for ceramic artists and researchers, concluding with an exhibition that supports temple programmes.",
      price: "₹32,000 / 2 weeks",
      includes: ["Studio workspace", "Artisan mentorship", "Material stipend", "Showcase & sales opportunity"]
    }
  ],
  experiences: [
    {
      title: "Sacred Sunrise",
      subtitle: "Mangala arati & tulsi parikrama",
      description:
        "Awaken to conch shells and bells shimmering over the shikhara; join the 5 AM arati and chant slokas while circling the tulsi courtyard."
    },
    {
      title: "Anna-Daan Seva",
      subtitle: "Community brunch volunteering",
      description:
        "After breakfast, step into the kitchen that feeds 2,000 devotees daily—guests help plate prasad and share stories with villagers."
    },
    {
      title: "Temple & Terracotta Trail",
      subtitle: "Shrines and Bankura artistry",
      description:
        "Explore shrines honoring Radha-Krishna, Kali, Mahadev, and more before visiting Panchmura workshops to shape a terracotta horse or diya."
    },
    {
      title: "Artisans’ Studio Workshop",
      subtitle: "Hands-on clay crafting",
      description:
        "Meet master potters who explain Bankura horse lore, guide wheel work, and fire souvenirs guests can take home while supporting artisan incomes."
    },
    {
      title: "Learning Circles",
      subtitle: "Scholarship & chant sessions",
      description:
        "Observe or join Sanskrit chant practice, bhajan rehearsals, or literacy classes that showcase the temple’s education programmes."
    },
    {
      title: "Integrated Tridhara Arati",
      subtitle: "Evening confluence ritual",
      description:
        "Experience the dusk arati where priests offer trishul, chakra, and devi mantras together, followed by Vrindavan Sabha storytelling."
    },
    {
      title: "Creative Retreat Evening",
      subtitle: "Art & wellness reflections",
      description:
        "Participate in rooftop yoga, clay therapy, or painting sessions led by visiting artists drawing inspiration from temple murals."
    },
    {
      title: "Starlit Terraces",
      subtitle: "Night sky & quiet meditation",
      description:
        "Close the day on the rooftop terraces with clear Panchmura skies, distant bells, and the rustle of palm leaves for quiet self-reflection."
    }
  ],
  faqs: [
    {
      question: "How do I confirm a booking?",
      answer:
        "Send preferred dates, room type, and guest count to info@tridharamandir.com. Reservations are confirmed after a 30% advance via bank transfer or UPI."
    },
    {
      question: "Is airport or rail pickup available?",
      answer:
        "Yes. Shuttle pickups can be arranged from Bishnupur or Bankura railway stations, and private cabs from Kolkata airport with 72 hours’ notice."
    },
    {
      question: "Are meals included?",
      answer:
        "Every stay includes anna-daan brunch, evening herbal tea, and breakfast. Festival packages feature additional prasadam hampers."
    },
    {
      question: "Can we host group retreats?",
      answer:
        "Group stays for yoga collectives, CSR teams, or study tours are welcome. Custom itineraries include seva orientation and craft experiences."
    }
  ]
} as const;

export type GuesthouseContent = typeof guesthouseContent;

export const guesthouseSchemaData = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Tridhara Guest House",
  description: guesthouseContent.overview.description,
  image: guesthouseContent.hero.image,
  url: `${siteConfig.url}/guest-house`,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  areaServed: siteConfig.address.areaServed,
  hasMap: siteConfig.map.embedUrl,
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.streetAddress,
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.addressCountry
  },
  checkInTime: guesthouseContent.overview.checkIn,
  checkOutTime: guesthouseContent.overview.checkOut,
  ...(guesthouseContent.overview.rating.value && guesthouseContent.overview.rating.count
    ? {
        starRating: {
          "@type": "Rating",
          ratingValue: guesthouseContent.overview.rating.value,
          reviewCount: guesthouseContent.overview.rating.count
        }
      }
    : {}),
  amenityFeature: guesthouseContent.amenities.map((amenity) => ({
    "@type": "LocationFeatureSpecification",
    name: amenity,
    value: true
  })),
  makesOffer: guesthouseContent.packages.map((pkg) => ({
    "@type": "Offer",
    name: pkg.name,
    description: pkg.description,
    price: pkg.price.replace(/[^\d.]/g, "") || pkg.price,
    priceCurrency: "INR",
    url: `${siteConfig.url}/guest-house#packages`
  }))
} as const;
