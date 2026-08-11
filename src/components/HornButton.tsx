import { motion } from "motion/react";
import { Megaphone } from "lucide-react";

export function HornButton({ onHonk }: { onHonk: () => void }) {
  return (
    <motion.button
      onClick={onHonk}
      whileHover={{ scale: 1.05, rotate: -1.5 }}
      whileTap={{ scale: 0.94, y: 4 }}
      className="hard-border-lg inline-flex items-center gap-3 rounded-3xl bg-accent px-6 py-4 font-display text-2xl tracking-wide sm:text-3xl"
    >
      <Megaphone className="size-7" />
      HORN BAJAO
      <span aria-hidden>📣</span>
    </motion.button>
  );
}
