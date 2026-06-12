import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeIndianRupee,
  Clock,
  Compass,
  HeartHandshake,
  Home,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
  TrainFront,
  Users,
  Utensils
} from "lucide-react";

import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/Button";
import { TridharaStoryEffect } from "@/components/sections/TridharaStoryEffect";
import { aboutContent, donationContent, faqContent, napContent } from "@/data/content";
import { programmes, volunteerSteps } from "@/data/community";
import { siteConfig } from "@/config/site";
import { cfImage, imagePresets } from "@/utils/image";

const heroImage = "/images/gallery/temple-blue-hour-evening-devotees-gathering-03.jpg";
const courtyardImage = "/images/gallery/temple-courtyard-aerial-view-devotees-gathering-15.jpg";
const darshanImage = "/images/gallery/radha-krishna-close-up-traditional-ornaments-20.jpg";
const aratiImage = "/images/gallery/tridhara-evening-arati-integrated-worship-panchmura-01.jpg";

const storyStats = [
  { label: "Consecrated", value: "1 July 2022" },
  { label: "Anna-daan", value: "2,000+ plates daily" },
  { label: "From Bishnupur", value: "30 km" },
  { label: "Darshan", value: "5 AM - 9 PM" }
] as const;

const spiritualStreams = [
  {
    name: "Shaiva",
    title: "Stillness before Mahadev",
    copy: "The temple begins with surrender: quiet, discipline, and the sense that the self can become steady.",
    image: "/images/gallery/mahadev-shiva-linga-shaiva-shrine-panchmura-03.jpg",
    alt: "Mahadev shrine at Tridhara Milan Mandir",
    tone: "border-[#5C7586] bg-[#EFF5F6]"
  },
  {
    name: "Vaishnava",
    title: "Bhakti before Radha-Krishna",
    copy: "At the center is Radha-Krishna darshan, kirtan, flowers, and the tenderness of Vrindavan devotion.",
    image: "/images/gallery/radha-krishna-deities-ornate-decoration-altar-19.jpg",
    alt: "Radha Krishna deities at Tridhara Milan Mandir",
    tone: "border-brand-accent/45 bg-[#FFF7EA]"
  },
  {
    name: "Shakta",
    title: "Shakti in living service",
    copy: "The Devi current turns devotion into courage: food, health, learning, and care for neighbouring villages.",
    image: "/images/gallery/durga-maa-idol-ten-arms-weapons-puja-10.jpg",
    alt: "Durga Maa idol at Tridhara Milan Mandir",
    tone: "border-[#B94E4A]/35 bg-[#FFF1EF]"
  }
] as const;

const dailyRhythm = [
  { time: "05:00", title: "Mangala Arati", detail: "Dawn darshan, quiet parikrama, and the first sound of bells." },
  { time: "12:30", title: "Anna-Daan Prasad", detail: "A free midday meal shared by visitors, villagers, and devotees." },
  { time: "18:30", title: "Tridhara Arati", detail: "Shaiva, Vaishnava, and Shakta worship gathered into one evening ritual." }
] as const;

const pilgrimMoments = [
  {
    label: "Arrive",
    title: "The shikhara appears above Panchmura.",
    copy: "The first feeling is place: Bengal soil, terracotta villages, and a mandir that rises like a promise.",
    image: courtyardImage,
    alt: "Tridhara Milan Mandir courtyard in Panchmura"
  },
  {
    label: "Receive",
    title: "Darshan pulls the story inward.",
    copy: "Radha-Krishna, Mahadev, Devi, Rama-Sita, Hanuman, and Chaitanya Mahaprabhu are not separate stops. They form one devotional field.",
    image: darshanImage,
    alt: "Radha Krishna darshan at Tridhara Milan Mandir"
  },
  {
    label: "Share",
    title: "Bhakti becomes food.",
    copy: "Anna-daan is not an add-on. It is the temple's theology made practical: no visitor leaves without being offered prasad.",
    image: "/images/tridhara-milan-mandir-prasad-food-offering-panchmura.jpg",
    alt: "Prasad food offering at Tridhara Milan Mandir"
  },
  {
    label: "Return",
    title: "Evening arati gathers everything.",
    copy: "The day closes with the sound, flame, and movement of Tridhara: three streams returning to one source.",
    image: aratiImage,
    alt: "Evening arati at Tridhara Milan Mandir"
  }
] as const;

