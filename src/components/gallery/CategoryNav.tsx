"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { galleryCategories } from "@/data/gallery";

export function CategoryNav() {
  const pathname = usePathname();

  const isActive = (categoryId: string) => {
    if (categoryId === "all") {
      return pathname === "/gallery";
    }
    return pathname === `/gallery/${categoryId}`;
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {galleryCategories.map((category) => {
        const active = isActive(category.id);

        return (
          <Link
            key={category.id}
            href={category.id === "all" ? "/gallery" : `/gallery/${category.id}`}
            className={`
              rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200
              ${
                active
                  ? "bg-brand-primary text-white shadow-md scale-105"
                  : "bg-white border border-brand-primary/20 text-brand-primary hover:bg-brand-light hover:scale-105"
              }
            `}
          >
            {category.label}
            <span className="ml-2 text-xs opacity-70">({category.count})</span>
          </Link>
        );
      })}
    </div>
  );
}
