import { useState } from "react";
import { films } from "@/data/films";
import CinematicVideo from "@/components/CinematicVideo";
import FullscreenGallery from "@/components/FullscreenGallery";

export default function Films() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const galleryItems = films.map((f) => ({
    type: "video" as const,
    src: f.src,
    poster: f.poster,
    caption: f.title,
  }));

  return (
    <section id="films" className="py-28 md:py-40 bg-charcoal text-ivory">
      <div className="container-editorial mb-16 md:mb-20 flex items-end justify-between">
        <h2 className="font-display text-5xl md:text-7xl">Films</h2>
        <span className="eyebrow text-ivory/60 hidden md:block">Cinematic Shorts</span>
      </div>

      <div className="container-editorial grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {films.map((film, i) => (
          <button
            key={film.slug}
            onClick={() => setOpenIndex(i)}
            data-cursor="Play Film"
            className="group text-left relative overflow-hidden"
          >
            <div className="transition-transform duration-700 ease-editorial group-hover:scale-105">
              <CinematicVideo src={film.src} poster={film.poster} aspect="16 / 10" autoplay={false} muted />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <h3 className="font-display text-2xl md:text-3xl">{film.title}</h3>
              <span className="eyebrow text-ivory/70">{film.meta}</span>
            </div>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <FullscreenGallery items={galleryItems} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  );
}