const visitPaths = [
  {
    icon: Compass,
    title: "First-time darshan",
    detail: "Timings, dress guidance, route, prasad, accessibility, and what to expect.",
    href: "/plan-your-visit",
    cta: "Plan darshan"
  },
  {
    icon: Home,
    title: "Stay overnight",
    detail: "Guest house options near the mandir, morning arati, and the Bishnupur-Panchmura route.",
    href: "/guest-house",
    cta: "See guest house"
  },
  {
    icon: TrainFront,
    title: "Coming from Kolkata",
    detail: "Trains to Bishnupur, road routes, taxis, and a one-day darshan plan from the city.",
    href: "/guides/visit-from-kolkata",
    cta: "Read the Kolkata guide"
  },
  {
    icon: HeartHandshake,
    title: "Offer seva",
    detail: "Support anna-daan, scholarships, health camps, temple upkeep, or volunteer rotations.",
    href: "/services/donation-and-seva",
    cta: "Choose seva"
  }
] as const;

const serviceIcons = {
  "darshan-and-timings": Clock,
  "bhog-and-prasad": Utensils,
  "marriage-and-rituals": Users,
  "donation-and-seva": BadgeIndianRupee
} as const;

const eventImages = [
  "/images/gallery/devotees-gathering-festival-crowd-tridhara-milan-04.jpg",
  "/images/gallery/radha-krishna-deities-outdoor-night-festival-08.jpg"
] as const;

