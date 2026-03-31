import type { Metadata } from "next";
import Link from "next/link";

import { layoutRules, textRules } from "@/foundation/design-system";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { TempleGeoJsonLd } from "@/components/seo/TempleGeoJsonLd";
import { SectionShell } from "@/components/ui/SectionShell";
import { siteConfig } from "@/config/site";
import { napContent } from "@/data/content";
import { getOgImageUrl } from "@/utils/image";

export const metadata: Metadata = {
  title: { absolute: "How to Reach Tridhara Milan Mandir Panchmura | Distance from Bishnupur & Bankura" },
  description:
    "Visit Tridhara Milan Mandir Panchmura: 30km from Bishnupur (45 min), 180km from Kolkata (4 hrs), 45km from Bankura. Temple timings, transport, guest house booking & visitor guide.",
  alternates: {
    canonical: "/plan-your-visit"
  },
  openGraph: {
    title: "How to Reach Tridhara Milan Mandir – Panchmura Distance & Travel Guide",
    description:
      "Plan your visit to Tridhara Milan Mandir Panchmura: 30km from Bishnupur (45 min), 180km from Kolkata. Temple timings, transport, guest house booking & Bankura temple tour.",
    url: `${siteConfig.url}/plan-your-visit`,
    images: [
      {
        url: getOgImageUrl('/images/tridhara-radha-krishna-mandir.png', siteConfig.url),
        width: 1200,
        height: 630,
        alt: 'Tridhara Milan Mandir - Complete visitor guide for planning your temple visit to Panchmura'
      }
    ]
  }
};

const travelTips = [
  {
    title: "Getting Here",
    details: [
      "By Rail: Travel to Bishnupur or Bankura Junction (South Eastern Railway). Panchmura is 30 km from Bishnupur; shared trekkers, buses, and hired cars operate every 30 minutes.",
      "By Road: Take NH14 towards Bankura, then follow the Panchmura state highway. Kolkata travellers can expect a 4.5 hour drive.",
      "By Air: The nearest airport is Kolkata (CCU). Pre-booked taxis and car rentals can drive directly to Panchmura."
    ]
  },
  {
    title: "Temple Timings & Etiquette",
    details: [
      "Gates open at 5:00 AM and close at 9:00 PM (9:30 PM on weekends and festival days).",
      "Remove footwear, leather belts, and handbags before entering the garbhagriha. Mobile phones should be on silent mode.",
      "Photography is permitted in the courtyard; please seek permission for interior shrines."
    ]
  },
  {
    title: "Accessibility & Facilities",
    details: [
      "Wheelchair ramps are available at the eastern entrance with volunteers to assist during peak hours.",
      "Drinking water stations and restrooms are located near the annadan hall.",
      "First-aid support is available during major festivals; contact the seva desk for immediate help."
    ]
  },
  {
    title: "Stay & Local Attractions",
    details: [
      "Book guest houses in Bishnupur or Bankura for overnight stays. During festivals, we coordinate vetted homestays within Panchmura.",
      "Explore nearby terracotta temples of Bishnupur, Panchmura terracotta craft village, and the scenic Mukutmanipur dam."
    ]
  }
];

const visitorGuides = [
  {
    title: "Dress & Conduct",
    details: [
      "Wear modest attire with shoulders and knees covered; remove footwear before entering sanctums.",
      "Keep phones on silent during darshan and arati. Photography is welcome in courtyards; request a volunteer before capturing rituals.",
      "Carry a light shawl or dupatta for covering the head during evening arati if desired."
    ]
  },
  {
    title: "Accessibility",
    details: [
      "Wheelchair ramps and railings support entry at the eastern gate and anna-daan hall.",
      "Volunteers assist elders and wheelchair users during festival crowds—email ahead for support.",
      "Restrooms, filtered water, and shaded seating are located beside the seva helpdesk."
    ]
  },
  {
    title: "Stay & Transportation",
    details: [
      "Reserve guest houses in Bishnupur (30 km) or Bankura town (45 km) for overnight visits; Panchmura homestays open during Rath Yatra and Janmashtami.",
      "Shared trekkers depart Bishnupur bus stand every 30 minutes; chartered vans should arrive before 8:00 AM on utsav days.",
      "Pair darshan with terracotta craft tours at Panchmura village and Bishnupur’s heritage temples."
    ]
  }
];

