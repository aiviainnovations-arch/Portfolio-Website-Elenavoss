import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { title: "Observe", body: "Find the story." },
  { title: "Frame", body: "Shape the moment." },
  { title: "Capture", body: "Let the image breathe." },
  { title: "Refine", body: "Finish with intention." },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-step]",
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-ivory border-y border-charcoal/10">
      <div className="container-editorial grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
        {STEPS.map((step, i) => (
          <div key={step.title} data-step>
            <span className="eyebrow text-clay">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="font-display text-3xl md:text-4xl mt-3 mb-2">{step.title}</h3>
            <p className="text-sm text-clay">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
