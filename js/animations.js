/* ===========================================================================
   Flora Mil Flores — Animações imersivas (GSAP + ScrollTrigger + Lenis)
   Tudo aqui é progressivo: se algo não carregar, o site continua funcional.
   =========================================================================== */
window.Anim = (function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = !!window.gsap;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  let lenis = null;

  /* ===================== LOADER ===================== */
  function runLoader(done) {
    const loader = $("#loader");
    const bar = $("#loaderBar");
    const finish = () => {
      document.body.classList.remove("is-loading");
      if (loader) loader.classList.add("is-done");
      done && done();
    };
    if (!hasGSAP || reduce) {
      if (bar) bar.style.width = "100%";
      setTimeout(finish, reduce ? 0 : 600);
      return;
    }
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(bar, { width: "100%", duration: 1.1, ease: "power2.inOut" })
      .to("#loader .loader__inner", { y: -20, opacity: 0, duration: .5, ease: "power2.in" }, "+=.1");
  }

  /* ===================== SMOOTH SCROLL (Lenis) ===================== */
  function initSmoothScroll() {
    if (reduce || typeof Lenis === "undefined") return;
    lenis = new Lenis({ duration: 1.1, smoothWheel: true, lerp: .1 });
    window.lenisStop = () => lenis && lenis.stop();
    window.lenisStart = () => lenis && lenis.start();
    if (hasGSAP && window.ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    // Navegação por âncora suave
    $$("[data-scroll]").forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id && id.startsWith("#")) {
          const target = document.querySelector(id);
          if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -10 }); }
        }
      });
    });
  }

  /* ===================== PÉTALAS NO HERO ===================== */
  function initPetals() {
    const wrap = $("#petals");
    if (!wrap || reduce) return;
    const kinds = ["🌻", "🌼", "🌻", "🌿", "🏵️", "🌼"];
    const N = window.innerWidth < 700 ? 10 : 18;
    for (let i = 0; i < N; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.textContent = kinds[i % kinds.length];
      p.style.left = Math.random() * 100 + "%";
      p.style.fontSize = (0.9 + Math.random() * 1.6) + "rem";
      wrap.appendChild(p);
      if (hasGSAP) {
        gsap.set(p, { y: -50, rotation: Math.random() * 360 });
        gsap.to(p, {
          y: window.innerHeight + 80,
          x: "+=" + (Math.random() * 160 - 80),
          rotation: "+=" + (Math.random() * 360 + 180),
          duration: 6 + Math.random() * 8,
          delay: Math.random() * 8,
          repeat: -1,
          ease: "none",
          onRepeat() { gsap.set(p, { y: -50, x: 0 }); },
        });
      }
    }
  }

  /* ===================== HERO INTRO + PARALLAX ===================== */
  function initHero() {
    if (!hasGSAP) return;
    const items = $$("[data-hero]");
    gsap.set(items, { y: 40, opacity: 0 });
    const tl = gsap.timeline({ delay: .2 });
    tl.to(items, { y: 0, opacity: 1, duration: 1, stagger: .12, ease: "power3.out" });
    gsap.fromTo("#heroBloom", { scale: .8, opacity: 0 }, { scale: 1, opacity: .9, duration: 1.6, ease: "power2.out" });

    if (window.ScrollTrigger && !reduce) {
      gsap.to("#heroBloom", { yPercent: 30, scale: 1.25, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero__content", { yPercent: 18, opacity: .2, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    }
  }

  /* ===================== STATEMENT: reveal por palavra ===================== */
  function initStatement() {
    const el = $("#statementText");
    if (!el) return;
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");
    if (!hasGSAP || !window.ScrollTrigger) { $$(".word", el).forEach((w) => (w.style.opacity = 1)); return; }
    if (reduce) { gsap.set(".statement .word", { opacity: 1 }); return; }
    gsap.to(".statement .word", {
      opacity: 1, stagger: .04, ease: "none",
      scrollTrigger: { trigger: ".statement", start: "top 75%", end: "bottom 60%", scrub: true },
    });
  }

  /* ===================== VITRINE IMERSIVA (pinned + scrub) ===================== */
  function initShowcase() {
    const slides = $$(".slide");
    const dots = $$(".show-dot");
    const glow = $("#showGlow");
    const section = $("#vitrine");
    if (!slides.length) return;

    if (!hasGSAP || !window.ScrollTrigger || reduce) {
      // Fallback: empilha os slides verticalmente, todos visíveis
      slides.forEach((s) => { s.style.position = "relative"; s.style.opacity = 1; s.style.minHeight = "80vh"; });
      const sticky = $(".showcase__sticky"); if (sticky) { sticky.style.position = "static"; sticky.style.height = "auto"; }
      return;
    }

    gsap.set(slides, { opacity: 0, scale: .92 });
    gsap.set(slides[0], { opacity: 1, scale: 1 });
    setGlow(0);
    let current = 0;

    function setGlow(i) {
      const s = slides[i];
      if (glow && s) glow.style.background = `radial-gradient(circle, ${s.dataset.glow}, transparent 70%)`;
      const bg = (s.dataset.bg || "").split(",");
      if (bg.length === 2) {
        gsap.to(".showcase__sticky", { background: `linear-gradient(160deg, ${bg[0]}, ${bg[1]})`, duration: .8, ease: "power2.out" });
      }
    }
    function goTo(i) {
      if (i === current) return;
      const dir = i > current ? 1 : -1;
      gsap.to(slides[current], { opacity: 0, scale: .92, xPercent: -6 * dir, duration: .6, ease: "power2.inOut" });
      gsap.fromTo(slides[i], { opacity: 0, scale: .92, xPercent: 6 * dir },
        { opacity: 1, scale: 1, xPercent: 0, duration: .7, ease: "power2.out" });
      dots[current] && dots[current].classList.remove("is-active");
      dots[i] && dots[i].classList.add("is-active");
      setGlow(i);
      current = i;
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => "+=" + window.innerHeight * slides.length,
      pin: ".showcase__sticky",
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const idx = Math.min(slides.length - 1, Math.floor(self.progress * slides.length));
        goTo(idx);
        // vida extra: a flor ativa gira/respira conforme o scroll
        const flower = slides[current].querySelector(".slide__flower");
        if (flower) gsap.set(flower, { rotation: (self.progress * 40) - 20, y: Math.sin(self.progress * 6) * 14 });
      },
    });
  }

  /* ===================== GALERIA HORIZONTAL (pinned) ===================== */
  function initHGallery() {
    const track = $("#hgTrack");
    const section = $("#colecoes");
    if (!track || !hasGSAP || !window.ScrollTrigger || reduce) return;
    const getDist = () => track.scrollWidth - window.innerWidth + 40;
    if (getDist() <= 0) return; // cabe na tela, não precisa scroll horizontal
    gsap.to(track, {
      x: () => -getDist(), ease: "none",
      scrollTrigger: {
        trigger: section, start: "top top", end: () => "+=" + getDist(),
        pin: true, scrub: 1, invalidateOnRefresh: true,
      },
    });
  }

  /* ===================== ABOUT PARALLAX ===================== */
  function initAbout() {
    if (!hasGSAP || !window.ScrollTrigger || reduce) return;
    gsap.to("#aboutArt", { yPercent: -25, rotation: 18, ease: "none",
      scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: true } });
  }

  /* ===================== REVEALS GENÉRICOS ===================== */
  function refreshReveals() {
    if (!hasGSAP || !window.ScrollTrigger) { $$(".reveal").forEach((e) => (e.style.opacity = 1)); return; }
    if (reduce) { gsap.set(".reveal", { opacity: 1, y: 0 }); return; }
    $$(".reveal").forEach((el) => {
      if (el.dataset.revealed) return;
      el.dataset.revealed = "1";
      gsap.fromTo(el, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: .9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }

  /* ===================== HEADER + PROGRESSO ===================== */
  function initHeaderAndProgress() {
    const header = $("#header");
    const prog = $("#scrollProgress");
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (prog) prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      if (header) {
        header.classList.toggle("is-scrolled", y > 60);
        // esconde ao descer, mostra ao subir (só depois do hero)
        if (y > window.innerHeight * 0.9) header.classList.toggle("is-hidden", y > lastY);
        else header.classList.remove("is-hidden");
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ===================== INIT ===================== */
  function init() {
    if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    initSmoothScroll();
    initHeaderAndProgress();
    runLoader(() => {
      initHero();
      initPetals();
    });
    initStatement();
    initShowcase();
    initHGallery();
    initAbout();
    refreshReveals();
    if (hasGSAP && window.ScrollTrigger) {
      window.addEventListener("load", () => ScrollTrigger.refresh());
      setTimeout(() => ScrollTrigger.refresh(), 800);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  return { refreshReveals };
})();
