"use client";

import { useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n/client";
import { t } from "@/lib/i18n";
import { useShell } from "./ShellProvider";

export function Dialogs() {
  const { askOpen, setAskOpen, feedbackOpen, setFeedbackOpen } = useShell();
  const { dict } = useI18n();
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <>
      <Modal open={askOpen} onClose={() => setAskOpen(false)} title={dict.ask.title} closeLabel={dict.common.close}>
        <div className="mb-4 flex items-start gap-3 rounded-2xl bg-card-muted p-4">
          <Sparkles className="mt-0.5 size-5 shrink-0 text-accent" />
          <p className="text-sm text-muted">{dict.ask.intro}</p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-line bg-card p-1.5 pl-4">
          <input
            disabled
            placeholder={dict.ask.placeholder}
            className="h-9 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
          <Button variant="primary" disabled aria-label={dict.ask.send} className="size-9 px-0">
            <ArrowUp className="size-4" />
          </Button>
        </div>
        <div className="mt-3">
          <Badge tone="off">{t(dict.shell.comingInPhase, { n: 9 })}</Badge>
        </div>
      </Modal>

      <Modal
        open={feedbackOpen}
        onClose={() => {
          setFeedbackOpen(false);
          setSent(false);
          setText("");
        }}
        title={dict.feedback.title}
        closeLabel={dict.common.close}
      >
        {sent ? (
          <p className="text-sm text-ink">{dict.feedback.thanks}</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Lagres i databasen når datamodellen er på plass (fase 2).
              setSent(true);
            }}
          >
            <p className="mb-3 text-sm text-muted">{dict.feedback.intro}</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              placeholder={dict.feedback.placeholder}
              className="w-full resize-none rounded-2xl border border-line bg-card p-3.5 text-sm text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-ring"
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" onClick={() => setFeedbackOpen(false)}>
                {dict.feedback.cancel}
              </Button>
              <Button type="submit" variant="primary" disabled={!text.trim()}>
                {dict.feedback.send}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
