import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { programmes, volunteerSteps } from "@/data/community";

export function CommunitySection() {
  return (
    <SectionShell
      id="community"
      variant="transparent"
      className="bg-gradient-to-b from-brand-light via-white to-neutral-50"
    >
      <div className="flex flex-col gap-12">
        <SectionHeader
          eyebrow="Community Programmes"
          eyebrowVariant="badge"
          title="Scholarships, Health Camps & Anna-Daan"
          description="Tridhara Milan Mandir scales seva beyond the mandir campus through student bursaries, village health camps, and the daily anna-daan kitchen."
          alignment="center"
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {programmes.map((programme) => (
            <article
              key={programme.slug}
              className="flex flex-col gap-5 rounded-3xl border border-brand-primary/10 bg-white/95 p-6 shadow-[0_28px_70px_-60px_rgba(27,10,44,0.35)]"
            >
              <div className="flex flex-col gap-5 flex-1">
                <div className="space-y-2">
                  <h3 className="font-display text-xl text-brand-primary">{programme.title}</h3>
                  <p className="text-xs uppercase tracking-[0.22em] text-brand-secondary">
                    {programme.impact}
                  </p>
                  <p className="text-sm text-neutral-600">{programme.description}</p>
                </div>
                <ul className="space-y-2 text-sm text-neutral-600">
                  {programme.stats.map((stat) => (
                    <li key={stat} className="flex gap-2">
                      <span aria-hidden="true" className="text-brand-primary">
                        •
                      </span>
                      <span>{stat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button href={programme.ctaHref} variant="secondary" size="md" icon={<ArrowRight className="h-4 w-4" />}>
                {programme.ctaLabel}
              </Button>
            </article>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="rounded-3xl border border-brand-primary/10 bg-brand-light/40 p-6">
            <h3 className="font-display text-xl text-brand-primary mb-4">Volunteer Onboarding</h3>
            <p className="text-sm text-neutral-600 mb-4">
              Follow the three-step orientation before joining anna-daan, scholarship mentoring, or health camps.
            </p>
            <ol className="space-y-4">
              {volunteerSteps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-primary/10 text-sm font-semibold text-brand-primary">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-primary">{step.title}</h4>
                    <p className="text-sm text-neutral-600">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl border border-brand-primary/10 bg-white/95 p-6">
            <h3 className="font-display text-xl text-brand-primary mb-4">What to Bring</h3>
            <div className="space-y-3 text-sm text-neutral-600">
              <p className="font-semibold text-brand-primary">Required:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Government-issued ID for volunteer logbook</li>
                <li>Comfortable cotton attire and closed footwear</li>
                <li>Reusable water bottle and personal towel</li>
              </ul>
              <p className="font-semibold text-brand-primary pt-2">Optional:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Musical instrument for evening kirtan</li>
                <li>First-aid kit contributions for health camps</li>
                <li>Stationery for tutoring sessions</li>
              </ul>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button
                href="mailto:info@tridharamandir.com?subject=Volunteer%20Orientation%20RSVP"
                variant="primary"
                size="md"
              >
                RSVP Orientation
              </Button>
              <Button href="/history#rituals" variant="secondary" size="md">
                View Daily Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
