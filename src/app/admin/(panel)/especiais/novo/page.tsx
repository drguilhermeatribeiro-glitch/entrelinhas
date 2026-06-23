import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CollectionForm } from "@/components/admin/collection-form";

export const dynamic = "force-dynamic";

export default async function NewCollection() {
  const [articles, audios, videos] = await Promise.all([
    prisma.article.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, title: true } }),
    prisma.audioTrack.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, title: true } }),
    prisma.video.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, title: true } }),
  ]);

  return (
    <div>
      <AdminPageHeader title="Novo especial" backHref="/admin/especiais" />
      <CollectionForm options={{ articles, audios, videos }} />
    </div>
  );
}
