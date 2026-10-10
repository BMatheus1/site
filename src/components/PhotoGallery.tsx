import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { restaurant } from "../config/restaurant";
import { Reveal } from "./Reveal";

export function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const images = restaurant.gallery;

  const close = () => setActiveIndex(null);
  const previous = () => setActiveIndex((current) => current === null ? null : (current - 1 + images.length) % images.length);
  const next = () => setActiveIndex((current) => current === null ? null : (current + 1) % images.length);

  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  return (
    <section className="section section--wine" id="espaco" aria-labelledby="espaco-title">
      <div className="page-shell">
        <Reveal>
          <div className="section-heading section-heading--light">
            <p className="eyebrow eyebrow--light">Atmosfera &amp; sabores</p>
            <h2 id="espaco-title">Conheça nosso espaço</h2>
            <p>Um ambiente pensado para tornar cada encontro ainda mais especial.</p>
          </div>
        </Reveal>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <Reveal className={`gallery-item gallery-item--${index + 1}`} key={image.src}>
              <button type="button" onClick={() => setActiveIndex(index)} aria-label={`Ampliar fotografia ${index + 1}: ${image.alt}`}>
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={index === 0 ? "eager" : "lazy"} />
                <span className="gallery-item__shade" />
                <span className="gallery-item__action"><Expand size={18} aria-hidden="true" /> Ampliar</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Visualização ampliada da galeria" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <button ref={closeButtonRef} className="lightbox__close" type="button" onClick={close} aria-label="Fechar galeria"><X aria-hidden="true" /></button>
          <button className="lightbox__nav lightbox__nav--prev" type="button" onClick={previous} aria-label="Fotografia anterior"><ChevronLeft aria-hidden="true" /></button>
          <figure>
            <img src={images[activeIndex].src} alt={images[activeIndex].alt} width={images[activeIndex].width} height={images[activeIndex].height} />
            <figcaption>{activeIndex + 1} / {images.length}</figcaption>
          </figure>
          <button className="lightbox__nav lightbox__nav--next" type="button" onClick={next} aria-label="Próxima fotografia"><ChevronRight aria-hidden="true" /></button>
        </div>
      )}
    </section>
  );
}
