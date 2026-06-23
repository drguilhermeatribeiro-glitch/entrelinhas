import type { AudioTrackModel as AudioTrack } from "@/generated/prisma/models";
import { saveAudio, deleteAudio } from "@/lib/admin-actions";
import { Field, Input, Textarea, Select, StatusField } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";

export function AudioForm({ audio }: { audio?: AudioTrack }) {
  return (
    <>
      <form action={saveAudio} className="space-y-5">
        {audio && <input type="hidden" name="id" value={audio.id} />}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Título">
            <Input name="title" required defaultValue={audio?.title} />
          </Field>
          <Field label="Tipo">
            <Select name="kind" defaultValue={audio?.kind ?? "playlist"}>
              <option value="playlist">Playlist (canção)</option>
              <option value="podcast">Podcast (episódio)</option>
            </Select>
          </Field>
        </div>

        <Field
          label="Arquivo de áudio (URL)"
          hint="Endereço .mp3 do áudio (storage, CDN, etc.)."
        >
          <Input
            name="audioUrl"
            type="url"
            required
            placeholder="https://...mp3"
            defaultValue={audio?.audioUrl}
          />
        </Field>

        <Field label="Capa (URL)">
          <Input
            name="coverImage"
            type="url"
            placeholder="https://..."
            defaultValue={audio?.coverImage ?? ""}
          />
        </Field>

        <Field
          label="Descrição / letra / show notes"
          hint="Para canções, a letra. Para podcasts, as notas do episódio."
        >
          <Textarea name="description" defaultValue={audio?.description ?? ""} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Duração (segundos)">
            <Input
              name="duration"
              type="number"
              min={0}
              defaultValue={audio?.duration ?? ""}
            />
          </Field>
          <Field label="Temporada" hint="Só para podcasts.">
            <Input
              name="season"
              type="number"
              min={0}
              defaultValue={audio?.season ?? ""}
            />
          </Field>
          <Field label="Episódio" hint="Só para podcasts.">
            <Input
              name="episode"
              type="number"
              min={0}
              defaultValue={audio?.episode ?? ""}
            />
          </Field>
        </div>

        <StatusField value={audio?.status} />

        <div className="border-t border-border pt-5">
          <Button type="submit">
            {audio ? "Salvar alterações" : "Criar áudio"}
          </Button>
        </div>
      </form>

      {audio && (
        <form action={deleteAudio} className="mt-6 border-t border-border pt-5">
          <input type="hidden" name="id" value={audio.id} />
          <span className="mb-2 block text-sm font-medium text-muted-foreground">
            Zona de perigo
          </span>
          <DeleteButton label="Excluir áudio" />
        </form>
      )}
    </>
  );
}
