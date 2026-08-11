import { useState } from "react";
import { sfx } from "@/lib/truck-audio";

export function HornButton({ onDuck }: { onDuck: () => void }) {
  const [blaring, setBlaring] = useState(false);

  const honk = () => {
    sfx.horn();
    onDuck();
    setBlaring(true);
    window.setTimeout(() => setBlaring(false), 450);
  };

  return (
    <button
      type="button"
      onClick={honk}
      aria-label="Sound the horn"
      className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur transition hover:bg-white/20 ${
        blaring ? "scale-110" : ""
      }`}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
        <path fill="currentColor" d="M3 9v6h4l5 4V5L7 9H3z" />
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M15.4 8.4a5.2 5.2 0 010 7.2" />
          <path d="M18.2 5.6a9.2 9.2 0 010 12.8" />
        </g>
      </svg>
      <span className="flex flex-col items-start leading-tight">
        <span lang="hi" className="font-bumper text-sm">
          हॉर्न ओके प्लीज़
        </span>
        <span className="text-[10px] uppercase tracking-widest text-white/70">
          Horn ok pleaseeee
        </span>
      </span>
    </button>
  );
}
