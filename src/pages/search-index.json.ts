import type { APIRoute } from "astro";
import { getAllPublishedArticles } from "../lib/articles";

export const GET: APIRoute = async () => {
  const articles = await getAllPublishedArticles();

  const searchIndex = articles.map((article) => {
    const isMarkdown = "data" in article;

    const title = isMarkdown
      ? article.data.title
      : article.title;

    const description = isMarkdown
      ? article.data.description
      : article.description;

    const category = isMarkdown
      ? article.data.category
      : article.category;

    const tags = isMarkdown
      ? article.data.tags
      : [];

    const pubDate = isMarkdown
      ? article.data.pubDate
      : article.pubDate;

    const readingTime = isMarkdown
      ? article.data.readingTime
      : article.readingTime;

    return {
      title,
      description,
      category,
      tags,
      url: `/artikel/${article.id}/`,
      date: pubDate.toISOString().slice(0, 10),
      readingTime,
    };
  });

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
