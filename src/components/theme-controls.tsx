import { useId, useState, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, THEME_EVENT, type Theme } from "@/lib/theme";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "./ui/dropdown-menu";
const query = "(prefers-color-scheme: dark)";
function snapshot() {
  const override = document.documentElement.dataset.theme;
  const effective = override ?? (window.matchMedia?.(query).matches ? "dark" : "light");
  return `${override ?? "system"}:${effective}`;
}
function subscribe(notify: () => void) {
  const media = window.matchMedia?.(query);
  media?.addEventListener("change", notify);
  window.addEventListener(THEME_EVENT, notify);
  return () => {
    media?.removeEventListener("change", notify);
    window.removeEventListener(THEME_EVENT, notify);
  };
}
export function ThemeControls() {
  const systemDescription = useId();
  const preference = useSyncExternalStore(subscribe, snapshot, () => null);
  const [mode, theme] = preference?.split(":") ?? [];
  const [message, setMessage] = useState("");
  function changeTheme(next: Theme | "system") {
    if (next === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", next);
    window.dispatchEvent(new Event(THEME_EVENT));
    try {
      if (next === "system") localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, next);
      setMessage("");
    } catch {
      setMessage("Theme applies for this visit. Saving preferences is unavailable.");
    }
  }
  const Icon = mode === "system" ? Monitor : theme === "dark" ? Moon : Sun;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Theme"
          render={<Button variant="ghost" size="icon" className="min-h-10 min-w-10" />}
        >
          <Icon aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent aria-label="Theme" align="end" className="w-48">
          <DropdownMenuRadioGroup
            aria-label="Theme preference"
            value={mode ?? "system"}
            onValueChange={(value) => changeTheme(value as Theme | "system")}
          >
            {(["light", "dark", "system"] as const).map((value) => (
              <DropdownMenuRadioItem
                closeOnClick
                key={value}
                value={value}
                aria-describedby={value === "system" ? systemDescription : undefined}
                className="min-h-10"
              >
                {value[0].toUpperCase()}
                {value.slice(1)} theme
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
          <p id={systemDescription} className="text-muted-foreground px-2 py-2 text-xs">
            Currently {theme ?? "light"}
          </p>
        </DropdownMenuContent>
      </DropdownMenu>
      <span role="status" className={message ? "text-muted-foreground text-sm" : "sr-only"}>
        {message}
      </span>
    </div>
  );
}
