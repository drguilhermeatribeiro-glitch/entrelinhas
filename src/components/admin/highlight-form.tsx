import type { HighlightModel as Highlight } from "@/generated/prisma/models";
import { saveHighlight, deleteHighlight } from "@/lib/admin-actions";
import { Field, Input, Textarea, StatusField } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";

export function HighlightForm({ highlight }: { highlight?: Highlight }) {
  return (
    <>
      <form action={saveHighlight} className="space-y-5">
        {highlight && <input type="hidden" name="id" value={highlight.id} />}

        <Field label="Título do slide">
          <Input name="title" required defaultValue={highlight?.title} />
        </Field>

        <Field label="Subtítulo">
          <Input name="subtitle" defaultValue={highlight?.subtitle ?? ""} />
        </Field>

        <Field
          label="Imagem de fundo (URL)"
          hint="Imagem de fundo do slide. Em branco, usa um gradiente da marca."
        >
          <Input
            name="imageUrl"
            type="url"
            placeholder="https://..."
            defaultValue={highlight?.imageUrl ?? ""}
          />
        </Field>

        <Field
          label="Conteúdo (opcional)"
          hint="Texto adicional exibido no slide. Aceita HTML."
        >
          <Textarea
            name="content"
            defaultValue={highlight?.content ?? ""}
            className="min-h-24"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Link do botão (URL)" hint="Ex.: /artigos/meu-artigo">
            <Input
              name="linkUrl"
              type="text"
              placeholder="/artigos/..."
              defaultValue={highlight?.linkUrl ?? ""}
            />
          </Field>
          <Field label="Texto do botão">
            <Input
              name="linkLabel"
              placeholder="Ver mais"
              defaultValue={highlight?.linkLabel ?? ""}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Ordem" hint="Menor aparece primeiro no carrossel.">
            <Input
              name="order"
              type="number"
              defaultValue={highlight?.order ?? 0}
            />
          </Field>
          <StatusField value={highlight?.status} />
        </div>

        <div className="border-t border-border pt-5">
          <Button type="submit">
            {highlight ? "Salvar alterações" : "Criar destaque"}
          </Button>
        </div>
      </form>

      {highlight && (
        <form
          action={deleteHighlight}
          className="mt-6 border-t border-border pt-5"
        >
          <input type="hidden" name="id" value={highlight.id} />
          <span className="mb-2 block text-sm font-medium text-muted-foreground">
            Zona de perigo
          </span>
          <DeleteButton label="Excluir destaque" />
        </form>
      )}
    </>
  );
}
