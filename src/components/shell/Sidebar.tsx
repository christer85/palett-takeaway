"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronsUpDown,
  LogOut,
  MessageSquarePlus,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Sparkles,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { NAV, type NavGroup } from "@/lib/nav";
import { useI18n } from "@/lib/i18n/client";
import { t } from "@/lib/i18n";
import { formatPhone } from "@/lib/format";
import { cn } from "@/components/ui/cn";
import { LogoMark } from "@/components/ui/Logo";
import { useShell } from "./ShellProvider";
import { signOut } from "@/app/actions";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

function groupActive(pathname: string, g: NavGroup) {
  if (g.href) return isActive(pathname, g.href);
  return (g.children ?? []).some((c) => isActive(pathname, c.href));
}

export function Sidebar() {
  const { collapsed, drawerOpen, setDrawerOpen } = useShell();
  const pathname = usePathname();

  // Lukk skuffen når siden byttes
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname, setDrawerOpen]);

  return (
    <>
      <aside
        className={cn(
          "sticky top-0 hidden h-dvh shrink-0 flex-col transition-[width] duration-200 lg:flex",
          collapsed ? "w-[76px]" : "w-[268px]",
        )}
      >
        <SidebarContent collapsed={collapsed} />
      </aside>

      {/* Mobil: skuff */}
      <div
        className={cn("fixed inset-0 z-40 lg:hidden", drawerOpen ? "pointer-events-auto" : "pointer-events-none")}
        aria-hidden={!drawerOpen}
      >
        <div
          className={cn("absolute inset-0 bg-black/50 transition-opacity", drawerOpen ? "opacity-100" : "opacity-0")}
          onClick={() => setDrawerOpen(false)}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 flex w-[288px] max-w-[85vw] flex-col bg-shell shadow-2xl transition-transform duration-200",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <SidebarContent collapsed={false} mobile />
        </aside>
      </div>
    </>
  );
}

