import { FlutedGlass } from "@paper-design/shaders-react";

const tones = {
  // Black fading to white: the original look.
  mono: {
    gradient: "linear-gradient(#000000, #ffffff)",
    shadow: "#000000",
    highlights: 0.1,
    shadows: 0.2,
    grain: 0.1,
  },
  // Ultramarine deepening at the top, easing through sky blue into warm paper.
  paper: {
    gradient: "linear-gradient(#1a34b8 0%, #3558e4 26%, #7e9bf4 52%, #c9d6fb 76%, #f6f3ee 100%)",
    shadow: "#0a165f",
    highlights: 0.55,
    shadows: 0.42,
    grain: 0.07,
  },
} as const;

/** A gradient with fluted-glass vertical lines on top. */
export function FlutedBackdrop({ tone = "mono" }: { tone?: keyof typeof tones }) {
  const look = tones[tone];
  return (
    <div
      aria-hidden="true"
      data-tone={tone}
      className="pointer-events-none absolute inset-0"
      style={{ backgroundImage: look.gradient }}
    >
      <FlutedGlass
        size={0.89}
        shape="lines"
        angle={0}
        distortionShape="prism"
        distortion={0.5}
        shift={0}
        blur={0}
        edges={0.25}
        stretch={0}
        scale={1.11}
        fit="cover"
        highlights={look.highlights}
        shadows={look.shadows}
        grainMixer={0.1}
        grainOverlay={look.grain}
        colorBack="#00000000"
        colorHighlight="#FFFFFF"
        colorShadow={look.shadow}
        className="h-full w-full bg-transparent"
      />
    </div>
  );
}
