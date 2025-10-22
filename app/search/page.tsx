import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { TempleGeoJsonLd } from "@/components/seo/TempleGeoJsonLd";
import { SectionShell } from "@/components/ui/SectionShell";
import { Button } from "@/components/ui/Button";
import { layoutRules } from "@/foundation/design-system";
import { searchSite } from "@/data/search";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Search | ${siteConfig.name}`,
  description: "Search Tridhara Milan Mandir content including rituals, services, events, and visitor guidance."
};

type SearchPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const getQuery = (raw: string | string[] | undefined) => {
  if (Array.isArray(raw)) {
    return raw[0] ?? "";
  }
  return raw ?? "";
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = getQuery(searchParams?.q).trim();
  const results = searchSite(query);
  const hasQuery = query.length > 0;

  return (
    <main>
      <TempleGeoJsonLd pageUrl="/search" includeOpeningHours={false} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Search", item: "/search" }
        ]}
      />
      <section className="bg-brand-dark py-20 text-white">
        <div className={`${layoutRules.container} ${layoutRules.pagePadding} space-y-6`}>
          <p className="uppercase tracking-[0.3em] text-brand-accent">Search</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl">
            Find seva opportunities, rituals, and visitor guidance
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-white/75">
            Browse highlights from Tridhara Milan Mandir including darshan schedules, anna-daan seva,
            community programmes, and practical planning resources.
          </p>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row" action="/search">
            <input
              type="search"
              name="q"
              defaultValue={query}
              aria-label="Search Tridhara Milan Mandir"
              placeholder="Search for darshan timings, seva, events, or FAQs"
              className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/60 focus:border-brand-accent focus:outline-none"
            />
            <Button type="submit" variant="inverted" className="sm:w-auto">
              Search site
            </Button>
          </form>
        </div>
      </section>

      <SectionShell className="bg-gradient-to-b from-white via-brand-light/40 to-white">
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-primary">
              {hasQuery ? `Results for “${query}”` : "Recommended links"}
            </p>
            <p className="text-sm text-neutral-600">
              {hasQuery
                ? `${results.length} ${results.length === 1 ? "result" : "results"}`
                : "Start typing above or explore highlighted resources."}
            </p>
          </div>

          <div className="grid gap-4">
            {results.map((result) => (
              <Link
                key={`${result.category}-${result.title}`}
                href={result.href}
                className="group rounded-3xl border border-brand-primary/10 bg-white/95 p-6 shadow-[0_26px_70px_-60px_rgba(27,10,44,0.35)] transition hover:border-brand-primary/20 hover:shadow-[0_32px_90px_-60px_rgba(27,10,44,0.45)]"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
                      {result.category}
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                      {siteConfig.address.addressLocality}
                    </span>
                  </div>
                  <h2 className="font-display text-lg text-brand-primary group-hover:text-brand-secondary">
                    {result.title}
                  </h2>
                  <p className="text-sm text-neutral-600">{result.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {hasQuery && results.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-brand-primary/20 bg-white/80 p-6 text-sm text-neutral-600">
              We couldn’t find matches for your search. Try broader keywords or explore the FAQ and
              Services pages.
            </div>
          ) : null}
        </div>
      </SectionShell>
    </main>
  );
}
