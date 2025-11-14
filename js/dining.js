const diningPlaces = [
    {
        id: 1,
        name: 'Restaurante Italiano',
        type: 'Restaurante',
        description: 'Auténtica cocina italiana con pasta fresca, pizzas al horno de leña y una selección de vinos italianos.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
        location: 'Nivel 2, Local B-20',
        hours: 'Lunes a Domingo: 12:00 - 23:00',
        phone: '(011) 1234-5701',
        specialty: 'Pasta y Pizza'
    },
    {
        id: 2,
        name: 'Sushi Bar',
        type: 'Restaurante',
        description: 'Sushi fresco y platos japoneses tradicionales. Barra de sushi donde puedes ver a los chefs en acción.',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop',
        location: 'Nivel 2, Local B-25',
        hours: 'Lunes a Domingo: 12:00 - 22:00',
        phone: '(011) 1234-5702',
        specialty: 'Sushi y Comida Japonesa'
    },
    {
        id: 3,
        name: 'Café Central',
        type: 'Cafetería',
        description: 'Café de especialidad, pasteles artesanales y un ambiente acogedor perfecto para trabajar o relajarse.',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a1a8d3a?w=600&h=400&fit=crop',
        location: 'Nivel 1, Local A-15',
        hours: 'Lunes a Domingo: 8:00 - 21:00',
        phone: '(011) 1234-5703',
        specialty: 'Café de Especialidad'
    },
    {
        id: 4,
        name: 'Burger House',
        type: 'Comida Rápida',
        description: 'Hamburguesas gourmet con ingredientes premium, papas fritas artesanales y batidos caseros.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
        location: 'Patio de Comidas, Nivel 1',
        hours: 'Lunes a Domingo: 11:00 - 23:00',
        phone: '(011) 1234-5704',
        specialty: 'Hamburguesas Gourmet'
    },
    {
        id: 5,
        name: 'Parrilla Argentina',
        type: 'Restaurante',
        description: 'Carnes a la parrilla, empanadas caseras y platos tradicionales argentinos en un ambiente rústico.',
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop',
        location: 'Nivel 3, Local C-10',
        hours: 'Lunes a Domingo: 12:00 - 00:00',
        phone: '(011) 1234-5705',
        specialty: 'Carnes a la Parrilla'
    },
    {
        id: 6,
        name: 'Heladería Artesanal',
        type: 'Postres',
        description: 'Helados artesanales con sabores únicos, waffles calientes y crepes dulces.',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop',
        location: 'Nivel 1, Local A-30',
        hours: 'Lunes a Domingo: 10:00 - 22:00',
        phone: '(011) 1234-5706',
        specialty: 'Helados Artesanales'
    },
    {
        id: 7,
        name: 'Comida Mexicana',
        type: 'Restaurante',
        description: 'Tacos, burritos, quesadillas y platos mexicanos auténticos con salsas caseras.',
        image: 'https://images.unsplash.com/photo-1565299585323-38174c2b9eac?w=600&h=400&fit=crop',
        location: 'Patio de Comidas, Nivel 2',
        hours: 'Lunes a Domingo: 11:00 - 22:00',
        phone: '(011) 1234-5707',
        specialty: 'Comida Mexicana'
    },
    {
        id: 8,
        name: 'Pastelería Francesa',
        type: 'Cafetería',
        description: 'Pasteles franceses, macarons, croissants y una selección de tés y cafés premium.',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop',
        location: 'Nivel 2, Local B-12',
        hours: 'Lunes a Domingo: 9:00 - 20:00',
        phone: '(011) 1234-5708',
        specialty: 'Pasteles Franceses'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const diningGrid = document.getElementById('dining-grid');
    
    function initializeDining() {
        renderDiningPlaces();
    }
    
    function renderDiningPlaces() {
        diningGrid.innerHTML = '';
        
        diningPlaces.forEach(place => {
            const card = createDiningCard(place);
            diningGrid.appendChild(card);
        });
    }
    
    function createDiningCard(place) {
        const card = document.createElement('article');
        card.className = 'dining-card';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        
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
                    <button class="btn" onclick="contactRestaurant(${place.id})" aria-label="Contactar ${place.name}">Contactar</button>
                    <a href="stores.html" class="btn btn-outline">Ver en Mapa</a>
                </div>
            </div>
        `;
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                contactRestaurant(place.id);
            }
        });
        
        return card;
    }
    
    window.contactRestaurant = function(placeId) {
        const place = diningPlaces.find(p => p.id === placeId);
        if (place) {
            alert(`Contactar ${place.name}\nTeléfono: ${place.phone}\nUbicación: ${place.location}`);
        }
    };
    
    initializeDining();
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        const diningCards = document.querySelectorAll('.dining-card');
        diningCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
    
    const images = document.querySelectorAll('.dining-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
});

