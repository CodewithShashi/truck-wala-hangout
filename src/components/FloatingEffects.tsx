import { AnimatePresence, motion } from "motion/react";

export interface FloatingItem {
  id: number;
  text: string;
  x: number;
  y: number;
}

const CONFETTI = ["🚚", "✨", "🪔", "🚩", "🥁", "🌶️", "📣"];

export function FloatingEffects({
  items,
  burst,
}: {
  items: FloatingItem[];
  burst: number;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <AnimatePresence>
        {items.map((it) => (
          <motion.div
            key={it.id}
            initial={{ opacity: 0, scale: 0.6, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -90 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.4 }}
            style={{ left: it.x, top: it.y }}
            className="absolute -translate-x-1/2"
          >
            <span className="hard-border inline-block rounded-2xl bg-card px-3 py-1.5 font-display text-xl tracking-wide">
              {it.text}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {burst > 0 && (
          <motion.div key={burst} className="absolute inset-0">
            {Array.from({ length: 22 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl"
                initial={{ opacity: 1, x: "50vw", y: "55vh", scale: 0.6 }}
                animate={{
                  opacity: 0,
                  x: `${10 + Math.random() * 80}vw`,
                  y: `${5 + Math.random() * 70}vh`,
                  rotate: Math.random() * 540 - 270,
                  scale: 1.1,
                }}
                transition={{ duration: 1.4 + Math.random() * 0.6, ease: "easeOut" }}
              >
                {CONFETTI[i % CONFETTI.length]}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
