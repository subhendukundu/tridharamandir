import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site";
import { napContent, visitContent } from "@/data/content";

export function ContactSection() {
  const openingHours = napContent.hours.map((span) => ({
    days: span.dayOfWeek.join(", "),
    hours: `${span.opens} - ${span.closes}`
  }));

  return (
    <SectionShell
      id="visit"
      variant="transparent"
      className="bg-gradient-to-b from-neutral-100 via-brand-light/50 to-brand-dark/85"
    >
      <div className="flex flex-col gap-12">
        <SectionHeader
          eyebrow={visitContent.eyebrow}
          eyebrowVariant="badge"
          title={visitContent.title}
          description={visitContent.description}
          alignment="center"
          anchorId="visit"
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-brand-primary/10 bg-white/80 p-8">
              <h3 className="font-display text-xl font-semibold text-brand-primary mb-2">
                Send Us a Message
              </h3>
              <p className="text-sm text-neutral-600 mb-6">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
              <ContactForm tone="light" />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="rounded-3xl border border-brand-primary/10 bg-white/80 p-8">
              <h3 className="font-display text-xl font-semibold text-brand-primary mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-primary mb-1">Address</h4>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {napContent.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-primary mb-1">Phone</h4>
                    <p className="text-sm text-neutral-600">{napContent.phone}</p>
                    <Button href={`tel:${napContent.phone}`} variant="secondary" size="md" className="mt-2">
                      Call Now
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-primary mb-1">Email</h4>
                    <p className="text-sm text-neutral-600">{napContent.email}</p>
                    <Button href={`mailto:${napContent.email}`} variant="secondary" size="md" className="mt-2">
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="rounded-3xl border border-brand-primary/10 bg-white/80 p-8">
              <h3 className="font-display text-xl font-semibold text-brand-primary mb-6">
                Opening Hours
              </h3>
              
              <div className="space-y-4">
                {openingHours.map((schedule, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-brand-primary">{schedule.days}</p>
                      <p className="text-sm text-neutral-600">{schedule.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Map and Directions */}
        <div className="grid gap-8 lg:grid-cols-2 mt-8">
          <div className="rounded-3xl border border-brand-primary/10 bg-white/80 p-8">
            <h3 className="font-display text-xl font-semibold text-brand-primary mb-6">
              Location & Directions
            </h3>

            <div className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-2xl bg-brand-light/30">
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

              <div className="space-y-4">
                <h4 className="font-semibold text-brand-primary">How to Reach</h4>
                <div className="space-y-3 text-sm text-neutral-600">
                  <p><strong>From Bishnupur:</strong> 30 km by road (45 minutes)</p>
                  <p><strong>From Bankura:</strong> 45 km by road (1 hour)</p>
                  <p><strong>Public Transport:</strong> Local buses and shared trekkers available</p>
                  <p><strong>Parking:</strong> Limited street parking available nearby (not managed by temple)</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  href={napContent.directionsLink}
                  variant="primary"
                  size="lg"
                  icon={<Navigation className="h-4 w-4" />}
                  className="w-full"
                >
                  Get Directions
                </Button>
                <Button href={napContent.mapLink} variant="secondary" size="lg" className="w-full">
                  Open in Google Maps
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-3xl border border-brand-primary/10 bg-gradient-to-br from-brand-light/30 to-white p-8">
            <h3 className="font-display text-xl font-semibold text-brand-primary mb-6">
              Quick Actions
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Button
                href="/plan-your-visit"
                variant="secondary"
                size="md"
                className="w-full"
              >
                Visitor Guide
              </Button>
              <Button
                href="/services"
                variant="secondary"
                size="md"
                className="w-full"
              >
                Book Services
              </Button>
              <Button
                href="/events"
                variant="secondary"
                size="md"
                className="w-full"
              >
                View Events
              </Button>
              <Button
                href="/#faq"
                variant="secondary"
                size="md"
                className="w-full"
              >
                FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
