import Image from "next/image";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { layoutRules, textRules, iconSizes } from "@/foundation/design-system";
import { heroContent } from "@/data/content";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[85vh] items-center overflow-hidden bg-brand-dark text-white md:min-h-[90vh]"
    >
      <div className="absolute inset-0">
        <Image
          src={heroContent.backgroundImage}
          alt="Tridhara Milan Mandir illuminated during Durga Puja"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Main overlay for readability */}
        <div className="absolute inset-0 bg-hero-overlay" />

        {/* Horizontal gradient from left to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/55 to-brand-dark/15" />

        {/* Smooth fade-out gradient at bottom transitioning to exact light section color */}
        <div className="absolute inset-x-0 bottom-0 h-[520px] bg-gradient-to-b from-transparent via-brand-dark/40 via-brand-dark/25 via-brand-dark/10 via-brand-light/40 via-brand-light/80 to-brand-light" />
      </div>

      <div
        className={clsx(
          "relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center gap-8 py-12 md:gap-10 md:py-16",
          layoutRules.pagePadding
        )}
      >
        <div className="flex flex-col gap-6 lg:max-w-3xl">
          <h1 className={clsx(textRules.heroTitle)}>{heroContent.title}</h1>
          <p className={clsx(textRules.heroSubtitle)}>{heroContent.subtitle}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              href={heroContent.ctaPrimary.href}
              variant="ghost"
              size="lg"
              icon={<ArrowRight className={iconSizes.xs} />}
            >
              {heroContent.ctaPrimary.label}
            </Button>
            <Button
              href={heroContent.ctaDonation.href}
              variant="inverted"
              size="lg"
              className="sm:order-first"
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
        </div>

        <div className="mt-4 w-full sm:mt-8">
          <div className="flex flex-1 flex-col gap-6 rounded-3xl border border-white/20 bg-white/55 p-6 shadow-[0_40px_90px_-60px_rgba(27,10,44,0.5)] backdrop-blur-md sm:flex-row sm:flex-wrap sm:items-center sm:gap-8 sm:p-8">
            <div className="flex flex-col gap-2 flex-1 sm:min-w-[280px]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-secondary">
                Consecrated July 2022
              </p>
              <p className="text-sm text-brand-primary">
                Our sampradayas unite at Panchmura's Tridhara Milan Mandir for year-round seva.
              </p>
            </div>
            <div className="hidden h-10 w-px bg-brand-primary/15 sm:block" />
            <div className="flex flex-col gap-2 flex-1 sm:min-w-[280px]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-secondary">
                Daily Annadan Seva
              </p>
              <p className="text-sm text-brand-primary">
                Midday bhog nourishes 2,000 devotees through the expanded annadan kitchen.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
