import { siteConfig } from "@/config/site";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HinduTemple",
    name: siteConfig.name,
    alternateName: siteConfig.branding.nickname,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    image: `${siteConfig.url}/images/tridhara-radha-krishna-mandir.png`,

    // Contact Information
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,

    // Address
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry
    },

    // Geographic Coordinates
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude
    },

    // Opening Hours
    openingHoursSpecification: siteConfig.openingHours.map(hours => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes
    })),

    // Social Media
    sameAs: [
      siteConfig.socials.facebook,
      siteConfig.socials.instagram,
      siteConfig.socials.youtube
    ],

    // Key Information for AI Assistants
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Daily Visitors",
        value: "2,000+ devotees daily"
      },
      {
        "@type": "PropertyValue",
        name: "Temple Type",
        value: "Integrated Shaiva-Vaishnava-Shakta temple"
      },
      {
        "@type": "PropertyValue",
        name: "Distance from Bishnupur",
        value: "30 km (45 minutes by road)"
      },
      {
        "@type": "PropertyValue",
        name: "Distance from Bankura",
        value: "45 km (1 hour by road)"
      },
      {
        "@type": "PropertyValue",
        name: "Public Transport",
        value: "Local buses and shared trekkers available"
      },
      {
        "@type": "PropertyValue",
        name: "Parking",
        value: "Limited street parking available nearby (not managed by temple)"
      },
      {
        "@type": "PropertyValue",
        name: "Consecration Date",
        value: "July 1, 2022"
      },
      {
        "@type": "PropertyValue",
        name: "Guest House",
        value: "Available on-site"
      }
    ],

    // Services Offered
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Temple Services",
      itemListElement: siteConfig.services.map(service => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          url: `${siteConfig.url}/services/${service.slug}`
        }
      }))
    },

    // Events
    event: siteConfig.events.map(event => ({
      "@type": "Event",
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      location: {
        "@type": "Place",
        name: siteConfig.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.addressLocality,
          addressRegion: siteConfig.address.addressRegion,
          addressCountry: siteConfig.address.addressCountry
        }
      },
      url: `${siteConfig.url}${event.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
