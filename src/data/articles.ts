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
  slug: "guest-house-spiritual-itinerary",
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
