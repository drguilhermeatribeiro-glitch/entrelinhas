import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { createAdapter } from "../src/lib/db-adapter";

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
    { name: "Cultura", slug: "cultura" },
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
    [
      {
        slug: "o-silencio-entre-as-palavras",
        title: "O silêncio entre as palavras",
        subject: "cultura",
        excerpt:
          "Sobre o que não é dito, mas se lê nas entrelinhas dos discursos cotidianos.",
        coverImage: img("entrelinhas-silencio"),
        publishedAt: daysAgo(1),
        body: `Há uma gramática do não-dito que estrutura boa parte das nossas conversas.

Quando alguém escolhe não responder, esse silêncio comunica. Quando um governo evita um tema, a omissão é, ela mesma, uma posição. Ler nas entrelinhas é desenvolver sensibilidade para esses espaços vazios — entender que o branco da página também carrega sentido.

Neste ensaio inaugural, proponho um exercício: prestar atenção não apenas ao que se afirma, mas à arquitetura das ausências.`,
      },
      {
        slug: "democracia-e-o-voto-informado",
        title: "Democracia e o voto informado",
        subject: "politica",
        excerpt:
          "Por que a qualidade da informação é tão decisiva quanto o próprio direito de votar.",
        coverImage: img("entrelinhas-democracia"),
        publishedAt: daysAgo(3),
        body: `O voto é o gesto mais simples e mais complexo da democracia.

Simples porque cabe num papel. Complexo porque exige, para ser pleno, um repertório de informação que nem sempre está acessível. Discutir planos de governo, checar promessas, comparar trajetórias — esse trabalho silencioso é o que separa a escolha consciente do impulso.

Às vésperas de mais um ciclo eleitoral, vale lembrar: informação não é luxo, é infraestrutura democrática.`,
      },
      {
        slug: "inteligencia-artificial-e-o-trabalho-criativo",
        title: "Inteligência artificial e o trabalho criativo",
        subject: "ciencia-tecnologia",
        excerpt:
          "A máquina que escreve, pinta e compõe nos obriga a redefinir o que é autoria.",
        coverImage: img("entrelinhas-ia"),
        publishedAt: daysAgo(6),
        body: `Quando uma máquina compõe uma canção, quem é o autor?

A pergunta parece técnica, mas é profundamente humana. Ferramentas de IA deslocam a fronteira entre o ofício e a ferramenta, entre o gesto criativo e a execução. Não se trata de pânico nem de entusiasmo cego, mas de uma negociação: o que queremos delegar e o que queremos preservar como exclusivamente nosso.`,
      },
      {
        slug: "saude-mental-na-era-da-pressa",
        title: "Saúde mental na era da pressa",
        subject: "saude",
        excerpt:
          "O cansaço que sentimos talvez não seja fraqueza, mas sintoma de um ritmo insustentável.",
        coverImage: img("entrelinhas-saude"),
        publishedAt: daysAgo(9),
        body: `Estamos cansados, e o cansaço virou paisagem.

A cultura da produtividade infinita transformou o descanso em culpa. Mas há uma diferença entre preguiça e a necessidade legítima de pausa. Cuidar da saúde mental começa por reconhecer que o corpo e a mente têm limites — e que respeitá-los é também um ato de resistência.`,
      },
      {
        slug: "o-cinema-como-espelho-social",
        title: "O cinema como espelho social",
        subject: "entretenimento",
        excerpt:
          "As telas não apenas entretêm: elas registram, antecipam e moldam imaginários coletivos.",
        coverImage: img("entrelinhas-cinema"),
        publishedAt: daysAgo(13),
        body: `Todo filme é um documento do seu tempo, mesmo quando inventa mundos.

O que uma sociedade escolhe filmar — e o que escolhe esconder — revela seus medos e desejos. Olhar criticamente para o cinema é aprender a ler outra das entrelinhas: a do imaginário que nos é vendido como entretenimento.`,
      },
    ].map((a) =>
      prisma.article.create({
        data: { ...a, author: "Entrelinhas", status: "published" },
      })
    )
  );

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
          { order: 0, articleId: articles[1].id }, // Democracia e o voto informado
          { order: 1, articleId: articles[2].id }, // IA e trabalho criativo
          { order: 2, audioId: podcasts[0].id },
          { order: 3, audioId: podcasts[1].id },
          { order: 4, videoId: videos[0].id },
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
