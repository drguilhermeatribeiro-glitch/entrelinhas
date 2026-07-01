import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "./login-form";
import { BrandLogo } from "@/components/brand-logo";

export const metadata: Metadata = { title: "Entrar · Administração" };

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-card border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <BrandLogo markClassName="h-8 w-auto" className="[&>span]:text-2xl" />
          <p className="mt-2 text-sm text-muted-foreground">
            Área administrativa
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
