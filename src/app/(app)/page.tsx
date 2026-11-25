import { Store, ListChecks } from "lucide-react";
import { getPrefs } from "@/lib/i18n/server";
import { t } from "@/lib/i18n";
import { formatDayLong, isoWeek } from "@/lib/format";
import { PageHeader } from "@/components/shell/PageHeader";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function HomePage() {
  const { dict, lang } = await getPrefs();
  const now = new Date();
  const day = formatDayLong(now, lang);
  const week = lang === "nb" ? `uke ${isoWeek(now)}` : `week ${isoWeek(now)}`;

  return (
    <>
      <PageHeader
        crumbs={[dict.nav.hjem]}
        // Beregnes fra åpningstidene i fase 3.
        status={<Badge tone="off">{t(dict.shell.comingInPhase, { n: 3 })}</Badge>}
      />
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div>
          <p className="text-sm text-muted first-letter:uppercase">
            {day} · {week}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink">{dict.home.greeting}</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">{dict.home.intro}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardTitle>{lang === "nb" ? "Oppsett" : "Setup"}</CardTitle>
            <EmptyState
              icon={ListChecks}
              title={lang === "nb" ? "Sjekklisten kommer snart" : "Checklist coming soon"}
              text={lang === "nb" ? "Meny, selskap, logo, åpningstider, betaling og kasse." : "Menu, company, logo, hours, payments and till."}
            />
          </Card>
          <Card>
            <CardTitle>{lang === "nb" ? "Dagens nøkkeltall" : "Today's figures"}</CardTitle>
            <EmptyState
              icon={Store}
              title={lang === "nb" ? "Ingen salg i dag ennå" : "No sales today yet"}
              text={lang === "nb" ? "Salg, ordrer og snitt per ordre vises her." : "Sales, orders and average per order appear here."}
            />
          </Card>
        </div>
      </div>
    </>
  );
}
