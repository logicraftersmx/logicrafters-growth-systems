import { MessageCircle } from "lucide-react";

export const WhatsAppFloat = () => (
  <a
    href="https://wa.link/t4smw8"
    target="_blank"
    rel="noopener"
    aria-label="Chat por WhatsApp"
    className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-elegant hover:scale-110 transition-transform animate-[float_3s_ease-in-out_infinite]"
  >
    <MessageCircle className="w-7 h-7" />
    <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
  </a>
);
