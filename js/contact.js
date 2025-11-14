document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            clearFormErrors();
            
            if (validateForm()) {
                submitForm();
            }
        });
        
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error-input')) {
                    validateField(this);
                }
            });
        });
    }
    
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        if (!validateField(name)) isValid = false;
        if (!validateField(email)) isValid = false;
        if (!validateField(subject)) isValid = false;
        if (!validateField(message)) isValid = false;
        
        if (email.value && !isValidEmail(email.value)) {
            showFieldError(email, 'Por favor ingresa un email válido');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        field.classList.remove('error-input');
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'Este campo es obligatorio');
            return false;
        }
        
        if (fieldName === 'email' && value && !isValidEmail(value)) {
            showFieldError(field, 'Por favor ingresa un email válido');
            return false;
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error-input');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function clearFormErrors() {
        const errorInputs = contactForm.querySelectorAll('.error-input');
        errorInputs.forEach(input => {
            input.classList.remove('error-input');
        });
        
        const errorMessages = contactForm.querySelectorAll('.error');
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
        const successMessage = document.getElementById('form-success');
        const errorMessage = document.getElementById('form-error');
        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function submitForm() {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.setAttribute('aria-busy', 'true');
        
        setTimeout(() => {
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            const successMessage = document.getElementById('form-success');
            successMessage.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
            successMessage.style.display = 'block';
            
            contactForm.reset();
            clearFormErrors();
            
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.setAttribute('aria-busy', 'false');
            
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            announceToScreenReader('Mensaje enviado con éxito');
        }, 1500);
    }
    
    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', function() {
            toggleChatbot();
        });
        
        if (chatbotClose) {
            chatbotClose.addEventListener('click', function() {
                closeChatbot();
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && chatbotWindow.classList.contains('active')) {
                closeChatbot();
            }
        });
        
        if (chatbotSend && chatbotInput) {
            chatbotSend.addEventListener('click', function() {
                sendChatbotMessage();
            });
            
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendChatbotMessage();
                }
            });
        }
    }
    
    function toggleChatbot() {
        const isActive = chatbotWindow.classList.contains('active');
        
        if (isActive) {
            closeChatbot();
        } else {
            openChatbot();
        }
    }
    
    function openChatbot() {
        chatbotWindow.classList.add('active');
        chatbotWindow.setAttribute('aria-hidden', 'false');
        chatbotToggle.setAttribute('aria-expanded', 'true');
        chatbotInput.focus();
    }

    function closeChatbot() {
        chatbotWindow.classList.remove('active');
        chatbotWindow.setAttribute('aria-hidden', 'true');
        chatbotToggle.setAttribute('aria-expanded', 'false');
        chatbotToggle.focus();
    }
    
    function sendChatbotMessage() {
        const message = chatbotInput.value.trim();
        
        if (!message) {
            chatbotInput.focus();
            return;
        }
        
        addChatbotMessage(message, 'user');
        chatbotInput.value = '';
        
        chatbotInput.disabled = true;
        chatbotSend.disabled = true;
        
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addChatbotMessage(botResponse, 'bot');
            
            chatbotInput.disabled = false;
            chatbotSend.disabled = false;
            chatbotInput.focus();
        }, 1000);
    }
    
    function addChatbotMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.setAttribute('role', type === 'user' ? 'user' : 'assistant');
        
        const messageText = document.createElement('p');
        messageText.textContent = text;
        messageDiv.appendChild(messageText);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('hola') || message.includes('buenos días') || message.includes('buenas tardes')) {
            return '¡Hola! ¿En qué puedo ayudarte hoy?';
        }
        
        if (message.includes('horario') || message.includes('hora') || message.includes('abierto')) {
            return 'Estamos abiertos de lunes a viernes de 10:00 a 22:00, y sábados y domingos de 10:00 a 23:00.';
        }
        
        if (message.includes('ubicación') || message.includes('dirección') || message.includes('dónde')) {
            return 'Estamos ubicados en Av. Principal 1234, Ciudad, Provincia.';
        }
        
        if (message.includes('estacionamiento') || message.includes('parking')) {
            return 'Contamos con estacionamiento gratuito las primeras 2 horas. Tenemos más de 500 espacios disponibles.';
        }
        
        if (message.includes('local') || message.includes('tienda') || message.includes('comercio')) {
            return 'Tenemos más de 200 locales comerciales. Puedes buscar por nombre o categoría en la sección de Locales.';
        }
        
        if (message.includes('oferta') || message.includes('descuento') || message.includes('promoción')) {
            return 'Tenemos ofertas especiales disponibles. Visita la sección de Ofertas para ver todas las promociones.';
        }
        
        if (message.includes('contacto') || message.includes('teléfono') || message.includes('email')) {
            return 'Puedes contactarnos al (011) 1234-5678 o escribirnos a info@centrotematico.com';
        }
        
        return 'Gracias por tu mensaje. Para más información, puedes llamarnos al (011) 1234-5678 o visitar nuestras secciones en el sitio web.';
    }
    
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
});

