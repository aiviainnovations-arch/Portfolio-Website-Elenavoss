import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import ResponsiveImage from "@/components/ResponsiveImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="work" className="py-28 md:py-40 bg-ivory">
      <div className="container-editorial mb-16 md:mb-24 flex items-end justify-between">
        <h2 className="font-display text-5xl md:text-7xl">Selected Work</h2>
        <span className="eyebrow hidden md:block">{projects.length} Projects · 2024&ndash;2026</span>
      </div>

      <div className="flex flex-col gap-24 md:gap-36">
        {projects.map((project, i) => {
          const reversed = i % 2 === 1;
          return (
            <Link
              key={project.slug}
              to={`/work/${project.slug}`}
              data-reveal
              data-cursor="View Project"
              className={`group container-editorial flex flex-col ${
                reversed ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-8 md:gap-14`}
            >
              <div
                className={`w-full ${
                  project.coverAspect === "landscape" ? "md:w-8/12" : "md:w-6/12"
                } overflow-hidden`}
              >
                <div className="overflow-hidden">
                  <div className="transition-transform duration-700 ease-editorial group-hover:scale-105">
                    <ResponsiveImage
                      src={project.coverImage}
                      alt={`${project.title} — ${project.category}`}
                      aspect={
                        project.coverAspect === "landscape"
                          ? "16 / 10"
                          : project.coverAspect === "square"
                          ? "1 / 1"
                          : "4 / 5"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className={`w-full ${reversed ? "md:w-4/12" : "md:w-6/12"} flex md:justify-center`}>
                <div>
                  <span className="eyebrow">{project.index}</span>
                  <h3 className="font-display text-4xl md:text-6xl mt-3 mb-3 transition-transform duration-500 group-hover:translate-x-2">
                    {project.title}
                  </h3>
                  <p className="eyebrow text-clay">{project.category}</p>
                  <p className="text-sm text-clay mt-4 max-w-xs opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {project.location} &middot; {project.year}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
