/* ===========================================================================
   Flora Mil Flores — Catálogo (baseado no CATÁLOGO OFICIAL Vol. 30)
   ---------------------------------------------------------------------------
   As fotos reais foram extraídas do PDF e estão em assets/<id>.jpg
   Se alguma faltar, é gerado um placeholder automaticamente.
   =========================================================================== */

// Paleta (família girassol: dourados, âmbar, verde folha e marrom)
const CATEGORY_COLORS = {
  "Buquês":       ["#ffd97a", "#f5a623"],
  "Noivas":       ["#f4e6dc", "#c9a78f"],
  "Combos":       ["#f6b26b", "#e07b1e"],
  "Arranjos":     ["#f3d488", "#c98a2a"],
  "Cestas":       ["#e7cfa3", "#b9874a"],
  "Coroas":       ["#e3e8de", "#7d8f73"],
  "Complementos": ["#c3e09a", "#5f9b3a"],
};

const CATEGORY_EMOJI = {
  "Buquês": "💐", "Noivas": "💍", "Combos": "🎁", "Arranjos": "🌷", "Cestas": "🧺", "Coroas": "🕊️", "Complementos": "🧸",
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

  // ---------------- NOIVAS (catálogo Mês das Noivas) ----------------
  // Cada buquê tem versão Igreja e Cartório (ver VARIANTS). As cores das
  // flores podem ser personalizadas; flores tingidas (ex.: azuis) alteram o valor.
  {
    id: "noiva-isabela", name: "Buquê Isabela", category: "Noivas", price: 290,
    description: "Rosas vermelhas e ruscus. Igreja: 24 rosas · Cartório: 10 rosas.",
    badge: "Mês das Noivas",
  },
  {
    id: "noiva-ester", name: "Buquê Ester", category: "Noivas", price: 290,
    description: "Rosas brancas, ruscus, gypsum e lisianthus. Igreja: 15 rosas · Cartório: 06 rosas.",
    badge: "",
  },
  {
    id: "noiva-brenda", name: "Buquê Brenda", category: "Noivas", price: 290,
    description: "Girassóis, elcaflor, tango e gypsum. Igreja: 12 girassóis · Cartório: 06 girassóis.",
    badge: "",
  },
  {
    id: "noiva-helena", name: "Buquê Helena", category: "Noivas", price: 290,
    description: "Astromélias brancas e gypsum. Leve, delicado e clássico.",
    badge: "",
  },
  {
    id: "noiva-elisabeth", name: "Buquê Elisabeth", category: "Noivas", price: 390,
    description: "Rosas brancas, lírios brancos, gypsum e lisianthus. Igreja: 20 rosas e 03 lírios · Cartório: 05 rosas e 01 lírio.",
    badge: "Premium",
  },
  {
    id: "noiva-aline", name: "Buquê Aline", category: "Noivas", price: 290,
    description: "06 lírios rosas, astromélia, lisianthus, tango e gypsum. Versão Igreja.",
    badge: "",
  },
  {
    id: "noiva-elisa", name: "Buquê Elisa", category: "Noivas", price: 120,
    description: "Todo em gypsum: nuvem branca, romântica e atemporal.",
    badge: "",
  },
  {
    id: "noiva-alice", name: "Buquê Alice", category: "Noivas", price: 329,
    description: "Rosas mescladas, lisianthus, astromélia e gypsum. Igreja: 20 rosas · Cartório: 08 rosas.",
    badge: "",
  },
  {
    id: "noiva-maria", name: "Buquê Maria", category: "Noivas", price: 329,
    description: "Rosas brancas, gypsum e ruscus. Igreja: 24 rosas · Cartório: 08 rosas.",
    badge: "",
  },
  {
    id: "noiva-daisy", name: "Buquê Daisy", category: "Noivas", price: 240,
    description: "Margaridas e gypsum. Alegre, leve e cheio de charme.",
    badge: "",
  },
  {
    id: "noiva-daminha", name: "Buquê de Daminha", category: "Noivas", price: 50,
    description: "Buquê de daminha com 5 rosas. A partir de R$50,00 (cores a combinar).",
    badge: "",
  },
  {
    id: "noiva-tiara", name: "Tiara de Gypsum", category: "Noivas", price: 50,
    description: "Tiara de gypsum. Infantil a partir de R$50,00 · Adulto a partir de R$110,00. Outras flores sob orçamento.",
    badge: "",
  },
  {
    id: "noiva-lapela", name: "Lapela", category: "Noivas", price: 9.9,
    description: "Lapela floral para o noivo e padrinhos. A partir de R$9,90. Outras flores sob orçamento.",
    badge: "",
  },
  {
    id: "noiva-ramalhete", name: "Ramalhete para Convite", category: "Noivas", price: 9.9,
    description: "Ramalhete de acabamento para convite. Outras flores sob orçamento.",
    badge: "",
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

  // ---------------- COROAS (catálogo Coroa de Flores) ----------------
  // 3 linhas de preço: Coroa de Flores 1 (R$390), 2 (R$490) e 3 (R$590).
  // Fotos: assets/coroa-<linha>-<modelo>.jpg. A faixa leva a mensagem do cliente.
  // Linha 1 — Tradicional · R$390
  { id: "coroa-1-01", name: "Coroa Tradicional Branca e Rosa", category: "Coroas", price: 390,
    description: "Crisântemos brancos com rosas brancas e cor-de-rosa. Faixa com sua mensagem de homenagem.", badge: "Homenagem" },
  { id: "coroa-1-02", name: "Coroa Tradicional Branca e Vermelha", category: "Coroas", price: 390,
    description: "Base branca de crisântemos com rosas brancas e toques de vermelho. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-1-03", name: "Coroa Tradicional Toda Branca", category: "Coroas", price: 390,
    description: "Crisântemos e rosas brancas sobre folhagens verdes. Serena e clássica. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-1-04", name: "Coroa Tradicional Amarela e Vermelha", category: "Coroas", price: 390,
    description: "Crisântemos amarelos, solidago e rosas vermelhas. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-1-05", name: "Coroa Tradicional Colorida", category: "Coroas", price: 390,
    description: "Rosas amarelas, cor-de-rosa e vermelhas com crisântemos brancos e lilás. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-1-06", name: "Coroa Tradicional Rosa Claro", category: "Coroas", price: 390,
    description: "Crisântemos brancos com rosas em tons de rosa claro. Delicada e suave. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-1-07", name: "Coroa Tradicional Vibrante", category: "Coroas", price: 390,
    description: "Rosas vermelhas, amarelas e pink com solidago. Uma homenagem cheia de vida. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-1-08", name: "Coroa Tradicional Vermelha", category: "Coroas", price: 390,
    description: "Rosas vermelhas com crisântemos brancos e solidago. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-1-09", name: "Coroa Tradicional Champanhe", category: "Coroas", price: 390,
    description: "Rosas champanhe e gérberas vermelhas com solidago e gypsum. Faixa com sua mensagem.", badge: "" },

  // Linha 2 — Especial · R$490
  { id: "coroa-2-01", name: "Coroa Especial Colorida", category: "Coroas", price: 490,
    description: "Rosas amarelas e pink, crisântemos brancos e solidago. Faixa com sua mensagem de homenagem.", badge: "Especial" },
  { id: "coroa-2-02", name: "Coroa Especial Pêssego", category: "Coroas", price: 490,
    description: "Rosas pêssego e champanhe com toques de rosa e gypsum. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-2-03", name: "Coroa Especial Branca e Amarela", category: "Coroas", price: 490,
    description: "Rosas brancas e amarelas com gypsum e folhagens. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-2-04", name: "Coroa Especial Amarela", category: "Coroas", price: 490,
    description: "Rosas amarelas com solidago e folhagens verdes. Luz e gratidão. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-2-05", name: "Coroa Especial Rosas Mescladas", category: "Coroas", price: 490,
    description: "Rosas pink, amarelas e brancas com folhagens. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-2-06", name: "Coroa Especial Vermelha e Rosa", category: "Coroas", price: 490,
    description: "Rosas vermelhas, rosa e amarelas sobre gypsum. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-2-07", name: "Coroa Especial Girassóis", category: "Coroas", price: 490,
    description: "Girassóis, rosas laranja e cor-de-rosa com gypsum. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-2-08", name: "Coroa Especial Toda Branca", category: "Coroas", price: 490,
    description: "Gérberas, rosas brancas e gypsum. Pureza e paz. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-2-09", name: "Coroa Especial Champanhe e Astromélias", category: "Coroas", price: 490,
    description: "Rosas champanhe e amarelas com astromélias e folhagens. Faixa com sua mensagem.", badge: "" },

  // Linha 3 — Premium · R$590
  { id: "coroa-3-01", name: "Coroa Premium Pêssego", category: "Coroas", price: 590,
    description: "Rosas pêssego em abundância com gypsum e folhagens. Faixa com sua mensagem de homenagem.", badge: "Premium" },
  { id: "coroa-3-02", name: "Coroa Premium Amarela", category: "Coroas", price: 590,
    description: "Gérberas e rosas amarelas com crisântemos brancos e solidago. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-3-03", name: "Coroa Premium Branca com Crisântemos", category: "Coroas", price: 590,
    description: "Gérberas, rosas e crisântemos brancos sobre folhagens. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-3-04", name: "Coroa Premium Pêssego e Branca", category: "Coroas", price: 590,
    description: "Rosas pêssego com crisântemos brancos e gypsum. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-3-05", name: "Coroa Premium Branca com Gérberas", category: "Coroas", price: 590,
    description: "Gérberas e rosas brancas envoltas em gypsum. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-3-06", name: "Coroa Premium Branca e Amarela", category: "Coroas", price: 590,
    description: "Gypsum com gérberas amarelas e rosas brancas. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-3-07", name: "Coroa Premium Rosa", category: "Coroas", price: 590,
    description: "Rosas cor-de-rosa e brancas com gypsum. Carinho e saudade. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-3-08", name: "Coroa Premium Pink e Lilás", category: "Coroas", price: 590,
    description: "Rosas pink e brancas com flores lilás e folhagens. Faixa com sua mensagem.", badge: "" },
  { id: "coroa-3-09", name: "Coroa Premium Rosa Claro", category: "Coroas", price: 590,
    description: "Rosas em tons de rosa claro com gypsum e folhagens. Faixa com sua mensagem.", badge: "" },

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

  // Noivas — Igreja (buquê maior) e Cartório (buquê menor)
  "noiva-isabela":   { name: "Cerimônia", options: [
    { label: "Igreja · 24 rosas", price: 290 }, { label: "Cartório · 10 rosas", price: 120 } ] },
  "noiva-ester":     { name: "Cerimônia", options: [
    { label: "Igreja · 15 rosas", price: 290 }, { label: "Cartório · 06 rosas", price: 120 } ] },
  "noiva-brenda":    { name: "Cerimônia", options: [
    { label: "Igreja · 12 girassóis", price: 290 }, { label: "Cartório · 06 girassóis", price: 100 } ] },
  "noiva-helena":    { name: "Cerimônia", options: [
    { label: "Igreja", price: 290 }, { label: "Cartório", price: 100 } ] },
  "noiva-elisabeth": { name: "Cerimônia", options: [
    { label: "Igreja · 20 rosas + 3 lírios", price: 390 }, { label: "Cartório · 5 rosas + 1 lírio", price: 160 } ] },
  "noiva-elisa":     { name: "Cerimônia", options: [
    { label: "Igreja", price: 120 }, { label: "Cartório", price: 60 } ] },
  "noiva-alice":     { name: "Cerimônia", options: [
    { label: "Igreja · 20 rosas", price: 329 }, { label: "Cartório · 08 rosas", price: 140 } ] },
  "noiva-maria":     { name: "Cerimônia", options: [
    { label: "Igreja · 24 rosas", price: 329 }, { label: "Cartório · 08 rosas", price: 140 } ] },
  "noiva-daisy":     { name: "Cerimônia", options: [
    { label: "Igreja", price: 240 }, { label: "Cartório", price: 120 } ] },
  "noiva-tiara":     { name: "Tamanho", options: [
    { label: "Infantil", price: 50 }, { label: "Adulto", price: 110 } ] },
};

// Foto real (assets/<id>.jpg) + placeholder de fallback + variações
PRODUCTS.forEach((p) => {
  p.placeholder = placeholder(p.name, p.category);
  if (!p.photo) p.photo = "assets/" + p.id + ".jpg";
  if (!p.image) p.image = p.photo;
  if (VARIANTS[p.id]) {
    p.variants = VARIANTS[p.id];
    p.price = Math.min(...p.variants.options.map((o) => o.price)); // "a partir de" = menor opção
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
