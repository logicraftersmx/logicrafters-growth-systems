import logo from "@/assets/logo.png";

export const Logo = ({ className = "h-10" }: { className?: string }) => (
  <img src={logo} alt="Logicrafters MX" className={className} />
);
