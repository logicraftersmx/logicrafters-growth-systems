import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "light" | "dark";
export type Accent = "orange" | "blue" | "green" | "violet";

const ACCENTS: Record<Accent, { primary: string; secondary: string; ring: string; brandStart: string; brandEnd: string }> = {
  orange: { primary: "205 65% 42%", secondary: "22 90% 55%", ring: "22 90% 55%", brandStart: "22 90% 55%", brandEnd: "205 65% 42%" },
  blue:   { primary: "212 90% 50%", secondary: "200 85% 55%", ring: "212 90% 50%", brandStart: "200 85% 55%", brandEnd: "230 75% 45%" },
  green:  { primary: "152 65% 38%", secondary: "95 55% 50%",  ring: "152 65% 38%", brandStart: "95 55% 50%",  brandEnd: "168 70% 35%" },
  violet: { primary: "262 70% 55%", secondary: "320 75% 60%", ring: "262 70% 55%", brandStart: "320 75% 60%", brandEnd: "262 70% 55%" },
};

interface Ctx { theme: Theme; setTheme: (t: Theme) => void; toggleTheme: () => void; accent: Accent; setAccent: (a: Accent) => void; }
const ThemeContext = createContext<Ctx | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "light");
  const [accent, setAccentState] = useState<Accent>(() => (localStorage.getItem("accent") as Accent) || "orange");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const a = ACCENTS[accent];
    const root = document.documentElement;
    root.style.setProperty("--primary", a.primary);
    root.style.setProperty("--secondary", a.secondary);
    root.style.setProperty("--ring", a.ring);
    root.style.setProperty("--gradient-brand", `linear-gradient(135deg, hsl(${a.brandStart}) 0%, hsl(${a.brandEnd}) 100%)`);
    localStorage.setItem("accent", accent);
  }, [accent]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState, toggleTheme: () => setThemeState(theme === "light" ? "dark" : "light"), accent, setAccent: setAccentState }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export const ACCENT_LIST: { id: Accent; label: string; color: string }[] = [
  { id: "orange", label: "Naranja", color: "hsl(22 90% 55%)" },
  { id: "blue",   label: "Azul",    color: "hsl(212 90% 50%)" },
  { id: "green",  label: "Verde",   color: "hsl(152 65% 38%)" },
  { id: "violet", label: "Violeta", color: "hsl(262 70% 55%)" },
];
