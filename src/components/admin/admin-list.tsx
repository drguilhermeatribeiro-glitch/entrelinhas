import Link from "next/link";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminRow = {
  id: string;
  title: string;
  meta?: string;
  status: string;
  editHref: string;
};

export function AdminList({
  rows,
  empty,
}: {
  rows: AdminRow[];
  empty: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-border p-10 text-center text-muted-foreground">
        {empty}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-card border border-border bg-card">
      <ul className="divide-y divide-border">
        {rows.map((row) => (
          <li
            key={row.id}
            className="flex items-center justify-between gap-4 px-5 py-4"
          >
            <div className="min-w-0">
              <Link
                href={row.editHref}
                className="block truncate font-medium hover:text-accent"
              >
                {row.title}
              </Link>
              {row.meta && (
                <p className="truncate text-xs text-muted-foreground">
                  {row.meta}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <StatusBadge status={row.status} />
              <Link
                href={row.editHref}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Pencil className="h-3.5 w-3.5" /> Editar
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const published = status === "published";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        published
          ? "bg-green-500/15 text-green-700 dark:text-green-400"
          : "bg-muted text-muted-foreground"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          published ? "bg-green-500" : "bg-muted-foreground/50"
        )}
      />
      {published ? "Publicado" : "Rascunho"}
    </span>
  );
}
