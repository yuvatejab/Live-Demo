import type { CSSProperties } from "react";
import { Check, Handshake, UserRound, UsersRound, type LucideIcon } from "lucide-react";
import { cx } from "./story/cx";
import s from "./stepper.module.css";

const STEPS: readonly { title: string; Icon: LucideIcon }[] = [
  { title: "Create account", Icon: UserRound },
  { title: "Choose your role", Icon: Handshake },
  { title: "Invite your team", Icon: UsersRound },
];

type State = "done" | "active" | "upcoming";
const spoken: Record<State, string> = {
  done: "completed",
  active: "current step",
  upcoming: "upcoming",
};

/**
 * Progress through the onboarding flow. At rest it shows only the dots and "Step n";
 * on hover or keyboard focus (always on touch) each step names itself in two or three words.
 */
export function OnboardingStepper({ current = 1 }: { current?: 1 | 2 | 3 }) {
  return (
    <div className={s.wrap}>
      <nav aria-label="Onboarding progress" tabIndex={0} className={s.stepper}>
        <ol className={s.list}>
          {STEPS.map(({ title, Icon }, index) => {
            const n = index + 1;
            const state: State = n < current ? "done" : n === current ? "active" : "upcoming";
            const link = n < current ? "done" : n === current ? "next" : "idle";
            return (
              <li
                key={title}
                data-state={state}
                data-link={link}
                aria-current={state === "active" ? "step" : undefined}
                aria-label={`Step ${n} of ${STEPS.length}: ${title}, ${spoken[state]}`}
                className={cx(s.step, n === STEPS.length && s.last)}
                style={{ "--i": index } as CSSProperties}
              >
                <span className={s.node}>
                  {state === "done" ? (
                    <Check aria-hidden="true" strokeWidth={2.2} />
                  ) : (
                    <Icon aria-hidden="true" strokeWidth={1.5} />
                  )}
                </span>
                <span className={s.eyebrow}>Step {n}</span>
                <span className={s.title}>{title}</span>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
