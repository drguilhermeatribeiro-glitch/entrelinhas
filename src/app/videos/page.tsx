import type { Metadata } from "next";
import { getVideos } from "@/lib/data";
import { PageHeader } from "@/components/section-heading";
import { SubjectFilter } from "@/components/subject-filter";
import { ContentCard } from "@/components/content-card";

export const metadata: Metadata = {
  title: "Vídeos",
  description: "Vídeos do Entrelinhas.",
};

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{ assunto?: string }>;
}) {
  const { assunto } = await searchParams;
  const videos = await getVideos(assunto);

  return (
    <>
      <PageHeader
        title="Vídeos"
        description="Reportagens, entrevistas e bastidores em vídeo."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SubjectFilter basePath="/videos" active={assunto} />

        {videos.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">
            Nenhum vídeo neste assunto ainda.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <ContentCard
                key={v.id}
                type="video"
                title={v.title}
                href={`/videos/${v.slug}`}
                coverImage={v.thumbnail}
                subject={v.subject}
                excerpt={v.description}
                publishedAt={v.publishedAt}
                showType={false}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
