import { useState } from "react";
import { asset } from "@/utils/asset";

type ResponsiveImageProps = {
  src: string;
  alt: string;
  aspect?: string; // e.g. "4 / 5", "16 / 9", "1 / 1"
  loading?: "lazy" | "eager";
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * A single reusable image primitive used across the whole site.
 * - Reserves space via `aspect` so nothing shifts on load (no CLS).
 * - Lazy-loads by default; pass `priority` for above-the-fold images.
 * - Falls back to a flat surface tile if the asset fails to load, so a
 *   missing/renamed file never breaks the layout.
 */
export default function ResponsiveImage({
  src,
  alt,
  aspect = "4 / 5",
  loading = "lazy",
  className = "",
  sizes = "100vw",
  priority = false,
}: ResponsiveImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`bg-stone/60 flex items-center justify-center ${className}`}
        style={{ aspectRatio: aspect }}
        role="img"
        aria-label={alt}
      >
        <span className="eyebrow">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={asset(src)}
      alt={alt}
      loading={priority ? "eager" : loading}
      decoding="async"
      sizes={sizes}
      onError={() => setFailed(true)}
      className={`w-full h-full object-cover ${className}`}
      style={{ aspectRatio: aspect }}
    />
  );
}
