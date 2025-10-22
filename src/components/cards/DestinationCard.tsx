import Image from "next/image";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

import { Button } from "@/components/ui/Button";
import { cardRules } from "@/foundation/design-system";

type DestinationCardProps = {
  title: string;
  description: string;
  duration: string;
  image: string;
  href: string;
};

export function DestinationCard({ title, description, duration, image, href }: DestinationCardProps) {
  return (
    <article className={clsx(cardRules.base, "flex flex-col bg-white/95")}>
      <div className={clsx(cardRules.media)}>
        <Image
          src={image}
          alt={title}
          fill
          loading="lazy"
          sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/25 to-transparent" />
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-brand-primary">
          <span className="h-2 w-2 rounded-full bg-brand-secondary" />
          {duration}
        </span>
      </div>
      <div className={clsx(cardRules.body, "flex-1")}>
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-2xl text-neutral-900">{title}</h3>
          <p className="text-sm text-neutral-600">{description}</p>
        </div>
        <div className="mt-6">
          <Button
            href={href}
            variant="primary"
            className="w-full justify-between"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Discover Details
          </Button>
        </div>
      </div>
    </article>
  );
}
