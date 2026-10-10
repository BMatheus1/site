import { ArrowUpRight, Clock3, MapPin, MessageCircle } from "lucide-react";
import { fullAddress, mapsUrl, restaurant, whatsappUrl } from "../config/restaurant";
import { Reveal } from "./Reveal";

export function RestaurantInfo() {
  const hasHours = restaurant.openingHours.length > 0;
  const hasExtraInfo = restaurant.extraInfo.length > 0;

  return (
    <section className="section section--cream" id="informacoes" aria-labelledby="informacoes-title">
      <div className="page-shell">
        <Reveal>
          <div className="section-heading section-heading--center">
            <p className="eyebrow">Informações</p>
            <h2 id="informacoes-title">Planeje sua visita</h2>
            <p>Os caminhos mais simples para falar conosco e chegar ao restaurante.</p>
          </div>
        </Reveal>
        <div className="info-grid">
          <Reveal className="info-card">
            <div className="info-card__icon"><MapPin aria-hidden="true" /></div>
            <p className="info-card__kicker">Endereço</p>
            <h3>{restaurant.address.street}, {restaurant.address.number}</h3>
            <p>{restaurant.address.neighborhood}<br />{restaurant.address.city} – {restaurant.address.state}<br />CEP {restaurant.address.zipCode}</p>
            <a href={mapsUrl} target="_blank" rel="noreferrer">Traçar rota <ArrowUpRight size={17} aria-hidden="true" /></a>
          </Reveal>
          <Reveal className="info-card">
            <div className="info-card__icon"><MessageCircle aria-hidden="true" /></div>
            <p className="info-card__kicker">Contato</p>
            <h3>WhatsApp</h3>
            <p>{restaurant.whatsappDisplay}<br />Envie uma mensagem para saber mais.</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">Falar com a gente <ArrowUpRight size={17} aria-hidden="true" /></a>
          </Reveal>
          {hasHours && (
            <Reveal className="info-card">
              <div className="info-card__icon"><Clock3 aria-hidden="true" /></div>
              <p className="info-card__kicker">Horários</p>
              <h3>Funcionamento</h3>
              {restaurant.openingHours.map((line) => <p key={line}>{line}</p>)}
            </Reveal>
          )}
          {hasExtraInfo && restaurant.extraInfo.map((item) => (
            <Reveal className="info-card" key={item.label}>
              <p className="info-card__kicker">{item.label}</p>
              <h3>{item.value}</h3>
            </Reveal>
          ))}
        </div>
        <span className="sr-only">{fullAddress}</span>
      </div>
    </section>
  );
}
