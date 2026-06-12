import clsx from "clsx";

// Layout Rules
export const layoutRules = {
  container: "mx-auto w-full max-w-[1160px]",
  pagePadding: "px-6 sm:px-8 lg:px-12",
  sectionY: "py-16 md:py-24 lg:py-32",
  sectionX: "px-6 sm:px-8 lg:px-12",
  gridGap: "gap-8 md:gap-12"
} as const;

// Motion Design Tokens
export const motionRules = {
  // Duration
  fast: "duration-150",
  base: "duration-200",
  slow: "duration-300",
  slower: "duration-500",

  // Easing
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",

  // Transitions
  all: "transition-all",
  colors: "transition-colors",
  opacity: "transition-opacity",
  transform: "transition-transform",
  shadow: "transition-shadow",

  // Reduced Motion (respects user preferences)
  reducedMotion: "motion-reduce:transition-none motion-reduce:transform-none"
} as const;

// Icon Size Scale
export const iconSizes = {
  xs: "h-4 w-4", // 16px
  sm: "h-5 w-5", // 20px
  md: "h-6 w-6", // 24px
  lg: "h-8 w-8", // 32px
  xl: "h-10 w-10", // 40px
} as const;

// Spacing Scale Documentation
export const spacingScale = {
  // Use these standardized gap values
  tight: "gap-4",      // 16px - Compact layouts, form fields
  base: "gap-6",       // 24px - Default section spacing
  comfortable: "gap-8", // 32px - Card grids, feature lists
  spacious: "gap-12",   // 48px - Major section breaks
  loose: "gap-16",      // 64px - Hero to content transition
} as const;

export const surfaceRules = {
  frosted: "glass-panel rounded-lg border border-brand-accent/25 shadow-card",
  panel: "rounded-lg border border-brand-accent/25 bg-neutral-50 shadow-card"
} as const;

export const textRules = {
  badge: "text-xs uppercase tracking-[0.24em] text-brand-secondary font-semibold",
  sectionEyebrow: "text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary",
  label: "text-sm font-medium text-neutral-500",
  body: "text-base text-neutral-700 leading-relaxed",
  subtle: "text-sm text-neutral-600 leading-relaxed",
  heroTitle: "font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-brand-primary leading-[1.02]",
  heroSubtitle: "text-lg sm:text-xl text-neutral-700 max-w-2xl",
  sectionTitle: "font-display text-3xl sm:text-4xl font-semibold text-brand-primary",
  sectionLead: "text-lg sm:text-xl text-neutral-600 max-w-2xl"
} as const;

export const buttonRules = {
  base: "relative inline-flex min-h-11 items-center justify-center gap-2 rounded-md border transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
  primary: "border-brand-primary bg-brand-primary text-white hover:bg-brand-dark focus-visible:outline-brand-primary",
  secondary:
    "border-brand-accent/45 bg-neutral-50 text-brand-primary hover:border-brand-secondary hover:bg-brand-light focus-visible:outline-brand-secondary",
  ghost: "border-white/35 bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white",
  inverted: "border-brand-accent bg-brand-accent text-brand-dark hover:bg-[#c69536] focus-visible:outline-brand-accent",
  outlineOnDark:
    "border-white/65 bg-transparent text-white hover:bg-white hover:text-brand-primary focus-visible:outline-white backdrop-blur"
} as const;

export const buttonSizeRules = {
  md: "px-5 py-3 text-sm font-semibold",
  lg: "px-7 py-3.5 text-base font-semibold"
} as const;

export const linkRules = {
  base: "transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
  underline: "underline hover:text-brand-accent focus-visible:outline-brand-accent",
  onDark: "underline hover:text-brand-accent focus-visible:outline-brand-accent",
  footerNav: "text-white/75 hover:text-brand-accent transition-all duration-200 focus-visible:outline-brand-accent motion-reduce:transition-none",
  social: "flex h-10 w-10 items-center justify-center rounded-md border border-white/30 bg-white/5 text-white transition-all duration-200 hover:bg-white hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
} as const;

export const badgeRules = {
  base: "inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 border px-4 py-1 text-center",
  variants: {
    default: "border-brand-secondary/40 bg-brand-secondary/10",
    onDark: "border-white/30 bg-white/10",
    neutral: "border-brand-accent/40 bg-neutral-50 shadow-card",
    hero:
      "border-brand-secondary/40 bg-white px-3 py-1"
  },
  text: "min-w-0 break-words text-xs font-semibold uppercase leading-relaxed tracking-[0.24em]",
  textColors: {
    default: "text-brand-secondary",
    onDark: "text-white",
    neutral: "text-brand-primary/70",
    hero: "text-white"
  }
} as const;

export const sectionRules = {
  base: clsx(layoutRules.sectionY, layoutRules.sectionX),
  container: clsx(layoutRules.container, "flex flex-col gap-10")
} as const;

export const cardRules = {
  base: "overflow-hidden rounded-lg border border-brand-accent/25 bg-neutral-50 backdrop-blur transition-all duration-300 hover:shadow-card",
  media: "relative aspect-[4/3] overflow-hidden",
  body: "flex flex-col gap-4 p-6"
} as const;

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverted" | "outlineOnDark";
export type ButtonSize = keyof typeof buttonSizeRules;

export const getButtonClasses = (variant: ButtonVariant = "primary", size: ButtonSize = "md") =>
  clsx(buttonRules.base, buttonSizeRules[size], buttonRules[variant]);
