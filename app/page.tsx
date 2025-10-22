import type { Metadata } from "next";

import { AboutSection } from "@/components/sections/AboutSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { DonationSection } from "@/components/sections/DonationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { QuickFactsSection } from "@/components/sections/QuickFactsSection";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/config/site";
import { testimonialContent } from "@/data/content";

export const metadata: Metadata = {
  title: siteConfig.homeTitle,
  description: siteConfig.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteConfig.homeTitle,
    description: siteConfig.description,
    url: siteConfig.url
  },
  twitter: {
    title: siteConfig.homeTitle,
    description: siteConfig.description
  }
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HinduTemple",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    "@id": `${siteConfig.url}#temple`,
    image: `${siteConfig.url}/images/tridhara-radha-krishna-mandir.png`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
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
    },
    openingHoursSpecification: siteConfig.openingHours.map((span) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: span.dayOfWeek.map((day) => `https://schema.org/${day}`),
      opens: span.opens,
      closes: span.closes
    })),
    sameAs: Object.values(siteConfig.socials)
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Tridhara Milan Mandir Seva & Ritual Offerings",
    url: `${siteConfig.url}/services`,
    itemListElement: siteConfig.services.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.name,
        serviceType: service.name,
        description: service.description,
        provider: {
          "@type": "HinduTemple",
          name: siteConfig.name,
          "@id": `${siteConfig.url}#temple`
        },
        areaServed: siteConfig.address.areaServed,
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${siteConfig.url}/services/${service.slug}`
        }
      }
    }))
  };

  const eventSchemas = siteConfig.events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: event.startDate,
    endDate: event.endDate,
    url: `${siteConfig.url}${event.url}`,
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
        contactType: "General Enquiries",
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email
      }
    }
  }));

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/#home`,
    url: siteConfig.url,
    name: siteConfig.homeTitle ?? siteConfig.name,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#home h1", "#home p"]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `Devotee reflections for ${siteConfig.name}`,
    datePublished: "2025-07-01",
    reviewBody: testimonialContent.quote,
    author: {
      "@type": "Person",
      name: testimonialContent.author,
      address: {
        "@type": "PostalAddress",
        addressLocality: testimonialContent.location
      }
    },
    itemReviewed: {
      "@type": "Organization",
      name: siteConfig.name,
      "@id": `${siteConfig.url}#temple`
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {eventSchemas.map((schema) => (
        <script
          key={schema.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <HeroSection />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "About", item: "/#about" },
          { name: "Services", item: "/services" },
          { name: "Contact", item: "/#visit" }
        ]}
      />
      <AboutSection variant="storyboard" />
      <QuickFactsSection />
      <ServicesSection />
      <CommunitySection />
      <DonationSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
