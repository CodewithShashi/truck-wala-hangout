import type { Track } from "@/data/tracks";

interface PlaylistProps {
  tracks: Track[];
  order: number[];
  pos: number;
  onPick: (orderIndex: number) => void;
}

export function Playlist({ tracks, order, pos, onPick }: PlaylistProps) {
  return (
    <section
      aria-label="Playlist"
      className="mb-3 w-full max-w-xl overflow-hidden rounded-3xl border border-white/20 bg-black/40 text-white shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
    >
      <ol className="max-h-64 overflow-y-auto py-1">
        {order.map((trackIdx, i) => {
          const t = tracks[trackIdx]!;
          const active = i === pos;
          return (
            <li key={`${t.id}-${i}`}>
              <button
                type="button"
                onClick={() => onPick(i)}
                className={`flex w-full flex-col items-start gap-0.5 px-4 py-2 text-left transition hover:bg-white/10 ${
                  active ? "bg-white/15" : ""
                }`}
              >
                <span className="line-clamp-1 text-sm font-semibold">{t.title}</span>
                <span className="line-clamp-1 text-xs text-white/60">{t.artist}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
