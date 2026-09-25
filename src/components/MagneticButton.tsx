import { useRef, type MouseEvent, type ReactNode } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type MagneticButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  as?: "button" | "a";
  href?: string;
};

/**
 * Renders either a <button> or an <a>, each with its own concretely-typed
 * ref (HTMLButtonElement / HTMLAnchorElement) rather than one dynamic
 * <Tag> — that keeps TypeScript happy without fighting polymorphic-ref
 * typing. Both refs are created unconditionally (Rules of Hooks); only
 * the one matching `as` is ever attached to a rendered element.
 */
export default function MagneticButton({
  children,
  onClick,
  className = "",
  as = "button",
  href,
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const sharedClass = `inline-flex items-center justify-center will-change-transform ${className}`;

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = as === "a" ? anchorRef.current : buttonRef.current;
    if (reducedMotion || !el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.5, ease: "power3.out" });
  };

  const handleLeave = () => {
    const el = as === "a" ? anchorRef.current : buttonRef.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  if (as === "a") {
    return (
      <a
        ref={anchorRef}
        href={href}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        data-cursor="Open"
        className={sharedClass}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="Open"
      className={sharedClass}
    >
      {children}
    </button>
  );
}
