"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { ChevronDown, Search, X, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { layoutRules, iconSizes } from "@/foundation/design-system";
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

  // Check if a link is active based on current pathname
  const isLinkActive = (href: string | undefined): boolean => {
    if (!href) return false;

    // Hash anchors are never shown as "active" (they're just scroll targets)
    if (href.startsWith('/#')) {
      return false;
    }

    // Exact match for root homepage
    if (href === '/' && pathname === '/') return true;

    // Nested route match (e.g., /gallery active for /gallery/architecture)
    if (href !== '/' && pathname.startsWith(href)) return true;

    return pathname === href;
  };

  // Check if any child link is active
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
            "inline-flex items-center text-[0.95rem] font-semibold transition-all duration-200 hover:text-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent rounded-lg px-1 motion-reduce:transition-none",
            isActive
              ? "text-brand-accent relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-brand-accent after:rounded-full"
              : "text-white"
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
            "inline-flex items-center gap-1.5 text-[0.95rem] font-semibold transition-all duration-200 hover:text-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent whitespace-nowrap rounded-lg px-1 motion-reduce:transition-none",
            isActive
              ? "text-brand-accent relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-brand-accent after:rounded-full"
              : "text-white"
          )}
        >
          {item.label}
          <ChevronDown className={clsx(iconSizes.xs, "transition-transform duration-200 group-hover:rotate-180 motion-reduce:transition-none")} />
        </Link>
        <div className="invisible absolute left-0 top-full pt-2 min-w-[280px] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 z-50">
          <div className="rounded-2xl border border-brand-primary/20 bg-white shadow-[0_20px_60px_-20px_rgba(27,10,44,0.4)] backdrop-blur-sm">
            <div className="p-2">
              <div className="px-3 py-2 border-b border-brand-primary/10">
                <span className="block text-xs font-bold uppercase tracking-[0.24em] text-brand-accent">
                  {item.label}
                </span>
              </div>
              <div className="flex flex-col gap-0.5 mt-2">
                {item.children?.map((child) => {
                  const isChildActive = isLinkActive(child.href);
                  return (
                    <Link
                      key={child.label}
                      href={child.href}
                      className={clsx(
                        "group/item rounded-xl px-4 py-2.5 text-[0.94rem] font-medium transition-all duration-200 hover:bg-brand-primary/10 hover:text-brand-dark hover:pl-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transition-none",
                        isChildActive
                          ? "bg-brand-primary/10 text-brand-dark pl-5"
                          : "text-brand-dark/85"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span className={clsx(
                          "h-1.5 w-1.5 rounded-full bg-brand-accent transition-opacity duration-200",
                          isChildActive ? "opacity-100" : "opacity-0 group-hover/item:opacity-100"
                        )} />
                        {child.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-dark/90 backdrop-blur transition-all duration-300">
        <div
          className={clsx(
            layoutRules.pagePadding,
            "flex h-[var(--header-height)] w-full items-center justify-between gap-6 py-3"
          )}
        >
          <Link href="/#home" className="flex items-center gap-3 group/logo rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent transition-colors motion-reduce:transition-none">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl">
              <Image
                src={cfImage("/images/logo.png", imagePresets.thumbnail(40))}
                alt="Tridhara Milan Mandir logo"
                width={40}
                height={40}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <span className="hidden sm:inline-block font-display text-xl font-semibold tracking-wide text-white whitespace-nowrap drop-shadow group-hover/logo:text-brand-accent transition-colors motion-reduce:transition-none">
              {siteConfig.name}
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 xl:flex">
            {navLinks.map((item) => renderDesktopNavItem(item))}
          </nav>

          <div className="hidden items-center gap-4 xl:flex xl:flex-shrink-0">
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-2.5 text-sm text-white transition-all duration-200 hover:bg-white/15 hover:text-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 motion-reduce:transition-none"
              aria-label="Search Tridhara Milan Mandir website"
            >
              <Search className={iconSizes.sm} />
            </Link>
            <Button
              variant="inverted"
              size="md"
              href="/#visit"
              className="shadow-[0_10px_30px_-20px_rgba(245,215,110,0.8)]"
            >
              Support
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="xl:hidden flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white transition-all duration-200 hover:bg-white/20 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent motion-reduce:transition-none"
            aria-label="Open navigation"
          >
            <span className="sr-only">Open navigation</span>
            <Menu className="h-6 w-6 stroke-[2]" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[60] xl:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-[70] xl:hidden flex flex-col bg-brand-dark text-white">
            <div className={clsx(layoutRules.pagePadding, "flex h-[var(--header-height)] items-center justify-between border-b border-white/10")}>
              <Link href="/#home" onClick={closeMobileMenu} className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                  <Image
                    src={cfImage("/images/logo.png", imagePresets.thumbnail(40))}
                    alt="Tridhara Milan Mandir logo"
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
                <span className="hidden sm:inline-block font-display text-xl font-semibold tracking-wide text-white whitespace-nowrap drop-shadow">
                  {siteConfig.name}
                </span>
              </Link>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white transition-all duration-200 hover:bg-white/20 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent motion-reduce:transition-none"
                aria-label="Close navigation"
              >
                <span className="sr-only">Close navigation</span>
                <X className="h-6 w-6 stroke-[2]" />
              </button>
            </div>
            <div className={clsx(layoutRules.pagePadding, "flex-1 overflow-y-auto py-6 pb-8")}>
              <nav className="flex flex-col gap-3">
                {navLinks.map((item) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const fallbackHref = item.href ?? item.children?.[0]?.href ?? "#";
                  const isExpanded = expandedMobileItem === item.label;
                  const isActive = isParentActive(item);

                  return (
                    <div key={item.label} className="flex flex-col gap-2">
                      {hasChildren ? (
                        <button
                          type="button"
                          onClick={() => toggleMobileItem(item.label)}
                          aria-label={`Toggle ${item.label} sub navigation`}
                          aria-expanded={isExpanded}
                          className={clsx(
                            "flex items-center justify-between gap-4 rounded-2xl px-5 py-4 border transition-all duration-200 w-full text-left",
                            isActive
                              ? "bg-brand-primary/15 border-brand-accent/40"
                              : "bg-white/8 border-white/15 hover:bg-white/10 hover:border-white/20"
                          )}
                        >
                          <span className={clsx(
                            "flex-1 text-base font-bold",
                            isActive ? "text-brand-accent" : "text-white"
                          )}>
                            {item.label}
                          </span>
                          <ChevronDown className={clsx(
                            iconSizes.sm,
                            "transition-transform duration-200 motion-reduce:transition-none text-brand-accent",
                            isExpanded && "rotate-180"
                          )} />
                        </button>
                      ) : (
                        <Link
                          href={fallbackHref}
                          onClick={closeMobileMenu}
                          className={clsx(
                            "flex items-center justify-between gap-4 rounded-2xl px-5 py-4 border transition-all duration-200",
                            isActive
                              ? "bg-brand-primary/15 border-brand-accent/40"
                              : "bg-white/6 border-white/12 hover:bg-white/10 hover:border-white/20"
                          )}
                        >
                          <span className={clsx(
                            "flex-1 text-base font-bold transition-colors motion-reduce:transition-none",
                            isActive ? "text-brand-accent" : "text-white hover:text-brand-accent"
                          )}>
                            {item.label}
                          </span>
                        </Link>
                      )}
                      {hasChildren && isExpanded && (
                        <div className="flex flex-col gap-2 pl-3 animate-in slide-in-from-top-2 duration-200">
                          {item.children?.map((child) => {
                            const isChildActive = isLinkActive(child.href);
                            return (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={closeMobileMenu}
                                className={clsx(
                                  "group rounded-xl border px-5 py-3 text-[0.93rem] font-medium transition-all duration-200 hover:bg-brand-primary/15 hover:text-brand-accent hover:border-brand-accent/30 hover:pl-6 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent motion-reduce:transition-none",
                                  isChildActive
                                    ? "bg-brand-primary/15 border-brand-accent/30 text-brand-accent pl-6"
                                    : "bg-white/5 border-white/12 text-white"
                                )}
                              >
                                <span className="flex items-center gap-2.5">
                                  <span className={clsx(
                                    "h-1.5 w-1.5 rounded-full bg-brand-accent transition-opacity duration-200",
                                    isChildActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                  )} />
                                  {child.label}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="mt-6 pt-6 border-t border-white/20 flex flex-col gap-4">
                  <Link
                    href="/search"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center gap-3 rounded-2xl border-2 border-white/25 bg-white/8 px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white/15 hover:border-white/40 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
                  >
                    <Search className={iconSizes.md} />
                    <span>Search Temple</span>
                  </Link>
                  <Button variant="inverted" size="lg" href="/#visit" className="w-full text-base font-bold py-4 shadow-lg hover:shadow-xl">
                    Support Our Mission
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
