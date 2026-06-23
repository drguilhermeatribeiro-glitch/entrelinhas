"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const subscribeSchema = z.object({
  name: z.string().min(2, "Informe seu nome.").max(120),
  email: z.string().email("E-mail inválido."),
  consent: z.literal("on", {
    message: "É preciso aceitar a política de privacidade.",
  }),
});

export type SubscribeState = {
  ok: boolean;
  message: string;
};

export async function subscribeAction(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  // Honeypot anti-spam: campo oculto que humanos não preenchem
  if (formData.get("website")) {
    return { ok: true, message: "Inscrição recebida!" };
  }

  const parsed = subscribeSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    consent: formData.get("consent"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Dados inválidos.",
    };
  }

  const { name, email } = parsed.data;
  const source = (formData.get("source") as string) || "site";

  try {
    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      return {
        ok: true,
        message: "Você já está inscrito. Obrigado por acompanhar o Entrelinhas!",
      };
    }

    await prisma.subscriber.create({
      data: { name, email, source, consentAt: new Date() },
    });

    // Aqui entraria o envio de confirmação (double opt-in) via Resend,
    // quando RESEND_API_KEY estiver configurada.

    return {
      ok: true,
      message: "Inscrição confirmada! Em breve você recebe nossas novidades.",
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível concluir a inscrição. Tente novamente.",
    };
  }
}
