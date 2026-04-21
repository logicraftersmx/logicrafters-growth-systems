import { motion } from "framer-motion";
import { TrendingUp, Clock, BarChart3, Shield, Heart, Rocket } from "lucide-react";

const tangible = [
  { icon: TrendingUp, title: "+30-70% más ventas", desc: "Procesos optimizados y clientes que regresan." },
  { icon: Clock, title: "Recupera 15+ horas/semana", desc: "Automatiza tareas repetitivas y enfócate en crecer." },
  { icon: BarChart3, title: "Decisiones con datos reales", desc: "Sabes exactamente qué funciona y qué no." },
];
const emotional = [
  { icon: Shield, title: "Tranquilidad total", desc: "Tu negocio funciona aunque tú no estés." },
  { icon: Heart, title: "Recupera tu tiempo", desc: "Vuelve a disfrutar tu vida, no solo trabajar en ella." },
  { icon: Rocket, title: "Listo para escalar", desc: "Abre nuevas sucursales sin perder el control." },
];

const Block = ({ items, label }: { items: typeof tangible; label: string }) => (
  <div>
    <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6">{label}</h3>
    <div className="space-y-5">
      {items.map((b, i) => (
        <motion.div
          key={b.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-4 p-5 rounded-xl bg-card border border-border hover:border-secondary/40 transition-colors"
        >
          <div className="shrink-0 w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
            <b.icon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold mb-1">{b.title}</h4>
            <p className="text-sm text-muted-foreground">{b.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export const Benefits = () => (
  <section id="beneficios" className="py-24 md:py-32 bg-background">
    <div className="container">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-semibold mb-4">Lo que ganas</span>
        <h2 className="text-4xl md:text-5xl font-bold">
          Más que tecnología. <span className="text-gradient-brand">Resultados reales</span>.
        </h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <Block items={tangible} label="Beneficios tangibles" />
        <Block items={emotional} label="Beneficios emocionales" />
      </div>
    </div>
  </section>
);
