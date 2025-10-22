import Image from "next/image";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { Badge } from "@/components/ui/Badge";
import { eventsContent } from "@/data/events";

export function EventsSection() {
  return (
    <SectionShell id="events" variant="muted" className="bg-gradient-to-br from-brand-light/30 via-white to-brand-light/20">
      <div className="flex flex-col gap-12">
        <SectionHeader
          eyebrow="Festivals & Events"
          eyebrowVariant="badge"
          title="Celebrate with Tridhara"
          description="Join us for sacred festivals, cultural celebrations, and community gatherings that bring devotees together in devotion and joy."
          alignment="center"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {eventsContent.map((event) => (
            <div
              key={event.slug}
              className="group relative overflow-hidden rounded-3xl border border-brand-primary/10 bg-white/90 p-8 transition-all duration-300 hover:border-brand-primary/20 hover:shadow-[0_32px_80px_-60px_rgba(27,10,44,0.35)]"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <Badge label="Upcoming Festival" variant="default" />
                    <h3 className="font-display text-2xl font-semibold text-brand-primary">
                      {event.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <Clock className="h-4 w-4" />
                    <span>
                      {new Date(event.startDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric' 
                      })}
                      {event.startDate !== event.endDate && (
                        <> - {new Date(event.endDate).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric' 
                        })}</>
                      )}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <MapPin className="h-4 w-4" />
                    <span>Tridhara Milan Mandir, Panchmura</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-brand-primary">Schedule Highlights</h4>
                  <div className="space-y-2">
                    {event.timetable.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-brand-primary/30 bg-brand-primary/10 text-xs font-semibold text-brand-primary">
                          {index + 1}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-brand-primary">{item.time}</span>
                          <span className="text-neutral-600">{item.activity}</span>
                        </div>
                      </div>
                    ))}
                    {event.timetable.length > 3 && (
                      <p className="text-xs text-neutral-500">
                        +{event.timetable.length - 3} more activities
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  href={`/events#${event.slug}`}
                  variant="secondary"
                  size="md"
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="w-fit"
                >
                  View Full Schedule
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 rounded-3xl border border-brand-primary/15 bg-white/90 p-10">
          <div className="text-center">
            <h3 className="font-display text-2xl font-semibold text-brand-primary mb-3">
              Stay Updated
            </h3>
            <p className="text-neutral-600 max-w-2xl">
              Get notified about upcoming festivals, special darshan timings, and community events. 
              Join our newsletter to never miss a celebration.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              href="/events"
              variant="primary"
              size="lg"
            >
              View All Events
            </Button>
            <Button href="/#cta" variant="secondary" size="lg">
              Subscribe to Updates
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
