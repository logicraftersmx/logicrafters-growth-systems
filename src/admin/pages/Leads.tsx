import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search, Trash2, MessageCircle, Mail, Eye } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  business: string;
  message: string | null;
  source: string | null;
  status: string;
  created_at: string;
}

const STATUSES = [
  { value: "new", label: "Nuevo", className: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
  { value: "contacted", label: "Contactado", className: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  { value: "qualified", label: "Calificado", className: "bg-success/15 text-success" },
  { value: "discarded", label: "Descartado", className: "bg-destructive/15 text-destructive" },
];

export default function Leads() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewing, setViewing] = useState<Lead | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error al cargar leads", description: error.message, variant: "destructive" });
    } else {
      setLeads((data ?? []) as Lead[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    const channel = supabase
      .channel("leads-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "No se pudo actualizar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Estado actualizado" });
      load();
    }
  };

  const remove = async (l: Lead) => {
    if (!confirm(`¿Eliminar el lead de "${l.name}"?`)) return;
    const { error } = await supabase.from("leads").delete().eq("id", l.id);
    if (error) {
      toast({ title: "No se pudo eliminar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Lead eliminado" });
      load();
    }
  };

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matches = !q ||
      l.name.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      l.business.toLowerCase().includes(q);
    const status = statusFilter === "all" || l.status === statusFilter;
    return matches && status;
  });

  const statusMeta = (s: string) => STATUSES.find((x) => x.value === s) ?? STATUSES[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leads del sitio</h1>
        <p className="text-muted-foreground">
          Solicitudes de diagnóstico recibidas desde el formulario público.
        </p>
      </div>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre, teléfono o negocio..."
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="md:w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {STATUSES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {leads.length === 0 ? "Aún no hay leads recibidos." : "Sin resultados con esos filtros."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recibido</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Negocio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="w-32 text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((l) => {
                    const meta = statusMeta(l.status);
                    return (
                      <TableRow key={l.id}>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(l.created_at).toLocaleString("es-MX", {
                            dateStyle: "short", timeStyle: "short",
                          })}
                        </TableCell>
                        <TableCell className="font-medium">{l.name}</TableCell>
                        <TableCell>
                          <a
                            href={`https://wa.me/${l.phone.replace(/[^\d]/g, "")}`}
                            target="_blank" rel="noopener"
                            className="text-primary hover:underline text-sm"
                          >
                            {l.phone}
                          </a>
                        </TableCell>
                        <TableCell className="text-sm">{l.business}</TableCell>
                        <TableCell>
                          <Select value={l.status} onValueChange={(v) => updateStatus(l.id, v)}>
                            <SelectTrigger className="h-8 w-36">
                              <Badge variant="secondary" className={meta.className}>{meta.label}</Badge>
                            </SelectTrigger>
                            <SelectContent>
                              {STATUSES.map((s) => (
                                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button size="icon" variant="ghost" onClick={() => setViewing(l)} title="Ver detalle">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" asChild title="WhatsApp">
                              <a
                                href={`https://wa.me/${l.phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(`Hola ${l.name}, soy de Logicrafters MX, te contacto por tu solicitud de diagnóstico.`)}`}
                                target="_blank" rel="noopener"
                              >
                                <MessageCircle className="h-4 w-4 text-success" />
                              </a>
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => remove(l)} title="Eliminar">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewing?.name}</DialogTitle>
            <DialogDescription>
              Recibido el {viewing && new Date(viewing.created_at).toLocaleString("es-MX")}
            </DialogDescription>
          </DialogHeader>
          {viewing && (
            <div className="space-y-3 text-sm">
              <div><span className="text-muted-foreground">WhatsApp: </span>{viewing.phone}</div>
              <div><span className="text-muted-foreground">Negocio: </span>{viewing.business}</div>
              <div><span className="text-muted-foreground">Fuente: </span>{viewing.source ?? "—"}</div>
              <div>
                <div className="text-muted-foreground mb-1">Mensaje</div>
                <div className="rounded-md border border-border p-3 bg-muted/40 whitespace-pre-wrap">
                  {viewing.message || <span className="text-muted-foreground">Sin mensaje</span>}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button asChild size="sm">
                  <a
                    href={`https://wa.me/${viewing.phone.replace(/[^\d]/g, "")}`}
                    target="_blank" rel="noopener"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}