import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth, AppRole } from "./AuthProvider";
import { Loader2 } from "lucide-react";

interface Props {
  children: ReactNode;
  allow?: AppRole[]; // if omitted, any authenticated staff
  requireStaff?: boolean;
}

export function ProtectedRoute({ children, allow, requireStaff = true }: Props) {
  const { user, loading, roles, isStaff } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/auth" state={{ from: location }} replace />;
  }

  if (allow && allow.length > 0) {
    const ok = allow.some((r) => roles.includes(r));
    if (!ok) return <Navigate to="/admin/unauthorized" replace />;
  } else if (requireStaff && !isStaff) {
    return <Navigate to="/admin/unauthorized" replace />;
  }

  return <>{children}</>;
}