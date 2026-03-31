import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { servicesList } from "@/data/services";

import { galleryCategories } from "@/data/gallery";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.95
    },
    {
      url: `${baseUrl}/why-visit`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.95
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.92
    },
    {
      url: `${baseUrl}/history`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/guest-house`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/plan-your-visit`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.85
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7
    }
  ];

  const serviceRoutes = servicesList.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.85
  }));

  const guideRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/guides/guest-house-experiences`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.75
    },
    {
      url: `${baseUrl}/guides/bankura-temple-tour-itinerary`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/guides/visit-from-kolkata`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.85
    }
  ];

  const festivalRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/festivals/janmashtami`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.85
    },
    {
      url: `${baseUrl}/festivals/rath-yatra`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.85
    }
  ];

  const galleryRoutes = galleryCategories
    .filter(cat => cat.id !== "all")
    .map((category) => ({
      url: `${baseUrl}/gallery/${category.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.88
    }));

  return [...routes, ...serviceRoutes, ...guideRoutes, ...festivalRoutes, ...galleryRoutes];
}
