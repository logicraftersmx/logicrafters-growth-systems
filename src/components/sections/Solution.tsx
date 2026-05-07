import { motion } from "framer-motion";
import { Code2, Smartphone, Database, Zap } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export const Solution = () => {
  const { t } = useLang();
  const pillars = [
    { icon: Code2, title: t("sol.p1.title"), desc: t("sol.p1.desc") },
    { icon: Smartphone, title: t("sol.p2.title"), desc: t("sol.p2.desc") },
    { icon: Database, title: t("sol.p3.title"), desc: t("sol.p3.desc") },
    { icon: Zap, title: t("sol.p4.title"), desc: t("sol.p4.desc") },
  ];
  return (
  <section id="solucion" className="py-24 md:py-32 bg-muted/40 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
    <div className="container relative">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">{t("sol.tag")}</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {t("sol.title1")}<br /> {t("sol.title2")} <span className="text-gradient-brand">{t("sol.title3")}</span>.
        </h2>
        <p className="text-lg text-muted-foreground">{t("sol.desc")}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-7 rounded-2xl bg-card border border-border hover:shadow-elegant hover:-translate-y-2 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-2xl bg-[image:var(--gradient-brand)] text-white flex items-center justify-center mb-5 shadow-glow-blue">
              <p.icon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};
