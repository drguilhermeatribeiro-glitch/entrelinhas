import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { VideoForm } from "@/components/admin/video-form";

export const dynamic = "force-dynamic";

export default async function EditVideo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = await prisma.video.findUnique({ where: { id } });
  if (!video) notFound();

  return (
    <div>
      <AdminPageHeader title="Editar vídeo" backHref="/admin/videos" />
      <VideoForm video={video} />
    </div>
  );
}
