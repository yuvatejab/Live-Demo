import { useLayoutEffect, useRef, useState } from "react";
import { Sidebar, TopBar } from "./dashboard-chrome";
import { DESIGN_HEIGHT, DESIGN_WIDTH, fitScale } from "./dashboard-data";
import { ContractCard, KpiRow, RecentCalls, VerdictChart } from "./dashboard-parts";

/** A light, fixed-size product canvas that scales to whatever frame holds it. */
export function DashboardMockup() {
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const element = frame.current;
    if (!element) return;
    const measure = () => setScale(fitScale(element.clientWidth, DESIGN_WIDTH));
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={frame}
      role="img"
      aria-label="GetVerify dashboard preview"
      className="relative w-full overflow-hidden bg-white"
      style={{ height: DESIGN_HEIGHT * scale }}
    >
      <div
        className="absolute top-0 left-0 flex origin-top-left bg-white text-[#272c30] antialiased select-none"
        style={{ width: DESIGN_WIDTH, height: DESIGN_HEIGHT, transform: `scale(${scale})` }}
      >
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col gap-4 bg-white px-6 py-5">
          <TopBar />
          <KpiRow />
          <div className="flex gap-3">
            <ContractCard />
            <VerdictChart />
          </div>
          <RecentCalls />
        </div>
      </div>
    </div>
  );
}
