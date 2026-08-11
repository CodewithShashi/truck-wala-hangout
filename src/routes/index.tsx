import { createFileRoute } from "@tanstack/react-router";
import { TruckScene } from "@/components/TruckScene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Truck Wala — Truck mein aao 🚚" },
      {
        name: "description",
        content:
          "Truck Wala is a playful online truck hangout: horn bajao, gaana chalao, chat karo and see who's riding right now.",
      },
      { property: "og:title", content: "Truck Wala — Truck mein aao 🚚" },
      {
        property: "og:description",
        content:
          "Enter the truck, honk the horn, play music and hang out with other truck walas online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <TruckScene />;
}
