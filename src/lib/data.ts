import "server-only";
import { prisma } from "@/lib/prisma";
import type { ContentType } from "@/lib/constants";

const PUBLISHED = { status: "published" } as const;
const byDate = { publishedAt: "desc" } as const;

// ---------- Destaques (carrossel) ----------
export function getHighlights() {
  return prisma.highlight.findMany({
    where: PUBLISHED,
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

// ---------- Artigos ----------
export function getArticles(subject?: string) {
  return prisma.article.findMany({
    where: { ...PUBLISHED, ...(subject ? { subject } : {}) },
    orderBy: byDate,
  });
}

export function getArticleBySlug(slug: string) {
  return prisma.article.findFirst({ where: { slug, ...PUBLISHED } });
}

// ---------- Áudios (playlist / podcast) ----------
export function getAudio(kind: "playlist" | "podcast") {
  return prisma.audioTrack.findMany({
    where: { kind, ...PUBLISHED },
    orderBy: byDate,
  });
}

export function getAudioBySlug(slug: string, kind: "playlist" | "podcast") {
  return prisma.audioTrack.findFirst({ where: { slug, kind, ...PUBLISHED } });
}

// ---------- Vídeos ----------
export function getVideos(subject?: string) {
  return prisma.video.findMany({
    where: { ...PUBLISHED, ...(subject ? { subject } : {}) },
    orderBy: byDate,
  });
}

export function getVideoBySlug(slug: string) {
  return prisma.video.findFirst({ where: { slug, ...PUBLISHED } });
}

// ---------- Especiais (coleções) ----------
export function getCollections() {
  return prisma.collection.findMany({
    where: PUBLISHED,
    orderBy: byDate,
    include: { _count: { select: { items: true } } },
  });
}

export function getCollectionBySlug(slug: string) {
  return prisma.collection.findFirst({
    where: { slug, ...PUBLISHED },
    include: {
      items: {
        orderBy: { order: "asc" },
        include: { article: true, audio: true, video: true },
      },
    },
  });
}

// ---------- Item normalizado para cards/home ----------
export type FeedItem = {
  id: string;
  type: ContentType;
  title: string;
  href: string;
  coverImage: string | null;
  subject: string | null;
  excerpt: string | null;
  publishedAt: Date | null;
};

/** Itens recentes de todos os formatos, normalizados para a home. */
export async function getRecentFeed(limit = 8): Promise<FeedItem[]> {
  const [articles, audios, videos] = await Promise.all([
    prisma.article.findMany({ where: PUBLISHED, orderBy: byDate, take: limit }),
    prisma.audioTrack.findMany({ where: PUBLISHED, orderBy: byDate, take: limit }),
    prisma.video.findMany({ where: PUBLISHED, orderBy: byDate, take: limit }),
  ]);

  const items: FeedItem[] = [
    ...articles.map((a): FeedItem => ({
      id: a.id,
      type: "artigo",
      title: a.title,
      href: `/artigos/${a.slug}`,
      coverImage: a.coverImage,
      subject: a.subject,
      excerpt: a.excerpt,
      publishedAt: a.publishedAt,
    })),
    ...audios.map((a): FeedItem => ({
      id: a.id,
      type: a.kind === "podcast" ? "podcast" : "playlist",
      title: a.title,
      href: `/${a.kind === "podcast" ? "podcasts" : "playlist"}/${a.slug}`,
      coverImage: a.coverImage,
      subject: null,
      excerpt: a.description?.split("\n")[0] ?? null,
      publishedAt: a.publishedAt,
    })),
    ...videos.map((v): FeedItem => ({
      id: v.id,
      type: "video",
      title: v.title,
      href: `/videos/${v.slug}`,
      coverImage: v.thumbnail,
      subject: v.subject,
      excerpt: v.description,
      publishedAt: v.publishedAt,
    })),
  ];

  return items
    .sort(
      (a, b) =>
        (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0)
    )
    .slice(0, limit);
}
