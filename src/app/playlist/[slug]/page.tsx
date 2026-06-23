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
  const audio = await getAudioBySlug(slug, "playlist");
  return audio
    ? { title: audio.title, description: audio.description?.split("\n")[0] }
    : { title: "Canção não encontrada" };
}

export default async function SongPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const audio = await getAudioBySlug(slug, "playlist");
  if (!audio) notFound();
  return <AudioDetail audio={audio} />;
}
