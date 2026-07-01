import Link from "next/link";
import {
  FileText,
  Music,
  Video,
  Layers,
  Mail,
  GalleryHorizontalEnd,
  Plus,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [highlights, articles, audios, videos, collections, subscribers] =
    await Promise.all([
      prisma.highlight.count(),
      prisma.article.count(),
      prisma.audioTrack.count(),
      prisma.video.count(),
      prisma.collection.count(),
      prisma.subscriber.count(),
    ]);

  const stats = [
    { label: "Destaques", value: highlights, href: "/admin/destaques", icon: GalleryHorizontalEnd },
    { label: "Artigos", value: articles, href: "/admin/artigos", icon: FileText },
    { label: "Áudios", value: audios, href: "/admin/audios", icon: Music },
    { label: "Vídeos", value: videos, href: "/admin/videos", icon: Video },
    { label: "Especiais", value: collections, href: "/admin/especiais", icon: Layers },
    { label: "Inscritos", value: subscribers, href: "/admin/inscritos", icon: Mail },
  ];

  const quick = [
    { label: "Novo destaque", href: "/admin/destaques/novo" },
    { label: "Novo artigo", href: "/admin/artigos/novo" },
    { label: "Novo áudio", href: "/admin/audios/novo" },
    { label: "Novo vídeo", href: "/admin/videos/novo" },
    { label: "Novo especial", href: "/admin/especiais/novo" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold tracking-tight">
        Painel
      </h1>
      <p className="mt-1 text-muted-foreground">
        Bem-vindo de volta. Gerencie o conteúdo do Entrelinhas.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="rounded-card border border-border bg-card p-5 transition-colors hover:border-accent/40"
            >
              <Icon className="h-5 w-5 text-accent" />
              <p className="mt-3 text-3xl font-semibold tabular-nums">
                {s.value}
              </p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </Link>
          );
        })}
      </div>

      <h2 className="mt-10 mb-4 font-serif text-xl font-semibold">
        Ações rápidas
      </h2>
      <div className="flex flex-wrap gap-3">
        {quick.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> {q.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
