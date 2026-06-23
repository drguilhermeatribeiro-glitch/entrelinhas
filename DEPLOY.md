# Publicando o ENTRELINHAS (grátis) — Vercel + Neon

Guia para colocar o portal no ar, com site público **e** área administrativa,
em domínio gratuito (`seu-projeto.vercel.app`).

Tempo estimado: ~20 min. Tudo aqui usa planos gratuitos.

---

## Visão geral

| Peça | Serviço | Plano |
|------|---------|-------|
| Hospedagem da aplicação | Vercel | Hobby (grátis) |
| Banco de dados PostgreSQL | Neon | Free |
| Domínio | `*.vercel.app` | grátis |
| (Opcional) E-mail da newsletter | Resend | grátis até o limite |

> Localmente o projeto usa SQLite (arquivo `dev.db`). Em produção usamos
> PostgreSQL na Neon. O código já se adapta sozinho pela `DATABASE_URL`.

---

## Passo 1 — Criar o banco na Neon

1. Acesse **https://neon.tech** e crie uma conta grátis (pode usar o GitHub/Google).
2. Crie um **projeto** (ex.: `entrelinhas`). Escolha a região mais próxima.
3. Copie a **connection string** (algo como
   `postgresql://user:senha@ep-xxx.neon.tech/neondb?sslmode=require`).

> Guarde essa string — é o valor da variável `DATABASE_URL`.

## Passo 2 — Apontar o projeto para o Postgres

No arquivo `prisma/schema.prisma`, troque o provider:

```prisma
datasource db {
  provider = "postgresql"   // era "sqlite"
}
```

No `.env` local, troque a `DATABASE_URL` para a string da Neon (Passo 1).

Depois, no terminal do projeto, rode:

```bash
npm run db:push     # cria as tabelas na Neon
npm run db:seed     # popula com o conteúdo de exemplo (inclui "Eleições 2026")
```

> Pronto: o mesmo `npm run dev` agora roda local usando a Neon.

## Passo 3 — Subir o código para o GitHub

1. Crie um repositório vazio em **https://github.com/new** (ex.: `entrelinhas`).
2. No terminal do projeto:

```bash
git remote add origin https://github.com/SEU_USUARIO/entrelinhas.git
git branch -M main
git push -u origin main
```

(O `.env` **não** vai para o GitHub — está protegido pelo `.gitignore`.)

## Passo 4 — Deploy na Vercel

1. Acesse **https://vercel.com** e entre com o GitHub.
2. **Add New → Project** → importe o repositório `entrelinhas`.
3. Em **Environment Variables**, adicione (valores do seu `.env`):

   | Nome | Valor |
   |------|-------|
   | `DATABASE_URL` | string da Neon |
   | `ADMIN_EMAIL` | seu e-mail de admin |
   | `ADMIN_PASSWORD` | uma senha forte |
   | `AUTH_SECRET` | um texto aleatório longo |

4. Clique **Deploy**. Em ~1–2 min o site estará em
   `https://entrelinhas.vercel.app` (ou nome similar).

## Passo 5 — Conferir

- Site público: `https://SEU-PROJETO.vercel.app`
- Administração: `https://SEU-PROJETO.vercel.app/admin/login`
  (entre com `ADMIN_EMAIL` / `ADMIN_PASSWORD`).

---

## Depois (opcional)

- **Domínio próprio**: em Vercel → Project → Settings → Domains, é possível
  ligar um domínio que você comprar.
- **Upload de mídia** (áudios/imagens pelo admin): integrar Cloudflare R2 ou
  Vercel Blob. Hoje o admin aceita **URLs** de mídia.
- **Disparo de e-mails**: criar conta na Resend, definir `RESEND_API_KEY` e
  `NEWSLETTER_FROM`, e ativar o envio no ponto já marcado em
  `src/lib/actions.ts`.

## Dicas de manutenção

- Toda alteração enviada ao GitHub (`git push`) faz a Vercel **re-deployar**.
- Para gerenciar conteúdo do dia a dia, use o `/admin` — não precisa mexer em código.
- `npm run db:studio` abre um painel visual do banco, se precisar inspecionar dados.