function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00+05:30`));
}

function SectionHeader({
  eyebrow,
  title,
  copy,
  tone = "light"
}: {
  eyebrow: string;
  title: string;
  copy: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="max-w-3xl">
      <p className={`text-xs font-bold uppercase tracking-[0.22em] ${tone === "dark" ? "text-brand-accent" : "text-brand-secondary"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 font-display text-4xl font-bold leading-[1.02] sm:text-5xl ${tone === "dark" ? "text-white" : "text-brand-primary"}`}>
        {title}
      </h2>
      <p className={`mt-5 text-base leading-relaxed sm:text-lg ${tone === "dark" ? "text-white/74" : "text-neutral-700"}`}>
        {copy}
      </p>
    </div>
  );
}

function StoryNumber({ children }: { children: string }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-accent/45 bg-brand-light font-mono text-sm font-bold text-brand-primary">
      {children}
    </span>
  );
}

export function HomeRedesign() {
  const openingHours = napContent.hours.map((span) => ({
    days: span.dayOfWeek.join(", "),
    hours: `${span.opens} - ${span.closes}`
  }));

  return (
    <>
      <section id="home" className="story-hero relative isolate overflow-hidden bg-brand-dark pt-[var(--header-height)] text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src={cfImage(heroImage, imagePresets.hero(1800))}
            alt="Tridhara Milan Mandir at blue hour with devotees"
            fill
            sizes="100vw"
            className="story-hero-image object-cover"
            priority
          />
          <div className="story-hero-overlay absolute inset-0" />
        </div>
        <TridharaStoryEffect />

        <div className="mx-auto grid min-h-[calc(88svh-var(--header-height))] w-full max-w-[1160px] gap-8 px-6 pb-10 pt-12 sm:px-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(360px,0.64fr)] lg:items-end lg:px-12">
          <div className="max-w-3xl">
            <p className="inline-flex max-w-full border border-brand-accent/55 bg-brand-dark/45 px-4 py-2 text-xs font-bold uppercase leading-relaxed tracking-[0.18em] text-brand-accent backdrop-blur">
              Panchmura, Bankura | Naba Brindaban
            </p>
            <h1 className="mt-6 max-w-[820px] break-words font-display text-[3.05rem] font-bold leading-[0.94] text-white sm:text-7xl sm:leading-[0.92] lg:text-[8.4rem]">
              Tridhara Milan Mandir
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/86 sm:text-2xl">
              A mandir where three currents of Hindu devotion meet: Mahadev&apos;s stillness, Radha-Krishna&apos;s bhakti, and Devi&apos;s shakti.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/plan-your-visit" variant="inverted" size="lg" className="w-full sm:w-auto" icon={<Navigation className="h-4 w-4" aria-hidden="true" />}>
                Plan Darshan
              </Button>
              <Button href="/about-us" variant="outlineOnDark" size="lg" className="w-full sm:w-auto" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
                Read the Story
              </Button>
            </div>
            <div className="mt-10 max-w-2xl border-l-2 border-brand-accent/70 bg-brand-dark/28 py-3 pl-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">The effect is the story</p>
              <p className="mt-2 text-base leading-relaxed text-white/82">
                Three streams move toward one darshan: stillness, bhakti, and shakti converging in the mandir courtyard.
              </p>
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </section>

      <section className="border-b border-brand-accent/20 bg-neutral-50">
        <div className="mx-auto grid w-full max-w-[1160px] gap-px bg-brand-accent/20 px-6 py-px sm:px-8 md:grid-cols-4 lg:px-12">
          {storyStats.map((stat) => (
            <div key={stat.label} className="bg-neutral-50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-secondary">{stat.label}</p>
              <p className="mt-2 font-display text-2xl font-bold text-brand-primary">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-temple-paper py-20">
        <div className="mx-auto grid w-full max-w-[1160px] gap-12 px-6 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              eyebrow="What Tridhara means"
              title="The name is the thesis."
              copy="Tridhara means three streams. This homepage now explains those streams first, because that is the reason to care before a visitor thinks about timings, rooms, or directions."
            />
            <div className="mt-8 border-l-2 border-brand-accent pl-5">
              <p className="font-display text-2xl font-bold leading-tight text-brand-primary">
                Shaiva. Vaishnava. Shakta. Not three attractions, but one way of seeing Hindu devotion as a whole.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            {spiritualStreams.map((stream, index) => (
              <article key={stream.name} className={`grid overflow-hidden border ${stream.tone} shadow-card sm:grid-cols-[230px_1fr]`}>
                <div className="relative min-h-56 sm:min-h-full">
                  <Image
                    src={cfImage(stream.image, imagePresets.gallery(700))}
                    alt={stream.alt}
                    fill
                    sizes="(min-width: 640px) 230px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-secondary">{stream.name}</p>
                    <StoryNumber>{`0${index + 1}`}</StoryNumber>
                  </div>
                  <h3 className="mt-5 font-display text-3xl font-bold leading-tight text-brand-primary">{stream.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-neutral-700">{stream.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-brand-dark py-20 text-white">
        <div className="mx-auto grid w-full max-w-[1160px] gap-10 px-6 sm:px-8 lg:grid-cols-[1.06fr_0.94fr] lg:px-12">
          <div>
            <SectionHeader
              eyebrow="The pilgrim arc"
              title="A visit should feel like a passage, not a checklist."
              copy="The page now follows the emotional order of a real visit: arrival, darshan, prasad, evening arati, then seva."
              tone="dark"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {pilgrimMoments.map((moment, index) => (
                <article key={moment.label} className="border border-white/18 bg-white/[0.06] p-5">
                  <StoryNumber>{`0${index + 1}`}</StoryNumber>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{moment.label}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-white">{moment.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/72">{moment.copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <figure className="overflow-hidden border border-white/18 bg-white/[0.06]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={cfImage(darshanImage, imagePresets.gallery(1000))}
                  alt="Radha Krishna close-up darshan at Tridhara Milan Mandir"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="border-t border-white/14 p-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">
                Radha-Krishna darshan is the heart of the story
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-20">
        <div className="mx-auto w-full max-w-[1160px] px-6 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <SectionHeader
              eyebrow="Daily rhythm"
              title="The day is simple. The meaning is not."
              copy="A visitor can plan around three anchors: dawn arati, midday prasad, and evening Tridhara arati."
            />
            <div className="grid gap-px overflow-hidden border border-brand-accent/25 bg-brand-accent/25 sm:grid-cols-3">
              {dailyRhythm.map((moment) => (
                <article key={moment.time} className="bg-white p-5">
                  <time className="font-mono text-2xl font-bold text-brand-secondary">{moment.time}</time>
                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-brand-primary">{moment.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700">{moment.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
            <figure className="overflow-hidden border border-brand-accent/25 bg-white shadow-card">
              <div className="relative aspect-[16/9]">
                <Image
                  src={cfImage(aratiImage, imagePresets.gallery(1200))}
                  alt="Integrated Tridhara evening arati at Panchmura"
                  fill
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
            <div className="grid gap-5">
              <div className="bg-brand-primary p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">Why evening matters</p>
                <p className="mt-4 font-display text-3xl font-bold leading-tight">
                  Tridhara arati is the moment the website should lead people toward.
                </p>
              </div>
              <div className="border border-brand-accent/25 bg-brand-light p-6">
                <p className="text-base leading-relaxed text-neutral-700">
                  Practical details stay close by, but the main job of the homepage is to make this moment legible before asking visitors to click.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Button href="/plan-your-visit" variant="primary" size="lg" icon={<Clock className="h-4 w-4" aria-hidden="true" />}>
                    Full Schedule
                  </Button>
                  <Button href={siteConfig.map.directionsUrl} variant="secondary" size="lg" icon={<Navigation className="h-4 w-4" aria-hidden="true" />}>
                    Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="community" className="bg-temple-paper py-20">
        <div className="mx-auto w-full max-w-[1160px] px-6 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow="Seva beyond the sanctum"
            title="The temple does not end at darshan."
            copy="The story continues through food, education, and health support. This is where devotion becomes a public good."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {programmes.map((programme) => (
              <article key={programme.slug} className="flex min-h-[360px] flex-col border border-brand-accent/25 bg-white p-6 shadow-card">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-secondary">{programme.impact}</p>
                <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-brand-primary">{programme.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-700">{programme.description}</p>
                <ul className="mt-6 flex-1 space-y-3 text-sm leading-relaxed text-neutral-700">
                  {programme.stats.slice(0, 2).map((stat) => (
                    <li key={stat} className="border-l-2 border-brand-accent pl-3">
                      {stat}
                    </li>
                  ))}
                </ul>
                <Link href={programme.ctaHref} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-secondary">
                  {programme.ctaLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="bg-brand-dark p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">Donation anchors</p>
              <h3 className="mt-4 font-display text-3xl font-bold leading-tight">
                Make giving concrete.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                People understand seva faster when the impact is visible before the donation page.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden border border-brand-accent/25 bg-brand-accent/25 md:grid-cols-3">
              {donationContent.highlights.map((highlight) => (
                <article key={highlight.label} className="bg-neutral-50 p-6">
                  <p className="font-display text-4xl font-bold text-brand-primary">{highlight.label}</p>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-700">{highlight.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-neutral-50 py-20">
        <div className="mx-auto w-full max-w-[1160px] px-6 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow="Visitor paths"
            title="After the story, make action obvious."
            copy="The page now gives four clear next steps first, then the full service desk below."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visitPaths.map((path) => {
              const Icon = path.icon;
              return (
                <article key={path.title} className="flex min-h-[300px] flex-col border border-brand-accent/25 bg-white p-6 shadow-card">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-8 font-display text-3xl font-bold leading-tight text-brand-primary">{path.title}</h3>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-neutral-700">{path.detail}</p>
                  <Link href={path.href} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-secondary">
                    {path.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {siteConfig.services.map((service) => {
              const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] ?? Sparkles;
              return (
                <article key={service.slug} className="flex min-h-[282px] flex-col border border-brand-accent/25 bg-brand-light p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold leading-tight text-brand-primary">{service.name}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-700">{service.description}</p>
                  <Link href={`/services/${service.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-secondary">
                    Learn more
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-20 text-white">
        <div className="mx-auto w-full max-w-[1160px] px-6 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow="Upcoming festivals"
            title="The calendar is part of the story."
            copy="Festivals are not just listings. They are moments when Panchmura gathers around the mandir."
            tone="dark"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {siteConfig.events.map((event, index) => (
              <article key={event.slug} className="overflow-hidden border border-white/20 bg-white/[0.06]">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={cfImage(eventImages[index % eventImages.length], imagePresets.gallery(900))}
                    alt={`${event.name} at Tridhara Milan Mandir`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
                    {formatEventDate(event.startDate)} - {formatEventDate(event.endDate)}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-bold text-white">{event.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/74">{event.description}</p>
                  <Link href={event.url} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-accent hover:text-white">
                    View event details
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-temple-paper py-20">
        <div className="mx-auto w-full max-w-[1160px] px-6 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow={faqContent.eyebrow}
            title="Answers before visitors ask."
            copy={faqContent.lead}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {[faqContent.featured, ...faqContent.items.slice(0, 5)].map((item) => (
              <article key={item.question} className="border border-brand-accent/25 bg-neutral-50 p-6 shadow-card">
                <h3 className="font-display text-xl font-bold text-brand-primary">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">{item.answer}</p>
              </article>
            ))}
          </div>
          <Button href="/faqs" variant="primary" size="lg" className="mx-auto mt-10 flex w-fit" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
            View All FAQs
          </Button>
        </div>
      </section>

      <section id="visit" className="bg-neutral-50 py-20">
        <div className="mx-auto w-full max-w-[1160px] px-6 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow="Visit desk"
            title="Everything practical belongs at the end of the story."
            copy="Once the visitor understands the mandir, this section helps them act: call, route, hours, message, or maps."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="border border-brand-accent/25 bg-white p-6 shadow-card">
              <h3 className="font-display text-2xl font-bold text-brand-primary">Send Us a Message</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                Use the form for guest house bookings, seva, services, events, and general guidance.
              </p>
              <div className="mt-6">
                <ContactForm tone="light" />
              </div>
            </div>

            <aside className="grid gap-4">
              <div className="bg-brand-primary p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">Contact</p>
                <div className="mt-5 grid gap-4 text-sm leading-relaxed text-white/78">
                  <a href={`tel:${napContent.phone}`} className="flex gap-3 hover:text-brand-accent">
                    <Phone className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
                    {napContent.phone}
                  </a>
                  <a href={`mailto:${napContent.email}`} className="flex gap-3 hover:text-brand-accent">
                    <Mail className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
                    {napContent.email}
                  </a>
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
                    <span>
                      {napContent.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-brand-accent/25 bg-white p-6">
                <h3 className="font-display text-2xl font-bold text-brand-primary">Opening Hours</h3>
                <div className="mt-4 grid gap-3">
                  {openingHours.map((schedule) => (
                    <div key={schedule.days} className="border-l-2 border-brand-accent pl-3">
                      <p className="text-sm font-bold text-brand-primary">{schedule.days}</p>
                      <p className="text-sm text-neutral-700">{schedule.hours}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden border border-brand-accent/25 bg-white">
                <div className="aspect-[4/3]">
                  <iframe
                    src={siteConfig.map.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Tridhara Milan Mandir Location"
                    className="h-full w-full"
                  />
                </div>
                <div className="grid grid-cols-2 border-t border-brand-accent/20">
                  <Link href={napContent.directionsLink} className="inline-flex items-center justify-center gap-2 border-r border-brand-accent/20 px-3 py-3 text-sm font-bold text-brand-primary hover:bg-brand-light">
                    Directions
                    <Navigation className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href={napContent.mapLink} className="inline-flex items-center justify-center gap-2 px-3 py-3 text-sm font-bold text-brand-primary hover:bg-brand-light">
                    Maps
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
