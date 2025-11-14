const stores = [
    { id: 1, name: 'Fashion Store', category: 'ropa', nivel: 1, location: 'A-12', description: 'Ropa de moda para toda la familia', phone: '(011) 1234-5678' },
    { id: 2, name: 'Tech World', category: 'tecnologia', nivel: 2, location: 'B-05', description: 'Tecnología y electrónica', phone: '(011) 1234-5679' },
    { id: 3, name: 'Sports Zone', category: 'deportes', nivel: 1, location: 'A-25', description: 'Artículos deportivos', phone: '(011) 1234-5680' },
    { id: 4, name: 'Beauty Corner', category: 'belleza', nivel: 2, location: 'B-18', description: 'Cosméticos y productos de belleza', phone: '(011) 1234-5681' },
    { id: 5, name: 'Home Design', category: 'hogar', nivel: 3, location: 'C-08', description: 'Decoración y muebles', phone: '(011) 1234-5682' },
    { id: 6, name: 'Toy Land', category: 'juguetes', nivel: 2, location: 'B-30', description: 'Juguetes para todas las edades', phone: '(011) 1234-5683' },
    { id: 7, name: 'Book Haven', category: 'libros', nivel: 3, location: 'C-15', description: 'Libros y papelería', phone: '(011) 1234-5684' },
    { id: 8, name: 'Shoe Palace', category: 'ropa', nivel: 1, location: 'A-40', description: 'Calzado para toda la familia', phone: '(011) 1234-5685' },
    { id: 9, name: 'Gadget Hub', category: 'tecnologia', nivel: 2, location: 'B-12', description: 'Accesorios tecnológicos', phone: '(011) 1234-5686' },
    { id: 10, name: 'Fitness Pro', category: 'deportes', nivel: 1, location: 'A-35', description: 'Equipamiento fitness', phone: '(011) 1234-5687' },
    { id: 11, name: 'Cosmetic Store', category: 'belleza', nivel: 3, location: 'C-22', description: 'Perfumería y cosmética', phone: '(011) 1234-5688' },
    { id: 12, name: 'Furniture Plus', category: 'hogar', nivel: 3, location: 'C-05', description: 'Muebles y accesorios', phone: '(011) 1234-5689' },
    { id: 13, name: 'Kids World', category: 'juguetes', nivel: 2, location: 'B-25', description: 'Juguetes educativos', phone: '(011) 1234-5690' },
    { id: 14, name: 'Stationery Shop', category: 'libros', nivel: 1, location: 'A-18', description: 'Papelería y útiles', phone: '(011) 1234-5691' },
    { id: 15, name: 'Style Boutique', category: 'ropa', nivel: 2, location: 'B-08', description: 'Ropa de diseño', phone: '(011) 1234-5692' },
    { id: 16, name: 'Electronics Plus', category: 'tecnologia', nivel: 3, location: 'C-12', description: 'Electrodomésticos', phone: '(011) 1234-5693' },
    { id: 17, name: 'Outdoor Gear', category: 'deportes', nivel: 2, location: 'B-35', description: 'Equipamiento outdoor', phone: '(011) 1234-5694' },
    { id: 18, name: 'Salon & Spa', category: 'belleza', nivel: 1, location: 'A-28', description: 'Salón de belleza', phone: '(011) 1234-5695' },
    { id: 19, name: 'Home Essentials', category: 'hogar', nivel: 2, location: 'B-15', description: 'Artículos para el hogar', phone: '(011) 1234-5696' },
    { id: 20, name: 'Game Store', category: 'juguetes', nivel: 3, location: 'C-28', description: 'Videojuegos y consolas', phone: '(011) 1234-5697' }
];

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('store-search');
    const categoryFilter = document.getElementById('category-filter');
    const storesList = document.getElementById('stores-list');
    const mapGrid = document.getElementById('map-grid');
    const resultsCount = document.getElementById('search-results-count');
    const noResults = document.getElementById('no-results');
    
    let filteredStores = [...stores];
    
    function initializeStores() {
        renderStoresList();
        renderMap();
        updateResultsCount();
    }
    
    function renderStoresList() {
        storesList.innerHTML = '';
        
        if (filteredStores.length === 0) {
            noResults.style.display = 'block';
            storesList.style.display = 'none';
            return;
        }
        
        noResults.style.display = 'none';
        storesList.style.display = 'grid';
        
        filteredStores.forEach(store => {
            const card = createStoreCard(store);
            storesList.appendChild(card);
        });
    }
    
    function createStoreCard(store) {
        const card = document.createElement('article');
        card.className = 'store-card';
        card.setAttribute('data-store-id', store.id);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        
        const categoryLabels = {
            'ropa': 'Ropa y Moda',
            'tecnologia': 'Tecnología',
            'deportes': 'Deportes',
            'belleza': 'Belleza y Cosmética',
            'hogar': 'Hogar y Decoración',
            'juguetes': 'Juguetes',
            'libros': 'Libros y Papelería',
            'otros': 'Otros'
        };
        
        card.innerHTML = `
            <div class="store-header">
                <div>
                    <h3 class="store-name">${store.name}</h3>
                    <span class="store-category">${categoryLabels[store.category] || store.category}</span>
                </div>
            </div>
            <div class="store-info">
                <p><strong>Ubicación:</strong> Nivel ${store.nivel}, ${store.location}</p>
                <p><strong>Descripción:</strong> ${store.description}</p>
                <p><strong>Teléfono:</strong> ${store.phone}</p>
            </div>
            <div class="store-actions">
                <button class="btn btn-small" onclick="highlightStore(${store.id})" aria-label="Mostrar ${store.name} en el mapa">Ver en mapa</button>
                <a href="contact.html" class="btn btn-outline-small">Contactar</a>
            </div>
        `;
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                highlightStore(store.id);
            }
        });
        
        return card;
    }
    
    function renderMap() {
        mapGrid.innerHTML = '';
        
        stores.forEach(store => {
            const cell = document.createElement('div');
            cell.className = `map-store nivel${store.nivel}`;
            cell.setAttribute('data-store-id', store.id);
            cell.setAttribute('tabindex', '0');
            cell.setAttribute('role', 'button');
            cell.setAttribute('aria-label', `${store.name}, Nivel ${store.nivel}, ${store.location}`);
            cell.textContent = store.name.substring(0, 10);
            cell.title = `${store.name} - Nivel ${store.nivel}, ${store.location}`;
            
            const isVisible = filteredStores.some(s => s.id === store.id);
            if (!isVisible) {
                cell.style.opacity = '0.3';
                cell.style.pointerEvents = 'none';
            }
            
            cell.addEventListener('click', () => highlightStore(store.id));
            cell.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    highlightStore(store.id);
                }
            });
            
            mapGrid.appendChild(cell);
        });
    }
    
    window.highlightStore = function(storeId) {
        document.querySelectorAll('.store-card.highlighted, .map-store.highlighted').forEach(el => {
            el.classList.remove('highlighted');
        });
        
        const card = document.querySelector(`.store-card[data-store-id="${storeId}"]`);
        const mapCell = document.querySelector(`.map-store[data-store-id="${storeId}"]`);
        
        if (card) {
            card.classList.add('highlighted');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.focus();
        }
        
        if (mapCell) {
            mapCell.classList.add('highlighted');
            mapCell.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        const store = stores.find(s => s.id === storeId);
        if (store) {
            const liveRegion = document.querySelector('[role="status"]') || createLiveRegion();
            liveRegion.textContent = `Local destacado: ${store.name}, ubicado en Nivel ${store.nivel}, ${store.location}`;
        }
    };
    
    function createLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        document.body.appendChild(liveRegion);
        return liveRegion;
    }
    
    function filterStores() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const category = categoryFilter.value;
        
        filteredStores = stores.filter(store => {
            const matchesSearch = !searchTerm || 
                store.name.toLowerCase().includes(searchTerm) ||
                store.description.toLowerCase().includes(searchTerm) ||
                store.category.toLowerCase().includes(searchTerm) ||
                store.location.toLowerCase().includes(searchTerm);
            
            const matchesCategory = category === 'all' || store.category === category;
            
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
        
        resultsCount.setAttribute('aria-live', 'polite');
    }
    
    window.clearFilters = function() {
        searchInput.value = '';
        categoryFilter.value = 'all';
        filterStores();
        searchInput.focus();
    };
    
    searchInput.addEventListener('input', filterStores);
    categoryFilter.addEventListener('change', filterStores);
    
    initializeStores();
    
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function() {
            searchInput.focus();
        });
    }
});

