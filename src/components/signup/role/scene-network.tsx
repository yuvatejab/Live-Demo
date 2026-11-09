import type { ReactNode } from "react";
import { Check, Clock, FileSpreadsheet, PhoneCall, ShieldCheck } from "lucide-react";
import { cx } from "../story/cx";
import { NETWORK_STEP as S } from "./loops";
import s from "./scene.module.css";

export function Reveal({
  at,
  step,
  className,
  children,
}: {
  at: number;
  step: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx(s.item, s.rv, className)} data-on={String(step >= at)}>
      {children}
    </div>
  );
}

const VERDICTS = [
  { label: "Billable", count: "912", color: "var(--color-iris-blue)" },
  { label: "Not billable", count: "244", color: "var(--color-graphite)" },
  { label: "Pending", count: "128", color: "var(--color-dove-gray)" },
] as const;

/** A network uploads a batch, sees the verdicts, and appeals one rejection. */
export function SceneNetwork({ step }: { step: number }) {
  return (
    <div
      data-testid="scene-network"
      data-step={step}
      className={cx(s.scene, step === 0 && s.reset)}
    >
      <div className={cx(s.item, s.zone)} data-on={String(step >= S.file)} />
      <Reveal at={S.file} step={step} className={cx(s.card, s.file)}>
        <FileSpreadsheet aria-hidden="true" strokeWidth={1.6} />
        <b>calls.csv</b>
        <span className={s.mono}>1,284 rows</span>
      </Reveal>

      <Reveal at={S.file} step={step} className={s.prog}>
        <div className={s.progText}>
          <span data-show={String(step < S.verdicts)}>Checking against the rules</span>
          <span data-show={String(step >= S.verdicts)}>1,284 calls checked</span>
        </div>
        <div className={s.track}>
          <div className={s.fill} data-on={String(step >= S.check)} />
        </div>
      </Reveal>

      <Reveal at={S.verdicts} step={step} className={cx(s.card, s.results)}>
        <div className={s.resultsHead}>
          <span className={s.eyebrow}>Verdicts</span>
          <span className={s.mono}>1,284</span>
        </div>
        <div className={s.stack}>
          <i className={s.seg} />
          <i className={s.seg} />
          <i className={s.seg} />
        </div>
        <div className={s.legend}>
          {VERDICTS.map((verdict) => (
            <div key={verdict.label}>
              <i className={s.dot} style={{ background: verdict.color }} />
              {verdict.label}
              <b>{verdict.count}</b>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal at={S.row} step={step} className={cx(s.card, s.row)}>
        <span className={s.icon}>
          <PhoneCall aria-hidden="true" strokeWidth={1.6} />
        </span>
        <div className={s.rowText}>
          <b>+1 ••• ••• 1907</b>
          <span>Outside service area</span>
        </div>
        <div className={s.slot}>
          <span
            className={cx(s.chip, s.chipNo)}
            data-show={String(step >= S.row && step < S.review)}
          >
            Not billable
          </span>
          <span className={cx(s.chip, s.chipReview)} data-show={String(step === S.review)}>
            <Clock aria-hidden="true" strokeWidth={2} />
            With the buyer
          </span>
          <span className={cx(s.chip, s.chipReceipt)} data-show={String(step >= S.receipt)}>
            <ShieldCheck aria-hidden="true" strokeWidth={2} />
            Receipt signed
          </span>
        </div>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className={s.btn}
          data-pressed={String(step === S.appeal)}
          data-done={String(step >= S.review)}
        >
          <span className={s.before}>Appeal</span>
          <span className={s.after}>
            <Check aria-hidden="true" strokeWidth={2.4} />
            Sent
          </span>
        </button>
      </Reveal>
    </div>
  );
}
