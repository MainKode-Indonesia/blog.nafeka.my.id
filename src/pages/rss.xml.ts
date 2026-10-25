import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getAllPublishedArticles } from "../lib/articles";

export const GET: APIRoute = async (context) => {
  const articles = await getAllPublishedArticles();

  return rss({
    title: "KataKode — Bercerita tentang kode",
    description:
      "Artikel, tutorial, dan cerita seputar teknologi dan pemrograman.",
    site: context.site ?? "https://blog.nafeka.my.id",

    items: articles.map((article) => {
      const isMarkdown = "data" in article;

      const title = isMarkdown
        ? article.data.title
        : article.title;

      const description = isMarkdown
        ? article.data.description
        : article.description;

      const pubDate = isMarkdown
        ? article.data.pubDate
        : article.pubDate;

      const category = isMarkdown
        ? article.data.category
        : article.category;

      const tags = isMarkdown
        ? article.data.tags
        : [];

      return {
        title,
        description,
        pubDate,
        link: `/artikel/${article.id}/`,
        categories: [category, ...tags],
      };
    }),

    customData: "<language>id-ID</language>",
  });
};

