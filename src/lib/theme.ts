export const THEME_STORAGE_KEY = "getverify-theme";
export const THEME_EVENT = "getverify-theme-change";
export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];
