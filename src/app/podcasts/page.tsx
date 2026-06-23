import type { Metadata } from "next";
import { getAudio } from "@/lib/data";
import { PageHeader } from "@/components/section-heading";
import { AudioCard } from "@/components/audio-card";

export const metadata: Metadata = {
  title: "Podcasts",
  description: "Episódios em áudio do Entrelinhas.",
};

export default async function PodcastsPage() {
  const episodes = await getAudio("podcast");

  return (
    <>
      <PageHeader
        title="Podcasts"
        description="Conversas e episódios para escutar com calma — com controle de velocidade e avanço rápido."
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {episodes.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Nenhum episódio publicado ainda.
          </p>
        ) : (
          <div className="grid gap-5">
            {episodes.map((e) => (
              <AudioCard key={e.id} {...e} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
