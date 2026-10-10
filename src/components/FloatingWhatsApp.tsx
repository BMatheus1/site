import { MessageCircle } from "lucide-react";
import { restaurant, whatsappUrl } from "../config/restaurant";

export function FloatingWhatsApp() {
  return (
    <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={`Falar com ${restaurant.name} pelo WhatsApp`}>
      <MessageCircle size={23} strokeWidth={1.8} aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}
