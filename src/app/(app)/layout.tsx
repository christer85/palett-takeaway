import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPrefs } from "@/lib/i18n/server";
import { ShellProvider } from "@/components/shell/ShellProvider";
import { Sidebar } from "@/components/shell/Sidebar";
import { Dialogs } from "@/components/shell/Dialogs";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/logg-inn");

  const { lang, theme, sidebarCollapsed, locationId } = await getPrefs();
  const phone = (data.claims.phone as string | undefined) ?? "";

  return (
    <ShellProvider
      initialTheme={theme}
      initialLang={lang}
      initialCollapsed={sidebarCollapsed}
      initialLocationId={locationId}
      // Tilgangsnivå hentes fra user_access i fase 2.
      user={{ phone, access: "full" }}
    >
      <div className="flex min-h-dvh bg-shell">
        <Sidebar />
        <div className="min-w-0 flex-1 lg:py-2 lg:pr-2">
          <main className="flex min-h-dvh flex-col bg-surface lg:min-h-[calc(100dvh-16px)] lg:rounded-[28px]">
            {children}
          </main>
        </div>
      </div>
      <Dialogs />
    </ShellProvider>
  );
}
