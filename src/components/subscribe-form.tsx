"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { subscribeAction, type SubscribeState } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initial: SubscribeState = { ok: false, message: "" };

export function SubscribeForm({
  source = "site",
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
  const [state, action, pending] = useActionState(subscribeAction, initial);

  if (state.ok && state.message) {
    return (
      <div className="flex items-start gap-3 rounded-card border border-accent/30 bg-accent/8 p-4 text-sm">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <p className="text-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="source" value={source} />
      {/* Honeypot (oculto) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className={cn("gap-3", compact ? "space-y-3" : "sm:flex sm:space-y-0 space-y-3")}>
        <input
          type="text"
          name="name"
          required
          placeholder="Seu nome"
          className="w-full rounded-full border border-input bg-background px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="seu@email.com"
          className="w-full rounded-full border border-input bg-background px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
        />
        <span>
          Concordo em receber e-mails do Entrelinhas e li a{" "}
          <a href="/privacidade" className="text-accent underline">
            política de privacidade
          </a>
          . Posso cancelar quando quiser.
        </span>
      </label>

      {!state.ok && state.message && (
        <p className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="h-4 w-4" /> {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Enviando..." : "Quero me inscrever"}
      </Button>
    </form>
  );
}
