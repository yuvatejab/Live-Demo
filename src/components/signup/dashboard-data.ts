/** Synthetic marketing data for the signup preview. No real calls, numbers or people. */
export type Tone = "neutral" | "billable" | "notBillable" | "pending";

export const DESIGN_WIDTH = 1000;
export const DESIGN_HEIGHT = 640;

/** Scale a fixed-size canvas down to fit its container; never enlarge it. */
export function fitScale(containerWidth: number, designWidth: number): number {
  if (!(containerWidth > 0)) return 1;
  return Math.min(1, containerWidth / designWidth);
}

export const kpis = [
  {
    label: "Calls checked",
    total: 4812,
    value: "4,812",
    delta: "+8.2%",
    up: true,
    tone: "neutral",
    trend: [38, 42, 40, 47, 45, 51, 49, 56, 54, 60, 58, 66],
  },
  {
    label: "Billable",
    total: 3436,
    value: "3,436",
    delta: "+3.1%",
    up: true,
    tone: "billable",
    trend: [30, 33, 32, 36, 35, 38, 37, 41, 40, 43, 42, 46],
  },
  {
    label: "Not billable",
    total: 893,
    value: "893",
    delta: "-1.4%",
    up: false,
    tone: "notBillable",
    trend: [12, 11, 13, 12, 11, 12, 10, 11, 10, 11, 9, 10],
  },
  {
    label: "Pending",
    total: 483,
    value: "483",
    delta: "-6.0%",
    up: false,
    tone: "pending",
    trend: [9, 8, 9, 7, 8, 7, 7, 6, 7, 6, 5, 5],
  },
] as const satisfies readonly {
  label: string;
  total: number;
  value: string;
  delta: string;
  up: boolean;
  tone: Tone;
  trend: readonly number[];
}[];

/** Fourteen days of verdicts: billable, not billable, pending. */
export const chartDays: readonly (readonly [number, number, number])[] = [
  [212, 58, 31],
  [238, 61, 34],
  [224, 66, 29],
  [251, 59, 36],
  [247, 64, 33],
  [196, 52, 27],
  [188, 49, 24],
  [243, 63, 35],
  [259, 60, 32],
  [262, 67, 38],
  [248, 62, 30],
  [271, 65, 34],
  [230, 57, 29],
  [205, 54, 26],
];

export type Verdict = "billable" | "notBillable" | "pending";

export const verdictLabel: Record<Verdict, string> = {
  billable: "Billable",
  notBillable: "Not billable",
  pending: "Pending",
};

export const recentCalls: readonly {
  caller: string;
  publisher: string;
  verdict: Verdict;
  quote: string;
  time: string;
}[] = [
  {
    caller: "+1 ••• ••• 4821",
    publisher: "Harbor Leads",
    verdict: "billable",
    quote: "“Yes, I own the home and I need the roof replaced.”",
    time: "09:42",
  },
  {
    caller: "+1 ••• ••• 1907",
    publisher: "Summit Media",
    verdict: "notBillable",
    quote: "“Sorry, I think you have the wrong number.”",
    time: "09:37",
  },
  {
    caller: "+1 ••• ••• 6350",
    publisher: "Harbor Leads",
    verdict: "pending",
    quote: "“My husband handles that, let me check with him.”",
    time: "09:31",
  },
  {
    caller: "+1 ••• ••• 2274",
    publisher: "Northline",
    verdict: "billable",
    quote: "“We had hail damage last month and want a quote.”",
    time: "09:24",
  },
];
