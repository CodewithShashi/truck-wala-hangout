import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { sfx } from "@/lib/truck-audio";
import { randomChatLine, type ChatMessageData } from "@/lib/truck-presence";
import { ChatMessage } from "./ChatMessage";

const SEED: ChatMessageData[] = [
  { id: "1", author: "Rahul", emoji: "🧢", text: "Bhai horn baja 😂", at: Date.now() - 40000 },
  { id: "2", author: "Priya", emoji: "🎧", text: "Ye gaana mast hai", at: Date.now() - 25000 },
  { id: "3", author: "Aman", emoji: "😎", text: "Truck full hai!", at: Date.now() - 8000 },
];

/**
 * MVP chat: local state + simulated chatter.
 * Point `onSend` / the seed loader at a realtime backend later.
 */
export function TruckChat({ names }: { names: string[] }) {
  const [messages, setMessages] = useState<ChatMessageData[]>(SEED);
  const [value, setValue] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(
      () => {
        const name = names[Math.floor(Math.random() * names.length)] ?? "Chotu";
        setMessages((m) =>
          [
            ...m,
            {
              id: `${Date.now()}`,
              author: name,
              emoji: "🚚",
              text: randomChatLine(),
              at: Date.now(),
            },
          ].slice(-40),
        );
        sfx.notification();
      },
      7000 + Math.random() * 6000,
    );
    return () => window.clearInterval(id);
  }, [names]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = value.trim();
    if (!text) return;
    sfx.click();
    setMessages((m) => [
      ...m,
      { id: `${Date.now()}`, author: "You", emoji: "🚚", text, isYou: true, at: Date.now() },
    ]);
    setValue("");
  };

  return (
    <section className="hard-border-lg flex h-[420px] flex-col rounded-3xl bg-muted p-4">
      <h2 className="mb-2 font-display text-2xl tracking-wide">
        TRUCK CHAT <span className="text-truck-red">— kya scene hai?</span>
      </h2>
      <div ref={scroller} className="flex-1 space-y-2 overflow-y-auto pr-1">
        {messages.map((m) => (
          <ChatMessage key={m.id} msg={m} />
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Apna message likho…"
          aria-label="Apna message likho"
          className="hard-border min-w-0 flex-1 rounded-xl bg-card px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={send}
          className="hard-border inline-flex items-center gap-1.5 rounded-xl bg-truck-red px-3 py-2 font-display text-lg tracking-wide text-primary-foreground active:translate-y-0.5"
        >
          SEND <Send className="size-4" />
        </button>
      </div>
    </section>
  );
}
