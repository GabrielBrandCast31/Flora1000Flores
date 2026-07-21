/* ===========================================================================
   Flora Mil Flores — Catálogo, sacola, vitrine e checkout WhatsApp
   =========================================================================== */
window.Flora = (function () {
  "use strict";

  const STORAGE_KEY = "flora_cart_v1";
  const fmt = new Intl.NumberFormat(CONFIG.locale, { style: "currency", currency: CONFIG.currency });

  let cart = loadCart();
  let activeCategory = "Todos";

  const $ = (s) => document.querySelector(s);
  const grid       = $("#productGrid");
  const filters    = $("#filters");
  const cartItems  = $("#cartItems");
  const cartCount  = $("#cartCount");
  const cartTotal  = $("#cartTotal");
  const drawer     = $("#cartDrawer");
  const overlay    = $("#drawerOverlay");
  const checkout   = $("#checkoutForm");
  const sendWhats  = $("#sendWhats");
  const cartNote   = $("#cartNote");

  /* ---------- Persistência ---------- */
  function loadCart() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
  function saveCart() { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }
  function getProduct(id) { return PRODUCTS.find((p) => p.id === id); }

  /* ---------- Chaves de sacola (com variação) ----------
     Chave = "id" (sem variação) ou "id::indiceDaOpcao".              */
  function keyOf(id, oi) { return oi == null ? id : id + "::" + oi; }
  function parseKey(k) { const i = k.indexOf("::"); return i < 0 ? { id: k, oi: null } : { id: k.slice(0, i), oi: +k.slice(i + 2) }; }
  function variantOf(p, oi) { return (p && p.variants && oi != null) ? p.variants.options[oi] : null; }
  function lineProduct(k) { return getProduct(parseKey(k).id); }
  function lineUnitPrice(k) { const { id, oi } = parseKey(k); const p = getProduct(id); if (!p) return 0; const v = variantOf(p, oi); return v ? v.price : p.price; }
  function lineName(k) { const { id, oi } = parseKey(k); const p = getProduct(id); if (!p) return ""; const v = variantOf(p, oi); return v ? `${p.name} — ${v.label}` : p.name; }

  function totalItems() { return Object.values(cart).reduce((a, b) => a + b, 0); }
  function totalPrice() {
    return Object.entries(cart).reduce((s, [k, q]) => s + lineUnitPrice(k) * q, 0);
  }

  /* ---------- Filtros ---------- */
  function renderFilters() {
    filters.innerHTML = "";
    CATEGORIES.forEach((cat) => {
      const b = document.createElement("button");
      b.className = "chip" + (cat === activeCategory ? " is-active" : "");
      b.textContent = cat;
      b.addEventListener("click", () => { activeCategory = cat; renderFilters(); renderProducts(); });
      filters.appendChild(b);
    });
  }

  /* ---------- Catálogo ---------- */
  function renderProducts() {
    const list = activeCategory === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);
    grid.innerHTML = "";
    list.forEach((p) => {
      const card = document.createElement("article");
      card.className = "card reveal";
      card.dataset.qv = p.id;
      const hasVar = p.variants && p.variants.options.length > 1;
      const priceHtml = hasVar
        ? `<span class="card__from">a partir de</span> ${fmt.format(p.price)}`
        : fmt.format(p.price);
      const btnHtml = hasVar
        ? `<button class="add-btn" data-open-qv="${p.id}">Escolher</button>`
        : `<button class="add-btn" data-add="${p.id}">+ Sacola</button>`;
      card.innerHTML = `
        <div class="card__media">
          ${p.badge ? `<span class="card__badge">${p.badge}</span>` : ""}
          <img src="${p.photo}" alt="${p.name}" loading="lazy" data-pid="${p.id}" />
        </div>
        <div class="card__body">
          <span class="card__cat">${p.category}</span>
          <h3 class="card__name">${p.name}</h3>
          <p class="card__desc">${p.description}</p>
          <div class="card__foot">
            <span class="card__price">${priceHtml}</span>
            ${btnHtml}
          </div>
        </div>`;
      grid.appendChild(card);
    });
    attachPhotoFallback(grid);
    if (window.Anim && window.Anim.refreshReveals) window.Anim.refreshReveals();
  }

  // Se a foto real (assets/<id>.jpg) não carregar, troca pelo placeholder gerado
  function attachPhotoFallback(scope) {
    scope.querySelectorAll("img[data-pid]").forEach((img) => {
      img.onerror = function () {
        const p = getProduct(this.dataset.pid);
        this.onerror = null;
        if (p) this.src = p.placeholder;
      };
    });
  }

  /* ---------- Vitrine imersiva ---------- */
  function renderShowcase() {
    const stage = $("#showStage");
    const dots = $("#showDots");
    if (!stage || typeof FEATURED === "undefined") return;
    stage.innerHTML = "";
    dots.innerHTML = "";
    FEATURED.forEach((f, i) => {
      const slide = document.createElement("article");
      slide.className = "slide" + (i === 0 ? " is-active" : "");
      slide.dataset.glow = f.glow;
      slide.dataset.bg = (f.bg || []).join(",");
      slide.style.background = `radial-gradient(700px 500px at 30% 50%, ${hexA(f.glow, .12)}, transparent 70%)`;
      slide.innerHTML = `
        <div class="slide__visual">
          <span class="slide__ring"></span>
          <img class="slide__photo" src="${f.photo}" alt="${f.name}" hidden />
          <span class="slide__flower">${f.flower}</span>
        </div>
        <div class="slide__text">
          <span class="slide__index">${String(i + 1).padStart(2, "0")} / ${String(FEATURED.length).padStart(2, "0")}</span>
          <h3 class="slide__name">${f.name}</h3>
          <p class="slide__tagline">${f.tagline}</p>
          <p class="slide__story">${f.story}</p>
          ${f.price ? `<p class="slide__price">${fmt.format(f.price)} <span>· entrega a combinar</span></p>` : ""}
          <button class="btn btn--primary" data-add="${f.id}">Adicionar à sacola</button>
        </div>`;
      stage.appendChild(slide);

      const dot = document.createElement("span");
      dot.className = "show-dot" + (i === 0 ? " is-active" : "");
      dots.appendChild(dot);
    });
    // Mostra a foto real no destaque se ela existir; senão mantém o emoji
    stage.querySelectorAll(".slide__photo").forEach((img) => {
      img.onload = function () {
        this.hidden = false;
        const emoji = this.parentElement.querySelector(".slide__flower");
        if (emoji) emoji.style.display = "none";
      };
      img.onerror = function () { this.remove(); };
    });
  }

  /* ---------- Galeria horizontal (coleções) ---------- */
  // Foto representativa de cada categoria (do catálogo)
  const CATEGORY_IMG = {
    "Buquês": "assets/buque-1000-flores.jpg",
    "Combos": "assets/combo-romance.jpg",
    "Arranjos": "assets/arranjo-girassois.jpg",
    "Cestas": "assets/cesta-chocolate.jpg",
    "Complementos": "assets/comp-urso.jpg",
  };
  function renderHGallery() {
    const track = $("#hgTrack");
    if (!track) return;
    track.innerHTML = "";
    Object.keys(CATEGORY_COLORS).forEach((cat) => {
      const [c1, c2] = CATEGORY_COLORS[cat];
      const emoji = (typeof CATEGORY_EMOJI !== "undefined" && CATEGORY_EMOJI[cat]) || "🌻";
      const card = document.createElement("div");
      card.className = "hcard";
      card.style.background = `linear-gradient(150deg, ${c1}, ${c2})`; // fallback
      card.dataset.cat = cat;
      const src = CATEGORY_IMG[cat];
      const imgHtml = src ? `<img class="hcard__img" src="${src}" alt="${cat}" loading="lazy" />` : `<span class="hcard__emoji">${emoji}</span>`;
      card.innerHTML = `${imgHtml}<h3 class="hcard__name">${cat}</h3>`;
      // Se a foto faltar, mostra o emoji sobre o gradiente
      const im = card.querySelector(".hcard__img");
      if (im) im.onerror = function () { this.remove(); card.insertAdjacentHTML("afterbegin", `<span class="hcard__emoji">${emoji}</span>`); };
      card.addEventListener("click", () => {
        activeCategory = cat; renderFilters(); renderProducts();
        document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
      });
      track.appendChild(card);
    });
  }

  /* ---------- Instagram (prévia do perfil) ---------- */
  // Principais produtos exibidos como "posts" (3x3)
  const INSTA_PRODUCTS = [
    "buque-1000-flores", "combo-romance", "buque-rosas",
    "buque-girassois", "buque-luxo", "buque-van-gogh",
    "buque-lirio", "cesta-chocolate", "arranjo-girassois",
  ];

  function renderInsta() {
    const gridEl = $("#instaGrid");
    const widget = $("#instaWidget");

    // Cabeçalho do perfil (stats + bio)
    const s = CONFIG.instagramStats || {};
    const setText = (sel, v) => { const el = $(sel); if (el && v) el.textContent = v; };
    setText("#igPosts", s.posts);
    setText("#igFollowers", s.followers);
    setText("#igFollowing", s.following);
    setText("#igAddress", CONFIG.address);
    if (CONFIG.instagramUser) setText("#igUser", CONFIG.instagramUser);

    // Avatar: usa assets/perfil.jpg; se não existir, mostra o 🌻
    const avatar = $("#igAvatar");
    if (avatar) {
      const aimg = avatar.querySelector("img");
      if (aimg) aimg.onerror = () => avatar.classList.add("no-photo");
    }

    // Destaques (stories)
    const hlWrap = $("#igHighlights");
    if (hlWrap) {
      hlWrap.innerHTML = "";
      (CONFIG.instagramHighlights || []).forEach((h, i) => {
        const el = document.createElement("a");
        el.className = "ig-hl";
        el.href = CONFIG.instagram || "#";
        el.target = "_blank"; el.rel = "noopener";
        el.innerHTML = `
          <span class="ig-hl__ring" data-hl="${i}"><img src="assets/destaque-${i + 1}.jpg" alt="${h.label}" loading="lazy" hidden /><i>${h.emoji || "🌻"}</i></span>
          <span class="ig-hl__label">${h.label}</span>`;
        // mostra a foto do destaque se existir; senão mantém o emoji
        const img = el.querySelector("img");
        const emoji = el.querySelector("i");
        img.onload = () => { img.hidden = false; if (emoji) emoji.style.display = "none"; };
        img.onerror = () => img.remove();
        hlWrap.appendChild(el);
      });
    }

    if (!gridEl) return;
    // Se a pessoa colou um widget de feed ao vivo, ele assume o lugar da grade
    if (widget && widget.children.length > 0) { gridEl.classList.add("is-hidden"); return; }

    gridEl.innerHTML = "";
    INSTA_PRODUCTS.forEach((id) => {
      const p = getProduct(id);
      if (!p) return;
      const a = document.createElement("a");
      a.className = "ig-post";
      a.href = CONFIG.instagram || "#";
      a.target = "_blank"; a.rel = "noopener";
      a.innerHTML = `
        <img src="${p.photo}" alt="${p.name}" loading="lazy" data-pid="${p.id}" />
        <div class="ig-post__overlay">
          <span class="ig-post__likes">❤️ ${fmt.format(p.price)}</span>
          <span class="ig-post__name">${p.name}</span>
        </div>`;
      gridEl.appendChild(a);
    });
    attachPhotoFallback(gridEl);
  }

  /* ---------- Ocasiões ---------- */
  const OCCASIONS = [
    { label: "Aniversário", emoji: "🎂" },
    { label: "Amor & Romance", emoji: "❤️" },
    { label: "Parabéns / Formatura", emoji: "🎓" },
    { label: "Nascimento", emoji: "👶" },
    { label: "Agradecimento", emoji: "🙏" },
    { label: "Casamento", emoji: "💍" },
    { label: "Condolências", emoji: "🕊️" },
    { label: "Só porque sim 🌻", emoji: "🌻" },
  ];
  function renderOccasions() {
    const el = $("#occasionsGrid");
    if (!el) return;
    el.innerHTML = "";
    OCCASIONS.forEach((o) => {
      const a = document.createElement("a");
      a.className = "occasion reveal";
      a.href = waLink(`Olá! Quero um arranjo para *${o.label}* ${o.emoji}`);
      a.target = "_blank"; a.rel = "noopener";
      a.innerHTML = `
        <span class="occasion__emoji">${o.emoji}</span>
        <span class="occasion__label">${o.label}</span>
        <span class="occasion__hint">pedir no WhatsApp →</span>`;
      el.appendChild(a);
    });
  }

  /* ---------- Depoimentos ----------
     EXEMPLOS — troque pelos depoimentos reais dos seus clientes.        */
  const TESTIMONIALS = [
    { name: "Ana Paula", meta: "Contagem/MG", stars: 5, text: "Buquê lindo e entregue no horário! Minha mãe amou. Já virei cliente." },
    { name: "Rafael", meta: "Cliente pelo Instagram", stars: 5, text: "Pedi de última hora pelo WhatsApp e resolveram tudo. Atendimento nota 10." },
    { name: "Juliana", meta: "Industrial · Contagem", stars: 5, text: "As flores duraram muito! Caprichosos no arranjo e no cartão. Recomendo demais." },
  ];
  function renderReviews() {
    const el = $("#reviewsGrid");
    if (!el) return;
    el.innerHTML = "";
    TESTIMONIALS.forEach((t) => {
      const c = document.createElement("article");
      c.className = "review reveal";
      c.innerHTML = `
        <div class="review__stars">${"★".repeat(t.stars)}${"☆".repeat(5 - t.stars)}</div>
        <p class="review__text">“${t.text}”</p>
        <div class="review__who">
          <span class="review__avatar">${t.name.charAt(0)}</span>
          <div><div class="review__name">${t.name}</div><div class="review__meta">${t.meta}</div></div>
        </div>`;
      el.appendChild(c);
    });
  }

  /* ---------- FAQ ---------- */
  const FAQ = [
    { q: "Vocês entregam em quais regiões?", a: "Entregamos em Contagem e região. Consulte a taxa e o prazo pelo WhatsApp, informando o endereço." },
    { q: "Como faço o pedido?", a: "Monte sua sacola aqui no site e clique em finalizar — o pedido chega pronto no nosso WhatsApp, onde combinamos pagamento e entrega." },
    { q: "Quais as formas de pagamento?", a: "As formas de pagamento são combinadas pelo WhatsApp na hora de fechar o pedido." },
    { q: "Posso enviar para outra pessoa?", a: "Sim! É só informar o endereço do destinatário e a mensagem do cartão. Cuidamos do resto." },
    { q: "Com quanta antecedência devo pedir?", a: "Sempre que possível, peça com antecedência. Para entregas no mesmo dia, consulte a disponibilidade pelo WhatsApp." },
    { q: "As flores são frescas?", a: "Sim! Selecionamos flores fresquinhas diariamente e montamos cada arranjo na hora." },
  ];
  function renderFaq() {
    const el = $("#faqList");
    if (!el) return;
    el.innerHTML = "";
    FAQ.forEach((item) => {
      const d = document.createElement("div");
      d.className = "faq-item";
      d.innerHTML = `
        <button class="faq-item__q" type="button">${item.q}</button>
        <div class="faq-item__a"><p>${item.a}</p></div>`;
      const q = d.querySelector(".faq-item__q");
      const a = d.querySelector(".faq-item__a");
      q.addEventListener("click", () => {
        const open = d.classList.toggle("is-open");
        a.style.maxHeight = open ? a.scrollHeight + "px" : "0";
      });
      el.appendChild(d);
    });
  }

  /* ---------- Contato ---------- */
  function renderContact() {
    const map = $("#contactMap");
    if (map && CONFIG.address) { map.textContent = CONFIG.address; map.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.address); }
    const frame = $("#mapFrame");
    if (frame && CONFIG.address) frame.src = "https://www.google.com/maps?q=" + encodeURIComponent(CONFIG.address) + "&output=embed";
  }

  /* ---------- Quick-view (detalhe do produto) ---------- */
  let qvId = null, qvQty = 1, qvVar = null; // qvVar = índice da variação escolhida
  const qvModal = $("#qvModal");
  const qvOverlay = $("#qvOverlay");

  function qvUnitPrice() {
    const p = getProduct(qvId); if (!p) return 0;
    const v = variantOf(p, qvVar);
    return v ? v.price : p.price;
  }
  function qvUpdatePrice() { $("#qvPrice").textContent = fmt.format(qvUnitPrice()); }

  function renderQvVariants(p) {
    const wrap = $("#qvVariants"), chips = $("#qvChips");
    if (!wrap || !chips) return;
    if (!p.variants || p.variants.options.length < 2) { wrap.hidden = true; chips.innerHTML = ""; return; }
    wrap.hidden = false;
    $("#qvVariantsLabel").textContent = p.variants.name;
    chips.innerHTML = "";
    p.variants.options.forEach((opt, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "qv-chip" + (i === qvVar ? " is-active" : "");
      b.textContent = `${opt.label} · ${fmt.format(opt.price)}`;
      b.addEventListener("click", () => {
        qvVar = i;
        chips.querySelectorAll(".qv-chip").forEach((c, ci) => c.classList.toggle("is-active", ci === i));
        qvUpdatePrice();
      });
      chips.appendChild(b);
    });
  }

  function openQuickView(id) {
    const p = getProduct(id);
    if (!p || !qvModal) return;
    qvId = id; qvQty = 1;
    qvVar = (p.variants && p.variants.options.length > 1) ? 0 : null; // 1ª opção por padrão
    $("#qvQty").textContent = "1";
    $("#qvCat").textContent = p.category;
    $("#qvName").textContent = p.name;
    $("#qvDesc").textContent = p.description;
    $("#qvBadge").textContent = p.badge || "";
    renderQvVariants(p);
    qvUpdatePrice();
    const img = $("#qvImg");
    img.alt = p.name; img.dataset.pid = p.id; img.src = p.photo;
    img.onerror = function () { this.onerror = null; this.src = p.placeholder; };
    qvModal.classList.add("is-open"); qvOverlay.classList.add("is-open");
    qvModal.setAttribute("aria-hidden", "false");
    if (window.lenisStop) window.lenisStop();
  }
  function closeQuickView() {
    if (!qvModal) return;
    qvModal.classList.remove("is-open"); qvOverlay.classList.remove("is-open");
    qvModal.setAttribute("aria-hidden", "true");
    if (!drawer.classList.contains("is-open") && window.lenisStart) window.lenisStart();
  }
  function qvChange(d) { qvQty = Math.max(1, qvQty + d); $("#qvQty").textContent = qvQty; }
  function qvAddToCart() {
    if (!qvId) return;
    addToCart(keyOf(qvId, qvVar), qvQty);
    closeQuickView(); openCart();
  }
  function qvBuyNow() {
    const k = keyOf(qvId, qvVar);
    if (!lineProduct(k)) return;
    const unit = qvUnitPrice();
    window.open(waLink(`Olá! Tenho interesse em:\n${qvQty}x ${lineName(k)} — ${fmt.format(unit)} cada\n(${fmt.format(unit * qvQty)})`), "_blank");
  }

  /* ---------- Sacola ---------- */
  function renderCart() {
    const ids = Object.keys(cart);
    const n = totalItems();
    cartCount.textContent = n;
    cartCount.classList.toggle("is-visible", n > 0);
    cartTotal.textContent = fmt.format(totalPrice());
    const label = $("#cartCountLabel");
    if (label) label.textContent = n > 0 ? `Total (${n} ${n === 1 ? "item" : "itens"})` : "Total";

    // Formulário e botão de finalizar só aparecem com itens na sacola
    checkout.hidden = ids.length === 0;
    sendWhats.disabled = ids.length === 0;
    cartNote.textContent = ids.length === 0
      ? "A taxa de entrega é combinada pelo WhatsApp."
      : "Preencha os dados e finalize — o pedido vai pronto pro nosso WhatsApp.";

    if (ids.length === 0) {
      cartItems.innerHTML = `<div class="cart-empty"><span>🌻</span>Sua sacola está vazia.<br>Escolha suas flores favoritas!</div>`;
      return;
    }
    cartItems.innerHTML = "";
    ids.forEach((k) => {
      const p = lineProduct(k); if (!p) return;
      const qty = cart[k];
      const unit = lineUnitPrice(k);
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <img class="cart-item__img" src="${p.photo}" alt="${p.name}" data-pid="${p.id}" />
        <div>
          <div class="cart-item__name">${lineName(k)}</div>
          <div class="cart-item__price">${fmt.format(unit)}</div>
          <div class="qty">
            <button data-dec="${k}" aria-label="Diminuir">−</button>
            <span>${qty}</span>
            <button data-inc="${k}" aria-label="Aumentar">+</button>
          </div>
          <button class="cart-item__remove" data-del="${k}">remover</button>
        </div>
        <div class="cart-item__line">${fmt.format(unit * qty)}</div>`;
      cartItems.appendChild(row);
    });
    attachPhotoFallback(cartItems);
  }

  // key pode ser "id" ou "id::indice" (variação); qty opcional
  function addToCart(key, qty) {
    if (!lineProduct(key)) return;
    cart[key] = (cart[key] || 0) + (qty || 1); saveCart(); renderCart();
    bumpCart(); toast("Adicionado à sacola 🌻");
  }
  function changeQty(key, d) { cart[key] = (cart[key] || 0) + d; if (cart[key] <= 0) delete cart[key]; saveCart(); renderCart(); }
  function removeItem(id) { delete cart[id]; saveCart(); renderCart(); }

  function bumpCart() {
    const btn = $("#openCart");
    if (!btn || !window.gsap) return;
    window.gsap.fromTo(btn, { scale: 1 }, { scale: 1.25, duration: .15, yoyo: true, repeat: 1, ease: "power2.out" });
  }

  /* ---------- Drawer ---------- */
  function openCart() { drawer.classList.add("is-open"); overlay.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); if (window.lenisStop) window.lenisStop(); }
  function closeCart() { drawer.classList.remove("is-open"); overlay.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); if (window.lenisStart) window.lenisStart(); }

  /* ---------- Finalizar compra → WhatsApp ---------- */
  function sendToWhatsApp() {
    if (totalItems() === 0) return;
    // Se faltar preencher os campos obrigatórios, mostra o formulário e valida
    checkout.hidden = false;
    if (!checkout.reportValidity()) {
      checkout.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }
    const d = Object.fromEntries(new FormData(checkout).entries());
    const n = totalItems();
    const L = [];
    L.push(`*Novo pedido — ${CONFIG.storeName}* 🌻`, "");
    L.push(`*Itens (${n}):*`);
    Object.entries(cart).forEach(([k, q]) => {
      if (lineProduct(k)) L.push(`• ${q}x ${lineName(k)} — ${fmt.format(lineUnitPrice(k) * q)}`);
    });
    L.push("", `*Subtotal: ${fmt.format(totalPrice())}*`);
    L.push(CONFIG.deliveryFee > 0 ? `Entrega: ${fmt.format(CONFIG.deliveryFee)}` : "_Entrega a combinar_", "");
    L.push("*Dados de entrega:*");
    L.push(`👤 Cliente: ${d.nome || "-"}`);
    if (d.destinatario) L.push(`🎁 Destinatário: ${d.destinatario}`);
    L.push(`📱 Telefone: ${d.telefone || "-"}`);
    L.push(`📍 Endereço: ${d.endereco || "-"}`);
    if (d.cep)  L.push(`📮 CEP: ${d.cep}`);
    if (d.data) L.push(`📅 Data de entrega: ${formatDate(d.data)}`);
    if (d.cartao) L.push(`💌 Cartão: "${d.cartao}"`);
    if (d.obs)    L.push(`📝 Obs: ${d.obs}`);
    L.push("", "_Enviado pelo site 🌻_");
    window.open(waLink(L.join("\n")), "_blank");
    toast("Abrindo o WhatsApp… 📱");
  }
  function formatDate(iso) { const [y, m, d] = iso.split("-"); return `${d}/${m}/${y}`; }

  /* ---------- Helpers ---------- */
  function waLink(msg) { return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`; }
  function hexA(hex, a) {
    const n = parseInt(hex.replace("#", ""), 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }
  let toastTimer;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add("is-show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("is-show"), 1800);
  }

  /* ---------- Eventos ---------- */
  document.addEventListener("click", (e) => {
    const oq = e.target.closest("[data-open-qv]"); if (oq) { openQuickView(oq.dataset.openQv); return; }
    const add = e.target.closest("[data-add]"); if (add) { addToCart(add.dataset.add); return; }
    const inc = e.target.closest("[data-inc]"); if (inc) return changeQty(inc.dataset.inc, +1);
    const dec = e.target.closest("[data-dec]"); if (dec) return changeQty(dec.dataset.dec, -1);
    const del = e.target.closest("[data-del]"); if (del) return removeItem(del.dataset.del);
    // Clicar no card (fora do botão) abre o detalhe do produto
    const qv = e.target.closest("[data-qv]"); if (qv) openQuickView(qv.dataset.qv);
  });
  $("#openCart").addEventListener("click", openCart);
  $("#ctaCart").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  sendWhats.addEventListener("click", sendToWhatsApp);

  // Quick-view
  $("#qvClose").addEventListener("click", closeQuickView);
  qvOverlay.addEventListener("click", closeQuickView);
  $("#qvInc").addEventListener("click", () => qvChange(+1));
  $("#qvDec").addEventListener("click", () => qvChange(-1));
  $("#qvAdd").addEventListener("click", qvAddToCart);
  $("#qvBuy").addEventListener("click", qvBuyNow);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (qvModal && qvModal.classList.contains("is-open")) closeQuickView();
    else closeCart();
  });

  const baseWhats = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("Olá! Vim pelo site da Flora Mil Flores 🌸")}`;
  $("#whatsFloat").href = baseWhats;
  $("#footerWhats").href = baseWhats;
  if (CONFIG.instagram) {
    ["#footerInsta", "#instaBtn", "#igUser", "#igFollow", "#igAvatar", "#igMore", "#contactInsta"].forEach((sel) => { const el = $(sel); if (el) el.href = CONFIG.instagram; });
  }
  // Links que vão pro WhatsApp
  ["#igMessage", "#igWhats", "#contactWhats", "#contactCta"].forEach((sel) => { const el = $(sel); if (el) el.href = baseWhats; });
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Init ---------- */
  renderFilters();
  renderProducts();
  renderShowcase();
  renderHGallery();
  renderOccasions();
  renderReviews();
  renderFaq();
  renderContact();
  renderInsta();
  renderCart();

  return { openCart, closeCart, openQuickView, getProductCount: () => PRODUCTS.length };
})();
