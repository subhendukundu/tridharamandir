"use client";

import { Calendar, MapPin, Users, Clock, Camera, Heart, Languages, Accessibility } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { iconSizes } from "@/foundation/design-system";

const quickFacts = [
  {
    icon: Calendar,
    label: "Founded",
    value: "2022",
    detail: "Consecrated 1 July"
  },
  {
    icon: Heart,
    label: "Primary Deity",
    value: "Radha-Krishna",
    detail: "With Kali, Mahadev, Rama-Sita, Hanuman, Chaitanya"
  },
  {
    icon: Users,
    label: "Daily Visitors",
    value: "2,000+",
    detail: "Anna-daan count"
  },
  {
    icon: Calendar,
    label: "Annual Festivals",
    value: "12+",
    detail: "Including Rath Yatra, Janmashtami, Navaratri"
  },
  {
    icon: MapPin,
    label: "Architectural Style",
    value: "Nagara",
    detail: "North Indian, 45-foot shikhara"
  },
  {
    icon: Languages,
    label: "Languages",
    value: "Bengali, Hindi, English",
    detail: "Multilingual guidance"
  },
  {
    icon: Accessibility,
    label: "Accessibility",
    value: "Wheelchair Accessible",
    detail: "Eastern gate entrance"
  },
  {
    icon: Camera,
    label: "Photography",
    value: "Allowed",
    detail: "Courtyards only, no flash"
  },
  {
    icon: Heart,
    label: "Entry Fee",
    value: "Free",
    detail: "Donations welcome"
  },
  {
    icon: Clock,
    label: "Open Daily",
    value: "5:00 AM - 9:00 PM",
    detail: "Extended hours on weekends"
  }
];

export function QuickFactsSection() {
  return (
    <SectionShell variant="transparent" className="bg-brand-light">
      <SectionHeader
        eyebrow="At a Glance"
        title="Quick Facts About Tridhara Milan Mandir"
        description="Essential information for planning your visit to West Bengal's most unique temple."
      />

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {quickFacts.map((fact, index) => {
          const Icon = fact.icon;
          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-brand-accent/20 hover:shadow-md motion-reduce:transition-none motion-reduce:transform-none"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/10 transition-colors duration-300 group-hover:bg-brand-accent/20 motion-reduce:transition-none">
                <Icon className={iconSizes.md + " text-brand-accent"} />
              </div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
                {fact.label}
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-brand-primary">
                {fact.value}
              </p>
              <p className="mt-1 text-sm text-neutral-600">{fact.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Unique Feature Highlight */}
      <div className="mt-12 rounded-3xl border-2 border-brand-accent/20 bg-gradient-to-br from-brand-light/30 to-white p-8 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-accent">
            <Heart className={iconSizes.lg + " text-brand-dark"} />
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold text-brand-primary">
              What Makes Tridhara Unique?
            </h3>
            <p className="mt-3 text-lg leading-relaxed text-brand-primary">
              Tridhara Milan Mandir is the <strong>only temple in India</strong> where Shaiva (Shiva), Vaishnava (Vishnu), and Shakta (Devi) worship occur in a single integrated arati ceremony. This unique 90-minute evening ritual (7:00-8:30 PM daily) symbolizes the philosophical unity of Hindu traditions—a living practice found nowhere else in Bengal.
            </p>
            <p className="mt-3 text-sm italic text-neutral-600">
              Devotees affectionately call Tridhara the &ldquo;Second Vrindavan&rdquo; for its Vrindavan-inspired architecture and integrated worship approach.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
