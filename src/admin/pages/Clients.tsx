import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Pencil, Trash2, Loader2 } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";

type ClientStatus = "prospect" | "lead" | "active" | "inactive";

interface Client {
  id: string;
  name: string;
  company: string | null;
  industry: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  source: string | null;
  status: ClientStatus;
  potential_value: number | null;
  notes: string | null;
  created_at: string;
}

const statusLabels: Record<ClientStatus, { label: string; variant: string }> = {
  prospect: { label: "Prospecto", variant: "bg-muted text-muted-foreground" },
  lead: { label: "Lead", variant: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
  active: { label: "Activo", variant: "bg-success/15 text-success" },
  inactive: { label: "Inactivo", variant: "bg-destructive/15 text-destructive" },
};

const emptyForm = {
  name: "",
  company: "",
  industry: "",
  email: "",
  phone: "",
  city: "",
  source: "",
  status: "prospect" as ClientStatus,
  potential_value: "",
  notes: "",
};

export default function Clients() {
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const canEdit = hasRole("admin") || hasRole("manager");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error al cargar clientes", description: error.message, variant: "destructive" });
    } else {
      setClients((data ?? []) as Client[]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (c: Client) => {
    setEditing(c);
    setForm({
      name: c.name,
      company: c.company ?? "",
      industry: c.industry ?? "",
      email: c.email ?? "",
      phone: c.phone ?? "",
      city: c.city ?? "",
      source: c.source ?? "",
      status: c.status,
      potential_value: c.potential_value?.toString() ?? "",
      notes: c.notes ?? "",
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast({ title: "El nombre es obligatorio", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const payload = {
      name: form.name.trim(),
      company: form.company.trim() || null,
      industry: form.industry.trim() || null,
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      city: form.city.trim() || null,
      source: form.source.trim() || null,
      status: form.status,
      potential_value: form.potential_value ? Number(form.potential_value) : 0,
      notes: form.notes.trim() || null,
    };

    let error;
    if (editing) {
      ({ error } = await supabase.from("clients").update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase
        .from("clients")
        .insert({ ...payload, created_by: user?.id, owner_id: user?.id }));
    }
    setSubmitting(false);
    if (error) {
      toast({ title: "No se pudo guardar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Cliente actualizado" : "Cliente creado" });
    setDialogOpen(false);
    load();
  };

  const handleDelete = async (c: Client) => {
    if (!confirm(`¿Eliminar el cliente "${c.name}"? Esta acción no se puede deshacer.`)) return;
    const { error } = await supabase.from("clients").delete().eq("id", c.id);
    if (error) {
      toast({ title: "No se pudo eliminar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Cliente eliminado" });
    load();
  };

  const filtered = clients.filter((c) => {
    const matchesSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.company ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.email ?? "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">
            Tu base de datos centralizada de prospectos y clientes.
          </p>
        </div>
        {canEdit && (
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" /> Nuevo cliente
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre, empresa o email..."
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="prospect">Prospectos</SelectItem>
                <SelectItem value="lead">Leads</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
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
              {clients.length === 0
                ? "Aún no hay clientes. Crea el primero."
                : "No se encontraron clientes con esos filtros."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Valor potencial</TableHead>
                    {canEdit && <TableHead className="w-24"></TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell>
                        <div className="text-sm">{c.company || "—"}</div>
                        {c.industry && (
                          <div className="text-xs text-muted-foreground">{c.industry}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{c.email || "—"}</div>
                        {c.phone && (
                          <div className="text-xs text-muted-foreground">{c.phone}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusLabels[c.status].variant} variant="secondary">
                          {statusLabels[c.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {new Intl.NumberFormat("es-MX", {
                          style: "currency",
                          currency: "MXN",
                          maximumFractionDigits: 0,
                        }).format(Number(c.potential_value || 0))}
                      </TableCell>
                      {canEdit && (
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button size="icon" variant="ghost" onClick={() => openEdit(c)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDelete(c)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar cliente" : "Nuevo cliente"}</DialogTitle>
            <DialogDescription>
              Captura la información clave del cliente o prospecto.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industria</Label>
                <Input
                  id="industry"
                  placeholder="Barbería, estética, retail..."
                  value={form.industry}
                  onChange={(e) => setForm({ ...form, industry: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Fuente</Label>
                <Input
                  id="source"
                  placeholder="Referido, WhatsApp, web..."
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => setForm({ ...form, status: v as ClientStatus })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospect">Prospecto</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="potential_value">Valor potencial (MXN)</Label>
                <Input
                  id="potential_value"
                  type="number"
                  min="0"
                  step="100"
                  value={form.potential_value}
                  onChange={(e) => setForm({ ...form, potential_value: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editing ? "Guardar cambios" : "Crear cliente"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}