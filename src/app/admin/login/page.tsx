import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Entrar · Administração" };

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-card border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 text-center">
          <span className="font-serif text-2xl font-semibold tracking-tight">
            Entre<span className="text-accent">linhas</span>
          </span>
          <p className="mt-1 text-sm text-muted-foreground">
            Área administrativa
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
