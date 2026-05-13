import { motion } from "framer-motion";
import { Search, Lightbulb, Code, Rocket } from "lucide-react";

const steps = [
  { n: "01", icon: Search, title: "Diagnóstico", desc: "Entendemos tu negocio, tus dolores y tus metas. Identificamos qué te está frenando y qué oportunidades estás dejando ir.", color: "from-secondary to-secondary/70" },
  { n: "02", icon: Lightbulb, title: "Estrategia", desc: "Diseñamos un plan a medida: qué construir, en qué orden, con qué tecnología y qué resultados esperar.", color: "from-primary to-primary-glow" },
  { n: "03", icon: Code, title: "Desarrollo", desc: "Construimos tu solución con calidad premium. Diseño profesional, código limpio y enfoque obsesivo en la experiencia.", color: "from-accent to-accent/70" },
  { n: "04", icon: Rocket, title: "Implementación", desc: "Lanzamos, capacitamos a tu equipo y damos seguimiento. No te dejamos solo: ajustamos hasta que funcione perfecto.", color: "from-secondary to-primary" },
];

export const Process = () => (
  <section id="proceso" className="py-24 md:py-32 bg-[hsl(var(--navy))] text-white relative overflow-hidden">
    <div className="absolute inset-0 grid-pattern opacity-40" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl" />
    <div className="container relative">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-4">Cómo funciona</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Un proceso claro,<br /> <span className="text-gradient-orange">resultados predecibles</span>.
        </h2>
        <p className="text-lg text-white/70">Sin sorpresas, sin "ya casi". Un método probado en 4 fases.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative p-7 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/20 transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-lg`}>
              <s.icon className="w-7 h-7 text-white" />
            </div>
            <div className="text-5xl font-extrabold text-white/10 absolute top-5 right-5">{s.n}</div>
            <h3 className="text-xl font-bold mb-3">{s.title}</h3>
            <p className="text-sm text-white/65 leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
