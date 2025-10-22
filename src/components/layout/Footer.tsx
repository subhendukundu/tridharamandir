import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

import { TextField } from "@/components/forms/TextField";
import { Button } from "@/components/ui/Button";
import { layoutRules, linkRules, iconSizes } from "@/foundation/design-system";
import { footerContent, napContent } from "@/data/content";

const iconMap = {
  Facebook,
  Twitter,
  Instagram,
  YouTube: Youtube
} as const;

export function Footer() {
  const [weekdayHours, weekendHours] = napContent.hours;

  return (
    <footer id="footer-contact" className="bg-brand-dark text-white">
      <div className={`${layoutRules.container} ${layoutRules.pagePadding} py-16`}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
          <div className="flex flex-col gap-6">
            <Link href="/#home" className="flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent transition-colors motion-reduce:transition-none">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/10">
                <Image
                  src="/images/logo.png"
                  alt="Tridhara Milan Mandir logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-xl font-semibold text-white">
                  {footerContent.brand}
                </span>
                <span className="text-sm uppercase tracking-[0.18em] text-brand-accent">
                  {footerContent.tagline}
                </span>
              </div>
            </Link>

            <p className="max-w-2xl text-sm text-white/75">{footerContent.summary}</p>

            <div className="flex flex-wrap gap-3">
              <Button
                href={footerContent.donateCta.href}
                variant="inverted"
                size="lg"
                className="w-fit"
              >
                {footerContent.donateCta.label}
              </Button>
              <Button
                href={footerContent.visitLink.href}
                variant="ghost"
                size="lg"
                className="border border-white/20 text-white hover:bg-white/10"
              >
                {footerContent.visitLink.label}
              </Button>
            </div>

            <form className="flex flex-col gap-4 sm:flex-row" aria-label="Newsletter signup">
              <TextField
                id="footer-email"
                type="email"
                placeholder={footerContent.newsletterPlaceholder}
                tone="dark"
                required
                className="sm:w-80"
                aria-label="Email address"
              />
              <Button variant="inverted" type="submit">
                {footerContent.newsletterCta}
              </Button>
            </form>

            <div className="flex flex-wrap items-center gap-4">
              {footerContent.socials.map((social) => {
                const Icon = iconMap[social.label as keyof typeof iconMap];
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={linkRules.social}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Icon ? <Icon className={iconSizes.sm} /> : null}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-[0.95rem] leading-relaxed text-white/95">
            <div className="space-y-2">
              <p className="uppercase tracking-[0.24em] text-brand-accent">Essential details</p>
              <h3 className="font-display text-2xl text-white">{footerContent.brand}</h3>
              <p className="max-w-sm text-white/75">
                Core contact references for Tridhara Milan Mandir. Visit the full guide for
                directions, visitor etiquette, and accessibility.
              </p>
            </div>

            <div className="space-y-5 leading-[1.8]">
              <div>
                <h4 className="font-semibold text-white">Address</h4>
                <address className="not-italic text-white/75 space-y-1.5">
                  {napContent.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-semibold text-white">Contact</h4>
                <a className={clsx(linkRules.base, linkRules.onDark)} href={`tel:${napContent.phone}`}>
                  {napContent.phone}
                </a>
                <a className={clsx(linkRules.base, linkRules.onDark)} href={`mailto:${napContent.email}`}>
                  {napContent.email}
                </a>
              </div>
              {weekdayHours ? (
                <div>
                  <h4 className="font-semibold text-white">Darshan hours</h4>
                  <p className="mt-1">
                    {weekdayHours.dayOfWeek.join(", ")} · {weekdayHours.opens} – {weekdayHours.closes}
                  </p>
                  {weekendHours ? (
                    <p className="mt-1">
                      {weekendHours.dayOfWeek.join(", ")} · {weekendHours.opens} –{" "}
                      {weekendHours.closes}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div>
              <Button
                href={footerContent.visitLink.href}
                variant="secondary"
                size="md"
                className="w-fit border-brand-primary/25"
              >
                {footerContent.visitLink.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-white/60">
        {footerContent.legal}
      </div>
    </footer>
  );
}
