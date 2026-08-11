import { useCallback, useEffect, useRef, useState } from "react";
import { makeRider, makeRiders, type Rider } from "@/lib/truck-presence";

/**
 * Simulated realtime presence.
 * Replace the interval logic with a Supabase realtime channel / WebSocket later —
 * the returned shape ({ riders, online }) is what the UI depends on.
 */
export function usePresence(initial = 24) {
  const [riders, setRiders] = useState<Rider[]>(() => makeRiders(initial));
  const seed = useRef(initial);

  useEffect(() => {
    const id = window.setInterval(
      () => {
        setRiders((prev) => {
          const joining = Math.random() > 0.42;
          if (joining && prev.length < 48) {
            seed.current += 1;
            return [...prev, makeRider(seed.current)];
          }
          if (!joining && prev.length > 8) {
            const i = Math.floor(Math.random() * prev.length);
            return prev.filter((r, idx) => idx !== i || r.isYou);
          }
          return prev;
        });
      },
      2600 + Math.random() * 2000,
    );
    return () => window.clearInterval(id);
  }, []);

  const joinAsYou = useCallback((name = "You") => {
    setRiders((prev) =>
      prev.some((r) => r.isYou)
        ? prev
        : [...prev, { id: "you", name, emoji: "🚚", isYou: true }],
    );
  }, []);

  return { riders, online: riders.length, joinAsYou };
}
