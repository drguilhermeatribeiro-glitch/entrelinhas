import { cn } from "@/lib/utils";

/**
 * Símbolo "E" da logomarca ENTRELINHAS — geometria vetorial oficial.
 * O bloco preto usa `currentColor` (inverte no tema escuro); a barra usa o
 * vermelho da marca via token --accent.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 840 1296"
      className={className}
      role="img"
      aria-label="Entrelinhas"
    >
      {/* Monograma "E" */}
      <path
        d="M340.06 319.95 L340.06 500.83 L751.67 500.83 L751.67 787.81 L0 787.81 L0 0 L840 0 L840 319.95 Z"
        fill="currentColor"
      />
      {/* Barra vermelha (assinatura da marca) */}
      <rect x="0" y="973.54" width="840" height="322.38" fill="var(--accent)" />
    </svg>
  );
}

/**
 * Lockup horizontal: símbolo + wordmark "ENTRELINHAS".
 * `variant="mark"` mostra só o símbolo.
 */
export function BrandLogo({
  className,
  variant = "full",
  markClassName = "h-7 w-auto",
}: {
  className?: string;
  variant?: "full" | "mark";
  markClassName?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-foreground",
        className
      )}
    >
      <BrandMark className={markClassName} />
      {variant === "full" && (
        <span className="font-sans text-xl font-extrabold uppercase tracking-tight leading-none">
          Entrelinhas
        </span>
      )}
    </span>
  );
}
