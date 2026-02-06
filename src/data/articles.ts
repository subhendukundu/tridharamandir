export type ArticleSection = {
  heading: string;
  body: string;
  bullets?: string[];
  sources?: Array<{ label: string; href: string }>;
};

export type ArticleContent = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  sections: ArticleSection[];
  keywords: string[];
};

export const guestHouseArticle: ArticleContent = {
  slug: "guest-house-experiences",
  title: "Tridhara Guest House: 6 Terracotta & Temple Experiences",
  description:
    "Plan an unforgettable stay at Tridhara Milan Mandir’s guest house with sunrise arati, anna-daan seva, terracotta workshops, and festival-ready packages in Panchmura.",
  updated: "2025-10-09",
  keywords: [
    "guest house near Bishnupur",
    "Panchmura accommodation",
    "terracotta workshop Bankura",
    "Second Vrindavan stay",
    "Tridhara guest packages"
  ],
  sections: [
    {
      heading: "1. Artisans’ Studio Tour & Workshop",
      body:
        "Begin with a village walk to Panchmura’s master potters. Guides explain the origin of the Bankura horse—its seven-piece construction, ritual use, and global revival. Guests sit at the wheel for clay shaping, then share chai while artisans recall how offerings evolved into folk art exports.",
      bullets: [
        "Morning village walk with heritage guides",
        "Hands-on terracotta horse or diya wheel session",
        "Tea, stories, and fair trade craft purchases"
      ],
      sources: [
        { label: "Bankura horse history", href: "https://en.wikipedia.org/wiki/Bankura_horse" }
      ]
    },
    {
      heading: "2. Temple, Terracotta & Terraces Weekend",
      body:
        "A three-day itinerary combines dawn arati, Bishnupur’s terracotta temples, and rooftop creative retreats. Day one centers on ‘Second Vrindavan’ storytelling; day two explores craft corridors; day three invites guests to sculpt or paint motifs drawn from Tridhara murals.",
      bullets: [
        "Day 1: Sunrise mangala arati, anna-daan seva, evening Vrindavan Sabha storytelling",
        "Day 2: Bishnupur terracotta temple trail, Panchmura craft village lunch",
        "Day 3: Rooftop creative retreat with visiting artist"
      ],
      sources: [
        { label: "Tridhara Milan Mandir", href: "https://en.wikipedia.org/wiki/Tridhara_Milan_Mandir" }
      ]
    },
    {
      heading: "3. Art & Wellness Retreat",
      body:
        "Sunrise yoga on the guest-house terrace pairs with guided meditation on Panchmura’s earth-centric craft. Afternoon clay therapy and evening Baul or kirtan sessions deepen cultural immersion.",
      bullets: [
        "Yoga and meditation overlooking the Nagara-style shikhara",
        "Clay-modelling workshops led by local women potters",
        "Cultural evenings with Baul or kirtan storytellers"
      ]
    },
    {
      heading: "4. Family & School Programmes",
      body:
        "Hands-on learning keeps children engaged. Presentations show how terracotta horses are formed; quiz trails and clay ‘stamps’ reinforce key lessons. DIY painting kits extend creativity back at the guest house.",
      bullets: [
        "Child-friendly terracotta demonstrations",
        "Interactive quiz trail with clay stamp rewards",
        "DIY painting kits featuring pre-fired souvenirs"
      ]
    },
    {
      heading: "5. Terracotta Fair & Residency",
      body:
        "Seasonal ‘Terracotta & Seva’ fairs invite artisans from Panchmura, Sonamukhi, and Hamirpur. Longer artist residencies (2–4 weeks) pair visiting ceramicists with local mentors; finished works support temple programmes.",
      bullets: [
        "Annual bazaar with music, food, and temple tours",
        "Artist-in-residence suites at the guest house",
        "Revenue-sharing model that funds scholarships and anna-daan"
      ]
    },
    {
      heading: "6. Marketing & Visibility Blueprint",
      body:
        "Content, social storytelling, and directory listings amplify reach. The guest house targets long-tail SEO queries, encourages #ClayAtTridhara user stories, collaborates with travel influencers, and lists experiences on Airbnb and Viator.",
      bullets: [
        "Blog posts and shorts on Bankura horse heritage and clay tutorials",
        "Guest-house social profiles plus #ClayAtTridhara UGC spotlight",
        "Partnerships with craft stores, design schools, travel portals"
      ],
      sources: [
        { label: "Generative AI suggestions", href: "https://en.wikipedia.org/wiki/Bankura_district" }
      ]
    },
    {
      heading: "Booking Tips",
      body:
        "Reserve stays 4–6 weeks ahead for festival weekends. Packages can be customized with guided darshan, seva rotations, or Panchmura volunteer days. Include group size, preferred workshop, and accessibility needs in the enquiry email.",
      bullets: [
        "Email info@tridharamandir.com with dates, room type, and package",
        "Request shuttle pickups from Bishnupur or Bankura stations",
        "Ask for bilingual guides (Bengali/Hindi/English) when confirming tours"
      ]
    }
  ]
} as const;

