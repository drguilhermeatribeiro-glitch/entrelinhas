"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Music,
  Video,
  Layers,
  Mail,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { logoutAction } from "@/lib/admin-actions";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Painel", icon: LayoutDashboard, exact: true },
  { href: "/admin/artigos", label: "Artigos", icon: FileText },
  { href: "/admin/audios", label: "Áudios", icon: Music },
  { href: "/admin/videos", label: "Vídeos", icon: Video },
  { href: "/admin/especiais", label: "Especiais", icon: Layers },
  { href: "/admin/inscritos", label: "Inscritos", icon: Mail },
];

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col gap-1 border-b border-border bg-card p-4 md:h-screen md:w-60 md:shrink-0 md:border-b-0 md:border-r">
      <Link
        href="/admin"
        className="mb-4 hidden font-serif text-xl font-semibold tracking-tight md:block"
      >
        Entre<span className="text-accent">linhas</span>
        <span className="mt-0.5 block text-xs font-sans font-normal text-muted-foreground">
          Administração
        </span>
      </Link>

      <nav className="flex flex-wrap gap-1 md:flex-col">
        {LINKS.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-accent/12 text-accent"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden flex-col gap-1 pt-4 md:flex">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" /> Ver o site
        </Link>
        <p className="truncate px-3 text-xs text-muted-foreground" title={email}>
          {email}
        </p>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </form>
      </div>
    </aside>
  );
}
