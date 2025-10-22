"use client";

import { useState } from "react";
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

export function Accordion({ items, defaultOpen = 0 }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(defaultOpen);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = index === activeIndex;

        return (
          <div key={item.question} className="flex flex-col rounded-2xl border border-brand-primary/10 bg-white/90 shadow-soft/30 transition-shadow hover:shadow-soft">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${index}`}
              id={`accordion-header-${index}`}
              onClick={() => setActiveIndex((current) => (current === index ? -1 : index))}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-brand-light/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/40 rounded-2xl"
            >
              <span className="text-base font-semibold text-brand-primary">{item.question}</span>
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
            >
              <div className="py-4 text-sm leading-relaxed text-neutral-700">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
