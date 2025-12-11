// ==========================================
// ANALYTICS.JS - CultuLab
// Tracking de eventos personalizados
// ==========================================

// Función helper para enviar eventos
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
        console.log('📊 Evento trackeado:', eventName, eventParams);
    } else {
        console.warn('⚠️ Google Analytics no está cargado');
    }
}

// ==========================================
// TRACKING AUTOMÁTICO DE CLICKS EN BOTONES
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Track clicks en botones principales
    const buttons = document.querySelectorAll('button[onclick]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('onclick');
            const buttonText = this.textContent.trim();
            
            trackEvent('button_click', {
                button_text: buttonText,
                button_action: action,
                page_location: window.location.href
            });
        });
    });
    
    // Track clicks en enlaces de WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('contact_whatsapp', {
                link_text: this.textContent.trim(),
                page_location: window.location.href
            });
        });
    });
    
    // Track clicks en emails
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('contact_email', {
                email_to: this.getAttribute('href').replace('mailto:', '').split('?')[0],
                page_location: window.location.href
            });
        });
    });
    
    // Track clicks en redes sociales
    const socialLinks = document.querySelectorAll('a[href*="linkedin.com"], a[href*="instagram.com"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            let platform = 'unknown';
            const href = this.getAttribute('href');
            
            if (href.includes('linkedin')) platform = 'LinkedIn';
            else if (href.includes('instagram')) platform = 'Instagram';
            
            trackEvent('social_click', {
                social_platform: platform,
                link_url: href
            });
        });
    });
    
    // Track interacción con planes
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('click', function() {
            const planName = this.getAttribute('data-plan') || 'Plan desconocido';
            
            trackEvent('plan_view', {
                plan_name: planName,
                plan_type: this.classList.contains('featured') ? 'destacado' : 'regular'
            });
        });
    });
    
    // Track scroll depth (profundidad de scroll)
    let scrollDepths = [25, 50, 75, 100];
    let trackedDepths = [];
    
    window.addEventListener('scroll', function() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        
        scrollDepths.forEach(depth => {
            if (scrolled >= depth && !trackedDepths.includes(depth)) {
                trackedDepths.push(depth);
                trackEvent('scroll_depth', {
                    depth_percentage: depth
                });
            }
        });
    });
    
    // Track tiempo en página (después de 30 segundos)
    setTimeout(function() {
        trackEvent('time_on_page', {
            duration_seconds: 30
        });
    }, 30000);
    
    // Track cuando el usuario está por salir (exit intent)
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY < 0) {
            trackEvent('exit_intent', {
                page_location: window.location.href
            });
        }
    });
    
});

// ==========================================
// FUNCIONES ESPECÍFICAS DE CONVERSIÓN
// ==========================================

// Estas se pueden llamar manualmente desde main.js si es necesario
function trackAgendarLlamada() {
    trackEvent('conversion', {
        conversion_type: 'agendar_llamada',
        conversion_value: 1
    });
}

function trackCotizarPrograma() {
    trackEvent('conversion', {
        conversion_type: 'solicitar_cotizacion',
        conversion_value: 1
    });
}

function trackSolicitarPropuesta() {
    trackEvent('conversion', {
        conversion_type: 'solicitar_propuesta',
        conversion_value: 1
    });
}

// ==========================================
// TRACKING DE FORMULARIOS (si los agregas)
// ==========================================
function trackFormSubmit(formName) {
    trackEvent('form_submit', {
        form_name: formName
    });
}

// ==========================================
// TRACKING DE ERRORES (opcional)
// ==========================================
window.addEventListener('error', function(e) {
    trackEvent('js_error', {
        error_message: e.message,
        error_source: e.filename,
        error_line: e.lineno
    });
});

console.log('✅ Analytics.js cargado correctamente');