import { motion } from "motion/react";
import { DashboardMockup } from "./dashboard-mockup";
import { FlutedBackdrop } from "./fluted-backdrop";
import s from "./showcase.module.css";

const reveal = { once: true, margin: "-8%" } as const;

/** The right panel: a quote on the fluted-glass backdrop, over a browser-framed product screen. */
export function SignupShowcase() {
  return (
    <aside data-testid="showcase" className={s.panel}>
      <FlutedBackdrop />
      <motion.figure
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={reveal}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={s.copy}
      >
        <figcaption className={s.byline}>Charlotte · Design Engineer</figcaption>
        <blockquote className={s.quote}>
          “Every block had the restraint and polish we usually{" "}
          <span className={s.gradient}>spend weeks refining.</span>”
        </blockquote>
      </motion.figure>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={reveal}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={s.frame}
      >
        <div className={s.chrome} aria-hidden="true">
          <i />
          <i />
          <i />
          <span className={s.tabOn}>dashboard</span>
          <span className={s.tab}>calls</span>
          <span className={s.tab}>receipts</span>
        </div>
        <DashboardMockup />
      </motion.div>
    </aside>
  );
}
