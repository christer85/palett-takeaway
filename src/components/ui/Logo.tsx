import { cn } from "./cn";

/** Palett-merket: en avrundet flate med tre «fargeklatter». */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden>
      <rect width="32" height="32" rx="9" fill="#d7ecc4" />
      <circle cx="11" cy="12" r="3.4" fill="#1d6b4f" />
      <circle cx="20.5" cy="10.5" r="2.8" fill="#e8a33d" />
      <circle cx="21.5" cy="20" r="3.2" fill="#d9573b" />
      <circle cx="12.5" cy="21.5" r="2.4" fill="#7a9e3a" />
    </svg>
  );
}
