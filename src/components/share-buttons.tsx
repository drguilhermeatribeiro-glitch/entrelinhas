"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined" ? window.location.href : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponível */
    }
  };

  const enc = encodeURIComponent;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Compartilhar:</span>
      <a
        href={`https://wa.me/?text=${enc(title + " " + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-muted"
      >
        WhatsApp
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-muted"
      >
        X / Twitter
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm hover:bg-muted cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-accent" /> Copiado
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4" /> Copiar link
          </>
        )}
      </button>
    </div>
  );
}
