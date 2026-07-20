/* ===========================================================================
   Flora Mil Flores — Catálogo (baseado no CATÁLOGO OFICIAL Vol. 30)
   ---------------------------------------------------------------------------
   As fotos reais foram extraídas do PDF e estão em assets/<id>.jpg
   Se alguma faltar, é gerado um placeholder automaticamente.
   =========================================================================== */

// Paleta (família girassol: dourados, âmbar, verde folha e marrom)
const CATEGORY_COLORS = {
  "Buquês":       ["#ffd97a", "#f5a623"],
  "Combos":       ["#f6b26b", "#e07b1e"],
  "Arranjos":     ["#f3d488", "#c98a2a"],
  "Cestas":       ["#e7cfa3", "#b9874a"],
  "Complementos": ["#c3e09a", "#5f9b3a"],
};

const CATEGORY_EMOJI = {
  "Buquês": "💐", "Combos": "🎁", "Arranjos": "🌷", "Cestas": "🧺", "Complementos": "🧸",
};

// Gera uma imagem SVG (data URI) como placeholder (fallback)
function placeholder(name, category) {
  const [c1, c2] = CATEGORY_COLORS[category] || ["#ffd97a", "#f5a623"];
  const emoji = CATEGORY_EMOJI[category] || "🌻";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${c1}"/>
          <stop offset="1" stop-color="${c2}"/>
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#g)"/>
      <text x="50%" y="46%" font-size="160" text-anchor="middle" dominant-baseline="central">${emoji}</text>
      <text x="50%" y="74%" font-size="30" fill="#ffffff" font-family="Georgia, serif"
            text-anchor="middle" opacity="0.9">${name}</text>
    </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.trim());
}

// Catálogo — extraído do catálogo oficial (preços em R$)
const PRODUCTS = [
  // ---------------- BUQUÊS ----------------
  {
    id: "buque-1000-flores", name: "Buquê 1000 Flores", category: "Buquês", price: 269.9,
    description: "Nosso especial: 12 rosas e 4 girassóis num só buquê. A cara da casa.",
    badge: "Exclusivo",
  },
  {
    id: "buque-rosas", name: "Buquê de Rosas", category: "Buquês", price: 139.9,
    description: "Rosas vermelhas com mosquitinho. De 6 a 15 rosas (a partir de R$139,90).",
    badge: "Mais vendido",
  },
  {
    id: "buque-girassois", name: "Buquê de Girassóis", category: "Buquês", price: 149.9,
    description: "Girassóis radiantes. De 6 a 12 girassóis (a partir de R$149,90).",
    badge: "",
  },
  {
    id: "buque-lirio", name: "Buquê de Lírio", category: "Buquês", price: 239.9,
    description: "Lírios perfumados com folhagens e detalhes delicados.",
    badge: "",
  },
  {
    id: "buque-delicadeza", name: "Buquê Delicadeza", category: "Buquês", price: 239.9,
    description: "06 rosas, 01 girassol e astromélias em tons suaves.",
    badge: "",
  },
  {
    id: "buque-flores-campo", name: "Buquê Flores do Campo", category: "Buquês", price: 149.9,
    description: "Mix colorido de flores do campo. Médio R$149,90 · Grande R$199,90.",
    badge: "",
  },
  {
    id: "buque-luxo", name: "Buquê Luxo", category: "Buquês", price: 269.9,
    description: "10 rosas e 08 Ferrero Rocher no palito. Puro luxo.",
    badge: "Premium",
  },
  {
    id: "buque-van-gogh", name: "Buquê Van Gogh", category: "Buquês", price: 199.9,
    description: "04 girassóis e 06 rosas azuis com a impressão do quadro Noite Estrelada.",
    badge: "Novidade",
  },

  // ---------------- COMBOS ----------------
  {
    id: "combo-romance", name: "Combo Romance Perfeito", category: "Combos", price: 539.9,
    description: "Buquê de 12 rosas + cesta de café da manhã/tarde. A surpresa completa.",
    badge: "Combo",
  },
  {
    id: "combo-apaixonante", name: "Combo Apaixonante", category: "Combos", price: 159.9,
    description: "Arranjo de rosas + cesta de chocolate. De 3 a 5 rosas (a partir de R$159,90).",
    badge: "",
  },

  // ---------------- ARRANJOS ----------------
  {
    id: "arranjo-rosas", name: "Arranjo de Rosas", category: "Arranjos", price: 19.9,
    description: "Arranjo de rosas vermelhas com mosquitinho. De 1 a 5 rosas (a partir de R$19,90).",
    badge: "",
  },
  {
    id: "arranjo-girassois", name: "Arranjo de Girassóis", category: "Arranjos", price: 39.9,
    description: "Arranjo de girassóis. De 1 a 5 girassóis (a partir de R$39,90).",
    badge: "",
  },
  {
    id: "arranjo-rosas-azuis", name: "Arranjo de Rosas Azuis", category: "Arranjos", price: 79.9,
    description: "Arranjo de rosas azuis com detalhes. De 3 a 5 rosas (a partir de R$79,90).",
    badge: "",
  },

  // ---------------- CESTAS ----------------
  {
    id: "cesta-chocolate", name: "Cesta de Chocolate", category: "Cestas", price: 89.9,
    description: "Seleção de chocolates montada com carinho. A partir de R$89,90.",
    badge: "",
  },
  {
    id: "cesta-cafe", name: "Cesta Café da Manhã", category: "Cestas", price: 199.9,
    description: "Café da manhã completo para surpreender. Simples R$199,90 · Completa R$289,90.",
    badge: "",
  },

  // ---------------- COMPLEMENTOS ----------------
  {
    id: "comp-urso", name: "Ursinho de Pelúcia", category: "Complementos", price: 19.9,
    description: "Complemento fofo pro seu presente. A partir de R$19,90.",
    badge: "",
  },
  {
    id: "comp-rosa", name: "Rosa Avulsa", category: "Complementos", price: 9.9,
    description: "Nacional R$9,90 · Importada R$12,90. Adicione ao seu pedido.",
    badge: "",
  },
  {
    id: "comp-chocolate", name: "Chocolate no Palito", category: "Complementos", price: 5.0,
    description: "Simples R$5,00 · Ferrero R$8,90. Um docinho a mais.",
    badge: "",
  },
];

