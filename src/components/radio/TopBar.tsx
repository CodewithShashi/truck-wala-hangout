import { useEffect, useState } from "react";

const YTM_PLAYLIST =
  "https://music.youtube.com/playlist?list=PLeatb7hupNV_AWUl_7ttbsKeCQh8tF5N4";

export function TopBar({ listeners }: { listeners: number }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="relative z-20 flex items-center justify-between gap-3 px-[var(--edge)] pt-[max(var(--edge),env(safe-area-inset-top))] text-white">
      <div className="text-sm font-semibold tabular-nums drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
        {time || "\u00A0"}
      </div>

      <div
        aria-live="polite"
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]"
      >
        <span className="size-2 animate-pulse rounded-full bg-emerald-400" aria-hidden />
        <span className="tabular-nums">{listeners}</span>
        <span className="opacity-80">on the highway</span>
      </div>

      <a
        href={YTM_PLAYLIST}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open the playlist on YouTube Music"
        title="Open the playlist on YouTube Music"
        className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition hover:bg-white/20"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
          <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
        </svg>
      </a>
    </header>
  );
}
