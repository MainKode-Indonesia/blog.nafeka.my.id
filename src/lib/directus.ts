// src/lib/directus.ts

const DIRECTUS_URL = import.meta.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = import.meta.env.DIRECTUS_TOKEN;

export interface DirectusCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface DirectusArticle {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  excerpt: string;
  content: string;
  published_at: string | null;
  cover_image: string | null;
  category: DirectusCategory | null;
}

interface DirectusResponse<T> {
  data: T;
}

async function directusFetch<T>(
  endpoint: string
): Promise<T> {
  if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
    throw new Error(
      "DIRECTUS_URL atau DIRECTUS_TOKEN belum dikonfigurasi."
    );
  }

  const response = await fetch(
    `${DIRECTUS_URL}${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Directus API error: HTTP ${response.status}`
    );
  }

  const result =
    (await response.json()) as DirectusResponse<T>;

  return result.data;
}

// Mengambil artikel yang sudah diterbitkan
export async function getDirectusArticles() {
  const params = new URLSearchParams();

  params.set("filter[status][_eq]", "published");
  params.set("fields", "id,title,slug,status,excerpt,content,published_at,cover_image,category.id,category.name,category.slug");
  params.set("sort", "-published_at");
  params.set("limit", "-1");

  return directusFetch<DirectusArticle[]>(
    `/items/KataKode_Articles?${params.toString()}`
  );
}

// Mengambil daftar kategori
export async function getDirectusCategories() {
  return directusFetch<DirectusCategory[]>(
    "/items/KataKode_Categories?fields=id,name,slug,description"
  );
}
