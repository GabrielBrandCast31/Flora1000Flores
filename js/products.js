/* ===========================================================================
   Flora Mil Flores — Dados do catálogo
   ---------------------------------------------------------------------------
   Para usar fotos reais: troque o campo "image" pelo caminho/URL da foto.
   Ex.: image: "assets/buque-primavera.jpg"
   Enquanto não houver foto, é gerada uma imagem de exemplo automaticamente.
   =========================================================================== */

// Paleta de cores (família girassol: dourados, âmbar, verde folha e marrom)
const CATEGORY_COLORS = {
  "Buquês":          ["#ffd97a", "#f5a623"],
  "Arranjos":        ["#f6c66b", "#e08a1e"],
  "Plantas":         ["#c3e09a", "#5f9b3a"],
  "Cestas":          ["#e7cfa3", "#b9874a"],
  "Datas Especiais": ["#f3d488", "#c98a2a"],
};

// Gera uma imagem SVG (data URI) bonita pra usar como placeholder
function placeholder(name, category) {
  const [c1, c2] = CATEGORY_COLORS[category] || ["#ffd97a", "#f5a623"];
  const emoji = {
    "Buquês": "💐",
    "Arranjos": "🌷",
    "Plantas": "🪴",
    "Cestas": "🧺",
    "Datas Especiais": "🌹",
  }[category] || "🌸";
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

// Catálogo de exemplo — edite à vontade
const PRODUCTS = [
  {
    id: "buque-primavera",
    name: "Buquê Primavera",
    category: "Buquês",
    price: 129.9,
    description: "Mix colorido de flores da estação com folhagens e papel kraft.",
    badge: "Mais vendido",
  },
  {
    id: "buque-rosas-vermelhas",
    name: "Buquê 12 Rosas Vermelhas",
    category: "Buquês",
    price: 189.9,
    description: "Doze rosas vermelhas selecionadas, símbolo clássico do amor.",
    badge: "",
  },
  {
    id: "buque-girassois",
    name: "Buquê de Girassóis",
    category: "Buquês",
    price: 149.9,
    description: "Girassóis vibrantes que levam alegria pra qualquer ambiente.",
    badge: "",
  },
  {
    id: "buque-ursinho",
    name: "Buquê com Ursinho",
    category: "Buquês",
    price: 169.9,
    description: "Buquê encantador acompanhado de um ursinho de pelúcia. Carinho em dobro.",
    badge: "Favorito",
  },
  {
    id: "arranjo-mesa",
    name: "Arranjo de Mesa Elegance",
    category: "Arranjos",
    price: 219.9,
    description: "Arranjo baixo em vaso de cerâmica, ideal para mesa de jantar.",
    badge: "",
  },
  {
    id: "arranjo-orquidea",
    name: "Orquídea Phalaenopsis",
    category: "Arranjos",
    price: 259.9,
    description: "Orquídea branca em cachepô, sofisticação que dura semanas.",
    badge: "Premium",
  },
  {
    id: "planta-suculentas",
    name: "Trio de Suculentas",
    category: "Plantas",
    price: 79.9,
    description: "Três suculentas em vasinhos de concreto. Fáceis de cuidar.",
    badge: "",
  },
  {
    id: "planta-jiboia",
    name: "Jiboia em Cachepô",
    category: "Plantas",
    price: 99.9,
    description: "Planta pendente que purifica o ar e decora qualquer canto.",
    badge: "",
  },
  {
    id: "planta-frutifera",
    name: "Muda Frutífera",
    category: "Plantas",
    price: 69.9,
    description: "Mudas de frutíferas e folhagens para o seu jardim ou varanda.",
    badge: "",
  },
  {
    id: "cesta-cafe",
    name: "Cesta Café da Manhã + Flores",
    category: "Cestas",
    price: 279.9,
    description: "Cesta com pães, frutas, sucos e um mini buquê de boas-vindas.",
    badge: "",
  },
  {
    id: "cesta-chocolates",
    name: "Cesta Chocolates & Rosas",
    category: "Cestas",
    price: 199.9,
    description: "Seleção de chocolates finos acompanhada de rosas cor-de-rosa.",
    badge: "",
  },
  {
    id: "data-dia-das-maes",
    name: "Especial Dia das Mães",
    category: "Datas Especiais",
    price: 169.9,
    description: "Buquê delicado em tons pastel com cartão personalizado.",
    badge: "",
  },
  {
    id: "data-aniversario",
    name: "Combo Aniversário",
    category: "Datas Especiais",
    price: 159.9,
    description: "Buquê festivo com balão e cartão de parabéns.",
    badge: "",
  },
  {
    id: "rosas-caixa-joias",
    name: "Rosas na Caixa de Joias",
    category: "Datas Especiais",
    price: 229.9,
    description: "Rosas selecionadas em uma elegante caixa de joias. Surpresa sofisticada.",
    badge: "Premium",
  },
  {
    id: "data-condolencias",
    name: "Coroa de Condolências",
    category: "Datas Especiais",
    price: 349.9,
    description: "Arranjo respeitoso em tons brancos para homenagens.",
    badge: "",
  },
];

// Para cada produto:
//  - "photo"       = foto real esperada em assets/<id>.jpg  (use essa quando tiver a imagem)
//  - "placeholder" = imagem de exemplo gerada (usada como fallback automático)
// Se a foto real não existir em assets/, o site cai no placeholder sozinho.
PRODUCTS.forEach((p) => {
  p.placeholder = placeholder(p.name, p.category);
  if (!p.photo) p.photo = "assets/" + p.id + ".jpg";
  // compatibilidade: "image" passa a ser o caminho da foto real
  if (!p.image) p.image = p.photo;
});

const CATEGORIES = ["Todos", ...Object.keys(CATEGORY_COLORS)];

/* ===========================================================================
   VITRINE IMERSIVA (estilo Apple)
   Flores em destaque apresentadas com scroll cinematográfico.
   Cada item: emoji grande, gradiente de fundo, frase e história.
   =========================================================================== */
const FEATURED = [
  {
    id: "buque-rosas-vermelhas",
    flower: "🌹",
    name: "Rosas Vermelhas",
    tagline: "O clássico que nunca falha.",
    story: "Doze hastes selecionadas, abertas no ponto exato. Para quando as palavras não bastam.",
    glow: "#ff5e7e",
    bg: ["#2a0610", "#5e0d24"],
  },
  {
    id: "buque-girassois",
    flower: "🌻",
    name: "Girassóis",
    tagline: "Luz em forma de flor.",
    story: "Sempre voltados para o sol. Levam alegria instantânea para qualquer ambiente.",
    glow: "#ffce4d",
    bg: ["#2a1e02", "#7a5a08"],
  },
  {
    id: "arranjo-orquidea",
    flower: "🪷",
    name: "Orquídeas",
    tagline: "Sofisticação que dura semanas.",
    story: "A elegância da Phalaenopsis em cachepô. Beleza serena que permanece.",
    glow: "#c98bff",
    bg: ["#1a0a2e", "#3d1466"],
  },
  {
    id: "buque-primavera",
    flower: "💐",
    name: "Primavera",
    tagline: "Um jardim em suas mãos.",
    story: "Mix colorido da estação, montado na hora. Cada buquê é único, como o momento.",
    glow: "#ff85b3",
    bg: ["#2a0a1a", "#6e1741"],
  },
];

// Vincula cada destaque ao produto real (preço, foto, etc.)
FEATURED.forEach((f) => {
  const p = PRODUCTS.find((x) => x.id === f.id);
  if (p) { f.price = p.price; f.product = p; f.photo = p.photo; }
});
