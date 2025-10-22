import { siteConfig } from "@/config/site";

type TempleGeoJsonLdProps = {
  pageUrl?: string;
  id?: string;
  type?: string;
  includeOpeningHours?: boolean;
  additionalProperties?: Record<string, unknown>;
};

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: siteConfig.address.streetAddress,
  addressLocality: siteConfig.address.addressLocality,
  addressRegion: siteConfig.address.addressRegion,
  postalCode: siteConfig.address.postalCode,
  addressCountry: siteConfig.address.addressCountry
};

const geoCoordinates = {
  "@type": "GeoCoordinates",
  latitude: siteConfig.geo.latitude,
  longitude: siteConfig.geo.longitude
};

export function TempleGeoJsonLd({
  pageUrl,
  id,
  type = "HinduTemple",
  includeOpeningHours = true,
  additionalProperties
}: TempleGeoJsonLdProps) {
  const absoluteUrl = pageUrl ? new URL(pageUrl, siteConfig.url).toString() : siteConfig.url;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": id ?? `${siteConfig.url}#temple`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    areaServed: siteConfig.address.areaServed,
    hasMap: siteConfig.map.embedUrl,
    isAccessibleForFree: true,
    sameAs: Object.values(siteConfig.socials),
    address: postalAddress,
    geo: geoCoordinates
  };

  if (includeOpeningHours) {
    schema.openingHoursSpecification = siteConfig.openingHours.map((span) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: span.dayOfWeek.map((day) => `https://schema.org/${day}`),
      opens: span.opens,
      closes: span.closes
    }));
  }

  if (additionalProperties) {
    Object.assign(schema, additionalProperties);
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
