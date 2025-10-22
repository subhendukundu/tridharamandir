import clsx from "clsx";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { getButtonClasses, type ButtonVariant, type ButtonSize } from "@/foundation/design-system";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  href?: string;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  icon,
  href,
  children,
  ...props
}: ButtonProps) {
  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={clsx(getButtonClasses(variant, size), className)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={clsx(getButtonClasses(variant, size), className)} {...props}>
      {content}
    </button>
  );
}
