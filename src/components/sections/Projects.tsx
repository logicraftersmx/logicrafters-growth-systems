import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const projects = [
  {
    name: "Almena Inmobiliaria",
    url: "https://almenainmoviliaria.online/",
    tag: { es: "Bienes raíces premium", en: "Premium real estate" },
    desc: {
      es: "Plataforma editorial para propiedades de excepción con buscador avanzado y portal de agentes.",
      en: "Editorial platform for exceptional properties with advanced search and agent portal.",
    },
    accent: "from-[#0b1f3a] to-[#d4a14a]",
  },
  {
    name: "Abarrotes Chalía",
    url: "https://abarroteschalia.online/",
    tag: { es: "E-commerce local", en: "Local e-commerce" },
    desc: {
      es: "Tienda en línea con catálogo, carrito y entrega local para una abarrotería en Rayón, S.L.P.",
      en: "Online store with catalog, cart and local delivery for a grocery shop in Rayón, S.L.P.",
    },
    accent: "from-[#e63946] to-[#a8d05a]",
  },
];

export const Projects = () => {
  const { t, lang } = useLang();
  return (
    <section id="proyectos" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-glow opacity-40 pointer-events-none" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" /> {t("projects.tag")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("projects.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("projects.desc")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((p, i) => (
            <motion.a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-3xl overflow-hidden border border-border bg-card shadow-card hover:shadow-elegant transition-all"
            >
              <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${p.accent}`}>
                <iframe
                  src={p.url}
                  title={p.name}
                  loading="lazy"
                  className="absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none border-0"
                  sandbox="allow-same-origin"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                      {p.tag[lang]}
                    </span>
                    <h3 className="text-2xl font-bold mt-1">{p.name}</h3>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{p.desc[lang]}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary">
                  {t("projects.visit")} <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};