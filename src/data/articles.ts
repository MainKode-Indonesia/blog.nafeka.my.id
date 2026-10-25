
export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: number;
  featured?: boolean;
  cover: string;
}

export const articles: Article[] = [
  {
    title: "Memulai Perjalanan sebagai Web Developer",
    slug: "memulai-perjalanan-web-developer",
    excerpt:
      "Panduan memahami dasar-dasar web development, teknologi yang digunakan, dan langkah pertama untuk mulai belajar.",
    category: "Web Development",
    date: "2026-10-25",
    readingTime: 6,
    featured: true,
    cover: "/images/web-development.jpg",
  },
  {
    title: "Apa Itu Linux dan Mengapa Developer Menggunakannya?",
    slug: "mengenal-linux-untuk-developer",
    excerpt:
      "Mengenal sistem operasi Linux, keunggulannya, serta alasan Linux banyak digunakan dalam pengembangan software.",
    category: "Linux",
    date: "2026-10-24",
    readingTime: 5,
    cover: "/images/linux.jpg",
  },
  {
    title: "HTML, CSS, dan JavaScript: Apa Perbedaannya?",
    slug: "perbedaan-html-css-javascript",
    excerpt:
      "Memahami peran tiga teknologi utama dalam membangun website modern.",
    category: "Programming",
    date: "2026-10-23",
    readingTime: 4,
    cover: "/images/programming.jpg",
  },
  {
    title: "Memahami Cara Kerja Web Server",
    slug: "memahami-web-server",
    excerpt:
      "Bagaimana browser, domain, DNS, dan web server bekerja sama untuk menampilkan sebuah website.",
    category: "Networking",
    date: "2026-10-22",
    readingTime: 7,
    cover: "/images/server.jpg",
  },
];

export const featuredArticle = articles.find(
  (article) => article.featured
);

export const latestArticles = articles.filter(
  (article) => !article.featured
);
