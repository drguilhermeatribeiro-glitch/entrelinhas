import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getRecentFeed,
  getArticles,
  getAudio,
  getVideos,
  getCollections,
} from "@/lib/data";
import { ContentCard } from "@/components/content-card";
import { SectionHeading } from "@/components/section-heading";
import { SubscribeForm } from "@/components/subscribe-form";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export default async function HomePage() {
  const [feed, articles, songs, podcasts, videos, collections] =
    await Promise.all([
      getRecentFeed(6),
      getArticles(),
      getAudio("playlist"),
      getAudio("podcast"),
      getVideos(),
      getCollections(),
    ]);

  const [highlight, ...rest] = feed;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 entrelinhas-rule opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl animate-fade-up">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Portal editorial
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              Entre<span className="text-accent">linhas</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {SITE.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/artigos">Explorar artigos</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#inscrever">Inscreva-se</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Em destaque ---------- */}
      {highlight && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            title="Em destaque"
            subtitle="O mais recente, de todos os formatos"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Destaque principal */}
            <Link
              href={highlight.href}
              className="group relative flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-card border border-border bg-card p-8"
            >
              <div className="absolute inset-0 entrelinhas-rule opacity-20" />
              <div className="relative">
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
                  Destaque
                </p>
                <h3 className="font-serif text-3xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-accent">
                  {highlight.title}
                </h3>
                {highlight.excerpt && (
                  <p className="mt-3 max-w-md text-muted-foreground">
                    {highlight.excerpt}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Ler mais{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>

            {/* Grade de secundários */}
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.slice(0, 4).map((item) => (
                <ContentCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Faixas por formato ---------- */}
      <FormatStrip
        title="Últimos artigos"
        href="/artigos"
        items={articles.slice(0, 3).map((a) => ({
          id: a.id,
          type: "artigo" as const,
          title: a.title,
          href: `/artigos/${a.slug}`,
          coverImage: a.coverImage,
          subject: a.subject,
          excerpt: a.excerpt,
          publishedAt: a.publishedAt,
        }))}
      />

      <FormatStrip
        title="Novos áudios"
        href="/playlist"
        muted
        items={[...songs, ...podcasts]
          .sort(
            (a, b) =>
              (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0)
          )
          .slice(0, 3)
          .map((a) => ({
            id: a.id,
            type: (a.kind === "podcast" ? "podcast" : "playlist") as
              | "podcast"
              | "playlist",
            title: a.title,
            href: `/${a.kind === "podcast" ? "podcasts" : "playlist"}/${a.slug}`,
            coverImage: a.coverImage,
            subject: null,
            excerpt: a.description?.split("\n")[0] ?? null,
            publishedAt: a.publishedAt,
          }))}
      />

      <FormatStrip
        title="Vídeos recentes"
        href="/videos"
        items={videos.slice(0, 3).map((v) => ({
          id: v.id,
          type: "video" as const,
          title: v.title,
          href: `/videos/${v.slug}`,
          coverImage: v.thumbnail,
          subject: v.subject,
          excerpt: v.description,
          publishedAt: v.publishedAt,
        }))}
      />

      {collections.length > 0 && (
        <FormatStrip
          title="Especiais"
          href="/especiais"
          muted
          items={collections.slice(0, 3).map((c) => ({
            id: c.id,
            type: "especial" as const,
            title: c.title,
            href: `/especiais/${c.slug}`,
            coverImage: c.coverImage,
            subject: null,
            excerpt: c.intro,
            publishedAt: c.publishedAt,
          }))}
        />
      )}

      {/* ---------- Inscrição ---------- */}
      <section
        id="inscrever"
        className="scroll-mt-20 border-y border-border bg-muted/40"
      >
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Leia o mundo nas entrelinhas
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Inscreva-se para receber novos artigos, áudios e vídeos diretamente
            no seu e-mail. Sem spam.
          </p>
          <div className="mx-auto mt-8 max-w-lg text-left">
            <SubscribeForm source="home" />
          </div>
        </div>
      </section>
    </>
  );
}

function FormatStrip({
  title,
  href,
  items,
  muted = false,
}: {
  title: string;
  href: string;
  muted?: boolean;
  items: (React.ComponentProps<typeof ContentCard> & { id: string })[];
}) {
  if (items.length === 0) return null;
  return (
    <section className={muted ? "bg-muted/30" : ""}>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeading title={title} href={href} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ContentCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
