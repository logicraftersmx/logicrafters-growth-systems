import { Check, Loader2, X, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CheckStatus } from "./useDomainChecks";

interface StatusPillProps {
  status: CheckStatus;
  label: string;
  detail?: string;
}

export function StatusPill({ status, label, detail }: StatusPillProps) {
  const config = {
    idle: {
      icon: Circle,
      bg: "bg-muted",
      text: "text-muted-foreground",
      ring: "ring-border",
      tag: "Pendiente",
    },
    checking: {
      icon: Loader2,
      bg: "bg-primary/10",
      text: "text-primary",
      ring: "ring-primary/30",
      tag: "Verificando…",
    },
    ok: {
      icon: Check,
      bg: "bg-success/10",
      text: "text-success",
      ring: "ring-success/30",
      tag: "OK",
    },
    fail: {
      icon: X,
      bg: "bg-destructive/10",
      text: "text-destructive",
      ring: "ring-destructive/30",
      tag: "Falla",
    },
  }[status];

  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border bg-card p-3 ring-1 transition-colors",
        config.ring
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          config.bg,
          config.text
        )}
      >
        <Icon className={cn("h-4 w-4", status === "checking" && "animate-spin")} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold leading-tight">{label}</p>
          <span className={cn("text-[10px] font-bold uppercase tracking-wider", config.text)}>
            {config.tag}
          </span>
        </div>
        {detail && (
          <p className="mt-1 break-words font-mono text-xs text-muted-foreground">{detail}</p>
        )}
      </div>
    </div>
  );
}