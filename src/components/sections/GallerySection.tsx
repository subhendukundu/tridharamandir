import Image from "next/image";
import { ChevronLeft, ChevronRight, Eye, Heart, Users } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";

const galleryImages = [
  {
    src: "/images/tridhara-radha-krishna-mandir.png",
    alt: "Tridhara Milan Mandir exterior view",
    category: "Architecture",
    title: "Sacred Architecture"
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    alt: "Devotees during aarti ceremony",
    category: "Rituals",
    title: "Daily Aarti"
  },
  {
    src: "https://images.unsplash.com/photo-1541849546-216549ae2161?auto=format&fit=crop&w=800&q=80",
    alt: "Temple courtyard during festival",
    category: "Festivals",
    title: "Festival Celebrations"
  },
  {
    src: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    alt: "Community kitchen serving prasad",
    category: "Community",
    title: "Anna-Daan Seva"
  },
  {
    src: "https://images.unsplash.com/photo-1582719471384-894f5a05be0d?auto=format&fit=crop&w=800&q=80",
    alt: "Temple murals and artwork",
    category: "Art",
    title: "Sacred Murals"
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    alt: "Volunteers during seva activities",
    category: "Seva",
    title: "Community Service"
  }
];

const categories = ["All", "Architecture", "Rituals", "Festivals", "Community", "Art", "Seva"];

export function GallerySection() {
  return (
    <SectionShell id="gallery" variant="muted" className="bg-gradient-to-br from-brand-light/20 via-white to-brand-light/30">
      <div className="flex flex-col gap-12">
        <SectionHeader
          eyebrow="Visual Journey"
          eyebrowVariant="badge"
          title="Experience Tridhara Through Images"
          description="Discover the beauty, devotion, and community spirit of Tridhara Milan Mandir through our curated collection of photographs and moments."
          alignment="center"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className="rounded-full border border-brand-primary/20 bg-white/80 px-6 py-2 text-sm font-medium text-brand-primary transition-all hover:border-brand-primary/40 hover:bg-brand-primary/10"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-brand-primary/10 bg-white/80 transition-all duration-300 hover:border-brand-primary/20 hover:shadow-[0_32px_80px_-60px_rgba(27,10,44,0.35)]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              
              <div className="absolute inset-0 flex items-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex w-full items-center justify-between text-white">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                      {image.category}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {image.title}
                    </h3>
                  </div>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white transition hover:bg-white/30">
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Overlay for non-hover state */}
              <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:hidden">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary/70">
                  {image.category}
                </span>
                <h3 className="font-display text-lg font-semibold text-brand-primary">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Stats */}
        <div className="grid gap-6 rounded-3xl border border-brand-primary/15 bg-white/90 p-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary mx-auto mb-4">
              <Eye className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-brand-primary mb-2">500+</h3>
            <p className="text-sm text-neutral-600">Sacred Moments Captured</p>
          </div>
          
          <div className="text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary mx-auto mb-4">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-brand-primary mb-2">100+</h3>
            <p className="text-sm text-neutral-600">Festivals Celebrated</p>
          </div>
          
          <div className="text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary mx-auto mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-brand-primary mb-2">2000+</h3>
            <p className="text-sm text-neutral-600">Devotees Served Daily</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-brand-primary/15 bg-gradient-to-br from-brand-light/30 to-white p-10">
          <div className="text-center">
            <h3 className="font-display text-2xl font-semibold text-brand-primary mb-3">
              Share Your Tridhara Experience
            </h3>
            <p className="text-neutral-600 max-w-2xl">
              Have you visited Tridhara Milan Mandir? We'd love to see your photos and hear your stories. 
              Share them with our community and help others discover this sacred place.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              href="mailto:info@tridharamandir.com?subject=Photo%20Submission"
              variant="primary"
              size="lg"
            >
              Submit Photos
            </Button>
            <Button href="/#visit" variant="secondary" size="lg">
              Plan Your Visit
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
