import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

function csvField(value: string): string {
  // Escapa aspas e envolve em aspas se necessário
  if (/[",\n;]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return new Response("Não autorizado", { status: 401 });
  }

  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  const header = ["Nome", "Email", "Confirmado", "Origem", "Consentimento", "Inscrição"];
  const lines = subscribers.map((s) =>
    [
      csvField(s.name),
      csvField(s.email),
      s.confirmed ? "sim" : "não",
      csvField(s.source),
      s.consentAt.toISOString(),
      s.createdAt.toISOString(),
    ].join(",")
  );

  // BOM para o Excel reconhecer UTF-8
  const csv = "﻿" + [header.join(","), ...lines].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inscritos-entrelinhas.csv"`,
    },
  });
}
