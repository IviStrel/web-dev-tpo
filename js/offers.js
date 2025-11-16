const offers = [
  {
    id: 1,
    title: "Descuento en Ropa de Verano",
    store: "Fashion Store",
    category: "ropa",
    discount: "30% OFF",
    description:
      "Aprovecha hasta 30% de descuento en toda la colección de verano. Válido hasta fin de mes.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    validity: "Válido hasta el 31 de diciembre",
    featured: true,
    expired: false,
  },
  {
    id: 2,
    title: "Tecnología con Descuento",
    store: "Tech World",
    category: "tecnologia",
    discount: "25% OFF",
    description:
      "Descuentos especiales en smartphones, tablets y accesorios. Financiación disponible.",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
    validity: "Válido hasta el 15 de enero",
    featured: false,
    expired: false,
  },
  {
    id: 3,
    title: "Descuento en Gastronomía",
    store: "LatteLab",
    category: "gastronomia",
    description: "Descuentos especiales en cafés. Financiación disponible.",
    image: "./images/lattelab.svg",
    validity: "Válido hasta el 31 de diciembre",
    pages:
      "https://metaldev-06.github.io/actividad-obligatoria-LatteLab/src/pages/promotions.html",
    featured: false,
    expired: false,
  },
  {
    id: 4,
    title: "Descuento en Gastronomía",
    store: "Senshi Sushi",
    category: "gastronomia",
    description: "Descuentos especiales en sushi. Financiación disponible.",
    image: "./images/senshi.png",
    pages: "https://tomasfiginiuade.github.io/Senshi-sushi/promociones.html",
    validity: "Válido hasta el 31 de diciembre",
    featured: false,
    expired: false,
  },
  {
    id: 5,
    title: "Descuento en Tecnología",
    store: "AviaStore",
    category: "tecnologia",
    description:
      "Descuentos especiales en tecnología para aviones. Financiación disponible.",
    image: "./images/aviastore.png",
    pages: "https://ivistrel.github.io/web-tpo/promociones.html",
    validity: "Válido hasta el 31 de diciembre",
    featured: false,
    expired: false,
  },
  {
    id: 6,
    title: "Descuento en Belleza",
    store: "LOOK",
    category: "belleza",
    description:
      "Descuentos especiales en anteojos de sol. Financiación disponible.",
    image: "./images/look.png",
    pages:
      "https://leandro-ezequiel-rial.github.io/look-local-comercial-viernes/promociones.html",
    validity: "Válido hasta el 31 de diciembre",
    featured: false,
    expired: false,
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const categoryOffersGrid = document.getElementById("category-offers-grid");
  const categoryButtons = document.querySelectorAll(".category-btn");

  let currentCategory = "all";

  function initializeOffers() {
    renderCategoryOffers();
  }

  function renderCategoryOffers() {
    const filteredOffers =
      currentCategory === "all"
        ? offers.filter((offer) => !offer.expired)
        : offers.filter(
            (offer) => offer.category === currentCategory && !offer.expired
          );

    categoryOffersGrid.innerHTML = "";

    if (filteredOffers.length === 0) {
      categoryOffersGrid.innerHTML =
        '<p class="no-offers">No hay ofertas disponibles en esta categoría.</p>';
      return;
    }

    filteredOffers.forEach((offer) => {
      const card = createOfferCard(offer);
      categoryOffersGrid.appendChild(card);
    });
  }

  function createOfferCard(offer) {
    const card = document.createElement("article");
    card.className = `offer-card ${offer.featured ? "featured" : ""} ${
      offer.expired ? "expired" : ""
    }`;
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "article");

    card.innerHTML = `
            <div class="offer-card-image-wrapper">
                <img src="${offer.image}" alt="${offer.title} - ${
      offer.store
    }" class="offer-image">
                ${
                  offer.featured
                    ? '<span class="offer-badge">Destacado</span>'
                    : ""
                }
            </div>
            <div class="offer-content">
                <div class="offer-header">
                    <h3 class="offer-title">${offer.title}</h3>
                    ${
                      offer.discount
                        ? `<span class="offer-discount" aria-label="Descuento ${offer.discount}">${offer.discount}</span>`
                        : ""
                    }
                </div>
                <p class="offer-store">📍 ${offer.store}</p>
                <p class="offer-description">${offer.description}</p>
                <div class="offer-details">
                    <p><strong>Válido:</strong> ${offer.validity}</p>
                </div>
                <div class="offer-validity">${offer.validity}</div>
                ${
                  offer.pages
                    ? `<a href="${offer.pages}" target="_blank" class="btn btn-outline-small">Ver Detalles</a>`
                    : ""
                }
            </div>
        `;

    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        viewOffer(offer.id);
      }
    });

    return card;
  }

  window.viewOffer = function (offerId) {
    const offer = offers.find((o) => o.id === offerId);
    if (offer) {
      alert(
        `Oferta: ${offer.title}\nLocal: ${offer.store}\nDescuento: ${offer.discount}\n${offer.description}\n\n${offer.validity}`
      );
    }
  };

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      categoryButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });

      this.classList.add("active");
      this.setAttribute("aria-pressed", "true");

      currentCategory = this.getAttribute("data-category");

      renderCategoryOffers();

      const categoryName = this.textContent;
      announceToScreenReader(`Mostrando ofertas de ${categoryName}`);
    });

    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  function announceToScreenReader(message) {
    let liveRegion = document.querySelector('[role="status"]');
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.setAttribute("role", "status");
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.className = "sr-only";
      liveRegion.style.position = "absolute";
      liveRegion.style.left = "-10000px";
      document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = message;
  }

  initializeOffers();

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const offerCards = document.querySelectorAll(".offer-card");
    offerCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });
  }
});
