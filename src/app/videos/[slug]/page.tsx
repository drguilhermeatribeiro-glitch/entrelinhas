import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getVideoBySlug } from "@/lib/data";
import { VideoEmbed } from "@/components/video-embed";
import { ShareButtons } from "@/components/share-buttons";
import { Badge } from "@/components/ui/badge";
import { subjectName } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);
  return video
    ? { title: video.title, description: video.description ?? undefined }
    : { title: "Vídeo não encontrado" };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);
  if (!video) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        href="/videos"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Vídeos
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Badge variant="type">{subjectName(video.subject)}</Badge>
        <time className="text-sm text-muted-foreground">
          {formatDate(video.publishedAt)}
        </time>
      </div>
      <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {video.title}
      </h1>

      <div className="mt-8">
        <VideoEmbed url={video.url} source={video.source} title={video.title} />
      </div>

      {video.description && (
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {video.description}
        </p>
      )}

      <hr className="my-10 border-border" />
      <ShareButtons title={video.title} />
    </div>
  );
}
