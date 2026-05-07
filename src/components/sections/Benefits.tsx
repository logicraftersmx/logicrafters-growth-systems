import { motion } from "framer-motion";
import { TrendingUp, Clock, BarChart3, Shield, Heart, Rocket } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

type Item = { icon: typeof TrendingUp; title: string; desc: string };

const Block = ({ items, label }: { items: Item[]; label: string }) => (
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

export const Benefits = () => {
  const { t } = useLang();
  const tangible: Item[] = [
    { icon: TrendingUp, title: t("ben.t1.title"), desc: t("ben.t1.desc") },
    { icon: Clock, title: t("ben.t2.title"), desc: t("ben.t2.desc") },
    { icon: BarChart3, title: t("ben.t3.title"), desc: t("ben.t3.desc") },
  ];
  const emotional: Item[] = [
    { icon: Shield, title: t("ben.e1.title"), desc: t("ben.e1.desc") },
    { icon: Heart, title: t("ben.e2.title"), desc: t("ben.e2.desc") },
    { icon: Rocket, title: t("ben.e3.title"), desc: t("ben.e3.desc") },
  ];
  return (
  <section id="beneficios" className="py-24 md:py-32 bg-background">
    <div className="container">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-semibold mb-4">{t("ben.tag")}</span>
        <h2 className="text-4xl md:text-5xl font-bold">
          {t("ben.title1")} <span className="text-gradient-brand">{t("ben.title2")}</span>.
        </h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <Block items={tangible} label={t("ben.tangible")} />
        <Block items={emotional} label={t("ben.emotional")} />
      </div>
    </div>
  </section>
  );
};
