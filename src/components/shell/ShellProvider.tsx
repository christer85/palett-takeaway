"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { COOKIE, setClientCookie, type Lang, type Theme } from "@/lib/cookies";
import { LOCATIONS, type Location } from "@/lib/locations";

type ShellState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  collapsed: boolean;
  toggleCollapsed: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (o: boolean) => void;
  askOpen: boolean;
  setAskOpen: (o: boolean) => void;
  feedbackOpen: boolean;
  setFeedbackOpen: (o: boolean) => void;
  locations: Location[];
  location: Location;
  setLocation: (id: string) => void;
  user: { phone: string; access: "full" | "leader" | "employee" };
};

const ShellContext = createContext<ShellState | null>(null);

export function ShellProvider({
  initialTheme,
  initialLang,
  initialCollapsed,
  initialLocationId,
  user,
  children,
}: {
  initialTheme: Theme;
  initialLang: Lang;
  initialCollapsed: boolean;
  initialLocationId: string | null;
  user: ShellState["user"];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [locationId, setLocationId] = useState(
    LOCATIONS.find((l) => l.id === initialLocationId)?.id ?? LOCATIONS[0].id,
  );

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.classList.toggle("dark", t === "dark");
    document.documentElement.style.colorScheme = t;
    setClientCookie(COOKIE.theme, t);
  }, []);

  const setLang = useCallback(
    (l: Lang) => {
      setLangState(l);
      setClientCookie(COOKIE.lang, l);
      document.documentElement.lang = l === "nb" ? "nb" : "en";
      router.refresh();
    },
    [router],
  );

  const toggleCollapsed = useCallback(() => {
    setCollapsed((c) => {
      setClientCookie(COOKIE.sidebar, c ? "expanded" : "collapsed");
      return !c;
    });
  }, []);

  const setLocation = useCallback(
    (id: string) => {
      setLocationId(id);
      setClientCookie(COOKIE.location, id);
      router.refresh();
    },
    [router],
  );

  // ⌘J / Ctrl+J åpner «Spør Palett»
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setAskOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const location = LOCATIONS.find((l) => l.id === locationId) ?? LOCATIONS[0];

  return (
    <ShellContext.Provider
      value={{
        theme,
        setTheme,
        lang,
        setLang,
        collapsed,
        toggleCollapsed,
        drawerOpen,
        setDrawerOpen,
        askOpen,
        setAskOpen,
        feedbackOpen,
        setFeedbackOpen,
        locations: LOCATIONS,
        location,
        setLocation,
        user,
      }}
    >
      {children}
    </ShellContext.Provider>
  );
}

export function useShell() {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell må brukes innenfor ShellProvider");
  return ctx;
}
