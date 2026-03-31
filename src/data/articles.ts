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
        "October to March offers the best weather for a Bankura temple tour. Major festivals add a special dimension: Rath Yatra (June-July) and Janmashtami (August) at Tridhara, and Mela season in Bishnupur. If you love the drama of monsoon skies, July-August brings lush green landscapes — just pack waterproof shoes as rural roads get muddy. Weekdays are less crowded at both Bishnupur temples and Tridhara Milan Mandir.",
      bullets: [
        "Peak season: October-March (cool, dry weather, festival season)",
        "Key festivals: Janmashtami (Aug), Navaratri (Oct), Rath Yatra (Jun-Jul)",
        "Monsoon lovers: July-August rewards you with lush greenery — just carry rain gear and waterproof footwear",
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

export const kolkataGuide: ArticleContent = {
  slug: "visit-from-kolkata",
  title: "How to Reach Tridhara Milan Mandir from Kolkata — Complete Weekend Guide",
  description:
    "Plan your weekend trip from Kolkata to Tridhara Milan Mandir (Naba Brindaban), Panchmura. Train, bus, and car routes with costs, timings, and a 2-day itinerary. 180 km, 4-hour drive via Bishnupur.",
  updated: "2026-03-31",
  keywords: [
    "kolkata to tridhara milan mandir",
    "how to reach panchmura from kolkata",
    "kolkata to panchmura distance",
    "weekend trip from kolkata temples",
    "kolkata to bishnupur to panchmura",
    "naba brindaban from kolkata",
    "kolkata weekend spiritual retreat",
    "kolkata to bankura temple tour",
    "কলকাতা থেকে পাঁচমুড়া",
    "কলকাতা থেকে ত্রিধারা মন্দির"
  ],
  sections: [
    {
      heading: "Quick Overview",
      body:
        "Tridhara Milan Mandir in Panchmura is a 4-hour drive (180 km) from Kolkata via NH14 through Bishnupur. Known as Naba Brindaban — Bankura's Second Vrindavan — the temple offers integrated Shaiva-Vaishnava-Shakta worship, free anna-daan prasad for 2,000 devotees daily, and an on-site guest house. It makes a perfect weekend spiritual retreat from Kolkata, especially combined with Bishnupur's UNESCO-nominated terracotta temples just 30 km away.",
      bullets: [
        "Distance: 180 km from Kolkata (4 hours via NH14 / Durgapur Expressway)",
        "On-site guest house: ₹3,600-15,600/night with meals included",
        "Free anna-daan prasad: 12:30 PM daily (2,000 meals served)",
        "Evening tridhara arati: 6:30 PM (45-minute integrated ceremony)",
        "Weekend budget: ₹10,000-18,000 per couple (transport, stay, food)",
        "Best season: October-March (15-25°C, festival season)"
      ]
    },
    {
      heading: "By Train: Howrah → Bishnupur → Panchmura",
      body:
        "The most scenic and affordable option. Take a morning train from Howrah to Bishnupur (3.5-4.5 hours), then a shared trekker or taxi for the last 30 km to Panchmura. The Howrah-Adra Express (06:15 departure) gets you to Bishnupur by 10:45 AM — perfect timing for Bishnupur sightseeing before heading to Tridhara for evening arati.",
      bullets: [
        "Howrah-Adra Express (12833): Departs 06:15, arrives Bishnupur 10:45 (₹310 SL)",
        "Tatanagar Express (18109): Departs 07:30, arrives 12:15 (₹310 SL)",
        "Rupasi Bangla Express (12883): Departs 14:10, arrives 17:40 (₹400 CC)",
        "Bishnupur to Panchmura: Shared trekker ₹40/person (every 30 min) or taxi ₹600-800",
        "Return cost for 2 people: ₹1,200-2,000 total"
      ]
    },
    {
      heading: "By Car: NH14 Route from Kolkata",
      body:
        "The fastest and most flexible option, ideal for families or groups. Take the Durgapur Expressway (NH14) from Kolkata, continue 150 km to Bishnupur (3 hours), then take the state highway 30 km to Panchmura. Total drive time is about 4 hours — leave by 6 AM to beat Kolkata exit traffic and arrive in time for temple darshan.",
      bullets: [
        "Route: Kolkata → NH14 (Durgapur Expressway) → Bishnupur → Panchmura Road → Tridhara Milan Mandir",
        "Distance: 180 km | Drive time: 4 hours (add 30-60 min for Kolkata traffic)",
        "Fuel cost: ~₹1,800 round-trip (sedan, 360 km at ₹5/km)",
        "Toll: ₹120 (Durgapur Expressway)",
        "Parking: Free near the temple",
        "Pro tip: Follow Google Maps to 'Tridhara Milan Mandir Panchmura' — signboards also show 'Naba Brindaban'"
      ]
    },
    {
      heading: "By Bus: Budget Option",
      body:
        "State buses run from Kolkata's Esplanade bus terminus to Bishnupur or Bankura. From Bishnupur, catch a local bus to Panchmura. This is the cheapest route but takes 5-6 hours total. Best for solo budget travellers who don't mind the longer journey.",
      bullets: [
        "Kolkata (Esplanade) to Bishnupur: ₹150-200 (4-5 hours, SBSTC or private)",
        "Bishnupur to Panchmura: ₹20 (1 hour, local bus, hourly service)",
        "Total one-way cost: Under ₹250 per person",
        "Alternative: Kolkata to Bankura bus (₹180), then Bankura to Panchmura (₹40, 45 km)"
      ]
    },
    {
      heading: "Weekend Itinerary: 2 Days from Kolkata",
      body:
        "The ideal weekend plan: combine Bishnupur heritage temples on Day 1 with Tridhara Milan Mandir and Panchmura crafts on Day 2. Stay overnight at the Tridhara guest house for the most immersive experience — morning mangala arati at 5 AM is unforgettable.",
      bullets: [
        "Saturday 6:00 AM — Depart Kolkata via NH14",
        "Saturday 10:00 AM — Explore Bishnupur terracotta temples (Rasmancha, Jor-Bangla, Madan Mohan)",
        "Saturday 1:00 PM — Lunch in Bishnupur, visit Baluchari saree shops",
        "Saturday 4:30 PM — Drive to Panchmura, check into Tridhara guest house",
        "Saturday 6:30 PM — Evening tridhara arati at the mandir",
        "Sunday 5:00 AM — Mangala arati, guided temple complex tour",
        "Sunday 12:30 PM — Join anna-daan seva (free community meal)",
        "Sunday 2:00 PM — Panchmura terracotta craft village walk",
        "Sunday 4:00 PM — Return to Kolkata (arrive ~8 PM)"
      ]
    },
    {
      heading: "What to Pack & Practical Tips",
      body:
        "Panchmura is a rural village in Bankura district — pack light but smart. Temple dress code requires covered shoulders and knees. The guest house provides bedding and towels, but bring personal toiletries. Mobile networks (Jio, Airtel, BSNL) work in the area.",
      bullets: [
        "Temple dress: Cover shoulders and knees, no leather in the sanctum",
        "Cash: Carry ₹2,000-3,000 in small notes (limited UPI/card acceptance in the village)",
        "Footwear: Comfortable walking shoes (you'll remove them at the temple entrance)",
        "Season-specific: Sunscreen and hat (summer), light jacket (winter mornings at 12°C)",
        "Monsoon bonus: July-August brings lush green countryside — pack rain gear and waterproof footwear",
        "Language: Bengali, Hindi, and English spoken; volunteer guides available at the temple"
      ]
    },
    {
      heading: "Costs at a Glance",
      body:
        "A complete weekend trip from Kolkata to Tridhara Milan Mandir is surprisingly affordable. Anna-daan meals are free, and the guest house includes vegetarian meals in the room rate. The biggest expense is transport.",
      bullets: [
        "Transport (car, round-trip): ₹2,000-2,500 (fuel + toll)",
        "Transport (train + trekker, 2 people): ₹1,200-2,000",
        "Guest house stay: ₹3,600-15,600/night (includes meals and temple access)",
        "Anna-daan prasad: Free (12:30 PM daily)",
        "Bishnupur temple entry: ₹25/person (ASI ticket)",
        "Panchmura crafts: ₹200-2,000 (Bankura horses, terracotta souvenirs)",
        "Total weekend budget (couple): ₹10,000-18,000"
      ]
    }
  ]
} as const;
