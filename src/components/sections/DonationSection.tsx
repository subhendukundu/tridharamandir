import { HeartHandshake, Landmark, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { donationContent } from "@/data/content";

const iconMap = [HeartHandshake, Landmark, ShieldCheck] as const;

export function DonationSection() {
  return (
    <SectionShell
      id="donation"
      variant="light"
      className="bg-gradient-to-b from-neutral-50 via-brand-light/40 to-brand-light"
    >
      <div className="flex flex-col gap-10">
        <SectionHeader
          eyebrow={donationContent.eyebrow}
          title={donationContent.title}
          description={donationContent.summary}
          alignment="center"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {donationContent.highlights.map((item, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <div
                key={item.label}
                className="flex flex-col gap-3 rounded-3xl border border-brand-primary/10 bg-white/95 p-6 shadow-[0_24px_60px_-50px_rgba(27,10,44,0.45)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-xl text-brand-primary">{item.label}</span>
                </div>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 items-center justify-center sm:flex-row sm:gap-4">
          {donationContent.ctas.map((cta, index) => (
            <Button
              key={cta.label}
              href={cta.href}
              size="lg"
              variant={index === 0 ? "primary" : "secondary"}
            >
              {cta.label}
            </Button>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
