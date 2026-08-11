import { motion } from "motion/react";

interface OnlineCounterProps {
  count: number;
  compact?: boolean;
}

export function OnlineCounter({ count, compact }: OnlineCounterProps) {
  if (compact) {
    return (
      <div className="hard-border flex items-center gap-1.5 rounded-xl bg-card px-2.5 py-2">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-truck-green opacity-70" />
          <span className="relative inline-flex size-2.5 rounded-full bg-truck-green" />
        </span>
        <motion.span
          key={count}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-display text-lg leading-none"
        >
          {count}
        </motion.span>
        <span className="hidden text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:inline">
          online
        </span>
      </div>
    );
  }

  return (
    <div className="hard-border inline-flex items-center gap-2 rounded-2xl bg-card px-4 py-2">
      <span className="relative flex size-3">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-truck-green opacity-70" />
        <span className="relative inline-flex size-3 rounded-full bg-truck-green" />
      </span>
      <motion.span
        key={count}
        initial={{ y: -10, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className="font-display text-2xl leading-none"
      >
        {count}
      </motion.span>
      <span className="font-display text-xl leading-none tracking-wide">TRUCK WALAS ONLINE</span>
    </div>
  );
}
