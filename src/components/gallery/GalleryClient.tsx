"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { SectionShell } from "@/components/ui/SectionShell";
import { cfImage, imagePresets } from "@/utils/image";
import type { GalleryImage, GalleryCategory } from "@/data/gallery";

interface GalleryClientProps {
  images: GalleryImage[];
  categories: ReadonlyArray<{
    readonly id: GalleryCategory;
    readonly label: string;
    readonly count: number;
  }>;
}

export function GalleryClient({ images, categories }: GalleryClientProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as GalleryCategory | null;

  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>(
    categoryParam && categories.some(cat => cat.id === categoryParam) ? categoryParam : "all"
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Sync with URL params
  useEffect(() => {
    if (categoryParam && categories.some(cat => cat.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam, categories]);

  const filteredImages = selectedCategory === "all"
    ? images
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null && lightboxIndex < filteredImages.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
        document.body.style.overflow = "auto";
      }
      if (e.key === "ArrowLeft" && lightboxIndex > 0) {
        setLightboxIndex(lightboxIndex - 1);
      }
      if (e.key === "ArrowRight" && lightboxIndex < filteredImages.length - 1) {
        setLightboxIndex(lightboxIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredImages.length]);

  const currentImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <>
      <SectionShell className="bg-gradient-to-b from-white via-brand-light/30 to-white">
        {/* Category Filter with Next.js Links */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" id="category-filter">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.id === "all" ? "/gallery" : `/gallery?category=${category.id}`}
              scroll={false}
              className={`
                rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200
                ${
                  selectedCategory === category.id
                    ? "bg-brand-primary text-white shadow-md scale-105"
                    : "bg-white border border-brand-primary/20 text-brand-primary hover:bg-brand-light"
                }
              `}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-70">({category.count})</span>
            </Link>
          ))}
        </div>

        {/* Gallery Grid with Anchor */}
        <div
          id="gallery-grid"
          data-category={selectedCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-brand-primary/10 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={cfImage(image.src, imagePresets.gallery(600))}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                loading={index < 8 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  {image.title && (
                    <p className="text-sm font-semibold mb-1">{image.title}</p>
                  )}
                  <p className="text-xs text-white/80 line-clamp-2">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-600 text-lg">No photos found in this category.</p>
          </div>
        )}
      </SectionShell>

      {/* Enhanced Lightbox Modal with Navigation */}
      {currentImage && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous Button */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-4 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Next Button */}
          {lightboxIndex < filteredImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-4 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {/* Image Container - Improved Fullscreen Display */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-[95vw] max-h-[85vh] w-full h-full flex items-center justify-center">
              <Image
                src={cfImage(currentImage.src, { width: 1920, fit: "scale-down", quality: 90 })}
                alt={currentImage.alt}
                width={1920}
                height={1080}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                priority
                style={{ maxHeight: "85vh" }}
              />
            </div>

            {/* Image Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 md:p-8">
              <div className="max-w-4xl mx-auto">
                {currentImage.title && (
                  <p className="text-white text-lg font-semibold mb-2">{currentImage.title}</p>
                )}
                <p className="text-white/90 text-sm">{currentImage.alt}</p>
                <p className="text-white/60 text-xs mt-2">
                  {lightboxIndex + 1} / {filteredImages.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
