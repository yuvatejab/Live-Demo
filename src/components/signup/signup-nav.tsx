import { Check, ShieldCheck, User } from "lucide-react";
import { verifierDocs } from "@/components/landing/links";
import { ThemeControls } from "@/components/theme-controls";
import { Link } from "@/lib/navigation";
import { cx } from "./story/cx";
import t from "./theme.module.css";

export function SignupNav() {
  return (
    <header className={t.nav}>
      <div className={t.brandRow}>
        <Link href="/" className={t.brand} aria-label="GetVerify home">
          <span className={t.logo}>
            <Check size={15} strokeWidth={2.6} aria-hidden="true" />
          </span>
          <span className={t.brandName}>GetVerify</span>
        </Link>
        <span className={t.badge}>
          <ShieldCheck aria-hidden="true" />
          Neutral Outcome Verifier
        </span>
      </div>
      <nav aria-label="Account" className={t.navLinks}>
        <a href={verifierDocs} target="_blank" rel="noopener noreferrer" className={cx(t.ghost)}>
          Documentation
        </a>
        <Link href="/sign-in" className={cx(t.ghost, t.ghostShow)}>
          Sign In
        </Link>
        <Link href="/sign-up" aria-current="page" className={t.outline}>
          Register
        </Link>
        <ThemeControls />
        <span aria-hidden="true" className={t.avatarDot}>
          <User size={15} />
        </span>
      </nav>
    </header>
  );
}

export function SignupFooter() {
  return (
    <footer className={t.footer}>
      <p className={t.footerNote}>
        © {new Date().getFullYear()} GetVerify Network • Immutable Ledger Verification
      </p>
      <nav aria-label="Legal" className={t.footerLinks}>
        <a href="#">Terms of Service</a>
        <a href="#">Cryptographic Standards</a>
        <a href="#">Network Status</a>
      </nav>
    </footer>
  );
}
