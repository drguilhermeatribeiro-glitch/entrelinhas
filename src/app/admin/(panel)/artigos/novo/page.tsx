import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ArticleForm } from "@/components/admin/article-form";

export default function NewArticle() {
  return (
    <div>
      <AdminPageHeader title="Novo artigo" backHref="/admin/artigos" />
      <ArticleForm />
    </div>
  );
}
