import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Sparkles, Map } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/config/site";
import { cfImage, imagePresets, getOgImageUrl } from "@/utils/image";

export const metadata: Metadata = {
  title: "About Panchmura Milan Mandir | Tridhara Temple Bankura, Naba-Vrindavan",
  description:
    "Learn about Tridhara Milan Mandir in Panchmura - India's only integrated Shaiva-Vaishnava-Shakta temple, 30km from Bishnupur. Founded 2022, serving 2,000 devotees daily with free prasad and guest house.",
  keywords: [
    "about Tridhara Milan Mandir",
    "Panchmura temple history",
    "integrated Hindu temple",
    "Shaiva Vaishnava Shakta worship",
    "Panchmura Milan Mandir",
    "Bankura spiritual destination",
    "Naba Vrindavan Panchmura",
    "temples near Bishnupur"
  ],
  openGraph: {
    title: "About Tridhara Milan Mandir - Panchmura's Integrated Temple Near Bishnupur",
    description:
      "India's only temple with integrated Shaiva-Vaishnava-Shakta worship in Panchmura, Bankura. Consecrated 2022, serving 2,000 devotees daily. 30km from Bishnupur terracotta temples.",
    type: "website",
    url: `${siteConfig.url}/about-us`,
    images: [
      {
        url: getOgImageUrl('/images/tridhara-radha-krishna-mandir.png', siteConfig.url),
        width: 1200,
        height: 630,
        alt: "Tridhara Milan Mandir - India's unique integrated Shaiva-Vaishnava-Shakta temple in Panchmura"
      }
    ]
  }
};

