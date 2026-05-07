import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import logoInbursa from "@/assets/logo-inbursa.svg";
import logoTagPase from "@/assets/logo-tagpase.jpg";
import logoMidori from "@/assets/logo-midori.webp";

const partners = [
  { name: "Inbursa", logo: logoInbursa },
  { name: "TAG Pase", logo: logoTagPase },
  { name: "Midori Auto Leather", logo: logoMidori },
];

export const SocialProof = () => {
  const { t } = useLang();
  const cases = [
    { industry: t("sp.c1.industry"), before: t("sp.c1.before"), after: t("sp.c1.after"), quote: t("sp.c1.quote"), author: "Equipo Almena", role: "Almena Inmobiliaria" },
    { industry: t("sp.c2.industry"), before: t("sp.c2.before"), after: t("sp.c2.after"), quote: t("sp.c2.quote"), author: "Familia Chalía", role: "Abarrotes Chalía, Rayón S.L.P." },
    { industry: t("sp.c3.industry"), before: t("sp.c3.before"), after: t("sp.c3.after"), quote: t("sp.c3.quote"), author: "Área de Sistemas", role: "Proyecto para Midori Auto Leather" },
  ];
  return (
  <section className="py-24 md:py-32 bg-background">
    <div className="container">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-semibold mb-4">{t("sp.tag")}</span>
        <h2 className="text-4xl md:text-5xl font-bold">
          {t("sp.title1")} <span className="text-gradient-brand">{t("sp.title2")}</span>.
        </h2>
        <p className="text-lg text-muted-foreground mt-4">{t("sp.desc")}</p>
      </div>

      <div className="max-w-5xl mx-auto mb-20">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
          {t("sp.workedFor")}
        </p>
        <div className="grid grid-cols-3 gap-6 md:gap-12 items-center">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center p-6 rounded-2xl bg-card border border-border hover:shadow-elegant transition-all dark:bg-white/95"
            >
              <img
                src={p.logo}
                alt={`Logo ${p.name}`}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-12 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
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
                <div className="text-xs font-bold text-destructive uppercase tracking-wider mb-1">{t("sp.before")}</div>
                <p className="text-sm text-foreground/80">{c.before}</p>
              </div>
              <div className="flex justify-center text-muted-foreground"><ArrowRight className="w-4 h-4" /></div>
              <div className="p-3 rounded-lg bg-accent/10 border-l-2 border-accent">
                <div className="text-xs font-bold text-accent-foreground uppercase tracking-wider mb-1">{t("sp.after")}</div>
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
          { n: "50+", l: t("sp.s1") },
          { n: "+65%", l: t("sp.s2") },
          { n: "15h", l: t("sp.s3") },
          { n: "98%", l: t("sp.s4") },
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
};
