import Link from "next/link";
import { CoverImage } from "@/components/cover-image";
import { AudioPlayer } from "@/components/audio-player";
import { formatDate, formatDuration } from "@/lib/utils";

type Props = {
  slug: string;
  kind: string;
  title: string;
  coverImage?: string | null;
  description?: string | null;
  audioUrl: string;
  duration?: number | null;
  season?: number | null;
  episode?: number | null;
  publishedAt?: Date | null;
};

export function AudioCard(props: Props) {
  const base = props.kind === "podcast" ? "/podcasts" : "/playlist";
  const firstLine = props.description?.split("\n").find((l) => l.trim());

  return (
    <article className="flex flex-col gap-4 rounded-card border border-border bg-card p-4 sm:flex-row">
      <Link
        href={`${base}/${props.slug}`}
        className="group relative block shrink-0 overflow-hidden rounded-lg sm:w-40"
      >
        <CoverImage
          src={props.coverImage}
          alt={props.title}
          className="aspect-square w-full sm:w-40"
          sizes="160px"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {props.kind === "podcast" && props.episode && (
            <span>
              T{props.season ?? 1} · Ep. {props.episode}
            </span>
          )}
          {props.duration ? <span>{formatDuration(props.duration)}</span> : null}
          {props.publishedAt && <span>{formatDate(props.publishedAt)}</span>}
        </div>

        <Link href={`${base}/${props.slug}`}>
          <h3 className="mt-1 font-serif text-lg font-semibold leading-snug tracking-tight hover:text-accent">
            {props.title}
          </h3>
        </Link>

        {firstLine && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {firstLine}
          </p>
        )}

        <div className="mt-auto pt-3">
          <AudioPlayer src={props.audioUrl} podcast={props.kind === "podcast"} />
        </div>
      </div>
    </article>
  );
}
