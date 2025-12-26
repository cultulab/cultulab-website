// ==========================================
// MAIN.JS - CultuLab
// Funciones principales del sitio web
// ==========================================

// ==========================================
// FUNCIONES DE CONVERSIÓN
// ==========================================

function agendarLlamada() {
    // Abre Calendly para agendar reunión
    window.location.href = 'https://calendly.com/cultulab-comercial/30min';
}

function cotizarPrograma() {
    // Contacto por WhatsApp para cotización
    const mensaje =
        "Hola CultuLab 👋\n\n" +
        "Estoy interesado en conocer más sobre sus programas de cultura organizacional y recibir una cotización.\n\n" +
        "Información de mi empresa:\n" +
        "- Nombre de la empresa: \n" +
        "- Número de colaboradores: \n" +
        "- Sector: \n" +
        "- Plan de interés (Conexión / Acción / Evolución): \n\n" +
        "Gracias.";

    window.open(`https://wa.me/573012699885?text=${encodeURIComponent(mensaje)}`, '_blank');
}

function solicitarPropuestaWhatsApp() {
    // Contacto por WhatsApp para propuesta personalizada
    const mensaje =
        "Hola CultuLab 👋\n\n" +
        "Me gustaría recibir una propuesta personalizada para fortalecer la cultura organizacional de mi empresa.\n\n" +
        "Información de mi empresa:\n" +
        "- Nombre: \n" +
        "- Número de colaboradores: \n" +
        "- Sector: \n" +
        "- Principal desafío: \n\n" +
        "Gracias.";

    window.open(`https://wa.me/573012699885?text=${encodeURIComponent(mensaje)}`, '_blank');
}

// La función anterior de descarga de checklist ha sido reemplazada 
// por la página interactiva en /pages/checklist.html

// ==========================================
// SMOOTH SCROLL - Navegación interna
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Añadir IDs a las secciones para navegación
    const sections = {
        '.planes': 'planes',
        '.about': 'about',
        '.beneficios': 'beneficios',
        '.cta-secundario': 'contacto'
    };

    Object.entries(sections).forEach(([selector, id]) => {
        const element = document.querySelector(selector);
        if (element) element.id = id;
    });
});

// ==========================================
// ANIMACIONES AL SCROLL
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Cerrar otros abiertos
            faqItems.forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// HEADER SCROLL EFFECT
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ANIMATED COUNTERS
document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Cuanto más bajo, más rápido

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';

        let count = 0;
        const inc = target / speed;

        const updateCount = () => {
            count += inc;
            if ((inc > 0 && count < target) || (inc < 0 && count > target)) {
                counter.innerText = prefix + Math.ceil(count) + suffix;
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = prefix + target + suffix;
            }
        };
        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});

console.log('✅ Main.js cargado correctamente');