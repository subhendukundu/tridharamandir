import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { servicesList } from "@/data/services";
import { eventsContent } from "@/data/events";

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
      url: `${baseUrl}/why-visit`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.95
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
    }
  ];

  const eventAnchors = eventsContent.map((event) => ({
    url: `${baseUrl}/events#${event.slug}`,
    lastModified: event.startDate,
    changeFrequency: "yearly" as const,
    priority: 0.6
  }));

  return [...routes, ...serviceRoutes, ...guideRoutes, ...eventAnchors];
}
