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
  frosted: "glass-panel rounded-3xl border border-white/30 shadow-[0_32px_80px_-60px_rgba(27,10,44,0.45)]",
  panel: "rounded-3xl bg-white shadow-[0_32px_80px_-60px_rgba(27,10,44,0.45)]"
} as const;

export const textRules = {
  badge: "text-xs uppercase tracking-[0.3em] text-brand-secondary font-semibold",
  sectionEyebrow: "text-sm font-semibold uppercase tracking-[0.3em] text-brand-secondary",
  label: "text-sm font-medium text-neutral-500",
  body: "text-base text-neutral-600 leading-relaxed",
  subtle: "text-sm text-neutral-500 leading-relaxed",
  heroTitle: "font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.15]",
  heroSubtitle: "text-lg sm:text-xl text-white max-w-xl",
  sectionTitle: "font-display text-3xl sm:text-4xl font-semibold text-brand-primary",
  sectionLead: "text-lg sm:text-xl text-neutral-600 max-w-2xl"
} as const;

export const buttonRules = {
  base: "relative inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
  primary: "bg-brand-primary text-white hover:bg-brand-primary/90 focus-visible:outline-brand-primary active:scale-95",
  secondary:
    "border border-brand-primary/20 bg-white text-brand-primary hover:bg-brand-light/40 focus-visible:outline-brand-secondary active:scale-95",
  ghost: "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white active:scale-95",
  inverted: "bg-brand-accent text-brand-dark hover:bg-brand-accent/90 focus-visible:outline-brand-accent active:scale-95",
  outlineOnDark:
    "border border-white/30 bg-transparent text-white hover:border-white/60 focus-visible:outline-white backdrop-blur active:scale-95"
} as const;

export const buttonSizeRules = {
  md: "px-5 py-3 text-sm font-semibold",
  lg: "px-7 py-3.5 text-base font-semibold"
} as const;

export const linkRules = {
  base: "transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
  underline: "underline hover:text-brand-accent focus-visible:outline-brand-accent",
  onDark: "underline hover:text-brand-accent focus-visible:outline-brand-accent",
  footerNav: "text-white/75 hover:text-brand-accent hover:translate-x-1 transition-all duration-200 focus-visible:outline-brand-accent motion-reduce:transition-none",
  social: "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-200 hover:bg-white/20 hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 motion-reduce:transition-none"
} as const;

export const badgeRules = {
  base: "inline-flex items-center gap-2 rounded-full px-4 py-1",
  variants: {
    default: "border border-brand-secondary/40 bg-brand-secondary/10",
    onDark: "border border-white/30 bg-white/10",
    neutral: "border border-brand-primary/10 bg-white/70 shadow-[0_10px_30px_-20px_rgba(27,10,44,0.35)]",
    hero:
      "border border-white/20 bg-gradient-to-r from-white/20 via-white/10 to-transparent px-3 py-1 shadow-[0_18px_42px_-28px_rgba(12,5,20,0.65)]"
  },
  text: "text-xs font-semibold uppercase tracking-[0.3em]",
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
  base: "rounded-3xl overflow-hidden border border-brand-primary/10 bg-white/85 backdrop-blur transition-all duration-300 hover:shadow-[0_32px_80px_-60px_rgba(27,10,44,0.45)] hover:scale-[1.02] hover:-translate-y-1",
  media: "relative aspect-[4/3] overflow-hidden",
  body: "flex flex-col gap-4 p-6"
} as const;

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverted" | "outlineOnDark";
export type ButtonSize = keyof typeof buttonSizeRules;

export const getButtonClasses = (variant: ButtonVariant = "primary", size: ButtonSize = "md") =>
  clsx(buttonRules.base, buttonSizeRules[size], buttonRules[variant]);
