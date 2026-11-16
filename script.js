/* =====================================================================
   CONFIGURATION – seul bloc à modifier pour les coordonnées et contenus
   ===================================================================== */
const CONFIG = {
  name: "Association Tassakat pour le Développement et la Coopération",
  lang: "fr",                 // "fr" aujourd’hui ; "ar" (RTL) ou "en" plus tard
  whatsapp: "",               // ex. "212600000000" (indicatif pays, sans + ni espaces). Vide = non configuré
  email: "",                  // ex. "contact@exemple.org". Vide = non configuré
  socials: {                  // laisser "" si non fourni (aucun lien n’est affiché)
    facebook: "", instagram: "", youtube: "", linkedin: ""
  },
  imagesPath: "assets/images/",   // dossier des photos (noms de fichiers dans index.html, attribut data-img)
  logo: "assets/logo/logo.png",   // [LOGO OFFICIEL À INTÉGRER] : déposer le fichier ici
  stats: { habitants: "", foyers: "" },  // "" = « [XX] » affiché ; renseigner uniquement si vérifié (ex. "350")
  // Indicateurs complémentaires par réalisation – uniquement si confirmés (sinon laisser "")
  optional: { eau: "", solaire: "", moussalla: "", cimetiere: "" },
  messages: {
    general: "Bonjour, je souhaite prendre contact avec l’Association Tassakat pour obtenir des informations sur ses activités, ses réalisations et les possibilités de partenariat ou de collaboration.",
    piste: "Bonjour, je souhaite obtenir davantage d’informations sur le projet d’aménagement de la piste rurale de Tassakat (800 mètres) et connaître les possibilités de participation à son financement.",
    assainissement: "Bonjour, je souhaite échanger avec l’Association Tassakat sur le projet d’assainissement liquide, les études envisagées et les possibilités de partenariat financier ou technique."
  }
};

