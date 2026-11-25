import Link from "next/link";
import { SearchX } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <EmptyState
        icon={SearchX}
        title="Fant ikke siden"
        text="Siden finnes ikke, eller du har ikke tilgang til den."
        action={<Link href="/" className={buttonClass("primary")}>Til Hjem</Link>}
      />
    </div>
  );
}
