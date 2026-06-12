"use client";

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";
import clsx from "clsx";
import { FieldError } from "react-hook-form";

type BaseFieldProps = {
  label?: string;
  id: string;
  error?: FieldError;
  tone?: "light" | "dark";
  helpText?: string;
};

// Input Field
type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & BaseFieldProps;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    className,
    label,
    id,
    error,
    tone = "light",
    helpText,
    ...props
  },
  ref
) {
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
        ref={ref}
        id={id}
        className={clsx(
          "h-12 w-full rounded-md border px-4 text-sm font-medium transition",
          "focus:outline-none focus:ring-2 focus:ring-brand-accent/50",
          tone === "light"
            ? "border-brand-accent/35 bg-neutral-50 text-brand-dark placeholder:text-neutral-500"
            : "border-brand-accent/50 bg-white/10 text-white placeholder:text-brand-accent/80",
          error && "border-red-500 focus:ring-red-500/50",
          className
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {helpText && !error && (
        <p className={clsx(
          "text-xs",
          tone === "light" ? "text-neutral-600" : "text-neutral-400"
        )}>
          {helpText}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
});

// Textarea Field
type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & BaseFieldProps;

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(function TextareaField(
  {
    className,
    label,
    id,
    error,
    tone = "light",
    helpText,
    ...props
  },
  ref
) {
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
        ref={ref}
        id={id}
        className={clsx(
          "min-h-[120px] w-full rounded-md border px-4 py-3 text-sm font-medium transition",
          "focus:outline-none focus:ring-2 focus:ring-brand-accent/50",
          tone === "light"
            ? "border-brand-accent/35 bg-neutral-50 text-brand-dark placeholder:text-neutral-500"
            : "border-brand-accent/50 bg-white/10 text-white placeholder:text-brand-accent/80",
          error && "border-red-500 focus:ring-red-500/50",
          className
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {helpText && !error && (
        <p className={clsx(
          "text-xs",
          tone === "light" ? "text-neutral-600" : "text-neutral-400"
        )}>
          {helpText}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
});

// Select Field
type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & BaseFieldProps;

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  {
    className,
    label,
    id,
    error,
    tone = "light",
    children,
    ...props
  },
  ref
) {
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
        ref={ref}
        id={id}
        className={clsx(
          "h-12 w-full rounded-md border px-4 text-sm font-medium transition",
          "focus:outline-none focus:ring-2 focus:ring-brand-accent/50",
          tone === "light"
            ? "border-brand-accent/35 bg-neutral-50 text-brand-dark"
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
});
