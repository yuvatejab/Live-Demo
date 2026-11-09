import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight, Check, ShieldCheck, X } from "lucide-react";
import { cx } from "./cx";
import { PartyIcon } from "./party-icon";
import { CARDS, STEP, WAVEFORM, depthOf, type Scene } from "./story-data";
import deck from "./deck.module.css";

type RuleState = "idle" | "checking" | "ok" | "bad";

function ruleState(scene: Scene, index: number, step: number): RuleState {
  if (step >= STEP.checkOne + index) return scene.checks[index].ok ? "ok" : "bad";
  return step >= STEP.rules ? "checking" : "idle";
}

/** One app screen in the deck, with browser chrome above its content. */
function Screen({
  name,
  step,
  tabs,
  className,
  children,
}: {
  name: (typeof CARDS)[number];
  step: number;
  tabs: readonly [string, string];
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-testid={`card-${name}`}
      data-depth={depthOf(CARDS.indexOf(name), step)}
      className={cx(deck.card, className)}
    >
      <div className={deck.chrome} aria-hidden="true">
        <i />
        <i />
        <i />
        <span className={deck.tabOn}>{tabs[0]}</span>
        <span className={deck.tab}>{tabs[1]}</span>
      </div>
      <div className={deck.body}>{children}</div>
    </div>
  );
}

function Head({ title, code }: { title: string; code: string }) {
  return (
    <div className={deck.head}>
      <span className={deck.eyebrow}>{title}</span>
      <span className={deck.code}>{code}</span>
    </div>
  );
}

function ClaimBox({ side, text }: { side: "network" | "buyer"; text: string }) {
  return (
    <div className={deck.claimBox}>
      <div className={deck.who}>
        <span className={deck.icon}>
          <PartyIcon side={side} />
        </span>
        <b>{side === "network" ? "Network says" : "Buyer says"}</b>
      </div>
      <p className={deck.claimText}>{`“${text}”`}</p>
    </div>
  );
}

export function ClaimsCard({ scene, step }: { scene: Scene; step: number }) {
  return (
    <Screen name="claims" step={step} tabs={["disputed-call", scene.callId]}>
      <Head title="Two claims" code={`Call ${scene.callId}`} />
      <div className={deck.claimsGrid}>
        <ClaimBox side="network" text={scene.networkClaim} />
        <ClaimBox side="buyer" text={scene.buyerClaim} />
      </div>
    </Screen>
  );
}

export function EvidenceCard({ scene, step }: { scene: Scene; step: number }) {
  const [before, marked, after] = scene.quote;
  return (
    <Screen
      name="evidence"
      step={step}
      tabs={["recording", scene.duration]}
      className={step >= STEP.evidence ? deck.playing : undefined}
    >
      <Head title="Evidence" code={scene.duration} />
      <div className={deck.wave}>
        {WAVEFORM.map((height, index) => (
          <i
            key={index}
            className={deck.bar}
            style={{ "--h": `${height}%`, "--i": index } as CSSProperties}
          />
        ))}
        <span className={deck.playhead} />
      </div>
      <p className={cx(deck.quote, scene.ok ? deck.hlOk : deck.hlBad)}>
        {before}
        <mark>{marked}</mark>
        {after}
      </p>
      <div className={deck.meta}>
        <span className={deck.tick}>
          <Check aria-hidden="true" strokeWidth={3.2} />
        </span>
        Recording and transcript match
      </div>
    </Screen>
  );
}

export function RulesCard({ scene, step }: { scene: Scene; step: number }) {
  return (
    <Screen name="rules" step={step} tabs={["roofing-v3", "rules"]}>
      <Head title="Signed rules" code="Roofing v3" />
      <div className={deck.rules}>
        {scene.checks.map((check, index) => {
          const state = ruleState(scene, index, step);
          return (
            <div key={check.label} data-testid="rule" data-state={state} className={deck.rule}>
              <span className={deck.box}>
                {state === "bad" ? (
                  <X aria-hidden="true" strokeWidth={3.4} />
                ) : (
                  <Check aria-hidden="true" strokeWidth={3.4} />
                )}
              </span>
              <span>{check.detail ? `${check.label} ${check.detail}` : check.label}</span>
              <em>{check.result}</em>
            </div>
          );
        })}
      </div>
      <div className={deck.foot}>Signed by both parties</div>
    </Screen>
  );
}

export function VerdictCard({ scene, step }: { scene: Scene; step: number }) {
  const met = scene.checks.filter((check) => check.ok).length;
  return (
    <Screen name="verdict" step={step} tabs={["verdict", scene.callId]}>
      <Head title="Verdict" code={`Call ${scene.callId}`} />
      <div className={deck.verdictBody}>
        <p className={cx(deck.verdictWord, scene.ok ? deck.vOk : deck.vBad)}>
          <i />
          {scene.verdict}
        </p>
        <div className={deck.upheld}>{scene.upheld}</div>
        <div className={deck.shared}>Same evidence, same verdict, visible to both.</div>
      </div>
      <div className={deck.meter}>
        {scene.checks.map((check) => (
          <b key={check.label} className={check.ok ? undefined : deck.off} />
        ))}
        <span>{`${met} of 3 rules met`}</span>
      </div>
    </Screen>
  );
}

export function Receipt({ scene, step }: { scene: Scene; step: number }) {
  return (
    <div data-testid="receipt" data-on={String(step >= STEP.receipt)} className={deck.receipt}>
      <div className={deck.receiptRow}>
        <span className={deck.icon}>
          <ShieldCheck aria-hidden="true" />
        </span>
        <div>
          <div className={deck.receiptTitle}>Receipt signed</div>
          <div className={deck.hash}>{scene.receipt}</div>
        </div>
        <span className={deck.verify}>
          Verify yourself
          <ArrowUpRight size={13} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
