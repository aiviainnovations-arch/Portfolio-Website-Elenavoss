export type GalleryItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  caption?: string;
  wide?: boolean;
};

export type Project = {
  index: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  location: string;
  description: string;
  coverImage: string;
  coverAspect: "portrait" | "landscape" | "square";
  gallery: GalleryItem[];
};

// Swap any `src` below for a real asset of the same aspect ratio and the
// layout will not need to change. See /public/media-credits.md.
export const projects: Project[] = [
  {
    index: "01",
    slug: "quiet-forms",
    title: "Quiet Forms",
    category: "Editorial Portraits",
    year: "2026",
    location: "Lisbon",
    description: "A study of stillness — how a body holds a room when it stops performing for the camera.",
    coverImage: "https://images.unsplash.com/photo-1571816119607-57e48af1caa9?q=80&w=1600&auto=format&fit=crop",
    coverAspect: "portrait",
    gallery: [
      { type: "image", src: "https://images.unsplash.com/photo-1495466587376-02676cbc8dab?q=80&w=1400&auto=format&fit=crop", caption: "Untitled I" },
      { type: "video", src: "/videos/preview-01.mp4", poster: "/images/preview-01-poster.jpg", caption: "Study, in motion" },
      { type: "image", src: "https://images.unsplash.com/photo-1718964312482-738b15e4e3b8?q=80&w=1400&auto=format&fit=crop", caption: "Untitled II" },
      { type: "image", src: "/images/plate-23.jpg", caption: "Untitled III" },
      { type: "image", src: "/images/plate-04.jpg", wide: true, caption: "The room, after" },
      { type: "image", src: "/images/plate-17.jpg", caption: "Detail, hands" },
    ],
  },
  {
    index: "02",
    slug: "earth-silk",
    title: "Earth & Silk",
    category: "Fashion Story",
    year: "2026",
    location: "Milan / Paris",
    description: "A study of movement, texture and natural light.",
    coverImage: "https://images.unsplash.com/photo-1629467201279-707e3f68b237?q=80&w=1600&auto=format&fit=crop",
    coverAspect: "portrait",
    gallery: [
      { type: "image", src: "/images/plate-02.jpg", caption: "Look 01" },
      { type: "video", src: "/videos/film-02.mp4", poster: "/images/film-02-poster.jpg", caption: "Fabric in motion" },
      { type: "image", src: "https://images.unsplash.com/photo-1718964312482-738b15e4e3b8?q=80&w=1400&auto=format&fit=crop", caption: "Look 04" },
      { type: "image", src: "https://images.unsplash.com/photo-1571816119607-57e48af1caa9?q=80&w=1400&auto=format&fit=crop", caption: "Look 06" },
      { type: "image", src: "/images/plate-09.jpg", wide: true, caption: "Backstage, Milan" },
      { type: "image", src: "/images/plate-14.jpg", caption: "Detail, silk" },
    ],
  },
  {
    index: "03",
    slug: "after-light",
    title: "After Light",
    category: "Architectural Editorial",
    year: "2025",
    location: "Porto",
    description: "The hour when buildings stop looking designed and start looking lived-in.",
    coverImage: "https://images.unsplash.com/photo-1733383449188-6313b38b80af?q=80&w=1600&auto=format&fit=crop",
    coverAspect: "landscape",
    gallery: [
      { type: "image", src: "/images/plate-07.jpg", wide: true, caption: "Facade, west light" },
      { type: "video", src: "/videos/film-03.mp4", poster: "/images/film-03-poster.jpg", caption: "Corridor" },
      { type: "image", src: "https://images.unsplash.com/photo-1761145189100-17c733d1c868?q=80&w=1400&auto=format&fit=crop", wide: true, caption: "Stairwell" },
      { type: "image", src: "https://images.unsplash.com/photo-1658089306138-cb1a3384b8a8?q=80&w=1600&auto=format&fit=crop", wide: true, caption: "Rooftop, blue hour" },
      { type: "image", src: "/images/plate-11.jpg", caption: "Threshold" },
      { type: "image", src: "/images/plate-21.jpg", wide: true, caption: "Courtyard, dusk" },
    ],
  },
  {
    index: "04",
    slug: "raw-beauty",
    title: "Raw Beauty",
    category: "Studio Series",
    year: "2025",
    location: "Studio, London",
    description: "No retouching brief. Skin, light and grain, left exactly as they fell.",
    coverImage: "https://images.unsplash.com/photo-1718964312482-738b15e4e3b8?q=80&w=1600&auto=format&fit=crop",
    coverAspect: "square",
    gallery: [
      { type: "image", src: "https://images.unsplash.com/photo-1571816119607-57e48af1caa9?q=80&w=1400&auto=format&fit=crop", caption: "Study 01" },
      { type: "image", src: "https://images.unsplash.com/photo-1495466587376-02676cbc8dab?q=80&w=1400&auto=format&fit=crop", caption: "Study 02" },
      { type: "image", src: "/images/plate-14.jpg", caption: "Study 03" },
      { type: "image", src: "/images/plate-16.jpg", caption: "Study 04" },
      { type: "image", src: "/images/plate-01.jpg", wide: true, caption: "Contact sheet, selects" },
    ],
  },
  {
    index: "05",
    slug: "space-between",
    title: "The Space Between",
    category: "Environmental Portraits",
    year: "2024",
    location: "Skåne, Sweden",
    description: "People, photographed at the exact distance from home where they start to relax.",
    coverImage: "https://images.unsplash.com/photo-1520463007424-eb27f7c02b24?q=80&w=1600&auto=format&fit=crop",
    coverAspect: "landscape",
    gallery: [
      { type: "image", src: "https://images.unsplash.com/photo-1629467201279-707e3f68b237?q=80&w=1400&auto=format&fit=crop", wide: true, caption: "Field, morning" },
      { type: "video", src: "/videos/preview-01.mp4", poster: "/images/preview-01-poster.jpg", caption: "Walking, unposed" },
      { type: "image", src: "/images/plate-22.jpg", wide: true, caption: "The house at the tree line" },
      { type: "image", src: "https://images.unsplash.com/photo-1571816119607-57e48af1caa9?q=80&w=1400&auto=format&fit=crop", caption: "Portrait, doorway" },
      { type: "image", src: "https://images.unsplash.com/photo-1495466587376-02676cbc8dab?q=80&w=1400&auto=format&fit=crop", caption: "Portrait, window light" },
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
