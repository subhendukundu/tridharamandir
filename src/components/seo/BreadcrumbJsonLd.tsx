import { siteConfig } from "@/config/site";

type BreadcrumbItem = {
  name: string;
  item: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
  id?: string;
};

const toAbsoluteUrl = (url: string) => {
  if (url.startsWith("http")) {
    return url;
  }
  return `${siteConfig.url}${url.startsWith("/") ? "" : "/"}${url}`;
};

export function BreadcrumbJsonLd({ items, id }: BreadcrumbJsonLdProps) {
  if (!items.length) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(id ? { "@id": id } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.item)
    }))
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
