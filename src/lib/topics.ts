import { topics } from "../data/topics";
import type { Topic } from "../data/topics";
import { getDirectusCategories } from "./directus";

export async function getAllTopics(): Promise<Topic[]> {
  const directusCategories = await getDirectusCategories();

  // Topik bawaan KataKode tetap menjadi sumber utama.
  const mergedTopics = new Map<string, Topic>();

  for (const topic of topics) {
    mergedTopics.set(topic.slug.toLowerCase(), topic);
  }

  // Tambahkan kategori dari Directus.
  for (const category of directusCategories) {
    const slug = category.slug?.trim().toLowerCase();

    if (!slug || mergedTopics.has(slug)) {
      continue;
    }

    mergedTopics.set(slug, {
      name: category.name,
      slug,
      description:
        category.description ||
        `Jelajahi artikel, tutorial, dan pembahasan seputar ${category.name}.`,
      icon: "◇",
    });
  }

  return [...mergedTopics.values()];
}

export function getArticleCategory(
  article: {
    data?: { category: string };
    category?: string;
  }
): string {
  return "data" in article
    ? article.data?.category ?? "Umum"
    : article.category ?? "Umum";
}

export function isArticleInTopic(
  article: {
    data?: { category: string };
    category?: string;
  },
  topic: Topic
): boolean {
  return (
    getArticleCategory(article).trim().toLowerCase() ===
    topic.name.trim().toLowerCase()
  );
}
