import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring";

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export function Input(props: ComponentProps<"input">) {
  return <input {...props} className={cn(base, props.className)} />;
}

export function Textarea(props: ComponentProps<"textarea">) {
  return (
    <textarea {...props} className={cn(base, "min-h-32 resize-y", props.className)} />
  );
}

export function Select(props: ComponentProps<"select">) {
  return (
    <select {...props} className={cn(base, "cursor-pointer", props.className)} />
  );
}

/** Seletor de status rascunho/publicado. */
export function StatusField({ value }: { value?: string }) {
  return (
    <Field label="Status">
      <Select name="status" defaultValue={value ?? "draft"}>
        <option value="draft">Rascunho</option>
        <option value="published">Publicado</option>
      </Select>
    </Field>
  );
}
