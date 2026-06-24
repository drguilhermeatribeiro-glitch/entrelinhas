import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { createAdapter } from "../src/lib/db-adapter";
import articlesData from "./articles-data.json";

const prisma = new PrismaClient({ adapter: createAdapter() });

// Imagens de capa (Picsum — placeholders editoriais determinísticos)
const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// Amostras de áudio de domínio público (SoundHelix)
const audio = (n: number) =>
  `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`;

const now = Date.now();
const daysAgo = (d: number) => new Date(now - d * 24 * 60 * 60 * 1000);

async function main() {
  console.log("🌱 Limpando dados antigos...");
  await prisma.collectionItem.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.article.deleteMany();
  await prisma.audioTrack.deleteMany();
  await prisma.video.deleteMany();
  await prisma.category.deleteMany();
  await prisma.subscriber.deleteMany();

  console.log("🏷️  Categorias...");
  const categories = [
    { name: "Política", slug: "politica" },
    { name: "Espiritualidade", slug: "espiritualidade" },
    { name: "Cultura", slug: "cultura" },
    { name: "Interdisciplinar", slug: "interdisciplinar" },
    { name: "Ciência e Tecnologia", slug: "ciencia-tecnologia" },
    { name: "Entretenimento", slug: "entretenimento" },
    { name: "Saúde", slug: "saude" },
    { name: "Sociedade", slug: "sociedade" },
  ];
  for (const c of categories) {
    await prisma.category.create({ data: c });
  }

  console.log("📝 Artigos...");
  const articles = await Promise.all(
    articlesData.map((a) =>
      prisma.article.create({
        data: {
          slug: a.slug,
          title: a.title,
          subject: a.subject,
          excerpt: a.excerpt,
          body: a.body,
          author: a.author,
          coverImage: a.coverImage,
          publishedAt: new Date(a.publishedAt),
          status: "published",
        },
      })
    )
  );
  const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

  console.log("🎵 Playlist (canções)...");
  const songs = await Promise.all(
    [
      {
        slug: "cancao-da-travessia",
        title: "Canção da Travessia",
        coverImage: img("entrelinhas-travessia", 800, 800),
        description:
          "Uma canção autoral sobre recomeços.\n\nLetra:\nQuando a margem ficou pra trás / e o rio me chamou pra andar...",
        audioUrl: audio(1),
        duration: 222,
        publishedAt: daysAgo(2),
      },
      {
        slug: "noturno-em-do-menor",
        title: "Noturno em Dó Menor",
        coverImage: img("entrelinhas-noturno", 800, 800),
        description: "Instrumental composto numa madrugada de insônia.",
        audioUrl: audio(2),
        duration: 258,
        publishedAt: daysAgo(7),
      },
      {
        slug: "entre-linhas-tema",
        title: "Entre Linhas (Tema)",
        coverImage: img("entrelinhas-tema", 800, 800),
        description: "O tema musical do portal. Voz e violão.",
        audioUrl: audio(3),
        duration: 198,
        publishedAt: daysAgo(11),
      },
    ].map((s) =>
      prisma.audioTrack.create({
        data: { ...s, kind: "playlist", status: "published" },
      })
    )
  );

  console.log("🎙️  Podcasts (episódios)...");
  const podcasts = await Promise.all(
    [
      {
        slug: "ep-01-o-que-esperar-de-2026",
        title: "Ep. 01 — O que esperar de 2026",
        coverImage: img("entrelinhas-pod1", 800, 800),
        description:
          "Conversa de abertura sobre o cenário político do ano eleitoral.\n\nShow notes:\n00:00 Introdução\n05:30 O cenário\n22:10 Encerramento",
        audioUrl: audio(4),
        duration: 2730,
        season: 1,
        episode: 1,
        publishedAt: daysAgo(4),
      },
      {
        slug: "ep-02-tecnologia-e-eleicoes",
        title: "Ep. 02 — Tecnologia e eleições",
        coverImage: img("entrelinhas-pod2", 800, 800),
        description:
          "Como redes sociais e IA estão mudando o jogo eleitoral.",
        audioUrl: audio(5),
        duration: 3120,
        season: 1,
        episode: 2,
        publishedAt: daysAgo(8),
      },
    ].map((p) =>
      prisma.audioTrack.create({
        data: { ...p, kind: "podcast", status: "published" },
      })
    )
  );

  console.log("🎬 Vídeos...");
  const videos = await Promise.all(
    [
      {
        slug: "entrevista-planos-de-governo",
        title: "Entrevista: comparando planos de governo",
        subject: "politica",
        description:
          "Análise lado a lado das principais propostas em debate.",
        url: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
        thumbnail: img("entrelinhas-vid1", 1280, 720),
        publishedAt: daysAgo(5),
      },
      {
        slug: "bastidores-da-cancao-da-travessia",
        title: "Bastidores: a gravação de 'Canção da Travessia'",
        subject: "cultura",
        description: "Um minidocumentário sobre o processo criativo.",
        url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
        thumbnail: img("entrelinhas-vid2", 1280, 720),
        publishedAt: daysAgo(10),
      },
    ].map((v) =>
      prisma.video.create({
        data: { ...v, source: "embed", status: "published" },
      })
    )
  );

  console.log("⭐ Especial: Eleições 2026...");
  const special = await prisma.collection.create({
    data: {
      slug: "eleicoes-2026",
      title: "Eleições 2026",
      coverImage: img("entrelinhas-eleicoes-2026", 1600, 900),
      intro:
        "Um dossiê para acompanhar o ano eleitoral com profundidade: artigos sobre planos de governo, podcasts sobre o cenário político e vídeos analíticos. Reunimos aqui, em um só lugar, o melhor da cobertura do Entrelinhas sobre 2026.",
      status: "published",
      publishedAt: daysAgo(1),
      items: {
        create: [
          { order: 0, articleId: articleBySlug("lula-juscelino-kubitschek")?.id },
          { order: 1, audioId: podcasts[0].id },
          { order: 2, audioId: podcasts[1].id },
          { order: 3, videoId: videos[0].id },
        ],
      },
    },
  });

  console.log("📨 Inscritos de exemplo...");
  await prisma.subscriber.createMany({
    data: [
      { name: "Maria Souza", email: "maria@exemplo.com", confirmed: true },
      { name: "João Lima", email: "joao@exemplo.com", confirmed: false },
    ],
  });

  console.log(
    `✅ Seed concluído: ${articles.length} artigos, ${songs.length} canções, ${podcasts.length} podcasts, ${videos.length} vídeos, 1 especial (${special.title}).`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
