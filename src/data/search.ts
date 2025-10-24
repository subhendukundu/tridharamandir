import { siteConfig } from "@/config/site";
import { faqContent, destinationContent } from "@/data/content";
import { guestHouseArticle } from "@/data/articles";
import { servicesList } from "@/data/services";
import { eventsContent } from "@/data/events";

export type SearchIndexItem = {
  title: string;
  description: string;
  href: string;
  category: string;
  keywords: string[];
};

const normalize = (value: string) => value.toLowerCase();

const serviceItems: SearchIndexItem[] = servicesList.map((service) => ({
  title: service.title,
  description: service.summary,
  href: `/services/${service.slug}`,
  category: "Services",
  keywords: [service.slug.replace(/-/g, " "), service.metaDescription]
}));

const faqItems: SearchIndexItem[] = [faqContent.featured, ...faqContent.items].map((faq) => ({
  title: faq.question,
  description: faq.answer,
  href: "/#faq",
  category: "FAQ",
  keywords: ["faq", "visitor info", "guidelines"]
}));

const destinationItems: SearchIndexItem[] = destinationContent.cards.map((card) => ({
  title: card.title,
  description: card.description,
  href: card.href,
  category: "Experiences",
  keywords: [card.duration, "highlights", "visit"]
}));

const eventItems: SearchIndexItem[] = eventsContent.map((event) => ({
  title: event.name,
  description: event.summary,
  href: `/events#${event.slug}`,
  category: "Events",
  keywords: [event.slug.replace(/-/g, " "), event.startDate, event.endDate]
}));

const generalItems: SearchIndexItem[] = [
  {
    title: "Plan Your Visit",
    description: "Visitor guidance covering travel, etiquette, accessibility, and facilities.",
    href: "/plan-your-visit",
    category: "Guides",
    keywords: ["visitor guide", "travel", "accessibility", "plan"]
  },
  {
    title: "Donation & Seva",
    description: "Support scholarships, health camps, and heritage conservation through seva.",
    href: "/services/donation-and-seva",
    category: "Giving",
    keywords: ["donation", "seva", "support", "impact"]
  },
  {
    title: "About Tridhara Milan Mandir",
    description:
      "Discover the mandir's mission to unite Vaishnavism, Shaivism, and Shaktism through Radha-Krishna devotion.",
    href: "/about-us",
    category: "About",
    keywords: ["history", "mission", "second vrindavan", siteConfig.address.addressLocality]
  },
  {
    title: "History & Heritage Timeline",
    description:
      "Review milestones from the mandir’s community land offerings to the 1 July 2022 consecration and recent seva programmes.",
    href: "/history",
    category: "Guides",
    keywords: ["history", "timeline", "second vrindavan", "heritage", "rath yatra"]
  },
  {
    title: "Community Programmes",
    description:
      "Explore anna-daan kitchen, scholarships, and mobile health camps with volunteer steps and orientation tips.",
    href: "/#community",
    category: "Community",
    keywords: ["community programmes", "anna-daan", "volunteer", "health camp", "scholarship"]
  },
  {
    title: "Guest House at Tridhara",
    description:
      "Book boutique suites steps from the mandir with anna-daan brunch, curated packages, and festival-friendly amenities.",
    href: "/guest-house",
    category: "Stay",
    keywords: ["guest house", "lodging", "panchmura accommodation", "temple stay", "book now"]
  },
  {
    title: guestHouseArticle.title,
    description: guestHouseArticle.description,
    href: `/guides/${guestHouseArticle.slug}`,
    category: "Guides",
    keywords: guestHouseArticle.keywords
  }
];

export const searchIndex: SearchIndexItem[] = [
  ...generalItems,
  ...serviceItems,
  ...eventItems,
  ...destinationItems,
  ...faqItems
];

const MAX_RESULTS = 20;

export function searchSite(query: string): SearchIndexItem[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return searchIndex.slice(0, MAX_RESULTS);
  }

  const tokens = trimmed
    .split(/\s+/)
    .map(normalize)
    .filter(Boolean);

  const scored = searchIndex
    .map((item) => {
      const haystack = normalize(`${item.title} ${item.description} ${item.category} ${item.keywords.join(" ")}`);
      const score = tokens.reduce((acc, token) => {
        if (haystack.includes(token)) {
          const titleBoost = normalize(item.title).includes(token) ? 2 : 1;
          return acc + titleBoost;
        }
        return acc;
      }, 0);
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, MAX_RESULTS)
    .map(({ item }) => item);

  return scored;
}
