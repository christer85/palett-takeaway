"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/i18n/client";
import { t } from "@/lib/i18n";
import { formatPhone } from "@/lib/format";
import { Button } from "@/components/ui/Button";

const RESEND_SECONDS = 60;

/** Godtar «999 99 999», «+47 999 99 999» og «0047…». Returnerer E.164 uten «+» eller null. */
function normalizePhone(input: string): string | null {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("0047")) d = d.slice(2);
  if (d.length === 8) d = "47" + d;
  return /^47[2-9]\d{7}$/.test(d) ? d : null;
}

export function LoginForm({ next }: { next: string }) {
  const { dict } = useI18n();
  const supabase = useRef(createClient()).current;
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phoneInput, setPhoneInput] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  useEffect(() => {
    if (step === "code") codeRef.current?.focus();
  }, [step]);

  function mapError(message: string) {
    const m = message.toLowerCase();
    if (m.includes("unsupported phone provider") || m.includes("phone provider") || m.includes("signups not allowed")) return dict.login.providerOff;
    if (m.includes("token") || m.includes("otp") || m.includes("expired") || m.includes("invalid")) return dict.login.invalidCode;
    return dict.login.genericError;
  }

  async function sendCode(target: string) {
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ phone: target });
    setBusy(false);
    if (error) {
      setError(mapError(error.message));
      return false;
    }
    setCooldown(RESEND_SECONDS);
    return true;
  }

  async function onPhoneSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = normalizePhone(phoneInput);
    if (!normalized) {
      setError(dict.login.invalidPhone);
      return;
    }
    setPhone(normalized);
    if (await sendCode(normalized)) setStep("code");
  }

  async function onCodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.length !== 6) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.verifyOtp({ phone, token: code, type: "sms" });
    if (error) {
      setBusy(false);
      setError(mapError(error.message));
      setCode("");
      return;
    }
    // Full innlasting så server-komponentene får den nye sesjonen.
    window.location.assign(next);
  }

  if (step === "phone") {
    return (
      <form onSubmit={onPhoneSubmit} noValidate>
        <h1 className="text-xl font-semibold tracking-tight text-ink">{dict.login.title}</h1>
        <p className="mt-1.5 text-sm text-muted">{dict.login.subtitle}</p>

        <label htmlFor="phone" className="mt-6 mb-1.5 block text-sm font-medium text-ink">
          {dict.login.phone}
        </label>
        <div className="flex h-11 items-center rounded-xl border border-line bg-card focus-within:ring-2 focus-within:ring-ring">
          <span className="border-r border-line px-3 text-sm text-muted">+47</span>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            autoFocus
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            placeholder="999 99 999"
            className="h-full flex-1 bg-transparent px-3 text-[15px] text-ink outline-none tabular placeholder:text-muted/60"
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined}
          />
        </div>

        {error && (
          <p id="login-error" role="alert" className="mt-2 text-sm text-crit-fg">
            {error}
          </p>
        )}

        <Button type="submit" variant="primary" disabled={busy} className="mt-5 h-11 w-full">
          {busy && <Loader2 className="size-4 animate-spin" />}
          {dict.login.sendCode}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={onCodeSubmit} noValidate>
      <button
        type="button"
        onClick={() => {
          setStep("phone");
          setCode("");
          setError(null);
        }}
        className="-ml-1 mb-3 inline-flex items-center gap-1 rounded-lg px-1 py-0.5 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft className="size-4" />
        {dict.login.changeNumber}
      </button>
      <h1 className="text-xl font-semibold tracking-tight text-ink">{dict.login.codeTitle}</h1>
      <p className="mt-1.5 text-sm text-muted">{t(dict.login.codeSent, { phone: formatPhone(phone) })}</p>

      <label htmlFor="code" className="sr-only">
        {dict.login.code}
      </label>
      <input
        ref={codeRef}
        id="code"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        placeholder="••••••"
        className="mt-6 h-14 w-full rounded-xl border border-line bg-card text-center text-2xl font-semibold tracking-[0.5em] text-ink outline-none tabular placeholder:text-muted/40 focus:ring-2 focus:ring-ring"
        aria-invalid={!!error}
      />

      {error && (
        <p role="alert" className="mt-2 text-sm text-crit-fg">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={busy || code.length !== 6} className="mt-5 h-11 w-full">
        {busy && <Loader2 className="size-4 animate-spin" />}
        {dict.login.verify}
      </Button>

      <button
        type="button"
        disabled={cooldown > 0 || busy}
        onClick={() => sendCode(phone)}
        className="mt-3 w-full text-center text-sm text-muted hover:text-ink disabled:hover:text-muted"
      >
        {cooldown > 0 ? t(dict.login.resendIn, { s: cooldown }) : dict.login.resend}
      </button>
    </form>
  );
}
