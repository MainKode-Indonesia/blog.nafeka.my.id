import type { DirectusArticle } from "./directus";

export interface UnifiedArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  pubDate: Date;
  readingTime: number;
  source: "markdown" | "directus";
}

export function adaptDirectusArticle(
  article: DirectusArticle
): UnifiedArticle {
  const plainText = (article.content ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = plainText
    ? plainText.split(/\s+/).length
    : 0;

  return {
    id: article.slug,
    title: article.title,
    description: article.excerpt ?? "",
    category: article.category?.name ?? "Umum",
    pubDate: article.published_at
      ? new Date(article.published_at)
      : new Date(0),
    readingTime: Math.max(1, Math.ceil(wordCount / 200)),
    source: "directus",
  };
}
