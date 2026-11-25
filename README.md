# Palett Backoffice

Internt styringsverktøy for Palett Takeaway. Next.js (App Router) · TypeScript · Tailwind · Supabase.

## Kom i gang

```bash
npm install
cp .env.example .env.local   # fyll inn Supabase-URL og publishable key
npm run dev
```

Logg inn med testnummeret `999 99 999` og koden `123456` (satt opp under Auth → Providers → Phone i Supabase).

## Struktur

- `src/proxy.ts` – fornyer Supabase-sesjonen og sender uinnloggede til `/logg-inn`
- `src/app/(auth)/logg-inn` – innlogging med telefon og engangskode
- `src/app/(app)` – alt bak innlogging; `[section]/[page]` er plassholder for sider som ikke er bygget ennå
- `src/lib/nav.ts` – menyen (moduler, ikoner, tomme tilstander)
- `src/lib/i18n` – tekster på bokmål og engelsk
- `src/lib/format.ts` – norske formater (kr fra øre, datoer, ukenummer, Europe/Oslo)

Sted, tema, språk og sammenfoldet meny lagres i informasjonskapsler (`palett_*`).

## Faser

1. ✅ Prosjektoppsett, innlogging, layout, meny, stedvelger, lys/mørk modus
2. Datamodell med RLS og testdata
3. Hjem og Innstillinger → Butikk
4. Meny · 5. Ordrer og Pågående · 6. Statistikk og Oppgjør · 7. Vaktplan · 8. Gjester og Kanaler · 9. Spør Palett · 10. Publisering og sikkerhet
