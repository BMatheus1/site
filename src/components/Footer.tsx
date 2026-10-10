import { Instagram, MessageCircle } from "lucide-react";
import { restaurant, whatsappUrl } from "../config/restaurant";

export function Footer() {
  return (
    <footer className="footer">
      <div className="page-shell footer__grid">
        <div>
          <p className="footer__brand">{restaurant.name}</p>
          <p>{restaurant.address.street}, {restaurant.address.number}<br />{restaurant.address.neighborhood} · {restaurant.address.city} – {restaurant.address.state}</p>
        </div>
        <div className="footer__links">
          <a href={restaurant.menuUrl} target="_blank" rel="noreferrer">Cardápio</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={16} aria-hidden="true" /> {restaurant.whatsappDisplay}</a>
          {restaurant.instagram && <a href={restaurant.instagram} target="_blank" rel="noreferrer"><Instagram size={16} aria-hidden="true" /> Instagram</a>}
        </div>
      </div>
      <div className="page-shell footer__bottom">
        <span>© {new Date().getFullYear()} {restaurant.name}.</span>
        <span>Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