/* ===================================================================== */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  root.classList.add("js");

  // Langue / sens d’écriture (préparation arabe RTL)
  root.lang = CONFIG.lang;
  root.dir = CONFIG.lang === "ar" ? "rtl" : "ltr";

  // WhatsApp : liens avec message prérempli
  const wa = k => `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(CONFIG.messages[k])}`;
  $$("[data-wa]").forEach(a => { a.href = wa(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });
  if (CONFIG.whatsapp) $("#waText").textContent = "+" + CONFIG.whatsapp.replace(/\D/g, "");

  // E-mail
  const mail = $("#mailLink");
  if (CONFIG.email) { mail.href = "mailto:" + CONFIG.email; mail.textContent = CONFIG.email; }
  else { mail.classList.add("pending"); mail.removeAttribute("href"); }

  // Réseaux sociaux (uniquement si fournis)
  $("#socials").innerHTML = Object.entries(CONFIG.socials).filter(([, u]) => u)
    .map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n[0].toUpperCase() + n.slice(1)}</a>`).join("");

  // Indicateurs
  let pending = 0;
  $$("[data-stat]").forEach(el => {
    const v = CONFIG.stats[el.dataset.stat];
    if (v) el.textContent = v; else { el.classList.add("pending"); pending++; }
  });
  if (!pending) $("#statnote").remove();

  // Indicateurs complémentaires des réalisations
  $$("[data-opt]").forEach(el => { el.textContent = CONFIG.optional[el.dataset.opt] || ""; });

  // Logo
  const li = new Image();
  li.onload = () => { li.alt = "Logo " + CONFIG.name; $("#logo").replaceChildren(li); };
  li.src = CONFIG.logo;

  // Photos : remplacées automatiquement si le fichier existe, sinon emplacement visible
  const lb = $("#lb");
  $$(".ph[data-img]").forEach(box => {
    const img = new Image();
    img.alt = box.dataset.alt || "";
    img.loading = "lazy"; img.decoding = "async";
    img.onload = () => {
      box.appendChild(img); box.classList.add("loaded");
      if (box.hasAttribute("data-nolightbox")) return;
      box.tabIndex = 0; box.setAttribute("role", "button"); box.setAttribute("aria-label", "Agrandir : " + img.alt);
      const open = () => { $("img", lb).src = img.src; $("img", lb).alt = img.alt; $("p", lb).textContent = img.alt; lb.showModal(); };
      box.addEventListener("click", open);
      box.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    };
    img.src = CONFIG.imagesPath + box.dataset.img;
  });
  lb.addEventListener("click", e => { if (e.target !== $("img", lb)) lb.close(); });

  // Menu mobile
  const burger = $(".burger"), nav = $("#nav");
  const setMenu = o => { nav.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); burger.setAttribute("aria-label", o ? "Fermer le menu" : "Ouvrir le menu"); };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  // Retour en haut
  const up = $(".totop");
  up.addEventListener("click", () => scrollTo({ top: 0 }));
  addEventListener("scroll", () => { up.hidden = scrollY < 600; }, { passive: true });

  // Apparition douce au défilement
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
    $$(".reveal").forEach(el => io.observe(el));
  } else $$(".reveal").forEach(el => el.classList.add("in"));

  $("#yr").textContent = new Date().getFullYear();
})();

/* ===== Finition visuelle : icônes (jeu unique, trait homogène), en-tête, section active ===== */
(() => {
  const P = {
    users:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14.2c2.4.3 4 2.2 4 4.8"/>',
    search:'<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    landmark:'<path d="M3 10 12 4l9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
    clipboard:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h6"/>',
    scale:'<path d="M12 4v16M6 20h12M5 8h14M5 8 2.5 14a2.5 2.5 0 0 0 5 0ZM19 8l-2.5 6a2.5 2.5 0 0 0 5 0Z"/>',
    wallet:'<rect x="3" y="6" width="18" height="14" rx="2.5"/><path d="M3 10h18M16 15h2"/>',
    filecheck:'<path d="M6 3h8l5 5v13H6zM14 3v5h5M9 14l2 2 4-4"/>',
    eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    camera:'<path d="M4 8h3l2-3h6l2 3h3v12H4z"/><circle cx="12" cy="13.5" r="3.5"/>',
    message:'<path d="M4 5h16v11H9l-5 4z"/>',
    road:'<path d="M8 3 4 21M16 3l4 18M12 4v3M12 11v3M12 18v3"/>',
    drop:'<path d="M12 3c3.5 4.5 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 2.5-6.5 6-11z"/>',
    home:'<path d="M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6"/>',
    shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    leaf:'<path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15M5 19c2-4 5-7 9-9"/>',
    heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',
    link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    arch:'<path d="M4 21V11a8 8 0 0 1 16 0v10M2 21h20M9 21v-5a3 3 0 0 1 6 0v5"/>',
    wall:'<path d="M3 20h18M4 20V9h16v11M4 14h16M9 9v5M15 14v6M12 14v-5"/>'
  };
  const svg = n => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${P[n]}</svg>`;
  const chip = (n, cls = "") => `<span class="chip ${cls}">${svg(n)}</span>`;
  const each = (sel, names, fn) => document.querySelectorAll(sel).forEach((el, i) => names[i] && fn(el, names[i]));

  each(".prior b", ["road", "drop", "home"], (el, n) => el.innerHTML = svg(n));
  each(".values:not(.three) div", ["heart", "users", "shield", "leaf"], (el, n) => el.insertAdjacentHTML("afterbegin", chip(n)));
  each(".values.three div", ["users", "heart", "link"], (el, n) => el.insertAdjacentHTML("afterbegin", chip(n)));
  each(".eng li", ["users", "search", "landmark", "clipboard", "scale", "wallet", "filecheck", "eye", "camera", "message"], (el, n) => el.insertAdjacentHTML("afterbegin", chip(n)));
  each(".card .ph", ["drop", "sun", "arch", "wall"], (el, n) => el.insertAdjacentHTML("beforeend", chip(n, "over")));
  document.querySelector(".flag-top")?.insertAdjacentHTML("afterbegin", chip("road"));
  document.querySelector(".proj2")?.insertAdjacentHTML("afterbegin", chip("drop"));

  // Ombre de l’en-tête au défilement
  const top = document.querySelector(".top");
  const onScroll = () => top.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Section active dans le menu
  const links = [...document.querySelectorAll("#nav a")];
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(a => a.classList.toggle("act", a.getAttribute("href") === "#" + e.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(a => { const s = document.querySelector(a.getAttribute("href")); s && io.observe(s); });
  }
})();
