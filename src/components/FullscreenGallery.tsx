import { useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/data/projects";
import { asset } from "@/utils/asset";

type FullscreenGalleryProps = {
  items: GalleryItem[];
  startIndex: number;
  onClose: () => void;
};

export default function FullscreenGallery({ items, startIndex, onClose }: FullscreenGalleryProps) {
  const [index, setIndex] = useState(startIndex);
  const touchStartX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];

  const go = (delta: number) => {
    setIndex((i) => (i + delta + items.length) % items.length);
  };

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption ?? "Image viewer"}
      className="fixed inset-0 z-[100] bg-charcoal/97 flex flex-col"
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta > 50) go(-1);
        if (delta < -50) go(1);
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-6 py-5 text-ivory">
        <span className="eyebrow">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <button
          ref={closeRef}
          onClick={onClose}
          className="eyebrow border border-ivory/30 rounded-full px-4 py-2 hover:bg-ivory hover:text-charcoal transition-colors"
          data-cursor="Close"
        >
          Close
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center px-4 pb-6">
        {item.type === "image" ? (
          <img src={asset(item.src)} alt={item.caption ?? ""} className="max-h-full max-w-full object-contain" />
        ) : (
          <video
            src={asset(item.src)}
            poster={item.poster ? asset(item.poster) : undefined}
            controls
            autoPlay
            playsInline
            className="max-h-full max-w-full object-contain"
          />
        )}

        {items.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              data-cursor="Prev"
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-ivory/30 text-ivory hover:bg-ivory hover:text-charcoal transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              data-cursor="Next"
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-ivory/30 text-ivory hover:bg-ivory hover:text-charcoal transition-colors"
            >
              →
            </button>
          </>
        )}
      </div>

      {item.caption && (
        <p className="eyebrow text-ivory/80 text-center pb-6">{item.caption}</p>
      )}
    </div>
  );
}
