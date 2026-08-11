import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TRACKS } from "@/data/tracks";
import { useYtPlayer } from "@/hooks/use-yt-player";
import heroBg from "@/assets/truck-hero.webp";
import { TopBar } from "./TopBar";
import { HornButton } from "./HornButton";
import { Bumper } from "./Bumper";
import { PlayerDock } from "./PlayerDock";
import { Playlist } from "./Playlist";

function shuffled(n: number) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export function RadioScene() {
  const [shuffle, setShuffle] = useState(true);
  const [order, setOrder] = useState<number[]>(() => TRACKS.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [listOpen, setListOpen] = useState(false);
  const [listeners, setListeners] = useState(42);
  const started = useRef(false);

  // Fresh random order on the client only — keeps SSR markup stable.
  useEffect(() => {
    setOrder(shuffle ? shuffled(TRACKS.length) : TRACKS.map((_, i) => i));
    setPos(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffle]);

  useEffect(() => {
    const id = window.setInterval(
      () => setListeners((n) => Math.min(120, Math.max(12, n + (Math.random() < 0.5 ? -1 : 1)))),
      4000,
    );
    return () => window.clearInterval(id);
  }, []);

  const track = useMemo(() => TRACKS[order[pos] ?? 0]!, [order, pos]);

  const step = useCallback(
    (dir: 1 | -1) => setPos((p) => (p + dir + order.length) % order.length),
    [order.length],
  );

  const yt = useYtPlayer({ onEnded: () => step(1) });

  // Cue on first load, then autoplay every subsequent change — non-stop radio.
  useEffect(() => {
    if (!yt.ready) return;
    yt.load(track.id, started.current);
    if (started.current) yt.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yt.ready, track.id]);

  const playPause = () => {
    if (yt.playing) {
      yt.pause();
      return;
    }
    started.current = true;
    yt.play();
  };

  const duckForHorn = () => {
    yt.setVolume(25);
    window.setTimeout(() => yt.setVolume(100), 700);
  };

  return (
    <div className="relative min-h-screen overflow-hidden [--edge:clamp(1rem,2.2vw,1.75rem)]">
      <div aria-hidden className="fixed inset-0 -z-10">
        <div
          className="size-full bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/70" />
      </div>

      {/* Hidden YouTube iframe — the actual sound source. */}
      <div aria-hidden className="pointer-events-none fixed -left-[9999px] top-0 size-px">
        <div ref={yt.hostRef} />
      </div>

      <TopBar listeners={listeners} />

      <div className="relative z-20 mt-4 px-[var(--edge)]">
        <HornButton onDuck={duckForHorn} />
      </div>

      <main className="relative z-10 flex min-h-[calc(100vh-9rem)] flex-col items-center justify-between gap-8 px-[var(--edge)] pb-[max(var(--edge),env(safe-area-inset-bottom))] pt-[8vh]">
        <h1 lang="hi" className="text-center leading-[0.85] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          <span className="whitespace-nowrap font-wordmark text-[clamp(2.5rem,8.5vw,7rem)]">ट्रक वाला</span>
          <span className="sr-only" lang="en">
            Truck Wala — Horn OK Please
          </span>
        </h1>

        <div className="flex w-full flex-col items-center">
          {listOpen && (
            <Playlist
              tracks={TRACKS}
              order={order}
              pos={pos}
              onPick={(i) => {
                started.current = true;
                setPos(i);
              }}
            />
          )}

          <div className="mb-4">
            <Bumper />
          </div>

          <PlayerDock
            track={track}
            playing={yt.playing}
            ready={yt.ready}
            current={yt.current}
            duration={yt.duration}
            shuffle={shuffle}
            listOpen={listOpen}
            onToggleShuffle={() => setShuffle((s) => !s)}
            onToggleList={() => setListOpen((o) => !o)}
            onPlayPause={playPause}
            onPrev={() => {
              started.current = true;
              step(-1);
            }}
            onNext={() => {
              started.current = true;
              step(1);
            }}
            onSeek={yt.seek}
          />
        </div>
      </main>
    </div>
  );
}
