import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth, AppRole } from "../auth/AuthProvider";
import { Loader2, Plus, X, Info } from "lucide-react";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  job_title: string | null;
  status: "pending" | "active" | "inactive";
  created_at: string;
}

interface RoleRow {
  user_id: string;
  role: AppRole;
}

const roleOptions: AppRole[] = ["admin", "manager", "member", "client"];

export default function Team() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [rolesByUser, setRolesByUser] = useState<Record<string, AppRole[]>>({});
  const [loading, setLoading] = useState(true);
  const [roleDraft, setRoleDraft] = useState<Record<string, AppRole>>({});

  const load = async () => {
    setLoading(true);
    const [{ data: profs, error: pErr }, { data: rs, error: rErr }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    if (pErr || rErr) {
      toast({
        title: "Error al cargar el equipo",
        description: pErr?.message || rErr?.message,
        variant: "destructive",
      });
    } else {
      setProfiles((profs ?? []) as Profile[]);
      const map: Record<string, AppRole[]> = {};
      (rs ?? []).forEach((r: RoleRow) => {
        if (!map[r.user_id]) map[r.user_id] = [];
        map[r.user_id].push(r.role);
      });
      setRolesByUser(map);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addRole = async (userId: string) => {
    const role = roleDraft[userId];
    if (!role) return;
    if (rolesByUser[userId]?.includes(role)) {
      toast({ title: "Ese rol ya está asignado" });
      return;
    }
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role });
    if (error) {
      toast({ title: "No se pudo asignar el rol", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Rol asignado" });
    load();
  };

  const removeRole = async (userId: string, role: AppRole) => {
    if (userId === user?.id && role === "admin") {
      if (!confirm("Te estás quitando tu propio rol de admin. ¿Continuar?")) return;
    }
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId)
      .eq("role", role);
    if (error) {
      toast({ title: "No se pudo quitar el rol", description: error.message, variant: "destructive" });
      return;
    }
    load();
  };

  const updateStatus = async (id: string, status: "active" | "inactive") => {
    const { error } = await supabase.from("profiles").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    load();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Equipo</h1>
        <p className="text-muted-foreground">
          Gestiona los usuarios y sus roles de acceso al panel.
        </p>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="flex flex-row items-start gap-3 space-y-0">
          <Info className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <CardTitle className="text-base">Cómo invitar a alguien</CardTitle>
            <CardDescription className="mt-1">
              Pídeles que se registren con su email en{" "}
              <code className="px-1 py-0.5 rounded bg-background text-foreground text-xs">
                /admin/invite
              </code>
              . Su cuenta quedará en estado <strong>pendiente</strong> hasta que aquí le asignes
              un rol y la actives.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Miembros</CardTitle>
          <CardDescription>
            {profiles.length} {profiles.length === 1 ? "usuario" : "usuarios"} en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : profiles.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              Aún no hay usuarios registrados.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Asignar rol</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profiles.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="font-medium">{p.full_name || p.email}</div>
                        <div className="text-xs text-muted-foreground">{p.email}</div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={p.status}
                          onValueChange={(v) => updateStatus(p.id, v as "active" | "inactive")}
                          disabled={p.status === "pending" && !rolesByUser[p.id]?.length}
                        >
                          <SelectTrigger className="w-32 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {p.status === "pending" && (
                              <SelectItem value="pending" disabled>
                                Pendiente
                              </SelectItem>
                            )}
                            <SelectItem value="active">Activo</SelectItem>
                            <SelectItem value="inactive">Inactivo</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(rolesByUser[p.id] ?? []).length === 0 ? (
                            <span className="text-xs text-muted-foreground">Sin rol</span>
                          ) : (
                            rolesByUser[p.id].map((r) => (
                              <Badge key={r} variant="secondary" className="gap-1">
                                {r}
                                <button
                                  onClick={() => removeRole(p.id, r)}
                                  className="hover:text-destructive"
                                  aria-label={`Quitar rol ${r}`}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Select
                            value={roleDraft[p.id] ?? ""}
                            onValueChange={(v) =>
                              setRoleDraft({ ...roleDraft, [p.id]: v as AppRole })
                            }
                          >
                            <SelectTrigger className="w-32 h-8 text-xs">
                              <SelectValue placeholder="Rol..." />
                            </SelectTrigger>
                            <SelectContent>
                              {roleOptions
                                .filter((r) => !rolesByUser[p.id]?.includes(r))
                                .map((r) => (
                                  <SelectItem key={r} value={r}>
                                    {r}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addRole(p.id)}
                            disabled={!roleDraft[p.id]}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}