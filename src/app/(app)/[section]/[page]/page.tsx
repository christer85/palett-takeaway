import { notFound } from "next/navigation";
import { NAV } from "@/lib/nav";
import { getPrefs } from "@/lib/i18n/server";
import { t } from "@/lib/i18n";
import { PageHeader } from "@/components/shell/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// Plassholder for sider som bygges i senere faser. Egne ruter (f.eks. /salg/ordrer/page.tsx) tar over automatisk.
export default async function PlaceholderPage({ params }: PageProps<"/[section]/[page]">) {
  const { section, page } = await params;
  const href = `/${section}/${page}`;
  const group = NAV.find((g) => g.children?.some((c) => c.href === href));
  const leaf = group?.children?.find((c) => c.href === href);
  if (!group || !leaf) notFound();

  const { dict, lang } = await getPrefs();

  return (
    <>
      <PageHeader
        crumbs={[dict.nav[group.key], dict.nav[leaf.key]]}
        actions={<Badge tone="off">{t(dict.shell.comingInPhase, { n: leaf.phase })}</Badge>}
      />
      <div className="p-4 sm:p-6 lg:p-8">
        <Card className="p-0">
          <EmptyState icon={leaf.icon} title={leaf.empty.title[lang]} text={leaf.empty.text[lang]} />
        </Card>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: PageProps<"/[section]/[page]">) {
  const { section, page } = await params;
  const leaf = NAV.flatMap((g) => g.children ?? []).find((c) => c.href === `/${section}/${page}`);
  const { dict } = await getPrefs();
  return { title: leaf ? dict.nav[leaf.key] : undefined };
}
