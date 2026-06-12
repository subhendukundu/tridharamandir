import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

import { TextField } from "@/components/forms/TextField";
import { Button } from "@/components/ui/Button";
import { iconSizes, layoutRules, linkRules } from "@/foundation/design-system";
import { footerContent, napContent } from "@/data/content";
import { siteConfig } from "@/config/site";

const iconMap = {
  Facebook,
  Twitter,
  Instagram,
  YouTube: Youtube
} as const;

const footerColumns = [
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about-us" },
      { label: "History", href: "/history" },
      { label: "Why Visit", href: "/why-visit" }
    ]
  },
  {
    title: "Plan Visit",
    links: [
      { label: "Planning Guide", href: "/plan-your-visit" },
      { label: "Visiting from Kolkata", href: "/guides/visit-from-kolkata" },
      { label: "Bankura Temple Tour", href: "/guides/bankura-temple-tour-itinerary" },
      { label: "Photo Gallery", href: "/gallery" },
      { label: "Guest House", href: "/guest-house" },
      { label: "Guest Experiences", href: "/guides/guest-house-experiences" }
    ]
  },
  {
    title: "Services",
    links: [
      { label: "All Services", href: "/services" },
      ...siteConfig.services.slice(0, 4).map((service) => ({
        label: service.name,
        href: `/services/${service.slug}`
      }))
    ]
  },
  {
    title: "Explore",
    links: [
      { label: "Community", href: "/#community" },
      { label: "FAQs", href: "/faqs" },
      { label: "Events", href: "/events" },
      { label: "Janmashtami", href: "/festivals/janmashtami" },
      { label: "Rath Yatra", href: "/festivals/rath-yatra" },
      { label: "Contact Us", href: "/#visit" },
      { label: "Search", href: "/search" }
    ]
  }
] as const;

export function Footer() {
  const [weekdayHours, weekendHours] = napContent.hours;

  return (
    <footer id="footer-contact" className="border-t border-brand-accent/20 bg-brand-dark text-white">
      <div className={clsx(layoutRules.container, layoutRules.pagePadding, "py-14")}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="flex flex-col gap-7">
            <Link
              href="/#home"
              className="flex max-w-max items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
            >
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-brand-accent/35 bg-white">
                <Image
                  src="/images/logo.png"
                  alt="Tridhara Milan Mandir logo"
                  width={44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-xl font-bold text-white">
                  {footerContent.brand}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
                  {footerContent.tagline}
                </span>
              </div>
            </Link>

            <p className="max-w-2xl text-base leading-relaxed text-white/75">
              {footerContent.summary}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button href={footerContent.visitLink.href} variant="outlineOnDark" size="lg">
                {footerContent.visitLink.label}
              </Button>
              <Button href={footerContent.donateCta.href} variant="inverted" size="lg">
                {footerContent.donateCta.label}
              </Button>
            </div>

            <form className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]" aria-label="Newsletter signup">
              <TextField
                id="footer-email"
                type="email"
                placeholder={footerContent.newsletterPlaceholder}
                tone="dark"
                required
                aria-label="Email address"
              />
              <Button variant="outlineOnDark" type="submit">
                {footerContent.newsletterCta}
              </Button>
            </form>

            <div className="flex flex-wrap items-center gap-3">
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
                    {Icon ? <Icon className={iconSizes.sm} aria-hidden="true" /> : null}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-lg border border-white/20 bg-white/[0.05] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
                Essential details
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-white">
                {footerContent.brand}
              </h3>
              <div className="mt-5 grid gap-5 text-sm leading-relaxed text-white/75">
                <div>
                  <h4 className="font-bold text-white">Address</h4>
                  <address className="mt-2 not-italic">
                    {napContent.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
                <div>
                  <h4 className="font-bold text-white">Contact</h4>
                  <a className={clsx(linkRules.base, linkRules.onDark, "mt-2 block")} href={`tel:${napContent.phone}`}>
                    {napContent.phone}
                  </a>
                  <a className={clsx(linkRules.base, linkRules.onDark, "mt-1 block")} href={`mailto:${napContent.email}`}>
                    {napContent.email}
                  </a>
                </div>
                {weekdayHours ? (
                  <div>
                    <h4 className="font-bold text-white">Darshan hours</h4>
                    <p className="mt-2">
                      {weekdayHours.dayOfWeek.join(", ")} · {weekdayHours.opens} - {weekdayHours.closes}
                    </p>
                    {weekendHours ? (
                      <p className="mt-1">
                        {weekendHours.dayOfWeek.join(", ")} · {weekendHours.opens} - {weekendHours.closes}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/20 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
                {column.title}
              </h3>
              <nav className="mt-4 flex flex-col gap-2.5 text-sm">
                {column.links.map((link) => (
                  <Link key={link.href} href={link.href} className={clsx(linkRules.base, linkRules.footerNav)}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/20 px-6 py-5 text-center text-sm text-white/55">
        {footerContent.legal}
      </div>
    </footer>
  );
}
