export type JournalEntry = {
  slug: string;
  title: string;
  kicker: string;
  date: string;
  excerpt: string;
  body: string[];
  image: string;
};

export const journal: JournalEntry[] = [
  {
    slug: "on-light",
    title: "On Light",
    kicker: "Notes on Natural Portraiture",
    date: "March 2026",
    excerpt: "The best light is rarely the one you planned for.",
    body: [
      "Most of what reads as technique is really just patience — waiting for the light to become honest.",
      "I keep a single reflector and leave the rest to the weather. The pictures that last are the ones I almost didn't take.",
    ],
    image: "https://images.unsplash.com/photo-1495466587376-02676cbc8dab?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "in-between",
    title: "In Between",
    kicker: "Why Quiet Images Stay With Us",
    date: "January 2026",
    excerpt: "The frame before the pose is usually the one worth keeping.",
    body: [
      "There's a moment, just before someone arranges themselves for a camera, that tells you more than the arranged version ever will.",
      "I try to work in that gap — after the direction, before the performance.",
    ],
    image: "https://images.unsplash.com/photo-1571816119607-57e48af1caa9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "texture",
    title: "Texture",
    kicker: "Finding Beauty in Imperfection",
    date: "November 2025",
    excerpt: "Grain, skin, fabric — nothing needs to be smoothed to be beautiful.",
    body: [
      "Retouching is a tool, not a default. Some of my favourite frames keep every fingerprint of the day they were made.",
      "Imperfection is just information. I'd rather keep it than erase it.",
    ],
    image: "https://images.unsplash.com/photo-1718964312482-738b15e4e3b8?q=80&w=1200&auto=format&fit=crop",
  },
];
