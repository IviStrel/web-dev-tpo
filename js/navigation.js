document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            const label = isExpanded ? 'Abrir menú' : 'Cerrar menú';
            menuToggle.setAttribute('aria-label', label);
        });
        
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                if (navMenu.classList.contains('active')) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-label', 'Abrir menú');
                }
            }
        });
        
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-label', 'Abrir menú');
                }
            });
        });
        
        menuToggle.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                menuToggle.click();
            }
        });
    }
    
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || (currentPath.endsWith('/') && linkPath === currentPath.slice(0, -1))) {
            link.setAttribute('aria-current', 'page');
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    history.pushState(null, null, href);
                    
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                    target.addEventListener('blur', function() {
                        target.removeAttribute('tabindex');
                    }, { once: true });
                }
            }
        });
    });
});

