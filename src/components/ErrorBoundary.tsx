import { Component, ReactNode } from "react";
import { ServerCrash } from "lucide-react";
import { ErrorScreen } from "./ErrorScreen";

interface State { error: Error | null; }

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error("App error boundary caught:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorScreen
          code="500"
          title="Algo salió mal"
          description="Ocurrió un error inesperado en la aplicación. Intenta recargar la página o vuelve al inicio."
          Icon={ServerCrash}
          showReload
          detail={this.state.error.message}
        />
      );
    }
    return this.props.children;
  }
}