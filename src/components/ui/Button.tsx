import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-text hover:bg-accent-hover",
  secondary: "border border-line bg-card text-ink hover:bg-card-muted",
  ghost: "text-ink hover:bg-card-muted",
};

export function buttonClass(variant: Variant = "secondary", className?: string) {
  return cn(
    "inline-flex h-9 items-center justify-center gap-2 rounded-xl px-3.5 text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className,
  );
}

export function Button({
  variant = "secondary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={buttonClass(variant, className)} {...props} />;
}
