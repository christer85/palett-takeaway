import { cookies } from "next/headers";
import { COOKIE, type Lang, type Theme } from "@/lib/cookies";
import { dictionaries } from ".";

export async function getPrefs() {
  const store = await cookies();
  const lang: Lang = store.get(COOKIE.lang)?.value === "en" ? "en" : "nb";
  const theme: Theme = store.get(COOKIE.theme)?.value === "dark" ? "dark" : "light";
  const sidebarCollapsed = store.get(COOKIE.sidebar)?.value === "collapsed";
  const locationId = store.get(COOKIE.location)?.value ?? null;
  return { lang, theme, sidebarCollapsed, locationId, dict: dictionaries[lang] };
}
