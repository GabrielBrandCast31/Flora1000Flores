/* ===========================================================================
   Flora 1000 Flores — Configurações da loja
   Edite estes valores conforme a sua loja.
   =========================================================================== */

const CONFIG = {
  // Número que vai receber os pedidos no WhatsApp.
  // Formato: código do país + DDD + número, SÓ números.
  whatsappNumber: "5531998239417", // (31) 99823-9417 — Contagem/MG

  storeName: "Flora Mil Flores",
  tagline: "Flores, folhagens e frutíferas para todas as ocasiões",
  bio: "Buquê de flores para todas as ocasiões 💐🌻 Entregamos no seu endereço.",
  city: "Contagem · MG",
  address: "Av. Juscelino Kubitschek, 820 — Industrial, Contagem/MG · 32230-090",

  // Redes sociais
  instagram: "https://www.instagram.com/flora1000flores_contagem/",
  instagramUser: "flora1000flores_contagem",
  // Números exibidos na prévia do Instagram (dados reais do perfil)
  instagramStats: { posts: "2.165", followers: "17,7 mil", following: "4.614" },
  // Destaques (stories) — emoji + rótulo; troque por fotos em assets/ se quiser
  instagramHighlights: [
    { label: "Buquê c/ ursinho", emoji: "🧸" },
    { label: "buquê", emoji: "💐" },
    { label: "Ramalhetes", emoji: "🌻" },
    { label: "clientes 🥰", emoji: "💝" },
    { label: "Destaques", emoji: "🌹" },
    { label: "Jardinagem", emoji: "🪴" },
  ],

  // Taxa de entrega exibida no checkout (defina 0 para "a combinar")
  deliveryFee: 0, // entrega a combinar via WhatsApp

  // Moeda
  currency: "BRL",
  locale: "pt-BR",
};
