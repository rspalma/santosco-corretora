"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

export function InstitutionalVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-navy shadow-premium">
      <video
        ref={videoRef}
        controls
        playsInline
        preload="none"
        poster="/videos/institucional-poster.webp"
        className="aspect-video w-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source
          src="/videos/institucional-santos-co.mp4"
          type="video/mp4"
        />
        Seu navegador não oferece suporte ao vídeo.
      </video>
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
        className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-navy/80 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-navy"
      >
        {isPlaying ? (
          <Pause size={20} fill="currentColor" aria-hidden="true" />
        ) : (
          <Play size={20} fill="currentColor" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
