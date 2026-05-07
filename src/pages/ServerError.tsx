import { ServerCrash } from "lucide-react";
import { ErrorScreen } from "@/components/ErrorScreen";

const ServerError = () => (
  <ErrorScreen
    code="500"
    title="Error del servidor"
    description="Tuvimos un problema procesando tu solicitud. Por favor intenta de nuevo en unos momentos."
    Icon={ServerCrash}
    showReload
  />
);

export default ServerError;