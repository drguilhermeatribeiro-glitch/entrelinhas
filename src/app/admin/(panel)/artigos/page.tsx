import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { subjectName } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminList } from "@/components/admin/admin-list";

export const dynamic = "force-dynamic";

export default async function AdminArticles() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminPageHeader
        title="Artigos"
        action={
          <Link
            href="/admin/artigos/novo"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Novo
          </Link>
        }
      />
      <AdminList
        empty="Nenhum artigo ainda. Crie o primeiro."
        rows={articles.map((a) => ({
          id: a.id,
          title: a.title,
          meta: `${subjectName(a.subject)} · ${
            a.publishedAt ? formatDate(a.publishedAt) : "sem data"
          }`,
          status: a.status,
          editHref: `/admin/artigos/${a.id}`,
        }))}
      />
    </div>
  );
}
