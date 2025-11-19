import { diningPlaces } from "../data/dining-data.js";

const diningGrid = document.getElementById("dining-grid");
const templateCard = document.getElementById("template-dining-card").content;

const fragment = document.createDocumentFragment();

const createDiningCard = (places) => {
  diningGrid.innerHTML = "";

  places.map((item) => {
    const clone = templateCard.cloneNode(true);
    const img = clone.getElementById("template-card-img");

    img.setAttribute("src", item.image);
    img.setAttribute("alt", `${item.name} - ${item.type}`);

    clone.getElementById("dining-type").textContent = item.type;
    clone.getElementById("dining-name").textContent = item.name;
    clone.getElementById("dining-description").textContent = item.description;
    clone.getElementById("dining-specialty").textContent = item.specialty;
    clone.getElementById("dining-location").textContent = item.location;
    clone.getElementById("dining-hours").textContent = item.hours;
    clone.getElementById("dining-phone").textContent = item.phone;

    fragment.appendChild(clone);
  });

  diningGrid.appendChild(fragment);
};

document.addEventListener("DOMContentLoaded", () => {
  createDiningCard(diningPlaces);
});
