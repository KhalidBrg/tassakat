/* Moteur de langue : FR (source) / EN / AR (RTL). Texte = lang/<code>.js ; clé absente => français. */
(() => {
  const D = window.I18N, root = document.documentElement;
  const ALIAS = {t161:"t4",t162:"t5",t163:"t6",t164:"t7",t165:"t8",t166:"t9",t49:"t46",t52:"t46",t55:"t46"};
  const LANGS = ["fr", "en", "ar"];
  const tr = (l, k) => (D[l] && (D[l][k] ?? D[l][ALIAS[k]])) ?? D.fr[k];
  const setMeta = (sel, attr, v) => { const m = document.querySelector(sel); if (m && v) m.setAttribute(attr, v); };
  function setLang(l) {
    if (!LANGS.includes(l)) l = "fr";
    root.lang = l; root.dir = l === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(el => { el.innerHTML = tr(l, el.dataset.i18n); });
    document.title = tr(l, "meta.title");
    setMeta('meta[name=description]', "content", tr(l, "meta.desc"));
    setMeta('meta[property="og:title"]', "content", tr(l, "meta.title"));
    document.querySelectorAll("[data-lang]").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === l));
    document.querySelectorAll("[data-wa]").forEach(a => {   // messages WhatsApp dans la langue choisie
      const k = a.dataset.wa, msg = (l !== "fr" && D[l] && D[l]["msg." + k]) || CONFIG.messages[k];
      a.href = `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
    });
    try { localStorage.setItem("tassakat-lang", l); } catch (e) {}
  }
  document.querySelectorAll("[data-lang]").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
  let start = new URLSearchParams(location.search).get("lang");
  try { start = start || localStorage.getItem("tassakat-lang"); } catch (e) {}
  setLang(start || CONFIG.lang);
})();
