import { siteConfig } from "@/config/site";

export type EventDetail = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  startDate: string;
  endDate: string;
  timetable: Array<{
    time: string;
    activity: string;
  }>;
};

export const eventsContent: EventDetail[] = [
  {
    slug: "rath-yatra",
    name: "Rath Yatra Festival",
    summary:
      "Chariot procession of Jagannath, Balabhadra, and Subhadra with sankirtan, bhog, and evening cultural showcases.",
    description:
      "Join the three-day Rath Yatra where the deities are drawn through Panchmura's streets before returning to the mandir with Sudarshan chakra rituals and anna-daan.",
    startDate: "2025-06-27",
    endDate: "2025-06-29",
    timetable: [
      { time: "05:30 AM", activity: "Mangal arati & Netra darshan" },
      { time: "09:00 AM", activity: "Rath preparation and puja" },
      { time: "02:00 PM", activity: "Chariot procession with sankirtan" },
      { time: "07:00 PM", activity: "Cultural performances & prasad distribution" }
    ]
  },
  {
    slug: "janmashtami",
    name: "Sri Krishna Janmashtami",
    summary:
      "Midnight abhishek, Jhulan darshan, and bhajan sandhya celebrating the divine appearance of Lord Krishna.",
    description:
      "Experience fasting, akhanda nama sankirtan, and Krishna janmotsav. Devotees swing the Jhulan dol and receive midnight chandana prasad.",
    startDate: "2025-08-26",
    endDate: "2025-08-27",
    timetable: [
      { time: "10:00 AM", activity: "Shodashopachar puja & Bhagavat katha" },
      { time: "06:00 PM", activity: "Bhajan sandhya and Jhulan darshan" },
      { time: "11:30 PM", activity: "Midnight abhishek and arati" },
      { time: "12:30 AM", activity: "Mahaprasad seva" }
    ]
  }
];

export const eventsForSitemap = eventsContent.map((event) => ({
  loc: `${siteConfig.url}/events#${event.slug}`,
  lastmod: event.startDate
}));
