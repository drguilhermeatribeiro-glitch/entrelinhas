import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { VideoForm } from "@/components/admin/video-form";

export default function NewVideo() {
  return (
    <div>
      <AdminPageHeader title="Novo vídeo" backHref="/admin/videos" />
      <VideoForm />
    </div>
  );
}
