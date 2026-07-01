"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Slide = {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string | null;
  content: string | null;
  linkUrl: string | null;
  linkLabel: string | null;
};

export function HighlightCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const n = slides.length;
  if (n === 0) return null;

  const go = (delta: number) => setIndex((p) => (p + delta + n) % n);
  const s = slides[index];
  const hasImage = Boolean(s.imageUrl);

  return (
    <div className="group relative overflow-hidden rounded-card border border-border">
      <div className="relative flex min-h-[18rem] flex-col justify-end sm:min-h-[24rem]">
        {hasImage ? (
          <>
            <Image
              key={s.id}
              src={s.imageUrl as string}
              alt={s.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-muted to-background" />
        )}

        <div
          className={cn(
            "relative max-w-2xl p-6 sm:p-10",
            hasImage ? "text-white" : "text-foreground"
          )}
        >
          <p
            className={cn(
              "mb-2 text-xs font-semibold uppercase tracking-[0.2em]",
              hasImage ? "text-white/80" : "text-accent"
            )}
          >
            Destaque
          </p>
          <h3 className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {s.title}
          </h3>
          {s.subtitle && (
            <p
              className={cn(
                "mt-3 text-base sm:text-lg",
                hasImage ? "text-white/85" : "text-muted-foreground"
              )}
            >
              {s.subtitle}
            </p>
          )}
          {s.content?.trim() && (
            <div
              className={cn(
                "mt-3 text-sm",
                hasImage ? "text-white/80" : "text-muted-foreground"
              )}
              dangerouslySetInnerHTML={{ __html: s.content }}
            />
          )}
          {s.linkUrl && (
            <Link
              href={s.linkUrl}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              {s.linkLabel || "Ver mais"}
            </Link>
          )}
        </div>

        {/* Botões de passagem */}
        {n > 1 && (
          <>
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur transition hover:bg-background cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Próximo"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur transition hover:bg-background cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 right-6 flex gap-2">
              {slides.map((slide, k) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Ir para o destaque ${k + 1}`}
                  onClick={() => setIndex(k)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    k === index
                      ? "w-6 bg-accent"
                      : hasImage
                        ? "w-2 bg-white/60 hover:bg-white"
                        : "w-2 bg-foreground/30 hover:bg-foreground/60"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
