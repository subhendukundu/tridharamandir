import clsx from "clsx";

import { textRules } from "@/foundation/design-system";
import { Badge } from "@/components/ui/Badge";
import { AnchorHeading } from "@/components/ui/AnchorHeading";

type SectionHeaderProps = {
  eyebrow?: string;
  eyebrowVariant?: "text" | "badge";
  title: string;
  description?: string;
  alignment?: "start" | "center";
  className?: string;
  tone?: "default" | "light";
  /** Optional ID for anchor link functionality */
  anchorId?: string;
};

export function SectionHeader({
  eyebrow,
  eyebrowVariant = "text",
  title,
  description,
  alignment = "start",
  className,
  tone = "default",
  anchorId
}: SectionHeaderProps) {
  const isLight = tone === "light";
  return (
    <header
      className={clsx(
        "flex flex-col gap-4",
        alignment === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        eyebrowVariant === "badge" ? (
          <Badge label={eyebrow} variant="neutral" />
        ) : (
          <span
            className={clsx(
              textRules.sectionEyebrow,
              isLight && "text-brand-accent"
            )}
          >
            {eyebrow}
          </span>
        )
      ) : null}
      {anchorId ? (
        <AnchorHeading
          id={anchorId}
          level={2}
          className={clsx(
            textRules.sectionTitle,
            "max-w-[30ch]",
            isLight && "text-white"
          )}
        >
          {title}
        </AnchorHeading>
      ) : (
        <h2
          className={clsx(
            textRules.sectionTitle,
            "max-w-[30ch]",
            isLight && "text-white"
          )}
        >
          {title}
        </h2>
      )}
      {description ? (
        <p
          className={clsx(
            textRules.sectionLead,
            "max-w-[60ch]",
            isLight && "text-white/80"
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
