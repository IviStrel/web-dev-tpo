const offers = [
    {
        id: 1,
        title: 'Descuento en Ropa de Verano',
        store: 'Fashion Store',
        category: 'ropa',
        discount: '30% OFF',
        description: 'Aprovecha hasta 30% de descuento en toda la colección de verano. Válido hasta fin de mes.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
        validity: 'Válido hasta el 31 de diciembre',
        featured: true,
        expired: false
    },
    {
        id: 2,
        title: 'Tecnología con Descuento',
        store: 'Tech World',
        category: 'tecnologia',
        discount: '25% OFF',
        description: 'Descuentos especiales en smartphones, tablets y accesorios. Financiación disponible.',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
        validity: 'Válido hasta el 15 de enero',
        featured: false,
        expired: false
    },
    {
        id: 3,
        title: '2x1 en Artículos Deportivos',
        store: 'Sports Zone',
        category: 'deportes',
        discount: '2x1',
        description: 'Lleva dos productos y paga solo uno. Aplica en toda la sección de calzado deportivo.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
        validity: 'Válido hasta el 20 de diciembre',
        featured: true,
        expired: false
    },
    {
        id: 4,
        title: 'Kit de Belleza Completo',
        store: 'Beauty Corner',
        category: 'belleza',
        discount: '40% OFF',
        description: 'Kit completo de productos de belleza con un increíble descuento. Incluye maquillaje y cuidado de la piel.',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
        validity: 'Válido hasta el 10 de enero',
        featured: false,
        expired: false
    },
    {
        id: 5,
        title: 'Muebles para el Hogar',
        store: 'Home Design',
        category: 'hogar',
        discount: '35% OFF',
        description: 'Renueva tu hogar con nuestros muebles con descuento. Envío gratis en compras mayores a $50.000.',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
        validity: 'Válido hasta el 25 de diciembre',
        featured: false,
        expired: false
    },
    {
        id: 6,
        title: 'Juguetes para Navidad',
        store: 'Toy Land',
        category: 'juguetes',
        discount: '20% OFF',
        description: 'Prepara la Navidad con descuentos especiales en juguetes. Los mejores precios del mercado.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        validity: 'Válido hasta el 24 de diciembre',
        featured: true,
        expired: false
    },
    {
        id: 7,
        title: 'Libros y Papelería',
        store: 'Book Haven',
        category: 'libros',
        discount: '15% OFF',
        description: 'Descuentos en libros, cuadernos y útiles escolares. Perfecto para el regreso a clases.',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
        validity: 'Válido hasta el 31 de enero',
        featured: false,
        expired: false
    },
    {
        id: 8,
        title: 'Calzado de Temporada',
        store: 'Shoe Palace',
        category: 'ropa',
        discount: '30% OFF',
        description: 'Zapatos y zapatillas con descuento. Variedad de modelos y talles disponibles.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
        validity: 'Válido hasta el 30 de diciembre',
        featured: false,
        expired: false
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const offersGrid = document.getElementById('offers-grid');
    const categoryOffersGrid = document.getElementById('category-offers-grid');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    let currentCategory = 'all';
    
    function initializeOffers() {
        renderFeaturedOffers();
        renderCategoryOffers();
    }
    
    function renderFeaturedOffers() {
        const featuredOffers = offers.filter(offer => offer.featured && !offer.expired);
        offersGrid.innerHTML = '';
        
        if (featuredOffers.length === 0) {
            offersGrid.innerHTML = '<p class="no-offers">No hay ofertas destacadas en este momento.</p>';
            return;
        }
        
        featuredOffers.forEach(offer => {
            const card = createOfferCard(offer);
            offersGrid.appendChild(card);
        });
    }
    
    function renderCategoryOffers() {
        const filteredOffers = currentCategory === 'all' 
            ? offers.filter(offer => !offer.expired)
            : offers.filter(offer => offer.category === currentCategory && !offer.expired);
        
        categoryOffersGrid.innerHTML = '';
        
        if (filteredOffers.length === 0) {
            categoryOffersGrid.innerHTML = '<p class="no-offers">No hay ofertas disponibles en esta categoría.</p>';
            return;
        }
        
        filteredOffers.forEach(offer => {
            const card = createOfferCard(offer);
            categoryOffersGrid.appendChild(card);
        });
    }
    
    function createOfferCard(offer) {
        const card = document.createElement('article');
        card.className = `offer-card ${offer.featured ? 'featured' : ''} ${offer.expired ? 'expired' : ''}`;
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        
        card.innerHTML = `
            <div class="offer-card-image-wrapper">
                <img src="${offer.image}" alt="${offer.title} - ${offer.store}" class="offer-image">
                ${offer.featured ? '<span class="offer-badge">Destacado</span>' : ''}
            </div>
            <div class="offer-content">
                <div class="offer-header">
                    <h3 class="offer-title">${offer.title}</h3>
                    <span class="offer-discount" aria-label="Descuento ${offer.discount}">${offer.discount}</span>
                </div>
                <p class="offer-store">📍 ${offer.store}</p>
                <p class="offer-description">${offer.description}</p>
                <div class="offer-details">
                    <p><strong>Válido:</strong> ${offer.validity}</p>
                </div>
                <div class="offer-validity">${offer.validity}</div>
                <div class="offer-actions">
                    <button class="btn" onclick="viewOffer(${offer.id})" aria-label="Ver detalles de ${offer.title}">Ver Detalles</button>
                    <a href="stores.html" class="btn btn-outline">Ir al Local</a>
                </div>
            </div>
        `;
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                viewOffer(offer.id);
            }
        });
        
        return card;
    }
    
    window.viewOffer = function(offerId) {
        const offer = offers.find(o => o.id === offerId);
        if (offer) {
            alert(`Oferta: ${offer.title}\nLocal: ${offer.store}\nDescuento: ${offer.discount}\n${offer.description}\n\n${offer.validity}`);
        }
    };
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            currentCategory = this.getAttribute('data-category');
            
            renderCategoryOffers();
            
            const categoryName = this.textContent;
            announceToScreenReader(`Mostrando ofertas de ${categoryName}`);
        });
        
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    function announceToScreenReader(message) {
        let liveRegion = document.querySelector('[role="status"]');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.setAttribute('role', 'status');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-10000px';
            document.body.appendChild(liveRegion);
        }
        liveRegion.textContent = message;
    }
    
    initializeOffers();
    
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
        
        const offerCards = document.querySelectorAll('.offer-card');
        offerCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
});

