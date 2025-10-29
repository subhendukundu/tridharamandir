import { siteConfig } from "@/config/site";

interface EventStructuredDataProps {
  event: {
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    slug: string;
  };
}

export function EventStructuredData({ event }: EventStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
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
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email
    },
    performer: {
      "@type": "PerformingGroup",
      name: "Temple Priests and Pujaris",
      description: "Tridhara Milan Mandir's dedicated priests conducting traditional rituals and ceremonies"
    },
    offers: {
      "@type": "Offer",
      name: "Free Entry",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/events#${event.slug}`,
      validFrom: event.startDate
    },
    url: `${siteConfig.url}/events#${event.slug}`,
    image: `${siteConfig.url}/images/tridhara-radha-krishna-mandir.png`
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
