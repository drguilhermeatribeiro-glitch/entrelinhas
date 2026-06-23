import { saveCollection, deleteCollection } from "@/lib/admin-actions";
import { Field, Input, Textarea, StatusField } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";

type Opt = { id: string; title: string };

type CollectionData = {
  id: string;
  title: string;
  intro: string | null;
  coverImage: string | null;
  status: string;
  selected: Set<string>; // valores "type:id"
};

export function CollectionForm({
  collection,
  options,
}: {
  collection?: CollectionData;
  options: { articles: Opt[]; audios: Opt[]; videos: Opt[] };
}) {
  const groups: { label: string; type: string; items: Opt[] }[] = [
    { label: "Artigos", type: "article", items: options.articles },
    { label: "Áudios", type: "audio", items: options.audios },
    { label: "Vídeos", type: "video", items: options.videos },
  ];

  return (
    <>
      <form action={saveCollection} className="space-y-5">
        {collection && <input type="hidden" name="id" value={collection.id} />}

        <Field label="Título do dossiê">
          <Input name="title" required defaultValue={collection?.title} />
        </Field>

        <Field label="Capa (URL)">
          <Input
            name="coverImage"
            type="url"
            placeholder="https://..."
            defaultValue={collection?.coverImage ?? ""}
          />
        </Field>

        <Field label="Introdução editorial">
          <Textarea name="intro" defaultValue={collection?.intro ?? ""} />
        </Field>

        <div>
          <span className="mb-2 block text-sm font-medium">
            Itens vinculados
          </span>
          <p className="mb-3 text-xs text-muted-foreground">
            Selecione conteúdos já publicados para reunir neste especial.
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {groups.map((g) => (
              <div key={g.type}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {g.label}
                </p>
                <div className="space-y-1.5">
                  {g.items.length === 0 && (
                    <p className="text-xs text-muted-foreground">Nenhum.</p>
                  )}
                  {g.items.map((it) => {
                    const value = `${g.type}:${it.id}`;
                    return (
                      <label
                        key={it.id}
                        className="flex items-start gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          name="items"
                          value={value}
                          defaultChecked={collection?.selected.has(value)}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
                        />
                        <span className="leading-snug">{it.title}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <StatusField value={collection?.status} />

        <div className="border-t border-border pt-5">
          <Button type="submit">
            {collection ? "Salvar alterações" : "Criar especial"}
          </Button>
        </div>
      </form>

      {collection && (
        <form
          action={deleteCollection}
          className="mt-6 border-t border-border pt-5"
        >
          <input type="hidden" name="id" value={collection.id} />
          <span className="mb-2 block text-sm font-medium text-muted-foreground">
            Zona de perigo
          </span>
          <DeleteButton label="Excluir especial" />
        </form>
      )}
    </>
  );
}
