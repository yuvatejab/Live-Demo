import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/** Draws fixed-size art at its design size and scales it to the width of its box. */
export function ScaledCanvas({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const element = frame.current;
    if (!element) return;
    const measure = () => {
      if (element.clientWidth > 0) setScale(element.clientWidth / width);
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [width]);
  return (
    <div
      ref={frame}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${width} / ${height}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
    </div>
  );
}
