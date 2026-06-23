import type { Metadata } from "next";
import { getArticles } from "@/lib/data";
import { PageHeader } from "@/components/section-heading";
import { SubjectFilter } from "@/components/subject-filter";
import { ContentCard } from "@/components/content-card";

export const metadata: Metadata = {
  title: "Artigos",
  description: "Artigos de opinião do Entrelinhas.",
};

export default async function ArtigosPage({
  searchParams,
}: {
  searchParams: Promise<{ assunto?: string }>;
}) {
  const { assunto } = await searchParams;
  const articles = await getArticles(assunto);

  return (
    <>
      <PageHeader
        title="Artigos"
        description="Opinião e análise para ler o mundo nas entrelinhas."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SubjectFilter basePath="/artigos" active={assunto} />

        {articles.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">
            Nenhum artigo neste assunto ainda.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ContentCard
                key={a.id}
                type="artigo"
                title={a.title}
                href={`/artigos/${a.slug}`}
                coverImage={a.coverImage}
                subject={a.subject}
                excerpt={a.excerpt}
                publishedAt={a.publishedAt}
                showType={false}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
