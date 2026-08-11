import { useEffect, useRef } from "react";

interface MusicVisualizerProps {
  analyser: AnalyserNode | null;
  playing: boolean;
  bars?: number;
  className?: string;
}

export function MusicVisualizer({ analyser, playing, bars = 18, className }: MusicVisualizerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const data = new Uint8Array(analyser ? analyser.frequencyBinCount : bars);
    const tick = () => {
      const el = ref.current;
      if (el) {
        if (analyser) analyser.getByteFrequencyData(data);
        const children = el.children;
        for (let i = 0; i < children.length; i++) {
          const v = playing ? (analyser ? (data[i % data.length] ?? 0) / 255 : Math.random()) : 0.06;
          (children[i] as HTMLElement).style.height = `${Math.max(8, v * 100)}%`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [analyser, playing, bars]);

  return (
    <div ref={ref} className={`flex h-8 items-end gap-[3px] ${className ?? ""}`} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="w-[4px] rounded-full bg-truck-red transition-[height] duration-75"
          style={{ height: "10%" }}
        />
      ))}
    </div>
  );
}
