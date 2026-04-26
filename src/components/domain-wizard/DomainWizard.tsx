import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Rocket,
  Server,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { REGISTRARS, LOVABLE_IP, type RegistrarId } from "./registrars";
import { useDomainChecks } from "./useDomainChecks";
import { StatusPill } from "./StatusPill";

const STORAGE_KEY = "logicrafters.domain-wizard.v1";

interface PersistedState {
  domain: string;
  registrar: RegistrarId;
  lovableUrl: string;
  step: number;
  open: boolean;
}

const DEFAULT_STATE: PersistedState = {
  domain: "",
  registrar: "lovable",
  lovableUrl: "",
  step: 0,
  open: false,
};

const STEPS = [
  { id: "publish", label: "Publicar", icon: Rocket },
  { id: "registrar", label: "Registrador", icon: Globe },
  { id: "dns", label: "DNS", icon: Server },
  { id: "verify", label: "Verificar & SSL", icon: ShieldCheck },
] as const;

function copy(value: string, label = "Copiado") {
  navigator.clipboard.writeText(value).then(
    () => toast.success(`${label} ✓`),
    () => toast.error("No se pudo copiar")
  );
}

export function DomainWizard() {
  const [state, setState] = useState<PersistedState>(DEFAULT_STATE);
  const { state: checks, runChecks, reset } = useDomainChecks();

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...DEFAULT_STATE, ...JSON.parse(raw), open: false });
    } catch {
      /* ignore */
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const update = <K extends keyof PersistedState>(key: K, value: PersistedState[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const registrar = useMemo(
    () => REGISTRARS.find((r) => r.id === state.registrar) ?? REGISTRARS[0],
    [state.registrar]
  );

  const txtName = state.domain ? `_lovable.${state.domain.replace(/^https?:\/\//, "").replace(/\/$/, "")}` : "_lovable";

  const progress = ((state.step + 1) / STEPS.length) * 100;

  const allOk =
    checks.dnsRoot === "ok" &&
    checks.dnsWww === "ok" &&
    checks.dnsTxt === "ok" &&
    checks.ssl === "ok";

  const handleRunChecks = async () => {
    if (!state.domain) {
      toast.error("Ingresa tu dominio primero");
      return;
    }
    await runChecks(state.domain, state.lovableUrl);
  };

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        onClick={() => update("open", true)}
        className={cn(
          "fixed bottom-24 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow-blue transition-transform hover:scale-105 md:bottom-6 md:right-24"
        )}
        aria-label="Abrir asistente de dominio"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">Asistente de dominio</span>
        <span className="sm:hidden">Dominio</span>
      </motion.button>

      <Dialog open={state.open} onOpenChange={(o) => update("open", o)}>
        <DialogContent className="max-h-[92vh] max-w-2xl gap-0 overflow-hidden p-0">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-primary via-primary to-[hsl(var(--primary-glow))] p-5 text-primary-foreground">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <DialogTitle className="text-lg font-bold">
                    Asistente de dominio personalizado
                  </DialogTitle>
                </div>
                <DialogDescription className="mt-1 text-primary-foreground/80">
                  Te guiamos paso a paso con verificación en vivo.
                </DialogDescription>
              </div>
              <button
                onClick={() => update("open", false)}
                className="rounded-full p-1.5 transition-colors hover:bg-white/15"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Stepper */}
            <div className="mt-4 flex items-center gap-1.5">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const active = i === state.step;
                const done = i < state.step;
                return (
                  <button
                    key={s.id}
                    onClick={() => update("step", i)}
                    className={cn(
                      "flex flex-1 items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold transition-all",
                      active && "bg-white text-primary shadow-md",
                      done && !active && "bg-white/25 text-white",
                      !active && !done && "bg-white/10 text-white/70"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{s.label}</span>
                    <span className="sm:hidden">{i + 1}</span>
                  </button>
                );
              })}
            </div>
            <Progress value={progress} className="mt-3 h-1 bg-white/20" />
          </div>

          {/* Body */}
          <div className="max-h-[60vh] overflow-y-auto p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* STEP 0 — PUBLISH */}
                {state.step === 0 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold">1. Publica tu sitio</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Antes de conectar un dominio, tu proyecto debe estar publicado en una URL <code className="rounded bg-muted px-1 text-xs">.lovable.app</code>.
                      </p>
                    </div>
                    <ol className="space-y-2 text-sm">
                      <li className="flex gap-2"><Badge variant="secondary" className="shrink-0">1</Badge><span>En desktop: clic en <strong>Publish</strong> (arriba derecha). En móvil: <strong>'...'</strong> → <strong>Publish</strong>.</span></li>
                      <li className="flex gap-2"><Badge variant="secondary" className="shrink-0">2</Badge><span>Confirma para generar tu URL pública.</span></li>
                      <li className="flex gap-2"><Badge variant="secondary" className="shrink-0">3</Badge><span>Pega esa URL aquí abajo para verificarla.</span></li>
                    </ol>

                    <div className="space-y-2">
                      <Label htmlFor="lovable-url">URL publicada de Lovable</Label>
                      <Input
                        id="lovable-url"
                        placeholder="mi-proyecto.lovable.app"
                        value={state.lovableUrl}
                        onChange={(e) => update("lovableUrl", e.target.value)}
                      />
                    </div>

                    <StatusPill
                      status={checks.publish}
                      label="Sitio publicado y accesible"
                      detail={checks.publishedUrl}
                    />
                  </div>
                )}

                {/* STEP 1 — REGISTRAR */}
                {state.step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold">2. Tu dominio y registrador</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Te mostraremos instrucciones específicas según dónde compraste tu dominio.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="domain">Tu dominio</Label>
                      <Input
                        id="domain"
                        placeholder="logicrafters.mx"
                        value={state.domain}
                        onChange={(e) => update("domain", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>¿Dónde compraste el dominio?</Label>
                      <Select
                        value={state.registrar}
                        onValueChange={(v) => update("registrar", v as RegistrarId)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {REGISTRARS.map((r) => (
                            <SelectItem key={r.id} value={r.id}>
                              <span className="mr-2">{r.emoji}</span>
                              {r.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {registrar.proxyWarning && (
                      <div className="flex items-start gap-2 rounded-lg border border-secondary/30 bg-secondary/10 p-3 text-xs text-foreground">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                        <p>{registrar.proxyWarning}</p>
                      </div>
                    )}

                    {state.registrar === "lovable" && (
                      <div className="rounded-lg border border-accent/40 bg-accent/10 p-3 text-sm">
                        <p className="font-semibold">✨ Recomendado para Logicrafters MX</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Comprar el dominio dentro de Lovable evita configurar DNS manualmente.
                          Salta directo al paso 4 después de comprarlo.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 2 — DNS */}
                {state.step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold">
                        3. Configura DNS en {registrar.emoji} {registrar.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Copia estos valores exactos en el panel DNS de tu registrador.
                      </p>
                    </div>

                    {/* Records table */}
                    <div className="space-y-2">
                      {[
                        { type: "A", name: "@", value: LOVABLE_IP, hint: "Dominio raíz" },
                        { type: "A", name: "www", value: LOVABLE_IP, hint: "Subdominio www" },
                        { type: "TXT", name: "_lovable", value: "(token de Lovable)", hint: "Verificación" },
                      ].map((r) => (
                        <div
                          key={r.name + r.type}
                          className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border bg-card p-3"
                        >
                          <Badge className="bg-primary text-primary-foreground">{r.type}</Badge>
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">
                              {r.hint} · Name: <code className="font-mono">{r.name}</code>
                            </p>
                            <p className="truncate font-mono text-sm font-semibold">{r.value}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copy(r.value, `${r.type} ${r.name}`)}
                            disabled={r.value.startsWith("(")}
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Registrar steps */}
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Pasos en {registrar.name}
                        </p>
                        {registrar.dnsPanelUrl && (
                          <a
                            href={registrar.dnsPanelUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                          >
                            Abrir panel <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <ol className="space-y-1.5 text-sm">
                        {registrar.steps.map((step, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="font-mono text-xs text-muted-foreground">{i + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}

                {/* STEP 3 — VERIFY */}
                {state.step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold">4. Verifica DNS y SSL en vivo</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Consultamos los registros DNS reales y probamos HTTPS desde tu navegador.
                      </p>
                    </div>

                    <Button
                      onClick={handleRunChecks}
                      className="w-full"
                      disabled={!state.domain || checks.dnsRoot === "checking"}
                    >
                      <RefreshCw
                        className={cn(
                          "mr-2 h-4 w-4",
                          checks.dnsRoot === "checking" && "animate-spin"
                        )}
                      />
                      Ejecutar verificación
                    </Button>

                    <div className="space-y-2">
                      <StatusPill
                        status={checks.publish}
                        label="Sitio publicado en Lovable"
                        detail={checks.publishedUrl}
                      />
                      <StatusPill
                        status={checks.dnsRoot}
                        label={`Registro A para ${state.domain || "tu dominio"}`}
                        detail={
                          checks.rootIps.length
                            ? `Apunta a: ${checks.rootIps.join(", ")} (esperado ${LOVABLE_IP})`
                            : checks.dnsRoot === "fail"
                            ? "No se encontró registro A"
                            : undefined
                        }
                      />
                      <StatusPill
                        status={checks.dnsWww}
                        label={`Registro A para www.${state.domain || "tu dominio"}`}
                        detail={
                          checks.wwwIps.length
                            ? `Apunta a: ${checks.wwwIps.join(", ")}`
                            : checks.dnsWww === "fail"
                            ? "No se encontró registro A"
                            : undefined
                        }
                      />
                      <StatusPill
                        status={checks.dnsTxt}
                        label={`TXT de verificación (${txtName})`}
                        detail={
                          checks.txtValues.length
                            ? `Valor: ${checks.txtValues[0].slice(0, 60)}…`
                            : checks.dnsTxt === "fail"
                            ? "No se encontró TXT _lovable"
                            : undefined
                        }
                      />
                      <StatusPill
                        status={checks.ssl}
                        label="Certificado SSL (HTTPS) activo"
                        detail={checks.sslUrl}
                      />
                    </div>

                    {checks.lastChecked && allOk && (
                      <div className="flex items-center gap-2 rounded-lg border border-success/40 bg-success/10 p-3 text-sm font-semibold text-success">
                        <Sparkles className="h-4 w-4" />
                        ¡Todo listo! Tu dominio está conectado y servido por HTTPS.
                      </div>
                    )}

                    {checks.lastChecked && !allOk && (
                      <div className="rounded-lg border border-secondary/40 bg-secondary/10 p-3 text-xs text-foreground">
                        <p className="font-semibold">⏳ Aún propagando</p>
                        <p className="mt-1 text-muted-foreground">
                          DNS puede tardar de 15 min hasta 72 h. Vuelve a verificar en unos minutos.
                          Si después de 24 h sigue fallando, revisa que no haya registros viejos en {registrar.name}.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer nav */}
          <div className="flex items-center justify-between border-t bg-muted/30 p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => update("step", Math.max(0, state.step - 1))}
              disabled={state.step === 0}
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Atrás
            </Button>
            <span className="text-xs font-semibold text-muted-foreground">
              Paso {state.step + 1} de {STEPS.length}
            </span>
            {state.step < STEPS.length - 1 ? (
              <Button
                size="sm"
                onClick={() => update("step", Math.min(STEPS.length - 1, state.step + 1))}
              >
                Siguiente <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  reset();
                  update("step", 0);
                  toast.success("Asistente reiniciado");
                }}
              >
                Reiniciar
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}