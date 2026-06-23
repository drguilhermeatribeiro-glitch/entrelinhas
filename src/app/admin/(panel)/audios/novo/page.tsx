import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AudioForm } from "@/components/admin/audio-form";

export default function NewAudio() {
  return (
    <div>
      <AdminPageHeader title="Novo áudio" backHref="/admin/audios" />
      <AudioForm />
    </div>
  );
}
