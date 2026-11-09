import { useEffect, useRef, useState } from "react";
import type { Loop } from "./loops";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
  );
}

/**
 * Walks a loop's steps with timers, then starts again. It does nothing while `enabled` is false
 * (off screen), and under reduced motion it shows the finished frame and never starts a timer.
 */
export function useLoop(loop: Loop, enabled: boolean) {
  const [reduced] = useState(prefersReducedMotion);
  const [state, setState] = useState({ step: reduced ? loop.last : 0, cycle: 0 });

  useEffect(() => {
    if (reduced || !enabled) return;
    const beats: (readonly [number, number])[] = [[0, 0], ...loop.timeline];
    const timers = beats.map(([at, step]) =>
      setTimeout(() => setState((value) => ({ ...value, step })), at),
    );
    timers.push(
      setTimeout(() => setState((value) => ({ step: 0, cycle: value.cycle + 1 })), loop.total),
    );
    return () => timers.forEach(clearTimeout);
  }, [state.cycle, enabled, reduced, loop]);

  return state.step;
}

/** True while the element is on screen. Without IntersectionObserver it counts as visible. */
export function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(true);
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setSeen(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, seen] as const;
}
