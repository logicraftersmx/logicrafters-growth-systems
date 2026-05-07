import { motion } from "framer-motion";
import { AlertTriangle, Clock, TrendingDown, Users } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export const Problem = () => {
  const { t } = useLang();
  const pains = [
    { icon: TrendingDown, title: t("prob.p1.title"), desc: t("prob.p1.desc") },
    { icon: Clock, title: t("prob.p2.title"), desc: t("prob.p2.desc") },
    { icon: Users, title: t("prob.p3.title"), desc: t("prob.p3.desc") },
    { icon: AlertTriangle, title: t("prob.p4.title"), desc: t("prob.p4.desc") },
  ];
  return (
  <section id="problema" className="py-24 md:py-32 bg-background">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-semibold mb-4">{t("prob.tag")}</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {t("prob.title1")}<br /> {t("prob.title2")} <span className="text-destructive">{t("prob.title3")}</span>.
        </h2>
        <p className="text-lg text-muted-foreground">{t("prob.desc")}</p>
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
};
