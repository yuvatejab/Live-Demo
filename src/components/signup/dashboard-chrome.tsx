import {
  Bell,
  ChevronsUpDown,
  FileSignature,
  LayoutDashboard,
  Phone,
  Scale,
  Search,
  Upload,
  type LucideIcon,
} from "lucide-react";

const nav: readonly { label: string; icon: LucideIcon; count?: string }[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Calls", icon: Phone, count: "128" },
  { label: "Appeals", icon: Scale, count: "2" },
  { label: "Contracts", icon: FileSignature },
  { label: "Uploads", icon: Upload },
];

export function Sidebar() {
  return (
    <aside className="flex w-[188px] shrink-0 flex-col border-r border-[#e3e8ea] bg-[#f0f5fe] p-3">
      <div className="flex items-center gap-2 px-1.5 pt-1">
        <div className="flex size-6 items-center justify-center rounded-md bg-[#272c30] text-[11px] font-semibold text-white">
          G
        </div>
        <span className="text-[13px] font-semibold tracking-tight text-[#272c30]">GetVerify</span>
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-md border border-[#e3e8ea] bg-white px-2 py-1.5">
        <div className="flex size-5 items-center justify-center rounded bg-[#e3e8ea] text-[9px] font-semibold text-[#526068]">
          HL
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-[11px] font-medium text-[#272c30]">Harbor Leads</div>
          <div className="text-[9.5px] text-[#60737a]">Network</div>
        </div>
        <ChevronsUpDown className="size-3 text-[#60737a]" />
      </div>
      <nav className="mt-4 space-y-0.5">
        {nav.map(({ label, icon: Icon, count }, index) => (
          <div
            key={label}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] ${
              index === 0
                ? "bg-white font-medium text-[#272c30] ring-1 ring-[#e3e8ea]"
                : "text-[#526068]"
            }`}
          >
            <Icon className="size-3.5" />
            <span className="flex-1">{label}</span>
            {count && <span className="text-[10px] text-[#60737a] tabular-nums">{count}</span>}
          </div>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-2 px-1.5">
        <div className="flex size-6 items-center justify-center rounded-full bg-[#272c30] text-[9px] font-medium text-white">
          AK
        </div>
        <div className="leading-tight">
          <div className="text-[11px] font-medium text-[#272c30]">Ada K.</div>
          <div className="text-[9.5px] text-[#60737a]">Admin</div>
        </div>
      </div>
    </aside>
  );
}

export function TopBar() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-[17px] font-semibold tracking-tight text-[#272c30]">Overview</h2>
        <p className="mt-0.5 text-[11.5px] text-[#526068]">
          Every call checked against the agreement you both signed.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-44 items-center gap-2 rounded-md border border-[#e3e8ea] bg-white px-2.5 text-[11px] text-[#60737a]">
          <Search className="size-3" />
          <span className="flex-1">Search calls</span>
          <kbd className="rounded border border-[#e3e8ea] px-1 text-[9px] text-[#60737a]">⌘K</kbd>
        </div>
        <div className="flex size-7 items-center justify-center rounded-md border border-[#e3e8ea] bg-white text-[#526068]">
          <Bell className="size-3.5" />
        </div>
      </div>
    </div>
  );
}
