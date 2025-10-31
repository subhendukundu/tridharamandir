import type { Metadata } from "next";
import { SectionShell } from "@/components/ui/SectionShell";
import { galleryImages } from "@/data/gallery";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Panchmura Radha Krishna Temple Photos | Tridhara Milan Mandir Gallery",
  description:
    "View 70+ photos of Tridhara Milan Mandir Panchmura: Radha-Krishna deities, 45-foot shikhara, terracotta panels, daily rituals, Rath Yatra, Janmashtami festivals. 30km from Bishnupur, Bankura.",
  keywords: [
    "Panchmura Radha Krishna temple photos",
    "Tridhara Milan Mandir images",
    "Naba Vrindavan Panchmura pictures",
    "Panchmura temple gallery",
    "Bankura temple photos",
    "integrated Hindu temple images",
    "Panchmura terracotta temple",
    "Radha Krishna idol photos Panchmura"
  ],
  openGraph: {
    title: "Panchmura Temple Photo Gallery | Tridhara Milan Mandir Pictures",
    description:
      "70+ high-quality photos of Panchmura's Tridhara Milan Mandir: temple architecture, Radha-Krishna shrines, festivals, daily rituals. Naba-Vrindavan near Bishnupur.",
    type: "website",
    images: [
      {
        url: "/images/gallery/temple-interior-shikhara-ceiling-illuminated-panchmura-01.jpg",
        alt: "Tridhara Milan Mandir main temple Panchmura Bankura"
      }
    ]
  }
};

export default function GalleryPage() {
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Tridhara Milan Mandir Photo Gallery",
    description: "Photo gallery featuring temple architecture, deities, rituals, and festivals",
    url: "https://tridharamandir.com/gallery",
    about: {
      "@type": "Place",
      name: "Tridhara Milan Mandir",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Panchmura",
        addressRegion: "West Bengal",
        addressCountry: "IN"
      }
    },
    image: galleryImages.slice(0, 10).map(img => ({
      "@type": "ImageObject",
      url: `https://tridharamandir.com${img.src}`,
      description: img.alt,
      name: img.title
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />

      <SectionShell className="bg-gradient-to-b from-white via-brand-light/30 to-white">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-brand-primary mb-2">
            All Photos
          </h2>
          <p className="text-neutral-600">
            {galleryImages.length} photos across all categories
          </p>
        </div>

        <GalleryGrid images={galleryImages} />
      </SectionShell>

      <SectionShell className="bg-white">
        <div className="prose prose-lg max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-brand-primary">
            About Panchmura Radha Krishna Temple Photos
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            Welcome to the photo gallery of <strong>Tridhara Milan Mandir</strong>, Panchmura sacred Radha Krishna temple also known as <strong>Naba-Vrindavan</strong>. Our collection features over 65 high-quality photographs.
          </p>
        </div>
      </SectionShell>
    </>
  );
}
