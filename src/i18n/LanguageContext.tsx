import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "es" | "en";

type Dict = Record<string, { es: string; en: string }>;

export const dict: Dict = {
  "nav.problem": { es: "Problema", en: "Problem" },
  "nav.solution": { es: "Solución", en: "Solution" },
  "nav.process": { es: "Proceso", en: "Process" },
  "nav.services": { es: "Servicios", en: "Services" },
  "nav.projects": { es: "Proyectos", en: "Projects" },
  "nav.faq": { es: "FAQ", en: "FAQ" },
  "nav.cta": { es: "Agendar diagnóstico", en: "Book a diagnosis" },
  "hero.badge": { es: "Soluciones digitales a la medida — no plantillas", en: "Custom digital solutions — never templates" },
  "hero.title1": { es: "Convierte tu negocio en una", en: "Turn your business into an automated" },
  "hero.title2": { es: "máquina de ventas", en: "sales machine" },
  "hero.title3": { es: "automatizada.", en: "." },
  "hero.desc": {
    es: "Diseñamos y desarrollamos sistemas digitales que organizan tu operación, atraen más clientes y multiplican tus ingresos. Sin plantillas. Sin improvisaciones.",
    en: "We design and build digital systems that organize your operations, attract more customers and multiply your revenue. No templates. No improvisation.",
  },
  "hero.ctaPrimary": { es: "Agendar diagnóstico gratis", en: "Book a free diagnosis" },
  "hero.ctaWhatsapp": { es: "Hablar por WhatsApp", en: "Chat on WhatsApp" },
  "hero.bullet1": { es: "✓ Diagnóstico sin costo", en: "✓ Free diagnosis" },
  "hero.bullet2": { es: "✓ Respuesta en 24 hrs", en: "✓ 24h response" },
  "hero.bullet3": { es: "✓ Soluciones escalables", en: "✓ Scalable solutions" },
  "projects.tag": { es: "Proyectos recientes", en: "Recent projects" },
  "projects.title": { es: "Sistemas hechos a la medida", en: "Custom-built systems" },
  "projects.desc": {
    es: "Cada proyecto es único: diseñado, desarrollado y desplegado por nuestro equipo para resolver problemas reales de negocio.",
    en: "Every project is unique: designed, developed and deployed by our team to solve real business problems.",
  },
  "projects.visit": { es: "Visitar sitio", en: "Visit site" },
  "footer.tagline": {
    es: "Construimos sistemas digitales que hacen crecer negocios reales en México.",
    en: "We build digital systems that grow real businesses in Mexico.",
  },
  "footer.access": { es: "Acceso interno", en: "Staff access" },
  "footer.rights": { es: "Todos los derechos reservados.", en: "All rights reserved." },
  "footer.made": { es: "Hecho con obsesión por los detalles 🇲🇽", en: "Built with obsession for detail 🇲🇽" },
};

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (key: keyof typeof dict) => string; }
const LanguageContext = createContext<Ctx | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "es");
  useEffect(() => { localStorage.setItem("lang", lang); document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => setLangState(l);
  const t = (key: keyof typeof dict) => dict[key]?.[lang] ?? String(key);
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};