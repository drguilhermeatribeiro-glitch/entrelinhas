import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { subjectName } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminList } from "@/components/admin/admin-list";

export const dynamic = "force-dynamic";

export default async function AdminVideos() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminPageHeader
        title="Vídeos"
        action={
          <Link
            href="/admin/videos/novo"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Novo
          </Link>
        }
      />
      <AdminList
        empty="Nenhum vídeo ainda."
        rows={videos.map((v) => ({
          id: v.id,
          title: v.title,
          meta: `${subjectName(v.subject)} · ${
            v.publishedAt ? formatDate(v.publishedAt) : "sem data"
          }`,
          status: v.status,
          editHref: `/admin/videos/${v.id}`,
        }))}
      />
    </div>
  );
}
