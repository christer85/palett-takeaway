// Midlertidig stedsliste. Byttes ut med tabellen `locations` (via user_access) i fase 2.
export type Location = { id: string; name: string; short: string };

export const LOCATIONS: Location[] = [{ id: "palett", name: "Palett Takeaway", short: "P" }];
