import { useCallback, useEffect, useRef, useState } from "react";

/* Minimal typing for the bits of the YouTube IFrame API we use. */
interface YTPlayer {
  loadVideoById: (id: string) => void;
  cueVideoById: (id: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (s: number, allow: boolean) => void;
  setVolume: (v: number) => void;
  getVolume: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement | string,
    opts: Record<string, unknown>,
  ) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

function loadApi(): Promise<YTNamespace> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT!);
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.append(s);
  });
  return apiPromise;
}

interface Options {
  onEnded: () => void;
}

/**
 * Hidden YouTube iframe used purely as the audio source, exactly like the
 * reference build — all visible chrome is ours.
 */
export function useYtPlayer({ onEnded }: Options) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const endedRef = useRef(onEnded);
  endedRef.current = onEnded;

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let killed = false;
    void loadApi().then((YT) => {
      if (killed || !hostRef.current) return;
      playerRef.current = new YT.Player(hostRef.current, {
        height: "1",
        width: "1",
        playerVars: { playsinline: 1, controls: 0, disablekb: 1, rel: 0 },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e: { data: number }) => {
            if (e.data === YT.PlayerState.PLAYING) setPlaying(true);
            if (e.data === YT.PlayerState.PAUSED) setPlaying(false);
            if (e.data === YT.PlayerState.ENDED) {
              setPlaying(false);
              endedRef.current();
            }
          },
          onError: () => endedRef.current(),
        },
      });
    });
    return () => {
      killed = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* noop */
      }
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const id = window.setInterval(() => {
      const p = playerRef.current;
      if (!p) return;
      setCurrent(p.getCurrentTime() || 0);
      setDuration(p.getDuration() || 0);
    }, 500);
    return () => window.clearInterval(id);
  }, [ready]);

  const load = useCallback((videoId: string, autoplay: boolean) => {
    const p = playerRef.current;
    if (!p) return;
    if (autoplay) p.loadVideoById(videoId);
    else p.cueVideoById(videoId);
    setCurrent(0);
  }, []);

  const play = useCallback(() => playerRef.current?.playVideo(), []);
  const pause = useCallback(() => playerRef.current?.pauseVideo(), []);
  const seek = useCallback((s: number) => {
    playerRef.current?.seekTo(s, true);
    setCurrent(s);
  }, []);
  const setVolume = useCallback((v: number) => playerRef.current?.setVolume(v), []);

  return { hostRef, ready, playing, current, duration, load, play, pause, seek, setVolume };
}
