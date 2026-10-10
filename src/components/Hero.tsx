import { ArrowDown, MessageCircle } from "lucide-react";
import { restaurant, whatsappUrl } from "../config/restaurant";

export function Hero() {
  return (
    <header className="hero" id="inicio">
      <img
        className="hero__background"
        src={restaurant.heroImage.src}
        alt=""
        width={restaurant.heroImage.width}
        height={restaurant.heroImage.height}
        fetchPriority="high"
      />
      <div className="hero__overlay" />
      <nav className="hero__nav page-shell" aria-label="Navegação principal">
        <a className="wordmark" href="#inicio" aria-label={`${restaurant.name}, início`}>
          <span className="wordmark__icon" aria-hidden="true">CL</span>
          <span>{restaurant.name}</span>
        </a>
        <a className="nav-link" href="#acessos">Acessos</a>
      </nav>

      <div className="hero__content page-shell">
        <div className="hero__logo-wrap">
          <img
            src={restaurant.logoImage.src}
            alt={restaurant.logoImage.alt}
            width={restaurant.logoImage.width}
            height={restaurant.logoImage.height}
            className="hero__logo"
          />
        </div>
        <p className="eyebrow eyebrow--light">Bar &amp; restaurante · Riacho Grande</p>
        <h1>{restaurant.tagline}</h1>
        <p className="hero__welcome">{restaurant.welcome}</p>
        <div className="hero__actions">
          <a className="button button--gold" href={whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={19} aria-hidden="true" />
            Entre em contato
          </a>
          <a className="button button--ghost" href="#acessos">
            Ver opções
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="hero__ornament" aria-hidden="true"><span /><i /><span /></div>
    </header>
  );
}
