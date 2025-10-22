import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { TempleGeoJsonLd } from "@/components/seo/TempleGeoJsonLd";
import { AboutSection } from "@/components/sections/AboutSection";
import { layoutRules } from "@/foundation/design-system";

export const metadata: Metadata = {
  title: "About Section Preview",
  description: "Storyboard variant preview for the Tridhara Milan Mandir about section."
};

export default function AboutPreviewPage() {
  return (
    <main className="bg-neutral-50 text-neutral-900">
      <TempleGeoJsonLd pageUrl="/preview/about" includeOpeningHours={false} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "About Preview", item: "/preview/about" }
        ]}
      />
      <div className={`${layoutRules.container} ${layoutRules.pagePadding} py-12`}>
        <div className="space-y-4">
          <h1 className="font-display text-3xl text-brand-primary">About Section Preview</h1>
          <p className="max-w-3xl text-sm text-neutral-600">
            This screen renders the Journey Storyboard layout so we can refine copy and art in
            isolation before pushing to the homepage.
          </p>
        </div>
      </div>

      <AboutSection variant="storyboard" showVariantLabel withAnchor={false} />

      <div className={`${layoutRules.container} ${layoutRules.pagePadding} py-12`}>
        <p className="text-xs text-neutral-500">
          Preview route: /preview/about (remove or protect before going live).
        </p>
      </div>
    </main>
  );
}
