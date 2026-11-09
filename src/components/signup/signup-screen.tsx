import { ShieldCheck } from "lucide-react";
import { Link } from "@/lib/navigation";
import { cx } from "./story/cx";
import { InputField } from "./signup-fields";
import { OnboardingStepper } from "./onboarding-stepper";
import { SignupFooter, SignupNav } from "./signup-nav";
import { SignupShowcase } from "./signup-showcase";
import { GitHubIcon, GoogleIcon } from "./social-icons";
import t from "./theme.module.css";

/** Design-only signup screen: nothing is submitted, stored or sent. */
export function SignupScreen() {
  return (
    <div className={cx(t.root, t.cream)}>
      <SignupNav />
      <OnboardingStepper current={1} />
      <main className={t.grid}>
        <div className={t.formPanel}>
          <div className={t.formInner}>
            <div className={t.halo}>
              <ShieldCheck aria-hidden="true" />
            </div>
            <h1 className={t.headline}>
              Create your <span className={t.gradientText}>GetVerify account</span>
            </h1>

            <div className={cx(t.stack, "mt-8")}>
              <div className={t.pair}>
                <button type="button" className={t.secondary}>
                  <GoogleIcon />
                  Continue with Google
                </button>
                <button type="button" className={t.secondary}>
                  <GitHubIcon />
                  Continue with GitHub
                </button>
              </div>

              <div className={t.divider}>or continue with email</div>

              <form className={t.stack} onSubmit={(event) => event.preventDefault()}>
                <InputField
                  label="Email Address"
                  placeholder="operator@network.com"
                  type="email"
                  autoComplete="email"
                />
                <button type="submit" className={t.primary}>
                  Continue with Email
                </button>
              </form>

              <p className={t.legal}>
                By creating an account, you agree to our{" "}
                <a href="#" className={t.link}>
                  Terms of Service
                </a>{" "}
                and cryptographic proof specifications.
              </p>
              <p className={t.signin}>
                Already registered on the ledger?
                <Link href="/sign-in" className={t.link}>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        <SignupShowcase />
      </main>
      <SignupFooter />
    </div>
  );
}
