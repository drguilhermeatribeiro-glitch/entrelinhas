import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CoverImage } from "@/components/cover-image";
import { AudioPlayer } from "@/components/audio-player";
import { ShareButtons } from "@/components/share-buttons";
import { RichContent } from "@/components/rich-content";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatDuration } from "@/lib/utils";

type AudioLike = {
  title: string;
  kind: string;
  coverImage: string | null;
  description: string | null;
  audioUrl: string;
  duration: number | null;
  season: number | null;
  episode: number | null;
  publishedAt: Date | null;
};

export function AudioDetail({ audio }: { audio: AudioLike }) {
  const isPodcast = audio.kind === "podcast";
  const backHref = isPodcast ? "/podcasts" : "/playlist";
  const backLabel = isPodcast ? "Podcasts" : "Playlist";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> {backLabel}
      </Link>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end">
        <CoverImage
          src={audio.coverImage}
          alt={audio.title}
          priority
          className="aspect-square w-full max-w-[220px] rounded-card"
          sizes="220px"
        />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="type">{isPodcast ? "Podcast" : "Canção"}</Badge>
            {isPodcast && audio.episode && (
              <span className="text-sm text-muted-foreground">
                Temporada {audio.season ?? 1} · Episódio {audio.episode}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {audio.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {[formatDate(audio.publishedAt), formatDuration(audio.duration)]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <AudioPlayer src={audio.audioUrl} podcast={isPodcast} />
      </div>

      {audio.description?.trim() && (
        <div className="mt-10">
          <h2 className="font-serif text-xl font-semibold">
            {isPodcast ? "Sobre o episódio" : "Sobre a canção"}
          </h2>
          <RichContent content={audio.description} className="mt-3" />
        </div>
      )}

      <hr className="my-10 border-border" />
      <ShareButtons title={audio.title} />
    </div>
  );
}
