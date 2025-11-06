import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { getOgImageUrl } from "@/utils/image";

export const metadata: Metadata = {
  title: "Volunteer at Tridhara Milan Mandir | Serve the Community in Panchmura",
  description:
    "Join our volunteer community at Tridhara Milan Mandir. Serve in temple operations, community outreach, guest services, or educational programs. Make a difference in Panchmura.",
  keywords: [
    "volunteer Panchmura",
    "temple volunteer Bankura",
    "spiritual service",
    "community service",
    "temple volunteer opportunities",
    "Tridhara volunteer",
  ],
  openGraph: {
    title: "Volunteer at Tridhara Milan Mandir | Community Service in Panchmura",
    description:
      "Serve the divine through volunteering at Tridhara Milan Mandir. Join temple services, community outreach, education programs, and more in Panchmura.",
    url: `${siteConfig.url}/volunteer`,
    images: [
      {
        url: getOgImageUrl("/images/tridhara-radha-krishna-mandir.png", siteConfig.url),
        width: 1200,
        height: 630,
        alt: "Volunteer at Tridhara Milan Mandir - Serve the community through spiritual service in Panchmura",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volunteer at Tridhara Milan Mandir",
    description:
      "Serve the community through temple volunteer opportunities in Panchmura, Bankura.",
    images: [
      getOgImageUrl("/images/tridhara-radha-krishna-mandir.png", siteConfig.url),
    ],
  },
};

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-brand-light/10 to-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brand-dark mb-6">
              Volunteer with Us
            </h1>
            <p className="text-lg sm:text-xl text-neutral-700 leading-relaxed">
              Join our community of dedicated volunteers serving at Tridhara Milan Mandir.
              Experience the joy of seva (selfless service) while contributing to temple
              operations, community outreach, and spiritual programs.
            </p>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl text-brand-dark text-center mb-12">
              Why Volunteer?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-brand-light/30 to-brand-secondary/10 rounded-2xl p-6 border border-brand-primary/10">
                <div className="text-3xl mb-4">🙏</div>
                <h3 className="font-semibold text-xl text-brand-primary mb-2">
                  Spiritual Growth
                </h3>
                <p className="text-neutral-700">
                  Deepen your connection with the divine through selfless service and be
                  part of daily temple rituals and sacred traditions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-brand-light/30 to-brand-secondary/10 rounded-2xl p-6 border border-brand-primary/10">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="font-semibold text-xl text-brand-primary mb-2">
                  Community Connection
                </h3>
                <p className="text-neutral-700">
                  Meet like-minded devotees, build lasting friendships, and become part of
                  our temple family serving 2,000+ visitors daily.
                </p>
              </div>

              <div className="bg-gradient-to-br from-brand-light/30 to-brand-secondary/10 rounded-2xl p-6 border border-brand-primary/10">
                <div className="text-3xl mb-4">📚</div>
                <h3 className="font-semibold text-xl text-brand-primary mb-2">
                  Learn & Grow
                </h3>
                <p className="text-neutral-700">
                  Gain knowledge about Hindu traditions, temple management, and develop
                  valuable skills in event coordination and community service.
                </p>
              </div>

              <div className="bg-gradient-to-br from-brand-light/30 to-brand-secondary/10 rounded-2xl p-6 border border-brand-primary/10">
                <div className="text-3xl mb-4">✨</div>
                <h3 className="font-semibold text-xl text-brand-primary mb-2">
                  Make an Impact
                </h3>
                <p className="text-neutral-700">
                  Your service helps maintain temple operations, supports free prasad
                  distribution, and enriches the spiritual lives of thousands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities Section */}
      <section className="py-16 bg-gradient-to-b from-brand-light/5 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl text-brand-dark text-center mb-12">
              Volunteer Opportunities
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h3 className="font-semibold text-lg text-brand-primary mb-2">
                  🛕 Temple Services
                </h3>
                <p className="text-neutral-700">
                  Assist with daily pujas, arati ceremonies, deity decoration, and temple
                  maintenance. Help prepare offerings and coordinate rituals.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h3 className="font-semibold text-lg text-brand-primary mb-2">
                  🎉 Community Outreach & Events
                </h3>
                <p className="text-neutral-700">
                  Support festival organization, cultural programs, and community events
                  like Rath Yatra and Janmashtami. Help with decorations and coordination.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h3 className="font-semibold text-lg text-brand-primary mb-2">
                  👥 Guest Services & Hospitality
                </h3>
                <p className="text-neutral-700">
                  Welcome visitors, assist with darshan bookings, guide tours, manage guest
                  house operations, and ensure comfortable temple visits.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h3 className="font-semibold text-lg text-brand-primary mb-2">
                  📋 Administrative Support
                </h3>
                <p className="text-neutral-700">
                  Help with office tasks, donor management, communication, social media, and
                  website content creation.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h3 className="font-semibold text-lg text-brand-primary mb-2">
                  🍛 Kitchen & Prasad Distribution
                </h3>
                <p className="text-neutral-700">
                  Assist in preparing free prasad for 2,000+ devotees daily. Help with
                  cooking, serving, and maintaining the community kitchen.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h3 className="font-semibold text-lg text-brand-primary mb-2">
                  📖 Teaching & Educational Programs
                </h3>
                <p className="text-neutral-700">
                  Teach Sanskrit, Bhagavad Gita classes, music, or cultural programs for
                  children and adults. Share your knowledge and skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl text-brand-dark mb-4">
                Apply to Volunteer
              </h2>
              <p className="text-lg text-neutral-700">
                Fill out the form below, and we'll contact you with next steps. All levels
                of experience are welcome!
              </p>
            </div>

            <div className="bg-gradient-to-br from-brand-light/20 to-white rounded-2xl p-8 shadow-lg border border-brand-primary/20">
              <VolunteerForm tone="light" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-b from-brand-light/5 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl text-brand-dark mb-6">
              Questions About Volunteering?
            </h2>
            <p className="text-lg text-neutral-700 mb-8">
              Contact our volunteer coordinator for more information about opportunities,
              schedules, and how you can contribute to our temple community.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-neutral-600">Email</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-brand-primary hover:text-brand-secondary font-semibold text-lg"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="text-neutral-600">Phone</p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-brand-primary hover:text-brand-secondary font-semibold text-lg"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
