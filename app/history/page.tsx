import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { TempleGeoJsonLd } from "@/components/seo/TempleGeoJsonLd";
import { SectionShell } from "@/components/ui/SectionShell";
import { Button } from "@/components/ui/Button";
import { layoutRules, textRules } from "@/foundation/design-system";
import { siteConfig } from "@/config/site";
import {
  directionsCta,
  heritageHighlights,
  historyIntro,
  historyTimeline,
  nicknameExplainer,
  ritualSchedule
} from "@/data/history";
import { eventsContent } from "@/data/events";

export const metadata: Metadata = {
  title: `Panchmura Tridhara Mandir History | Naba-Vrindavan Temple Bankura`,
  description:
    'History of Panchmura Milan Mandir (Naba-Vrindavan) from 2012 community vision to 2022 Rath Yatra consecration. Discover Bengal\'s integrated Shaiva-Vaishnava-Shakta temple heritage 30km from Bishnupur.'
};

export default function HistoryPage() {
  return (
    <>
      <TempleGeoJsonLd pageUrl="/history" additionalProperties={{ foundingDate: "2022-07-01" }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "History", item: "/history" }
        ]}
      />
      <section className="bg-brand-dark py-24 text-white">
        <div className={`${layoutRules.container} ${layoutRules.pagePadding} space-y-6`}>
          <p className="uppercase tracking-[0.3em] text-brand-accent">{historyIntro.eyebrow}</p>
          <h1 className={textRules.heroTitle}>{historyIntro.title}</h1>
          <p className="max-w-3xl text-white/80">{historyIntro.description}</p>
        </div>
      </section>

      <SectionShell id="timeline" className="bg-gradient-to-b from-white via-brand-light/30 to-white">
        <div className="space-y-8">
          <section className="space-y-8">
            <div className="space-y-3">
              <p className="uppercase tracking-[0.3em] text-brand-secondary text-xs font-semibold">
                Timeline
              </p>
              <h2 className="font-display text-3xl text-brand-primary">Milestones since 2012</h2>
              <p className="text-sm text-neutral-600">
                Each phase reflects collective fundraising, artisan labour, and seva that culminated
                in the Rath Yatra consecration of 1 July 2022.
              </p>
            </div>
            <div className="space-y-6">
              {historyTimeline.map((milestone) => (
                <article
                  key={milestone.period}
                  className="rounded-3xl border border-brand-primary/15 bg-white/90 p-6 shadow-[0_32px_70px_-60px_rgba(27,10,44,0.35)]"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-secondary">
                      {milestone.period}
                    </span>
                    <h3 className="font-display text-xl text-brand-primary">{milestone.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600">{milestone.description}</p>
                    {milestone.highlight ? (
                      <p className="text-sm font-semibold text-brand-secondary">{milestone.highlight}</p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </SectionShell>

      <SectionShell id="rituals" className="bg-gradient-to-b from-white via-brand-light/20 to-white">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="space-y-4 rounded-3xl border border-brand-primary/15 bg-white/95 p-8">
            <p className="uppercase tracking-[0.3em] text-brand-secondary text-xs font-semibold">
              Devotee Honorific
            </p>
            <h2 className="font-display text-3xl text-brand-primary">{nicknameExplainer.title}</h2>
            <p className="text-sm leading-relaxed text-neutral-600">{nicknameExplainer.description}</p>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              {nicknameExplainer.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-brand-primary/10 bg-brand-light/40 p-4 text-sm text-neutral-700"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-neutral-700">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-brand-primary/15 bg-white/95 p-8">
            <p className="uppercase tracking-[0.3em] text-brand-secondary text-xs font-semibold">
              Daily Rhythm
            </p>
            <h2 className="font-display text-3xl text-brand-primary">Ritual & Seva Schedule</h2>
            <div className="space-y-4">
              {ritualSchedule.map((entry) => (
                <div key={entry.time} className="rounded-2xl border border-brand-primary/10 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-brand-primary">{entry.time}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                      {entry.title}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">{entry.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="festivals" className="bg-gradient-to-b from-white via-brand-light/15 to-white">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="uppercase tracking-[0.3em] text-brand-secondary text-xs font-semibold">
              Festival Calendar
            </p>
            <h2 className="font-display text-3xl text-brand-primary">Annual Utsavs & Observances</h2>
            <p className="text-sm text-neutral-600">
              Key celebrations integrate Rath Yatra processions, Janmashtami vigils, Navaratri aratis, and Bankura
              heritage days throughout the year.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {eventsContent.map((event) => (
              <div
                key={event.slug}
                className="rounded-3xl border border-brand-primary/10 bg-white/95 p-6 shadow-[0_24px_60px_-60px_rgba(27,10,44,0.35)]"
              >
                <p className="text-xs uppercase tracking-[0.26em] text-brand-secondary">
                  {event.startDate} – {event.endDate}
                </p>
                <h3 className="font-display text-xl text-brand-primary mt-2">{event.name}</h3>
                <p className="mt-3 text-sm text-neutral-600">{event.description}</p>
                <div className="mt-4 rounded-2xl bg-brand-light/40 p-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
                  Offline Utsav · Panchmura Campus
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="heritage" className="bg-gradient-to-b from-white via-brand-light/10 to-white">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="uppercase tracking-[0.3em] text-brand-secondary text-xs font-semibold">
              Living Heritage
            </p>
            <h2 className="font-display text-3xl text-brand-primary">Highlights in Practice</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {heritageHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-3xl border border-brand-primary/10 bg-white/95 p-6 shadow-[0_26px_70px_-60px_rgba(27,10,44,0.35)]"
              >
                <h3 className="font-display text-xl text-brand-primary">{highlight.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{highlight.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 rounded-3xl border border-brand-primary/15 bg-white/95 p-8 text-center">
            <p className="uppercase tracking-[0.3em] text-brand-secondary text-xs font-semibold">
              Continue Exploring
            </p>
            <h2 className="font-display text-2xl text-brand-primary">
              Plan your visit or support seva initiatives
            </h2>
            <p className="max-w-2xl text-sm text-neutral-600">{directionsCta.description}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={directionsCta.href} size="lg" variant="primary">
                {directionsCta.label}
              </Button>
              <Button href="/services/donation-and-seva" size="lg" variant="secondary">
                Support Seva Programmes
              </Button>
            </div>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
