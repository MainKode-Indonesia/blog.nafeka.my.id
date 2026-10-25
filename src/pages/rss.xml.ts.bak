
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getPublishedArticles } from "../lib/articles";

export const GET: APIRoute = async (context) => {
  const articles = await getPublishedArticles();

  return rss({
    title: "KataKode — Bercerita tentang kode",
    description:
      "Artikel, tutorial, dan cerita seputar teknologi dan pemrograman.",
    site: context.site ?? "https://blog.nafeka.my.id",
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: `/artikel/${article.id}/`,
      categories: [
        article.data.category,
        ...article.data.tags,
      ],
    })),
    customData: "<language>id-ID</language>",
  });
};
