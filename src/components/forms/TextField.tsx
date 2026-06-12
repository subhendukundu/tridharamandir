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
        "h-12 w-full rounded-md border px-5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-accent",
        tone === "light"
          ? "border-brand-accent/35 bg-neutral-50 text-brand-dark placeholder:text-neutral-500"
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
