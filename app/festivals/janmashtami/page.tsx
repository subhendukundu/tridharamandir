import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { TempleGeoJsonLd } from "@/components/seo/TempleGeoJsonLd";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { layoutRules, textRules } from "@/foundation/design-system";
import { siteConfig } from "@/config/site";
import { getOgImageUrl } from "@/utils/image";

export const metadata: Metadata = {
  title: {
    absolute:
      "Janmashtami at Tridhara Milan Mandir, Panchmura — Festival Guide 2026"
  },
  description:
    "Celebrate Janmashtami 2026 at Tridhara Milan Mandir (Naba Brindaban), Panchmura. Midnight abhishek, 5,000+ devotees, special bhog, cultural programme. Bankura's biggest Krishna Janmashtami celebration.",
  alternates: {
    canonical: "/festivals/janmashtami"
  },
  keywords: [
    "janmashtami tridhara milan mandir",
    "janmashtami panchmura",
    "krishna janmashtami bankura 2026",
    "janmashtami celebration west bengal",
    "naba brindaban janmashtami",
    "জন্মাষ্টমী পাঁচমুড়া",
    "জন্মাষ্টমী ত্রিধারা মিলন মন্দির"
  ],
  openGraph: {
    title:
      "Janmashtami 2026 at Tridhara Milan Mandir — Naba Brindaban, Panchmura",
    description:
      "Midnight abhishek, 5,000+ devotees, special bhog & cultural programmes. Bankura's biggest Janmashtami.",
    type: "website",
    url: `${siteConfig.url}/festivals/janmashtami`,
    images: [
      {
        url: getOgImageUrl(
          "/images/tridhara-radha-krishna-mandir.png",
          siteConfig.url
        ),
        width: 1200,
        height: 630,
        alt: "Janmashtami celebrations at Tridhara Milan Mandir, Panchmura"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Janmashtami 2026 at Tridhara Milan Mandir — Naba Brindaban, Panchmura",
    description:
      "Midnight abhishek, 5,000+ devotees, special bhog & cultural programmes.",
    images: [
      getOgImageUrl("/images/tridhara-radha-krishna-mandir.png", siteConfig.url)
    ]
  }
};

export default function JanmashtamiPage() {
  const addressSchema = {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.streetAddress,
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.addressCountry
  };

  const geoSchema = {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude
  };

  const placeSchema = {
    "@type": "Place",
    name: siteConfig.name,
    url: siteConfig.url,
    address: addressSchema,
    geo: geoSchema
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Janmashtami 2026 at Tridhara Milan Mandir",
    description:
      "Annual Janmashtami celebration at Naba Brindaban with midnight abhishek, special bhog, and cultural programmes",
    startDate: "2026-08-14",
    endDate: "2026-08-15",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: placeSchema,
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url
    },
    performer: {
      "@type": "PerformingGroup",
      name: "Temple Priests and Pujaris",
      description:
        "Tridhara Milan Mandir's dedicated priests conducting traditional rituals and ceremonies"
    },
    offers: {
      "@type": "Offer",
      name: "Free Entry",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/festivals/janmashtami`,
      validFrom: "2026-08-14"
    },
    isAccessibleForFree: true,
    image: getOgImageUrl(
      "/images/tridhara-radha-krishna-mandir.png",
      siteConfig.url
    )
  };

  const sections = [
    {
      heading: "Janmashtami at Naba Brindaban",
      body: "Tridhara Milan Mandir celebrates Janmashtami as its biggest annual festival. Being known as Naba Brindaban (Second Vrindavan), the temple's connection to Radha-Krishna worship makes this celebration especially meaningful. Over 5,000 devotees attend. The temple is decorated with flowers and lights for a week."
    },
    {
      heading: "Festival Programme & Schedule",
      bullets: [
        "Morning: Special Radha-Krishna shringar darshan (deity decoration)",
        "10:00 AM: Devotional kirtan and bhajan by visiting artists",
        "12:30 PM: Special festival bhog (expanded anna-daan for 5,000+ devotees)",
        "4:00 PM: Cultural programme — drama, dance, devotional music",
        "8:00 PM: Grand evening arati with special flower offerings",
        "11:30 PM: Countdown to midnight — the birth hour of Lord Krishna",
        "12:00 AM: Midnight abhishek (sacred bathing of Krishna deity) — the highlight",
        "12:30 AM: Midnight special prasad distribution"
      ]
    },
    {
      heading: "How to Visit for Janmashtami",
      body: "Book Tridhara guest house 4-6 weeks in advance (sells out for Janmashtami). From Kolkata: 180 km, 4-hour drive via NH14 / train to Bishnupur then 30 km. Extra buses and shared trekkers run from Bishnupur during the festival. Entry is free. Carry cash (limited UPI in village during crowds)."
    },
    {
      heading: "Janmashtami Dates",
      body: "Janmashtami falls in August-September each year (Krishna Paksha Ashtami of Bhadrapada). 2026 date: check the temple's social media or call +91 96091 75202 for exact timings. Arrive the morning before for the full experience."
    }
  ];

  return (
    <>
      <TempleGeoJsonLd pageUrl="/festivals/janmashtami" includeOpeningHours={false} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Festivals", item: "/festivals" },
          { name: "Janmashtami", item: "/festivals/janmashtami" }
        ]}
      />

      <section className="bg-brand-dark py-24 text-white">
        <div className={`${layoutRules.container} ${layoutRules.pagePadding} space-y-5`}>
          <p className="uppercase tracking-[0.3em] text-brand-accent">Festival</p>
          <h1 className={textRules.heroTitle}>
            Janmashtami at Naba Brindaban
          </h1>
          <p className="max-w-3xl text-white/90">
            Celebrate Lord Krishna's birth with midnight abhishek, 5,000+ devotees, special bhog, and cultural performances at Tridhara Milan Mandir, Panchmura.
          </p>
          <div className="flex flex-wrap gap-3 text-sm uppercase tracking-[0.2em] text-white/70">
            <span>Bankura District, West Bengal</span>
            <span>August-September</span>
          </div>
        </div>
      </section>

      <SectionShell className="bg-gradient-to-b from-white via-brand-light/30 to-white">
        <div className="space-y-12">
          {sections.map((section) => (
            <article
              key={section.heading}
              className="rounded-3xl border border-brand-primary/10 bg-white/95 p-8 shadow-[0_28px_70px_-60px_rgba(27,10,44,0.35)]"
            >
              <h2 className="font-display text-2xl text-brand-primary">
                {section.heading}
              </h2>
              <p className="mt-3 text-sm text-neutral-600">{section.body}</p>
              {section.bullets ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-600">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell variant="transparent" className="bg-white">
        <SectionHeader
          eyebrow="Plan Your Visit"
          title="Ready to celebrate Janmashtami at Tridhara?"
          description="Book your stay at Tridhara guest house, check festival timings, or learn more about the mandir before your visit."
          alignment="center"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/plan-your-visit" variant="primary" size="lg">
            Plan Your Visit
          </Button>
          <Button href="/guest-house" variant="secondary" size="lg">
            Book Guest House
          </Button>
          <Button href="/guides/bankura-temple-tour-itinerary" variant="secondary" size="lg">
            Visit from Kolkata Guide
          </Button>
        </div>
      </SectionShell>
    </>
  );
}
