import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "¿Cuánto cuesta una solución de Logicrafters?", a: "Cada proyecto es único, por eso no manejamos precios fijos. Después del diagnóstico gratuito, te entregamos una propuesta clara con alcance, tiempos e inversión. La mayoría de nuestros clientes recupera la inversión en los primeros 3-6 meses gracias al aumento en ventas y ahorro de tiempo." },
  { q: "¿Cuánto tiempo tarda en estar listo?", a: "Depende del alcance. Un sistema básico está en 4-6 semanas. Una solución integral (web + app + sistema interno) toma entre 8 y 12 semanas. Trabajamos por fases para que empieces a ver resultados desde el primer mes." },
  { q: "¿Qué pasa si no soy bueno con la tecnología?", a: "Justamente por eso existimos. Diseñamos todo pensado en personas que no son técnicas. Te capacitamos paso a paso a ti y a tu equipo, y te acompañamos hasta que el sistema sea parte natural de tu operación." },
  { q: "¿Realmente voy a vender más?", a: "Sí — siempre y cuando implementes lo que diseñamos. Nuestros clientes reportan entre 30% y 70% más ventas en los primeros 6 meses. No es magia: es estrategia + sistemas + ejecución." },
  { q: "¿Soy un negocio pequeño, esto es para mí?", a: "Sí. De hecho, los negocios pequeños son los que más rápido transforman su operación. Diseñamos soluciones escalables: empezamos con lo esencial y crecemos contigo." },
  { q: "¿Por qué no usar una plantilla o sistema ya hecho?", a: "Las plantillas resuelven problemas genéricos y tu negocio no es genérico. Te terminas adaptando tú al sistema, en lugar de que el sistema se adapte a ti. Eso te cuesta tiempo, dinero y ventas." },
  { q: "¿Qué pasa después del lanzamiento?", a: "Te damos soporte continuo, mejoras y monitoreo. No te dejamos solo. Ofrecemos planes de mantenimiento mensuales para que tu sistema evolucione con tu negocio." },
];

export const FAQ = () => (
  <section id="faq" className="py-24 md:py-32 bg-background">
    <div className="container max-w-3xl">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">Preguntas frecuentes</span>
        <h2 className="text-4xl md:text-5xl font-bold">Resolvemos tus <span className="text-gradient-brand">dudas</span>.</h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl px-6 bg-card data-[state=open]:shadow-card transition-shadow">
            <AccordionTrigger className="text-left font-semibold text-base hover:no-underline py-5">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
