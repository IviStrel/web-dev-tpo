import { offers } from "../data/offers-data.js";

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

    return card;
  }

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
    });
  });

  initializeOffers();
});
