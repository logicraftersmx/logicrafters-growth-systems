import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";

const cases = [
  {
    industry: "Barbería",
    before: "Agenda en cuaderno, 40% de citas perdidas, sin control de ingresos.",
    after: "App de reservas, cobros automatizados, +65% en ventas mensuales.",
    quote: "En 3 meses dupliqué clientes recurrentes y dejé de perder citas. Hoy el negocio funciona aunque yo no esté.",
    author: "Carlos M.",
    role: "Dueño, Barbería en CDMX",
  },
  {
    industry: "Estética",
    before: "Inventario desordenado, promociones sin seguimiento, equipo desinformado.",
    after: "Sistema central, app para clientas, reportes en tiempo real.",
    quote: "Por fin tengo claridad de mi negocio. Sé qué se vende, qué clientas regresan y cuánto gano de verdad.",
    author: "Lucía R.",
    role: "Fundadora, Estética Premium",
  },
  {
    industry: "Bienes raíces",
    before: "Leads en WhatsApp dispersos, propiedades en Excel, cierres lentos.",
    after: "CRM a medida, sitio con captura automática, +3x conversión.",
    quote: "El sistema convirtió mi forma caótica de trabajar en una operación profesional. Cierro 3 veces más.",
    author: "Andrea P.",
    role: "Asesora inmobiliaria",
  },
];

export const SocialProof = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-semibold mb-4">Resultados reales</span>
        <h2 className="text-4xl md:text-5xl font-bold">
          De negocios desorganizados a <span className="text-gradient-brand">operaciones imparables</span>.
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {cases.map((c, i) => (
          <motion.div
            key={c.author}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="p-7 rounded-2xl bg-[image:var(--gradient-card)] border border-border shadow-card hover:shadow-elegant transition-all"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-5">{c.industry}</div>
            <div className="space-y-3 mb-6">
              <div className="p-3 rounded-lg bg-destructive/5 border-l-2 border-destructive/40">
                <div className="text-xs font-bold text-destructive uppercase tracking-wider mb-1">Antes</div>
                <p className="text-sm text-foreground/80">{c.before}</p>
              </div>
              <div className="flex justify-center text-muted-foreground"><ArrowRight className="w-4 h-4" /></div>
              <div className="p-3 rounded-lg bg-accent/10 border-l-2 border-accent">
                <div className="text-xs font-bold text-accent-foreground uppercase tracking-wider mb-1">Después</div>
                <p className="text-sm text-foreground/80">{c.after}</p>
              </div>
            </div>
            <Quote className="w-6 h-6 text-secondary mb-2" />
            <p className="text-sm italic text-foreground/80 mb-4">"{c.quote}"</p>
            <div>
              <div className="font-bold text-sm">{c.author}</div>
              <div className="text-xs text-muted-foreground">{c.role}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20 pt-12 border-t border-border">
        {[
          { n: "50+", l: "Negocios transformados" },
          { n: "+65%", l: "Ventas en promedio" },
          { n: "15h", l: "Recuperadas por semana" },
          { n: "98%", l: "Clientes satisfechos" },
        ].map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-gradient-brand">{s.n}</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
