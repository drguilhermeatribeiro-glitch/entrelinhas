/** Converte uma URL de YouTube/Vimeo na URL de embed correspondente. */
function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
    return null;
  } catch {
    return null;
  }
}

export function VideoEmbed({
  url,
  source = "embed",
  title,
}: {
  url: string;
  source?: string;
  title: string;
}) {
  if (source === "upload") {
    return (
      <video
        controls
        className="aspect-video w-full rounded-card border border-border bg-black"
        src={url}
      >
        Seu navegador não suporta vídeo.
      </video>
    );
  }

  const embed = toEmbedUrl(url);
  if (!embed) {
    return (
      <div className="aspect-video w-full rounded-card border border-border bg-muted p-6 text-center text-sm text-muted-foreground">
        Não foi possível carregar o vídeo.{" "}
        <a href={url} className="text-accent underline">
          Abrir no site original
        </a>
        .
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-card border border-border bg-black">
      <iframe
        src={embed}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
        loading="lazy"
      />
    </div>
  );
}
