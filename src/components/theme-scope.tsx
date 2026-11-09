import { createContext, useContext, type ReactNode } from "react";
const ThemeContext = createContext<"light" | "dark" | undefined>(undefined);
export const useThemeScope = () => useContext(ThemeContext);
/** Gallery scopes also carry their theme to portal content. */
export function ThemeScope({ theme, children }: { theme: "light" | "dark"; children: ReactNode }) {
  return (
    <ThemeContext value={theme}>
      <section
        data-theme={theme}
        className="bg-background text-foreground min-w-0 rounded-lg border p-4 md:p-6"
      >
        {children}
      </section>
    </ThemeContext>
  );
}
