import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ResponsiveImage from "@/components/ResponsiveImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !imgWrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(imgWrapRef.current, {
        yPercent: -12,
        rotateZ: -1.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="about" className="py-28 md:py-40 bg-sand overflow-hidden">
      <div className="container-editorial grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6 md:col-start-1">
          <span className="eyebrow">About</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 mb-8 leading-[1.05]">A way of seeing.</h2>
          <p className="text-lg text-espresso max-w-md leading-relaxed">
            Elena Voss is a visual storyteller exploring people, place, texture and light.
          </p>
        </div>

        <div ref={imgWrapRef} className="md:col-span-5 md:col-start-8 will-change-transform">
          <div className="shadow-2xl shadow-charcoal/20">
            <ResponsiveImage src="https://images.unsplash.com/photo-1718964312482-738b15e4e3b8?q=80&w=1600&auto=format&fit=crop" alt="Elena Voss, studio portrait" aspect="4 / 5" />
          </div>
        </div>
      </div>
    </section>
  );
}