export default function AboutUsPage() {
  // Structured data for AI assistants (ChatGPT, Google AI, etc.)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Tridhara Milan Mandir",
    "description": "Learn about India's only temple with integrated Shaiva-Vaishnava-Shakta worship, located in Panchmura, West Bengal",
    "url": `${siteConfig.url}/about-us`,
    "mainEntity": {
      "@type": "HinduTemple",
      "name": siteConfig.name,
      "alternateName": siteConfig.branding.nickname,
      "description": siteConfig.description,
      "foundingDate": "2022-07-01",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.address.streetAddress,
        "addressLocality": siteConfig.address.addressLocality,
        "addressRegion": siteConfig.address.addressRegion,
        "postalCode": siteConfig.address.postalCode,
        "addressCountry": siteConfig.address.addressCountry
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": siteConfig.geo.latitude,
        "longitude": siteConfig.geo.longitude
      },
      "telephone": siteConfig.contact.phone,
      "email": siteConfig.contact.email,
      "openingHoursSpecification": siteConfig.openingHours.map(hours => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": hours.dayOfWeek,
        "opens": hours.opens,
        "closes": hours.closes
      })),
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Temple Type",
          "value": "India's only integrated Shaiva-Vaishnava-Shakta temple"
        },
        {
          "@type": "PropertyValue",
          "name": "Primary Deities",
          "value": "Radha-Krishna (Vaishnava), Maa Kali (Shakta), Mahadev Shiva (Shaiva)"
        },
        {
          "@type": "PropertyValue",
          "name": "Daily Visitors",
          "value": "2,000+ devotees daily"
        },
        {
          "@type": "PropertyValue",
          "name": "Consecration Date",
          "value": "July 1, 2022 (Rath Yatra)"
        },
        {
          "@type": "PropertyValue",
          "name": "Location",
          "value": "Panchmura village, 30km from Bishnupur, West Bengal"
        },
        {
          "@type": "PropertyValue",
          "name": "Unique Feature",
          "value": "Integrated tridhara arati ceremony combining all three Hindu traditions"
        },
        {
          "@type": "PropertyValue",
          "name": "Architecture",
          "value": "Vrindavan-inspired Nagara style with 45-foot shikhara and terracotta panels"
        },
        {
          "@type": "PropertyValue",
          "name": "Community Service",
          "value": "Daily anna-daan serving 2,000 meals"
        },
        {
          "@type": "PropertyValue",
          "name": "Accommodation",
          "value": "On-site guest house with 8 suites available for pilgrims"
        }
      ],
      "sameAs": [
        siteConfig.socials.facebook,
        siteConfig.socials.instagram,
        siteConfig.socials.youtube
      ]
    }
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "About Us", item: "/about-us" }
        ]}
      />

      {/* Hero Section with Pattern Background */}
      <section className="relative bg-gradient-to-br from-brand-light via-white to-brand-light pt-40 pb-32 sm:pt-48 sm:pb-40 lg:pt-56 lg:pb-48 overflow-hidden">
        {/* Left Pattern - Hidden on mobile */}
        <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 opacity-20 hidden md:block">
          <Image
            src={cfImage("/patterns/radha-krishna-outlined.png", { ...imagePresets.pattern(480), segment: 'foreground' })}
            alt=""
            width={360}
            height={520}
            className="w-[300px] lg:w-[400px]"
          />
        </div>

        {/* Right Pattern - Temple outline visible on all screens */}
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 opacity-50">
          <Image
            src={cfImage("/patterns/tridhara-mandir-outline.png", { ...imagePresets.pattern(640), segment: 'foreground' })}
            alt=""
            width={620}
            height={360}
            className="w-[350px] md:w-[420px] lg:w-[500px]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-primary backdrop-blur mb-6">
            About the Mandir
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-primary mb-6">
            Where Three Streams of Faith Flow Together
          </h1>

          <p className="text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-3xl mx-auto">
            Consecrated on 1 July 2022 at Panchmura, Bankura, Tridhara Milan Mandir unites Vaishnavism, Shaivism, and Shaktism in devotion to Radha–Krishna. The complex houses sanctums for Radha-Krishna, Kali, Mahadev, Rama–Sita, Hanuman, and Chaitanya Mahaprabhu.
          </p>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-primary mb-4">
              Mission & Values
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our mission is to harmonise diverse Hindu traditions through inclusive worship, prasada seva, and transparent support for education and healthcare.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-accent/10 mb-6 group-hover:bg-brand-accent/20 transition-colors">
                <Compass className="w-7 h-7 text-brand-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-brand-primary mb-3">
                Consecrated in 2022
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Dedicated on 1 July 2022 during Rath Yatra, the mandir invites devotees across traditions to Panchmura's sacred campus.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-accent/10 mb-6 group-hover:bg-brand-accent/20 transition-colors">
                <Sparkles className="w-7 h-7 text-brand-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-brand-primary mb-3">
                Mission: Unity Through Seva
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Integrated Shaiva, Vaishnava, and Shakta worship underscores a mission of inclusive devotion and shared seva.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-accent/10 mb-6 group-hover:bg-brand-accent/20 transition-colors">
                <Map className="w-7 h-7 text-brand-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-brand-primary mb-3">
                Values in Action
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Scholarships, anna-daan, health camps, and heritage tours foster compassion, transparency, and cultural stewardship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-primary mb-4">
              Our Founder
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
            {/* Founder Image */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={cfImage("/images/bhajan-dutta.png", { width: 640, quality: 90, format: "auto" })}
                  alt="Bhajan Dutta, Founder of Tridhara Milan Mandir"
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Founder Details */}
            <div className="flex-1">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-brand-primary mb-4">
                Bhajan Dutta
              </h3>
              <p className="text-lg text-brand-secondary mb-6">
                Founder & Spiritual Guide
              </p>

              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Bhajan Dutta envisioned Tridhara Milan Mandir as a sacred space where the three great streams of Hindu devotion—Shaiva, Vaishnava, and Shakta—could flow together in harmony. His vision was born from a deep belief in the unity underlying all spiritual paths.
                </p>
                <p>
                  Under his guidance, the temple was consecrated on July 1, 2022, during Rath Yatra, bringing together devotees from across traditions. His commitment to inclusive worship, community service, and cultural preservation continues to inspire the temple's mission.
                </p>
                <p>
                  Beyond building the physical structure, Bhajan Dutta established programs for education, healthcare, and daily anna-daan that now serve thousands of devotees and families in the Panchmura region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-neutral-50 to-white">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <div className="bg-white rounded-3xl border border-brand-primary/10 p-8 sm:p-12 shadow-sm">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-brand-primary mb-8">
              Our Foundation
            </h2>

            <div className="space-y-6 text-neutral-700 leading-relaxed">
              <p>
                The Nagara-style shikhara, shegun-beamed ceilings, and tulsi mancha evoke Vrindavan even as seva programmes extend learning, health, and nutrition to neighbouring villages.
              </p>

              <div className="border-l-4 border-brand-accent pl-6 my-8">
                <h3 className="font-semibold text-brand-primary mb-2">Inclusive Devotion</h3>
                <p className="text-neutral-600">
                  Integrated aratis and shared sanctums honour Shaiva, Vaishnava, and Shakta lineages side by side.
                </p>
              </div>

              <div className="border-l-4 border-brand-accent pl-6 my-8">
                <h3 className="font-semibold text-brand-primary mb-2">Community Service</h3>
                <p className="text-neutral-600">
                  Scholarships, anna-daan, and health camps ensure seva reaches marginalised families.
                </p>
              </div>

              <div className="border-l-4 border-brand-accent pl-6 my-8">
                <h3 className="font-semibold text-brand-primary mb-2">Cultural Stewardship</h3>
                <p className="text-neutral-600">
                  Artisans, musicians, and temple guides preserve Vrindavan-inspired heritage for new generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
