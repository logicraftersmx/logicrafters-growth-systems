import { useState, useEffect } from "react";
import { Menu, X, Languages } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const links = [
    { href: "#problema", label: t("nav.problem") },
    { href: "#solucion", label: t("nav.solution") },
    { href: "#proceso", label: t("nav.process") },
    { href: "#proyectos", label: t("nav.projects") },
    { href: "#oferta", label: t("nav.services") },
    { href: "#faq", label: t("nav.faq") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = scrolled
    ? "text-foreground/70 hover:text-foreground"
    : "text-white/80 hover:text-white";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border/50 shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <a href="#top" className={cn("flex items-center transition-all", !scrolled && "bg-white/95 rounded-lg px-2 py-1")}>
          <Logo className="h-9 md:h-10" />
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={cn("text-sm font-medium transition-colors", linkClass)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors",
              scrolled
                ? "border-border text-foreground/70 hover:text-foreground hover:bg-muted"
                : "border-white/30 text-white hover:bg-white/10"
            )}
            aria-label="Toggle language"
          >
            <Languages className="w-3.5 h-3.5" /> {lang === "es" ? "EN" : "ES"}
          </button>
          <Button variant="hero" size="lg" asChild>
            <a href="#contacto">{t("nav.cta")}</a>
          </Button>
        </div>
        <button className={cn("lg:hidden p-2", scrolled ? "text-foreground" : "text-white")} onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="container py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-foreground/80 font-medium py-2">
                {l.label}
              </a>
            ))}
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full text-xs font-bold border border-border"
            >
              <Languages className="w-3.5 h-3.5" /> {lang === "es" ? "English" : "Español"}
            </button>
            <Button variant="hero" size="lg" asChild>
              <a href="#contacto" onClick={() => setOpen(false)}>{t("nav.cta")}</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
