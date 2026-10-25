
import { getCollection } from "astro:content";

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
