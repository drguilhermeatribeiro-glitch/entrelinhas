import type { Metadata } from "next";
import { PageHeader } from "@/components/section-heading";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = { title: "Política de Privacidade" };

export default function PrivacidadePage() {
  return (
    <>
      <PageHeader
        title="Política de Privacidade"
        description="Como o Entrelinhas trata seus dados, em conformidade com a LGPD."
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 prose-reading">
        <p>
          O {SITE.name} coleta apenas os dados necessários para enviar suas
          atualizações por e-mail: <strong>nome</strong> e{" "}
          <strong>endereço de e-mail</strong>, fornecidos voluntariamente no
          formulário de inscrição.
        </p>
        <h2>Consentimento</h2>
        <p>
          Ao se inscrever, você consente expressamente em receber nossos
          conteúdos. Registramos a data e a origem desse consentimento.
        </p>
        <h2>Uso dos dados</h2>
        <p>
          Seus dados são usados exclusivamente para o envio da newsletter. Não
          vendemos nem compartilhamos suas informações com terceiros para fins
          de marketing.
        </p>
        <h2>Descadastro</h2>
        <p>
          Você pode cancelar a inscrição a qualquer momento pelo link presente
          em todos os e-mails, ou solicitando a remoção pelo nosso contato.
        </p>
        <h2>Seus direitos</h2>
        <p>
          Conforme a Lei Geral de Proteção de Dados (LGPD), você pode solicitar
          acesso, correção ou exclusão dos seus dados a qualquer momento.
        </p>
      </article>
    </>
  );
}
