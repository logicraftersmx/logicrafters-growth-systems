import { Logo } from "../Logo";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export const Footer = () => (
  <footer className="bg-[hsl(var(--navy))] text-white/70 py-12 border-t border-white/10">
    <div className="container">
      <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
        <div>
          <div className="bg-white rounded-lg p-2 inline-block mb-3"><Logo className="h-8" /></div>
          <p className="text-sm max-w-sm">Construimos sistemas digitales que hacen crecer negocios reales en México.</p>
        </div>
        <div className="flex gap-4">
          <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"><Instagram className="w-4 h-4" /></a>
          <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"><Facebook className="w-4 h-4" /></a>
          <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"><Linkedin className="w-4 h-4" /></a>
        </div>
      </div>
      <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between text-xs text-white/50 gap-2">
        <p>© {new Date().getFullYear()} Logicrafters MX. Todos los derechos reservados.</p>
        <p>Hecho con obsesión por los detalles 🇲🇽</p>
      </div>
    </div>
  </footer>
);
