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

  // Problem
  "prob.tag": { es: "El problema real", en: "The real problem" },
  "prob.title1": { es: "Si tu negocio funciona \"a la antigua\",", en: "If your business runs \"the old way,\"" },
  "prob.title2": { es: "está perdiendo dinero", en: "it's losing money" },
  "prob.title3": { es: "cada mes", en: "every month" },
  "prob.desc": { es: "La mayoría de negocios no fracasan por falta de clientes. Fracasan por falta de organización, datos y sistemas que les permitan escalar.", en: "Most businesses don't fail from lack of customers. They fail from lack of organization, data and systems to scale." },
  "prob.p1.title": { es: "Pierdes ventas todos los días", en: "You lose sales every day" },
  "prob.p1.desc": { es: "Clientes que te buscan en Google, Instagram o WhatsApp y nunca terminan de comprar porque no tienes un proceso claro.", en: "Customers find you on Google, Instagram or WhatsApp and never finish buying because you don't have a clear process." },
  "prob.p2.title": { es: "Vives apagando incendios", en: "You live putting out fires" },
  "prob.p2.desc": { es: "Agendas en cuadernos, cobros en notas del celular, inventario en la cabeza. Tu negocio depende 100% de ti.", en: "Schedules in notebooks, payments in phone notes, inventory in your head. Your business depends 100% on you." },
  "prob.p3.title": { es: "No sabes quiénes son tus clientes", en: "You don't know who your customers are" },
  "prob.p3.desc": { es: "No tienes datos. No sabes qué se vende, quién regresa, ni cuánto realmente ganas al mes.", en: "No data. You don't know what sells, who returns, or how much you actually make each month." },
  "prob.p4.title": { es: "Quieres crecer pero no escalas", en: "You want to grow but can't scale" },
  "prob.p4.desc": { es: "Cada nueva sucursal o producto es un caos. Sin sistema, crecer significa más estrés, no más dinero.", en: "Every new branch or product is chaos. Without a system, growing means more stress, not more money." },

  // Benefits
  "ben.tag": { es: "Lo que ganas", en: "What you gain" },
  "ben.title1": { es: "Más que tecnología.", en: "More than technology." },
  "ben.title2": { es: "Resultados reales", en: "Real results" },
  "ben.tangible": { es: "Beneficios tangibles", en: "Tangible benefits" },
  "ben.emotional": { es: "Beneficios emocionales", en: "Emotional benefits" },
  "ben.t1.title": { es: "+30-70% más ventas", en: "+30-70% more sales" },
  "ben.t1.desc": { es: "Procesos optimizados y clientes que regresan.", en: "Optimized processes and returning customers." },
  "ben.t2.title": { es: "Recupera 15+ horas/semana", en: "Recover 15+ hours/week" },
  "ben.t2.desc": { es: "Automatiza tareas repetitivas y enfócate en crecer.", en: "Automate repetitive tasks and focus on growth." },
  "ben.t3.title": { es: "Decisiones con datos reales", en: "Decisions backed by real data" },
  "ben.t3.desc": { es: "Sabes exactamente qué funciona y qué no.", en: "You know exactly what works and what doesn't." },
  "ben.e1.title": { es: "Tranquilidad total", en: "Total peace of mind" },
  "ben.e1.desc": { es: "Tu negocio funciona aunque tú no estés.", en: "Your business runs even when you're not there." },
  "ben.e2.title": { es: "Recupera tu tiempo", en: "Reclaim your time" },
  "ben.e2.desc": { es: "Vuelve a disfrutar tu vida, no solo trabajar en ella.", en: "Enjoy your life again, not just work in it." },
  "ben.e3.title": { es: "Listo para escalar", en: "Ready to scale" },
  "ben.e3.desc": { es: "Abre nuevas sucursales sin perder el control.", en: "Open new branches without losing control." },

  // Process
  "proc.tag": { es: "Cómo funciona", en: "How it works" },
  "proc.title1": { es: "Un proceso claro,", en: "A clear process," },
  "proc.title2": { es: "resultados predecibles", en: "predictable results" },
  "proc.desc": { es: "Sin sorpresas, sin \"ya casi\". Un método probado en 4 fases.", en: "No surprises, no \"almost there.\" A proven 4-phase method." },
  "proc.s1.title": { es: "Diagnóstico", en: "Diagnosis" },
  "proc.s1.desc": { es: "Entendemos tu negocio, tus dolores y tus metas. Identificamos qué te está frenando y qué oportunidades estás dejando ir.", en: "We understand your business, pains and goals. We identify what's holding you back and what opportunities you're missing." },
  "proc.s2.title": { es: "Estrategia", en: "Strategy" },
  "proc.s2.desc": { es: "Diseñamos un plan a medida: qué construir, en qué orden, con qué tecnología y qué resultados esperar.", en: "We design a custom plan: what to build, in what order, with what technology and what results to expect." },
  "proc.s3.title": { es: "Desarrollo", en: "Development" },
  "proc.s3.desc": { es: "Construimos tu solución con calidad premium. Diseño profesional, código limpio y enfoque obsesivo en la experiencia.", en: "We build your solution with premium quality. Professional design, clean code and an obsessive focus on experience." },
  "proc.s4.title": { es: "Implementación", en: "Implementation" },
  "proc.s4.desc": { es: "Lanzamos, capacitamos a tu equipo y damos seguimiento. No te dejamos solo: ajustamos hasta que funcione perfecto.", en: "We launch, train your team and follow up. We don't leave you alone — we tune it until it works perfectly." },

  // FAQ
  "faq.tag": { es: "Preguntas frecuentes", en: "Frequently asked questions" },
  "faq.title1": { es: "Resolvemos tus", en: "We answer your" },
  "faq.title2": { es: "dudas", en: "questions" },
  "faq.q1": { es: "¿Cuánto cuesta una solución de Logicrafters?", en: "How much does a Logicrafters solution cost?" },
  "faq.a1": { es: "Cada proyecto es único, por eso no manejamos precios fijos. Después del diagnóstico gratuito, te entregamos una propuesta clara con alcance, tiempos e inversión. La mayoría de nuestros clientes recupera la inversión en los primeros 3-6 meses gracias al aumento en ventas y ahorro de tiempo.", en: "Every project is unique, so we don't have fixed pricing. After the free diagnosis, we deliver a clear proposal with scope, timeline and investment. Most clients recover their investment in the first 3-6 months through increased sales and time savings." },
  "faq.q2": { es: "¿Cuánto tiempo tarda en estar listo?", en: "How long does it take to be ready?" },
  "faq.a2": { es: "Depende del alcance. Un sistema básico está en 4-6 semanas. Una solución integral (web + app + sistema interno) toma entre 8 y 12 semanas. Trabajamos por fases para que empieces a ver resultados desde el primer mes.", en: "It depends on scope. A basic system takes 4-6 weeks. A full solution (web + app + internal system) takes 8 to 12 weeks. We work in phases so you see results from month one." },
  "faq.q3": { es: "¿Qué pasa si no soy bueno con la tecnología?", en: "What if I'm not good with technology?" },
  "faq.a3": { es: "Justamente por eso existimos. Diseñamos todo pensado en personas que no son técnicas. Te capacitamos paso a paso a ti y a tu equipo, y te acompañamos hasta que el sistema sea parte natural de tu operación.", en: "That's exactly why we exist. We design everything for non-technical people. We train you and your team step by step until the system becomes a natural part of your operation." },
  "faq.q4": { es: "¿Realmente voy a vender más?", en: "Will I really sell more?" },
  "faq.a4": { es: "Sí — siempre y cuando implementes lo que diseñamos. Nuestros clientes reportan entre 30% y 70% más ventas en los primeros 6 meses. No es magia: es estrategia + sistemas + ejecución.", en: "Yes — as long as you implement what we design. Our clients report between 30% and 70% more sales in the first 6 months. It's not magic: it's strategy + systems + execution." },
  "faq.q5": { es: "¿Soy un negocio pequeño, esto es para mí?", en: "I'm a small business, is this for me?" },
  "faq.a5": { es: "Sí. De hecho, los negocios pequeños son los que más rápido transforman su operación. Diseñamos soluciones escalables: empezamos con lo esencial y crecemos contigo.", en: "Yes. In fact, small businesses transform fastest. We design scalable solutions: we start with the essentials and grow with you." },
  "faq.q6": { es: "¿Por qué no usar una plantilla o sistema ya hecho?", en: "Why not use a template or off-the-shelf system?" },
  "faq.a6": { es: "Las plantillas resuelven problemas genéricos y tu negocio no es genérico. Te terminas adaptando tú al sistema, en lugar de que el sistema se adapte a ti. Eso te cuesta tiempo, dinero y ventas.", en: "Templates solve generic problems, and your business isn't generic. You end up adapting to the system instead of the system adapting to you. That costs time, money and sales." },
  "faq.q7": { es: "¿Qué pasa después del lanzamiento?", en: "What happens after launch?" },
  "faq.a7": { es: "Te damos soporte continuo, mejoras y monitoreo. No te dejamos solo. Ofrecemos planes de mantenimiento mensuales para que tu sistema evolucione con tu negocio.", en: "We provide ongoing support, improvements and monitoring. We don't leave you alone. We offer monthly maintenance plans so your system evolves with your business." },

  // CTA
  "cta.tag": { es: "Tu próximo paso", en: "Your next step" },
  "cta.title1": { es: "Deja de perder dinero.", en: "Stop losing money." },
  "cta.title2": { es: "Empieza hoy", en: "Start today" },
  "cta.desc": { es: "Agenda un diagnóstico gratuito de 30 minutos. Te decimos exactamente qué te está frenando y cómo solucionarlo. Sin compromiso.", en: "Book a free 30-minute diagnosis. We tell you exactly what's holding you back and how to fix it. No commitment." },
  "cta.wa": { es: "WhatsApp directo", en: "Direct WhatsApp" },
  "cta.email": { es: "Correo", en: "Email" },
  "cta.formTitle": { es: "Diagnóstico gratis", en: "Free diagnosis" },
  "cta.formSub": { es: "Te respondemos en menos de 24 horas.", en: "We reply in under 24 hours." },
  "cta.fName": { es: "Nombre", en: "Name" },
  "cta.fNamePh": { es: "Tu nombre", en: "Your name" },
  "cta.fWa": { es: "WhatsApp", en: "WhatsApp" },
  "cta.fBiz": { es: "¿De qué es tu negocio?", en: "What's your business about?" },
  "cta.fBizPh": { es: "Barbería, estética, tienda…", en: "Barbershop, salon, shop…" },
  "cta.fMsg": { es: "Cuéntanos brevemente (opcional)", en: "Tell us briefly (optional)" },
  "cta.fMsgPh": { es: "¿Qué problema quieres resolver?", en: "What problem do you want to solve?" },
  "cta.submit": { es: "Quiero mi diagnóstico", en: "Get my diagnosis" },
  "cta.sending": { es: "Enviando...", en: "Sending..." },
  "cta.privacy": { es: "🔒 Tu información es 100% confidencial", en: "🔒 Your information is 100% confidential" },
  "cta.toast": { es: "¡Listo! Te contactamos en menos de 24 horas.", en: "Done! We'll contact you within 24 hours." },
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