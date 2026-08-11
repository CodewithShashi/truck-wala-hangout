import { motion } from "motion/react";
import { TruckLights } from "./TruckLights";

interface TruckIllustrationProps {
  lightsOn: boolean;
  onToggleLights: () => void;
  honking: boolean;
  onDecorationClick?: (label: string) => void;
}

/** Original hand-painted-style Indian truck, all SVG so it stays featherweight. */
export function TruckIllustration({
  lightsOn,
  onToggleLights,
  honking,
  onDecorationClick,
}: TruckIllustrationProps) {
  const deco = (label: string) => ({
    onClick: () => onDecorationClick?.(label),
    className: "cursor-pointer",
  });

  return (
    <motion.svg
      viewBox="0 0 520 320"
      className="w-full max-w-3xl drop-shadow-[8px_8px_0_var(--ink)]"
      initial={{ x: -160, opacity: 0, rotate: -3 }}
      animate={{ x: 0, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 60, damping: 12 }}
      aria-label="Truck Wala truck"
      role="img"
    >
      <motion.g
        animate={honking ? { rotate: [0, -1.5, 1.5, -1, 0] } : { y: [0, -4, 0] }}
        transition={honking ? { duration: 0.5 } : { duration: 2.4, repeat: Infinity }}
        style={{ originX: 0.5, originY: 1 }}
      >
        {/* cargo body */}
        <rect
          x="150"
          y="60"
          width="330"
          height="170"
          rx="14"
          fill="var(--truck-red)"
          stroke="var(--ink)"
          strokeWidth="6"
        />
        {/* painted panels */}
        <rect x="172" y="84" width="132" height="122" rx="8" fill="var(--truck-yellow)" stroke="var(--ink)" strokeWidth="5" />
        <rect x="322" y="84" width="132" height="122" rx="8" fill="var(--truck-green)" stroke="var(--ink)" strokeWidth="5" />

        {/* lotus-ish motif */}
        <g {...deco("Chitrakari 🎨")}>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.ellipse
              key={i}
              cx="238"
              cy="145"
              rx="9"
              ry="30"
              fill="var(--truck-orange)"
              stroke="var(--ink)"
              strokeWidth="3"
              transform={`rotate(${i * 45} 238 145)`}
              whileHover={{ scale: 1.12 }}
            />
          ))}
          <circle cx="238" cy="145" r="12" fill="var(--truck-red)" stroke="var(--ink)" strokeWidth="4" />
        </g>

        {/* slogan panel */}
        <g {...deco("Horn OK Please ✨")}>
          <motion.rect
            whileHover={{ rotate: -2 }}
            x="336"
            y="104"
            width="104"
            height="82"
            rx="8"
            fill="var(--cream)"
            stroke="var(--ink)"
            strokeWidth="4"
          />
          <text x="388" y="132" textAnchor="middle" fontFamily="Bebas Neue, sans-serif" fontSize="22" fill="var(--truck-red)">
            HORN
          </text>
          <text x="388" y="156" textAnchor="middle" fontFamily="Bebas Neue, sans-serif" fontSize="22" fill="var(--truck-teal)">
            OK
          </text>
          <text x="388" y="178" textAnchor="middle" fontFamily="Bebas Neue, sans-serif" fontSize="22" fill="var(--ink)">
            PLEASE
          </text>
        </g>

        {/* cabin */}
        <path
          d="M30 150 L92 150 L124 96 L150 96 L150 230 L30 230 Z"
          fill="var(--truck-orange)"
          stroke="var(--ink)"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path d="M96 152 L122 108 L146 108 L146 152 Z" fill="var(--truck-teal)" stroke="var(--ink)" strokeWidth="5" />

        {/* mirror */}
        <g {...deco("Sheesha 🪞")}>
          <line x1="92" y1="150" x2="70" y2="132" stroke="var(--ink)" strokeWidth="5" />
          <motion.rect whileHover={{ rotate: 8 }} x="56" y="118" width="18" height="16" rx="4" fill="var(--cream)" stroke="var(--ink)" strokeWidth="4" />
        </g>

        {/* flags */}
        <g {...deco("Jhandi 🚩")}>
          <line x1="150" y1="60" x2="150" y2="30" stroke="var(--ink)" strokeWidth="5" />
          <motion.path
            d="M150 32 L192 42 L150 54 Z"
            fill="var(--truck-green)"
            stroke="var(--ink)"
            strokeWidth="4"
            animate={{ skewY: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        </g>

        {/* hanging ornaments */}
        <g {...deco("Latkan 🪘")}>
          {[190, 230, 270, 310, 350, 390, 430].map((x, i) => (
            <motion.g
              key={x}
              animate={{ rotate: [-6, 6, -6] }}
              transition={{ duration: 1.8 + i * 0.12, repeat: Infinity }}
              style={{ originX: `${x}px`, originY: "230px" }}
            >
              <line x1={x} y1="230" x2={x} y2="246" stroke="var(--ink)" strokeWidth="3" />
              <circle
                cx={x}
                cy="252"
                r="7"
                fill={i % 3 === 0 ? "var(--truck-yellow)" : i % 3 === 1 ? "var(--truck-green)" : "var(--cream)"}
                stroke="var(--ink)"
                strokeWidth="3"
              />
            </motion.g>
          ))}
        </g>

        {/* number plate */}
        <g {...deco("Number plate 🔢")}>
          <rect x="40" y="238" width="86" height="26" rx="6" fill="var(--cream)" stroke="var(--ink)" strokeWidth="4" />
          <text x="83" y="257" textAnchor="middle" fontFamily="Bebas Neue, sans-serif" fontSize="17" fill="var(--ink)">
            TW 01 AAO
          </text>
        </g>

        <TruckLights on={lightsOn} onToggle={onToggleLights} />
      </motion.g>

      {/* wheels */}
      {[110, 300, 400].map((cx) => (
        <motion.g
          key={cx}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ originX: `${cx}px`, originY: "272px" }}
        >
          <circle cx={cx} cy="272" r="34" fill="var(--ink)" />
          <circle cx={cx} cy="272" r="14" fill="var(--truck-yellow)" stroke="var(--ink)" strokeWidth="4" />
          <line x1={cx - 14} y1="272" x2={cx + 14} y2="272" stroke="var(--ink)" strokeWidth="4" />
          <line x1={cx} y1="258" x2={cx} y2="286" stroke="var(--ink)" strokeWidth="4" />
        </motion.g>
      ))}

      {/* road */}
      <line x1="0" y1="306" x2="520" y2="306" stroke="var(--ink)" strokeWidth="6" strokeDasharray="26 18" />
    </motion.svg>
  );
}
