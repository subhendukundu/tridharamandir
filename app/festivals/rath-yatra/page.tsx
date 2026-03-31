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
    absolute: "Rath Yatra at Tridhara Milan Mandir, Panchmura — Festival Guide 2026"
  },
  description:
    "Experience Rath Yatra 2026 at Tridhara Milan Mandir (Naba Brindaban), Panchmura. Grand chariot procession, community pulling, special bhog for 3,000+ devotees. Bankura's vibrant Rath Yatra celebration.",
  alternates: {
    canonical: "/festivals/rath-yatra"
  },
  keywords: [
    "rath yatra tridhara",
    "rath yatra panchmura",
    "rath yatra bankura 2026",
    "chariot festival west bengal",
    "naba brindaban rath yatra",
    "রথযাত্রা পাঁচমুড়া",
    "রথযাত্রা ত্রিধারা মন্দির"
  ],
  openGraph: {
    title:
      "Rath Yatra 2026 at Tridhara Milan Mandir — Naba Brindaban, Panchmura",
    description:
      "Grand chariot procession, community pulling, special bhog for 3,000+ devotees. Bankura's vibrant Rath Yatra celebration.",
    type: "website",
    url: `${siteConfig.url}/festivals/rath-yatra`,
    images: [
      {
        url: getOgImageUrl(
          "/images/tridhara-radha-krishna-mandir.png",
          siteConfig.url
        ),
        width: 1200,
        height: 630,
        alt: "Rath Yatra celebrations at Tridhara Milan Mandir, Panchmura"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rath Yatra 2026 at Tridhara Milan Mandir — Naba Brindaban, Panchmura",
    description:
      "Grand chariot procession, community pulling, special bhog for 3,000+ devotees.",
    images: [
      getOgImageUrl("/images/tridhara-radha-krishna-mandir.png", siteConfig.url)
    ]
  }
};

export default function RathYatraPage() {
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
    name: "Rath Yatra 2026 at Tridhara Milan Mandir",
    description:
      "Annual 9-day chariot festival with grand procession, community participation, special bhog, and cultural performances",
    startDate: "2026-06-28",
    endDate: "2026-07-06",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: placeSchema,
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url
    },
    isAccessibleForFree: true,
    image: getOgImageUrl(
      "/images/tridhara-radha-krishna-mandir.png",
      siteConfig.url
    )
  };

  const sections = [
    {
      heading: "Rath Yatra at Naba Brindaban",
      body: "Tridhara Milan Mandir's Rath Yatra features a grand chariot procession through Panchmura village. Devotees pull the decorated rath (chariot) carrying the deities from the temple to the village and back. The 9-day festival draws 3,000+ devotees and includes daily special bhog, kirtan, and cultural events."
    },
    {
      heading: "Festival Programme & Schedule",
      bullets: [
        "Day 1: Grand rath procession — devotees pull the chariot through Panchmura village",
        "Daily: Morning mangala arati, special deity darshan in the rath",
        "12:30 PM: Expanded anna-daan (special festival menu for 3,000+ devotees)",
        "Evening: Kirtan, bhajan, and cultural performances",
        "Day 9 (Ulta Rath): Return procession — deities return to the main temple",
        "Throughout: Special flower decorations, lighting, and village fair atmosphere"
      ]
    },
    {
      heading: "How to Visit for Rath Yatra",
      body: "Rath Yatra falls in June-July (Ashadha Shukla Dwitiya). Book guest house 3-4 weeks ahead. Summer heat (35°C) — carry water, sunscreen, light cotton clothing. Extra transport available from Bishnupur during the festival. Entry is free. From Kolkata: 180 km, 4-hour drive via NH14 or train to Bishnupur then 30 km."
    },
    {
      heading: "Rath Yatra Dates",
      body: "Rath Yatra falls in June-July each year based on the Hindu lunar calendar (Ashadha Shukla Dwitiya). 2026 date: contact the temple at +91 96091 75202 for exact timings. The main procession is on Day 1, but the full 9-day festival offers unique experiences each day."
    }
  ];

  return (
    <>
      <TempleGeoJsonLd pageUrl="/festivals/rath-yatra" includeOpeningHours={false} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Festivals", item: "/festivals" },
          { name: "Rath Yatra", item: "/festivals/rath-yatra" }
        ]}
      />

      <section className="bg-brand-dark py-24 text-white">
        <div className={`${layoutRules.container} ${layoutRules.pagePadding} space-y-5`}>
          <p className="uppercase tracking-[0.3em] text-brand-accent">Festival</p>
          <h1 className={textRules.heroTitle}>
            Rath Yatra at Naba Brindaban
          </h1>
          <p className="max-w-3xl text-white/80">
            Join 3,000+ devotees for a grand 9-day chariot procession, community pulling, special bhog, and cultural performances at Tridhara Milan Mandir, Panchmura.
          </p>
          <div className="flex flex-wrap gap-3 text-sm uppercase tracking-[0.2em] text-white/70">
            <span>Bankura District, West Bengal</span>
            <span>June-July (9 Days)</span>
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
          title="Ready to experience Rath Yatra at Tridhara?"
          description="Book your stay at Tridhara guest house, check festival dates, or learn more about the mandir before your visit."
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
