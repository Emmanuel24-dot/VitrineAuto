/* ==========================================================================
   AUTO-ÉCOLE — script.js
   ⚙️  TOUTES les informations qui changent d'un établissement à l'autre
       sont regroupées dans l'objet SCHOOL_CONFIG ci-dessous.
       Modifiez uniquement cet objet pour personnaliser le site.
   ========================================================================== */

const SCHOOL_CONFIG = {
  name: "Auto-École Étoile du Volant",          // Nom de l'auto-école — À REMPLACER
  slogan: "Votre réussite au volant commence ici.",
  phone: "+228 90 00 00 00",                     // Téléphone — À REMPLACER
  phoneHref: "tel:+22890000000",
  whatsappNumber: "22890000000",                 // Numéro WhatsApp SANS le "+" — À REMPLACER
  whatsappDefaultMessage: "Bonjour, je souhaite avoir des informations concernant votre formation de conduite.",
  whatsappInscriptionMessage: "Bonjour, je souhaite m'inscrire à une formation de conduite. Voici mes informations :",
  email: "contact@etoileduvolant.tg",             // Email — À REMPLACER
  address: "Avenue de la Libération, Quartier Bè, Lomé, Togo", // Adresse — À REMPLACER
  hours: [
    { day: "Lundi – Vendredi", time: "08:00 – 18:00" },
    { day: "Samedi", time: "08:00 – 14:00" },
    { day: "Dimanche", time: "Fermé" }
  ],
  socials: {
    facebook: "#",
    instagram: "#",
    tiktok: "#"
  },
  // Coordonnées GPS pour Google Maps — À REMPLACER par les vraies coordonnées
  mapsEmbedUrl: "https://www.google.com/maps?q=6.1319,1.2228&z=15&output=embed"
};

/* ---------------------------------------------------------- INIT ----- */
document.addEventListener("DOMContentLoaded", () => {
  populateConfig();
  initNavbar();
  initMobileMenuClose();
  initRevealOnScroll();
  initCounters();
  initLightbox();
  initInscriptionForm();
  initWhatsappLinks();
  initFooterYear();
});

/* --------------------------------------- Injecte les infos du config - */
function populateConfig(){
  document.querySelectorAll("[data-school-name]").forEach(el => el.textContent = SCHOOL_CONFIG.name);
  document.querySelectorAll("[data-school-slogan]").forEach(el => el.textContent = SCHOOL_CONFIG.slogan);
  document.querySelectorAll("[data-school-phone]").forEach(el => el.textContent = SCHOOL_CONFIG.phone);
  document.querySelectorAll("[data-school-phone-href]").forEach(el => el.setAttribute("href", SCHOOL_CONFIG.phoneHref));
  document.querySelectorAll("[data-school-email]").forEach(el => el.textContent = SCHOOL_CONFIG.email);
  document.querySelectorAll("[data-school-email-href]").forEach(el => el.setAttribute("href", "mailto:" + SCHOOL_CONFIG.email));
  document.querySelectorAll("[data-school-address]").forEach(el => el.textContent = SCHOOL_CONFIG.address);
  document.querySelectorAll("[data-maps-src]").forEach(el => el.setAttribute("src", SCHOOL_CONFIG.mapsEmbedUrl));

  const hoursList = document.querySelector("[data-school-hours]");
  if (hoursList){
    hoursList.innerHTML = SCHOOL_CONFIG.hours.map(h =>
      `<li class="d-flex justify-content-between border-bottom py-2"><span>${h.day}</span><strong>${h.time}</strong></li>`
    ).join("");
  }

  const hoursShort = document.querySelector("[data-school-hours-short]");
  if (hoursShort && SCHOOL_CONFIG.hours[0]) {
    hoursShort.innerHTML = `${SCHOOL_CONFIG.hours[0].day}<br>${SCHOOL_CONFIG.hours[0].time}`;
  }

  document.querySelectorAll("[data-social-facebook]").forEach(el => el.setAttribute("href", SCHOOL_CONFIG.socials.facebook));
  document.querySelectorAll("[data-social-instagram]").forEach(el => el.setAttribute("href", SCHOOL_CONFIG.socials.instagram));
  document.querySelectorAll("[data-social-tiktok]").forEach(el => el.setAttribute("href", SCHOOL_CONFIG.socials.tiktok));
}

/* --------------------------------------------------- Liens WhatsApp -- */
function buildWhatsappLink(message){
  return `https://wa.me/${SCHOOL_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
function initWhatsappLinks(){
  document.querySelectorAll("[data-whatsapp-default]").forEach(el => {
    el.setAttribute("href", buildWhatsappLink(SCHOOL_CONFIG.whatsappDefaultMessage));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
  document.querySelectorAll("[data-whatsapp-inscription]").forEach(el => {
    el.setAttribute("href", buildWhatsappLink(SCHOOL_CONFIG.whatsappInscriptionMessage));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
}

/* ------------------------------------------------------- Navbar ------ */
function initNavbar(){
  const nav = document.getElementById("mainNavbar");
  if (!nav) return;
  const toggle = () => {
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  toggle();
  window.addEventListener("scroll", toggle, { passive:true });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-main .nav-link[href^='#']");
  const spy = () => {
    let current = "";
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.getAttribute("id");
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  };
  window.addEventListener("scroll", spy, { passive:true });
  spy();
}

/* Ferme le menu hamburger après un clic sur un lien (mobile) */
function initMobileMenuClose(){
  const navCollapse = document.getElementById("navbarContent");
  if (!navCollapse) return;
  navCollapse.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (navCollapse.classList.contains("show")){
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });
}

/* ------------------------------------------------- Reveal on scroll -- */
function initRevealOnScroll(){
  const items = document.querySelectorAll(".reveal, .reveal-scale");
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}

/* -------------------------------------------------- Compteurs animés - */
function initCounters(){
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;
  const animate = (el) => {
    const target = parseFloat(el.getAttribute("data-counter"));
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString("fr-FR") + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString("fr-FR") + suffix;
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => io.observe(el));
}

/* --------------------------------------------------------- Lightbox -- */
function initLightbox(){
  const overlay = document.getElementById("lightboxOverlay");
  const img = document.getElementById("lightboxImage");
  if (!overlay || !img) return;

  document.querySelectorAll(".gallery-item img").forEach(thumb => {
    thumb.addEventListener("click", () => {
      img.setAttribute("src", thumb.getAttribute("src"));
      img.setAttribute("alt", thumb.getAttribute("alt") || "");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const closeBox = () => {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  };
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeBox(); });
  document.getElementById("lightboxClose")?.addEventListener("click", closeBox);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeBox(); });
}

/* --------------------------------------------------- Formulaire ------ */
function initInscriptionForm(){
  const form = document.getElementById("inscriptionForm");
  if (!form) return;
  const banner = document.getElementById("confirmBanner");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()){
      form.classList.add("was-validated");
      return;
    }
    // Emplacement pour brancher un vrai envoi (API / email) plus tard.
    banner.classList.add("show");
    banner.scrollIntoView({ behavior: "smooth", block: "center" });
    form.reset();
    form.classList.remove("was-validated");
    setTimeout(() => banner.classList.remove("show"), 8000);
  });
}

function initFooterYear(){
  const el = document.getElementById("footerYear");
  if (el) el.textContent = new Date().getFullYear();
}
