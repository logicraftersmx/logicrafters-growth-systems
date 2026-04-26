export type RegistrarId =
  | "lovable"
  | "godaddy"
  | "namecheap"
  | "cloudflare"
  | "google"
  | "hostinger"
  | "other";

export interface RegistrarInfo {
  id: RegistrarId;
  name: string;
  emoji: string;
  proxyWarning?: string;
  steps: string[];
  dnsPanelUrl?: string;
}

export const REGISTRARS: RegistrarInfo[] = [
  {
    id: "lovable",
    name: "Comprar en Lovable",
    emoji: "✨",
    steps: [
      "Ve a Project Settings → Domains.",
      "Haz clic en 'Buy new domain'.",
      "Busca y selecciona tu dominio.",
      "Completa los datos y el pago.",
      "Listo: el DNS se configura automáticamente.",
    ],
  },
  {
    id: "godaddy",
    name: "GoDaddy",
    emoji: "🟢",
    dnsPanelUrl: "https://dcc.godaddy.com/control/portfolio",
    steps: [
      "Inicia sesión en GoDaddy y entra a 'My Products' → tu dominio → 'DNS'.",
      "Elimina los registros A existentes con nombre @ y www.",
      "Crea un registro A: Name = @, Value = 185.158.133.1, TTL = 600.",
      "Crea un registro A: Name = www, Value = 185.158.133.1, TTL = 600.",
      "Crea un registro TXT: Name = _lovable, Value = (el que te dé Lovable).",
      "Guarda y espera la propagación (15 min - 2 h en GoDaddy).",
    ],
  },
  {
    id: "namecheap",
    name: "Namecheap",
    emoji: "🟠",
    dnsPanelUrl: "https://ap.www.namecheap.com/domains/list/",
    steps: [
      "Entra a 'Domain List' → tu dominio → 'Manage' → pestaña 'Advanced DNS'.",
      "Borra los registros 'URL Redirect' o 'CNAME' existentes en @ y www.",
      "Añade A Record: Host = @, Value = 185.158.133.1, TTL = Automatic.",
      "Añade A Record: Host = www, Value = 185.158.133.1, TTL = Automatic.",
      "Añade TXT Record: Host = _lovable, Value = (token de Lovable).",
      "Guarda los cambios (icono ✓ verde).",
    ],
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    emoji: "🟡",
    proxyWarning:
      "Si activas el ícono naranja (proxy), marca la opción 'Domain uses Cloudflare or a similar proxy' en Lovable y usa CNAME en lugar de A.",
    dnsPanelUrl: "https://dash.cloudflare.com/",
    steps: [
      "Entra al dashboard de Cloudflare → tu dominio → DNS → Records.",
      "Elimina A/CNAME existentes en @ y www.",
      "Add record: Type = A, Name = @, IPv4 = 185.158.133.1, Proxy = DNS only (gris).",
      "Add record: Type = A, Name = www, IPv4 = 185.158.133.1, Proxy = DNS only (gris).",
      "Add record: Type = TXT, Name = _lovable, Content = (token de Lovable).",
      "Si quieres mantener el proxy naranja, activa 'Advanced → Cloudflare proxy' en Lovable.",
    ],
  },
  {
    id: "google",
    name: "Google Domains / Squarespace",
    emoji: "🔵",
    dnsPanelUrl: "https://domains.squarespace.com/",
    steps: [
      "Inicia sesión en Squarespace Domains (Google Domains migró aquí).",
      "Selecciona tu dominio → 'DNS' → 'Custom records'.",
      "Crea A record: Host = @, Data = 185.158.133.1.",
      "Crea A record: Host = www, Data = 185.158.133.1.",
      "Crea TXT record: Host = _lovable, Data = (token de Lovable).",
      "Guarda y espera 30-60 min para la propagación.",
    ],
  },
  {
    id: "hostinger",
    name: "Hostinger",
    emoji: "🟣",
    dnsPanelUrl: "https://hpanel.hostinger.com/",
    steps: [
      "Entra a hPanel → 'Domains' → tu dominio → 'DNS / Nameservers'.",
      "En 'Manage DNS records' borra los registros A en @ y www existentes.",
      "Añade tipo A: Name = @, Points to = 185.158.133.1, TTL = 14400.",
      "Añade tipo A: Name = www, Points to = 185.158.133.1, TTL = 14400.",
      "Añade tipo TXT: Name = _lovable, TXT value = (token de Lovable).",
      "Guarda y verifica con dnschecker.org.",
    ],
  },
  {
    id: "other",
    name: "Otro registrador",
    emoji: "🌐",
    steps: [
      "Entra al panel de DNS de tu registrador.",
      "Crea un registro A con Name = @ y Value = 185.158.133.1.",
      "Crea un registro A con Name = www y Value = 185.158.133.1.",
      "Crea un registro TXT con Name = _lovable y Value = el token de Lovable.",
      "Elimina cualquier registro A/CNAME viejo en @ o www que apunte a otra IP.",
      "Guarda y espera la propagación (hasta 72 h, normalmente 1 h).",
    ],
  },
];

export const LOVABLE_IP = "185.158.133.1";