import { useEffect } from "react";
import { restaurant, fullAddress } from "../config/restaurant";

export function Seo() {
  useEffect(() => {
    const title = `${restaurant.name} | Cardápio, contato e localização`;
    const description = `${restaurant.name}: acesse o cardápio, fale pelo WhatsApp e encontre o restaurante em ${restaurant.address.neighborhood}.`;
    document.title = title;

    const upsert = (selector: string, attrs: Record<string, string>) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      Object.entries(attrs).forEach(([key, value]) => element!.setAttribute(key, value));
    };

    upsert('meta[name="description"]', { name: "description", content: description });
    upsert('meta[property="og:title"]', { property: "og:title", content: title });
    upsert('meta[property="og:description"]', { property: "og:description", content: description });
    upsert('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsert('meta[property="og:locale"]', { property: "og:locale", content: "pt_BR" });
    upsert('meta[property="og:image"]', { property: "og:image", content: new URL(restaurant.shareImage, window.location.origin).href });
    upsert('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsert('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsert('meta[name="twitter:description"]', { name: "twitter:description", content: description });

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: restaurant.name,
      telephone: `+${restaurant.whatsapp}`,
      menu: new URL(restaurant.menuUrl, window.location.origin).href,
      image: restaurant.gallery.map((image) => new URL(image.src, window.location.origin).href),
      address: {
        "@type": "PostalAddress",
        streetAddress: `${restaurant.address.street}, ${restaurant.address.number}`,
        addressLocality: restaurant.address.city,
        addressRegion: restaurant.address.state,
        postalCode: restaurant.address.zipCode,
        addressCountry: "BR",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.restaurantSchema = "true";
    script.text = JSON.stringify(structuredData);
    document.head.querySelector('script[data-restaurant-schema="true"]')?.remove();
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return <span className="sr-only">{fullAddress}</span>;
}
