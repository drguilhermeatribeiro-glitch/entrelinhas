import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlug } from "@/lib/data";
import { CoverImage } from "@/components/cover-image";
import { Badge } from "@/components/ui/badge";
import { ShareButtons } from "@/components/share-buttons";
import { subjectName } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Artigo não encontrado" };
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.coverImage ? [article.coverImage] : undefined,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const paragraphs = article.body.split("\n").filter((p) => p.trim());

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/artigos"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Artigos
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="type">{subjectName(article.subject)}</Badge>
          <time className="text-sm text-muted-foreground">
            {formatDate(article.publishedAt)}
          </time>
        </div>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
        )}
        <p className="mt-4 text-sm text-muted-foreground">
          Por <span className="text-foreground">{article.author}</span>
        </p>
      </header>

      {article.coverImage && (
        <CoverImage
          src={article.coverImage}
          alt={article.title}
          priority
          className="mt-8 aspect-[16/9] w-full rounded-card"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      )}

      <div className="prose-reading mx-auto mt-10">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <hr className="my-10 border-border" />
      <ShareButtons title={article.title} />
    </article>
  );
}
