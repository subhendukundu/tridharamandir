import type { Metadata } from "next";
import Image from "next/image";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { TempleGeoJsonLd } from "@/components/seo/TempleGeoJsonLd";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/forms/TextField";
import { Accordion } from "@/components/ui/Accordion";
import { layoutRules, textRules } from "@/foundation/design-system";
import { siteConfig } from "@/config/site";
import { guesthouseContent, guesthouseSchemaData } from "@/data/guesthouse";
import { getOgImageUrl } from "@/utils/image";

export const metadata: Metadata = {
  title: `Panchmura Guest House Near Bishnupur | Tridhara Milan Mandir Stay`,
  description:
    "Stay at Tridhara Guest House Panchmura - 30km from Bishnupur. On-site temple accommodation with anna-daan meals, terracotta workshops, festival packages. Book temple stay near Bankura terracotta temples.",
  keywords: [
    "guest house near Bishnupur",
    "Panchmura accommodation",
    "Tridhara Milan Mandir guest house",
    "temple stay Panchmura",
    "Naba Vrindavan stay",
    "guest house Bankura",
    "terracotta workshop stay",
    "Panchmura Milan Mandir booking",
    "Bankura pilgrimage lodging",
    "accommodation near Bishnupur temples"
  ],
  alternates: {
    canonical: "/guest-house"
  },
  openGraph: {
    title: `Panchmura Guest House | Temple Stay Near Bishnupur, Bankura`,
    description:
      "Book Tridhara Guest House Panchmura - on-site temple accommodation with anna-daan seva, terracotta workshops, 30km from Bishnupur. Perfect for Bankura heritage tour.",
    url: `${siteConfig.url}/guest-house`,
    images: [
      {
        url: getOgImageUrl('/images/tridhara-radha-krishna-mandir.png', siteConfig.url),
        width: 1200,
        height: 630,
        alt: "Tridhara Guest House - On-site temple accommodation with authentic spiritual experience in Panchmura"
      }
    ]
  }
};

