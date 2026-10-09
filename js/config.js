/* ===========================================================================
   Flora 1000 Flores — Configurações da loja
   Edite estes valores conforme a sua loja.
   =========================================================================== */

const CONFIG = {
  // Número que vai receber os pedidos no WhatsApp.
  // Formato: código do país + DDD + número, SÓ números.
  whatsappNumber: "553133913872", // (31) 3391-3872 — unidade Firmo de Matos
  whatsappDisplay: "(31) 3391-3872",

  storeName: "Flora Mil Flores",
  tagline: "Floricultura completa: flores, vasos, plantas e jardinagem",
  bio: "Buquê de flores para todas as ocasiões 💐🌻 Entregamos no seu endereço.",
  city: "Contagem · MG",
  unitName: "Flora Mil Flores • Firmo de Matos",
  address: "Av. Francisco Firmo de Matos, 3720 — Riacho das Pedras, Contagem/MG",

  // Redes sociais
  instagram: "https://www.instagram.com/flora1000floresltda/",
  instagramUser: "flora1000floresltda",
  // Números exibidos na prévia do Instagram (preencha com os dados reais do perfil;
  // vazio = a linha de números fica oculta). Ex.: { posts: "1.234", followers: "10 mil", following: "500" }
  instagramStats: null,
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
