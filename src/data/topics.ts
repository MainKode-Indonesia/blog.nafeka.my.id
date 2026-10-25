
export interface Topic {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const topics: Topic[] = [
  {
    name: "Web Development",
    slug: "web-development",
    description:
      "Membangun website dan aplikasi web modern, dari frontend hingga backend.",
    icon: "⌘",
  },
  {
    name: "Programming",
    slug: "programming",
    description:
      "Mempelajari bahasa pemrograman, logika, algoritma, dan praktik coding.",
    icon: "</>",
  },
  {
    name: "Linux",
    slug: "linux",
    description:
      "Menjelajahi Linux, terminal, open source, dan administrasi sistem.",
    icon: "◈",
  },
  {
    name: "Networking",
    slug: "networking",
    description:
      "Memahami jaringan komputer, server, DNS, dan infrastruktur internet.",
    icon: "◎",
  },
];

export function getTopicBySlug(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}
