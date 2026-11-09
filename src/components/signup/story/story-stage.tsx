import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { FlutedBackdrop } from "../fluted-backdrop";
import { cx } from "./cx";
import { CAPTIONS, CHAPTERS, STEP, STORY_LABEL, phaseOf } from "./story-data";
import { ClaimsCard, EvidenceCard, Receipt, RulesCard, VerdictCard } from "./story-cards";
import { Parties } from "./story-parties";
import { useFit } from "./use-fit";
import { useStory } from "./use-story";
import deck from "./deck.module.css";
import styles from "./story.module.css";

const SPRING = { stiffness: 110, damping: 19, mass: 0.7 };
const clamp = (value: number) => Math.max(-1, Math.min(1, value));

/** The signup story: two claims, one neutral referee, one shared decision. */
export function StoryStage() {
  const { scene, step, reduced, jump } = useStory();
  const { ref, fit } = useFit();
  const deckRef = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);
  const rotateY = useTransform(x, [-1, 1], [-31, -13]);
  const rotateX = useTransform(y, [-1, 1], [16, 4]);
  const phase = phaseOf(step);

  function aim(nx: number, ny: number) {
    x.set(nx);
    y.set(ny);
    deckRef.current?.style.setProperty("--gx", `${Math.round((nx + 1) * 500) / 10}%`);
    deckRef.current?.style.setProperty("--gy", `${Math.round((ny + 1) * 500) / 10}%`);
  }
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    if (reduced || !(box.width > 0 && box.height > 0)) return;
    aim(
      clamp(((event.clientX - box.left) / box.width) * 2 - 1),
      clamp(((event.clientY - box.top) / box.height) * 2 - 1),
    );
  }

  return (
    <div
      ref={ref}
      className={styles.frame}
      onPointerMove={onPointerMove}
      onPointerLeave={() => !reduced && aim(0, 0)}
    >
      <FlutedBackdrop />
      <div
        data-testid="story"
        data-step={step}
        data-scene={scene.id}
        className={cx(
          styles.story,
          step >= STEP.out && styles.out,
          step === STEP.idle && styles.reset,
        )}
        style={{ left: fit.left, top: fit.top, transform: `scale(${fit.scale})` }}
      >
        <div role="img" aria-label={STORY_LABEL} className={styles.picture}>
          <div className={styles.world}>
            <div className={cx(styles.floor, step >= STEP.intro && styles.floorOn)} />
            <motion.div
              ref={deckRef}
              data-testid="deck"
              className={deck.deck}
              style={{ rotateX, rotateY }}
            >
              <VerdictCard scene={scene} step={step} />
              <RulesCard scene={scene} step={step} />
              <EvidenceCard scene={scene} step={step} />
              <ClaimsCard scene={scene} step={step} />
              <Receipt scene={scene} step={step} />
            </motion.div>
          </div>
          <Parties step={step} />
        </div>
        <div className={styles.caption}>
          {CAPTIONS.map((caption, index) => (
            <div key={caption.title} data-caption data-active={phase === index}>
              <strong>{caption.title}</strong>
              <span>{caption.body}</span>
            </div>
          ))}
        </div>
        <div className={styles.chapters}>
          {CHAPTERS.map((chapter, index) => (
            <button
              key={chapter.label}
              type="button"
              aria-pressed={phase === index}
              onClick={() => jump(chapter.step)}
            >
              {chapter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
