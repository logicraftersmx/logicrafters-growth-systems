import { motion } from "framer-motion";
import { AlertTriangle, Clock, TrendingDown, Users } from "lucide-react";

const pains = [
  { icon: TrendingDown, title: "Pierdes ventas todos los días", desc: "Clientes que te buscan en Google, Instagram o WhatsApp y nunca terminan de comprar porque no tienes un proceso claro." },
  { icon: Clock, title: "Vives apagando incendios", desc: "Agendas en cuadernos, cobros en notas del celular, inventario en la cabeza. Tu negocio depende 100% de ti." },
  { icon: Users, title: "No sabes quiénes son tus clientes", desc: "No tienes datos. No sabes qué se vende, quién regresa, ni cuánto realmente ganas al mes." },
  { icon: AlertTriangle, title: "Quieres crecer pero no escalas", desc: "Cada nueva sucursal o producto es un caos. Sin sistema, crecer significa más estrés, no más dinero." },
];

export const Problem = () => (
  <section id="problema" className="py-24 md:py-32 bg-background">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-semibold mb-4">El problema real</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Si tu negocio funciona "a la antigua",<br /> está perdiendo dinero <span className="text-destructive">cada mes</span>.
        </h2>
        <p className="text-lg text-muted-foreground">
          La mayoría de negocios no fracasan por falta de clientes. Fracasan por falta de organización, datos y sistemas que les permitan escalar.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {pains.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-8 rounded-2xl bg-card border border-border hover:border-destructive/40 hover:shadow-card transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <p.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
