// Norske formater. Beløp lagres i øre (heltall). Tidssone: Europe/Oslo.
export const TZ = "Europe/Oslo";


/** 14900 → «149 kr», 14950 → «149,50 kr» */
export function formatKr(ore: number): string {
  const kr = ore / 100;
  const text = Number.isInteger(kr)
    ? new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(kr)
    : new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(kr);
  return `${text} kr`;
}

/** «onsdag 25. november» */
export function formatDayLong(date: Date, locale: "nb" | "en" = "nb"): string {
  return new Intl.DateTimeFormat(locale === "nb" ? "nb-NO" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TZ,
  }).format(date);
}

/** «22:00» */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("nb-NO", { hour: "2-digit", minute: "2-digit", timeZone: TZ }).format(date);
}

/** Dato-delene slik de er i Oslo (uavhengig av serverens tidssone). */
export function osloParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    weekday: get("weekday"), // Mon, Tue …
  };
}

/** ISO-ukenummer (norsk ukenummerering), beregnet på Oslo-dato. */
export function isoWeek(date: Date): number {
  const { year, month, day } = osloParts(date);
  const d = new Date(Date.UTC(year, month - 1, day));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/** «+47 999 99 999» */
export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("47") && digits.length === 10) {
    const n = digits.slice(2);
    return `+47 ${n.slice(0, 3)} ${n.slice(3, 5)} ${n.slice(5)}`;
  }
  return `+${digits}`;
}
