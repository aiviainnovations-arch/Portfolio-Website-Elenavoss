import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { asset } from "@/utils/asset";

type CinematicVideoProps = {
  src: string;
  poster: string;
  caption?: string;
  aspect?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  onClick?: () => void;
};

/**
 * The single video primitive used for hero footage, film previews and case
 * study reels. Swap `src`/`poster` for any project without touching this
 * component. Respects prefers-reduced-motion by freezing on the poster
 * frame instead of autoplaying, and only starts playback once the video is
 * actually in view.
 */
export default function CinematicVideo({
  src,
  poster,
  caption,
  aspect = "16 / 9",
  autoplay = true,
  loop = true,
  muted = true,
  controls = false,
  className = "",
  onClick,
}: CinematicVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const shouldAutoplay = autoplay && !reducedMotion;

  useEffect(() => {
    if (!shouldAutoplay || !videoRef.current || !wrapperRef.current) return;
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay can be blocked; poster remains visible */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [shouldAutoplay]);

  if (failed) {
    return (
      <div
        className={`bg-clay/40 flex items-center justify-center ${className}`}
        style={{ aspectRatio: aspect }}
      >
        <span className="eyebrow text-ivory">{caption ?? "Film unavailable"}</span>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: aspect }}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        poster={asset(poster)}
        muted={muted}
        loop={loop}
        playsInline
        preload="none"
        controls={controls}
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
      >
        <source src={asset(src)} type="video/mp4" />
      </video>
      {caption && (
        <span className="absolute bottom-3 left-3 eyebrow text-ivory/90 bg-charcoal/40 px-2 py-1 backdrop-blur-sm">
          {caption}
        </span>
      )}
    </div>
  );
}
