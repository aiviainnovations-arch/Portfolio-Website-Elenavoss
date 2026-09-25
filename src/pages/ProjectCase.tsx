import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getProjectBySlug, projects } from "@/data/projects";
import ResponsiveImage from "@/components/ResponsiveImage";
import CinematicVideo from "@/components/CinematicVideo";
import FullscreenGallery from "@/components/FullscreenGallery";

export default function ProjectCase() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug ?? "");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!project) return <Navigate to="/" replace />;

  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIdx + 1) % projects.length];

  return (
    <article className="pt-32 pb-24 bg-ivory">
      <div className="container-editorial mb-10">
        <Link to="/" data-cursor="Back" className="eyebrow text-clay hover:text-charcoal transition-colors">
          ← Back to work
        </Link>
      </div>

      <header className="container-editorial mb-14 md:mb-20">
        <span className="eyebrow text-clay">{project.category}</span>
        <h1 className="font-display text-5xl md:text-8xl mt-4 mb-6 leading-[0.95]">{project.title}</h1>
        <div className="flex gap-8 eyebrow text-clay">
          <span>{project.year}</span>
          <span>{project.location}</span>
        </div>
        <p className="mt-8 text-lg max-w-md text-espresso">{project.description}</p>
      </header>

      <div className="flex flex-col gap-6 md:gap-10">
        {project.gallery.map((item, i) => (
          <div
            key={i}
            className={item.wide ? "w-full" : "container-editorial md:max-w-3xl md:mx-auto w-full"}
          >
            <button
              onClick={() => setOpenIndex(i)}
              data-cursor={item.type === "video" ? "Play Film" : "View"}
              className="block w-full"
            >
              {item.type === "image" ? (
                <ResponsiveImage src={item.src} alt={item.caption ?? project.title} aspect="auto" />
              ) : (
                <CinematicVideo src={item.src} poster={item.poster ?? ""} caption={item.caption} aspect="16 / 9" />
              )}
            </button>
            {item.caption && <p className="eyebrow text-clay mt-3 px-1">{item.caption}</p>}
          </div>
        ))}
      </div>

      <div className="container-editorial mt-24 pt-14 border-t border-charcoal/10 flex items-center justify-between">
        <span className="eyebrow text-clay">Next Project</span>
        <Link to={`/work/${next.slug}`} data-cursor="View Project" className="font-display text-3xl md:text-5xl hover:opacity-60 transition-opacity">
          {next.title} →
        </Link>
      </div>

      {openIndex !== null && (
        <FullscreenGallery items={project.gallery} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </article>
  );
}
