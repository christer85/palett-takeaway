import {
  Home,
  ShoppingBag,
  UtensilsCrossed,
  Users,
  CalendarClock,
  Radio,
  Settings,
  Receipt,
  ChefHat,
  CalendarCheck,
  BarChart3,
  Landmark,
  LayoutGrid,
  Tags,
  UserRound,
  Gift,
  Percent,
  Sun,
  CalendarRange,
  Inbox,
  IdCard,
  ClipboardList,
  Globe,
  Bike,
  Store,
  CreditCard,
  Sparkles,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import type { Dict } from "@/lib/i18n";

type NavKey = keyof Dict["nav"];
type Bi = { nb: string; en: string };

export type NavLeaf = {
  key: NavKey;
  href: string;
  icon: LucideIcon;
  phase: number;
  empty: { title: Bi; text: Bi };
};

export type NavGroup = {
  key: NavKey;
  icon: LucideIcon;
  href?: string;
  phase?: number;
  children?: NavLeaf[];
};

const leaf = (
  key: NavKey,
  href: string,
  icon: LucideIcon,
  phase: number,
  title: Bi,
  text: Bi,
): NavLeaf => ({ key, href, icon, phase, empty: { title, text } });

export const NAV: NavGroup[] = [
  { key: "hjem", icon: Home, href: "/", phase: 3 },
  {
    key: "salg",
    icon: ShoppingBag,
    children: [
      leaf("ordrer", "/salg/ordrer", Receipt, 5,
        { nb: "Fant ingen ordrer", en: "No orders found" },
        { nb: "Ordrer vises her når gjester bestiller.", en: "Orders appear here when guests order." }),
      leaf("pagaende", "/salg/pagaende", ChefHat, 5,
        { nb: "Ingen ordrer på kjøkkenet", en: "No orders in the kitchen" },
        { nb: "Nye ordrer dukker opp her med én gang de kommer inn.", en: "New orders show up here as soon as they arrive." }),
      leaf("reservasjoner", "/salg/reservasjoner", CalendarCheck, 5,
        { nb: "Ingen reservasjoner", en: "No reservations" },
        { nb: "Reservasjoner vises her når gjester bestiller bord.", en: "Reservations appear here when guests book a table." }),
      leaf("statistikk", "/salg/statistikk", BarChart3, 6,
        { nb: "Ingen salg i perioden", en: "No sales in this period" },
        { nb: "Statistikken fylles ut når de første ordrene er registrert.", en: "Statistics fill in once the first orders are registered." }),
      leaf("oppgjor", "/salg/oppgjor", Landmark, 6,
        { nb: "Ingen oppgjør ennå", en: "No settlements yet" },
        { nb: "Ukesoppgjør for nettbetalinger vises her.", en: "Weekly settlements for online payments appear here." }),
    ],
  },
  {
    key: "meny",
    icon: UtensilsCrossed,
    children: [
      leaf("produkter", "/meny/produkter", LayoutGrid, 4,
        { nb: "Ingen produkter ennå", en: "No products yet" },
        { nb: "Legg til retter og drikke, så vises de her.", en: "Add dishes and drinks and they will appear here." }),
      leaf("varegrupper", "/meny/varegrupper", Tags, 4,
        { nb: "Ingen varegrupper", en: "No product groups" },
        { nb: "Varegrupper knytter produkter til riktig mva-sats.", en: "Product groups link products to the right VAT rate." }),
    ],
  },
  {
    key: "gjester",
    icon: Users,
    children: [
      leaf("kunder", "/gjester/kunder", UserRound, 8,
        { nb: "Ingen kunder ennå", en: "No customers yet" },
        { nb: "Kunder vises her etter første bestilling.", en: "Customers appear here after their first order." }),
      leaf("bonus", "/gjester/bonus", Gift, 8,
        { nb: "Bonus er ikke satt opp", en: "Rewards not set up" },
        { nb: "Gi gjestene cashback på hver bestilling.", en: "Give guests cashback on every order." }),
      leaf("rabatter", "/gjester/rabatter", Percent, 8,
        { nb: "Ingen rabatter", en: "No discounts" },
        { nb: "Rabatter og rabattkoder vises her.", en: "Discounts and codes appear here." }),
    ],
  },
  {
    key: "vaktplan",
    icon: CalendarClock,
    children: [
      leaf("iDag", "/vaktplan/i-dag", Sun, 7,
        { nb: "Ingen vakter i dag", en: "No shifts today" },
        { nb: "Dagens vakter og stemplinger vises her.", en: "Today's shifts and punches appear here." }),
      leaf("plan", "/vaktplan/plan", CalendarRange, 7,
        { nb: "Ingen vakter planlagt", en: "No shifts planned" },
        { nb: "Lag vakter for dag, uke eller måned.", en: "Create shifts by day, week or month." }),
      leaf("tilAvgjorelse", "/vaktplan/til-avgjorelse", Inbox, 7,
        { nb: "Ingenting å avgjøre", en: "Nothing to decide" },
        { nb: "Søknader om fri, vaktbytter og rettinger havner her.", en: "Time-off requests, swaps and corrections land here." }),
      leaf("medarbeidere", "/vaktplan/medarbeidere", IdCard, 7,
        { nb: "Ingen medarbeidere", en: "No employees" },
        { nb: "Legg til medarbeidere med rolle, stillingsprosent og timelønn.", en: "Add employees with role, position and hourly wage." }),
      leaf("timelister", "/vaktplan/timelister", ClipboardList, 7,
        { nb: "Ingen timelister", en: "No timesheets" },
        { nb: "Timelister lages automatisk fra stemplinger.", en: "Timesheets are created automatically from punches." }),
      leaf("innstillinger", "/vaktplan/innstillinger", SlidersHorizontal, 7,
        { nb: "Innstillinger for vaktplan", en: "Schedule settings" },
        { nb: "Roller, lønn, stempling og avtalemaler settes opp her.", en: "Roles, pay, punching and contract templates are set up here." }),
    ],
  },
  {
    key: "kanaler",
    icon: Radio,
    children: [
      leaf("nettbestilling", "/kanaler/nettbestilling", Globe, 8,
        { nb: "Nettbestilling er ikke publisert", en: "Online ordering not published" },
        { nb: "Publiser menyen så gjestene kan bestille på nett.", en: "Publish the menu so guests can order online." }),
      leaf("wolt", "/kanaler/wolt", Bike, 8,
        { nb: "Wolt er ikke tilkoblet", en: "Wolt not connected" },
        { nb: "Ordrer fra Wolt vises sammen med de andre når kanalen er koblet til.", en: "Wolt orders appear alongside others once connected." }),
      leaf("foodora", "/kanaler/foodora", Bike, 8,
        { nb: "Foodora er ikke tilkoblet", en: "Foodora not connected" },
        { nb: "Ordrer fra Foodora vises sammen med de andre når kanalen er koblet til.", en: "Foodora orders appear alongside others once connected." }),
    ],
  },
  {
    key: "innstillinger",
    icon: Settings,
    children: [
      leaf("butikk", "/innstillinger/butikk", Store, 3,
        { nb: "Butikken er ikke satt opp", en: "Store not set up" },
        { nb: "Navn, adresse og åpningstider settes opp her.", en: "Name, address and opening hours are set up here." }),
      leaf("betaling", "/innstillinger/betaling", CreditCard, 8,
        { nb: "Ingen betalingsmåter", en: "No payment methods" },
        { nb: "Velg hvordan gjestene kan betale.", en: "Choose how guests can pay." }),
      leaf("aiAssistenter", "/innstillinger/ai-assistenter", Sparkles, 9,
        { nb: "«Spør Palett» er ikke satt opp", en: "“Ask Palett” not set up" },
        { nb: "AI-hjelpen svarer på spørsmål om egne data.", en: "The AI assistant answers questions about your data." }),
      leaf("tilgang", "/innstillinger/tilgang", ShieldCheck, 2,
        { nb: "Ingen andre brukere", en: "No other users" },
        { nb: "Gi kolleger tilgang med riktig rolle og sted.", en: "Give colleagues access with the right role and location." }),
    ],
  },
];

/** Finn gruppe og side for en sti, til brødsmulesti og plassholdere. */
export function findNav(pathname: string): { group?: NavGroup; leaf?: NavLeaf } {
  for (const group of NAV) {
    if (group.href && group.href === pathname) return { group };
    for (const l of group.children ?? []) {
      if (pathname === l.href || pathname.startsWith(l.href + "/")) return { group, leaf: l };
    }
  }
  return {};
}
