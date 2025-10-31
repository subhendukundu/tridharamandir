import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Home, Sparkles, Calendar, Heart } from "lucide-react";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SectionShell } from "@/components/ui/SectionShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Why Visit Panchmura Milan Mandir | Best Temple Near Bishnupur Bankura",
  description:
    "Why visit Tridhara Milan Mandir Panchmura: India's only integrated tridhara arati, 2,000 daily meals, on-site guest house. 30km from Bishnupur terracotta temples. Known as Naba-Vrindavan (Second Vrindavan).",
  keywords: [
    "why visit Panchmura temple",
    "best temples near Bishnupur",
    "Panchmura Milan Mandir features",
    "Naba Brindaban Bankura",
    "temple stay West Bengal",
    "integrated Hindu worship Panchmura",
    "Panchmura Radha Krishna temple",
    "spiritual tourism Bankura",
    "temples in Panchmura"
  ],
  openGraph: {
    title: "Why Visit Panchmura's Tridhara Milan Mandir - Near Bishnupur, Bankura",
    description:
      "Experience Panchmura's unique temple: India's only integrated Shaiva-Vaishnava-Shakta arati, guest house stays, 2,000 daily meals. Add to your Bishnupur heritage tour (30km).",
    type: "website"
  }
};

export default function WhyVisitPage() {
  // Structured data for SEO and AI
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Why Visit Tridhara Milan Mandir",
    "description": "Discover why Tridhara Milan Mandir is West Bengal's most unique temple - featuring India's only integrated Shaiva-Vaishnava-Shakta arati, 2,000 daily anna-daan meals, and overnight guest house.",
    "url": "https://tridharamandir.com/why-visit",
    "mainEntity": {
      "@type": "HinduTemple",
      "name": "Tridhara Milan Mandir",
      "description": "India's only temple with integrated Shaiva-Vaishnava-Shakta worship in a single arati ceremony",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tridhara Milan Mandir Road",
        "addressLocality": "Panchmura",
        "addressRegion": "West Bengal",
        "postalCode": "722156",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 22.967507,
        "longitude": 87.1709535
      }
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Integrated Hindu Worship",
        "description": "Unique integrated arati combining Shaiva, Vaishnava, and Shakta traditions"
      },
      {
        "@type": "Thing",
        "name": "Anna-daan Service",
        "description": "Daily community kitchen serving 2,000 meals to devotees"
      },
      {
        "@type": "Thing",
        "name": "Temple Accommodation",
        "description": "On-site guest house with overnight stays for pilgrims and cultural travelers"
      }
    ]
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
          { name: "Why Visit", item: "/why-visit" }
        ]}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-dark via-brand-primary to-brand-dark py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/patterns/about-temple.svg')] opacity-5" />
        <div className="relative mx-auto max-w-[1160px] px-6 sm:px-8 lg:px-12">
          <Badge
            variant="onDark"
            className="mb-6"
            label="West Bengal's Most Unique Temple Experience"
            icon={<Sparkles className="h-4 w-4" />}
          />
          <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Why Visit Tridhara Milan Mandir?
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-white/90">
            Experience the rare confluence of Shaiva, Vaishnava, and Shakta worship under one roof—an integrated arati found nowhere else in Bengal. Witness 2,000 devotees receiving daily anna-daan, explore Vrindavan-inspired architecture, and stay overnight in our heritage guest house just steps from the sanctum.
          </p>
        </div>
      </section>

      {/* Quick Answer Section */}
      <SectionShell className="bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-semibold text-brand-primary sm:text-4xl">
            The Quick Answer
          </h2>
          <div className="mt-8 rounded-3xl border border-brand-primary/10 bg-brand-light/20 p-8">
            <p className="text-lg leading-relaxed text-brand-primary">
              <strong>Tridhara Milan Mandir is the only temple in India</strong> where Shaiva (Shiva), Vaishnava (Vishnu), and Shakta (Devi) worship occur in a single integrated arati ceremony. Located just 30 km from Bishnupur&apos;s UNESCO-nominated terracotta temples, Tridhara offers a unique spiritual experience combining:
            </p>
            <ul className="mt-6 space-y-3 text-lg text-brand-primary">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-brand-dark">
                  1
                </span>
                <span>India&apos;s only integrated tridhara arati (7:00-8:30 PM daily)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-brand-dark">
                  2
                </span>
                <span>West Bengal&apos;s largest temple anna-daan serving 2,000 meals daily</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-brand-dark">
                  3
                </span>
                <span>Overnight guest house on temple grounds (newly accepting bookings)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-brand-dark">
                  4
                </span>
                <span>Living Panchmura terracotta village experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-brand-dark">
                  5
                </span>
                <span>&ldquo;Second Vrindavan&rdquo; architecture inspired by Govind Dev Temple</span>
              </li>
            </ul>
          </div>
        </div>
      </SectionShell>

      {/* Unique Features Section */}
      <SectionShell className="bg-gradient-to-br from-neutral-50 to-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold text-brand-primary sm:text-4xl">
            What Makes Tridhara Different?
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-neutral-600">
            Unlike other temples in West Bengal, Tridhara offers experiences you won&apos;t find anywhere else.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Feature 1 */}
            <div className="rounded-3xl border border-brand-primary/10 bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/10">
                <Sparkles className="h-7 w-7 text-brand-accent" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-brand-primary">
                India&apos;s Only Integrated Tridhara Arati
              </h3>
              <p className="mt-4 leading-relaxed text-neutral-600">
                Unlike other temples where Shaiva (Shiva), Vaishnava (Vishnu), and Shakta (Devi) worship occur separately, Tridhara&apos;s evening arati integrates all three traditions in a single 90-minute ceremony. Priests simultaneously offer trishul (Shaiva), chakra (Vaishnava), and shankha (Shakta) before united altars—a practice pioneered by our temple in 2022.
              </p>
              <p className="mt-4 text-sm italic text-neutral-500">
                This unique ritual represents the philosophical unity of Hindu traditions, making Tridhara a living symbol of spiritual integration.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-3xl border border-brand-primary/10 bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/10">
                <Users className="h-7 w-7 text-brand-accent" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-brand-primary">
                Daily Anna-Daan Serving 2,000 Devotees
              </h3>
              <p className="mt-4 leading-relaxed text-neutral-600">
                Since launching with 600 meals in 2022, our community kitchen has scaled to serve 2,000 plates of prasadam daily—one of Bengal&apos;s largest temple food programs. Volunteer alongside local families in preparing khichuri, sabji, and payesh in traditional terracotta handi vessels.
              </p>
              <p className="mt-4 text-sm italic text-neutral-500">
                The anna-daan program supports local families, scholarship students, and visiting pilgrims—embodying the temple&apos;s commitment to community service.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-3xl border border-brand-primary/10 bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/10">
                <Home className="h-7 w-7 text-brand-accent" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-brand-primary">
                Stay in Our Heritage Guest House
              </h3>
              <p className="mt-4 leading-relaxed text-neutral-600">
                Tridhara&apos;s 8-suite guest house sits just 100 meters from the temple courtyard. Wake to mangal arati bells, join anna-daan seva, and explore Panchmura&apos;s terracotta workshops—all included in your stay. Unlike staying in Bishnupur (30 km away), you&apos;ll experience temple life from dawn to evening arati.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-3xl border border-brand-primary/10 bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/10">
                <MapPin className="h-7 w-7 text-brand-accent" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-brand-primary">
                Vrindavan-Inspired Architecture in Bengal
              </h3>
              <p className="mt-4 leading-relaxed text-neutral-600">
                Our Nagara-style shikhara (45-foot spire) and tulsi courtyard mirror the design of Vrindavan&apos;s Govind Dev Temple, earning us the devotee-given nickname &ldquo;Second Vrindavan.&rdquo; Built by Panchmura terracotta artisans using traditional Bankura techniques, the temple features 28 hand-carved relief panels depicting Dasavataras and Krishna lila.
              </p>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* Nearby Attractions */}
      <SectionShell className="bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold text-brand-primary sm:text-4xl">
            Nearby Attractions
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-neutral-600">
            Combine your Tridhara visit with these heritage and spiritual destinations:
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-brand-primary/10 bg-gradient-to-br from-white to-neutral-50 p-6">
              <h3 className="font-display text-xl font-semibold text-brand-primary">
                Bishnupur Terracotta Temples
              </h3>
              <p className="mt-2 text-sm text-neutral-500">30 km • 45 min drive</p>
              <p className="mt-3 text-neutral-600">
                UNESCO-nominated 17th-century temples showcasing Bengal&apos;s finest terracotta architecture. Visit Rasmancha, Jor-Bangla, and Madan Mohan temples.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-primary/10 bg-gradient-to-br from-white to-neutral-50 p-6">
              <h3 className="font-display text-xl font-semibold text-brand-primary">
                Joyrambati
              </h3>
              <p className="mt-2 text-sm text-neutral-500">40 km • 1 hour drive</p>
              <p className="mt-3 text-neutral-600">
                Birthplace of Sri Sarada Devi, spiritual consort of Ramakrishna Paramahamsa. Visit the ancestral home and meditation shrine.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-primary/10 bg-gradient-to-br from-white to-neutral-50 p-6">
              <h3 className="font-display text-xl font-semibold text-brand-primary">
                Susunia Hill
              </h3>
              <p className="mt-2 text-sm text-neutral-500">35 km • 50 min drive</p>
              <p className="mt-3 text-neutral-600">
                Ancient Buddhist rock carvings and trekking destination with panoramic views of Bankura countryside.
              </p>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* Plan Your Visit */}
      <SectionShell className="bg-gradient-to-br from-brand-dark via-brand-primary to-brand-dark text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Plan Your Visit to Tridhara
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <Calendar className="mx-auto h-12 w-12 text-brand-accent" />
              <h3 className="mt-4 font-display text-xl font-semibold">Best Time to Visit</h3>
              <p className="mt-2 text-white/80">
                October-March (festival season). Avoid July-August monsoons. Major festivals: Janmashtami (August), Rath Yatra (June-July), Navaratri (October).
              </p>
            </div>

            <div>
              <MapPin className="mx-auto h-12 w-12 text-brand-accent" />
              <h3 className="mt-4 font-display text-xl font-semibold">How to Reach</h3>
              <p className="mt-2 text-white/80">
                <strong>From Kolkata:</strong> 180 km, 4-hour drive via NH14
                <br />
                <strong>From Bishnupur:</strong> 30 km, shared taxi (₹30/person)
                <br />
                <strong>Entry:</strong> Free for all; donations voluntary
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="inverted" size="lg" href="/guest-house">
              Book Guest House Stay
            </Button>
            <Button variant="outlineOnDark" size="lg" href="/#faq">
              View Full Visitor Guide
            </Button>
          </div>
        </div>
      </SectionShell>

      {/* Comparison Section */}
      <SectionShell className="bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold text-brand-primary sm:text-4xl">
            How Tridhara Compares to Other Bengal Temples
          </h2>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-brand-primary/20">
                  <th className="pb-4 pr-4 font-display text-lg font-semibold text-brand-primary">
                    Feature
                  </th>
                  <th className="pb-4 px-4 font-display text-lg font-semibold text-brand-primary">
                    Tridhara (Panchmura)
                  </th>
                  <th className="pb-4 px-4 font-display text-lg font-semibold text-neutral-600">
                    Bishnupur Temples
                  </th>
                  <th className="pb-4 pl-4 font-display text-lg font-semibold text-neutral-600">
                    Dakshineswar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-primary/10">
                <tr>
                  <td className="py-4 pr-4 font-medium text-brand-primary">Primary Deity</td>
                  <td className="py-4 px-4">Radha-Krishna + Kali + Mahadev</td>
                  <td className="py-4 px-4 text-neutral-600">Various (Madan Mohan, Radhashyam)</td>
                  <td className="py-4 pl-4 text-neutral-600">Kali</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium text-brand-primary">Unique Feature</td>
                  <td className="py-4 px-4 font-semibold text-brand-accent">
                    Integrated Tridhara Arati ⭐
                  </td>
                  <td className="py-4 px-4 text-neutral-600">UNESCO heritage architecture</td>
                  <td className="py-4 pl-4 text-neutral-600">Ramakrishna connection</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium text-brand-primary">Best For</td>
                  <td className="py-4 px-4">Living worship + overnight stay</td>
                  <td className="py-4 px-4 text-neutral-600">Historical architecture tours</td>
                  <td className="py-4 pl-4 text-neutral-600">Day pilgrimage from Kolkata</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium text-brand-primary">Distance from Kolkata</td>
                  <td className="py-4 px-4">180 km (4 hours)</td>
                  <td className="py-4 px-4 text-neutral-600">150 km (3.5 hours)</td>
                  <td className="py-4 pl-4 text-neutral-600">15 km (1 hour)</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium text-brand-primary">Daily Anna-Daan</td>
                  <td className="py-4 px-4 font-semibold text-brand-accent">2,000 meals ⭐</td>
                  <td className="py-4 px-4 text-neutral-600">Not offered</td>
                  <td className="py-4 pl-4 text-neutral-600">Limited</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium text-brand-primary">On-Site Accommodation</td>
                  <td className="py-4 px-4 font-semibold text-brand-accent">
                    Yes (8 suites) ⭐
                  </td>
                  <td className="py-4 px-4 text-neutral-600">No (stay in town)</td>
                  <td className="py-4 pl-4 text-neutral-600">No</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-2xl bg-brand-light/20 p-6">
            <p className="text-lg font-medium text-brand-primary">
              <strong>Our Recommendation:</strong> Visit Bishnupur for heritage architecture, Tridhara for living spiritual practice. Combine both in a memorable 2-day Bankura itinerary!
            </p>
          </div>
        </div>
      </SectionShell>

      {/* CTA Section */}
      <SectionShell className="bg-gradient-to-br from-brand-accent via-brand-secondary to-brand-accent">
        <div className="mx-auto max-w-4xl text-center">
          <Heart className="mx-auto h-16 w-16 text-brand-dark" />
          <h2 className="mt-6 font-display text-3xl font-semibold text-brand-dark sm:text-4xl">
            Ready to Experience Tridhara?
          </h2>
          <p className="mt-4 text-xl text-brand-dark/80">
            Join 2,000 devotees who visit daily to experience West Bengal&apos;s most unique temple.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="primary" size="lg" href="/guest-house">
              Book Your Stay
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="mailto:info@tridharamandir.com?subject=Tridhara Visit Inquiry"
            >
              Plan Your Visit
            </Button>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
