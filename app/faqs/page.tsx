"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, HelpCircle, Clock, MapPin, UtensilsCrossed, Home, Search, X, Filter, List, ChevronRight, Link2, Check } from "lucide-react";

import { Accordion } from "@/components/ui/Accordion";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/config/site";
import { faqContent } from "@/data/content";
import { servicesContent } from "@/data/services";

// Helper function to generate unique IDs from questions
function generateFAQId(question: string): string {
  return question
    .toLowerCase()
    .replace(/[?!.,]/g, '') // Remove punctuation
    .replace(/\s+/g, '-')    // Spaces to hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove special chars
    .substring(0, 50);       // Max 50 chars
}

// Copy Link Button Component
function CopyLinkButton({ faqId, question }: { faqId: string; question: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = `${window.location.origin}/faqs#${faqId}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      // Track analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'faq_share', {
          faq_id: faqId,
          question: question,
          method: 'copy_link'
        });
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={copyLink}
      className="text-sm text-brand-primary hover:text-brand-secondary flex items-center gap-1 transition"
      title="Copy link to this answer"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Link2 className="h-4 w-4" />
          Copy Link
        </>
      )}
    </button>
  );
}

// Metadata must be exported from server component, so we'll need to split this
// For now, keeping as client component for search functionality

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Handle URL parameters and hash on page load
  useEffect(() => {
    // Read URL search parameters
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    const category = params.get('category');

    if (query) setSearchQuery(query);
    if (category) setSelectedCategory(category);

    // Handle URL hash - auto-scroll to FAQ
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add highlight flash effect
          element.classList.add('highlight-flash');
          setTimeout(() => element.classList.remove('highlight-flash'), 2000);
        }
      }, 100);
    }
  }, []);

  // Update URL when search query changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);

    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url.toString());
  };

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    const url = new URL(window.location.href);
    if (category && category !== 'all') {
      url.searchParams.set('category', category);
    } else {
      url.searchParams.delete('category');
    }
    window.history.replaceState({}, '', url.toString());
  };

  const faqEntries = [faqContent.featured, ...faqContent.items];

  // Collect FAQs from services pages with enhanced metadata
  const serviceFAQs = Object.values(servicesContent).flatMap((service) =>
    (service.faqs || []).map((faq) => ({
      ...faq,
      category: service.title,
      slug: service.slug,
      keywords: extractKeywords(faq.question)
    }))
  );

  // All FAQs combined for search
  const allFAQs = [
    ...faqEntries.map(item => ({
      ...item,
      category: "General",
      keywords: extractKeywords(item.question)
    })),
    ...serviceFAQs
  ];

  // Extract keywords from question for better search
  function extractKeywords(text: string): string[] {
    return text.toLowerCase()
      .replace(/[?.,]/g, '')
      .split(' ')
      .filter(word => word.length > 3);
  }

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let filtered = allFAQs;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.keywords?.some(keyword => keyword.includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory, allFAQs]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allFAQs.map(faq => faq.category));
    return ["all", ...Array.from(cats)];
  }, [allFAQs]);

  // Enhanced FAQ Schema with GEO optimization
  const enhancedFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Tridhara Milan Mandir - Frequently Asked Questions",
    "description": "Comprehensive FAQ about visiting Tridhara Milan Mandir in Panchmura, West Bengal. Find answers about temple timings, location, free prasad, guest house, rituals, and services.",
    "url": `${siteConfig.url}/faqs`,
    "inLanguage": "en-US",
    "datePublished": "2025-11-02",
    "dateModified": new Date().toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url
    },
    "about": {
      "@type": "HinduTemple",
      "name": siteConfig.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.address.streetAddress,
        "addressLocality": siteConfig.address.addressLocality,
        "addressRegion": siteConfig.address.addressRegion,
        "postalCode": siteConfig.address.postalCode,
        "addressCountry": siteConfig.address.addressCountry
      }
    },
    mainEntity: allFAQs.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      },
      ...(item.category && { "about": item.category })
    }))
  };

  // Quick answers for instant visibility with unique IDs
  const quickAnswers = [
    {
      id: "temple-timings",
      icon: Clock,
      title: "What are the temple timings?",
      answer: "Daily darshan: 5:00 AM - 9:00 PM (weekdays), 5:00 AM - 9:30 PM (weekends). Special aarti at 5:00 AM, 6:30 PM, and integrated Tridhara aarti in the evening.",
      link: "/services/darshan-and-timings",
      linkText: "Full schedule"
    },
    {
      id: "location",
      icon: MapPin,
      title: "Where is Tridhara Milan Mandir located?",
      answer: "Panchmura village, Bankura district, West Bengal - 30 km from Bishnupur (45 min by car), 180 km from Kolkata (4 hours drive).",
      link: "/plan-your-visit",
      linkText: "Get directions"
    },
    {
      id: "free-prasad",
      icon: UtensilsCrossed,
      title: "Is prasad free at Tridhara Milan Mandir?",
      answer: "Yes! Completely free prasad served to 2,000 devotees daily at 12:30 PM after midday bhog. Everyone is welcome regardless of background.",
      link: "/services/bhog-and-prasad",
      linkText: "Learn more"
    },
    {
      id: "guest-house-booking",
      icon: Home,
      title: "Can I stay overnight at the temple?",
      answer: "8 suites available on-site, just 100m from temple courtyard. Rooms range from ₹3,600-15,600/night including anna-daan meals, temple access, and optional terracotta workshops.",
      link: "/guest-house",
      linkText: "Book now"
    },
    {
      id: "reach-bishnupur",
      icon: MapPin,
      title: "How do I reach from Bishnupur?",
      answer: "30 km (45 min). Take shared trekker from Bishnupur bus stand (₹30-40/person, every 30 min) or private taxi (₹600-800). The temple is well-signposted once you reach Panchmura village.",
      link: "/plan-your-visit",
      linkText: "Full travel guide"
    }
  ];

  // Table of Contents - organized by category
  const tableOfContents = {
    "Essential Information": [
      ...quickAnswers.map(qa => ({ id: qa.id, question: qa.title })),
      ...faqEntries.slice(0, 4).map(faq => ({ id: generateFAQId(faq.question), question: faq.question }))
    ],
    "Services & Rituals": Object.values(servicesContent)
      .flatMap(service => (service.faqs || []).map(faq => ({
        id: generateFAQId(faq.question),
        question: faq.question,
        category: service.title
      })))
  };

  return (
    <>
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(enhancedFaqSchema) }}
      />

      {/* Breadcrumb */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: siteConfig.url },
          { name: "FAQs", item: `${siteConfig.url}/faqs` }
        ]}
      />

      {/* Semantic HTML for GEO */}
      <article className="min-h-screen bg-gradient-to-b from-brand-light via-white to-neutral-50 scroll-smooth">
        {/* Hero Section with semantic heading */}
        <header className="relative bg-gradient-to-br from-brand-primary to-brand-secondary py-16 text-white md:py-24">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <HelpCircle className="h-4 w-4" />
                {faqContent.eyebrow}
              </div>
              <h1 className="mb-6 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
                {faqContent.title}
              </h1>
              <p className="text-lg leading-relaxed text-white/90 md:text-xl">
                Get instant answers about Tridhara Milan Mandir - temple timings, location, free prasad, accommodation, rituals, and how to visit from Bishnupur or Kolkata.
              </p>
            </div>
          </div>
        </header>

        {/* Sticky Quick Navigation */}
        <nav className="border-b border-neutral-200 bg-white py-4 shadow-sm sticky top-0 z-20" aria-label="FAQ Navigation">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-sm font-medium text-neutral-600">Jump to:</span>
                <a href="#quick-answers" className="rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-medium text-brand-primary transition hover:bg-brand-primary hover:text-white">
                  Quick Answers
                </a>
                <a href="#search" className="rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-medium text-brand-primary transition hover:bg-brand-primary hover:text-white">
                  Search FAQs
                </a>
                <a href="#general" className="rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-medium text-brand-primary transition hover:bg-brand-primary hover:text-white">
                  General Questions
                </a>
                <a href="#services" className="rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-medium text-brand-primary transition hover:bg-brand-primary hover:text-white">
                  Services & Rituals
                </a>
                <a href="#contact" className="rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-medium text-brand-primary transition hover:bg-brand-primary hover:text-white">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">

              {/* Quick Answers Section - Optimized for AI extraction */}
              <section id="quick-answers" className="mb-16 scroll-mt-20" itemScope itemType="https://schema.org/FAQPage">
                <h2 className="mb-2 font-display text-3xl text-brand-primary md:text-4xl">
                  Quick Answers
                </h2>
                <p className="mb-8 text-neutral-600">
                  Essential information for visiting Tridhara Milan Mandir - Most frequently asked questions
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  {quickAnswers.map((qa) => {
                    const Icon = qa.icon;
                    return (
                      <div
                        key={qa.id}
                        id={qa.id}
                        className="scroll-mt-24 rounded-[20px] border border-brand-primary/20 bg-white p-6 shadow-sm transition hover:shadow-md"
                        itemScope
                        itemProp="mainEntity"
                        itemType="https://schema.org/Question"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div className="rounded-full bg-brand-primary/10 p-2">
                            <Icon className="h-5 w-5 text-brand-primary" />
                          </div>
                          <h3 className="font-semibold text-brand-primary" itemProp="name">
                            {qa.title}
                          </h3>
                        </div>
                        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                          <p className="text-sm leading-relaxed text-neutral-700" itemProp="text">
                            {qa.answer}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-4">
                          <Link
                            href={qa.link}
                            className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:text-brand-secondary"
                          >
                            {qa.linkText} <ArrowUpRight className="h-3 w-3" />
                          </Link>
                          <CopyLinkButton faqId={qa.id} question={qa.title} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Table of Contents */}
              <section className="mb-16 rounded-2xl border border-brand-primary/20 bg-white p-8 shadow-sm scroll-mt-20">
                <div className="mb-6 flex items-center gap-3">
                  <List className="h-6 w-6 text-brand-primary" />
                  <h2 className="text-2xl font-display text-brand-primary">
                    Browse All Questions ({Object.values(tableOfContents).flat().length} total)
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {Object.entries(tableOfContents).map(([category, questions]) => (
                    <div key={category}>
                      <h3 className="mb-3 font-semibold text-brand-secondary text-lg">
                        {category} ({questions.length})
                      </h3>
                      <ul className="space-y-2">
                        {questions.map(({ id, question }) => (
                          <li key={id}>
                            <a
                              href={`#${id}`}
                              className="text-sm text-neutral-700 hover:text-brand-primary flex items-start gap-2 transition group"
                            >
                              <ChevronRight className="h-4 w-4 shrink-0 mt-0.5 text-brand-secondary group-hover:translate-x-1 transition-transform" />
                              <span>{question}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Advanced Search & Filter Section */}
              <section id="search" className="mb-16 scroll-mt-20">
                <div className="rounded-[24px] border border-brand-primary/20 bg-white p-8 shadow-md">
                  <div className="mb-6 flex items-center gap-3">
                    <Search className="h-6 w-6 text-brand-primary" />
                    <h2 className="font-display text-2xl text-brand-primary md:text-3xl">
                      Search All Questions
                    </h2>
                  </div>

                  {/* Search Input */}
                  <div className="mb-6">
                    <div className="relative">
                      <input
                        type="search"
                        placeholder="Search questions... (e.g., 'prasad', 'timings', 'accommodation')"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full rounded-full border-2 border-brand-primary/20 bg-neutral-50 px-6 py-4 pr-12 text-neutral-900 placeholder:text-neutral-500 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                        aria-label="Search FAQs"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => handleSearchChange("")}
                          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700"
                          aria-label="Clear search"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Filter className="h-4 w-4 text-brand-secondary" />
                      <span className="text-sm font-medium text-neutral-700">Filter by category:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleCategoryChange(cat)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                            selectedCategory === cat
                              ? "bg-brand-primary text-white"
                              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                          }`}
                        >
                          {cat === "all" ? "All Questions" : cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Results */}
                  {(searchQuery || selectedCategory !== "all") && (
                    <div className="mb-4">
                      <p className="text-sm text-neutral-600">
                        Found <span className="font-semibold text-brand-primary">{filteredFAQs.length}</span> question{filteredFAQs.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )}

                  {/* Filtered Results */}
                  {(searchQuery || selectedCategory !== "all") && (
                    <div className="space-y-4">
                      {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((faq) => {
                          const faqId = generateFAQId(faq.question);
                          return (
                            <div
                              key={faqId}
                              id={faqId}
                              className="scroll-mt-24 rounded-lg border border-neutral-200 bg-neutral-50 p-6"
                              itemScope
                              itemProp="mainEntity"
                              itemType="https://schema.org/Question"
                            >
                              <div className="mb-2 flex items-start justify-between gap-4">
                                <h3 className="font-semibold text-brand-primary" itemProp="name">
                                  {faq.question}
                                </h3>
                                <span className="shrink-0 rounded-full bg-brand-secondary/10 px-3 py-1 text-xs font-medium text-brand-secondary">
                                  {faq.category}
                                </span>
                              </div>
                              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                                <p className="text-sm leading-relaxed text-neutral-700 mb-3" itemProp="text">
                                  {faq.answer}
                                </p>
                              </div>
                              <div className="flex justify-end">
                                <CopyLinkButton faqId={faqId} question={faq.question} />
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
                          <p className="mb-2 text-neutral-700">No questions found matching your search.</p>
                          <button
                            onClick={() => {
                              handleSearchChange("");
                              handleCategoryChange("all");
                            }}
                            className="text-sm font-medium text-brand-primary hover:text-brand-secondary"
                          >
                            Clear filters
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>

              {/* General FAQs - Semantic markup for GEO */}
              <section id="general" className="mb-16 scroll-mt-20" itemScope itemType="https://schema.org/FAQPage">
                <h2 className="mb-6 font-display text-2xl text-brand-primary md:text-3xl">
                  General Questions About Tridhara Milan Mandir
                </h2>
                <Accordion items={faqContent.items} />
              </section>

              {/* Service-Specific FAQs */}
              <section id="services" className="mb-12 scroll-mt-20">
                <h2 className="mb-6 font-display text-2xl text-brand-primary md:text-3xl">
                  Service-Specific Questions
                </h2>
                <div className="space-y-8">
                  {Object.values(servicesContent).map((service) => {
                    if (!service.faqs || service.faqs.length === 0) return null;

                    return (
                      <div key={service.slug} itemScope itemType="https://schema.org/FAQPage">
                        <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-brand-secondary">
                          {service.title}
                          <Link
                            href={`/services/${service.slug}`}
                            className="text-sm font-normal text-brand-primary hover:text-brand-secondary"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </h3>
                        <Accordion items={service.faqs} />
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Contact CTA */}
              <section id="contact" className="rounded-[24px] bg-gradient-to-br from-brand-light to-brand-primary/5 p-8 text-center md:p-10 scroll-mt-20">
                <h2 className="mb-4 font-display text-2xl text-brand-primary md:text-3xl">
                  Still Have Questions?
                </h2>
                <p className="mb-6 text-neutral-700">
                  Our team is here to help. Reach out via email or phone for personalized assistance about visiting Tridhara Milan Mandir, booking rituals, or arranging accommodation.
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href={`mailto:${siteConfig.contact.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 font-semibold text-white transition hover:bg-brand-secondary"
                  >
                    Email Us
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`tel:${siteConfig.contact.phone}`}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
                  >
                    Call Us
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
