import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Capa com fallback editorial: se não houver imagem, mostra um gradiente
 * com a inicial do título. Mantém proporção via o container pai.
 */
export function CoverImage({ src, alt, className, sizes, priority }: Props) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-muted", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  const initial = alt.trim().charAt(0).toUpperCase() || "E";
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-accent/15 via-muted to-background",
        className
      )}
      aria-hidden
    >
      <span className="font-serif text-6xl font-semibold text-accent/40 select-none">
        {initial}
      </span>
      <div className="absolute inset-0 entrelinhas-rule opacity-30" />
    </div>
  );
}
