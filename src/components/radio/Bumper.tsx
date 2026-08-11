import { useCallback, useEffect, useRef, useState } from "react";
import { BUMPER_LINES } from "@/data/bumpers";

/** Painted-on-the-tailgate one-liners that rotate every 12s. */
export function Bumper() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timer = useRef<number | null>(null);

  const next = useCallback(() => {
    setFading(true);
    window.setTimeout(() => {
      setIndex((i) => (i + 1 + Math.floor(Math.random() * 3)) % BUMPER_LINES.length);
      setFading(false);
    }, 180);
  }, []);

  useEffect(() => {
    timer.current = window.setInterval(next, 12_000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [next]);

  return (
    <p className="mx-auto max-w-xl text-balance px-4 text-center text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
      <span
        lang="hi"
        aria-live="polite"
        className={`font-bumper text-lg leading-snug transition-opacity duration-200 sm:text-xl ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        {BUMPER_LINES[index]}
      </span>
      <button
        type="button"
        onClick={next}
        aria-label="Another line"
        className="ml-2 inline-grid size-6 translate-y-1 place-items-center rounded-full border border-white/20 bg-white/10 align-baseline transition hover:bg-white/20"
      >
        <svg
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20 11.5A8 8 0 106.3 17.7" />
          <path d="M20 5.5v6h-6" />
        </svg>
      </button>
    </p>
  );
}
