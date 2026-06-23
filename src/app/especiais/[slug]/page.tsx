import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCollectionBySlug } from "@/lib/data";
import { CoverImage } from "@/components/cover-image";
import { ContentCard } from "@/components/content-card";
import { SectionHeading } from "@/components/section-heading";
import type { FeedItem } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  return collection
    ? { title: collection.title, description: collection.intro ?? undefined }
    : { title: "Especial não encontrado" };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  const articles: FeedItem[] = [];
  const audios: FeedItem[] = [];
  const videos: FeedItem[] = [];

  for (const item of collection.items) {
    if (item.article) {
      const a = item.article;
      articles.push({
        id: a.id,
        type: "artigo",
        title: a.title,
        href: `/artigos/${a.slug}`,
        coverImage: a.coverImage,
        subject: a.subject,
        excerpt: a.excerpt,
        publishedAt: a.publishedAt,
      });
    } else if (item.audio) {
      const a = item.audio;
      audios.push({
        id: a.id,
        type: a.kind === "podcast" ? "podcast" : "playlist",
        title: a.title,
        href: `/${a.kind === "podcast" ? "podcasts" : "playlist"}/${a.slug}`,
        coverImage: a.coverImage,
        subject: null,
        excerpt: a.description?.split("\n")[0] ?? null,
        publishedAt: a.publishedAt,
      });
    } else if (item.video) {
      const v = item.video;
      videos.push({
        id: v.id,
        type: "video",
        title: v.title,
        href: `/videos/${v.slug}`,
        coverImage: v.thumbnail,
        subject: v.subject,
        excerpt: v.description,
        publishedAt: v.publishedAt,
      });
    }
  }

  const groups: { title: string; items: FeedItem[] }[] = [
    { title: "Artigos", items: articles },
    { title: "Áudios", items: audios },
    { title: "Vídeos", items: videos },
  ];

  return (
    <>
      {/* Capa do dossiê */}
      <section className="relative overflow-hidden border-b border-border">
        <CoverImage
          src={collection.coverImage}
          alt={collection.title}
          priority
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-white sm:px-6">
          <Link
            href="/especiais"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Especiais
          </Link>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            Dossiê especial
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            {collection.title}
          </h1>
          {collection.intro && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
              {collection.intro}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {groups
          .filter((g) => g.items.length > 0)
          .map((g) => (
            <section key={g.title} className="mb-14 last:mb-0">
              <SectionHeading title={g.title} />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((item) => (
                  <ContentCard key={item.id} {...item} />
                ))}
              </div>
            </section>
          ))}
      </div>
    </>
  );
}
