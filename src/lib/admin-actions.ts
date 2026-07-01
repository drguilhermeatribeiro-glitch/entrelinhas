"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  destroySession,
  requireSession,
  verifyCredentials,
} from "@/lib/auth";
import { slugify } from "@/lib/utils";

// ---------------- Autenticação ----------------
export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifyCredentials(email, password)) {
    return { error: "E-mail ou senha incorretos." };
  }
  await createSession(email);
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

// ---------------- Helpers ----------------
function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}
function optStr(fd: FormData, key: string): string | null {
  const v = str(fd, key);
  return v.length ? v : null;
}
function optInt(fd: FormData, key: string): number | null {
  const v = str(fd, key);
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : null;
}

/** Gera slug único para um modelo, opcionalmente ignorando um id (edição). */
async function uniqueSlug(
  model: "article" | "audioTrack" | "video" | "collection",
  title: string,
  base?: string,
  ignoreId?: string
): Promise<string> {
  const root = slugify(base || title) || "item";
  let slug = root;
  let i = 1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const delegate = (prisma as any)[model];
  while (true) {
    const found = await delegate.findUnique({ where: { slug } });
    if (!found || found.id === ignoreId) return slug;
    slug = `${root}-${++i}`;
  }
}

function publishFields(status: string, current?: Date | null) {
  return {
    status,
    publishedAt:
      status === "published" ? current ?? new Date() : null,
  };
}

function revalidateAll(paths: string[]) {
  revalidatePath("/");
  for (const p of paths) revalidatePath(p);
}

// ---------------- Artigos ----------------
export async function saveArticle(formData: FormData) {
  await requireSession();
  const id = optStr(formData, "id");
  const title = str(formData, "title");
  const status = str(formData, "status") || "draft";

  const existing = id
    ? await prisma.article.findUnique({ where: { id } })
    : null;
  // Ao editar, preserva o slug (URL) existente; só gera ao criar.
  const slug =
    existing?.slug ??
    (await uniqueSlug("article", title, optStr(formData, "slug") ?? undefined));

  const data = {
    title,
    slug,
    subject: str(formData, "subject"),
    excerpt: optStr(formData, "excerpt"),
    body: str(formData, "body"),
    coverImage: optStr(formData, "coverImage"),
    pdfUrl: optStr(formData, "pdfUrl"),
    author: str(formData, "author") || "Entrelinhas",
    ...publishFields(status, existing?.publishedAt),
  };

  if (id) await prisma.article.update({ where: { id }, data });
  else await prisma.article.create({ data });

  revalidateAll(["/artigos"]);
  redirect("/admin/artigos");
}

export async function deleteArticle(formData: FormData) {
  await requireSession();
  await prisma.article.delete({ where: { id: str(formData, "id") } });
  revalidateAll(["/artigos"]);
  redirect("/admin/artigos");
}

// ---------------- Áudios ----------------
export async function saveAudio(formData: FormData) {
  await requireSession();
  const id = optStr(formData, "id");
  const title = str(formData, "title");
  const kind = str(formData, "kind") || "playlist";
  const status = str(formData, "status") || "draft";

  const existing = id
    ? await prisma.audioTrack.findUnique({ where: { id } })
    : null;
  const slug =
    existing?.slug ??
    (await uniqueSlug("audioTrack", title, optStr(formData, "slug") ?? undefined));

  const data = {
    title,
    slug,
    kind,
    description: optStr(formData, "description"),
    audioUrl: str(formData, "audioUrl"),
    coverImage: optStr(formData, "coverImage"),
    duration: optInt(formData, "duration"),
    season: optInt(formData, "season"),
    episode: optInt(formData, "episode"),
    ...publishFields(status, existing?.publishedAt),
  };

  if (id) await prisma.audioTrack.update({ where: { id }, data });
  else await prisma.audioTrack.create({ data });

  revalidateAll(["/playlist", "/podcasts"]);
  redirect("/admin/audios");
}

