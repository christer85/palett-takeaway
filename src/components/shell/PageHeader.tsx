"use client";

import { Menu } from "lucide-react";
import { Fragment } from "react";
import { useShell } from "./ShellProvider";
import { useI18n } from "@/lib/i18n/client";
import { LogoMark } from "@/components/ui/Logo";

/** Toppfelt: brødsmulesti («Salg / Ordrer»), valgfritt statusmerke og sidens egne handlinger. */
export function PageHeader({
  crumbs,
  status,
  actions,
}: {
  crumbs: string[];
  status?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const { setDrawerOpen } = useShell();
  const { dict } = useI18n();

  return (
    <header className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line px-4 py-3.5 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={() => setDrawerOpen(true)}
          className="-ml-1 rounded-lg p-1.5 text-muted hover:bg-card-muted hover:text-ink lg:hidden"
          aria-label={dict.shell.openMenu}
        >
          <Menu className="size-5" />
        </button>
        <LogoMark className="size-6 lg:hidden" />
        <nav aria-label="Brødsmulesti" className="min-w-0">
          <ol className="flex items-center gap-1.5 truncate text-[15px]">
            {crumbs.map((c, i) => (
              <Fragment key={i}>
                {i > 0 && <li className="text-muted/60" aria-hidden>/</li>}
                <li className={i === crumbs.length - 1 ? "font-semibold text-ink" : "text-muted"}>{c}</li>
              </Fragment>
            ))}
          </ol>
        </nav>
        {status}
      </div>
      {actions && <div className="ml-auto flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}
