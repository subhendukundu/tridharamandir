import Image from "next/image";
import { Quote } from "lucide-react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { testimonialContent } from "@/data/content";

export function TestimonialSection() {
  return (
    <SectionShell id="testimonial" variant="muted" className="bg-gradient-to-br from-brand-light/50 via-white to-white">
      <div className="flex flex-col items-center gap-14">
        <SectionHeader
          eyebrow={testimonialContent.eyebrow}
          eyebrowVariant="badge"
          title={testimonialContent.title}
          description={testimonialContent.lead}
          alignment="center"
        />

        <div className="grid w-full gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="flex flex-col gap-6 rounded-[28px] border border-brand-primary/15 bg-white/90 p-10 shadow-[0_32px_80px_-60px_rgba(27,10,44,0.35)]">
            <Quote className="h-10 w-10 text-brand-secondary" />
            <p className="text-xl font-medium text-brand-primary">{testimonialContent.quote}</p>
            <div>
              <p className="font-display text-lg text-brand-primary">{testimonialContent.author}</p>
              <p className="text-sm text-neutral-500">{testimonialContent.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {testimonialContent.avatars.map((avatar, index) => (
              <div
                key={avatar + index}
                className="relative aspect-square overflow-hidden rounded-3xl border border-brand-primary/15"
              >
                <Image
                  src={avatar}
                  alt={`Devotee portrait ${index + 1}`}
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1280px) 12vw, (min-width: 1024px) 15vw, (min-width: 640px) 24vw, 45vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
