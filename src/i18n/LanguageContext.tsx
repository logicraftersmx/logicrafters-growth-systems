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

  // Solution section
  "sol.tag": { es: "La solución", en: "The solution" },
  "sol.title1": { es: "No vendemos páginas web.", en: "We don't sell websites." },
  "sol.title2": { es: "Construimos", en: "We build" },
  "sol.title3": { es: "sistemas que hacen crecer tu negocio", en: "systems that grow your business" },
  "sol.desc": {
    es: "Analizamos tu operación y diseñamos una solución integral: web + app + sistema interno + automatización. Todo conectado, todo a tu medida.",
    en: "We analyze your operations and design an integrated solution: web + app + internal system + automation. All connected, all custom.",
  },
  "sol.p1.title": { es: "Sitio web que vende", en: "A website that sells" },
  "sol.p1.desc": { es: "No un folleto digital. Un sitio diseñado para captar leads y convertirlos en clientes 24/7.", en: "Not a digital brochure. A site built to capture leads and convert them 24/7." },
  "sol.p2.title": { es: "App móvil a tu medida", en: "Custom mobile app" },
  "sol.p2.desc": { es: "Para tus clientes, tu equipo o tu operación. Pensada para tu modelo de negocio, no genérica.", en: "For your customers, team or operations. Designed for your business model — never generic." },
  "sol.p3.title": { es: "Sistema de gestión", en: "Management system" },
  "sol.p3.desc": { es: "Agenda, inventario, cobros, clientes, reportes. Todo en un solo lugar, accesible desde cualquier dispositivo.", en: "Scheduling, inventory, billing, customers, reports. All in one place, on any device." },
  "sol.p4.title": { es: "Automatizaciones", en: "Automations" },
  "sol.p4.desc": { es: "Recordatorios, confirmaciones, facturación, marketing. Que el sistema haga lo aburrido por ti.", en: "Reminders, confirmations, invoicing, marketing. Let the system handle the boring stuff." },

  // Offer section
  "offer.tag": { es: "Qué incluye", en: "What's included" },
  "offer.title1": { es: "Una solución", en: "A" },
  "offer.title2": { es: "completa", en: "complete" },
  "offer.title3": { es: ", no piezas sueltas.", en: " solution — not loose pieces." },
  "offer.desc": { es: "Pagas una vez por una infraestructura digital que te genera resultados durante años.", en: "Pay once for a digital infrastructure that delivers results for years." },
  "offer.badge": { es: "Solución integral Logicrafters", en: "Logicrafters integrated solution" },
  "offer.cardTitle": { es: "Sistema digital a la medida", en: "Custom digital system" },
  "offer.cardSub": { es: "Diseñado para tu negocio, tu industria y tus metas.", en: "Designed for your business, industry and goals." },
  "offer.invest": { es: "Inversión personalizada según el alcance de tu proyecto", en: "Custom pricing based on your project scope" },
  "offer.cta": { es: "Quiero mi diagnóstico gratis", en: "Get my free diagnosis" },
  "offer.note": { es: "⚡ Cupos limitados cada mes — atendemos solo proyectos que podemos garantizar", en: "⚡ Limited slots each month — we only take projects we can guarantee" },
  "offer.i1": { es: "Diagnóstico completo de tu negocio (sin costo)", en: "Complete business diagnosis (free)" },
  "offer.i2": { es: "Estrategia digital personalizada por escrito", en: "Written, personalized digital strategy" },
  "offer.i3": { es: "Diseño UX/UI premium a la medida (no plantillas)", en: "Premium custom UX/UI design (no templates)" },
  "offer.i4": { es: "Desarrollo web responsive y optimizado", en: "Responsive, optimized web development" },
  "offer.i5": { es: "App móvil nativa o PWA según tu modelo", en: "Native mobile app or PWA per your model" },
  "offer.i6": { es: "Sistema de gestión interno (CRM, agenda, inventario)", en: "Internal management system (CRM, scheduling, inventory)" },
  "offer.i7": { es: "Integraciones (WhatsApp, pagos, facturación, Google)", en: "Integrations (WhatsApp, payments, invoicing, Google)" },
  "offer.i8": { es: "Automatizaciones de marketing y operación", en: "Marketing and operations automation" },
  "offer.i9": { es: "Capacitación a tu equipo paso a paso", en: "Step-by-step team training" },
  "offer.i10": { es: "Soporte técnico y mejoras continuas", en: "Technical support and continuous improvements" },

  // Social proof
  "sp.tag": { es: "Experiencia y resultados reales", en: "Experience and real results" },
  "sp.title1": { es: "Hemos colaborado con", en: "We've worked with" },
  "sp.title2": { es: "marcas que exigen excelencia", en: "brands that demand excellence" },
  "sp.desc": { es: "Desde corporativos hasta negocios locales, llevamos cada proyecto con el mismo estándar.", en: "From corporations to local businesses, every project gets the same standard." },
  "sp.workedFor": { es: "He trabajado para", en: "I have worked for" },
  "sp.before": { es: "Antes", en: "Before" },
  "sp.after": { es: "Después", en: "After" },
  "sp.c1.industry": { es: "Bienes raíces", en: "Real estate" },
  "sp.c1.before": { es: "Propiedades en hojas de cálculo, leads dispersos en WhatsApp y sin presencia digital seria.", en: "Properties in spreadsheets, leads scattered across WhatsApp and no serious digital presence." },
  "sp.c1.after": { es: "Sitio editorial premium, buscador avanzado y portal de agentes — leads centralizados.", en: "Premium editorial site, advanced search and agent portal — centralized leads." },
  "sp.c1.quote": { es: "Logicrafters entendió el lenguaje del lujo. El sitio nos posicionó como referente y los clientes llegan listos para cerrar.", en: "Logicrafters understood the language of luxury. The site positioned us as a benchmark and clients arrive ready to close." },
  "sp.c2.industry": { es: "Abarrotes / Retail", en: "Grocery / Retail" },
  "sp.c2.before": { es: "Ventas solo de mostrador, sin catálogo digital ni forma de recibir pedidos a distancia.", en: "Counter-only sales, no digital catalog and no way to take remote orders." },
  "sp.c2.after": { es: "Tienda en línea con catálogo, carrito y entrega local — pedidos 24/7.", en: "Online store with catalog, cart and local delivery — 24/7 orders." },
  "sp.c2.quote": { es: "Pasamos de vender solo en el local a recibir pedidos por internet todos los días. La inversión se pagó en semanas.", en: "We went from selling only in-store to receiving online orders every day. The investment paid off in weeks." },
  "sp.c3.industry": { es: "Industria automotriz", en: "Automotive industry" },
  "sp.c3.before": { es: "Procesos internos manuales, reportes en Excel y comunicación dispersa entre áreas.", en: "Manual internal processes, Excel reports and scattered communication across teams." },
  "sp.c3.after": { es: "Tableros y automatizaciones a medida que aceleran la operación diaria.", en: "Custom dashboards and automations that speed up daily operations." },
  "sp.c3.quote": { es: "Gente con criterio técnico y de negocio. Entregaron exactamente lo que necesitábamos, en tiempo y forma.", en: "People with both technical and business judgment. They delivered exactly what we needed, on time." },
  "sp.s1": { es: "Negocios transformados", en: "Businesses transformed" },
  "sp.s2": { es: "Ventas en promedio", en: "Average sales lift" },
  "sp.s3": { es: "Recuperadas por semana", en: "Recovered per week" },
  "sp.s4": { es: "Clientes satisfechos", en: "Happy clients" },
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