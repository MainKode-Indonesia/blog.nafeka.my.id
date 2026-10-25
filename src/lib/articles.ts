
import { getCollection } from "astro:content";

import { getDirectusArticles } from "./directus";
import {
  adaptDirectusArticle,
  type UnifiedArticle,
} from "./article-adapter";

export async function getPublishedArticles() {
  const articles = await getCollection(
    "articles",
    ({ data }) => !data.draft
  );

  return articles.sort(
    (a, b) =>
      b.data.pubDate.getTime() -
      a.data.pubDate.getTime()
  );
}

export async function getFeaturedArticle() {
  const articles = await getPublishedArticles();

  return articles.find(
    (article) => article.data.featured
  );
}

export async function getLatestArticles(limit = 6) {
  const articles = await getPublishedArticles();

  return articles
    .filter((article) => !article.data.featured)
    .slice(0, limit);
}

export function formatArticleDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export async function getAllPublishedArticles() {
  const markdownArticles = await getPublishedArticles();

  const directusArticles = (await getDirectusArticles()).map(
    adaptDirectusArticle
  );

  // Hindari slug yang sama dari dua sumber.
  const markdownSlugs = new Set(
    markdownArticles.map((article) => article.id)
  );

  const uniqueDirectusArticles = directusArticles.filter(
    (article) => !markdownSlugs.has(article.id)
  );

  const allArticles: (
    | (typeof markdownArticles)[number]
    | UnifiedArticle
  )[] = [
    ...markdownArticles,
    ...uniqueDirectusArticles,
  ];

  return allArticles.sort((a, b) => {
    const dateA = "data" in a ? a.data.pubDate : a.pubDate;
    const dateB = "data" in b ? b.data.pubDate : b.pubDate;

    return dateB.getTime() - dateA.getTime();
  });
}
