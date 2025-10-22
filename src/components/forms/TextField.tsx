"use client";

import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id: string;
  tone?: "light" | "dark";
};

export function TextField({ className, label, id, tone = "light", ...props }: TextFieldProps) {
  const field = (
    <input
      id={id}
      className={clsx(
        "h-12 w-full rounded-full border px-5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-primary",
        tone === "light"
          ? "border-brand-primary/20 bg-white/95 text-brand-primary placeholder:text-neutral-500"
          : "border-brand-accent/50 bg-white/10 text-white placeholder:text-brand-accent/80",
        className
      )}
      {...props}
    />
  );

  if (!label) {
    return field;
  }

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-brand-primary/80">
      <span>{label}</span>
      {field}
    </label>
  );
}
