import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { createAdapter } from "../src/lib/db-adapter";
const p = new PrismaClient({ adapter: createAdapter() });
async function main() {
  const url =
    "https://www.dropbox.com/scl/fi/dvqgymvl51ghkzw8dcwha/le-o-xiv.webp?rlkey=bc8ap6n81x6isju1bn7kc1a3n&st=lspug7io&raw=1";
  const r = await p.article.updateMany({
    where: { slug: "leao-xiv-inteligencia-artificial" },
    data: { coverImage: url },
  });
  console.log("atualizados:", r.count);
}
main().finally(() => p.$disconnect());
