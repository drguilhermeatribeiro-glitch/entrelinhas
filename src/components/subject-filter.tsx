import Link from "next/link";
import { SUBJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Chips de filtro por assunto. `active` é o slug atualmente selecionado. */
export function SubjectFilter({
  basePath,
  active,
}: {
  basePath: string;
  active?: string;
}) {
  const chip = (href: string, label: string, isActive: boolean) => (
    <Link
      key={href}
      href={href}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        isActive
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex flex-wrap gap-2">
      {chip(basePath, "Todos", !active)}
      {SUBJECTS.map((s) =>
        chip(`${basePath}?assunto=${s.slug}`, s.name, active === s.slug)
      )}
    </div>
  );
}
