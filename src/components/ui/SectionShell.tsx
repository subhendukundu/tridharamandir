import clsx from "clsx";
import type { ReactNode } from "react";

import { layoutRules } from "@/foundation/design-system";

type SectionShellProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  variant?: "light" | "muted" | "contrast" | "transparent";
};

export function SectionShell({
  id,
  className,
  children,
  variant = "light"
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={clsx(
        layoutRules.sectionY,
        layoutRules.sectionX,
        {
          light: "bg-white",
          muted: "bg-white",
          contrast: "bg-brand-dark text-white",
          transparent: ""
        }[variant],
        className
      )}
    >
      <div className={clsx(layoutRules.container, "relative flex flex-col gap-12")}>{children}</div>
    </section>
  );
}
