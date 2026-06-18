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
  const goCheckout = $("#goCheckout");
  const sendWhats  = $("#sendWhats");
  const backToCart = $("#backToCart");
  const cartNote   = $("#cartNote");

  /* ---------- Persistência ---------- */
  function loadCart() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
  function saveCart() { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }
  function getProduct(id) { return PRODUCTS.find((p) => p.id === id); }
  function totalItems() { return Object.values(cart).reduce((a, b) => a + b, 0); }
  function totalPrice() {
    return Object.entries(cart).reduce((s, [id, q]) => { const p = getProduct(id); return p ? s + p.price * q : s; }, 0);
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
            <span class="card__price">${fmt.format(p.price)}</span>
            <button class="add-btn" data-add="${p.id}">+ Sacola</button>
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
  function renderHGallery() {
    const track = $("#hgTrack");
    if (!track) return;
    track.innerHTML = "";
    Object.keys(CATEGORY_COLORS).forEach((cat) => {
      const [c1, c2] = CATEGORY_COLORS[cat];
      const emoji = { "Buquês": "💐", "Arranjos": "🌷", "Plantas": "🪴", "Cestas": "🧺", "Datas Especiais": "🌹" }[cat] || "🌸";
      const card = document.createElement("div");
      card.className = "hcard";
      card.style.background = `linear-gradient(150deg, ${c1}, ${c2})`;
      card.dataset.cat = cat;
      card.innerHTML = `<span class="hcard__emoji">${emoji}</span><h3 class="hcard__name">${cat}</h3>`;
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
    "buque-rosas-vermelhas", "buque-ursinho", "arranjo-orquidea",
    "buque-girassois", "rosas-caixa-joias", "cesta-chocolates",
    "buque-primavera", "planta-suculentas", "arranjo-mesa",
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

  /* ---------- Sacola ---------- */
  function renderCart() {
    const ids = Object.keys(cart);
    cartCount.textContent = totalItems();
    cartCount.classList.toggle("is-visible", totalItems() > 0);
    cartTotal.textContent = fmt.format(totalPrice());

    if (ids.length === 0) {
      cartItems.innerHTML = `<div class="cart-empty"><span>🌷</span>Sua sacola está vazia.<br>Escolha suas flores favoritas!</div>`;
      goCheckout.disabled = true; exitCheckout(); return;
    }
    goCheckout.disabled = false;
    cartItems.innerHTML = "";
    ids.forEach((id) => {
      const p = getProduct(id); if (!p) return;
      const qty = cart[id];
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <img class="cart-item__img" src="${p.photo}" alt="${p.name}" data-pid="${p.id}" />
        <div>
          <div class="cart-item__name">${p.name}</div>
          <div class="cart-item__price">${fmt.format(p.price)}</div>
          <div class="qty">
            <button data-dec="${id}" aria-label="Diminuir">−</button>
            <span>${qty}</span>
            <button data-inc="${id}" aria-label="Aumentar">+</button>
          </div>
          <button class="cart-item__remove" data-del="${id}">remover</button>
        </div>
        <div class="cart-item__line">${fmt.format(p.price * qty)}</div>`;
      cartItems.appendChild(row);
    });
    attachPhotoFallback(cartItems);
  }

  function addToCart(id) {
    if (!getProduct(id)) return;
    cart[id] = (cart[id] || 0) + 1; saveCart(); renderCart();
    bumpCart(); toast("Adicionado à sacola 🌻");
  }
  function changeQty(id, d) { cart[id] = (cart[id] || 0) + d; if (cart[id] <= 0) delete cart[id]; saveCart(); renderCart(); }
  function removeItem(id) { delete cart[id]; saveCart(); renderCart(); }

  function bumpCart() {
    const btn = $("#openCart");
    if (!btn || !window.gsap) return;
    window.gsap.fromTo(btn, { scale: 1 }, { scale: 1.25, duration: .15, yoyo: true, repeat: 1, ease: "power2.out" });
  }

  /* ---------- Drawer ---------- */
  function openCart() { drawer.classList.add("is-open"); overlay.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); if (window.lenisStop) window.lenisStop(); }
  function closeCart() { drawer.classList.remove("is-open"); overlay.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); if (window.lenisStart) window.lenisStart(); }

  /* ---------- Checkout ---------- */
  function enterCheckout() {
    if (totalItems() === 0) return;
    checkout.hidden = false; goCheckout.hidden = true; sendWhats.hidden = false; backToCart.hidden = false;
    cartNote.textContent = "Preencha os dados e enviaremos o pedido pelo WhatsApp.";
    checkout.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  function exitCheckout() {
    checkout.hidden = true; goCheckout.hidden = false; sendWhats.hidden = true; backToCart.hidden = true;
    cartNote.textContent = "A taxa de entrega é combinada pelo WhatsApp.";
  }

  function sendToWhatsApp() {
    if (totalItems() === 0) return;
    if (!checkout.reportValidity()) return;
    const d = Object.fromEntries(new FormData(checkout).entries());
    const L = [];
    L.push(`*Novo pedido — ${CONFIG.storeName}* 🌸`, "");
    L.push("*Itens:*");
    Object.entries(cart).forEach(([id, q]) => { const p = getProduct(id); if (p) L.push(`• ${q}x ${p.name} — ${fmt.format(p.price * q)}`); });
    L.push("", `*Total: ${fmt.format(totalPrice())}*`);
    L.push(CONFIG.deliveryFee > 0 ? `Entrega: ${fmt.format(CONFIG.deliveryFee)}` : "_Entrega a combinar_", "");
    L.push("*Dados de entrega:*");
    L.push(`Cliente: ${d.nome || "-"}`);
    if (d.destinatario) L.push(`Destinatário: ${d.destinatario}`);
    L.push(`Telefone: ${d.telefone || "-"}`, `Endereço: ${d.endereco || "-"}`);
    if (d.cep)  L.push(`CEP: ${d.cep}`);
    if (d.data) L.push(`Data de entrega: ${formatDate(d.data)}`);
    if (d.cartao) L.push(`Mensagem do cartão: "${d.cartao}"`);
    if (d.obs)    L.push(`Observações: ${d.obs}`);
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(L.join("\n"))}`, "_blank");
  }
  function formatDate(iso) { const [y, m, d] = iso.split("-"); return `${d}/${m}/${y}`; }

  /* ---------- Helpers ---------- */
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
    const add = e.target.closest("[data-add]"); if (add) addToCart(add.dataset.add);
    const inc = e.target.closest("[data-inc]"); if (inc) changeQty(inc.dataset.inc, +1);
    const dec = e.target.closest("[data-dec]"); if (dec) changeQty(dec.dataset.dec, -1);
    const del = e.target.closest("[data-del]"); if (del) removeItem(del.dataset.del);
  });
  $("#openCart").addEventListener("click", openCart);
  $("#ctaCart").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  goCheckout.addEventListener("click", enterCheckout);
  backToCart.addEventListener("click", exitCheckout);
  sendWhats.addEventListener("click", sendToWhatsApp);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });

  const baseWhats = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("Olá! Vim pelo site da Flora Mil Flores 🌸")}`;
  $("#whatsFloat").href = baseWhats;
  $("#footerWhats").href = baseWhats;
  if (CONFIG.instagram) {
    ["#footerInsta", "#instaBtn", "#igUser", "#igFollow", "#igAvatar", "#igMore"].forEach((sel) => { const el = $(sel); if (el) el.href = CONFIG.instagram; });
  }
  // "Enviar mensagem" e o link wa.me da bio vão pro WhatsApp
  ["#igMessage", "#igWhats"].forEach((sel) => { const el = $(sel); if (el) el.href = baseWhats; });
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Init ---------- */
  renderFilters();
  renderProducts();
  renderShowcase();
  renderHGallery();
  renderInsta();
  renderCart();

  return { openCart, closeCart, getProductCount: () => PRODUCTS.length };
})();
