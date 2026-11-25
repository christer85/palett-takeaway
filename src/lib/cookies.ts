export const COOKIE = {
  theme: "palett_theme",
  lang: "palett_lang",
  location: "palett_location",
  sidebar: "palett_sidebar",
} as const;

export type Theme = "light" | "dark";
export type Lang = "nb" | "en";

export function setClientCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax`;
}
