import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { TempleGeoJsonLd } from "@/components/seo/TempleGeoJsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { SectionShell } from "@/components/ui/SectionShell";
import { Button } from "@/components/ui/Button";
import { layoutRules, textRules } from "@/foundation/design-system";
import { servicesContent, servicesList } from "@/data/services";
import { siteConfig } from "@/config/site";

type ServicePageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return servicesList.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = servicesContent[params.slug];
  if (!service) {
    return {};
  }

  const title = `${service.title} | ${siteConfig.name}`;

  return {
    title,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.slug}`
    },
    openGraph: {
      title,
      description: service.metaDescription,
      url: `${siteConfig.url}/services/${service.slug}`,
      images: [
        {
          url: service.hero.image,
          alt: service.hero.alt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: service.metaDescription,
      images: [service.hero.image]
    }
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = servicesContent[params.slug];

  if (!service) {
    notFound();
  }

  const pagePath = `/services/${service.slug}`;
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
    geo: geoSchema,
    hasMap: siteConfig.map.embedUrl
  };
  const providerSchema = {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: addressSchema,
    location: placeSchema,
    sameAs: Object.values(siteConfig.socials)
  };

  const offers = service.pricing
    ? service.pricing.map((tier) => ({
        "@type": "Offer",
        name: tier.title,
        price: tier.amount.replace(/[^\d.]/g, "") || tier.amount,
        priceCurrency: "INR",
        description: tier.description,
        availability: "https://schema.org/InStock",
        url: `${siteConfig.url}${pagePath}`
      }))
    : undefined;

  const faqEntities = service.faqs
    ? service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    : undefined;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: `${siteConfig.url}${pagePath}`,
    mainEntityOfPage: `${siteConfig.url}${pagePath}`,
    provider: providerSchema,
    serviceLocation: placeSchema,
    areaServed: siteConfig.address.areaServed,
    hasMap: siteConfig.map.embedUrl,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Offerings`
    },
    ...(offers ? { offers } : {})
  };

  const faqSchema = faqEntities
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqEntities
      }
    : null;

  return (
    <>
      <TempleGeoJsonLd pageUrl={pagePath} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
          { name: service.title, item: `/services/${service.slug}` }
        ]}
      />
      <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-brand-dark text-white">
        <Image
          src={service.hero.image}
          alt={service.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/60 to-brand-dark/30" />
        <div className="relative z-10 w-full">
          <div className={`${layoutRules.container} ${layoutRules.pagePadding} py-24`}>
            <div className="max-w-3xl space-y-5">
              <p className="uppercase tracking-[0.3em] text-brand-accent">Temple Services</p>
              <h1 className={textRules.heroTitle}>{service.title}</h1>
              <p className="text-lg text-white/85">{service.summary}</p>
            </div>
          </div>
        </div>
      </section>

      <SectionShell className="bg-gradient-to-b from-white via-brand-light/40 to-white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
          <div className="space-y-10">
            <div className="space-y-8">
              <h2 className="font-display text-3xl text-brand-primary">Highlights</h2>
              <div className="grid gap-6">
                {service.highlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-brand-primary/15 bg-white/90 p-6 shadow-[0_32px_80px_-60px_rgba(27,10,44,0.35)]"
                  >
                    <h3 className="font-display text-xl text-brand-primary">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {service.steps ? (
              <div className="space-y-6">
                <h2 className="font-display text-3xl text-brand-primary">How to Participate</h2>
                <ol className="space-y-4">
                  {service.steps.map((step, index) => (
                    <li
                      key={step.title}
                      className="rounded-3xl border border-brand-primary/10 bg-white/95 p-6"
                    >
                      <div className="flex gap-4">
                        <span className="mt-1 inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-primary/10 text-lg font-semibold text-brand-primary">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-display text-lg text-brand-primary">{step.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
            {service.schedule ? (
              <div className="space-y-4">
                <h2 className="font-display text-3xl text-brand-primary">Key Schedule</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {service.schedule.map((slot) => (
                    <div key={`${slot.label}-${slot.value}`} className="rounded-2xl border border-brand-primary/10 bg-white/95 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-secondary">
                        {slot.label}
                      </p>
                      <p className="mt-2 text-sm text-neutral-600">{slot.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {service.resources ? (
              <div className="space-y-4">
                <h2 className="font-display text-3xl text-brand-primary">Helpful Resources</h2>
                <div className="flex flex-col gap-3">
                  {service.resources.map((resource) => (
                    <Button
                      key={resource.href}
                      href={resource.href}
                      variant="secondary"
                      size="md"
                      className="justify-between text-left"
                    >
                      <span>{resource.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <aside className="flex flex-col gap-6 rounded-[28px] border border-brand-primary/15 bg-white/95 p-6 shadow-[0_32px_80px_-60px_rgba(27,10,44,0.35)]">
            <div>
              <h2 className="font-display text-2xl text-brand-primary">Need Assistance?</h2>
              <p className="mt-3 text-sm text-neutral-600">
                Call us at{" "}
                <a className="text-brand-primary underline" href={`tel:${siteConfig.contact.phone}`}>
                  {siteConfig.contact.phone}
                </a>{" "}
                or email{" "}
                <a className="text-brand-primary underline" href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>{" "}
                to coordinate your seva.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-brand-primary">Visiting Hours</h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                {siteConfig.openingHours.map((span, index) => (
                  <li key={`${span.opens}-${index}`}>
                    <span className="font-semibold text-brand-primary">
                      {span.dayOfWeek.join(", ")}
                    </span>{" "}
                    — {span.opens} to {span.closes}
                  </li>
                ))}
              </ul>
            </div>
            {service.cta ? (
              <Button href={service.cta.href} className="justify-center" variant="primary">
                {service.cta.label}
              </Button>
            ) : null}
          </aside>
        </div>
      </SectionShell>

      {(service.pricing || service.faqs) && (
        <SectionShell className="bg-gradient-to-b from-white via-brand-light/20 to-white">
          <div className="flex flex-col gap-12">
            {service.pricing ? (
              <div className="space-y-6">
                <h2 className="font-display text-3xl text-brand-primary">Suggested Offerings</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {service.pricing.map((tier) => (
                    <div
                      key={tier.title}
                      className="rounded-3xl border border-brand-primary/15 bg-white/95 p-6 shadow-[0_26px_70px_-60px_rgba(27,10,44,0.35)]"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-xl text-brand-primary">{tier.title}</h3>
                        <span className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                          {tier.amount}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-neutral-600">{tier.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {service.faqs ? (
              <div className="space-y-6">
                <h2 className="font-display text-3xl text-brand-primary">Service FAQs</h2>
                <Accordion items={service.faqs} />
              </div>
            ) : null}
          </div>
        </SectionShell>
      )}
    </>
  );
}
