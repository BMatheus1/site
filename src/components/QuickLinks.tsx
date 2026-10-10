import { ArrowUpRight, ChevronDown, Info, Instagram, MapPin, Menu, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";
import { restaurant, whatsappUrl } from "../config/restaurant";

type LinkCardProps = {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  primary?: boolean;
  external?: boolean;
};

function LinkCard({ href, icon: Icon, title, description, primary, external = false }: LinkCardProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (external || !href.startsWith("#")) return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", href);
    window.setTimeout(() => target.focus({ preventScroll: true }), reducedMotion ? 0 : 450);
  };

  const Arrow = external ? ArrowUpRight : ChevronDown;

  return (
    <a
      className={`quick-card ${primary ? "quick-card--primary" : ""}`}
      href={href}
      onClick={handleClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span className="quick-card__icon"><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span>
      <span className="quick-card__copy"><strong>{title}</strong><small>{description}</small></span>
      <Arrow className="quick-card__arrow" size={18} aria-hidden="true" />
    </a>
  );
}

export function QuickLinks() {
  return (
    <section className="landing-start" id="acessos" aria-labelledby="acessos-title">
      <div className="page-shell narrow-shell">
        <header className="compact-brand" id="inicio">
          <img
            src={restaurant.logoImage.src}
            alt={restaurant.logoImage.alt}
            width={restaurant.logoImage.width}
            height={restaurant.logoImage.height}
          />
          <div>
            <p className="eyebrow">Bar &amp; restaurante</p>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.tagline}</p>
          </div>
        </header>

        <div className="section-heading section-heading--center quick-heading">
          <p className="eyebrow">Acesso rápido</p>
          <h2 id="acessos-title">O que você procura?</h2>
          <p>Encontre as principais informações do restaurante.</p>
        </div>

        <div className="quick-grid">
          <LinkCard href={restaurant.menuUrl} icon={Menu} title="Conheça nosso cardápio" description="Explore nossas opções" primary external />
          <LinkCard href="#informacoes" icon={Info} title="Informações úteis" description="Estacionamento gratuito no local" />
          <LinkCard href="#localizacao" icon={MapPin} title="Como chegar" description="Endereço e rota no Google Maps" />
          <LinkCard href={whatsappUrl} icon={MessageCircle} title="Fale conosco" description={restaurant.whatsappDisplay} external />
          {restaurant.instagram && (
            <LinkCard href={restaurant.instagram} icon={Instagram} title="Acompanhe nosso Instagram" description="Novidades e momentos especiais" external />
          )}
        </div>
      </div>
    </section>
  );
}
