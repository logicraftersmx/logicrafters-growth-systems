import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";

export default function Unauthorized() {
  const { signOut } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
          <ShieldAlert className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Tu cuenta aún no tiene acceso</h1>
          <p className="text-muted-foreground">
            Tu usuario existe pero un administrador todavía no te ha asignado un rol del equipo.
            Contacta a un admin para que active tu cuenta.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={signOut}>
            Cerrar sesión
          </Button>
          <Button asChild>
            <Link to="/">Ir al sitio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}