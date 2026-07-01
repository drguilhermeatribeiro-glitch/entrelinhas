import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { HighlightForm } from "@/components/admin/highlight-form";

export default function NewHighlight() {
  return (
    <div>
      <AdminPageHeader title="Novo destaque" backHref="/admin/destaques" />
      <HighlightForm />
    </div>
  );
}
