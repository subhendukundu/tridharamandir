import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getOgImageUrl } from "@/utils/image";

export const metadata: Metadata = {
  title: "Tridhara Milan Mandir FAQs | Panchmura Temple Questions Answered",
  description:
    "Get answers to all your questions about Tridhara Milan Mandir Panchmura: temple timings, location, free prasad, accommodation, rituals, and how to visit from Bishnupur or Kolkata.",
  keywords: [
    "Panchmura temple FAQs",
    "Tridhara Milan Mandir questions",
    "temple timings Panchmura",
    "how to reach Panchmura temple",
    "Bishnupur to Panchmura distance",
    "temple stay near Bishnupur",
    "free prasad Panchmura",
    "Tridhara temple contact"
  ],
  openGraph: {
    title: "Tridhara Milan Mandir FAQs | Complete Visitor Guide Panchmura",
    description:
      "Frequently asked questions about visiting Tridhara Milan Mandir Panchmura: timings, location, free prasad, guest house, rituals. Plan your trip from Bishnupur (30km) or Kolkata (180km).",
    url: `${siteConfig.url}/faqs`,
    images: [
      {
        url: getOgImageUrl('/images/tridhara-radha-krishna-mandir.png', siteConfig.url),
        width: 1200,
        height: 630,
        alt: 'Tridhara Milan Mandir FAQs - Answers to all your questions about visiting the temple in Panchmura'
      }
    ]
  }
};

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
