import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminList } from "@/components/admin/admin-list";

export const dynamic = "force-dynamic";

export default async function AdminHighlights() {
  const highlights = await prisma.highlight.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <AdminPageHeader
        title="Destaques"
        description="Slides do carrossel da página inicial."
        action={
          <Link
            href="/admin/destaques/novo"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Novo
          </Link>
        }
      />
      <AdminList
        empty="Nenhum destaque ainda. Crie o primeiro slide."
        rows={highlights.map((h) => ({
          id: h.id,
          title: h.title,
          meta: `Ordem ${h.order}${h.subtitle ? ` · ${h.subtitle}` : ""}`,
          status: h.status,
          editHref: `/admin/destaques/${h.id}`,
        }))}
      />
    </div>
  );
}
