/**
 * Seleciona o driver adapter do Prisma conforme a DATABASE_URL:
 * - "postgres://" / "postgresql://"  → Neon (produção, ex.: Vercel)
 * - "file:..."                       → SQLite local (desenvolvimento)
 *
 * Assim o mesmo código roda local e em produção: muda só a variável de ambiente
 * (e o `provider` no schema.prisma, conforme o DEPLOY.md).
 */
export function createAdapter() {
  const url = process.env.DATABASE_URL ?? "file:./dev.db";

  if (url.startsWith("postgres://") || url.startsWith("postgresql://")) {
    // Carregamento dinâmico para não exigir o pacote no ambiente SQLite
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaNeon } = require("@prisma/adapter-neon");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { neonConfig } = require("@neondatabase/serverless");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ws = require("ws");
    // O driver serverless da Neon precisa de um WebSocket em Node
    neonConfig.webSocketConstructor = ws;
    return new PrismaNeon({ connectionString: url });
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
  return new PrismaBetterSqlite3({ url });
}
