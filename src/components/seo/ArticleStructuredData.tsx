import { siteConfig } from "@/config/site";

interface ArticleStructuredDataProps {
  article: {
    title: string;
    description: string;
    datePublished?: string;
    dateModified?: string;
    slug: string;
    type?: "Article" | "HowTo" | "TravelGuide";
  };
}

export function ArticleStructuredData({ article }: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": article.type || "Article",
    headline: article.title,
    description: article.description,
    url: `${siteConfig.url}/guides/${article.slug}`,
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon.png`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/guides/${article.slug}`
    },
    image: `${siteConfig.url}/images/tridhara-radha-krishna-mandir.png`,
    about: {
      "@type": "Place",
      name: siteConfig.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        addressCountry: siteConfig.address.addressCountry
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
