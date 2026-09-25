import { useEffect, useRef } from "react";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

/**
 * A single global custom cursor. Any element that wants a contextual label
 * (VIEW PROJECT / PLAY FILM / OPEN) sets `data-cursor="label text"` and
 * `data-cursor-scale="2"` (optional) — this component reads those
 * attributes on pointer move rather than needing per-element wiring.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (isTouch) return;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    let x = 0;
    let y = 0;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const render = () => {
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      label.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };

    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (target) {
        const text = target.getAttribute("data-cursor") ?? "";
        label.textContent = text;
        label.style.opacity = text ? "1" : "0";
        dot.style.width = "56px";
        dot.style.height = "56px";
        dot.style.opacity = "0.14";
      } else {
        label.style.opacity = "0";
        dot.style.width = "14px";
        dot.style.height = "14px";
        dot.style.opacity = "1";
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      cancelAnimationFrame(raf);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={labelRef} className="cursor-label" aria-hidden="true" />
    </>
  );
}
