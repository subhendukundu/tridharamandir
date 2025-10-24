import { siteConfig } from "@/config/site";

interface ServiceStructuredDataProps {
  service: {
    name: string;
    description: string;
    slug: string;
  };
}

export function ServiceStructuredData({ service }: ServiceStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "HinduTemple",
      name: siteConfig.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.addressCountry
      },
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email
    },
    url: `${siteConfig.url}/services/${service.slug}`,
    areaServed: {
      "@type": "Place",
      name: siteConfig.address.addressLocality
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
