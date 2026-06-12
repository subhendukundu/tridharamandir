"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ChevronDown, Menu, Search, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { iconSizes, layoutRules } from "@/foundation/design-system";
import { navLinks, type NavLinkItem } from "@/data/content";
import { siteConfig } from "@/config/site";
import { cfImage, imagePresets } from "@/utils/image";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  const toggleMobileItem = (label: string) => {
    setExpandedMobileItem((prev) => (prev === label ? null : label));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setExpandedMobileItem(null);
  };

  const isLinkActive = (href: string | undefined): boolean => {
    if (!href || href.startsWith("/#")) return false;
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return pathname === href;
  };

  const isParentActive = (item: NavLinkItem): boolean => {
    if (isLinkActive(item.href)) return true;
    return item.children?.some((child) => isLinkActive(child.href)) ?? false;
  };

  const renderDesktopNavItem = (item: NavLinkItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const fallbackHref = item.href ?? item.children?.[0]?.href ?? "#";
    const isActive = isParentActive(item);

    if (!hasChildren) {
      return (
        <Link
          key={item.label}
          href={fallbackHref}
          className={clsx(
            "inline-flex min-h-10 items-center border-b-2 px-1 text-[0.84rem] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent motion-reduce:transition-none",
            isActive
              ? "border-brand-secondary text-brand-secondary"
              : "border-transparent text-brand-primary hover:border-brand-accent hover:text-brand-secondary"
          )}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <div key={item.label} className="group relative">
        <Link
          href={fallbackHref}
          className={clsx(
            "inline-flex min-h-10 items-center gap-1.5 border-b-2 px-1 text-[0.84rem] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent motion-reduce:transition-none",
            isActive
              ? "border-brand-secondary text-brand-secondary"
              : "border-transparent text-brand-primary hover:border-brand-accent hover:text-brand-secondary"
          )}
        >
          {item.label}
          <ChevronDown
            className={clsx(iconSizes.xs, "transition-transform duration-200 group-hover:rotate-180 motion-reduce:transition-none")}
            aria-hidden="true"
          />
        </Link>
        <div className="invisible absolute left-0 top-full z-50 min-w-[280px] pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
          <div className="overflow-hidden rounded-lg border border-brand-accent/25 bg-neutral-50 shadow-card">
            <div className="border-b border-brand-accent/20 px-4 py-3">
              <span className="block text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">
                {item.label}
              </span>
            </div>
            <div className="flex flex-col">
              {item.children?.map((child) => {
                const isChildActive = isLinkActive(child.href);
                return (
                  <Link
                    key={child.label}
                    href={child.href}
                    className={clsx(
                      "border-b border-brand-accent/15 px-4 py-3 text-sm font-semibold transition-colors duration-200 last:border-b-0 hover:bg-brand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-accent motion-reduce:transition-none",
                      isChildActive ? "bg-brand-light text-brand-secondary" : "text-brand-primary"
                    )}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-accent/20 bg-neutral-50/95 shadow-sm backdrop-blur">
        <div
          className={clsx(
            layoutRules.pagePadding,
            "relative mx-auto flex h-[var(--header-height)] w-full max-w-[1160px] items-center justify-between gap-6"
          )}
        >
          <Link
            href="/#home"
            className="flex min-w-0 flex-1 items-center gap-3 pr-14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent xl:flex-none xl:pr-0"
          >
            <div className="relative h-8 w-8 flex-none overflow-hidden rounded-full border border-brand-accent/30 bg-white">
              <Image
                src={cfImage("/images/logo.png", imagePresets.thumbnail(32))}
                alt="Tridhara Milan Mandir logo"
                width={32}
                height={32}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <span className="min-w-0 truncate font-display text-base font-bold text-brand-primary sm:max-w-[230px] xl:max-w-none">
              {siteConfig.name}
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-5 xl:flex">
            {navLinks.map((item) => renderDesktopNavItem(item))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex xl:flex-shrink-0">
            <Link
              href="/search"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-brand-accent/35 bg-white text-brand-primary transition-colors duration-200 hover:bg-brand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent motion-reduce:transition-none"
              aria-label="Search Tridhara Milan Mandir website"
            >
              <Search className={iconSizes.sm} aria-hidden="true" />
            </Link>
            <Button variant="primary" size="md" href="/plan-your-visit">
              Plan Visit
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="absolute right-6 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-brand-accent/35 bg-white text-brand-primary transition-colors duration-200 hover:bg-brand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent sm:right-8 xl:hidden motion-reduce:transition-none"
            aria-label="Open navigation"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </header>

      {mobileMenuOpen ? (
        <>
          <div
            className="fixed inset-0 z-[60] bg-brand-dark/35 xl:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-[70] flex flex-col bg-neutral-50 text-brand-primary xl:hidden">
            <div className={clsx(layoutRules.pagePadding, "relative mx-auto flex h-[var(--header-height)] w-full max-w-[1160px] items-center justify-between border-b border-brand-accent/20")}>
              <Link href="/#home" onClick={closeMobileMenu} className="flex min-w-0 flex-1 items-center gap-3 pr-14">
                <div className="relative h-8 w-8 flex-none overflow-hidden rounded-full border border-brand-accent/30 bg-white">
                  <Image
                    src={cfImage("/images/logo.png", imagePresets.thumbnail(32))}
                    alt="Tridhara Milan Mandir logo"
                    width={32}
                    height={32}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
                <span className="min-w-0 truncate font-display text-lg font-bold text-brand-primary">
                  {siteConfig.name}
                </span>
              </Link>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="absolute right-6 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-brand-accent/35 bg-white text-brand-primary transition-colors duration-200 hover:bg-brand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent sm:right-8 motion-reduce:transition-none"
                aria-label="Close navigation"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className={clsx(layoutRules.pagePadding, "mx-auto w-full max-w-[1160px] flex-1 overflow-y-auto py-6 pb-8")}>
              <nav className="flex flex-col overflow-hidden rounded-lg border border-brand-accent/25">
                {navLinks.map((item) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const fallbackHref = item.href ?? item.children?.[0]?.href ?? "#";
                  const isExpanded = expandedMobileItem === item.label;
                  const isActive = isParentActive(item);

                  return (
                    <div key={item.label} className="border-b border-brand-accent/20 last:border-b-0">
                      {hasChildren ? (
                        <button
                          type="button"
                          onClick={() => toggleMobileItem(item.label)}
                          aria-label={`Toggle ${item.label} sub navigation`}
                          aria-expanded={isExpanded}
                          className={clsx(
                            "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold transition-colors duration-200 hover:bg-brand-light",
                            isActive ? "text-brand-secondary" : "text-brand-primary"
                          )}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={clsx(iconSizes.sm, "transition-transform duration-200 motion-reduce:transition-none", isExpanded && "rotate-180")}
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        <Link
                          href={fallbackHref}
                          onClick={closeMobileMenu}
                          className={clsx(
                            "flex px-5 py-4 text-base font-bold transition-colors duration-200 hover:bg-brand-light",
                            isActive ? "text-brand-secondary" : "text-brand-primary"
                          )}
                        >
                          {item.label}
                        </Link>
                      )}

                      {hasChildren && isExpanded ? (
                        <div className="border-t border-brand-accent/20 bg-brand-light/60">
                          {item.children?.map((child) => {
                            const isChildActive = isLinkActive(child.href);
                            return (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={closeMobileMenu}
                                className={clsx(
                                  "block border-b border-brand-accent/15 px-8 py-3 text-sm font-semibold transition-colors duration-200 last:border-b-0 hover:bg-white",
                                  isChildActive ? "text-brand-secondary" : "text-neutral-800"
                                )}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </nav>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Link
                  href="/search"
                  onClick={closeMobileMenu}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-brand-accent/35 bg-white px-4 text-sm font-bold text-brand-primary transition-colors duration-200 hover:bg-brand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                >
                  <Search className={iconSizes.sm} aria-hidden="true" />
                  Search
                </Link>
                <Button variant="primary" size="md" href="/plan-your-visit" className="w-full">
                  Plan Visit
                </Button>
                <Button variant="secondary" size="md" href="/services/donation-and-seva" className="w-full">
                  Support Seva
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
