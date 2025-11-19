import { stores } from "../data/stores-data.js";

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("store-search");
  const categoryFilter = document.getElementById("category-filter");
  const storesList = document.getElementById("stores-list");
  const mapGrid = document.getElementById("map-grid");
  const resultsCount = document.getElementById("search-results-count");
  const noResults = document.getElementById("no-results");

  let filteredStores = [...stores];

  function initializeStores() {
    renderStoresList();
    renderMap();
    updateResultsCount();
  }

  function renderStoresList() {
    storesList.innerHTML = "";

    if (filteredStores.length === 0) {
      noResults.style.display = "block";
      storesList.style.display = "none";
      return;
    }

    noResults.style.display = "none";
    storesList.style.display = "grid";

    filteredStores.forEach((store) => {
      const card = createStoreCard(store);
      storesList.appendChild(card);
    });
  }

  function createStoreCard(store) {
    const card = document.createElement("article");
    card.className = "store-card";
    card.setAttribute("data-store-id", store.id);
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "article");

    const categoryLabels = {
      ropa: "Ropa y Moda",
      tecnologia: "Tecnología",
      deportes: "Deportes",
      belleza: "Belleza y Cosmética",
      hogar: "Hogar y Decoración",
      juguetes: "Juguetes",
      gastronomia: "Gastronomía",
    };

    card.innerHTML = `
            <div class="store-header">
                <div>
                    <h3 class="store-name">${store.name}</h3>
                    <span class="store-category">${
                      categoryLabels[store.category] || store.category
                    }</span>
                </div>
            </div>
            <div class="store-info">
                <p><strong>Ubicación:</strong> Nivel ${store.nivel}, ${
      store.location
    }</p>
                <p><strong>Descripción:</strong> ${store.description}</p>
                <p><strong>Teléfono:</strong> ${store.phone}</p>
            </div>
            <div class="store-actions">
                <a href="${
                  store.repo
                }" target="_blank" class="btn btn-outline-small">Ver repositorio</a>
                <a href="${
                  store.pages
                }" target="_blank" class="btn btn-outline-small">Ver pagina</a>
                <button class="btn btn-small" onclick="highlightStore(${
                  store.id
                })" aria-label="Mostrar ${
      store.name
    } en el mapa">Ver en mapa</button>
            </div>
        `;

    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        highlightStore(store.id);
      }
    });

    return card;
  }

  function renderMap() {
    mapGrid.innerHTML = "";

    stores.forEach((store) => {
      const cell = document.createElement("div");
      cell.className = `map-store nivel${store.nivel}`;
      cell.setAttribute("data-store-id", store.id);
      cell.setAttribute("tabindex", "0");
      cell.setAttribute("role", "button");
      cell.setAttribute(
        "aria-label",
        `${store.name}, Nivel ${store.nivel}, ${store.location}`
      );
      cell.textContent = store.name.substring(0, 10);
      cell.title = `${store.name} - Nivel ${store.nivel}, ${store.location}`;

      const isVisible = filteredStores.some((s) => s.id === store.id);
      if (!isVisible) {
        cell.style.opacity = "0.3";
        cell.style.pointerEvents = "none";
      }

      cell.addEventListener("click", () => highlightStore(store.id));
      cell.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          highlightStore(store.id);
        }
      });

      mapGrid.appendChild(cell);
    });
  }

  window.highlightStore = function (storeId) {
    document
      .querySelectorAll(".store-card.highlighted, .map-store.highlighted")
      .forEach((el) => {
        el.classList.remove("highlighted");
      });

    const card = document.querySelector(
      `.store-card[data-store-id="${storeId}"]`
    );
    const mapCell = document.querySelector(
      `.map-store[data-store-id="${storeId}"]`
    );

    if (card) {
      card.classList.add("highlighted");
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.focus();
    }

    if (mapCell) {
      mapCell.classList.add("highlighted");
      mapCell.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const store = stores.find((s) => s.id === storeId);
    if (store) {
      const liveRegion =
        document.querySelector('[role="status"]') || createLiveRegion();
      liveRegion.textContent = `Local destacado: ${store.name}, ubicado en Nivel ${store.nivel}, ${store.location}`;
    }
  };

  function createLiveRegion() {
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("role", "status");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    liveRegion.style.position = "absolute";
    liveRegion.style.left = "-10000px";
    document.body.appendChild(liveRegion);
    return liveRegion;
  }

  function filterStores() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;

    filteredStores = stores.filter((store) => {
      const matchesSearch =
        !searchTerm ||
        store.name.toLowerCase().includes(searchTerm) ||
        store.description.toLowerCase().includes(searchTerm) ||
        store.category.toLowerCase().includes(searchTerm) ||
        store.location.toLowerCase().includes(searchTerm);

      const matchesCategory = category === "all" || store.category === category;

      return matchesSearch && matchesCategory;
    });

    renderStoresList();
    renderMap();
    updateResultsCount();
  }

  function updateResultsCount() {
    const count = filteredStores.length;
    const total = stores.length;

    if (count === total) {
      resultsCount.textContent = `Mostrando todos los ${total} locales`;
    } else {
      resultsCount.textContent = `Mostrando ${count} de ${total} locales`;
    }

    resultsCount.setAttribute("aria-live", "polite");
  }

  window.clearFilters = function () {
    searchInput.value = "";
    categoryFilter.value = "all";
    filterStores();
    searchInput.focus();
  };

  searchInput.addEventListener("input", filterStores);
  categoryFilter.addEventListener("change", filterStores);

  initializeStores();

  const skipLink = document.querySelector(".skip-link");
  if (skipLink) {
    skipLink.addEventListener("click", function () {
      searchInput.focus();
    });
  }
});
