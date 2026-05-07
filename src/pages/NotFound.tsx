import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Compass } from "lucide-react";
import { ErrorScreen } from "@/components/ErrorScreen";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: ruta inexistente:", location.pathname);
  }, [location.pathname]);

  return (
    <ErrorScreen
      code="404"
      title="Página no encontrada"
      description="La dirección que buscas no existe o fue movida. Verifica el enlace o vuelve al inicio."
      Icon={Compass}
      detail={location.pathname}
    />
  );
};

export default NotFound;
