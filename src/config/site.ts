const appUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tridharamandir.com").replace(/\/$/, "");

const latitude = 22.967507;
const longitude = 87.1709535;
const mapEmbedUrl = `https://maps.google.com/maps?q=Tridhara+Milan+Mandir+Naba-Vrindavan,+Panchmura,+West+Bengal,+India&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

export const siteConfig = {
  name: "Tridhara Milan Mandir",
  homeTitle: "Tridhara Milan Mandir | Radha Krishna Temple Panchmura, Bankura",
  description:
    "Visit the only integrated Shaiva-Vaishnava-Shakta temple in Panchmura, West Bengal. 2,000 devotees daily, guest house available, 30km from Bishnupur.",
  branding: {
    nickname: "Second Vrindavan",
    tagline: "Panchmura's Second Vrindavan",
    summary:
      "A living confluence of Shaiva, Vaishnava, and Shakta devotion with seva initiatives spanning scholarships, health camps, and anna-daan."
  },
  url: appUrl,
  locale: "en_US",
  contact: {
    phone: "+91 96091 75202",
    email: "info@tridharamandir.com"
  },
  address: {
    streetAddress: "Tridhara Milan Mandir Road",
    areaServed: "Panchmura",
    addressLocality: "Panchmura",
    addressRegion: "West Bengal",
    postalCode: "722156",
    addressCountry: "IN"
  },
  geo: {
    latitude,
    longitude
  },
  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "05:00",
      closes: "21:00"
    },
    {
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "05:00",
      closes: "21:30"
    }
  ],
  socials: {
    facebook: "https://www.facebook.com/TridharaMilanMandir",
    instagram: "https://www.instagram.com/tridharamilanmandir",
    youtube: "https://www.youtube.com/@tridharamandir"
  },
  services: [
    {
      slug: "darshan-and-timings",
      name: "Darshan & Timings",
      description:
        "Daily darshan schedule, special aratis, and guidance for booking group visits or special puja sequences."
    },
    {
      slug: "bhog-and-prasad",
      name: "Bhog & Prasad",
      description:
        "Details on the annadan programme, prasad booking, and how to support our community kitchen serving 2,000 devotees daily."
    },
    {
      slug: "marriage-and-rituals",
      name: "Marriage & Rituals",
      description:
        "Arrange auspicious ceremonies including temple weddings, vehicle pujas, namkaran, and sacred thread initiations."
    },
    {
      slug: "donation-and-seva",
      name: "Donation & Seva",
      description:
        "Support scholarships, health camps, and seva drives through transparent donation pathways and volunteer opportunities."
    }
  ],
  events: [
    {
      slug: "rath-yatra",
      name: "Rath Yatra Festival",
      startDate: "2025-06-29",
      endDate: "2025-07-01",
      description:
        "Annual chariot festival featuring Jagannath, Balabhadra, and Subhadra with evening sankirtan and community feast.",
      url: "/events#rath-yatra"
    },
    {
      slug: "janmashtami",
      name: "Sri Krishna Janmashtami",
      startDate: "2025-08-16",
      endDate: "2025-08-17",
      description:
        "Midnight abhishek, jhulan darshan, and bhajan sandhya celebrating Lord Krishna’s advent.",
      url: "/events#janmashtami"
    }
  ],
  map: {
    embedUrl: mapEmbedUrl,
    listingUrl: "https://maps.app.goo.gl/W5XD2Cpb2Cx14qUd9",
    directionsUrl: mapDirectionsUrl
  }
} as const;

export type SiteConfig = typeof siteConfig;
