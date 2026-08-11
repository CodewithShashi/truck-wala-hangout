import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lightbulb } from "lucide-react";
import { usePresence } from "@/hooks/use-presence";
import { sfx } from "@/lib/truck-audio";
import { Header } from "./Header";
import { TruckIllustration } from "./TruckIllustration";
import { OnlineCounter } from "./OnlineCounter";
import { HornButton } from "./HornButton";
import { RiderList } from "./RiderList";
import { TruckChat } from "./TruckChat";
import { MusicPlayer } from "./MusicPlayer";
import { FloatingEffects, type FloatingItem } from "./FloatingEffects";
import { Footer } from "./Footer";

const HORN_LINES = ["POOOOON POOOON 🚚", "Side de bhai!", "Horn OK Please ✨", "Chal hat! 😤"];

export function TruckScene() {
  const { riders, online, joinAsYou } = usePresence(24);
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
  const [honking, setHonking] = useState(false);
  const [floats, setFloats] = useState<FloatingItem[]>([]);
  const [burst, setBurst] = useState(0);
  const shellRef = useRef<HTMLDivElement>(null);

  const float = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    const item: FloatingItem = {
      id,
      text,
      x: window.innerWidth * (0.3 + Math.random() * 0.4),
      y: window.innerHeight * (0.35 + Math.random() * 0.25),
    };
    setFloats((f) => [...f, item]);
    window.setTimeout(() => setFloats((f) => f.filter((i) => i.id !== id)), 1400);
  }, []);

  const enter = () => {
    sfx.start();
    setEntered(true);
    setLightsOn(true);
    joinAsYou();
    setBurst((b) => b + 1);
    float("Truck mein aao 🚚");
  };

  const honk = () => {
    if (!muted) sfx.horn();
    setHonking(true);
    shellRef.current?.classList.add("shake-now");
    window.setTimeout(() => {
      setHonking(false);
      shellRef.current?.classList.remove("shake-now");
    }, 520);
    float(HORN_LINES[Math.floor(Math.random() * HORN_LINES.length)] ?? "POOOOON 🚚");
  };

  const toggleLights = () => {
    if (!muted) sfx.lights();
    setLightsOn((v) => !v);
    float(lightsOn ? "Lights band 🌑" : "Lights on 💡");
  };

  return (
    <div ref={shellRef} className="min-h-screen pb-40">
      <Header
        online={online}
        muted={muted}
        onToggleMute={() => {
          setMuted((m) => !m);
          sfx.click();
        }}
        onMenu={() => float("Menu abhi dhaba pe hai 🍵")}
      />

      <main className="mx-auto max-w-6xl px-4">
        {/* HERO */}
        <section className="flex flex-col items-center pt-8 text-center sm:pt-12">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hard-border rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
          >
            Truck mein kitne log hain?
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 font-display text-6xl leading-[0.9] tracking-wide sm:text-8xl"
          >
            <span className="text-truck-red">TRUCK</span>{" "}
            <span className="inline-block -rotate-2 rounded-xl bg-ink px-3 text-cream">WALA</span>
          </motion.h1>
          <p className="mt-3 font-display text-2xl tracking-wide text-truck-teal sm:text-3xl">
            WELCOME TO THE TRUCK
          </p>

          <div className="mt-8 w-full">
            <div className="flex justify-center">
              <TruckIllustration
                lightsOn={lightsOn}
                onToggleLights={toggleLights}
                honking={honking}
                onDecorationClick={(label) => {
                  if (!muted) sfx.click();
                  float(label);
                }}
              />
            </div>
          </div>

          <div className="mt-8">
            <OnlineCounter count={online} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {online} log abhi ride kar rahe hain • koi login nahi, bas aao
          </p>

          <AnimatePresence mode="wait">
            {!entered ? (
              <motion.button
                key="enter"
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={enter}
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ y: { duration: 1.8, repeat: Infinity } }}
                className="hard-border-lg mt-6 rounded-3xl bg-truck-red px-8 py-5 font-display text-3xl tracking-wide text-primary-foreground sm:text-4xl"
              >
                🚚 ENTER THE TRUCK
              </motion.button>
            ) : (
              <motion.div
                key="controls"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex flex-wrap items-center justify-center gap-3"
              >
                <HornButton onHonk={honk} />
                <motion.button
                  onClick={toggleLights}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95, y: 3 }}
                  className={`hard-border-lg inline-flex items-center gap-2 rounded-3xl px-5 py-4 font-display text-2xl tracking-wide ${
                    lightsOn ? "bg-truck-yellow" : "bg-card"
                  }`}
                >
                  <Lightbulb className="size-6" />
                  {lightsOn ? "LIGHTS ON" : "LIGHTS OFF"}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* INSIDE THE TRUCK */}
        <AnimatePresence>
          {entered && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-14 grid gap-6 md:grid-cols-2"
            >
              <RiderList riders={riders} />
              <TruckChat names={riders.map((r) => r.name)} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <div className="mt-16">
        <Footer />
      </div>

      {entered && (
        <MusicPlayer
          autoStart
          muted={muted}
          onToggleMute={() => {
            setMuted((m) => !m);
          }}
        />
      )}

      <FloatingEffects items={floats} burst={burst} />
    </div>
  );
}
