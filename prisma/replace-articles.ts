// Script pontual: substitui os artigos de teste pelos artigos reais
// (de prisma/articles-data.json), preservando áudios, vídeos e inscritos.
// Uso: npm run db:articles
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { createAdapter } from "../src/lib/db-adapter";
import articlesData from "./articles-data.json";

const prisma = new PrismaClient({ adapter: createAdapter() });

async function main() {
  console.log("🗑️  Removendo artigos antigos (de teste)...");
  const del = await prisma.article.deleteMany();
  console.log("   removidos:", del.count);

  console.log("📝 Inserindo artigos reais...");
  const created = [];
  for (const a of articlesData) {
    const art = await prisma.article.create({
      data: {
        slug: a.slug,
        title: a.title,
        subject: a.subject,
        excerpt: a.excerpt,
        body: a.body,
        author: a.author,
        publishedAt: new Date(a.publishedAt),
        status: "published",
      },
    });
    created.push(art);
    console.log("   +", art.title);
  }

  // Religa o artigo político ao especial "Eleições 2026", se ele existir
  const special = await prisma.collection.findUnique({
    where: { slug: "eleicoes-2026" },
  });
  const lula = created.find((a) => a.slug === "lula-juscelino-kubitschek");
  if (special && lula) {
    const exists = await prisma.collectionItem.findFirst({
      where: { collectionId: special.id, articleId: lula.id },
    });
    if (!exists) {
      await prisma.collectionItem.create({
        data: { collectionId: special.id, articleId: lula.id, order: 0 },
      });
      console.log("   ⭐ vinculado ao especial Eleições 2026:", lula.title);
    }
  }

  console.log("✅ Concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
