import { cn } from "@/lib/utils";

/** Heurística simples: o conteúdo parece conter marcação HTML? */
function looksLikeHtml(s: string): boolean {
  return /<\/?[a-z][a-z0-9-]*(\s[^>]*)?>/i.test(s);
}

/**
 * Renderiza conteúdo de texto OU HTML.
 *
 * O admin é operado por um único dono confiável (autor do conteúdo), então é
 * seguro renderizar o HTML que ele mesmo cadastra. Se o conteúdo não tiver
 * marcação, cai no modo texto: linhas viram parágrafos e `## ` vira subtítulo.
 */
export function RichContent({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  if (looksLikeHtml(content)) {
    return (
      <div
        className={cn("prose-reading", className)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const blocks = content
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className={cn("prose-reading", className)}>
      {blocks.map((b, i) => {
        const img = b.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (img) {
          return (
            <figure key={i} className="my-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img[2]} alt={img[1]} className="w-full rounded-card" />
              {img[1] && (
                <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                  {img[1]}
                </figcaption>
              )}
            </figure>
          );
        }
        if (b.startsWith("## ")) return <h2 key={i}>{b.slice(3)}</h2>;
        if (b.startsWith("### ")) return <h3 key={i}>{b.slice(4)}</h3>;
        return <p key={i}>{b}</p>;
      })}
    </div>
  );
}
