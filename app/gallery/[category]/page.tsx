import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionShell } from "@/components/ui/SectionShell";
import { galleryImages, galleryCategories, type GalleryCategory } from "@/data/gallery";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

type Props = {
  params: { category: string };
};

// Generate static paths for all categories
export async function generateStaticParams() {
  return galleryCategories
    .filter(cat => cat.id !== "all")
    .map((category) => ({
      category: category.id,
    }));
}

// Generate metadata for each category
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = galleryCategories.find(cat => cat.id === params.category);

  if (!category || category.id === "all") {
    return {};
  }

  const categoryTitles = {
    architecture: "Temple Architecture Photos",
    deities: "Deity Idols & Shrines Photos",
    rituals: "Daily Worship & Rituals Photos",
    festivals: "Festival Celebrations Photos",
  };

  const categoryDescriptions = {
    architecture: "Explore temple architecture photos: 45-foot shikhara, Vrindavan-inspired design, terracotta panels, courtyards.",
    deities: "View sacred deity photos: Radha-Krishna altar, Shiva linga, Maa Kali shrine, integrated worship idols.",
    rituals: "Witness daily ritual photos: Tridhara arati, anna-daan prasad, flower decorations, devotee gatherings.",
    festivals: "Experience festival photos: Durga Puja celebrations, Janmashtami festivities, colorful decorations.",
  };

  return {
    title: `${categoryTitles[params.category as keyof typeof categoryTitles]} | Tridhara Milan Mandir Gallery`,
    description: categoryDescriptions[params.category as keyof typeof categoryDescriptions],
    openGraph: {
      title: `${categoryTitles[params.category as keyof typeof categoryTitles]} | Panchmura Temple`,
      description: categoryDescriptions[params.category as keyof typeof categoryDescriptions],
      type: "website",
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = galleryCategories.find(cat => cat.id === params.category);

  // Validate category
  if (!category || category.id === "all") {
    notFound();
  }

  const filteredImages = galleryImages.filter(img => img.category === params.category);

  // Image Gallery structured data
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${category.label} - Tridhara Milan Mandir`,
    description: `Photo gallery of ${category.label.toLowerCase()} at Tridhara Milan Mandir, Panchmura`,
    url: `https://tridharamandir.com/gallery/${params.category}`,
    image: filteredImages.slice(0, 10).map(img => ({
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
            {category.label}
          </h2>
          <p className="text-neutral-600">
            {filteredImages.length} photo{filteredImages.length !== 1 ? 's' : ''} in this category
          </p>
        </div>

        <GalleryGrid images={filteredImages} />
      </SectionShell>
    </>
  );
}
