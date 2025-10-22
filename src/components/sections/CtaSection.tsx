import Image from "next/image";

import { TextField } from "@/components/forms/TextField";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { ctaContent } from "@/data/content";

export function CtaSection() {
  return (
    <SectionShell id="cta" variant="contrast" className="relative overflow-hidden">
      <Image
        src={ctaContent.image}
        alt="Devotees gathered for seva near terraced hills"
        fill
        loading="lazy"
        decoding="async"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-primary/60 to-brand-secondary/40" />
      <div className="relative flex flex-col items-center gap-10">
        <SectionHeader title={ctaContent.title} alignment="center" tone="light" />
        <form className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <TextField
            id="cta-email"
            type="email"
            placeholder={ctaContent.subtitle}
            tone="dark"
            required
            className="sm:w-80"
            aria-label="Email address"
          />
          <Button variant="inverted" type="submit">
            {ctaContent.action.label}
          </Button>
        </form>
      </div>
    </SectionShell>
  );
}
