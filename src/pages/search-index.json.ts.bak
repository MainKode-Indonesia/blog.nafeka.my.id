
import type { APIRoute } from "astro";
import { getPublishedArticles } from "../lib/articles";

export const GET: APIRoute = async () => {
  const articles = await getPublishedArticles();

  const searchIndex = articles.map((article) => ({
    title: article.data.title,
    description: article.data.description,
    category: article.data.category,
    tags: article.data.tags,
    url: `/artikel/${article.id}/`,
    date: article.data.pubDate.toISOString().slice(0, 10),
    readingTime: article.data.readingTime,
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
