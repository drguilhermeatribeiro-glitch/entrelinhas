import type { ArticleModel as Article } from "@/generated/prisma/models";
import { saveArticle, deleteArticle } from "@/lib/admin-actions";
import { SUBJECTS } from "@/lib/constants";
import { Field, Input, Textarea, Select, StatusField } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";

export function ArticleForm({ article }: { article?: Article }) {
  return (
    <>
      <form action={saveArticle} className="space-y-5">
        {article && <input type="hidden" name="id" value={article.id} />}

        <Field label="Título">
          <Input name="title" required defaultValue={article?.title} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Assunto">
            <Select
              name="subject"
              defaultValue={article?.subject ?? SUBJECTS[0].slug}
            >
              {SUBJECTS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Autor">
            <Input name="author" defaultValue={article?.author ?? "Entrelinhas"} />
          </Field>
        </div>

        <Field label="Resumo" hint="1–2 linhas exibidas nos cards e na abertura.">
          <Textarea
            name="excerpt"
            defaultValue={article?.excerpt ?? ""}
            className="min-h-20"
          />
        </Field>

        <Field
          label="Imagem de destaque (URL)"
          hint="Cole o endereço de uma imagem. Em branco usa o placeholder."
        >
          <Input
            name="coverImage"
            type="url"
            placeholder="https://..."
            defaultValue={article?.coverImage ?? ""}
          />
        </Field>

        <Field
          label="PDF do artigo (URL)"
          hint="Link direto para o PDF (botão 'Baixar' do artigo). Em branco, o botão não aparece."
        >
          <Input
            name="pdfUrl"
            type="text"
            placeholder="https://... ou /artigos/pdf/arquivo.pdf"
            defaultValue={article?.pdfUrl ?? ""}
          />
        </Field>

        <Field
          label="Corpo do artigo"
          hint="Aceita HTML. Sem HTML: cada linha vira parágrafo, `## titulo` vira subtítulo e `![descrição](url)` insere imagem."
        >
          <Textarea
            name="body"
            required
            defaultValue={article?.body}
            className="min-h-64"
          />
        </Field>

        <StatusField value={article?.status} />

        <div className="border-t border-border pt-5">
          <Button type="submit">
            {article ? "Salvar alterações" : "Criar artigo"}
          </Button>
        </div>
      </form>

      {article && (
        <form
          action={deleteArticle}
          className="mt-6 border-t border-border pt-5"
        >
          <input type="hidden" name="id" value={article.id} />
          <span className="mb-2 block text-sm font-medium text-muted-foreground">
            Zona de perigo
          </span>
          <DeleteButton label="Excluir artigo" />
        </form>
      )}
    </>
  );
}
