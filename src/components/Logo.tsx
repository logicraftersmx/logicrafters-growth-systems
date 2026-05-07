import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-on-dark.png";
import { useTheme } from "@/theme/ThemeContext";

interface Props {
  className?: string;
  /** Force a variant. If omitted, uses current theme. */
  variant?: "auto" | "light" | "dark";
}

export const Logo = ({ className = "h-10", variant = "auto" }: Props) => {
  const { theme } = useTheme();
  const useLight = variant === "light" || (variant === "auto" && theme === "dark");
  return (
    <img
      src={useLight ? logoLight : logoDark}
      alt="Logicrafters MX"
      className={className}
      loading="eager"
    />
  );
};
