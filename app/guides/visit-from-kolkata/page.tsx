import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { TempleGeoJsonLd } from "@/components/seo/TempleGeoJsonLd";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { layoutRules, textRules } from "@/foundation/design-system";
import { siteConfig } from "@/config/site";
import { kolkataGuide } from "@/data/articles";

export const metadata: Metadata = {
  title: { absolute: "Kolkata to Tridhara Milan Mandir — Weekend Guide, Routes & Costs" },
  description: kolkataGuide.description,
  alternates: {
    canonical: `/guides/${kolkataGuide.slug}`
  },
  keywords: kolkataGuide.keywords
};

export default function KolkataGuidePage() {
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
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: kolkataGuide.title,
    description: kolkataGuide.description,
    dateModified: kolkataGuide.updated,
    datePublished: kolkataGuide.updated,
    author: {
      "@type": "Organization",
      name: siteConfig.name
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo.png`
      }
    },
    mainEntityOfPage: `${siteConfig.url}/guides/${kolkataGuide.slug}`,
    spatialCoverage: placeSchema
  };

  return (
    <>
      <TempleGeoJsonLd pageUrl={`/guides/${kolkataGuide.slug}`} includeOpeningHours={false} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/guides" },
          { name: "Visit from Kolkata", item: `/guides/${kolkataGuide.slug}` }
        ]}
      />
      <section className="bg-brand-dark py-24 text-white">
        <div className={`${layoutRules.container} ${layoutRules.pagePadding} space-y-5`}>
          <p className="uppercase tracking-[0.3em] text-brand-accent">Guide</p>
          <h1 className={textRules.heroTitle}>{kolkataGuide.title}</h1>
          <p className="max-w-3xl text-white/90">{kolkataGuide.description}</p>
          <div className="flex flex-wrap gap-3 text-sm uppercase tracking-[0.2em] text-white/70">
            <span>{kolkataGuide.updated}</span>
            <span>Kolkata to Panchmura, Bankura</span>
          </div>
        </div>
      </section>

      <SectionShell className="bg-gradient-to-b from-white via-brand-light/30 to-white">
        <div className="space-y-12">
          {kolkataGuide.sections.map((section) => (
            <article
              key={section.heading}
              className="rounded-3xl border border-brand-primary/10 bg-white/95 p-8 shadow-[0_28px_70px_-60px_rgba(27,10,44,0.35)]"
            >
              <h2 className="font-display text-2xl text-brand-primary">{section.heading}</h2>
              <p className="mt-3 text-sm text-neutral-600">{section.body}</p>
              {section.bullets ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-600">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {section.sources ? (
                <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-brand-secondary">
                  {section.sources.map((source) => (
                    <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="underline">
                      {source.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell variant="transparent" className="bg-white">
        <SectionHeader
          eyebrow="Plan Your Trip"
          title="Ready to visit Tridhara Milan Mandir?"
          description="Book your stay at the guest house, plan your itinerary, or explore related guides for a complete Bankura experience."
          alignment="center"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:flex-wrap">
          <Button href="/plan-your-visit" variant="primary" size="lg">
            Plan Your Visit
          </Button>
          <Button href="/guest-house" variant="secondary" size="lg">
            Book Guest House
          </Button>
          <Button href="/guides/bankura-temple-tour-itinerary" variant="secondary" size="lg">
            Bankura Temple Tour
          </Button>
        </div>
      </SectionShell>
    </>
  );
}
