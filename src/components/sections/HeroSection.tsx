import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Calendar, Clock, Heart, MapPin, Phone, Users } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { layoutRules, textRules, iconSizes } from "@/foundation/design-system";
import { heroContent } from "@/data/content";
import { siteConfig } from "@/config/site";
import { cfImage, imagePresets } from "@/utils/image";

const planFacts = [
  {
    icon: Clock,
    label: "Open daily",
    value: "5:00 AM - 9:00 PM"
  },
  {
    icon: MapPin,
    label: "From Bishnupur",
    value: "30 km / 45 min"
  },
  {
    icon: Users,
    label: "Anna-daan",
    value: "12:30 PM daily"
  }
] as const;

const dailyRhythm = [
  { time: "5:00 AM", label: "Mangala arati" },
  { time: "12:30 PM", label: "Free prasad seva" },
  { time: "6:30 PM", label: "Evening Tridhara arati" }
] as const;

const intentLinks = [
  { label: "Darshan", href: "/plan-your-visit" },
  { label: "Stay", href: "/guest-house" },
  { label: "Seva", href: "/services/donation-and-seva" },
  { label: "Events", href: "/events" }
] as const;

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-brand-dark text-white"
    >
      <div className="absolute inset-0">
        <Image
          src={cfImage(heroContent.backgroundImage, imagePresets.hero())}
          alt="Tridhara Milan Mandir illuminated during Durga Puja"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Main overlay for readability */}
        <div className="absolute inset-0 bg-hero-overlay" />

        {/* Horizontal gradient from left to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/60 to-brand-dark/20" />

        {/* Smooth fade-out gradient at bottom transitioning to exact light section color */}
        <div className="absolute inset-x-0 bottom-0 h-[420px] bg-gradient-to-b from-transparent via-brand-dark/30 via-brand-light/30 to-brand-light" />
      </div>

      <div
        className={clsx(
          "relative z-10 mx-auto grid min-h-[100svh] w-full max-w-7xl items-end gap-8 pb-10 pt-[calc(var(--header-height)+2rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.75fr)] lg:items-center lg:gap-12 lg:pb-16 lg:pt-[calc(var(--header-height)+3rem)]",
          layoutRules.pagePadding
        )}
      >
        <div className="flex flex-col gap-6 lg:max-w-3xl">
          <Badge
            label={heroContent.eyebrow}
            variant="hero"
            className="w-fit max-w-full"
          />
          <h1 className={clsx(textRules.heroTitle)}>{heroContent.title}</h1>
          <p className={clsx(textRules.heroSubtitle, "leading-relaxed text-white/90")}>
            {heroContent.subtitle}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              href={heroContent.ctaPrimary.href}
              variant="inverted"
              size="lg"
              icon={<ArrowRight className={iconSizes.xs} />}
            >
              {heroContent.ctaPrimary.label}
            </Button>
            <Button
              href={heroContent.ctaDonation.href}
              variant="ghost"
              size="lg"
            >
              {heroContent.ctaDonation.label}
            </Button>
            <Button
              href={heroContent.ctaSecondary.href}
              variant="outlineOnDark"
              size="lg"
              className="sm:min-w-[180px]"
            >
              {heroContent.ctaSecondary.label}
            </Button>
          </div>

          <nav aria-label="Popular visitor paths" className="flex flex-wrap gap-2 pt-2">
            {intentLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-full border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur transition-all duration-200 hover:border-brand-accent/60 hover:bg-white/[0.16] hover:text-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent motion-reduce:transition-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <aside
          aria-label="Plan a visit today"
          className="rounded-[2rem] border border-white/20 bg-brand-dark/55 p-5 shadow-[0_40px_100px_-60px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:p-6"
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-accent">
                Plan today
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white">
                Darshan, prasad, stay, or seva
              </h2>
            </div>
            <Calendar className="mt-1 h-6 w-6 flex-none text-brand-accent" aria-hidden="true" />
          </div>

          <div className="grid gap-3 py-5">
            {planFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div key={fact.label} className="flex items-center gap-3 rounded-2xl bg-white/[0.09] p-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/10 text-brand-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.18em] text-white/60">
                      {fact.label}
                    </span>
                    <span className="block text-sm font-semibold text-white">{fact.value}</span>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-white/15 pt-5">
            <p className="text-sm font-semibold text-white">Daily rhythm</p>
            <ol className="mt-4 space-y-3">
              {dailyRhythm.map((item) => (
                <li key={item.time} className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm">
                  <time className="font-semibold text-brand-accent">{item.time}</time>
                  <span className="text-white/80">{item.label}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <Button
              href={`tel:${siteConfig.contact.phone}`}
              variant="inverted"
              size="md"
              icon={<Phone className="h-4 w-4" />}
              className="w-full"
            >
              Call Mandir
            </Button>
            <Button
              href={siteConfig.map.directionsUrl}
              variant="outlineOnDark"
              size="md"
              icon={<MapPin className="h-4 w-4" />}
              className="w-full"
            >
              Directions
            </Button>
          </div>

          <p className="mt-5 flex items-center gap-2 text-xs leading-relaxed text-white/60">
            <Heart className="h-4 w-4 flex-none text-brand-accent" aria-hidden="true" />
            Entry and daily prasad are free. Donations are voluntary.
          </p>
        </aside>
      </div>
    </section>
  );
}
