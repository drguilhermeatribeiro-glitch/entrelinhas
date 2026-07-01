import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { SubscribeForm } from "@/components/subscribe-form";
import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Link href="/" aria-label="Entrelinhas">
              <BrandLogo markClassName="h-8 w-auto" className="[&>span]:text-2xl" />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>
            <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold">
              Receba as novidades
            </h3>
            <p className="mt-1.5 mb-4 text-sm text-muted-foreground">
              Artigos, áudios e vídeos novos no seu e-mail.
            </p>
            <SubscribeForm source="footer" compact />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Todos os direitos
            reservados.
          </p>
          <p>
            <Link href="/privacidade" className="hover:text-foreground">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
