import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const includes = [
  "Diagnóstico completo de tu negocio (sin costo)",
  "Estrategia digital personalizada por escrito",
  "Diseño UX/UI premium a la medida (no plantillas)",
  "Desarrollo web responsive y optimizado",
  "App móvil nativa o PWA según tu modelo",
  "Sistema de gestión interno (CRM, agenda, inventario)",
  "Integraciones (WhatsApp, pagos, facturación, Google)",
  "Automatizaciones de marketing y operación",
  "Capacitación a tu equipo paso a paso",
  "Soporte técnico y mejoras continuas",
];

export const Offer = () => (
  <section id="oferta" className="py-24 md:py-32 bg-muted/40 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
    <div className="container relative">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary text-sm font-semibold mb-4">Qué incluye</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Una solución <span className="text-gradient-orange">completa</span>, no piezas sueltas.
        </h2>
        <p className="text-lg text-muted-foreground">
          Pagas una vez por una infraestructura digital que te genera resultados durante años.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto p-8 md:p-12 rounded-3xl bg-[image:var(--gradient-card)] border border-border shadow-elegant relative"
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-[image:var(--gradient-orange)] text-white text-xs font-bold uppercase tracking-wider shadow-glow-orange flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Solución integral Logicrafters
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-center mb-2 mt-4">Sistema digital a la medida</h3>
        <p className="text-center text-muted-foreground mb-8">Diseñado para tu negocio, tu industria y tus metas.</p>

        <ul className="grid md:grid-cols-2 gap-3 mb-10">
          {includes.map((item) => (
            <li key={item} className="flex gap-3 items-start">
              <div className="shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center mt-0.5">
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>

        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">Inversión personalizada según el alcance de tu proyecto</p>
          <Button variant="hero" size="xl" asChild className="w-full sm:w-auto">
            <a href="#contacto">Quiero mi diagnóstico gratis</a>
          </Button>
          <p className="text-xs text-muted-foreground">⚡ Cupos limitados cada mes — atendemos solo proyectos que podemos garantizar</p>
        </div>
      </motion.div>
    </div>
  </section>
);
