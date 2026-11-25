import { cn } from "./cn";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <section className={cn("rounded-[var(--radius-card)] border border-line bg-card p-6", className)}>
      {children}
    </section>
  );
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn("text-base font-semibold text-ink", className)}>{children}</h2>;
}
