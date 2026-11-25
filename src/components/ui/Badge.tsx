import { cn } from "./cn";

export type Tone = "ok" | "warn" | "crit" | "off";

const tones: Record<Tone, string> = {
  ok: "bg-ok-bg text-ok-fg",
  warn: "bg-warn-bg text-warn-fg",
  crit: "bg-crit-bg text-crit-fg",
  off: "bg-off-bg text-off-fg",
};

const dots: Record<Tone, string> = {
  ok: "bg-ok-fg",
  warn: "bg-warn-fg",
  crit: "bg-crit-fg",
  off: "bg-off-fg",
};

/** Statusmerke: grønn = ok, gul = må gjøres, rød = kritisk, grå = av. */
export function Badge({
  tone = "off",
  dot = true,
  children,
  className,
}: {
  tone?: Tone;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {dot && <span className={cn("size-1.5 rounded-full", dots[tone])} aria-hidden />}
      {children}
    </span>
  );
}
