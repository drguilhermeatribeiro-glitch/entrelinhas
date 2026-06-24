// Constantes compartilhadas do portal ENTRELINHAS

export const SITE = {
  name: "Entrelinhas",
  tagline: "Leitura atenta, nas entrelinhas do que importa.",
  description:
    "Portal editorial com artigos de opinião, podcasts, canções autorais e vídeos — pensados para quem lê o mundo nas entrelinhas.",
  url: "http://localhost:3000",
} as const;

/** Itens do menu principal */
export const NAV_LINKS = [
  { href: "/artigos", label: "Artigos" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/playlist", label: "Playlist" },
  { href: "/videos", label: "Vídeos" },
  { href: "/especiais", label: "Especiais" },
] as const;

/** Assuntos/categorias usados por artigos e vídeos */
export const SUBJECTS = [
  { slug: "politica", name: "Política" },
  { slug: "espiritualidade", name: "Espiritualidade" },
  { slug: "cultura", name: "Cultura" },
  { slug: "interdisciplinar", name: "Interdisciplinar" },
  { slug: "ciencia-tecnologia", name: "Ciência e Tecnologia" },
  { slug: "entretenimento", name: "Entretenimento" },
  { slug: "saude", name: "Saúde" },
  { slug: "sociedade", name: "Sociedade" },
] as const;

export function subjectName(slug: string): string {
  return SUBJECTS.find((s) => s.slug === slug)?.name ?? slug;
}

export type ContentType = "artigo" | "podcast" | "playlist" | "video" | "especial";

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  artigo: "Artigo",
  podcast: "Podcast",
  playlist: "Canção",
  video: "Vídeo",
  especial: "Especial",
};

export const STATUS = {
  draft: "draft",
  published: "published",
} as const;