function SidebarContent({ collapsed, mobile = false }: { collapsed: boolean; mobile?: boolean }) {
  const { dict } = useI18n();
  const { toggleCollapsed, setDrawerOpen } = useShell();
  const pathname = usePathname();
  // Bare grupper brukeren har åpnet/lukket selv lagres; ellers er gruppen for siden du står på foldet ut.
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <div className="flex h-full flex-col gap-3 px-3 py-4 text-shell-text">
      {/* Logo og skjul-knapp */}
      <div className={cn("flex items-center gap-2.5 px-1.5", collapsed && "flex-col")}>
        <LogoMark />
        {!collapsed && <span className="text-[15px] font-semibold tracking-tight">Palett</span>}
        <div className={cn(!collapsed && "ml-auto")}>
          {mobile ? (
            <button
              onClick={() => setDrawerOpen(false)}
              className="rounded-lg p-1.5 text-shell-muted hover:bg-shell-hover hover:text-shell-text"
              aria-label={dict.shell.closeMenu}
            >
              <X className="size-5" />
            </button>
          ) : (
            <button
              onClick={toggleCollapsed}
              className="rounded-lg p-1.5 text-shell-muted hover:bg-shell-hover hover:text-shell-text"
              aria-label={collapsed ? dict.shell.expand : dict.shell.collapse}
              title={collapsed ? dict.shell.expand : dict.shell.collapse}
            >
              {collapsed ? <PanelLeftOpen className="size-[18px]" /> : <PanelLeftClose className="size-[18px]" />}
            </button>
          )}
        </div>
      </div>

      <LocationSwitcher collapsed={collapsed} />

      {/* Meny */}
      <nav className="-mx-1 flex-1 overflow-y-auto px-1 py-1" aria-label="Hovedmeny">
        <ul className="space-y-0.5">
          {NAV.map((g) => {
            const Icon = g.icon;
            const active = groupActive(pathname, g);
            const label = dict.nav[g.key];

            if (g.href) {
              return (
                <li key={g.key}>
                  <Link
                    href={g.href}
                    title={collapsed ? label : undefined}
                    className={cn(
                      "flex h-9 items-center gap-3 rounded-xl px-2.5 text-sm transition-colors",
                      collapsed && "justify-center px-0",
                      active ? "bg-shell-active font-medium text-white" : "text-shell-text/85 hover:bg-shell-hover",
                    )}
                  >
                    <Icon className="size-[18px] shrink-0" strokeWidth={1.75} />
                    {!collapsed && label}
                  </Link>
                </li>
              );
            }

            const isOpen = open[g.key] ?? active;
            return (
              <li key={g.key}>
                <button
                  onClick={() => {
                    if (collapsed) {
                      toggleCollapsed();
                      setOpen((o) => ({ ...o, [g.key]: true }));
                    } else setOpen((o) => ({ ...o, [g.key]: !isOpen }));
                  }}
                  title={collapsed ? label : undefined}
                  aria-expanded={isOpen}
                  className={cn(
                    "flex h-9 w-full items-center gap-3 rounded-xl px-2.5 text-sm transition-colors hover:bg-shell-hover",
                    collapsed && "justify-center px-0",
                    active && collapsed ? "bg-shell-active text-white" : "text-shell-text/85",
                    active && !collapsed && "text-white",
                  )}
                >
                  <Icon className="size-[18px] shrink-0" strokeWidth={1.75} />
                  {!collapsed && (
                    <>
                      <span className={cn("flex-1 text-left", active && "font-medium")}>{label}</span>
                      <ChevronDown
                        className={cn("size-4 text-shell-muted transition-transform", isOpen ? "rotate-0" : "-rotate-90")}
                      />
                    </>
                  )}
                </button>
                {!collapsed && isOpen && (
                  <ul className="mt-0.5 mb-1.5 ml-[21px] space-y-0.5 border-l border-shell-border pl-2.5">
                    {g.children!.map((c) => {
                      const childActive = isActive(pathname, c.href);
                      return (
                        <li key={c.key}>
                          <Link
                            href={c.href}
                            aria-current={childActive ? "page" : undefined}
                            className={cn(
                              "flex h-8 items-center rounded-lg px-2.5 text-[13.5px] transition-colors",
                              childActive
                                ? "bg-shell-active font-medium text-white"
                                : "text-shell-muted hover:bg-shell-hover hover:text-shell-text",
                            )}
                          >
                            {dict.nav[c.key]}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <SidebarFooter collapsed={collapsed} />
    </div>
  );
}

function LocationSwitcher({ collapsed }: { collapsed: boolean }) {
  const { dict } = useI18n();
  const { locations, location, setLocation } = useShell();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={collapsed ? location.name : dict.shell.chooseLocation}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-xl border border-shell-border bg-shell-hover/60 p-1.5 text-left transition-colors hover:bg-shell-hover",
          collapsed && "justify-center border-transparent bg-transparent",
        )}
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#e8a33d] text-xs font-bold text-[#3b2604]">
          {location.short}
        </span>
        {!collapsed && (
          <>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] leading-tight text-shell-muted">{dict.shell.chooseLocation}</span>
              <span className="block truncate text-sm leading-tight font-medium">{location.name}</span>
            </span>
            <ChevronsUpDown className="mr-1 size-4 text-shell-muted" />
          </>
        )}
      </button>

      {open && (
        <div
          className={cn(
            "absolute z-30 mt-1.5 w-60 rounded-2xl border border-line bg-card p-1.5 text-ink shadow-xl",
            collapsed ? "left-full top-0 ml-2 mt-0" : "left-0 right-0 w-auto",
          )}
          role="listbox"
        >
          <p className="px-2.5 pt-1.5 pb-1 text-xs font-medium text-muted">{dict.shell.locations}</p>
          {locations.map((l) => (
            <button
              key={l.id}
              role="option"
              aria-selected={l.id === location.id}
              onClick={() => {
                setLocation(l.id);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm hover:bg-card-muted"
            >
              <span className="flex size-6 items-center justify-center rounded-md bg-[#e8a33d] text-[11px] font-bold text-[#3b2604]">
                {l.short}
              </span>
              <span className="flex-1 text-left">{l.name}</span>
              {l.id === location.id && <Check className="size-4 text-accent" />}
            </button>
          ))}
          <div className="my-1 h-px bg-line" />
          <button
            disabled
            className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-muted"
            title={t(dict.shell.comingInPhase, { n: 2 })}
          >
            <Plus className="size-4" />
            <span className="flex-1 text-left">{dict.shell.addLocation}</span>
            <span className="text-[11px]">{t(dict.shell.comingInPhase, { n: 2 })}</span>
          </button>
        </div>
      )}
    </div>
  );
}

function SidebarFooter({ collapsed }: { collapsed: boolean }) {
  const { dict } = useI18n();
  const { setAskOpen, setFeedbackOpen, user, theme, setTheme, lang, setLang } = useShell();
  const itemClass = cn(
    "flex h-9 w-full items-center gap-3 rounded-xl px-2.5 text-sm text-shell-text/85 transition-colors hover:bg-shell-hover",
    collapsed && "justify-center px-0",
  );

  return (
    <div className="space-y-0.5 border-t border-shell-border pt-3">
      <button onClick={() => setAskOpen(true)} className={itemClass} title={collapsed ? `${dict.shell.askPalett} (⌘J)` : undefined}>
        <Sparkles className="size-[18px] shrink-0 text-[#e8c36a]" strokeWidth={1.75} />
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{dict.shell.askPalett}</span>
            <kbd className="rounded-md border border-shell-border px-1.5 py-0.5 font-sans text-[11px] text-shell-muted">⌘J</kbd>
          </>
        )}
      </button>
      <button onClick={() => setFeedbackOpen(true)} className={itemClass} title={collapsed ? dict.shell.feedback : undefined}>
        <MessageSquarePlus className="size-[18px] shrink-0" strokeWidth={1.75} />
        {!collapsed && <span className="flex-1 text-left">{dict.shell.feedback}</span>}
      </button>

      {/* Brukerkort */}
      <div
        className={cn(
          "mt-2 flex items-center gap-2.5 rounded-xl bg-shell-hover/60 p-2",
          collapsed && "flex-col bg-transparent p-0",
        )}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-shell-active text-shell-text">
          <UserRound className="size-4" />
        </span>
        {!collapsed && (
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm leading-tight font-medium tabular">{formatPhone(user.phone) || "—"}</span>
            <span className="block text-[11px] leading-tight text-shell-muted">{dict.shell.access[user.access]}</span>
          </span>
        )}
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-lg p-1.5 text-shell-muted hover:bg-shell-active hover:text-shell-text"
            title={dict.shell.signOut}
            aria-label={dict.shell.signOut}
          >
            <LogOut className="size-4" />
          </button>
        </form>
      </div>

      {/* Lys/mørk og språk */}
      <div className={cn("flex items-center gap-2 pt-2", collapsed && "flex-col")}>
        <div className="flex rounded-xl bg-shell-hover/60 p-0.5" role="group" aria-label={theme === "dark" ? dict.shell.darkMode : dict.shell.lightMode}>
          {(["light", "dark"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setTheme(m)}
              aria-pressed={theme === m}
              title={m === "light" ? dict.shell.lightMode : dict.shell.darkMode}
              className={cn(
                "flex size-7 items-center justify-center rounded-[10px] transition-colors",
                theme === m ? "bg-shell-active text-white" : "text-shell-muted hover:text-shell-text",
              )}
            >
              {m === "light" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          ))}
        </div>
        <div className={cn("flex rounded-xl bg-shell-hover/60 p-0.5", !collapsed && "ml-auto")} role="group" aria-label={dict.shell.language}>
          {(["nb", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={cn(
                "h-7 rounded-[10px] px-2 text-xs font-semibold transition-colors",
                lang === l ? "bg-shell-active text-white" : "text-shell-muted hover:text-shell-text",
              )}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
