import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";

export const Offer = () => {
  const { t } = useLang();
  const includes = [
    t("offer.i1"), t("offer.i2"), t("offer.i3"), t("offer.i4"), t("offer.i5"),
    t("offer.i6"), t("offer.i7"), t("offer.i8"), t("offer.i9"), t("offer.i10"),
  ];
  return (
  <section id="oferta" className="py-24 md:py-32 bg-muted/40 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
    <div className="container relative">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary text-sm font-semibold mb-4">{t("offer.tag")}</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {t("offer.title1")} <span className="text-gradient-orange">{t("offer.title2")}</span>{t("offer.title3")}
        </h2>
        <p className="text-lg text-muted-foreground">{t("offer.desc")}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto p-8 md:p-12 rounded-3xl bg-[image:var(--gradient-card)] border border-border shadow-elegant relative"
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-[image:var(--gradient-orange)] text-white text-xs font-bold uppercase tracking-wider shadow-glow-orange flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> {t("offer.badge")}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-center mb-2 mt-4">{t("offer.cardTitle")}</h3>
        <p className="text-center text-muted-foreground mb-8">{t("offer.cardSub")}</p>

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
          <p className="text-sm text-muted-foreground">{t("offer.invest")}</p>
          <Button variant="hero" size="xl" asChild className="w-full sm:w-auto">
            <a href="#contacto">{t("offer.cta")}</a>
          </Button>
          <p className="text-xs text-muted-foreground">{t("offer.note")}</p>
        </div>
      </motion.div>
    </div>
  </section>
  );
};
