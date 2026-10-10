export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ExtraInfo = {
  label: string;
  value: string;
};

export const restaurant = {
  name: "Cantinho do Luiz",
  tagline: "Momentos especiais merecem um lugar especial.",
  welcome:
    "Uma experiência acolhedora, feita para celebrar encontros, sabores e boas memórias.",
  whatsapp: "5511958263030",
  whatsappDisplay: "(11) 95826-3030",
  whatsappMessage: "Olá! Gostaria de saber mais sobre o Cantinho do Luiz.",
  address: {
    street: "Rua Amazonas",
    number: "168",
    neighborhood: "Riacho Grande",
    city: "São Bernardo do Campo",
    state: "SP",
    zipCode: "09830-140",
  },
  menuUrl: "/cardapio.pdf",
  instagram: "",
  openingHours: [] as string[],
  extraInfo: [] as ExtraInfo[],
  heroImage: {
    src: "/images/prato-camarao-romantico.webp",
    alt: "Prato de camarões servido em uma mesa romântica à luz de velas",
    width: 1024,
    height: 1022,
  },
  logoImage: {
    src: "/images/marca-cantinho-do-luiz.webp",
    alt: "Marca Cantinho do Luiz com duas taças",
    width: 1096,
    height: 968,
  },
  shareImage: "/images/prato-camarao-romantico.webp",
  gallery: [
    {
      src: "/images/prato-camarao-romantico.webp",
      alt: "Prato de camarões em ambiente romântico à luz de velas",
      width: 1024,
      height: 1022,
    },
    {
      src: "/images/entrada-peixe-torradas.webp",
      alt: "Porção dourada acompanhada de torradas em mesa acolhedora",
      width: 853,
      height: 1024,
    },
    {
      src: "/images/fachada-cantinho-do-luiz.webp",
      alt: "Entrada do Cantinho do Luiz iluminada durante a noite",
      width: 1284,
      height: 1230,
    },
  ] as GalleryImage[],
};

export const fullAddress = `${restaurant.address.street}, ${restaurant.address.number}, ${restaurant.address.neighborhood}, ${restaurant.address.city} - ${restaurant.address.state}, CEP ${restaurant.address.zipCode}`;

export const whatsappUrl = `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(restaurant.whatsappMessage)}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

