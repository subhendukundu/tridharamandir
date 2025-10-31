import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { layoutRules, textRules } from "@/foundation/design-system";
import { CategoryNav } from "@/components/gallery/CategoryNav";

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Gallery", item: "/gallery" }
        ]}
      />

      {/* Hero Section */}
      <section className="bg-brand-dark py-24 text-white">
        <div className={`${layoutRules.container} ${layoutRules.pagePadding} space-y-6`}>
          <p className="uppercase tracking-[0.3em] text-brand-accent">Photo Gallery</p>
          <h1 className={textRules.heroTitle}>Panchmura Radha Krishna Temple Photos</h1>
          <p className="max-w-3xl text-lg text-white/80">
            Explore 70+ photos of Tridhara Milan Mandir's stunning architecture, sacred deities, daily rituals, and vibrant festivals. Known as Naba-Vrindavan (Second Vrindavan), our temple showcases India's only integrated Shaiva-Vaishnava-Shakta worship.
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-white/60">
            <span>📍 Panchmura, Bankura</span>
            <span>•</span>
            <span>30km from Bishnupur</span>
            <span>•</span>
            <span>65+ High-Resolution Photos</span>
          </div>
        </div>
      </section>

      {/* Category Navigation - Now with active state */}
      <section className="bg-gradient-to-b from-white via-brand-light/30 to-white py-8 sticky top-0 z-10 backdrop-blur-sm bg-white/90">
        <div className={`${layoutRules.container} ${layoutRules.pagePadding}`}>
          <CategoryNav />
        </div>
      </section>

      {/* Page Content */}
      {children}
    </>
  );
}
