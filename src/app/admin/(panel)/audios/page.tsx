import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminList } from "@/components/admin/admin-list";

export const dynamic = "force-dynamic";

export default async function AdminAudios() {
  const audios = await prisma.audioTrack.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminPageHeader
        title="Áudios"
        description="Canções (playlist) e episódios (podcast)."
        action={
          <Link
            href="/admin/audios/novo"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Novo
          </Link>
        }
      />
      <AdminList
        empty="Nenhum áudio ainda."
        rows={audios.map((a) => ({
          id: a.id,
          title: a.title,
          meta: `${a.kind === "podcast" ? "Podcast" : "Canção"} · ${
            a.publishedAt ? formatDate(a.publishedAt) : "sem data"
          }`,
          status: a.status,
          editHref: `/admin/audios/${a.id}`,
        }))}
      />
    </div>
  );
}
