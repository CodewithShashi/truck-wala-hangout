import { useRef } from "react";
import { List, Pause, Play, Shuffle, SkipBack, SkipForward } from "lucide-react";
import type { Track } from "@/data/tracks";

const fmt = (s: number) => {
  const v = Number.isFinite(s) && s > 0 ? s : 0;
  return `${Math.floor(v / 60)}:${String(Math.floor(v % 60)).padStart(2, "0")}`;
};

interface PlayerDockProps {
  track: Track;
  playing: boolean;
  ready: boolean;
  current: number;
  duration: number;
  shuffle: boolean;
  listOpen: boolean;
  onToggleShuffle: () => void;
  onToggleList: () => void;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (seconds: number) => void;
}

export function PlayerDock({
  track,
  playing,
  ready,
  current,
  duration,
  shuffle,
  listOpen,
  onToggleShuffle,
  onToggleList,
  onPlayPause,
  onPrev,
  onNext,
  onSeek,
}: PlayerDockProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const total = duration || track.duration;
  const pct = total ? Math.min(100, (current / total) * 100) : 0;

  const scrub = (clientX: number) => {
    const rail = railRef.current;
    if (!rail || !total) return;
    const rect = rail.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    onSeek(ratio * total);
  };

  return (
    <section
      aria-label="Player"
      className="flex w-full max-w-xl items-center gap-4 rounded-3xl border border-white/20 bg-white/10 p-4 text-white shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:gap-5 sm:p-5"
    >
      <div className="relative shrink-0">
        <div
          className={`size-20 overflow-hidden rounded-full border-4 border-black/40 shadow-lg sm:size-24 ${
            playing ? "animate-[spin_9s_linear_infinite]" : ""
          }`}
        >
          {track.cover ? (
            <img
              src={track.cover}
              alt={`${track.title} artwork`}
              className="size-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="size-full bg-black/50" />
          )}
        </div>
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/40 bg-black/70"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-bold leading-tight sm:text-lg">{track.title}</p>
        <p className="truncate text-xs text-white/70">{track.artist}</p>

        <div
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(total)}
          aria-valuenow={Math.round(current)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") onSeek(Math.min(total, current + 10));
            if (e.key === "ArrowLeft") onSeek(Math.max(0, current - 10));
          }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            scrub(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) scrub(e.clientX);
          }}
          className="mt-3 cursor-pointer py-2"
        >
          <div ref={railRef} className="h-1.5 rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-white transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between text-[11px] tabular-nums text-white/70">
          <span>{fmt(current)}</span>
          <span>{fmt(total)}</span>
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Shuffle"
            aria-pressed={shuffle}
            onClick={onToggleShuffle}
            className={`grid size-9 place-items-center rounded-full border border-white/20 transition ${
              shuffle ? "bg-white text-black" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <Shuffle className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Previous track"
            onClick={onPrev}
            className="grid size-9 place-items-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20"
          >
            <SkipBack className="size-4" />
          </button>
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            disabled={!ready}
            onClick={onPlayPause}
            className="grid size-12 place-items-center rounded-full bg-white text-black transition hover:scale-105 disabled:opacity-50"
          >
            {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
          </button>
          <button
            type="button"
            aria-label="Next track"
            onClick={onNext}
            className="grid size-9 place-items-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20"
          >
            <SkipForward className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Playlist"
            aria-expanded={listOpen}
            onClick={onToggleList}
            className={`grid size-9 place-items-center rounded-full border border-white/20 transition ${
              listOpen ? "bg-white text-black" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <List className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
