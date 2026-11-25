import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { getPrefs } from "@/lib/i18n/server";
import { I18nProvider } from "@/lib/i18n/client";
import "./globals.css";

// Inter er selvhostet (ingen kall til Google ved bygg eller i nettleseren).
const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", variable: "--font-inter", weight: "100 900" });

export const metadata: Metadata = {
  title: { default: "Palett Backoffice", template: "%s · Palett Backoffice" },
  description: "Internt styringsverktøy for Palett Takeaway",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0f3b2c",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { lang, theme, dict } = await getPrefs();
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${theme === "dark" ? "dark" : ""}`}
      style={{ colorScheme: theme }}
      suppressHydrationWarning
    >
      <body className="min-h-dvh">
        <I18nProvider lang={lang} dict={dict}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
