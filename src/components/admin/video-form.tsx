import type { VideoModel as Video } from "@/generated/prisma/models";
import { saveVideo, deleteVideo } from "@/lib/admin-actions";
import { SUBJECTS } from "@/lib/constants";
import { Field, Input, Textarea, Select, StatusField } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";

export function VideoForm({ video }: { video?: Video }) {
  return (
    <>
      <form action={saveVideo} className="space-y-5">
        {video && <input type="hidden" name="id" value={video.id} />}

        <Field label="Título">
          <Input name="title" required defaultValue={video?.title} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Assunto">
            <Select name="subject" defaultValue={video?.subject ?? SUBJECTS[0].slug}>
              {SUBJECTS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Origem">
            <Select name="source" defaultValue={video?.source ?? "embed"}>
              <option value="embed">Embed (YouTube / Vimeo)</option>
              <option value="upload">Arquivo próprio</option>
            </Select>
          </Field>
        </div>

        <Field
          label="URL do vídeo"
          hint="Link do YouTube/Vimeo, ou endereço do arquivo se for upload próprio."
        >
          <Input
            name="url"
            type="url"
            required
            placeholder="https://youtube.com/watch?v=..."
            defaultValue={video?.url}
          />
        </Field>

        <Field label="Thumbnail (URL)" hint="Opcional — imagem de capa do vídeo.">
          <Input
            name="thumbnail"
            type="url"
            placeholder="https://..."
            defaultValue={video?.thumbnail ?? ""}
          />
        </Field>

        <Field label="Descrição" hint="Aceita HTML.">
          <Textarea name="description" defaultValue={video?.description ?? ""} />
        </Field>

        <StatusField value={video?.status} />

        <div className="border-t border-border pt-5">
          <Button type="submit">
            {video ? "Salvar alterações" : "Criar vídeo"}
          </Button>
        </div>
      </form>

      {video && (
        <form action={deleteVideo} className="mt-6 border-t border-border pt-5">
          <input type="hidden" name="id" value={video.id} />
          <span className="mb-2 block text-sm font-medium text-muted-foreground">
            Zona de perigo
          </span>
          <DeleteButton label="Excluir vídeo" />
        </form>
      )}
    </>
  );
}
