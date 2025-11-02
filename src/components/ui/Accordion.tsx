"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: ReadonlyArray<AccordionItem>;
  defaultOpen?: number;
};

// Helper function to generate unique IDs from questions
function generateFAQId(question: string): string {
  return question
    .toLowerCase()
    .replace(/[?!.,]/g, '') // Remove punctuation
    .replace(/\s+/g, '-')    // Spaces to hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove special chars
    .substring(0, 50);       // Max 50 chars
}

export function Accordion({ items, defaultOpen = 0 }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(defaultOpen);

  // Auto-expand accordion if URL hash matches an FAQ
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const matchIndex = items.findIndex(item => generateFAQId(item.question) === hash);
      if (matchIndex !== -1) {
        setActiveIndex(matchIndex);
      }
    }
  }, [items]);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = index === activeIndex;
        const faqId = generateFAQId(item.question);

        return (
          <div
            key={item.question}
            id={faqId}
            className="scroll-mt-24 flex flex-col rounded-2xl border border-brand-primary/10 bg-white/90 shadow-soft/30 transition-shadow hover:shadow-soft"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${index}`}
              id={`accordion-header-${index}`}
              onClick={() => setActiveIndex((current) => (current === index ? -1 : index))}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-brand-light/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/40 rounded-2xl"
            >
              <span className="text-base font-semibold text-brand-primary" itemProp="name">{item.question}</span>
              <ChevronDown
                className={clsx("h-6 w-6 text-brand-secondary transition-transform duration-200", {
                  "rotate-180": isOpen
                })}
              />
            </button>
            <div
              id={`accordion-panel-${index}`}
              role="region"
              aria-labelledby={`accordion-header-${index}`}
              aria-hidden={!isOpen}
              className={clsx(
                "overflow-hidden px-6 transition-[max-height,opacity] duration-300 ease-out",
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              )}
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <div className="py-4 text-sm leading-relaxed text-neutral-700" itemProp="text">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
