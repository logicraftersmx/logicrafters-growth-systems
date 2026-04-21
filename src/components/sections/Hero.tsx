import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import dashboard from "@/assets/dashboard-mockup.png";

export const Hero = () => (
  <section id="top" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-hero">
    <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen" width={1920} height={1280} />
    <div className="absolute inset-0 grid-pattern opacity-60" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

    <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 text-secondary" />
          Soluciones digitales a la medida — no plantillas
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
          Convierte tu negocio en una <span className="text-gradient-orange">máquina de ventas</span> automatizada.
        </h1>
        <p className="text-lg md:text-xl text-white/75 mb-10 max-w-xl leading-relaxed">
          Diseñamos y desarrollamos sistemas digitales que organizan tu operación, atraen más clientes y multiplican tus ingresos. Sin plantillas. Sin improvisaciones.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="hero" size="xl" asChild>
            <a href="#contacto">Agendar diagnóstico gratis <ArrowRight className="w-5 h-5" /></a>
          </Button>
          <Button variant="outlineLight" size="xl" asChild>
            <a href="https://w.app/l6zsyx" target="_blank" rel="noopener">
              <MessageCircle className="w-5 h-5" /> Hablar por WhatsApp
            </a>
          </Button>
        </div>
        <div className="flex flex-wrap gap-6 mt-10 text-white/60 text-sm">
          <div>✓ Diagnóstico sin costo</div>
          <div>✓ Respuesta en 24 hrs</div>
          <div>✓ Soluciones escalables</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative hidden lg:block"
      >
        <div className="absolute -inset-10 bg-glow blur-3xl" />
        <img
          src={dashboard}
          alt="Sistema personalizado de Logicrafters MX"
          width={1280}
          height={960}
          className="relative w-full drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
        />
      </motion.div>
    </div>
  </section>
);
