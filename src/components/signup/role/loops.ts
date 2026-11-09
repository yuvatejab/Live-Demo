/** Beats of the two role animations. A beat is "on" once its step has been reached. */
export type Loop = {
  /** [milliseconds from the start, step reached] */
  timeline: readonly (readonly [number, number])[];
  total: number;
  last: number;
};

export const NETWORK_STEP = {
  idle: 0,
  file: 1,
  check: 2,
  verdicts: 3,
  row: 4,
  appeal: 5,
  review: 6,
  receipt: 7,
} as const;

export const NETWORK_LOOP: Loop = {
  timeline: [
    [400, NETWORK_STEP.file],
    [1400, NETWORK_STEP.check],
    [3000, NETWORK_STEP.verdicts],
    [4500, NETWORK_STEP.row],
    [5400, NETWORK_STEP.appeal],
    [6000, NETWORK_STEP.review],
    [6900, NETWORK_STEP.receipt],
  ],
  total: 9400,
  last: NETWORK_STEP.receipt,
};

export const BUYER_STEP = {
  idle: 0,
  call: 1,
  quote: 2,
  ruleOne: 3,
  ruleTwo: 4,
  ruleThree: 5,
  verdict: 6,
  cursor: 7,
  accepted: 8,
} as const;

export const BUYER_LOOP: Loop = {
  timeline: [
    [400, BUYER_STEP.call],
    [1500, BUYER_STEP.quote],
    [2700, BUYER_STEP.ruleOne],
    [3300, BUYER_STEP.ruleTwo],
    [3900, BUYER_STEP.ruleThree],
    [4700, BUYER_STEP.verdict],
    [5600, BUYER_STEP.cursor],
    [6500, BUYER_STEP.accepted],
  ],
  total: 9000,
  last: BUYER_STEP.accepted,
};
