import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, RefreshCw, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorScreenProps {
  code: string;
  title: string;
  description: string;
  Icon?: LucideIcon;
  showReload?: boolean;
  detail?: string;
}

export const ErrorScreen = ({
  code,
  title,
  description,
  Icon,
  showReload = false,
  detail,
}: ErrorScreenProps) => (
  <main className="relative min-h-screen flex items-center justify-center bg-hero text-white overflow-hidden px-4">
    <div className="absolute inset-0 grid-pattern opacity-30" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-secondary/20 rounded-full blur-3xl" />

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 max-w-xl w-full text-center"
    >
      {Icon && (
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
          <Icon className="w-8 h-8 text-secondary" />
        </div>
      )}
      <p className="text-[8rem] md:text-[10rem] font-extrabold leading-none text-gradient-orange">
        {code}
      </p>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{title}</h1>
      <p className="text-base md:text-lg text-white/70 mb-8">{description}</p>

      {detail && (
        <p className="text-xs text-white/40 mb-6 font-mono break-all">{detail}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="hero" size="lg" asChild>
          <Link to="/"><Home className="w-4 h-4" /> Ir al inicio</Link>
        </Button>
        {showReload ? (
          <Button variant="outlineLight" size="lg" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4" /> Reintentar
          </Button>
        ) : (
          <Button variant="outlineLight" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" /> Volver atrás
          </Button>
        )}
      </div>
    </motion.div>
  </main>
);