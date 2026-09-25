import { Suspense, lazy, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ResponsiveImage from "@/components/ResponsiveImage";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { scrollToId } from "@/utils/scroll";
import { asset } from "@/utils/asset";

gsap.registerPlugin(ScrollTrigger);

// The R3F canvas (three.js + fiber) is only pulled into the bundle when a
// non-touch, motion-enabled visitor actually reaches the hero.
const HeroScene = lazy(() => import("@/three/HeroScene"));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const use3D = !reducedMotion && !isTouch;

  useEffect(() => {
    if (reducedMotion || !visualRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(visualRef.current, {
        scale: 0.86,
        opacity: 0.35,
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax ?? 0.2);
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-charcoal">
      <div className="grain-overlay" />

      <div ref={visualRef} className="absolute inset-0">
        {use3D ? (
          <ErrorBoundary
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[78vw] max-w-sm md:w-[32vw]">
                  <ResponsiveImage src="https://images.unsplash.com/photo-1495466587376-02676cbc8dab?q=80&w=1600&auto=format&fit=crop" alt="Elena Voss, editorial portrait" aspect="4 / 5" priority />
                </div>
              </div>
            }
          >
            <Suspense
              fallback={<ResponsiveImage src="https://images.unsplash.com/photo-1495466587376-02676cbc8dab?q=80&w=1600&auto=format&fit=crop" alt="" aspect="auto" className="opacity-70" />}
            >
              <HeroScene src={asset("https://images.unsplash.com/photo-1495466587376-02676cbc8dab?q=80&w=1600&auto=format&fit=crop")} />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[78vw] max-w-sm md:w-[32vw]">
              <ResponsiveImage src="https://images.unsplash.com/photo-1495466587376-02676cbc8dab?q=80&w=1600&auto=format&fit=crop" alt="Elena Voss, editorial portrait" aspect="4 / 5" priority />
            </div>
          </div>
        )}
      </div>

      <div className="relative h-full container-editorial flex flex-col justify-between py-28 pointer-events-none">
        <div
          data-parallax="-0.15"
          className="flex items-start justify-between text-ivory pointer-events-none"
        >
          <div>
            <h1 className="font-display text-[13vw] leading-[0.9] md:text-[6.4vw]">ELENA VOSS</h1>
          </div>
          <div className="hidden md:block text-right eyebrow text-ivory/70 mt-3">
            Photographer
            <br />
            Visual Storyteller
          </div>
        </div>

        <div data-parallax="0.2" className="flex items-end justify-between text-ivory">
          <p className="font-display italic text-2xl md:text-4xl max-w-md leading-tight">
            Images with a
            <br />
            point of view.
          </p>
          <button
            onClick={() => scrollToId("work")}
            className="hidden md:flex eyebrow items-center gap-3 pointer-events-auto"
            data-cursor="Scroll"
          >
            Selected Work
            <span aria-hidden="true">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
