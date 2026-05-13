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
  "hero.badge": { es: "Arquitectura digital seria — sin plantillas, sin deuda técnica", en: "Serious digital architecture — no templates, no tech debt" },
  "hero.title1": { es: "Tu negocio sigue en procesos manuales.", en: "Your business still runs on manual processes." },
  "hero.title2": { es: "Lo convertimos en un sistema", en: "We turn it into a system" },
  "hero.title3": { es: "automatizado que escala.", en: "that scales." },
  "hero.desc": {
    es: "Construimos infraestructura digital: webs que convierten, apps que retienen, sistemas que automatizan. Sin atajos. Sin deuda técnica. Probado en 50+ proyectos.",
    en: "We build digital infrastructure: sites that convert, apps that retain, systems that automate. No shortcuts. No tech debt. Proven across 50+ projects.",
  },
  "hero.ctaPrimary": { es: "Diagnóstico técnico gratis", en: "Free technical diagnosis" },
  "hero.ctaWhatsapp": { es: "Hablar por WhatsApp", en: "Chat on WhatsApp" },
  "hero.bullet1": { es: "✓ Diagnóstico sin costo", en: "✓ Free diagnosis" },
  "hero.bullet2": { es: "✓ Soluciones escalables en 24-48 hrs", en: "✓ Scalable solutions in 24-48h" },
  "hero.bullet3": { es: "✓ Arquitectura que crece contigo", en: "✓ Architecture that grows with you" },
  "projects.tag": { es: "Proyectos recientes", en: "Recent projects" },
  "projects.title": { es: "50+ proyectos, mismo criterio técnico", en: "50+ projects, same technical bar" },
  "projects.desc": {
    es: "3 años entregando arquitectura limpia, código mantenible y resultados medibles. Diferentes industrias, mismo estándar profesional.",
    en: "3 years shipping clean architecture, maintainable code and measurable results. Different industries, same professional standard.",
  },
  "projects.visit": { es: "Visitar sitio", en: "Visit site" },

  // Solution section
  "sol.tag": { es: "La solución", en: "The solution" },
  "sol.title1": { es: "No hacemos webs para catálogo.", en: "We don't build catalog sites." },
  "sol.title2": { es: "Construimos", en: "We build" },
  "sol.title3": { es: "soluciones que generan ingresos", en: "solutions that generate revenue" },
  "sol.desc": {
    es: "La mayoría de sitios son estáticos: bonitos, inútiles. Analizamos tu operación real y diseñamos arquitectura integrada: web + app + backend + automatizaciones. Todo conectado. Todo medible.",
    en: "Most sites are static: pretty, useless. We analyze your real operations and design integrated architecture: web + app + backend + automations. All connected. All measurable.",
  },
  "sol.p1.title": { es: "Sitio web que convierte", en: "Website that converts" },
  "sol.p1.desc": { es: "React/Next.js, LCP <2s, arquitectura escalable a 10k visitas/día e integración con CRM. +30-70% conversión vs. webs tradicionales.", en: "React/Next.js, LCP <2s, architecture that scales to 10k visits/day and CRM integration. +30-70% conversion vs. traditional sites." },
  "sol.p2.title": { es: "App móvil nativa o RN", en: "Native or RN mobile app" },
  "sol.p2.desc": { es: "iOS nativo o React Native. Sin templates ni low-code. Sincronización offline, push, pagos seguros, geolocalización. Código limpio, testeable, mantenible.", en: "Native iOS or React Native. No templates, no low-code. Offline sync, push, secure payments, geolocation. Clean, testable, maintainable code." },
  "sol.p3.title": { es: "ERP / sistema interno", en: "ERP / internal system" },
  "sol.p3.desc": { es: "CRM, inventario, facturación y reportes en un mismo sistema. PostgreSQL normalizado, backups automáticos, escalable de 5 a 500+ usuarios.", en: "CRM, inventory, invoicing and reports in one system. Normalized PostgreSQL, automatic backups, scalable from 5 to 500+ users." },
  "sol.p4.title": { es: "Workflows y automatizaciones", en: "Workflows and automations" },
  "sol.p4.desc": { es: "WhatsApp Business API, Stripe/MercadoPago, secuencias de email, reorden automático, facturación post-pago. 15+ horas/semana ahorradas, 99.5% precisión.", en: "WhatsApp Business API, Stripe/MercadoPago, email sequences, auto reorder, post-payment invoicing. 15+ hours/week saved, 99.5% accuracy." },

  // Offer section
  "offer.tag": { es: "Qué incluye", en: "What's included" },
  "offer.title1": { es: "Solución", en: "An" },
  "offer.title2": { es: "integral", en: "integrated" },
  "offer.title3": { es: ". No módulos sueltos: un sistema coherente.", en: " solution. Not loose modules: one coherent system." },
  "offer.desc": { es: "La mayoría compra por partes: hosting aquí, CRM allá, marketing en otro lado. Todo desconectado = más problemas. Nosotros construimos el ecosistema completo.", en: "Most companies buy in pieces: hosting here, CRM there, marketing somewhere else. All disconnected = more problems. We build the complete ecosystem." },
  "offer.badge": { es: "Ecosistema digital integrado", en: "Integrated digital ecosystem" },
  "offer.cardTitle": { es: "Sistema digital a la medida", en: "Custom digital system" },
  "offer.cardSub": { es: "Web + App + Backend + Automatizaciones. Una sola infraestructura.", en: "Web + App + Backend + Automations. One single infrastructure." },
  "offer.invest": { es: "Inversión según alcance — propuesta clara después del diagnóstico", en: "Investment based on scope — clear proposal after the diagnosis" },
  "offer.cta": { es: "Quiero entender mi operación + opciones técnicas", en: "I want to understand my ops + technical options" },
  "offer.note": { es: "⚡ Cupos limitados — calidad sobre velocidad. Solo aceptamos lo que podemos entregar con estándar profesional.", en: "⚡ Limited slots — quality over speed. We only take projects we can deliver to a professional standard." },
  "offer.i1": { es: "Diagnóstico técnico: análisis de operación, mapeo y arquitectura propuesta", en: "Technical diagnosis: operations analysis, mapping and proposed architecture" },
  "offer.i2": { es: "Especificación técnica detallada + plan de testing y QA", en: "Detailed technical spec + testing and QA plan" },
  "offer.i3": { es: "UX/UI con research real (no adivinanzas) y wireframes funcionales", en: "UX/UI with real research (no guessing) and functional wireframes" },
  "offer.i4": { es: "Código limpio, testeable, documentado, versionado en Git", en: "Clean, testable, documented code versioned in Git" },
  "offer.i5": { es: "App nativa (iOS) o React Native con sincronización offline", en: "Native (iOS) or React Native app with offline sync" },
  "offer.i6": { es: "ERP a medida: CRM, inventario, facturación, dashboards", en: "Custom ERP: CRM, inventory, invoicing, dashboards" },
  "offer.i7": { es: "Integraciones: WhatsApp Business API, Stripe/MercadoPago, SAT, webhooks", en: "Integrations: WhatsApp Business API, Stripe/MercadoPago, SAT, webhooks" },
  "offer.i8": { es: "Hosting escalable (AWS/GCP), CDN, SSL, CI/CD y staging environment", en: "Scalable hosting (AWS/GCP), CDN, SSL, CI/CD and staging environment" },
  "offer.i9": { es: "Capacitación al equipo + documentación técnica completa", en: "Team training + complete technical documentation" },
  "offer.i10": { es: "SLA de soporte (respuesta en 4h), monitoreo proactivo y updates de seguridad", en: "Support SLA (4h response), proactive monitoring and security updates" },

  // Social proof
  "sp.tag": { es: "Clientes y números reales", en: "Clients and real numbers" },
  "sp.title1": { es: "Empresas de todos los tamaños,", en: "Companies of every size," },
  "sp.title2": { es: "mismo criterio técnico", en: "same technical bar" },
  "sp.desc": { es: "Desde corporativos hasta negocios locales: arquitectura escalable, código limpio y resultados medibles. No es tema de tamaño, es de criterio técnico.", en: "From corporations to local businesses: scalable architecture, clean code, measurable results. Not about size — about technical judgment." },
  "sp.workedFor": { es: "He trabajado para", en: "I have worked for" },
  "sp.before": { es: "Antes", en: "Before" },
  "sp.after": { es: "Después", en: "After" },
  "sp.c1.industry": { es: "Bienes raíces", en: "Real estate" },
  "sp.c1.before": { es: "Operación en Excel, leads dispersos entre WhatsApp y email, agentes sin portal centralizado y búsqueda de propiedades que no escalaba.", en: "Excel-based ops, leads scattered across WhatsApp and email, agents without a central portal and property search that didn't scale." },
  "sp.c1.after": { es: "Portal con buscador avanzado (Elasticsearch + Mapbox), dashboard de agentes, app móvil con sincronización offline y leads automatizados.", en: "Portal with advanced search (Elasticsearch + Mapbox), agent dashboard, mobile app with offline sync and automated leads." },
  "sp.c1.quote": { es: "Tiempo de respuesta a leads: 24h → 2h. Propiedades vendidas/mes: 3 → 8 (+166%). Reportes automáticos eliminaron 8h/semana de trabajo manual.", en: "Lead response time: 24h → 2h. Properties sold/month: 3 → 8 (+166%). Automated reports cut 8h/week of manual work." },
  "sp.c2.industry": { es: "Abarrotes / Retail", en: "Grocery / Retail" },
  "sp.c2.before": { es: "Solo venta presencial, pedidos por WhatsApp en caos, entregas locales sin seguimiento y cero automatización.", en: "Only in-person sales, chaotic WhatsApp orders, local deliveries without tracking and zero automation." },
  "sp.c2.after": { es: "E-commerce con Stripe + MercadoPago, geolocalización de repartidor, SMS transaccionales (Twilio) y dashboard en tiempo real.", en: "E-commerce with Stripe + MercadoPago, courier geolocation, transactional SMS (Twilio) and real-time dashboard." },
  "sp.c2.quote": { es: "Ventas online: $0 → $3k/mes en 3 meses. Pedidos/día: 5 → 40+ (+800%). Tasa de entrega exitosa: 92% → 99.2%.", en: "Online sales: $0 → $3k/month in 3 months. Orders/day: 5 → 40+ (+800%). Successful delivery rate: 92% → 99.2%." },
  "sp.c3.industry": { es: "Industria automotriz", en: "Automotive industry" },
  "sp.c3.before": { es: "Procesos internos manuales, reportes en Excel y comunicación dispersa entre áreas.", en: "Manual internal processes, Excel reports and scattered communication across teams." },
  "sp.c3.after": { es: "Dashboards a medida, integraciones internas y automatizaciones que aceleran la operación diaria.", en: "Custom dashboards, internal integrations and automations that speed up daily operations." },
  "sp.c3.quote": { es: "Criterio técnico y de negocio. Entregaron exactamente lo que necesitábamos, con código mantenible y arquitectura escalable.", en: "Technical and business judgment. They delivered exactly what we needed, with maintainable code and scalable architecture." },
  "sp.s1": { es: "Negocios transformados", en: "Businesses transformed" },
  "sp.s2": { es: "Ventas en promedio", en: "Average sales lift" },
  "sp.s3": { es: "Recuperadas por semana", en: "Recovered per week" },
  "sp.s4": { es: "Clientes satisfechos", en: "Happy clients" },

  // Problem
  "prob.tag": { es: "El problema real", en: "The real problem" },
  "prob.title1": { es: "Si tu operación corre en procesos manuales,", en: "If your operations run on manual processes," },
  "prob.title2": { es: "estás pagando el costo", en: "you're paying the cost" },
  "prob.title3": { es: "cada mes", en: "every month" },
  "prob.desc": { es: "La mayoría de negocios no fracasan por falta de clientes. Fracasan por falta de sistemas, datos y arquitectura técnica que les permita escalar sin colapsar.", en: "Most businesses don't fail from lack of customers. They fail from lack of systems, data and technical architecture to scale without collapsing." },
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
  "ben.title1": { es: "Tecnología seria.", en: "Serious technology." },
  "ben.title2": { es: "Beneficios medibles", en: "Measurable benefits" },
  "ben.tangible": { es: "Beneficios tangibles", en: "Tangible benefits" },
  "ben.emotional": { es: "Beneficios emocionales", en: "Emotional benefits" },
  "ben.t1.title": { es: "+30-70% más conversión", en: "+30-70% more conversion" },
  "ben.t1.desc": { es: "Mejor UX + automatización: clientes que se perdían en procesos lentos ahora cierran.", en: "Better UX + automation: customers who got lost in slow flows now close." },
  "ben.t2.title": { es: "15+ horas/semana recuperadas", en: "15+ hours/week recovered" },
  "ben.t2.desc": { es: "Tu equipo deja el trabajo manual y se enfoca en crecimiento.", en: "Your team drops manual work and focuses on growth." },
  "ben.t3.title": { es: "Decisiones con datos, no adivinanzas", en: "Data-driven decisions, no guessing" },
  "ben.t3.desc": { es: "Dashboards en tiempo real que muestran qué funciona realmente.", en: "Real-time dashboards showing what actually works." },
  "ben.e1.title": { es: "Uptime 99.9%", en: "99.9% uptime" },
  "ben.e1.desc": { es: "Sistema estable, backup automático y monitoreo 24/7. Si falla, sabemos en 5 minutos.", en: "Stable system, automatic backups and 24/7 monitoring. If it fails, we know in 5 minutes." },
  "ben.e2.title": { es: "Arquitectura sin deuda técnica", en: "Architecture without tech debt" },
  "ben.e2.desc": { es: "Código limpio, testeable, documentado. Cualquier dev puede mantenerlo después.", en: "Clean, testable, documented code. Any dev can maintain it later." },
  "ben.e3.title": { es: "Diseñado para escalar", en: "Built to scale" },
  "ben.e3.desc": { es: "De 5 a 500+ usuarios sin refactor. Infraestructura que crece con tu negocio.", en: "From 5 to 500+ users without a refactor. Infrastructure that grows with your business." },

  // Process
  "proc.tag": { es: "Metodología", en: "Methodology" },
  "proc.title1": { es: "Metodología ágil. 4 fases.", en: "Agile methodology. 4 phases." },
  "proc.title2": { es: "Entregas cada 2 semanas", en: "Releases every 2 weeks" },
  "proc.desc": { es: "Sprints quincenales con demos al cliente. Sin sorpresas, sin \"ya casi\". Especificación, código y deploys verificables.", en: "Two-week sprints with client demos. No surprises, no \"almost there.\" Verifiable spec, code and deploys." },
  "proc.s1.title": { es: "Diagnóstico (2-3 días)", en: "Diagnosis (2-3 days)" },
  "proc.s1.desc": { es: "Entrevistas con tu equipo, mapeo de procesos, identificación de cuellos de botella y propuesta de arquitectura. Entregable: documento técnico + roadmap a 6 meses.", en: "Interviews with your team, process mapping, bottleneck identification and architecture proposal. Deliverable: technical doc + 6-month roadmap." },
  "proc.s2.title": { es: "Estrategia & Diseño (1-2 sem)", en: "Strategy & Design (1-2 wks)" },
  "proc.s2.desc": { es: "Tech stack (React, Node, PostgreSQL), diseño de DB, wireframes funcionales y especificación de APIs. Entregable: spec técnica aprobada + presupuesto final.", en: "Tech stack (React, Node, PostgreSQL), DB design, functional wireframes and API spec. Deliverable: approved technical spec + final budget." },
  "proc.s3.title": { es: "Desarrollo (4-12 sem)", en: "Development (4-12 wks)" },
  "proc.s3.desc": { es: "Sprints de 2 semanas, frontend + backend en paralelo, tests automatizados, CI/CD y staging environment. Demos quincenales para validación.", en: "Two-week sprints, frontend + backend in parallel, automated tests, CI/CD and staging environment. Bi-weekly demos for validation." },
  "proc.s4.title": { es: "Go-live & Soporte (2-4 sem)", en: "Go-live & Support (2-4 wks)" },
  "proc.s4.desc": { es: "Migración de datos, capacitación al equipo, monitoreo 24/7 los primeros 30 días y SLA de soporte con respuesta en 4 horas.", en: "Data migration, team training, 24/7 monitoring for the first 30 days and support SLA with 4-hour response." },

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
  "cta.title1": { es: "Entiende tu operación.", en: "Understand your operations." },
  "cta.title2": { es: "Mira las opciones técnicas", en: "See your technical options" },
  "cta.desc": { es: "30 minutos. Análisis real de tu negocio. Sin venta forzada. Solo información útil que puedes usar de inmediato, aunque decidas no trabajar con nosotros.", en: "30 minutes. Real analysis of your business. No hard sell. Just useful information you can use right away, even if you decide not to work with us." },
  "cta.wa": { es: "WhatsApp directo", en: "Direct WhatsApp" },
  "cta.email": { es: "Correo", en: "Email" },
  "cta.formTitle": { es: "Diagnóstico técnico gratis", en: "Free technical diagnosis" },
  "cta.formSub": { es: "Respuesta en menos de 24 horas. SLA real.", en: "Reply in under 24 hours. Real SLA." },
  "cta.fName": { es: "Nombre", en: "Name" },
  "cta.fNamePh": { es: "Tu nombre", en: "Your name" },
  "cta.fWa": { es: "WhatsApp", en: "WhatsApp" },
  "cta.fBiz": { es: "¿De qué es tu negocio?", en: "What's your business about?" },
  "cta.fBizPh": { es: "Barbería, estética, tienda…", en: "Barbershop, salon, shop…" },
  "cta.fMsg": { es: "Cuéntanos brevemente (opcional)", en: "Tell us briefly (optional)" },
  "cta.fMsgPh": { es: "¿Qué problema quieres resolver?", en: "What problem do you want to solve?" },
  "cta.submit": { es: "Quiero mi diagnóstico técnico", en: "Get my technical diagnosis" },
  "cta.sending": { es: "Enviando...", en: "Sending..." },
  "cta.privacy": { es: "🔒 Tu información es 100% confidencial", en: "🔒 Your information is 100% confidential" },
  "cta.toast": { es: "¡Listo! Te contactamos en menos de 24 horas.", en: "Done! We'll contact you within 24 hours." },
  "footer.tagline": {
    es: "Arquitectura de sistemas, automatización de procesos e integración de tecnología seria. No hacemos webs de catálogo, branding ni desarrollo de bajo presupuesto.",
    en: "Systems architecture, process automation and serious tech integration. We don't do catalog sites, branding or low-budget development.",
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