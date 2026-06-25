import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
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

  const blocks = article.body
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);

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
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Por <span className="text-foreground">{article.author}</span>
          </p>
          {article.pdfUrl && (
            <a
              href={article.pdfUrl}
              download={`${article.slug}.pdf`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Download className="h-4 w-4" /> Baixar PDF
            </a>
          )}
        </div>
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
        {blocks.map((block, i) =>
          block.startsWith("## ") ? (
            <h2 key={i}>{block.slice(3)}</h2>
          ) : block.startsWith("### ") ? (
            <h3 key={i}>{block.slice(4)}</h3>
          ) : (
            <p key={i}>{block}</p>
          )
        )}
      </div>

      <hr className="my-10 border-border" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ShareButtons title={article.title} />
        {article.pdfUrl && (
          <a
            href={article.pdfUrl}
            download={`${article.slug}.pdf`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Baixar PDF
          </a>
        )}
      </div>
    </article>
  );
}