export async function deleteAudio(formData: FormData) {
  await requireSession();
  await prisma.audioTrack.delete({ where: { id: str(formData, "id") } });
  revalidateAll(["/playlist", "/podcasts"]);
  redirect("/admin/audios");
}

// ---------------- Vídeos ----------------
export async function saveVideo(formData: FormData) {
  await requireSession();
  const id = optStr(formData, "id");
  const title = str(formData, "title");
  const status = str(formData, "status") || "draft";

  const existing = id
    ? await prisma.video.findUnique({ where: { id } })
    : null;
  const slug =
    existing?.slug ??
    (await uniqueSlug("video", title, optStr(formData, "slug") ?? undefined));

  const data = {
    title,
    slug,
    subject: str(formData, "subject"),
    description: optStr(formData, "description"),
    source: str(formData, "source") || "embed",
    url: str(formData, "url"),
    thumbnail: optStr(formData, "thumbnail"),
    ...publishFields(status, existing?.publishedAt),
  };

  if (id) await prisma.video.update({ where: { id }, data });
  else await prisma.video.create({ data });

  revalidateAll(["/videos"]);
  redirect("/admin/videos");
}

export async function deleteVideo(formData: FormData) {
  await requireSession();
  await prisma.video.delete({ where: { id: str(formData, "id") } });
  revalidateAll(["/videos"]);
  redirect("/admin/videos");
}

// ---------------- Especiais (coleções) ----------------
export async function saveCollection(formData: FormData) {
  await requireSession();
  const id = optStr(formData, "id");
  const title = str(formData, "title");
  const status = str(formData, "status") || "draft";

  const existing = id
    ? await prisma.collection.findUnique({ where: { id } })
    : null;
  const slug =
    existing?.slug ??
    (await uniqueSlug("collection", title, optStr(formData, "slug") ?? undefined));

  // Itens vinculados vêm como múltiplos campos "items" no formato "tipo:id"
  const rawItems = formData.getAll("items").map(String).filter(Boolean);
  const itemsCreate = rawItems.map((raw, order) => {
    const [type, refId] = raw.split(":");
    return {
      order,
      articleId: type === "article" ? refId : null,
      audioId: type === "audio" ? refId : null,
      videoId: type === "video" ? refId : null,
    };
  });

  const base = {
    title,
    slug,
    intro: optStr(formData, "intro"),
    coverImage: optStr(formData, "coverImage"),
    ...publishFields(status, existing?.publishedAt),
  };

  if (id) {
    await prisma.collectionItem.deleteMany({ where: { collectionId: id } });
    await prisma.collection.update({
      where: { id },
      data: { ...base, items: { create: itemsCreate } },
    });
  } else {
    await prisma.collection.create({
      data: { ...base, items: { create: itemsCreate } },
    });
  }

  revalidateAll(["/especiais"]);
  redirect("/admin/especiais");
}

export async function deleteCollection(formData: FormData) {
  await requireSession();
  await prisma.collection.delete({ where: { id: str(formData, "id") } });
  revalidateAll(["/especiais"]);
  redirect("/admin/especiais");
}

// ---------------- Destaques (carrossel) ----------------
export async function saveHighlight(formData: FormData) {
  await requireSession();
  const id = optStr(formData, "id");

  const data = {
    title: str(formData, "title"),
    subtitle: optStr(formData, "subtitle"),
    imageUrl: optStr(formData, "imageUrl"),
    content: optStr(formData, "content"),
    linkUrl: optStr(formData, "linkUrl"),
    linkLabel: optStr(formData, "linkLabel"),
    order: optInt(formData, "order") ?? 0,
    status: str(formData, "status") || "draft",
  };

  if (id) await prisma.highlight.update({ where: { id }, data });
  else await prisma.highlight.create({ data });

  revalidateAll([]);
  redirect("/admin/destaques");
}

export async function deleteHighlight(formData: FormData) {
  await requireSession();
  await prisma.highlight.delete({ where: { id: str(formData, "id") } });
  revalidateAll([]);
  redirect("/admin/destaques");
}
