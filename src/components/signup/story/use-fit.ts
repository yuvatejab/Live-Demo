import { useLayoutEffect, useRef, useState } from "react";
import { fitStory } from "./story-data";

/** Measure a box and return where the fixed canvas should sit inside it. */
export function useFit() {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(() => fitStory(0, 0));
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => setFit(fitStory(element.clientWidth, element.clientHeight));
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { ref, fit };
}
