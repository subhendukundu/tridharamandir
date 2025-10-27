"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { cfImage, imagePresets } from "@/utils/image";

export default function NotFound() {
  useEffect(() => {
    // Track 404 errors in Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_not_found", {
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-light via-white to-brand-light px-6 overflow-hidden">
      {/* Background Pattern - Temple Outline */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
        <Image
          src={cfImage("/patterns/tridhara-mandir-outline.png", { ...imagePresets.pattern(800), segment: 'foreground' })}
          alt=""
          width={800}
          height={480}
          className="w-[600px] md:w-[800px] select-none"
        />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-primary backdrop-blur mb-8">
          404 Error
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-primary mb-6">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-neutral-700 leading-relaxed mb-12 max-w-xl mx-auto">
          The page you are looking for might have been moved, renamed, or doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary hover:shadow-xl active:scale-95"
          >
            <Home className="h-5 w-5" />
            Go to Homepage
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-primary/20 bg-white px-8 py-4 text-base font-semibold text-brand-primary transition-all hover:border-brand-primary/40 hover:bg-brand-light active:scale-95"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Popular Pages */}
        <div className="mt-16 pt-8 border-t border-brand-primary/10">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-secondary mb-6">
            Popular Pages
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/about-us"
              className="rounded-full bg-white border border-brand-primary/10 px-6 py-2 text-sm font-medium text-neutral-700 hover:border-brand-primary/30 hover:bg-brand-light transition-all"
            >
              About Us
            </Link>
            <Link
              href="/services"
              className="rounded-full bg-white border border-brand-primary/10 px-6 py-2 text-sm font-medium text-neutral-700 hover:border-brand-primary/30 hover:bg-brand-light transition-all"
            >
              Services
            </Link>
            <Link
              href="/events"
              className="rounded-full bg-white border border-brand-primary/10 px-6 py-2 text-sm font-medium text-neutral-700 hover:border-brand-primary/30 hover:bg-brand-light transition-all"
            >
              Events
            </Link>
            <Link
              href="/guest-house"
              className="rounded-full bg-white border border-brand-primary/10 px-6 py-2 text-sm font-medium text-neutral-700 hover:border-brand-primary/30 hover:bg-brand-light transition-all"
            >
              Guest House
            </Link>
            <Link
              href="/plan-your-visit"
              className="rounded-full bg-white border border-brand-primary/10 px-6 py-2 text-sm font-medium text-neutral-700 hover:border-brand-primary/30 hover:bg-brand-light transition-all"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
