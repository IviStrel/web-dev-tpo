const diningPlaces = [
  {
    id: 1,
    name: "Restaurante Italiano",
    type: "Restaurante",
    description:
      "Auténtica cocina italiana con pasta fresca, pizzas al horno de leña y una selección de vinos italianos.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    location: "Nivel 2, Local B-20",
    hours: "Lunes a Domingo: 12:00 - 23:00",
    phone: "(011) 1234-5701",
    specialty: "Pasta y Pizza",
  },
  {
    id: 2,
    name: "LatteLab",
    type: "Cafetería",
    description: "Cafetería de autor",
    image: "./images/lattelab.jpg",
    location: "Nivel 2, Local B-31",
    hours: "Lunes a Domingo: 12:00 - 23:00",
    phone: "(54) 11 1234 5678",
    specialty: "Café de Especialidad",
  },
  {
    id: 3,
    name: "Senshi Sushi",
    type: "Restaurante",
    description: "Sushi de autor",
    image: "./images/senshi.png",
    location: "Nivel 3, Local C-09",
    hours: "Lunes a Domingo: 12:00 - 23:00",
    phone: "(54) 11 3453-0825",
    specialty: "Sushi y Comida Japonesa",
  },
  {
    id: 4,
    name: "Burger House",
    type: "Comida Rápida",
    description:
      "Hamburguesas gourmet con ingredientes premium, papas fritas artesanales y batidos caseros.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
    location: "Patio de Comidas, Nivel 1",
    hours: "Lunes a Domingo: 11:00 - 23:00",
    phone: "(011) 1234-5704",
    specialty: "Hamburguesas Gourmet",
  },
  {
    id: 5,
    name: "Parrilla Argentina",
    type: "Restaurante",
    description:
      "Carnes a la parrilla, empanadas caseras y platos tradicionales argentinos en un ambiente rústico.",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop",
    location: "Nivel 3, Local C-10",
    hours: "Lunes a Domingo: 12:00 - 00:00",
    phone: "(011) 1234-5705",
    specialty: "Carnes a la Parrilla",
  },
  {
    id: 6,
    name: "Heladería Artesanal",
    type: "Postres",
    description:
      "Helados artesanales con sabores únicos, waffles calientes y crepes dulces.",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop",
    location: "Nivel 1, Local A-30",
    hours: "Lunes a Domingo: 10:00 - 22:00",
    phone: "(011) 1234-5706",
    specialty: "Helados Artesanales",
  },
  {
    id: 7,
    name: "Pastelería Francesa",
    type: "Cafetería",
    description:
      "Pasteles franceses, macarons, croissants y una selección de tés y cafés premium.",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop",
    location: "Nivel 2, Local B-12",
    hours: "Lunes a Domingo: 9:00 - 20:00",
    phone: "(011) 1234-5708",
    specialty: "Pasteles Franceses",
  },
];

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

    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        contactRestaurant(place.id);
      }
    });

    return card;
  }

  window.contactRestaurant = function (placeId) {
    const place = diningPlaces.find((p) => p.id === placeId);
    if (place) {
      alert(
        `Contactar ${place.name}\nTeléfono: ${place.phone}\nUbicación: ${place.location}`
      );
    }
  };

  initializeDining();
});