export const bankuraTempleGuide: ArticleContent = {
  slug: "bankura-temple-tour-itinerary",
  title: "Bankura Temple Tour: 2-Day Itinerary – Bishnupur, Panchmura & Tridhara",
  description:
    "Complete 2-day Bankura temple tour covering Bishnupur terracotta temples, Tridhara Milan Mandir (Naba Brindaban), Panchmura craft village, and Susunia Hill. Distance, timings, transport & stay guide.",
  updated: "2026-02-06",
  keywords: [
    "bankura temple tour",
    "bishnupur temple itinerary",
    "bankura brindaban",
    "bankura vrindavan",
    "panchmura temple trip",
    "bishnupur to panchmura distance",
    "bankura tourist places",
    "weekend trip from kolkata bankura",
    "tridhara milan mandir tour",
    "naba brindaban visit",
    "terracotta temples bengal"
  ],
  sections: [
    {
      heading: "Why a Bankura Temple Tour?",
      body:
        "Bankura district in West Bengal packs two distinct temple experiences within a short drive. Bishnupur's 17th-century UNESCO-nominated terracotta temples showcase Malla dynasty heritage, while Tridhara Milan Mandir in Panchmura — known as Naba Brindaban or Bankura's Vrindavan — offers living integrated Shaiva-Vaishnava-Shakta worship. Together they make an ideal 2-day heritage and spiritual circuit from Kolkata.",
      bullets: [
        "Bishnupur: 150 km from Kolkata (3.5 hrs) — terracotta architecture, Rasmancha, Jor-Bangla",
        "Panchmura: 30 km from Bishnupur (45 min) — Tridhara Milan Mandir, terracotta craft village",
        "Combined trip: 2 days covers both heritage and living temple experiences"
      ]
    },
    {
      heading: "Day 1: Bishnupur Terracotta Temples",
      body:
        "Start from Kolkata early morning. Reach Bishnupur by 10 AM via NH14 (150 km, 3.5 hours). Spend the morning exploring the terracotta temple cluster: Rasmancha (1600), Jor-Bangla Temple, Madan Mohan Temple, Radhashyam Temple, and Shyam Rai Temple. Have lunch at a local eatery in Bishnupur town. Afternoon, visit the Bishnupur Museum and Bankura Baluchari saree shops. Drive to Panchmura (30 km, 45 min) by 5 PM to check into Tridhara guest house. Attend the evening integrated tridhara arati at 6:30 PM.",
      bullets: [
        "10:00 AM – Arrive Bishnupur, start with Rasmancha (India's only flat-roofed temple)",
        "11:00 AM – Jor-Bangla and Madan Mohan temples with guide",
        "1:00 PM – Lunch in Bishnupur (try local specialities at Bishnupur Boarding)",
        "2:30 PM – Bishnupur Museum, Baluchari saree shops",
        "5:00 PM – Drive to Panchmura, check into Tridhara guest house",
        "6:30 PM – Witness the unique integrated tridhara arati at the mandir"
      ]
    },
    {
      heading: "Day 2: Tridhara Milan Mandir & Panchmura Village",
      body:
        "Begin with the 5 AM mangala arati at Tridhara Milan Mandir, followed by a guided walk through the Nagara-style temple complex. The morning darshan covers the Radha-Krishna sanctum, Kali shrine, Mahadev sanctum, and the Vrindavan-inspired tulsi courtyard. Join the anna-daan seva at 12:30 PM (2,000 free meals daily). After lunch, explore Panchmura's terracotta craft village — watch artisans create the famous Bankura horse. Return to Kolkata by evening or extend to visit Susunia Hill (35 km, optional Day 3).",
      bullets: [
        "5:00 AM – Mangala arati at Tridhara Milan Mandir",
        "8:00 AM – Guided temple complex tour with volunteer guide",
        "12:30 PM – Join anna-daan (free community meal for all visitors)",
        "2:00 PM – Panchmura terracotta craft village walk and workshop",
        "4:00 PM – Return to Kolkata (180 km, 4 hrs) or extend trip"
      ]
    },
    {
      heading: "Distances & Transport",
      body:
        "All key distances for planning your Bankura temple tour from major starting points. The Bishnupur-Panchmura stretch is well-connected by shared trekkers (₹30-40/person) departing every 30 minutes from Bishnupur bus stand.",
      bullets: [
        "Kolkata to Bishnupur: 150 km (3.5 hours via NH14)",
        "Bishnupur to Panchmura (Tridhara Mandir): 30 km (45 minutes)",
        "Kolkata to Panchmura (direct): 180 km (4 hours via NH14)",
        "Bankura town to Panchmura: 45 km (1 hour)",
        "Panchmura to Susunia Hill: 35 km (50 minutes)",
        "Nearest railway: Bishnupur Station (South Eastern Railway) or Bankura Junction"
      ]
    },
    {
      heading: "Where to Stay",
      body:
        "Tridhara Milan Mandir's on-site guest house is the most immersive option — 8 suites just 100 metres from the temple courtyard, with anna-daan meals included. Alternatively, Bishnupur town has several budget and mid-range guest houses. For festival weekends (Rath Yatra, Janmashtami), book 4-6 weeks in advance.",
      bullets: [
        "Tridhara Guest House: ₹3,600-15,600/night, includes meals and temple access",
        "Bishnupur hotels: Budget options from ₹800-2,000/night in town centre",
        "Bankura town: More hotel choices, 45 km from Panchmura",
        "Book Tridhara stays: info@tridharamandir.com or +91 96091 75202"
      ]
    },
    {
      heading: "Best Time to Visit",
      body:
        "October to March offers the best weather for a Bankura temple tour. Major festivals add a special dimension: Rath Yatra (June-July) and Janmashtami (August) at Tridhara, and Mela season in Bishnupur. Avoid July-August monsoons when rural roads can be muddy. Weekdays are less crowded at both Bishnupur temples and Tridhara Milan Mandir.",
      bullets: [
        "Peak season: October-March (cool, dry weather, festival season)",
        "Key festivals: Janmashtami (Aug), Navaratri (Oct), Rath Yatra (Jun-Jul)",
        "Avoid: Heavy monsoon months (July-August)",
        "Pro tip: Weekday visits mean fewer crowds and more personal attention from guides"
      ]
    },
    {
      heading: "Optional Day 3: Susunia Hill & Joyrambati",
      body:
        "Extend your trip with a visit to Susunia Hill (35 km from Panchmura), known for ancient Buddhist rock inscriptions and trekking. From there, Joyrambati — birthplace of Sri Sarada Devi — is another 40 km. This creates a comprehensive 3-day Bankura spiritual and heritage circuit.",
      bullets: [
        "Susunia Hill: Rock carvings, trekking, panoramic Bankura views (35 km from Panchmura)",
        "Joyrambati: Sarada Devi's birthplace and Ramakrishna Math (40 km from Susunia)",
        "Mukutmanipur Dam: Scenic reservoir, boating, nature walks (70 km from Panchmura)"
      ]
    }
  ]
} as const;
