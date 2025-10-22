import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${siteConfig.url}/sitemap.xml`;

  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/api/"]
    },
    sitemap: sitemapUrl
  };
}
