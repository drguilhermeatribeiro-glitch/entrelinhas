import type { Metadata } from "next";
import { getAudio } from "@/lib/data";
import { PageHeader } from "@/components/section-heading";
import { AudioCard } from "@/components/audio-card";

export const metadata: Metadata = {
  title: "Playlist",
  description: "Canções autorais do Entrelinhas.",
};

export default async function PlaylistPage() {
  const songs = await getAudio("playlist");

  return (
    <>
      <PageHeader
        title="Playlist"
        description="Canções autorais — ouça, leia a letra e conheça a história por trás de cada faixa."
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {songs.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Nenhuma canção publicada ainda.
          </p>
        ) : (
          <div className="grid gap-5">
            {songs.map((s) => (
              <AudioCard key={s.id} {...s} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
