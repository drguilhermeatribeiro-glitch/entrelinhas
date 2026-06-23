import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAudioBySlug } from "@/lib/data";
import { AudioDetail } from "@/components/audio-detail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const audio = await getAudioBySlug(slug, "podcast");
  return audio
    ? { title: audio.title, description: audio.description?.split("\n")[0] }
    : { title: "Episódio não encontrado" };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const audio = await getAudioBySlug(slug, "podcast");
  if (!audio) notFound();
  return <AudioDetail audio={audio} />;
}
