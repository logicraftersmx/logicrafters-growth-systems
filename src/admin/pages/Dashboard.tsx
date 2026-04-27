import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, UserPlus, Briefcase, Loader2 } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";

interface Stats {
  totalClients: number;
  activeClients: number;
  prospects: number;
  potentialValue: number;
}

export default function Dashboard() {
  const { user, roles } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("status, potential_value");
      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }
      const totalClients = data.length;
      const activeClients = data.filter((c) => c.status === "active").length;
      const prospects = data.filter(
        (c) => c.status === "prospect" || c.status === "lead"
      ).length;
      const potentialValue = data.reduce(
        (sum, c) => sum + Number(c.potential_value || 0),
        0
      );
      setStats({ totalClients, activeClients, prospects, potentialValue });
      setLoading(false);
    };
    load();
  }, []);

  const cards = [
    {
      label: "Clientes totales",
      value: stats?.totalClients ?? 0,
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Clientes activos",
      value: stats?.activeClients ?? 0,
      icon: Briefcase,
      color: "text-success",
    },
    {
      label: "Prospectos / Leads",
      value: stats?.prospects ?? 0,
      icon: UserPlus,
      color: "text-blue-500",
    },
    {
      label: "Valor potencial",
      value: new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        maximumFractionDigits: 0,
      }).format(stats?.potentialValue ?? 0),
      icon: TrendingUp,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Hola{user?.email ? `, ${user.email.split("@")[0]}` : ""} 👋
        </h1>
        <p className="text-muted-foreground">
          Resumen del estado actual del negocio.
          {roles.length > 0 && (
            <span className="ml-2 text-xs uppercase tracking-wide">
              · {roles.join(" · ")}
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {c.label}
              </CardTitle>
              <c.icon className={`h-4 w-4 ${c.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : c.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximos módulos</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-lg border border-dashed border-border">
            <p className="font-medium">📋 Proyectos (Kanban)</p>
            <p className="text-muted-foreground mt-1">
              Tablero por fases con tareas y responsables.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-dashed border-border">
            <p className="font-medium">💰 Facturación</p>
            <p className="text-muted-foreground mt-1">
              Cotizaciones, facturas, pagos e ingresos.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-dashed border-border">
            <p className="font-medium">🌐 Portal del cliente</p>
            <p className="text-muted-foreground mt-1">
              Acceso para que tus clientes vean su proyecto.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}