// Variações (opções com preço) — extraídas das faixas do catálogo
const VARIANTS = {
  "arranjo-rosas": { name: "Quantidade de rosas", options: [
    { label: "1 rosa", price: 19.9 }, { label: "2 rosas", price: 49.9 },
    { label: "3 rosas", price: 69.9 }, { label: "4 rosas", price: 89.9 },
    { label: "5 rosas", price: 109.9 } ] },
  "arranjo-girassois": { name: "Quantidade de girassóis", options: [
    { label: "1 girassol", price: 39.9 }, { label: "2 girassóis", price: 49.9 },
    { label: "3 girassóis", price: 89.9 }, { label: "4 girassóis", price: 109.9 },
    { label: "5 girassóis", price: 134.9 } ] },
  "arranjo-rosas-azuis": { name: "Quantidade de rosas", options: [
    { label: "3 rosas", price: 79.9 }, { label: "4 rosas", price: 99.9 },
    { label: "5 rosas", price: 119.9 } ] },
  "buque-rosas": { name: "Quantidade de rosas", options: [
    { label: "6 rosas", price: 139.9 }, { label: "8 rosas", price: 169.9 },
    { label: "10 rosas", price: 199.9 }, { label: "12 rosas", price: 239.9 },
    { label: "15 rosas", price: 269.9 } ] },
  "buque-girassois": { name: "Quantidade de girassóis", options: [
    { label: "6 girassóis", price: 149.9 }, { label: "10 girassóis", price: 239.9 },
    { label: "12 girassóis", price: 289.9 } ] },
  "buque-flores-campo": { name: "Tamanho", options: [
    { label: "Médio", price: 149.9 }, { label: "Grande", price: 199.9 } ] },
  "combo-apaixonante": { name: "Quantidade de rosas", options: [
    { label: "3 rosas", price: 159.9 }, { label: "4 rosas", price: 209.9 },
    { label: "5 rosas", price: 249.9 } ] },
  "cesta-cafe": { name: "Tipo", options: [
    { label: "Simples", price: 199.9 }, { label: "Completa", price: 289.9 } ] },
  "comp-rosa": { name: "Tipo", options: [
    { label: "Nacional", price: 9.9 }, { label: "Importada", price: 12.9 } ] },
  "comp-chocolate": { name: "Tipo", options: [
    { label: "Simples", price: 5.0 }, { label: "Ferrero", price: 8.9 } ] },
};

// Foto real (assets/<id>.jpg) + placeholder de fallback + variações
PRODUCTS.forEach((p) => {
  p.placeholder = placeholder(p.name, p.category);
  if (!p.photo) p.photo = "assets/" + p.id + ".jpg";
  if (!p.image) p.image = p.photo;
  if (VARIANTS[p.id]) {
    p.variants = VARIANTS[p.id];
    p.price = p.variants.options[0].price; // preço base = 1ª opção
  }
});

const CATEGORIES = ["Todos", ...Object.keys(CATEGORY_COLORS)];

/* ===========================================================================
   VITRINE IMERSIVA (estilo Apple) — destaques do catálogo
   =========================================================================== */
const FEATURED = [
  {
    id: "buque-1000-flores", flower: "🌻", name: "Buquê 1000 Flores",
    tagline: "A nossa assinatura.",
    story: "12 rosas e 4 girassóis num só buquê. O clássico que leva o nome da casa.",
    glow: "#ffc24d", bg: ["#2a1e02", "#7a5a08"],
  },
  {
    id: "combo-romance", flower: "🌹", name: "Combo Romance Perfeito",
    tagline: "Amor que se recebe de mãos cheias.",
    story: "Buquê de 12 rosas acompanhado de uma cesta de café da manhã. A surpresa completa.",
    glow: "#ff5e7e", bg: ["#2a0610", "#5e0d24"],
  },
  {
    id: "buque-girassois", flower: "🌻", name: "Buquê de Girassóis",
    tagline: "Luz em forma de flor.",
    story: "Girassóis radiantes que trazem alegria instantânea para qualquer momento.",
    glow: "#ffce4d", bg: ["#2a1e02", "#7a5a08"],
  },
  {
    id: "buque-van-gogh", flower: "🌻", name: "Buquê Van Gogh",
    tagline: "Uma obra-prima em flores.",
    story: "04 girassóis e 06 rosas azuis com a impressão da Noite Estrelada. Arte pra presentear.",
    glow: "#4a90d9", bg: ["#0a1430", "#173a66"],
  },
];

// Vincula cada destaque ao produto real (preço, foto, etc.)
FEATURED.forEach((f) => {
  const p = PRODUCTS.find((x) => x.id === f.id);
  if (p) { f.price = p.price; f.product = p; f.photo = p.photo; }
});
