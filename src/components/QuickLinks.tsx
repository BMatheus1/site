import { ArrowUpRight, Instagram, MapPin, Menu, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { mapsUrl, restaurant, whatsappUrl } from "../config/restaurant";
import { Reveal } from "./Reveal";

type LinkCardProps = {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  primary?: boolean;
};

function LinkCard({ href, icon: Icon, title, description, primary }: LinkCardProps) {
  return (
    <a className={`quick-card ${primary ? "quick-card--primary" : ""}`} href={href} target="_blank" rel="noreferrer">
      <span className="quick-card__icon"><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span>
      <span className="quick-card__copy"><strong>{title}</strong><small>{description}</small></span>
      <ArrowUpRight className="quick-card__arrow" size={18} aria-hidden="true" />
    </a>
  );
}

export function QuickLinks() {
  return (
    <section className="section section--ivory" id="acessos" aria-labelledby="acessos-title">
      <div className="page-shell narrow-shell">
        <Reveal>
          <div className="section-heading section-heading--center">
            <p className="eyebrow">Tudo em um só lugar</p>
            <h2 id="acessos-title">Escolha como começar</h2>
            <p>Cardápio, atendimento e caminho para chegar até nós.</p>
          </div>
        </Reveal>
        <div className="quick-grid">
          <Reveal><LinkCard href={restaurant.menuUrl} icon={Menu} title="Conheça nosso cardápio" description="Explore nossas opções" primary /></Reveal>
          <Reveal><LinkCard href={whatsappUrl} icon={MessageCircle} title="Fale com a gente" description={restaurant.whatsappDisplay} /></Reveal>
          <Reveal><LinkCard href={mapsUrl} icon={MapPin} title="Como chegar" description="Encontre nosso restaurante" /></Reveal>
          {restaurant.instagram && (
            <Reveal><LinkCard href={restaurant.instagram} icon={Instagram} title="Acompanhe nosso Instagram" description="Novidades e momentos especiais" /></Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
