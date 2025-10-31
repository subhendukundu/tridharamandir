"use client";

import { useState } from "react";
import Link from "next/link";
import { Link2, Check } from "lucide-react";
import clsx from "clsx";

interface AnchorHeadingProps {
  id: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

/**
 * Heading component with visible anchor link icon
 * - Shows link icon on hover
 * - Copies URL to clipboard on click
 * - Supports SEO with proper heading hierarchy
 * - Accessible with ARIA labels
 */
export function AnchorHeading({
  id,
  level = 2,
  children,
  className
}: AnchorHeadingProps) {
  const [copied, setCopied] = useState(false);
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      // Update URL without scrolling
      window.history.pushState({}, "", `#${id}`);

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <Tag id={id} className={clsx("group relative scroll-mt-24", className)}>
      <Link
        href={`#${id}`}
        onClick={handleCopyLink}
        className="inline-flex items-center gap-2 no-underline hover:no-underline"
        aria-label={`Link to ${children}`}
      >
        {children}
        <span
          className={clsx(
            "inline-flex items-center justify-center transition-all duration-200",
            "opacity-40 group-hover:opacity-100",
            "text-brand-accent hover:text-brand-primary",
            "-ml-1"
          )}
          aria-hidden="true"
        >
          {copied ? (
            <Check className="h-5 w-5 animate-in zoom-in duration-200" />
          ) : (
            <Link2 className="h-5 w-5" />
          )}
        </span>
      </Link>
    </Tag>
  );
}
