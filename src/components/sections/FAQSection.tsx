import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Accordion } from "@/components/ui/Accordion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { faqContent } from "@/data/content";

export function FAQSection() {
  const faqEntries = [faqContent.featured, ...faqContent.items];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <SectionShell
      id="faq"
      variant="transparent"
      className="bg-gradient-to-b from-brand-light via-brand-light/60 to-neutral-100"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div className="flex flex-col gap-8">
          <SectionHeader
            eyebrow={faqContent.eyebrow}
            eyebrowVariant="text"
            title={faqContent.title}
            description={faqContent.lead}
          />
          <div className="rounded-[24px] border border-brand-primary/10 bg-white/90 p-8 shadow-soft">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-secondary">
                <ArrowUpRight className="h-4 w-4" />
                Must Know
              </div>
              <h3 className="font-display text-2xl text-brand-primary">{faqContent.featured.question}</h3>
              <p className="text-sm leading-relaxed text-neutral-600">{faqContent.featured.answer}</p>
            </div>
            <Link
              href="/plan-your-visit"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition hover:text-brand-secondary"
            >
              Learn More
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <Accordion items={faqContent.items} />
      </div>
    </SectionShell>
  );
}
