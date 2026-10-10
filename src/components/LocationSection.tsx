import { ArrowUpRight, MapPinned } from "lucide-react";
import { fullAddress, mapsUrl } from "../config/restaurant";
import { Reveal } from "./Reveal";

export function LocationSection() {
  return (
    <section className="location-section" id="localizacao" aria-labelledby="localizacao-title">
      <div className="location-section__texture" aria-hidden="true" />
      <Reveal className="page-shell location-section__content">
        <div className="location-section__icon"><MapPinned aria-hidden="true" /></div>
        <p className="eyebrow eyebrow--light">Riacho Grande</p>
        <h2 id="localizacao-title">Seu próximo encontro começa aqui</h2>
        <p>{fullAddress}</p>
        <a className="button button--gold" href={mapsUrl} target="_blank" rel="noreferrer">
          Abrir no Google Maps <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}
