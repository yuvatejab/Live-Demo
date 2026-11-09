/** Synthetic content for the signup story. No real calls, numbers or people. */
export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = 720;

/** Ordered beats of one scene. A beat is "on" once the clock has reached it. */
export const STEP = {
  idle: 0,
  intro: 1,
  claims: 2,
  evidence: 3,
  rules: 4,
  checkOne: 5,
  checkTwo: 6,
  checkThree: 7,
  verdict: 8,
  receipt: 9,
  deliver: 10,
  out: 11,
} as const;

/** Milliseconds from the start of a scene to each beat. */
export const TIMELINE: readonly (readonly [number, number])[] = [
  [400, STEP.intro],
  [1200, STEP.claims],
  [4300, STEP.evidence],
  [7300, STEP.rules],
  [8100, STEP.checkOne],
  [8800, STEP.checkTwo],
  [9500, STEP.checkThree],
  [10700, STEP.verdict],
  [11900, STEP.receipt],
  [13000, STEP.deliver],
  [17000, STEP.out],
];
export const SCENE_MS = 18000;

/** When a beat starts, so a jump can resume the clock from there. */
export function startOf(step: number): number {
  return TIMELINE.find(([, beat]) => beat === step)?.[0] ?? 0;
}

export type Check = { label: string; detail?: string; result: string; ok: boolean };

export type Scene = {
  id: "billable" | "notBillable";
  networkClaim: string;
  buyerClaim: string;
  callId: string;
  duration: string;
  quote: readonly [before: string, mark: string, after: string];
  checks: readonly [Check, Check, Check];
  verdict: string;
  upheld: string;
  ok: boolean;
  receipt: string;
};

export const SCENES: readonly Scene[] = [
  {
    id: "billable",
    networkClaim: "A valid customer call.",
    buyerClaim: "Too short to bill.",
    callId: "8F2A-41",
    duration: "4:12",
    quote: ["Hi, I’m in ", "Austin, Texas", " and I’d like a quote this month."],
    checks: [
      { label: "Service area", result: "In area", ok: true },
      { label: "Talk time", detail: "4:12 of 1:00", result: "Met", ok: true },
      { label: "Real intent", result: "Quote requested", ok: true },
    ],
    verdict: "Billable",
    upheld: "Network’s claim upheld",
    ok: true,
    receipt: "r_8f2a…c41",
  },
  {
    id: "notBillable",
    networkClaim: "A valid customer call.",
    buyerClaim: "Caller was outside our area.",
    callId: "3C91-07",
    duration: "2:48",
    quote: ["I’m calling from ", "Tulsa, Oklahoma", ", do you work there?"],
    checks: [
      { label: "Service area", result: "Outside area", ok: false },
      { label: "Talk time", detail: "2:48 of 1:00", result: "Met", ok: true },
      { label: "Real intent", result: "Service question", ok: true },
    ],
    verdict: "Not billable",
    upheld: "Buyer’s claim upheld",
    ok: false,
    receipt: "r_3c91…a07",
  },
];

export const PARTIES = {
  network: { tag: "Network", name: "Northline Leads" },
  buyer: { tag: "Buyer", name: "Summit Roofing" },
} as const;

export const CAPTIONS = [
  {
    title: "Two parties. Two versions of the same call.",
    body: "Each side arrives with its own claim.",
  },
  {
    title: "One neutral referee.",
    body: "Every claim is checked against the rules both sides signed.",
  },
  { title: "One shared decision.", body: "Same evidence, same verdict, visible to both." },
] as const;

/** The three chapters a viewer can jump to, and the beat each starts on. */
export const CHAPTERS = [
  { label: "Claims", step: STEP.claims },
  { label: "Evidence", step: STEP.evidence },
  { label: "Verdict", step: STEP.verdict },
] as const;

export const STORY_LABEL =
  "Animation: the network and the buyer each make a different claim about a call. GetVerify checks the signed rules and both sides see the same evidence and verdict.";

/** Which caption and chapter a beat belongs to. */
export function phaseOf(step: number): 0 | 1 | 2 {
  if (step >= STEP.verdict) return 2;
  if (step >= STEP.evidence) return 1;
  return 0;
}

export const CARDS = ["claims", "evidence", "rules", "verdict"] as const;
export type Depth = "hidden" | "back" | "mid" | "front" | "gone";

/** The card the story is on. Claims is first, so the intro shows the deck with it in front. */
export function activeCard(step: number): number {
  if (step >= STEP.verdict) return 3;
  if (step >= STEP.rules) return 2;
  if (step >= STEP.evidence) return 1;
  return 0;
}

/** How far back in the deck a card sits: the active card leads, finished ones fly past. */
export function depthOf(card: number, step: number): Depth {
  if (step < STEP.intro) return "hidden";
  const distance = card - activeCard(step);
  if (distance < 0) return "gone";
  return (["front", "mid", "back"] as const)[distance] ?? "hidden";
}

/** Fit a fixed canvas into a box. Small boxes shrink it; large ones may enlarge it a little. */
export function fitStory(width: number, height: number) {
  if (!(width > 0) || !(height > 0)) return { scale: 1, left: 0, top: 0 };
  const scale = Math.min(width / CANVAS_WIDTH, height / CANVAS_HEIGHT, 1.3);
  return {
    scale,
    left: (width - CANVAS_WIDTH * scale) / 2,
    top: (height - CANVAS_HEIGHT * scale) / 2,
  };
}

/** Deterministic waveform heights, 16 to 100 percent. */
export const WAVEFORM: readonly number[] = Array.from({ length: 46 }, (_, i) =>
  Math.round(16 + 84 * Math.abs(Math.sin(i * 0.71) * Math.cos(i * 0.23 + 0.4))),
);
