import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { TRACKS, TruckPlayer, sfx, type Track } from "@/lib/truck-audio";
import { MusicVisualizer } from "./MusicVisualizer";

interface MusicPlayerProps {
  tracks?: Track[];
  autoStart?: boolean;
  muted: boolean;
  onToggleMute: () => void;
}

export function MusicPlayer({ tracks = TRACKS, autoStart, muted, onToggleMute }: MusicPlayerProps) {
  const playerRef = useRef<TruckPlayer | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [elapsed, setElapsed] = useState(0);
  const track = tracks[index] ?? tracks[0]!;

  if (!playerRef.current && typeof window !== "undefined") playerRef.current = new TruckPlayer();

  const play = useCallback(() => {
    playerRef.current?.start(track, muted ? 0 : volume);
    setPlaying(true);
  }, [track, volume, muted]);

  const pause = useCallback(() => {
    playerRef.current?.stop();
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (autoStart) play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  useEffect(() => {
    if (playing) playerRef.current?.start(track, muted ? 0 : volume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    playerRef.current?.setVolume(muted ? 0 : volume);
  }, [volume, muted]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setElapsed((e) => (e + 1 > track.duration ? 0 : e + 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing, track.duration]);

  useEffect(() => () => playerRef.current?.stop(), []);

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  const skip = (dir: 1 | -1) => {
    sfx.click();
    setElapsed(0);
    setIndex((i) => (i + dir + tracks.length) % tracks.length);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="fixed inset-x-0 bottom-0 z-50"
    >
      <div className="mx-auto max-w-4xl px-2 pb-2 sm:px-4 sm:pb-4">
        <div className="hard-border-lg rounded-2xl bg-card p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <MusicVisualizer
              analyser={playerRef.current?.analyser ?? null}
              playing={playing && !muted}
              className="hidden sm:flex"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-truck-red">
                Now playing • Gaana chalao
              </p>
              <p className="truncate font-display text-lg leading-tight tracking-wide">
                {track.title}
              </p>
              <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                aria-label="Pichla gaana"
                onClick={() => skip(-1)}
                className="hard-border grid size-9 place-items-center rounded-xl bg-secondary active:translate-y-0.5"
              >
                <SkipBack className="size-4" />
              </button>
              <button
                aria-label={playing ? "Pause" : "Play"}
                onClick={() => {
                  sfx.click();
                  playing ? pause() : play();
                }}
                className="hard-border grid size-12 place-items-center rounded-full bg-truck-red text-primary-foreground active:translate-y-0.5"
              >
                {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
              </button>
              <button
                aria-label="Agla gaana"
                onClick={() => skip(1)}
                className="hard-border grid size-9 place-items-center rounded-xl bg-secondary active:translate-y-0.5"
              >
                <SkipForward className="size-4" />
              </button>
              <button
                aria-label={muted ? "Unmute" : "Mute"}
                onClick={onToggleMute}
                className="hard-border grid size-9 place-items-center rounded-xl bg-accent active:translate-y-0.5"
              >
                {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </button>
              <input
                aria-label="Volume"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="hidden h-1.5 w-20 cursor-pointer appearance-none rounded-full bg-muted accent-truck-red md:block"
              />
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] font-semibold tabular-nums text-muted-foreground">
              {fmt(elapsed)}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full border-2 border-ink bg-muted">
              <div
                className="h-full bg-truck-green transition-[width] duration-500"
                style={{ width: `${(elapsed / track.duration) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-semibold tabular-nums text-muted-foreground">
              {fmt(track.duration)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
