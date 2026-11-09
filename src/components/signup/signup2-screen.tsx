import type { ComponentType, SVGAttributes } from "react";
import { UserIcon } from "lucide-react";
import { Link } from "@/lib/navigation";
import { cx } from "./story/cx";
import { InputField } from "./signup-fields";
import { OnboardingStepper } from "./onboarding-stepper";
import { SignupFooter, SignupNav } from "./signup-nav";
import { AppleIcon, GitHubIcon, GoogleIcon } from "./social-icons";
import { StoryStage } from "./story/story-stage";
import t from "./theme.module.css";

type SocialProvider = {
  label: string;
  icon: ComponentType<SVGAttributes<SVGElement>>;
};

const providers: SocialProvider[] = [
  { label: "Google", icon: GoogleIcon },
  { label: "Apple", icon: AppleIcon },
  { label: "GitHub", icon: GitHubIcon },
];

/** Design-only signup screen, split layout: nothing is submitted, stored or sent. */
export function Signup2Screen() {
  return (
    <div className={cx(t.root, t.cream, t.paper)}>
      <SignupNav />
      <OnboardingStepper current={1} />
      <main aria-label="Sign up" className={t.grid}>
        <section className={t.formCol}>
          <div className={cx(t.formNarrow, t.center)}>
            <div className={cx(t.halo, t.centerHalo)}>
              <UserIcon aria-hidden="true" />
            </div>
            <div>
              <h1 className={t.headline}>
                Create your <span className={t.gradientText}>GetVerify account</span>
              </h1>
              <p className={t.lede}>Enter your email to sign up.</p>
            </div>
          </div>

          <div className={t.formNarrow}>
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

            <div className={t.divider}>or continue with</div>

            <div className={t.stack}>
              {providers.map(({ icon: Icon, label }) => (
                <button key={label} type="button" className={t.secondary}>
                  <Icon aria-hidden="true" />
                  Continue with {label}
                </button>
              ))}
            </div>

            <p className={t.signin}>
              Already registered on the ledger?
              <Link href="/sign-in" className={t.link}>
                Sign In
              </Link>
            </p>
          </div>
        </section>

        <div className="relative min-h-[680px] overflow-hidden rounded-[18px] shadow-[rgba(70,55,35,0.08)_0_0_0_1px,rgba(70,55,35,0.05)_0_1px_3px_0] max-lg:hidden">
          <StoryStage />
        </div>
      </main>
      <SignupFooter />
    </div>
  );
}
