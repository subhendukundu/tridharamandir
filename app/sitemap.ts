import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { servicesList } from "@/data/services";

import { galleryCategories } from "@/data/gallery";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = "2026-04-25T00:00:00.000Z";

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.95
    },
    {
      url: `${baseUrl}/why-visit`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.95
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.92
    },
    {
      url: `${baseUrl}/history`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/guest-house`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/events`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/plan-your-visit`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85
    },
    {
      url: `${baseUrl}/volunteer`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75
    }
  ];

  const serviceRoutes = servicesList.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85
  }));

  const guideRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/guides/guest-house-experiences`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75
    },
    {
      url: `${baseUrl}/guides/bankura-temple-tour-itinerary`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/guides/visit-from-kolkata`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85
    }
  ];

  const festivalRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/festivals/janmashtami`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.85
    },
    {
      url: `${baseUrl}/festivals/rath-yatra`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.85
    }
  ];

  const galleryRoutes = galleryCategories
    .filter(cat => cat.id !== "all")
    .map((category) => ({
      url: `${baseUrl}/gallery/${category.id}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.88
    }));

  return [...routes, ...serviceRoutes, ...guideRoutes, ...festivalRoutes, ...galleryRoutes];
}
