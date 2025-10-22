import clsx from "clsx";

import { badgeRules } from "@/foundation/design-system";

type BadgeVariant = keyof typeof badgeRules.variants;

type BadgeProps = {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
};

export function Badge({ label, icon, className, variant = "default" }: BadgeProps) {
  const variantTextOverrides: Partial<Record<BadgeVariant, string>> = {
    hero: "text-[10px] tracking-[0.18em]"
  };

  return (
    <span className={clsx(badgeRules.base, badgeRules.variants[variant], className)}>
      {icon}
      <span
        className={clsx(
          badgeRules.text,
          badgeRules.textColors[variant],
          variantTextOverrides[variant]
        )}
      >
        {label}
      </span>
    </span>
  );
}
