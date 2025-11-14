document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.entertainment-section');
    
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
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
    
    const culturalItems = document.querySelectorAll('.cultural-item');
    culturalItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'article');
    });
    
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'article');
    });
    
    const culturalIcons = document.querySelectorAll('.cultural-icon');
    culturalIcons.forEach(icon => {
        const parentItem = icon.closest('.cultural-item');
        if (parentItem) {
            const heading = parentItem.querySelector('h3');
            if (heading) {
                icon.setAttribute('aria-label', `Icono de ${heading.textContent}`);
            }
        }
    });
    
    const images = document.querySelectorAll('.entertainment-image img');
    
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
    
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function() {
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
                mainContent.addEventListener('blur', function() {
                    mainContent.removeAttribute('tabindex');
                }, { once: true });
            }
        });
    }
    
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    document.body.appendChild(liveRegion);
});

