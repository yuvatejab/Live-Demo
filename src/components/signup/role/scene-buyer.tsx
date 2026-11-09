import type { CSSProperties } from "react";
import { Check, PhoneCall } from "lucide-react";
import { cx } from "../story/cx";
import { WAVEFORM } from "../story/story-data";
import { BUYER_STEP as S } from "./loops";
import { Reveal } from "./scene-network";
import s from "./scene.module.css";

const RULES = [
  { label: "Service area", result: "In area", at: S.ruleOne },
  { label: "Talk time", result: "4:12", at: S.ruleTwo },
  { label: "Real intent", result: "Quote", at: S.ruleThree },
] as const;

/** A buyer checks one call against the signed rules, then accepts the verdict. */
export function SceneBuyer({ step }: { step: number }) {
  return (
    <div data-testid="scene-buyer" data-step={step} className={cx(s.scene, step === 0 && s.reset)}>
      <Reveal at={S.call} step={step} className={cx(s.card, s.call)}>
        <div className={s.callHead}>
          <span className={s.icon}>
            <PhoneCall aria-hidden="true" strokeWidth={1.6} />
          </span>
          <b>+1 ••• ••• 4821</b>
          <span className={s.mono}>4:12</span>
        </div>
        <div className={cx(s.wave, step >= S.quote && s.waveOn)}>
          {WAVEFORM.slice(0, 32).map((height, index) => (
            <i
              key={index}
              className={s.bar}
              style={{ "--h": `${height}%`, "--i": index } as CSSProperties}
            />
          ))}
        </div>
        <p className={s.quote}>
          I own the home and I <mark data-on={String(step >= S.quote)}>need the roof replaced</mark>
          .
        </p>
        <div className={s.callFoot}>
          <span>Harbor Leads</span>
          <span>Roofing</span>
        </div>
      </Reveal>

      <Reveal at={S.ruleOne - 1} step={step} className={cx(s.card, s.checks)}>
        <div className={s.eyebrow}>Signed rules</div>
        <div className={s.rules}>
          {RULES.map((rule) => (
            <div key={rule.label} className={s.rule} data-on={String(step >= rule.at)}>
              <span className={s.tick}>
                <Check aria-hidden="true" strokeWidth={3.4} />
              </span>
              {rule.label}
              <em>{rule.result}</em>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal at={S.verdict} step={step} className={cx(s.card, s.act)}>
        <span className={s.badge}>
          <i />
          Billable
        </span>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className={s.accept}
          data-done={String(step >= S.accepted)}
        >
          <span className={s.before}>Accept</span>
          <span className={s.after}>Accepted</span>
        </button>
      </Reveal>

      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className={s.cursor}
        data-on={String(step >= S.cursor)}
        data-tap={String(step === S.accepted)}
      >
        <path
          d="M3 2l10 4.8-4.2 1.4L7 12.4z"
          fill="#111"
          stroke="#fff"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
