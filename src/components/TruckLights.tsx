import { motion } from "motion/react";

interface TruckLightsProps {
  on: boolean;
  onToggle: () => void;
}

/** Clickable headlights with a glow beam. */
export function TruckLights({ on, onToggle }: TruckLightsProps) {
  return (
    <g onClick={onToggle} className="cursor-pointer" role="button" aria-label="Truck lights">
      {[0, 1].map((i) => {
        const cx = 46 + i * 0;
        const cy = 214 + i * 26;
        return (
          <g key={i}>
            {on && (
              <motion.polygon
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                points={`${cx - 6},${cy - 8} ${cx - 6},${cy + 8} ${cx - 120},${cy + 52} ${cx - 120},${cy - 52}`}
                fill="var(--truck-yellow)"
              />
            )}
            <motion.circle
              cx={cx}
              cy={cy}
              r="11"
              stroke="var(--ink)"
              strokeWidth="4"
              fill={on ? "var(--truck-yellow)" : "var(--muted)"}
              animate={on ? { filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] } : {}}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          </g>
        );
      })}
    </g>
  );
}
