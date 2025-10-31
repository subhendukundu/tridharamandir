import Image from "next/image";
import { ArrowRight, Clock, Heart, Users, Calendar } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/config/site";

const serviceIcons = {
  "darshan-and-timings": Clock,
  "bhog-and-prasad": Heart,
  "marriage-and-rituals": Users,
  "donation-and-seva": Calendar
} as const;

export function ServicesSection() {
  return (
    <SectionShell id="services" variant="transparent" className="relative overflow-hidden bg-brand-light">
      <div className="flex flex-col gap-12">
        <SectionHeader
          eyebrow="Our Services"
          eyebrowVariant="text"
          title="Sacred Services & Community Seva"
          description="Experience daily darshan, book life ceremonies, or join our community seva programs that serve 2,000+ devotees daily."
          alignment="center"
          anchorId="services"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {siteConfig.services.map((service) => {
            const Icon = serviceIcons[service.slug as keyof typeof serviceIcons];
            return (
              <div
                key={service.slug}
                className="group relative overflow-hidden rounded-3xl border border-brand-primary/10 bg-neutral-50/80 p-8 shadow-soft/0 transition-all duration-300 hover:border-brand-primary/15 hover:shadow-soft"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-secondary/30 bg-brand-accent/10 text-brand-secondary transition-colors group-hover:bg-brand-secondary group-hover:text-white">
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-xl font-semibold text-brand-primary">
                      {service.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-700">
                      {service.description}
                    </p>
                  </div>

                  <Button
                    href={`/services/${service.slug}`}
                    variant="secondary"
                    size="md"
                    icon={<ArrowRight className="h-4 w-4" />}
                    className="w-fit"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-brand-primary/15 bg-gradient-to-br from-brand-light/30 to-white p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-secondary/40 bg-brand-accent/15 text-brand-secondary">
                <Heart className="h-6 w-6" />
              </div>
              <div className="text-center">
                <h3 className="font-display text-xl font-semibold text-brand-primary">
                  Community Seva
                </h3>
                <p className="text-sm text-neutral-600">
                  Join our anna-daan program serving 2,000+ devotees daily
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                href="mailto:info@tridharamandir.com?subject=Seva%20Inquiry"
                variant="primary"
                size="lg"
                className="bg-brand-primary/95 shadow-soft hover:bg-brand-primary"
              >
                Join Seva
              </Button>
              <Button
                href="/services/donation-and-seva"
                variant="secondary"
                size="lg"
                className="border-brand-primary/30 text-brand-primary hover:bg-brand-light/50"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 rounded-3xl border border-brand-primary/15 bg-gradient-to-br from-brand-light/30 to-white p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-secondary/40 bg-brand-accent/15 text-brand-secondary">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-center">
                <h3 className="font-display text-xl font-semibold text-brand-primary">
                  Need Guidance?
                </h3>
                <p className="text-sm text-neutral-600">
                  Our volunteers are here to help you plan your visit
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                href="mailto:info@tridharamandir.com"
                variant="primary"
                size="lg"
                className="bg-brand-primary/95 shadow-soft hover:bg-brand-primary"
              >
                Contact Us
              </Button>
              <Button
                href="/plan-your-visit"
                variant="secondary"
                size="lg"
                className="border-brand-primary/30 text-brand-primary hover:bg-brand-light/50"
              >
                Plan Your Visit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