export default function PlanYourVisitPage() {
  return (
    <>
      <TempleGeoJsonLd
        pageUrl="/plan-your-visit"
        additionalProperties={{
          touristType: ["Pilgrimage", "CulturalHeritageTourism"],
          hasMap: siteConfig.map.directionsUrl
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Plan Your Visit", item: "/plan-your-visit" }
        ]}
      />
      <section className="bg-brand-dark py-24 text-white">
        <div className={`${layoutRules.container} ${layoutRules.pagePadding} space-y-6`}>
          <p className="uppercase tracking-[0.3em] text-brand-accent">Visitor Guide</p>
          <h1 className={textRules.heroTitle}>Plan Your Visit to Panchmura</h1>
          <p className="max-w-3xl text-lg text-white/90">
            Everything you need to know about reaching Tridhara Milan Mandir, navigating temple
            etiquette, and making the most of your stay in the terracotta heartland of Bankura.
          </p>
        </div>
      </section>

      <SectionShell className="bg-gradient-to-b from-white via-brand-light/40 to-white">
        <div className="space-y-10">
          {travelTips.map((tip) => (
            <article
              key={tip.title}
              className="rounded-3xl border border-brand-primary/15 bg-white/95 p-8 shadow-[0_32px_80px_-60px_rgba(27,10,44,0.35)]"
            >
              <h2 className="font-display text-2xl text-brand-primary">{tip.title}</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-neutral-600">
                {tip.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}

          <article className="rounded-3xl border border-brand-primary/15 bg-white/95 p-8 shadow-[0_32px_80px_-60px_rgba(27,10,44,0.35)]">
            <h2 className="font-display text-2xl text-brand-primary">Visitor Essentials</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {visitorGuides.map((guide) => (
                <div key={guide.title} className="space-y-3">
                  <h3 className="font-display text-lg text-brand-primary">{guide.title}</h3>
                  <ul className="list-disc space-y-2 pl-4 text-sm text-neutral-600">
                    {guide.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-brand-primary/15 bg-white/95 p-8 shadow-[0_32px_80px_-60px_rgba(27,10,44,0.35)]">
            <h2 className="font-display text-2xl text-brand-primary">Contact & Assistance</h2>
            <p className="text-sm text-neutral-600">
              Call{" "}
              <a className="text-brand-primary underline" href={`tel:${napContent.phone}`}>
                {napContent.phone}
              </a>{" "}
              or email{" "}
              <a className="text-brand-primary underline" href={`mailto:${napContent.email}`}>
                {napContent.email}
              </a>{" "}
              for personalised guidance on transport, lodging, accessibility, or seva participation.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-brand-light/40 p-4">
                <p className="font-semibold text-brand-primary">Mandir Address</p>
                <div className="mt-2 text-sm text-neutral-600">
                  {napContent.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-brand-light/40 p-4">
                <p className="font-semibold text-brand-primary">Darshan Hours</p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-600">
                  {napContent.hours.map((span, index) => (
                    <li key={`${span.opens}-${index}`}>
                      <span className="font-medium text-brand-primary">
                        {span.dayOfWeek.join(", ")}
                      </span>{" "}
                      {span.opens} – {span.closes}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary underline"
                href={napContent.mapLink}
                target="_blank"
                rel="noreferrer"
              >
                Open Google Maps
              </a>
              <a
                className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary underline"
                href={napContent.directionsLink}
                target="_blank"
                rel="noreferrer"
              >
                Get Directions
              </a>
            </div>
          </article>

          {/* Internal links */}
          <div className="rounded-3xl border border-brand-accent/20 bg-brand-light/30 p-8">
            <h2 className="font-display text-2xl text-brand-primary">Plan a Longer Trip</h2>
            <p className="mt-3 text-sm text-neutral-600">
              Combine your Tridhara visit with Bishnupur&apos;s terracotta temples, Panchmura craft village, and Susunia Hill for a complete Bankura heritage experience.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/guides/bankura-temple-tour-itinerary" className="rounded-2xl border border-brand-primary/15 bg-white px-6 py-4 text-sm font-semibold text-brand-primary hover:border-brand-accent/40 transition-colors">
                2-Day Bankura Temple Tour Itinerary →
              </Link>
              <Link href="/why-visit" className="rounded-2xl border border-brand-primary/15 bg-white px-6 py-4 text-sm font-semibold text-brand-primary hover:border-brand-accent/40 transition-colors">
                Why Visit Tridhara Milan Mandir →
              </Link>
              <Link href="/events" className="rounded-2xl border border-brand-primary/15 bg-white px-6 py-4 text-sm font-semibold text-brand-primary hover:border-brand-accent/40 transition-colors">
                Upcoming Festivals & Events →
              </Link>
            </div>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
