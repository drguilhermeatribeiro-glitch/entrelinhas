import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AudioForm } from "@/components/admin/audio-form";

export const dynamic = "force-dynamic";

export default async function EditAudio({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const audio = await prisma.audioTrack.findUnique({ where: { id } });
  if (!audio) notFound();

  return (
    <div>
      <AdminPageHeader title="Editar áudio" backHref="/admin/audios" />
      <AudioForm audio={audio} />
    </div>
  );
}
