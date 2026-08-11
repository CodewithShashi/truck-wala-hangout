export interface Rider {
  id: string;
  name: string;
  emoji: string;
  isYou?: boolean;
}

export interface ChatMessageData {
  id: string;
  author: string;
  emoji: string;
  text: string;
  isYou?: boolean;
  at: number;
}

const NAMES = [
  "Rahul",
  "Priya",
  "Aman",
  "Neha",
  "Bunty",
  "Simran",
  "Chotu",
  "Jaspreet",
  "Rekha",
  "Munna",
  "Sanya",
  "Vicky",
  "Pinky",
  "Golu",
  "Farhan",
  "Meera",
];
const EMOJIS = ["🧢", "🕶️", "🧣", "👳", "🎧", "🍵", "🪕", "😎", "🛺", "🥁", "🌶️", "🪔"];

export const CHAT_LINES = [
  "Bhai horn baja 😂",
  "Ye gaana mast hai",
  "Truck full hai!",
  "Chai break kab?",
  "Side de bhai!",
  "Highway pe scene set hai 🚚",
  "Volume thoda badha",
  "Dhaba pe milte hain",
  "Horn OK Please ✨",
  "Kya scene hai?",
];

function pick<T>(arr: T[], i?: number): T {
  const idx = i ?? Math.floor(Math.random() * arr.length);
  return arr[idx % arr.length] as T;
}

export function makeRider(seed: number): Rider {
  return {
    id: `r-${seed}-${Math.random().toString(36).slice(2, 7)}`,
    name: pick(NAMES, seed),
    emoji: pick(EMOJIS, seed * 3 + 1),
  };
}

export function makeRiders(count: number): Rider[] {
  return Array.from({ length: count }, (_, i) => makeRider(i));
}

export function randomChatLine() {
  return pick(CHAT_LINES);
}
