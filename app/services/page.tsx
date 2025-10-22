import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { TempleGeoJsonLd } from "@/components/seo/TempleGeoJsonLd";
import { SectionShell } from "@/components/ui/SectionShell";
import { layoutRules, textRules } from "@/foundation/design-system";
import { servicesList } from "@/data/services";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Temple Services | ${siteConfig.name}`,
  description:
    "Explore Tridhara Milan Mandir’s seva offerings, including darshan bookings, prasad, sacred rituals, and donation programmes."
};

export default function ServicesOverviewPage() {
  return (
    <>
      <TempleGeoJsonLd pageUrl="/services" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" }
        ]}
      />
      <section className="bg-brand-dark py-24 text-white">
        <div className={`${layoutRules.container} ${layoutRules.pagePadding} space-y-6`}>
          <p className="uppercase tracking-[0.3em] text-brand-accent">Services & Seva</p>
          <h1 className={textRules.heroTitle}>Serve with Tridhara Milan Mandir</h1>
          <p className="max-w-3xl text-lg text-white/80">
            From daily darshan to heritage ceremonies and community kitchens, every service at
            Tridhara strengthens the confluence of Vaishnava, Shaiva, and Shakta devotion. Choose a
            pathway and discover how to participate.
          </p>
        </div>
      </section>

      <SectionShell className="bg-gradient-to-b from-white via-brand-light/40 to-white">
        <div className="grid gap-8 lg:grid-cols-2">
          {servicesList.map((service) => (
            <article
              key={service.slug}
              className="flex flex-col gap-5 rounded-3xl border border-brand-primary/15 bg-white/95 p-8 shadow-[0_32px_80px_-60px_rgba(27,10,44,0.35)] transition hover:shadow-[0_38px_90px_-60px_rgba(27,10,44,0.35)]"
            >
              <div className="space-y-3">
                <h2 className="font-display text-2xl text-brand-primary">{service.name}</h2>
                <p className="text-sm text-neutral-600">{service.description}</p>
              </div>
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition hover:text-brand-secondary"
              >
                Learn more<span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
