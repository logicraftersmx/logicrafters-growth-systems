import { Moon, Sun, Palette } from "lucide-react";
import { useTheme, ACCENT_LIST } from "@/theme/ThemeContext";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ThemeToggle = ({ onDark = false }: { onDark?: boolean }) => {
  const { theme, toggleTheme, accent, setAccent } = useTheme();

  const btn = cn(
    "inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors",
    onDark
      ? "border-white/30 text-white hover:bg-white/10"
      : "border-border text-foreground/70 hover:text-foreground hover:bg-muted"
  );

  return (
    <div className="flex items-center gap-2">
      <button onClick={toggleTheme} className={btn} aria-label="Toggle theme">
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={btn} aria-label="Cambiar color">
            <Palette className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>Color de marca</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ACCENT_LIST.map((a) => (
            <DropdownMenuItem key={a.id} onClick={() => setAccent(a.id)} className="gap-2">
              <span
                className="w-4 h-4 rounded-full border border-border"
                style={{ background: a.color }}
              />
              <span className="flex-1">{a.label}</span>
              {accent === a.id && <span className="text-xs text-muted-foreground">✓</span>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
