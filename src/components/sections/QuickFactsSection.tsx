import { ArrowRight, Calendar, Clock, Heart, Home, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { iconSizes } from "@/foundation/design-system";

const visitPaths = [
  {
    icon: MapPin,
    title: "Day Darshan",
    audience: "Families from Bishnupur, Bankura, or Kolkata",
    detail:
      "Arrive before midday prasad, walk the shrines, then stay for the evening Tridhara arati.",
    meta: "4-6 hours",
    href: "/plan-your-visit",
    cta: "Plan the route"
  },
  {
    icon: Home,
    title: "Overnight Stay",
    audience: "Pilgrims, culture travellers, and small groups",
    detail:
      "Stay beside the mandir, wake for mangala arati, and add Panchmura terracotta workshops.",
    meta: "1-3 nights",
    href: "/guest-house",
    cta: "See guest house"
  },
  {
    icon: Heart,
    title: "Seva & Donation",
    audience: "Donors, volunteers, CSR groups, and local supporters",
    detail:
      "Support anna-daan, scholarships, health camps, temple upkeep, or join volunteer rotations.",
    meta: "Start any time",
    href: "/services/donation-and-seva",
    cta: "Join seva"
  }
] as const;

const essentials = [
  { label: "Entry", value: "Free" },
  { label: "Daily prasad", value: "2,000 meals" },
  { label: "Distance", value: "30 km from Bishnupur" },
  { label: "Access", value: "Wheelchair support" }
] as const;

const dailyMoments = [
  { time: "5:00 AM", title: "Mangala Arati", detail: "Quiet dawn darshan before the village wakes." },
  { time: "12:30 PM", title: "Anna-Daan", detail: "Free midday prasad for visitors and devotees." },
  { time: "6:30 PM", title: "Tridhara Arati", detail: "Integrated Shaiva, Vaishnava, and Shakta worship." }
] as const;

export function QuickFactsSection() {
  return (
    <SectionShell variant="transparent" className="bg-brand-light">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
        <SectionHeader
          eyebrow="Choose Your Visit"
          title="One Mandir, Three Clear Ways to Experience It"
          description="Choose the visit that matches your day: come for darshan, stay overnight, or support the seva work behind the daily worship."
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {essentials.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-brand-primary/10 bg-white/75 p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-secondary">
                {item.label}
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-brand-primary">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {visitPaths.map((path) => {
          const Icon = path.icon;
          return (
            <article
              key={path.title}
              className="group flex h-full flex-col rounded-[2rem] border border-brand-primary/10 bg-white p-6 shadow-[0_28px_70px_-58px_rgba(27,10,44,0.42)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/35 hover:shadow-[0_34px_90px_-58px_rgba(27,10,44,0.48)] motion-reduce:transform-none motion-reduce:transition-none"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/15 text-brand-secondary">
                  <Icon className={iconSizes.md} aria-hidden="true" />
                </span>
                <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand-primary">
                  {path.meta}
                </span>
              </div>

              <div className="mt-6 flex flex-1 flex-col gap-3">
                <h3 className="font-display text-2xl font-semibold text-brand-primary">
                  {path.title}
                </h3>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-secondary">
                  {path.audience}
                </p>
                <p className="text-base leading-relaxed text-neutral-700">{path.detail}</p>
              </div>

              <Button
                href={path.href}
                variant="secondary"
                size="md"
                icon={<ArrowRight className="h-4 w-4" />}
                className="mt-6 w-fit"
              >
                {path.cta}
              </Button>
            </article>
          );
        })}
      </div>

      <div className="grid gap-8 rounded-[2rem] bg-brand-primary p-6 text-white sm:p-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-accent">
            Rhythm of the day
          </p>
          <h3 className="mt-3 font-display text-3xl font-semibold">
            Build the visit around worship, prasad, and rest.
          </h3>
        </div>
        <ol className="grid gap-4 md:grid-cols-3">
          {dailyMoments.map((moment) => (
            <li key={moment.time} className="border-t border-white/20 pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
              <time className="flex items-center gap-2 text-sm font-semibold text-brand-accent">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {moment.time}
              </time>
              <p className="mt-3 font-semibold">{moment.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{moment.detail}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col items-start gap-4 border-t border-brand-primary/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm text-neutral-700">
          <Users className="h-5 w-5 text-brand-secondary" aria-hidden="true" />
          <span>Group visits and volunteer teams should contact the mandir before arrival.</span>
        </div>
        <Button
          href="/events"
          variant="primary"
          size="md"
          icon={<Calendar className="h-4 w-4" />}
        >
          See 2026 Festivals
        </Button>
      </div>
    </SectionShell>
  );
}
