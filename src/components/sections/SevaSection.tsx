import { Heart, BookOpen, Stethoscope, Users, ArrowRight, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { Badge } from "@/components/ui/Badge";

const sevaInitiatives = [
  {
    icon: Heart,
    title: "Anna-Daan Programme",
    description: "Daily meal service feeding 2,000+ devotees through community kitchen operations and prasad distribution.",
    impact: "2,000+ meals daily",
    status: "Active",
    color: "from-red-500/10 to-orange-500/10",
    borderColor: "border-red-200",
    iconColor: "text-red-600"
  },
  {
    icon: BookOpen,
    title: "Education Scholarships",
    description: "Supporting 120+ village students with school supplies, books, and Sanskrit/music training bursaries.",
    impact: "120+ students supported",
    status: "Ongoing",
    color: "from-blue-500/10 to-indigo-500/10",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600"
  },
  {
    icon: Stethoscope,
    title: "Health Camps",
    description: "Quarterly medical check-ups, eye care camps, and health awareness programs for surrounding villages.",
    impact: "500+ patients served",
    status: "Quarterly",
    color: "from-green-500/10 to-emerald-500/10",
    borderColor: "border-green-200",
    iconColor: "text-green-600"
  },
  {
    icon: Users,
    title: "Community Development",
    description: "Infrastructure support, skill development workshops, and women's empowerment programs in rural areas.",
    impact: "15+ villages reached",
    status: "Expanding",
    color: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-200",
    iconColor: "text-purple-600"
  }
];

const volunteerRoles = [
  "Kitchen seva (food preparation & serving)",
  "Educational support (tutoring & mentoring)",
  "Health camp assistance",
  "Temple maintenance & cleaning",
  "Cultural event coordination",
  "Administrative support"
];

export function SevaSection() {
  return (
    <SectionShell id="seva" variant="light">
      <div className="flex flex-col gap-12">
        <SectionHeader
          eyebrow="Community Seva"
          eyebrowVariant="badge"
          title="Serving Beyond the Mandir"
          description="Join Tridhara's seva initiatives that extend compassion and support to surrounding communities through education, healthcare, and social welfare programs."
          alignment="center"
        />

        {/* Seva Initiatives Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {sevaInitiatives.map((initiative, index) => {
            const Icon = initiative.icon;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl border ${initiative.borderColor} bg-gradient-to-br ${initiative.color} p-8 transition-all duration-300 hover:shadow-[0_32px_80px_-60px_rgba(27,10,44,0.35)]`}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${initiative.borderColor} bg-white/80 ${initiative.iconColor}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <Badge 
                      label={initiative.status} 
                      variant="neutral" 
                      className="bg-white/80"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-xl font-semibold text-brand-primary">
                      {initiative.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {initiative.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary">
                      <CheckCircle className="h-4 w-4" />
                      <span>{initiative.impact}</span>
                    </div>
                  </div>

                  <Button
                    href="mailto:info@tridharamandir.com?subject=Seva%20Inquiry"
                    variant="secondary"
                    size="md"
                    icon={<ArrowRight className="h-4 w-4" />}
                    className="w-fit"
                  >
                    Get Involved
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Volunteer Opportunities */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-brand-primary/10 bg-white/80 p-8">
            <h3 className="font-display text-2xl font-semibold text-brand-primary mb-6">
              Volunteer Opportunities
            </h3>
            
            <div className="space-y-4 mb-8">
              {volunteerRoles.map((role, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-brand-primary/30 bg-brand-primary/10 text-xs font-semibold text-brand-primary">
                    {index + 1}
                  </div>
                  <span className="text-sm text-neutral-600">{role}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-brand-primary">Time Commitments</h4>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><strong>Daily Seva:</strong> 2-4 hours (morning or evening)</p>
                <p><strong>Weekly Programs:</strong> 4-6 hours (weekends)</p>
                <p><strong>Special Events:</strong> Full day (festivals & camps)</p>
                <p><strong>Flexible:</strong> Administrative & coordination roles</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-brand-primary/10 bg-gradient-to-br from-brand-light/30 to-white p-8">
            <h3 className="font-display text-2xl font-semibold text-brand-primary mb-6">
              Impact Stories
            </h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-brand-primary/30 pl-4">
                <p className="text-sm italic text-neutral-600 mb-2">
                  "Through Tridhara's education program, my daughter received books and supplies that helped her excel in school. She's now studying Sanskrit and dreams of becoming a teacher."
                </p>
                <p className="text-xs font-semibold text-brand-primary">- Priya M., Panchmura</p>
              </div>
              
              <div className="border-l-4 border-brand-primary/30 pl-4">
                <p className="text-sm italic text-neutral-600 mb-2">
                  "The health camp detected my cataract early. Thanks to Tridhara's medical seva, I received treatment and can see clearly again."
                </p>
                <p className="text-xs font-semibold text-brand-primary">- Ram S., Village Elder</p>
              </div>
              
              <div className="border-l-4 border-brand-primary/30 pl-4">
                <p className="text-sm italic text-neutral-600 mb-2">
                  "Volunteering in the kitchen seva has taught me the joy of serving others. It's become a spiritual practice for my family."
                </p>
                <p className="text-xs font-semibold text-brand-primary">- Anjali K., Volunteer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-brand-primary/15 bg-gradient-to-br from-brand-light/30 to-white p-10">
          <div className="text-center">
            <h3 className="font-display text-2xl font-semibold text-brand-primary mb-3">
              Join Our Seva Family
            </h3>
            <p className="text-neutral-600 max-w-2xl">
              Whether you can spare a few hours or want to make a long-term commitment, 
              there's a seva opportunity that matches your interests and availability. 
              Together, we can make a meaningful difference in our community.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              href="mailto:info@tridharamandir.com?subject=Volunteer%20Application"
              variant="primary"
              size="lg"
            >
              Become a Volunteer
            </Button>
            <Button
              href="mailto:info@tridharamandir.com?subject=Donation%20Inquiry"
              variant="secondary"
              size="lg"
            >
              Support Our Work
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
