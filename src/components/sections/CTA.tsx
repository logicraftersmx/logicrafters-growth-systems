import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLang } from "@/i18n/LanguageContext";

export const CTA = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useLang();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const phone = data.get("phone");
    const business = data.get("business");
    const msg = `Hola Logicrafters, soy ${name} (${phone}). Tengo un negocio de ${business} y quiero un diagnóstico.`;
    setTimeout(() => {
      window.open(`https://w.app/l6zsyx?text=${encodeURIComponent(msg)}`, "_blank");
      toast.success(t("cta.toast"));
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <section id="contacto" className="py-24 md:py-32 bg-hero text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-secondary/20 rounded-full blur-3xl" />

      <div className="container relative grid lg:grid-cols-2 gap-12 items-center max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-5">{t("cta.tag")}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            {t("cta.title1")} <span className="text-gradient-orange">{t("cta.title2")}</span>.
          </h2>
          <p className="text-lg text-white/75 mb-8">{t("cta.desc")}</p>
          <div className="space-y-4">
            <a href="https://w.app/l6zsyx" target="_blank" rel="noopener" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center"><MessageCircle className="w-5 h-5 text-white" /></div>
              <div><div className="text-sm text-white/60">{t("cta.wa")}</div><div className="font-semibold">+52 771 114 8693</div></div>
            </a>
            <a href="mailto:logicraftersmx@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center"><Mail className="w-5 h-5 text-white" /></div>
              <div><div className="text-sm text-white/60">{t("cta.email")}</div><div className="font-semibold">logicraftersmx@gmail.com</div></div>
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={onSubmit}
          className="p-8 rounded-3xl bg-white/[0.06] border border-white/15 backdrop-blur-xl shadow-elegant"
        >
          <h3 className="text-2xl font-bold mb-1">{t("cta.formTitle")}</h3>
          <p className="text-sm text-white/60 mb-6">{t("cta.formSub")}</p>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/80 mb-1.5 block">{t("cta.fName")}</label>
              <Input name="name" required placeholder={t("cta.fNamePh")} className="bg-white/5 border-white/15 text-white placeholder:text-white/40 h-12" />
            </div>
            <div>
              <label className="text-sm text-white/80 mb-1.5 block">{t("cta.fWa")}</label>
              <Input name="phone" required type="tel" placeholder="55 1234 5678" className="bg-white/5 border-white/15 text-white placeholder:text-white/40 h-12" />
            </div>
            <div>
              <label className="text-sm text-white/80 mb-1.5 block">{t("cta.fBiz")}</label>
              <Input name="business" required placeholder={t("cta.fBizPh")} className="bg-white/5 border-white/15 text-white placeholder:text-white/40 h-12" />
            </div>
            <div>
              <label className="text-sm text-white/80 mb-1.5 block">{t("cta.fMsg")}</label>
              <Textarea name="message" placeholder={t("cta.fMsgPh")} className="bg-white/5 border-white/15 text-white placeholder:text-white/40 min-h-[90px]" />
            </div>
            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
              {loading ? t("cta.sending") : <>{t("cta.submit")} <ArrowRight className="w-5 h-5" /></>}
            </Button>
            <p className="text-xs text-white/50 text-center">{t("cta.privacy")}</p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};
