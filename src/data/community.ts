export type Programme = {
  slug: string;
  title: string;
  description: string;
  impact: string;
  stats: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const programmes: Programme[] = [
  {
    slug: "anna-daan",
    title: "Anna-Daan Kitchen",
    description:
      "Daily mid-day prasadam prepared with seasonal produce and terracotta handi vessels, supporting pilgrims and neighbouring families.",
    impact: "2,000+ plates served daily",
    stats: [
      "Started with 600 daily plates in 2022 and scaled through donor pledges",
      "Volunteer rota rotates morning prep and serving shifts",
      "Bulk staples sourced from Panchmura and Bishnupur farmers"
    ],
    ctaLabel: "Sponsor Meals",
    ctaHref: "/services/bhog-and-prasad"
  },
  {
    slug: "scholarships",
    title: "Scholarship Circles",
    description:
      "Education bursaries for village students studying Sanskrit, music, and STEM, paired with mentoring by visiting alumni.",
    impact: "120+ students receive annual support",
    stats: [
      "Includes book grants, exam-prep workshops, and travel stipends",
      "Mentoring circles run every second Saturday at the Vrindavan Sabha",
      "Partnerships with Bishnupur music academies and Bankura colleges"
    ],
    ctaLabel: "Support Students",
    ctaHref: "mailto:info@tridharamandir.com?subject=Scholarship%20Support"
  },
  {
    slug: "health-camps",
    title: "Mobile Health Camps",
    description:
      "Quarterly medical outreach covering eye check-ups, basic diagnostics, and Ayurveda consultations across 15 Panchmura villages.",
    impact: "500+ patients served per camp",
    stats: [
      "Volunteer doctors from Kolkata and Durgapur join weekend drives",
      "Camp data feeds quarterly impact sheets for donors",
      "Emergency referrals coordinated with Bankura district hospital"
    ],
    ctaLabel: "Join Health Seva",
    ctaHref: "mailto:info@tridharamandir.com?subject=Health%20Camp%20Volunteer"
  }
] as const;

export const volunteerSteps = [
  {
    title: "Submit Seva Interest",
    detail:
      "Share your preferred programme, skills, and date availability. A seva lead responds within two business days."
  },
  {
    title: "Attend Orientation",
    detail:
      "On-site walkthrough of kitchen, sabha hall, and storage spaces. Includes safety briefing and accessibility protocols."
  },
  {
    title: "Serve & Reflect",
    detail:
      "Complete at least two seva shifts and log learnings for quarterly community impact circles."
  }
] as const;
