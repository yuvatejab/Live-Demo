import { Check } from "lucide-react";
import { cx } from "./cx";
import { PartyIcon } from "./party-icon";
import { PARTIES, STEP } from "./story-data";
import styles from "./story.module.css";

function Party({ side, step }: { side: "network" | "buyer"; step: number }) {
  const { tag, name } = PARTIES[side];
  const done = step >= STEP.deliver;
  return (
    <div
      data-testid="party"
      data-done={String(done)}
      className={cx(
        styles.party,
        side === "network" ? styles.partyN : styles.partyB,
        step >= STEP.intro && styles.partyOn,
        done && styles.partyDone,
      )}
    >
      <span className={styles.icon}>
        <PartyIcon side={side} />
      </span>
      <span className={styles.partyText}>
        <span className={styles.partyName}>{name}</span>
        <span className={styles.partyStatus}>
          <span className={styles.wait}>{step >= STEP.claims ? "Claim submitted" : "Online"}</span>
          <span className={styles.got}>
            <Check size={10} strokeWidth={3} aria-hidden="true" />
            Received, same evidence
          </span>
        </span>
      </span>
      <span className={styles.tag}>{tag}</span>
    </div>
  );
}

export function Parties({ step }: { step: number }) {
  return (
    <>
      <svg
        className={cx(styles.lines, step >= STEP.deliver && styles.linesOn)}
        viewBox="0 0 640 720"
        aria-hidden="true"
      >
        <path pathLength={1} d="M320 506 C320 540 166 530 166 552" />
        <path pathLength={1} d="M320 506 C320 540 474 530 474 552" />
      </svg>
      <div className={styles.parties}>
        <Party side="network" step={step} />
        <Party side="buyer" step={step} />
      </div>
    </>
  );
}
