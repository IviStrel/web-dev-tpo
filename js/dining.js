import { diningPlaces } from "../data/dining-data.js";

document.addEventListener("DOMContentLoaded", function () {
  const diningGrid = document.getElementById("dining-grid");

  function initializeDining() {
    renderDiningPlaces();
  }

  function renderDiningPlaces() {
    diningGrid.innerHTML = "";

    diningPlaces.forEach((place) => {
      const card = createDiningCard(place);
      diningGrid.appendChild(card);
    });
  }

  function createDiningCard(place) {
    const card = document.createElement("article");
    card.className = "dining-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "article");

    card.innerHTML = `
            <div class="dining-image-wrapper">
                <img src="${place.image}" alt="${place.name} - ${place.type}" class="dining-image">
                <span class="dining-type">${place.type}</span>
            </div>
            <div class="dining-content">
                <h3 class="dining-name">${place.name}</h3>
                <p class="dining-description">${place.description}</p>
                <div class="dining-specialty">${place.specialty}</div>
                <div class="dining-info">
                    <p><strong>Ubicación:</strong> ${place.location}</p>
                    <p><strong>Horarios:</strong> ${place.hours}</p>
                    <p><strong>Teléfono:</strong> ${place.phone}</p>
                </div>
                <div class="dining-actions">
                    <a href="contact.html" class="btn btn-outline-small">Contactar</a>
                    <a href="stores.html" class="btn btn-outline">Ver en Mapa</a>
                </div>
            </div>
        `;

    return card;
  }

  initializeDining();
});
