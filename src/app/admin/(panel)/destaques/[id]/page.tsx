import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { HighlightForm } from "@/components/admin/highlight-form";

export const dynamic = "force-dynamic";

export default async function EditHighlight({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const highlight = await prisma.highlight.findUnique({ where: { id } });
  if (!highlight) notFound();

  return (
    <div>
      <AdminPageHeader title="Editar destaque" backHref="/admin/destaques" />
      <HighlightForm highlight={highlight} />
    </div>
  );
}
