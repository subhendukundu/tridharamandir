import Image from "next/image";
import clsx from "clsx";
import { ArrowRight, Compass, Map, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { Badge } from "@/components/ui/Badge";
import { aboutContent } from "@/data/content";

export type AboutVariant = "panorama" | "gallery" | "storyboard";

const DEFAULT_VARIANT: AboutVariant = "panorama";

const variantLabels: Record<AboutVariant, string> = {
  panorama: "Option A — Panoramic Narrative",
  gallery: "Option B — Heritage Gallery",
  storyboard: "Option C — Journey Storyboard"
};

type AboutSectionProps = {
  variant?: AboutVariant;
  showVariantLabel?: boolean;
  withAnchor?: boolean;
};

export function AboutSection({
  variant = DEFAULT_VARIANT,
  showVariantLabel = false,
  withAnchor = true
}: AboutSectionProps) {
  const variantLabel = showVariantLabel ? variantLabels[variant] : undefined;

  switch (variant) {
    case "panorama":
      return (
        <SectionShell
          id={withAnchor ? "about" : undefined}
          variant="transparent"
          className="relative overflow-hidden bg-brand-light"
        >
          <PanoramaLayout variantLabel={variantLabel} />
        </SectionShell>
      );
    case "gallery":
      return (
        <SectionShell
          id={withAnchor ? "about" : undefined}
          variant="transparent"
          className="relative overflow-hidden bg-brand-light"
        >
          <GalleryLayout variantLabel={variantLabel} />
        </SectionShell>
      );
    case "storyboard":
      return (
        <SectionShell
          id={withAnchor ? "about" : undefined}
          variant="transparent"
          className="relative overflow-hidden bg-brand-light"
        >
          <StoryboardLayout variantLabel={variantLabel} />
        </SectionShell>
      );
    default:
      return null;
  }
}

export function AboutSectionVariantsShowcase() {
  return (
    <>
      <AboutSection variant="panorama" showVariantLabel />
      <AboutSection variant="gallery" showVariantLabel withAnchor={false} />
      <AboutSection variant="storyboard" showVariantLabel withAnchor={false} />
    </>
  );
}

type LayoutProps = {
  variantLabel?: string;
};

function VariantLabel({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <div className="mb-8 inline-flex">
      <Badge label={text} variant="neutral" />
    </div>
  );
}

const highlightItems = [
  {
    title: "Consecrated in 2022",
    description:
      "Dedicated on 1 July 2022 during Rath Yatra, the mandir invites devotees across traditions to Panchmura’s sacred campus.",
    icon: Compass
  },
  {
    title: "Mission: Unity Through Seva",
    description:
      "Integrated Shaiva, Vaishnava, and Shakta worship underscores a mission of inclusive devotion and shared seva.",
    icon: Sparkles
  },
  {
    title: "Values in Action",
    description:
      "Scholarships, anna-daan, health camps, and heritage tours foster compassion, transparency, and cultural stewardship.",
    icon: Map
  }
] as const;

function PanoramaLayout({ variantLabel }: LayoutProps) {
  return (
    <div className="relative">
      <VariantLabel text={variantLabel} />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-0">
        <div
          className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 block sm:left-0 md:left-0 lg:left-0"
          aria-hidden="true"
        >
          <Image
            src="/patterns/radha-krishna-outlined.png"
            alt="Radha and Krishna line art motif"
            width={360}
            height={520}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 640px) 38vw, 60vw"
            className="w-[90vw] max-w-[400px] sm:w-[400px] md:w-[450px] lg:w-[480px] select-none opacity-35 drop-shadow-[0_30px_60px_rgba(69,41,55,0.18)]"
          />
        </div>
        <div
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-[58%] block sm:right-[-140px] md:right-0 lg:right-[-200px]"
          aria-hidden="true"
        >
          <Image
            src="/patterns/thai-temple-outline.png"
            alt="Intricate temple dome outline pattern"
            width={620}
            height={360}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 36vw, (min-width: 640px) 48vw, 70vw"
            className="w-[90vw] max-w-[420px] sm:w-[480px] sm:max-w-none md:w-[540px] lg:w-[640px] select-none opacity-30 drop-shadow-[0_28px_60px_rgba(69,41,55,0.16)]"
          />
        </div>
        <div className="relative z-10 flex-1">
          <div className="rounded-[32px] bg-white/80 p-8 shadow-[0_32px_80px_-60px_rgba(27,10,44,0.45)] backdrop-blur">
            <AboutCopy alignment="start" wrapperClassName="max-w-xl" />
          </div>
        </div>
        <div className="relative z-10 flex-1">
          <div className="rounded-[32px] bg-white/80 p-8 shadow-[0_32px_80px_-60px_rgba(27,10,44,0.45)] backdrop-blur">
            <FeatureList />
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryLayout({ variantLabel }: LayoutProps) {
  return (
    <div className="relative">
      <VariantLabel text={variantLabel} />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-center lg:px-0">
        <div className="relative z-10">
          <AboutCopy alignment="start" />
        </div>
        <div className="relative grid gap-10">
          <div className="pointer-events-none absolute -top-10 left-[-10%] hidden h-40 w-40 rounded-full bg-brand-primary/10 blur-[120px] lg:block" />
          <div className="pointer-events-none absolute right-[-12%] bottom-[-20%] hidden h-52 w-52 rounded-full bg-brand-primary/10 blur-[140px] lg:block" />
          <div className="relative grid gap-8">
            <GalleryTile
              title="Living Culture"
              description="Morning anjali, dhak rhythms, and craft ateliers keep the mandir courtyard alive with shared celebration."
              image={{ src: "/patterns/radha-krishna-outlined.png", width: 360, height: 500 }}
            />
            <GalleryTile
              title="Architectural Narratives"
              description="Annual pandal themes reimagine classical iconography through sculptural facades, murals, and immersive lighting."
              image={{ src: "/patterns/thai-temple-outline.png", width: 620, height: 360 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryboardLayout({ variantLabel }: LayoutProps) {
  return (
    <div className="relative">
      <VariantLabel text={variantLabel} />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:px-0">
        <div className="pointer-events-none absolute left-2 top-[10%] block sm:left-0 md:left-0 lg:left-0 lg:top-auto lg:bottom-[-10%]">
          <Image
            src="/patterns/radha-krishna-outlined.png"
            alt="Radha-Krishna motif illustration"
            width={320}
            height={520}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 24vw, (min-width: 640px) 32vw, 55vw"
            className="w-[90vw] max-w-[280px] sm:w-[300px] md:w-[350px] lg:w-[400px] select-none opacity-[0.2] drop-shadow-[0_18px_45px_rgba(69,41,55,0.18)]"
          />
        </div>
        <div className="pointer-events-none absolute right-2 top-[60%] block sm:right-[-100px] md:right-0 lg:right-[-220px] lg:top-auto lg:bottom-[-16%]">
          <Image
            src="/patterns/thai-temple-outline.png"
            alt="Temple outline illustration"
            width={520}
            height={300}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 34vw, (min-width: 640px) 46vw, 70vw"
            className="w-[90vw] max-w-[320px] sm:w-[360px] sm:max-w-none md:w-[420px] lg:w-[580px] select-none opacity-[0.22] drop-shadow-[0_18px_45px_rgba(69,41,55,0.18)]"
          />
        </div>
        <div className="relative z-10 flex flex-col gap-8 lg:pl-28">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-primary">
                Daily Devotion Journey
              </p>
              <p className="text-sm text-neutral-600">
                Follow the rhythm of darshan, seva, and storytelling as the mandir guides devotees from dawn prayer to evening sabha.
              </p>
            </div>
          </div>
          <StoryboardTimeline />
        </div>
        <div className="relative z-10 max-w-xl lg:pr-20">
          <AboutCopy alignment="start" />
        </div>
      </div>
    </div>
  );
}

type GalleryTileProps = {
  title: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt?: string;
  };
};

function GalleryTile({ title, description, image }: GalleryTileProps) {
  return (
    <article className="flex flex-col gap-6 border-l-2 border-brand-primary/20 pl-6 lg:flex-row lg:items-center lg:gap-10">
      <div className="relative mx-auto flex flex-none items-center justify-center">
        <Image
          src={image.src}
          alt={image.alt ?? `${title} illustration`}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1280px) 200px, (min-width: 1024px) 220px, (min-width: 768px) 240px, 60vw"
          className="w-full max-w-[220px] select-none opacity-45"
        />
      </div>
      <div className="text-left lg:flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-primary">
          {title}
        </p>
        <p className="mt-3 text-sm text-neutral-600">{description}</p>
      </div>
    </article>
  );
}

function FeatureList() {
  return (
    <ul className="relative z-10 flex flex-col gap-8">
      {highlightItems.map((item) => (
        <li key={item.title} className="flex items-start gap-4 border-b border-brand-primary/10 pb-6 last:border-b-0 last:pb-0">
          <span className="mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
            <item.icon className="h-5 w-5" />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
            <p className="text-sm text-neutral-600">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

type AboutCopyProps = {
  alignment: "start" | "center";
  wrapperClassName?: string;
};

function AboutCopy({ alignment, wrapperClassName }: AboutCopyProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-8 max-w-xl",
        alignment === "center"
          ? "items-center text-center"
          : "items-start text-left",
        wrapperClassName
      )}
    >
      <SectionHeader
        eyebrow={aboutContent.eyebrow}
        eyebrowVariant="badge"
        title={aboutContent.title}
        description={aboutContent.copy}
        alignment={alignment}
      />
      <div
        className={clsx(
          "w-full rounded-[24px] border border-brand-primary/10 bg-white/80 p-6 shadow-[0_28px_70px_-55px_rgba(27,10,44,0.4)]",
          alignment === "center" ? "text-center" : "text-left"
        )}
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-accent/10 blur-[60px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-brand-secondary/10 blur-[70px]" aria-hidden="true" />

        <h3 className="font-display text-2xl font-semibold text-brand-primary pb-4 md:pb-5">
          Mission &amp; Values
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          {aboutContent.mission.statement}
        </p>
        <ul
          className={clsx(
            "mt-5 divide-y divide-brand-primary/10 rounded-2xl bg-white/40 p-4 backdrop-blur-sm",
            alignment === "center" ? "mx-auto max-w-sm text-left" : "text-left"
          )}
        >
          {aboutContent.mission.values.map((value) => (
            <li key={value.label} className="py-3 first:pt-0 last:pb-0">
              <p className="text-sm font-semibold text-neutral-900">{value.label}</p>
              <p className="text-sm text-neutral-600">{value.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <Button
        href={aboutContent.action.href}
        variant={alignment === "center" ? "secondary" : "secondary"}
        icon={<ArrowRight className="h-4 w-4" />}
      >
        {aboutContent.action.label}
      </Button>
    </div>
  );
}

const storyboardMoments = [
  {
    time: "Morning",
    title: "Mangala Arati & Tulsi Parikrama",
    copy: "Gather at 5:00 AM for Radha-Krishna mangala arati, then join devotees circling the tulsi courtyard while priests chant Shaiva, Vaishnava, and Shakta slokas together."
  },
  {
    time: "Afternoon",
    title: "Anna-Daan & Learning Circles",
    copy: "Serve prasada alongside the anna-daan volunteers and assist educators leading Sanskrit recitation and music practice for village students."
  },
  {
    time: "Evening",
    title: "Tridhara Arati & Vrindavan Sabha",
    copy: "Witness the integrated Tridhara arati at dusk before settling into the Vrindavan Sabha where storytellers explain the mandir’s ‘Second Vrindavan’ nickname."
  }
] as const;

function StoryboardTimeline() {
  return (
    <div className="relative flex flex-col gap-8">
      <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-brand-primary/40 via-brand-primary/20 to-transparent" />
      {storyboardMoments.map((moment, index) => (
        <div key={moment.title} className="relative flex gap-6 pl-12">
          <span className="absolute left-4 top-2 flex h-5 w-5 items-center justify-center rounded-full border border-brand-primary/40 bg-white text-brand-primary">
            {index + 1}
          </span>
          <div className="flex flex-col gap-1 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-primary">
              {moment.time}
            </p>
            <p className="text-sm font-semibold text-neutral-900">{moment.title}</p>
            <p className="text-sm text-neutral-600">{moment.copy}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