export default function GuestHousePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guesthouseContent.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <TempleGeoJsonLd
        pageUrl="/guest-house"
        type="LodgingBusiness"
        includeOpeningHours={false}
        additionalProperties={{
          priceRange: "₹3600-15600",
          checkinTime: guesthouseContent.overview.checkIn,
          checkoutTime: guesthouseContent.overview.checkOut
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guesthouseSchemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Guest House", item: "/guest-house" }
        ]}
      />

      <section className="relative overflow-hidden bg-brand-dark text-white">
        <Image
          src={guesthouseContent.hero.image}
          alt="Guest house lounge overlooking Tridhara Milan Mandir courtyard"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/55" />
        <div className={`${layoutRules.container} ${layoutRules.pagePadding} relative z-10 py-24 space-y-6`}>
          <p className="uppercase tracking-[0.3em] text-brand-accent">{guesthouseContent.hero.eyebrow}</p>
          <h1 className={textRules.heroTitle}>{guesthouseContent.hero.title}</h1>
          <p className="max-w-3xl text-white/80">{guesthouseContent.hero.subtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={guesthouseContent.hero.ctaPrimary.href} variant="primary" size="lg">
              {guesthouseContent.hero.ctaPrimary.label}
            </Button>
            <Button href={guesthouseContent.hero.ctaSecondary.href} variant="ghost" size="lg">
              {guesthouseContent.hero.ctaSecondary.label}
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/80">
            <span>Check-In: {guesthouseContent.overview.checkIn}</span>
            <span>Check-Out: {guesthouseContent.overview.checkOut}</span>
            <span>Newly Accepting Bookings</span>
          </div>
        </div>
      </section>

      <SectionShell variant="transparent" className="bg-gradient-to-b from-white via-brand-light/30 to-white">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="space-y-5">
            <SectionHeader
              eyebrow="Boutique Suites"
              title="Stay steps away from the Mandir"
              description={guesthouseContent.overview.description}
            />
          </div>
          <div className="rounded-3xl border border-brand-primary/10 bg-white/95 p-6">
            <h3 className="font-display text-xl text-brand-primary mb-4">Signature Amenities</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-600">
              {guesthouseContent.amenities.map((amenity) => (
                <li key={amenity}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {guesthouseContent.rooms.map((room) => (
            <article
              key={room.name}
              className="flex flex-col gap-4 rounded-3xl border border-brand-primary/15 bg-white/95 p-6 shadow-[0_26px_70px_-60px_rgba(27,10,44,0.35)]"
            >
              <div className="relative h-44 w-full overflow-hidden rounded-2xl">
                <Image
                  src={room.image}
                  alt={`${room.name} guest suite`}
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 32vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-display text-xl text-brand-primary">{room.name}</h3>
              <p className="text-sm text-neutral-600">{room.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-brand-primary">{room.price}</span>
                <span className="text-neutral-500">{room.capacity}</span>
              </div>
              <ul className="text-sm text-neutral-600 list-disc pl-4 space-y-1">
                {room.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="bg-gradient-to-b from-white via-brand-light/20 to-white">
        <SectionHeader
          eyebrow="Immersive Flow"
          title="How to spend a day at Tridhara Guest House"
          description="Follow this suggested itinerary to weave seva, heritage, and quiet reflection into every stay."
          alignment="center"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {guesthouseContent.experiences.map((experience) => (
            <div
              key={experience.title}
              className="rounded-3xl border border-brand-primary/10 bg-white/95 p-6 shadow-[0_24px_60px_-60px_rgba(27,10,44,0.35)]"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-xl text-brand-primary">{experience.title}</h3>
                <span className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-secondary">
                  {experience.subtitle}
                </span>
              </div>
              <p className="mt-3 text-sm text-neutral-600">{experience.description}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="packages" className="bg-gradient-to-b from-white via-brand-light/20 to-white">
        <SectionHeader
          eyebrow="Curated Packages"
          title="Choose a stay that aligns with your pilgrimage"
          description="Retreats blend darshan access, seva opportunities, and curated excursions across Panchmura and Bishnupur."
          alignment="center"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guesthouseContent.packages.map((pkg) => (
            <div key={pkg.name} className="flex flex-col gap-4 rounded-3xl border border-brand-primary/15 bg-white/95 p-6 shadow-[0_22px_60px_-58px_rgba(27,10,44,0.35)]">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl text-brand-primary">{pkg.name}</h3>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-secondary">{pkg.price}</span>
              </div>
              <p className="text-sm text-neutral-600">{pkg.description}</p>
              <ul className="list-disc space-y-1 pl-4 text-sm text-neutral-600">
                {pkg.includes.map((include) => (
                  <li key={include}>{include}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="bg-gradient-to-b from-white via-brand-light/20 to-white">
        <SectionHeader
          eyebrow="Booking Enquiry"
          title="Reserve your guest-house stay"
          description="Share your travel dates and preferences. A hospitality volunteer will confirm availability and packages within 24 hours."
          alignment="center"
        />
        <form
          className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-3xl border border-brand-primary/15 bg-white/95 p-6 shadow-[0_32px_80px_-60px_rgba(27,10,44,0.35)]"
          action="mailto:info@tridharamandir.com"
          method="POST"
          encType="text/plain"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField id="guest-name" name="name" label="Full Name" placeholder="Your Name" required />
            <TextField id="guest-email" name="email" label="Email" placeholder="you@example.com" type="email" required />
            <TextField id="guest-phone" name="phone" label="Phone" placeholder="+91 90000 00000" required />
            <TextField id="guest-dates" name="dates" label="Preferred Dates" placeholder="12-15 Aug 2025" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField id="guest-room" name="room" label="Room Preference" placeholder="Courtyard Suite" />
            <TextField id="guest-package" name="package" label="Package (optional)" placeholder="Festival Immersion" />
          </div>
          <label className="flex flex-col gap-2 text-sm font-medium text-brand-primary/80">
            <span>Additional Notes</span>
            <textarea
              id="guest-notes"
              name="notes"
              rows={4}
              className="w-full rounded-3xl border border-brand-primary/20 bg-white/90 px-4 py-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Share arrival time, accessibility needs, or seva interests."
            />
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-xs text-neutral-500">
              Booking confirmation requires a 30% advance via bank transfer. We will follow up with payment instructions.
            </p>
            <Button type="submit" variant="primary" size="lg">
              Submit Enquiry
            </Button>
          </div>
        </form>
      </SectionShell>

      <SectionShell className="bg-gradient-to-b from-white via-brand-light/10 to-white">
        <SectionHeader
          eyebrow="Guest FAQs"
          title="Know before your stay"
          description="Answers to common stay questions covering transport, meals, and group bookings."
          alignment="center"
        />
        <Accordion items={guesthouseContent.faqs} />
      </SectionShell>
    </>
  );
}
