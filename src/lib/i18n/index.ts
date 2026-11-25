import { nb, type Dict } from "./nb";
import { en } from "./en";
import type { Lang } from "@/lib/cookies";

export const dictionaries: Record<Lang, Dict> = { nb, en };
export type { Dict };

export function t(template: string, vars: Record<string, string | number> = {}) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
