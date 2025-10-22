import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { TempleGeoJsonLd } from "@/components/seo/TempleGeoJsonLd";
import { SectionShell } from "@/components/ui/SectionShell";
import { layoutRules, textRules } from "@/foundation/design-system";
import { eventsContent } from "@/data/events";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Festivals & Events | ${siteConfig.name}`,
  description:
    "Stay updated with upcoming festivals and cultural gatherings at Tridhara Milan Mandir in Panchmura, Bankura."
};

export default function EventsPage() {
  const eventSchemas = eventsContent.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: event.startDate,
    endDate: event.endDate,
    url: `${siteConfig.url}/events#${event.slug}`,
    description: event.description,
    location: {
      "@type": "Place",
      name: siteConfig.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.addressCountry
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude
      }
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Visitor Services",
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email
      }
    }
  }));

  return (
    <>
      <TempleGeoJsonLd pageUrl="/events" />
      {eventSchemas.map((schema) => (
        <script
          key={schema.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Events", item: "/events" }
        ]}
      />
      <section className="relative overflow-hidden bg-brand-dark py-24 text-white">
        <div className={`${layoutRules.container} ${layoutRules.pagePadding} space-y-6`}>
          <p className="uppercase tracking-[0.3em] text-brand-accent">Festivals</p>
          <h1 className={textRules.heroTitle}>Upcoming Events at Tridhara</h1>
          <p className="max-w-3xl text-lg text-white/80">
            Celebrate the devotional calendar with us—from Rath Yatra processions to Janmashtami
            midnight vigils. Each utsav blends Vaishnav, Shaiva, and Shakta traditions in a single
            confluence.
          </p>
        </div>
      </section>

      <SectionShell className="bg-gradient-to-b from-white via-brand-light/40 to-white">
        <div className="space-y-10">
          {eventsContent.map((event) => (
            <article
              key={event.slug}
              id={event.slug}
              className="rounded-3xl border border-brand-primary/15 bg-white/95 p-8 shadow-[0_32px_80px_-60px_rgba(27,10,44,0.35)]"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                <div className="max-w-3xl space-y-4">
                  <h2 className="font-display text-3xl text-brand-primary">{event.name}</h2>
                  <p className="text-sm font-semibold text-brand-secondary">
                    {event.startDate} – {event.endDate}
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600">{event.description}</p>
                </div>
                <div className="flex flex-col gap-2 rounded-2xl bg-brand-light/50 p-4 text-sm text-neutral-700">
                  <span className="font-semibold text-brand-primary">Schedule Highlights</span>
                  {event.timetable.map((slot) => (
                    <div key={`${event.slug}-${slot.time}`}>
                      <span className="font-semibold text-brand-primary">{slot.time}</span>
                      <span className="block text-neutral-600">{slot.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
