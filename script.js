/* ===== KYMNATT — Lógica del sitio ===== */

// Datos de productos
const products = [
  {
    id: "gorro-negro",
    name: "Gorro Clásico",
    category: "gorritos",
    price: 12000,
    color: "Negro",
    image: "public/images/gorro-negro.png",
    description: "Gorro tejido a mano en lana merino. Calce ajustado y abrigo total.",
    tag: "Más vendido",
  },
  {
    id: "chalina-negra",
    name: "Chalina Larga",
    category: "chalinas",
    price: 18000,
    color: "Negro",
    image: "public/images/chalina-negra.png",
    description: "Chalina extra larga de punto grueso. Suave, cálida y versátil.",
  },
  {
    id: "gorro-navy",
    name: "Gorro Doblez",
    category: "gorritos",
    price: 13000,
    color: "Azul marino",
    image: "public/images/gorro-navy.png",
    description: "Gorro con doblez en lana azul marino. Diseño sobrio y moderno.",
    tag: "Nuevo",
  },
  {
    id: "chalina-gris",
    name: "Chalina Trenzada",
    category: "chalinas",
    price: 17000,
    color: "Gris jaspeado",
    image: "public/images/chalina-gris.png",
    description: "Punto trenzado tupido en gris jaspeado. Textura abrigada y elegante.",
  },
  {
    id: "gorro-crudo",
    name: "Gorro Pompón",
    category: "gorritos",
    price: 14000,
    color: "Crudo",
    image: "public/images/gorro-crudo.png",
    description: "Gorro color crudo con pompón. Tejido tupido para los días más fríos.",
  },
  {
    id: "chalina-navy",
    name: "Chalina Punto Grueso",
    category: "chalinas",
    price: 18500,
    color: "Azul marino",
    image: "public/images/chalina-navy.png",
    description: "Chalina de punto grueso en azul marino. Abriga sin pesar.",
  },
];

const categories = [
  { value: "todos", label: "Todos" },
  { value: "gorritos", label: "Gorritos" },
  { value: "chalinas", label: "Chalinas" },
];

function formatPrice(value) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

// ===== Render de filtros =====
const filtersEl = document.getElementById("filters");
const gridEl = document.getElementById("productGrid");
const emptyEl = document.getElementById("emptyState");
let activeCategory = "todos";

function renderFilters() {
  filtersEl.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-btn" + (activeCategory === cat.value ? " active" : "");
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", activeCategory === cat.value);
    btn.textContent = cat.label;
    btn.addEventListener("click", () => {
      activeCategory = cat.value;
      renderFilters();
      renderProducts();
    });
    filtersEl.appendChild(btn);
  });
}

// ===== Render de productos =====
function renderProducts() {
  const filtered =
    activeCategory === "todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  gridEl.innerHTML = "";
  emptyEl.hidden = filtered.length !== 0;

  filtered.forEach((p) => {
    const article = document.createElement("article");
    article.className = "product-card";
    article.innerHTML = `
      <div class="product-media">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
      </div>
      <div class="product-body">
        <div class="product-top">
          <h3 class="product-name">${p.name}</h3>
          <span class="product-price">${formatPrice(p.price)}</span>
        </div>
        <p class="product-color">${p.color}</p>
        <p class="product-desc">${p.description}</p>
        <a href="#contacto" class="product-buy">Consultar / Comprar</a>
      </div>
    `;
    gridEl.appendChild(article);
  });
}

renderFilters();
renderProducts();

// ===== Navbar: efecto al hacer scroll - EFECTO PARALLAX ===== 
const navbar = document.getElementById("navbar");
const heroNew = document.querySelector(".hero-new"); // EFECTO PARALLAX: Referencia para animaciones

function onScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 16);
  
  /* EFECTO PARALLAX - INICIO: Fade y blur dinámico en hero */
  const scrollProgress = Math.min(window.scrollY / window.innerHeight, 1);
  const opacity = Math.max(1 - scrollProgress, 0.3);
  const blurAmount = scrollProgress * 10;
  
  heroNew.style.opacity = opacity;
  heroNew.style.filter = `blur(${blurAmount}px)`;
  /* EFECTO PARALLAX - FIN: Fade y blur dinámico */
}
onScroll();
window.addEventListener("scroll", onScroll);

// ===== Menú móvil =====
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

function setMenu(open) {
  navMobile.hidden = !open;
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open);
  navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

navToggle.addEventListener("click", () => {
  setMenu(navMobile.hidden);
});

// Cerrar el menú al hacer clic en un enlace
navMobile.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

// ===== Año dinámico en el footer =====
document.getElementById("year").textContent = new Date().getFullYear();

/* ===== SCROLL TO TOP BUTTON ===== */
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ===== FAQ ACCORDION - Solo una pregunta abierta a la vez ===== */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("toggle", (e) => {
    if (e.target.open) {
      // Si se abre este item, cierra todos los demás
      faqItems.forEach((otherItem) => {
        if (otherItem !== e.target) {
          otherItem.open = false;
        }
      });
    }
  });
});

/* ===== OPTIMIZACIÓN MOBILE: Intersection Observer para Hero Section ===== */
/* Detecta si el hero está visible para desabilitar efectos en móvil */
if (window.innerWidth <= 767) {
  const heroElement = document.querySelector(".hero-new");
  const navbarElement = document.getElementById("navbar");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // Hero está fuera de vista: deshabilita efectos
          heroElement.classList.add("hero-out-of-view");
          navbarElement.classList.add("hero-out-of-view");
        } else {
          // Hero es visible: restaura efectos
          heroElement.classList.remove("hero-out-of-view");
          navbarElement.classList.remove("hero-out-of-view");
        }
      });
    },
    {
      threshold: 0, // Dispara cuando hero completamente sale de vista
    }
  );

  // Observar el hero element
  observer.observe(heroElement);
}