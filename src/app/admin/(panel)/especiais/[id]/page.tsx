import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CollectionForm } from "@/components/admin/collection-form";

export const dynamic = "force-dynamic";

export default async function EditCollection({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [collection, articles, audios, videos] = await Promise.all([
    prisma.collection.findUnique({
      where: { id },
      include: { items: true },
    }),
    prisma.article.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, title: true } }),
    prisma.audioTrack.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, title: true } }),
    prisma.video.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, title: true } }),
  ]);

  if (!collection) notFound();

  const selected = new Set<string>();
  for (const item of collection.items) {
    if (item.articleId) selected.add(`article:${item.articleId}`);
    if (item.audioId) selected.add(`audio:${item.audioId}`);
    if (item.videoId) selected.add(`video:${item.videoId}`);
  }

  return (
    <div>
      <AdminPageHeader title="Editar especial" backHref="/admin/especiais" />
      <CollectionForm
        collection={{
          id: collection.id,
          title: collection.title,
          intro: collection.intro,
          coverImage: collection.coverImage,
          status: collection.status,
          selected,
        }}
        options={{ articles, audios, videos }}
      />
    </div>
  );
}
