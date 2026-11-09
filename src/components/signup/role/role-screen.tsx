import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cx } from "../story/cx";
import { OnboardingStepper } from "../onboarding-stepper";
import { SignupFooter, SignupNav } from "../signup-nav";
import t from "../theme.module.css";
import { RoleCard, type Role } from "./role-card";
import r from "./role.module.css";

const SIDES: readonly Role[] = ["buyer", "network"];

/** Step 2 of onboarding: which side of the call you are on. Design-only: nothing is sent or stored. */
export function RoleScreen() {
  const [role, setRole] = useState<Role | null>(null);
  const headingId = useId();
  return (
    <div className={cx(t.root, t.cream, t.paper)}>
      <SignupNav />
      <OnboardingStepper current={2} />
      <main className={r.page}>
        <div className={r.head}>
          <h1 id={headingId} className={r.headline}>
            How will you use <span className={r.gradient}>GetVerify?</span>
          </h1>
          <p className={r.lede}>
            Choose your side of the call. It sets up your workspace and what you can do in it.
          </p>
        </div>

        <form className={r.form} onSubmit={(event) => event.preventDefault()}>
          <div role="radiogroup" aria-labelledby={headingId} className={r.cards}>
            {SIDES.map((side) => (
              <RoleCard
                key={side}
                role={side}
                selected={role === side}
                otherSelected={role !== null && role !== side}
                onSelect={setRole}
              />
            ))}
          </div>
          <button type="submit" disabled={role === null} className={cx(t.primary, r.cta)}>
            Continue
            <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
          </button>
          <p className={r.next}>
            <span>Next: invite your team.</span>
            <span>Work on both sides? You can add another workspace later.</span>
          </p>
        </form>
      </main>
      <SignupFooter />
    </div>
  );
}
