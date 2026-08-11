import { createFileRoute } from "@tanstack/react-router";
import { RadioScene } from "@/components/radio/RadioScene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Truck Wala — Indian truck driver songs | Horn OK Please" },
      {
        name: "description",
        content:
          "Non-stop 90s Bollywood highway bangers — the songs that blast out of Indian trucks. Kumar Sanu, Altaf Raja, Udit Narayan. Press play. Horn OK Please.",
      },
      { property: "og:title", content: "Truck Wala — Horn OK Please" },
      {
        property: "og:description",
        content: "Highway bangers off the back of an Indian truck. Non-stop, ad-light, always on.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <RadioScene />;
}

