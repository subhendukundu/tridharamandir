"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import clsx from "clsx";
import { UseFormRegister, FieldError } from "react-hook-form";

type BaseFieldProps = {
  label?: string;
  id: string;
  error?: FieldError;
  tone?: "light" | "dark";
};

// Input Field
type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & BaseFieldProps;

export function InputField({
  className,
  label,
  id,
  error,
  tone = "light",
  ...props
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            "text-sm font-semibold",
            tone === "light" ? "text-brand-primary/80" : "text-white/90"
          )}
        >
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        className={clsx(
          "h-12 w-full rounded-xl border px-4 text-sm font-medium transition",
          "focus:outline-none focus:ring-2 focus:ring-brand-primary/50",
          tone === "light"
            ? "border-neutral-300 bg-white text-brand-primary placeholder:text-neutral-400"
            : "border-brand-accent/50 bg-white/10 text-white placeholder:text-brand-accent/80",
          error && "border-red-500 focus:ring-red-500/50",
          className
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
}

// Textarea Field
type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & BaseFieldProps;

export function TextareaField({
  className,
  label,
  id,
  error,
  tone = "light",
  ...props
}: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            "text-sm font-semibold",
            tone === "light" ? "text-brand-primary/80" : "text-white/90"
          )}
        >
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={id}
        className={clsx(
          "w-full rounded-xl border px-4 py-3 text-sm font-medium transition min-h-[120px]",
          "focus:outline-none focus:ring-2 focus:ring-brand-primary/50",
          tone === "light"
            ? "border-neutral-300 bg-white text-brand-primary placeholder:text-neutral-400"
            : "border-brand-accent/50 bg-white/10 text-white placeholder:text-brand-accent/80",
          error && "border-red-500 focus:ring-red-500/50",
          className
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
}

// Select Field
type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & BaseFieldProps;

export function SelectField({
  className,
  label,
  id,
  error,
  tone = "light",
  children,
  ...props
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            "text-sm font-semibold",
            tone === "light" ? "text-brand-primary/80" : "text-white/90"
          )}
        >
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        className={clsx(
          "h-12 w-full rounded-xl border px-4 text-sm font-medium transition",
          "focus:outline-none focus:ring-2 focus:ring-brand-primary/50",
          tone === "light"
            ? "border-neutral-300 bg-white text-brand-primary"
            : "border-brand-accent/50 bg-white/10 text-white",
          error && "border-red-500 focus:ring-red-500/50",
          className
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
}
