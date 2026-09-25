import { useEffect, useRef, useState } from "react";
import { journal } from "@/data/journal";
import ResponsiveImage from "@/components/ResponsiveImage";

export default function Journal() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const entry = journal.find((j) => j.slug === openSlug) ?? null;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!entry) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenSlug(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [entry]);

  return (
    <section id="journal" className="py-28 md:py-40 bg-ivory">
      <div className="container-editorial mb-16 md:mb-20">
        <h2 className="font-display text-5xl md:text-7xl">Journal</h2>
      </div>

      <div className="container-editorial grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {journal.map((post) => (
          <button
            key={post.slug}
            onClick={() => setOpenSlug(post.slug)}
            data-cursor="Read"
            className="group text-left"
          >
            <div className="overflow-hidden mb-5">
              <div className="transition-transform duration-700 ease-editorial group-hover:scale-105">
                <ResponsiveImage src={post.image} alt={post.title} aspect="4 / 3" />
              </div>
            </div>
            <span className="eyebrow text-clay">{post.date}</span>
            <h3 className="font-display text-2xl mt-2 mb-1">{post.title}</h3>
            <p className="text-sm text-clay">{post.kicker}</p>
          </button>
        ))}
      </div>

      {entry && (
        <div role="dialog" aria-modal="true" aria-label={entry.title} className="fixed inset-0 z-[100] bg-ivory overflow-y-auto">
          <div className="container-editorial py-10">
            <button
              ref={closeRef}
              onClick={() => setOpenSlug(null)}
              className="eyebrow border border-charcoal/30 px-5 py-2.5 rounded-full hover:bg-charcoal hover:text-ivory transition-colors"
              data-cursor="Close"
            >
              Close
            </button>

            <div className="max-w-2xl mx-auto mt-14">
              <span className="eyebrow text-clay">{entry.date}</span>
              <h1 className="font-display text-4xl md:text-6xl mt-4 mb-2">{entry.title}</h1>
              <p className="eyebrow text-clay mb-10">{entry.kicker}</p>
              <div className="mb-10">
                <ResponsiveImage src={entry.image} alt={entry.title} aspect="16 / 9" />
              </div>
              {entry.body.map((para, i) => (
                <p key={i} className="text-lg leading-relaxed text-espresso mb-6">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
