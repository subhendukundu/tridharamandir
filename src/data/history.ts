import { siteConfig } from "@/config/site";

export type HistoryMilestone = {
  period: string;
  title: string;
  description: string;
  highlight?: string;
};

export type RitualEntry = {
  time: string;
  title: string;
  details: string;
};

export type HeritageHighlight = {
  title: string;
  description: string;
};

export const historyIntro = {
  eyebrow: "Temple Chronicle",
  title: "Tracing Tridhara’s Journey",
  description:
    "From community land offerings to the 2022 consecration, Tridhara Milan Mandir rises as a shared devotion across Shaiva, Vaishnava, and Shakta streams."
} as const;

export const nicknameExplainer = {
  title: "Why Devotees say “Second Vrindavan”",
  description:
    "Pilgrims coined the affectionate nickname after experiencing Vrindavan-inspired murals, tulsi courtyards, and integrated arati where Radha-Krishna, Mahadev, and Devi worship share the same mandapa. The temple regards it as a blessing, not an official title.",
  highlights: [
    {
      label: "Architecture",
      value: "Nagara-style shikhara with Vrindavan sabha courtyard"
    },
    {
      label: "Integrated Arati",
      value: "Shaiva trishul, Vaishnava chakra, and Shakta shankha offerings"
    },
    {
      label: "Community Seva",
      value: "Scholarships, anna-daan, and heritage music gurukuls"
    }
  ]
} as const;

export const historyTimeline: HistoryMilestone[] = [
  {
    period: "2012 – 2016",
    title: "Community Visioning Circles",
    description:
      "Local devotees, artisans, and diaspora patrons pledged to build a campus that celebrates Shaiva, Vaishnava, and Shakta traditions together. Early gatherings took place in Panchmura’s terracotta craft guild halls."
  },
  {
    period: "2016 – 2019",
    title: "Land Stewardship & Design Charrettes",
    description:
      "Trustees acquired the temple plot and commissioned architects to blend Nagara-style shikhara with Vrindavan courtyard planning. Musicians and mural artists documented oral histories for future installations."
  },
  {
    period: "2020 – 2021",
    title: "Construction & Seva Mobilisation",
    description:
      "Despite pandemic slowdowns, volunteers organised anna-daan and medical drives for nearby villages while artisans carved marble murtis and teak doors.",
    highlight: "The anna-daan kitchen scaled from 600 to 1,200 prasadam plates per day."
  },
  {
    period: "1 July 2022",
    title: "Consecration on Rath Yatra",
    description:
      "Tridhara Milan Mandir was officially consecrated on Rath Yatra with chariot processions, integrated Tridhara arati, and the inaugural Vrindavan Sabha storytelling circle."
  },
  {
    period: "2023 – Present",
    title: "Community Outreach & Heritage Programmes",
    description:
      "Scholarship stipends, health camps, and archival kirtan recordings expanded. Annual Rath Yatra, Janmashtami, and Navaratri now welcome thousands of pilgrims.",
    highlight: "Temple guides now host bilingual tours in Bengali, Hindi, and English."
  }
] as const;

export const ritualSchedule: RitualEntry[] = [
  {
    time: "05:00 AM",
    title: "Mangal Arati & Tulsi Parikrama",
    details: "Priests commence the day with Govinda nama sankirtan while devotees circumambulate the tulsi courtyard."
  },
  {
    time: "08:30 AM",
    title: "Raj-Bhog Preparation",
    details: "Women’s seva mandali prepares bhog offerings with terracotta handi and seasonal produce from community farms."
  },
  {
    time: "12:30 PM",
    title: "Anna-Daan & Prasad Seva",
    details: "Up to 2,000 plates of khichuri, sabji, and payesh are served daily with volunteers assisting elders and travellers."
  },
  {
    time: "06:30 PM",
    title: "Tridhara Sandhya Arati",
    details: "Shaiva damru, Vaishnava mridanga, and Devi ululation flow in a single arati culminating before Radha-Krishna and Kali."
  },
  {
    time: "08:00 PM",
    title: "Vrindavan Sabha Katha",
    details: "Storytellers narrate Krishna lila and Panchmura folklore, reinforcing the temple’s “Second Vrindavan” devotion."
  }
] as const;

export const heritageHighlights: HeritageHighlight[] = [
  {
    title: "Terracotta & Tulsi Courtyards",
    description:
      "Handcrafted terracotta reliefs by Panchmura artisans flank the tulsi mancha, linking the mandir to the craft heritage of Bankura."
  },
  {
    title: "Inclusive Sabha Mandapa",
    description:
      "The sabha hall hosts Shaiva Rudrabhishek, Vaishnava bhajans, and Shakta Lalita Sahasranama recitations without separate scheduling silos."
  },
  {
    title: "Seva Fellowship",
    description:
      "College and NSS volunteers document rituals, oral histories, and anna-daan metrics, ensuring transparent reporting for donors."
  }
] as const;

export const directionsCta = {
  label: "Plan Your Visit",
  href: "/plan-your-visit",
  description: `Find transport guidance, lodging suggestions, and accessibility support for ${siteConfig.name}.`
} as const;
