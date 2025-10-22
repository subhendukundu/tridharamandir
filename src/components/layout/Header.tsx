"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ChevronDown, Search } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { layoutRules, linkRules, iconSizes } from "@/foundation/design-system";
import { navLinks, type NavLinkItem } from "@/data/content";
import { siteConfig } from "@/config/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setExpandedMobileItem(null);
  }, [pathname]);

  const renderDesktopNavItem = (item: NavLinkItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const fallbackHref = item.href ?? item.children?.[0]?.href ?? "#";

    if (!hasChildren) {
      return (
        <Link
          key={item.label}
          href={fallbackHref}
          className="inline-flex items-center text-[0.95rem] font-semibold text-white transition-all duration-200 hover:text-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent rounded-lg px-1 motion-reduce:transition-none"
        >
          {item.label}
        </Link>
      );
    }

    return (
      <div key={item.label} className="relative group">
        <Link
          href={fallbackHref}
          className="inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-white transition-all duration-200 hover:text-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent whitespace-nowrap rounded-lg px-1 motion-reduce:transition-none"
          aria-haspopup="true"
        >
          {item.label}
          <ChevronDown className={clsx(iconSizes.xs, "transition-transform duration-200 group-hover:rotate-180 motion-reduce:transition-none")} />
        </Link>
        <div className="pointer-events-none absolute left-0 top-full pt-2 min-w-[280px] opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 z-50">
          <div className="rounded-2xl border border-brand-primary/20 bg-white shadow-[0_20px_60px_-20px_rgba(27,10,44,0.4)] backdrop-blur-sm">
            <div className="p-2">
              <div className="px-3 py-2 border-b border-brand-primary/10">
                <span className="block text-xs font-bold uppercase tracking-[0.24em] text-brand-accent">
                  {item.label}
                </span>
              </div>
              <div className="flex flex-col gap-0.5 mt-2">
                {item.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="group/item rounded-xl px-4 py-2.5 text-[0.94rem] font-medium text-brand-dark/85 transition-all duration-200 hover:bg-brand-primary/10 hover:text-brand-dark hover:pl-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transition-none"
                  >
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-accent opacity-0 transition-opacity duration-200 group-hover/item:opacity-100" />
                      {child.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const toggleMobileItem = (label: string) => {
    setExpandedMobileItem((prev) => (prev === label ? null : label));
  };

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-brand-dark/90 backdrop-blur" : "bg-transparent"
      )}
    >
      <div
        className={clsx(
          layoutRules.container,
          layoutRules.pagePadding,
          "flex h-[var(--header-height)] items-center justify-between gap-6 py-3"
        )}
      >
        <Link href="/#home" className="flex items-center gap-3 group/logo rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent transition-colors motion-reduce:transition-none">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl">
            <Image
              src="/images/logo.png"
              alt="Tridhara Milan Mandir logo"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <span className="font-display text-xl font-semibold tracking-wide text-white whitespace-nowrap drop-shadow group-hover/logo:text-brand-accent transition-colors motion-reduce:transition-none">
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
          className="xl:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">{open ? "Close" : "Open"} navigation</span>
          <div className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl bg-white/10 border border-white/20 transition-all duration-200 hover:bg-white/20 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent motion-reduce:transition-none">
            <span className={clsx("h-0.5 w-5 rounded-full bg-white transition-transform duration-200", open && "rotate-45 translate-y-2")} />
            <span className={clsx("h-0.5 w-5 rounded-full bg-white transition-opacity duration-200", open && "opacity-0")} />
            <span className={clsx("h-0.5 w-5 rounded-full bg-white transition-transform duration-200", open && "-rotate-45 -translate-y-2")} />
          </div>
        </button>
      </div>

      <div
        className={clsx(
          "xl:hidden transition-all duration-300 overflow-y-auto border-t border-white/10",
          open ? "max-h-[85vh] bg-brand-dark shadow-2xl" : "pointer-events-none max-h-0 border-transparent"
        )}
      >
        <div className={clsx(layoutRules.pagePadding, "flex flex-col gap-3 py-6 pb-8")}>
          {navLinks.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedMobileItem === item.label;
            const fallbackHref = item.href ?? item.children?.[0]?.href ?? "#";

            return (
              <div key={item.label} className="flex flex-col gap-2">
                <div className={clsx(
                  "flex items-center justify-between gap-4 rounded-2xl px-5 py-4 border transition-all duration-200",
                  hasChildren
                    ? "bg-white/8 border-white/15 hover:bg-white/12 hover:border-white/25"
                    : "bg-white/6 border-white/12 hover:bg-white/10 hover:border-white/20"
                )}>
                  <Link
                    href={fallbackHref}
                    onClick={() => {
                      setOpen(false);
                      setExpandedMobileItem(null);
                    }}
                    className="flex-1 text-base font-bold text-white hover:text-brand-accent transition-colors motion-reduce:transition-none"
                  >
                    {item.label}
                  </Link>
                  {hasChildren ? (
                    <button
                      type="button"
                      aria-label={`Toggle ${item.label} sub navigation`}
                      aria-expanded={isExpanded}
                      className="flex items-center justify-center rounded-full bg-white/15 p-2.5 text-white transition-all duration-200 hover:bg-brand-accent hover:text-brand-dark hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent motion-reduce:transition-none motion-reduce:hover:scale-100"
                      onClick={() => toggleMobileItem(item.label)}
                    >
                      <ChevronDown
                        className={clsx(iconSizes.sm, "transition-transform duration-300 motion-reduce:transition-none", {
                          "rotate-180": isExpanded
                        })}
                      />
                    </button>
                  ) : null}
                </div>
                {hasChildren && isExpanded ? (
                  <div className="flex flex-col gap-2 pl-3 animate-in slide-in-from-top-2 duration-200">
                    {item.children?.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => {
                          setOpen(false);
                          setExpandedMobileItem(null);
                        }}
                        className="group rounded-xl border border-white/12 bg-white/5 px-5 py-3 text-[0.93rem] font-medium text-white transition-all duration-200 hover:bg-brand-primary/15 hover:text-brand-accent hover:border-brand-accent/30 hover:pl-6 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent motion-reduce:transition-none"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                          {child.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}

          <div className="mt-6 pt-6 border-t border-white/20 flex flex-col gap-4">
            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-3 rounded-2xl border-2 border-white/25 bg-white/8 px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white/15 hover:border-white/40 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
            >
              <Search className={iconSizes.md} />
              <span>Search Temple</span>
            </Link>
            <Button variant="inverted" size="lg" href="/#visit" className="w-full text-base font-bold py-4 shadow-lg hover:shadow-xl">
              Support Our Mission
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
