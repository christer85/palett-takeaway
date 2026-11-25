import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div aria-busy="true">
      <div className="flex items-center gap-3 border-b border-line px-4 py-4 sm:px-6 lg:px-8">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="ml-auto h-9 w-28 rounded-xl" />
      </div>
      <div className="space-y-4 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-[var(--radius-card)] border border-line bg-card p-5">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="mt-3 h-7 w-28" />
            </div>
          ))}
        </div>
        <div className="rounded-[var(--radius-card)] border border-line bg-card p-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-line py-3.5 last:border-0">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
