import type { Metadata } from "next";
import Link from "next/link";
import { Layers } from "lucide-react";
import { getCollections } from "@/lib/data";
import { PageHeader } from "@/components/section-heading";
import { CoverImage } from "@/components/cover-image";

export const metadata: Metadata = {
  title: "Especiais",
  description: "Dossiês temáticos do Entrelinhas.",
};

export default async function EspeciaisPage() {
  const collections = await getCollections();

  return (
    <>
      <PageHeader
        title="Especiais"
        description="Dossiês que reúnem artigos, áudios e vídeos em torno de um mesmo tema."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {collections.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Nenhum especial publicado ainda.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {collections.map((c) => (
              <Link
                key={c.id}
                href={`/especiais/${c.slug}`}
                className="group relative flex min-h-[16rem] flex-col justify-end overflow-hidden rounded-card border border-border"
              >
                <CoverImage
                  src={c.coverImage}
                  alt={c.title}
                  className="absolute inset-0 h-full w-full"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative p-6 text-white">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest">
                    <Layers className="h-3.5 w-3.5" /> Especial ·{" "}
                    {c._count.items} itens
                  </span>
                  <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight tracking-tight">
                    {c.title}
                  </h2>
                  {c.intro && (
                    <p className="mt-1.5 line-clamp-2 text-sm text-white/80">
                      {c.intro}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
