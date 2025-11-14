document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.services-section');
    
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
    
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'article');
        
        item.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                const link = this.querySelector('a');
                if (link) {
                    event.preventDefault();
                    link.click();
                }
            }
        });
    });
    
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
        const parentCard = icon.closest('.service-card');
        if (parentCard) {
            const heading = parentCard.querySelector('h2');
            if (heading) {
                icon.setAttribute('aria-label', `Icono de ${heading.textContent}`);
            }
        }
    });
    
    const buttons = document.querySelectorAll('.benefit-item .btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            this.setAttribute('aria-busy', 'true');
            this.textContent = 'Cargando...';
            
            setTimeout(() => {
                this.setAttribute('aria-busy', 'false');
            }, 1000);
        });
    });
    
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
});

