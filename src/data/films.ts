export type Film = {
  slug: string;
  title: string;
  meta: string;
  src: string;
  poster: string;
};

export const films: Film[] = [
  {
    slug: "silent-motion",
    title: "Silent Motion",
    meta: "2026 · 1:24",
    src: "/videos/film-01.mp4",
    poster: "https://images.unsplash.com/photo-1495466587376-02676cbc8dab?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "afternoon-light",
    title: "Afternoon Light",
    meta: "2025 · 0:58",
    src: "/videos/film-02.mp4",
    poster: "https://images.unsplash.com/photo-1629467201279-707e3f68b237?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "form-body",
    title: "Form / Body",
    meta: "2025 · 1:40",
    src: "/videos/film-03.mp4",
    poster: "https://images.unsplash.com/photo-1718964312482-738b15e4e3b8?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "slow-days",
    title: "Slow Days",
    meta: "2024 · 2:03",
    src: "/videos/film-04.mp4",
    poster: "https://images.unsplash.com/photo-1520463007424-eb27f7c02b24?q=80&w=1400&auto=format&fit=crop",
  },
];
