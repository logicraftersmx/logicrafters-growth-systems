import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ServerError from "./pages/ServerError.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AuthProvider } from "./admin/auth/AuthProvider";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ThemeProvider } from "./theme/ThemeContext";
import { ProtectedRoute } from "./admin/auth/ProtectedRoute";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminAuth from "./admin/pages/AdminAuth";
import ResetPassword from "./admin/pages/ResetPassword";
import Invite from "./admin/pages/Invite";
import Unauthorized from "./admin/pages/Unauthorized";
import Dashboard from "./admin/pages/Dashboard";
import Clients from "./admin/pages/Clients";
import Team from "./admin/pages/Team";
import Leads from "./admin/pages/Leads";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ThemeProvider>
        <LanguageProvider>
        <AuthProvider>
          <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/admin/reset-password" element={<ResetPassword />} />
            <Route path="/admin/invite" element={<Invite />} />
            <Route path="/admin/unauthorized" element={<Unauthorized />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="clients" element={<Clients />} />
              <Route path="leads" element={<Leads />} />
              <Route
                path="team"
                element={
                  <ProtectedRoute allow={["admin"]}>
                    <Team />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/500" element={<ServerError />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </ErrorBoundary>
        </AuthProvider>
        </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
