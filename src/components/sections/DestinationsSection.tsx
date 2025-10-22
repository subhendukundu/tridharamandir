import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { DestinationCard } from "@/components/cards/DestinationCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { layoutRules } from "@/foundation/design-system";
import { destinationContent } from "@/data/content";

export function DestinationsSection() {
  return (
    <SectionShell id="destinations" variant="muted">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={destinationContent.eyebrow}
            eyebrowVariant="badge"
            title={destinationContent.title}
            description={destinationContent.lead}
          />
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-primary/25 bg-white/80 text-brand-primary transition hover:bg-brand-light/60"
              aria-label="View previous destinations"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-primary/25 bg-white/80 text-brand-primary transition hover:bg-brand-light/60"
              aria-label="View next destinations"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className={clsx("grid sm:grid-cols-2 lg:grid-cols-3", layoutRules.gridGap)}>
          {destinationContent.cards.map((card) => (
            <DestinationCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
