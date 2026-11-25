import { LoginForm } from "./LoginForm";
import { LogoMark } from "@/components/ui/Logo";

export const metadata = { title: "Logg inn" };

export default async function LoginPage({ searchParams }: PageProps<"/logg-inn">) {
  const { neste } = await searchParams;
  // Bare interne stier er lov som videresending (hindrer åpen omdirigering).
  const next = typeof neste === "string" && neste.startsWith("/") && !neste.startsWith("//") ? neste : "/";

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-shell p-4">
      <div className="mb-6 flex items-center gap-2.5 text-shell-text">
        <LogoMark className="size-9" />
        <span className="text-lg font-semibold tracking-tight">Palett Backoffice</span>
      </div>
      <div className="w-full max-w-[400px] rounded-[28px] bg-surface p-2">
        <div className="rounded-[22px] border border-line bg-card p-7">
          <LoginForm next={next} />
        </div>
      </div>
    </div>
  );
}
