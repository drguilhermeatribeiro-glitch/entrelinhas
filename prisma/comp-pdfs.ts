// Define o pdfUrl dos 3 artigos da proposta ENTRELINHAS COMP e exporta seus
// dados para prisma/_pdf-input.json, consumido por scripts/article-pdf.py
// (gerador da "versão no papel" com o layout padronizado).
// Uso: npm run pdf:comp  (roda este script, depois o gerador Python)
import "dotenv/config";
import { writeFileSync } from "node:fs";
import { PrismaClient } from "../src/generated/prisma/client";
import { createAdapter } from "../src/lib/db-adapter";

const prisma = new PrismaClient({ adapter: createAdapter() });

const SLUGS = [
  "paradoxo-democracia-conselhos-de-medicina",
  "do-alto-do-mulungu-as-urnas-2026",
  "maquiavel-nunca-foi-o-vilao",
];

async function main() {
  const out = [];
  for (const slug of SLUGS) {
    const pdfUrl = `/artigos/pdf/${slug}.pdf`;
    const a = await prisma.article.update({
      where: { slug },
      data: { pdfUrl },
    });
    out.push({
      slug: a.slug,
      title: a.title,
      subject: a.subject,
      excerpt: a.excerpt ?? "",
      author: a.author,
      publishedAt: a.publishedAt?.toISOString() ?? new Date().toISOString(),
      body: a.body,
    });
    console.log("   pdfUrl set:", slug);
  }
  writeFileSync(
    new URL("./_pdf-input.json", import.meta.url),
    JSON.stringify(out, null, 2),
    "utf-8"
  );
  console.log("✅ pdfUrl atualizado e _pdf-input.json gerado.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
