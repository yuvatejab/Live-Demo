import { useEffect, useState } from "react";
import { SCENES, SCENE_MS, STEP, TIMELINE, startOf } from "./story-data";

const reducedQuery = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  return typeof window !== "undefined" && Boolean(window.matchMedia?.(reducedQuery).matches);
}

type Clock = { scene: number; step: number; run: number; from: number };

/**
 * The story clock. Each scene walks the timeline, then the next scene starts.
 * `jump` moves to a beat and keeps playing from there. Reduced motion shows the finished
 * first scene and never starts a timer; a jump then only changes what is shown.
 */
export function useStory() {
  const [reduced] = useState(prefersReducedMotion);
  const [clock, setClock] = useState<Clock>({
    scene: 0,
    step: reduced ? STEP.deliver : STEP.idle,
    run: 0,
    from: 0,
  });

  useEffect(() => {
    if (reduced) return;
    const timers = TIMELINE.filter(([at]) => at > clock.from).map(([at, step]) =>
      setTimeout(() => setClock((value) => ({ ...value, step })), at - clock.from),
    );
    timers.push(
      setTimeout(
        () =>
          setClock((value) => ({
            scene: (value.scene + 1) % SCENES.length,
            step: STEP.idle,
            run: value.run,
            from: 0,
          })),
        SCENE_MS - clock.from,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, [clock.scene, clock.run, clock.from, reduced]);

  useEffect(() => {
    if (reduced) return;
    const resume = () => {
      if (!document.hidden)
        setClock((value) => ({ ...value, step: STEP.idle, run: value.run + 1, from: 0 }));
    };
    document.addEventListener("visibilitychange", resume);
    return () => document.removeEventListener("visibilitychange", resume);
  }, [reduced]);

  const jump = (step: number) =>
    setClock((value) => ({ ...value, step, run: value.run + 1, from: startOf(step) }));

  return { scene: SCENES[clock.scene], sceneIndex: clock.scene, step: clock.step, reduced, jump };
}
