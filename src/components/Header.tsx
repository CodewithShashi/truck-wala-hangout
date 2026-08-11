import { motion } from "motion/react";
import { Menu, Volume2, VolumeX } from "lucide-react";
import { OnlineCounter } from "./OnlineCounter";

interface HeaderProps {
  online: number;
  muted: boolean;
  onToggleMute: () => void;
  onMenu: () => void;
}

export function Header({ online, muted, onToggleMute, onMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-cream/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <motion.a
          href="/"
          whileHover={{ rotate: -2, scale: 1.03 }}
          className="flex items-center gap-2"
        >
          <span className="font-display text-2xl leading-none tracking-wide text-truck-red sm:text-3xl">
            TRUCK
          </span>
          <span className="rounded-md bg-ink px-2 py-0.5 font-display text-2xl leading-none tracking-wide text-cream sm:text-3xl">
            WALA
          </span>
        </motion.a>

        <div className="flex items-center gap-2 sm:gap-3">
          <OnlineCounter count={online} compact />
          <button
            aria-label={muted ? "Gaana chalao" : "Gaana band karo"}
            onClick={onToggleMute}
            className="hard-border grid size-10 place-items-center rounded-xl bg-accent transition-transform active:translate-y-0.5"
          >
            {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          </button>
          <button
            aria-label="Menu"
            onClick={onMenu}
            className="hard-border grid size-10 place-items-center rounded-xl bg-card transition-transform active:translate-y-0.5"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
