import { AnimatePresence, motion } from "motion/react";
import type { Rider } from "@/lib/truck-presence";
import { RiderAvatar } from "./RiderAvatar";

export function RiderList({ riders }: { riders: Rider[] }) {
  return (
    <section className="hard-border-lg rounded-3xl bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h2 className="font-display text-2xl tracking-wide">Truck mein kaun kaun hai</h2>
        <motion.span
          key={riders.length}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-display text-xl text-truck-red"
        >
          {riders.length}
        </motion.span>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence initial={false}>
          {riders.map((r, i) => (
            <RiderAvatar key={r.id} rider={r} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
