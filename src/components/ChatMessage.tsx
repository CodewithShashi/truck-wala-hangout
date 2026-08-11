import { motion } from "motion/react";
import type { ChatMessageData } from "@/lib/truck-presence";

export function ChatMessage({ msg }: { msg: ChatMessageData }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: msg.isYou ? 24 : -24 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex ${msg.isYou ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`hard-border max-w-[85%] rounded-2xl px-3 py-2 ${
          msg.isYou ? "bg-accent" : "bg-card"
        }`}
      >
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          {msg.emoji} {msg.author}
        </p>
        <p className="text-sm font-medium">{msg.text}</p>
      </div>
    </motion.div>
  );
}
