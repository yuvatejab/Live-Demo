import { ArrowDownRight, ArrowUpRight, Check, Clock, ShieldCheck, X } from "lucide-react";
import type { ComponentType } from "react";
import {
  chartDays,
  kpis,
  recentCalls,
  verdictLabel,
  type Tone,
  type Verdict,
} from "./dashboard-data";

const text: Record<Tone, string> = {
  neutral: "text-[#272c30]",
  billable: "text-[#3161df]",
  notBillable: "text-[#60737a]",
  pending: "text-[#a6b4ba]",
};
const badge: Record<Verdict, string> = {
  billable: "bg-[#89ecb0]/45 text-[#272c30] ring-[#89ecb0]",
  notBillable: "bg-[#e3e8ea] text-[#526068] ring-[#a6b4ba]/50",
  pending: "bg-white text-[#526068] ring-[#a6b4ba]",
};
const verdictIcon: Record<Verdict, ComponentType<{ className?: string }>> = {
  billable: Check,
  notBillable: X,
  pending: Clock,
};
const card = "rounded-md border border-[#e3e8ea] bg-white ";

function Sparkline({ values, tone }: { values: readonly number[]; tone: Tone }) {
  const lo = Math.min(...values);
  const span = Math.max(...values) - lo || 1;
  const points = values.map((v, i) => [
    (i / (values.length - 1)) * 80,
    22 - ((v - lo) / span) * 18,
  ]);
  const line = points
    .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  return (
    <svg viewBox="0 0 80 24" className={`h-6 w-20 ${text[tone]}`} fill="none" aria-hidden="true">
      <path d={`${line} L80 24 L0 24 Z`} fill="currentColor" opacity="0.07" />
      <path d={line} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function KpiRow() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {kpis.map((kpi) => {
        const Arrow = kpi.up ? ArrowUpRight : ArrowDownRight;
        return (
          <div key={kpi.label} className={`${card} p-3.5`}>
            <div className="text-[11px] font-medium text-[#526068]">{kpi.label}</div>
            <div className="mt-1.5 flex items-end justify-between">
              <div>
                <div className="text-[22px] leading-none font-semibold tracking-tight text-[#272c30] tabular-nums">
                  {kpi.value}
                </div>
                <div className="mt-2 flex items-center gap-0.5 text-[10.5px] font-medium text-[#526068]">
                  <Arrow className="size-3" />
                  {kpi.delta}
                  <span className="ml-1 font-normal text-[#60737a]">vs prior</span>
                </div>
              </div>
              <Sparkline values={kpi.trend} tone={kpi.tone} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const legend: readonly [Verdict, string][] = [
  ["billable", "bg-[#3161df]"],
  ["notBillable", "bg-[#a6b4ba]"],
  ["pending", "bg-[#e3e8ea]"],
];

export function VerdictChart() {
  const max = Math.max(...chartDays.map((day) => day[0] + day[1] + day[2]));
  const scale = 104 / max;
  return (
    <div className={`${card} flex flex-1 flex-col p-4`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[13px] font-semibold text-[#272c30]">Verdicts</div>
          <div className="mt-0.5 text-[11px] text-[#526068]">
            Last 14 days, every call decided once
          </div>
        </div>
        <div className="flex gap-3 text-[10.5px] text-[#526068]">
          {legend.map(([verdict, dot]) => (
            <span key={verdict} className="flex items-center gap-1.5">
              <span className={`size-1.5 rounded-full ${dot}`} />
              {verdictLabel[verdict]}
            </span>
          ))}
        </div>
      </div>
      <div className="relative mt-4 flex h-[112px] items-end gap-[7px]">
        {[0, 1, 2].map((line) => (
          <div
            key={line}
            className="absolute inset-x-0 border-t border-dashed border-[#e3e8ea]"
            style={{ bottom: `${line * 52}px` }}
          />
        ))}
        {chartDays.map(([b, n, p], index) => (
          <div key={index} className="relative flex flex-1 flex-col-reverse gap-px">
            <div className="rounded-b-[3px] bg-[#3161df]" style={{ height: b * scale }} />
            <div className="bg-[#a6b4ba]" style={{ height: n * scale }} />
            <div className="rounded-t-[3px] bg-[#e3e8ea]" style={{ height: p * scale }} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-[#60737a]">
        <span>Oct 22</span>
        <span>Oct 29</span>
        <span>Nov 4</span>
      </div>
    </div>
  );
}

const rules: readonly [string, string][] = [
  ["Billable after", "90 seconds"],
  ["Duplicate window", "45 days"],
  ["Appeal window", "72 hours"],
];

export function ContractCard() {
  return (
    <div className={`${card} flex w-[236px] shrink-0 flex-col p-4`}>
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-semibold text-[#272c30]">Agreement</div>
        <span className="flex items-center gap-1 rounded-full bg-[#272c30] px-2 py-0.5 text-[10px] font-medium text-white">
          <Check className="size-2.5" /> Signed v3
        </span>
      </div>
      <div className="mt-0.5 text-[11px] text-[#526068]">Roofing · both parties signed</div>
      <dl className="mt-3.5 space-y-2.5">
        {rules.map(([term, value]) => (
          <div
            key={term}
            className="flex justify-between border-b border-[#e3e8ea] pb-2 text-[11px]"
          >
            <dt className="text-[#526068]">{term}</dt>
            <dd className="font-medium text-[#272c30] tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-auto rounded-md bg-[#f0f5fe] p-2.5 ring-1 ring-[#e3e8ea]">
        <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-[#526068]">
          <ShieldCheck className="size-3.5 text-[#3161df]" />
          Verify yourself
        </div>
        <div className="mt-1.5 truncate font-mono text-[10px] text-[#526068]">
          getverify receipt r_8f3a…c21 --keys
        </div>
      </div>
    </div>
  );
}

export function RecentCalls() {
  return (
    <div className={`${card} overflow-hidden`}>
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5">
        <div className="text-[13px] font-semibold text-[#272c30]">Recent calls</div>
        <div className="text-[11px] font-medium text-[#526068]">View all</div>
      </div>
      <div className="border-t border-[#e3e8ea]">
        {recentCalls.map((call) => {
          const Icon = verdictIcon[call.verdict];
          return (
            <div
              key={call.caller}
              className="grid grid-cols-[122px_104px_104px_1fr_36px] items-center gap-3 border-b border-[#e3e8ea] px-4 py-2.5 text-[11px] last:border-b-0"
            >
              <span className="font-mono text-[#526068]">{call.caller}</span>
              <span className="truncate text-[#526068]">{call.publisher}</span>
              <span
                className={`flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-medium ring-1 ring-inset ${badge[call.verdict]}`}
              >
                <Icon className="size-2.5" />
                {verdictLabel[call.verdict]}
              </span>
              <span className="truncate text-[#526068]">{call.quote}</span>
              <span className="text-right text-[#60737a] tabular-nums">{call.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
