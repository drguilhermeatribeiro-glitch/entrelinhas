import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminList } from "@/components/admin/admin-list";

export const dynamic = "force-dynamic";

export default async function AdminCollections() {
  const collections = await prisma.collection.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { items: true } } },
  });

  return (
    <div>
      <AdminPageHeader
        title="Especiais"
        description="Dossiês que agregam conteúdos de vários formatos."
        action={
          <Link
            href="/admin/especiais/novo"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Novo
          </Link>
        }
      />
      <AdminList
        empty="Nenhum especial ainda."
        rows={collections.map((c) => ({
          id: c.id,
          title: c.title,
          meta: `${c._count.items} itens · ${
            c.publishedAt ? formatDate(c.publishedAt) : "sem data"
          }`,
          status: c.status,
          editHref: `/admin/especiais/${c.id}`,
        }))}
      />
    </div>
  );
}
