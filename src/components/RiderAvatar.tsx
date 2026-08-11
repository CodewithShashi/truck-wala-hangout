import { motion } from "motion/react";
import type { Rider } from "@/lib/truck-presence";

export function RiderAvatar({ rider, index = 0 }: { rider: Rider; index?: number }) {
  return (
    <motion.div
      layout
      initial={{ scale: 0, y: 12, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 18, delay: Math.min(index * 0.02, 0.4) }}
      whileHover={{ y: -4, rotate: -3 }}
      className={`hard-border flex items-center gap-1.5 rounded-full px-2.5 py-1.5 ${
        rider.isYou ? "bg-truck-red text-primary-foreground" : "bg-card"
      }`}
      title={rider.name}
    >
      <span className="text-base leading-none">{rider.emoji}</span>
      <span className="max-w-[90px] truncate text-xs font-semibold">{rider.name}</span>
    </motion.div>
  );
}
