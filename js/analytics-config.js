// analytics-config.js
// ⬇️ ÚNICO LUGAR donde se cambia el ID de Google Analytics.
//    Reemplaza 'G-XXXXXXXXXX' por tu ID real (empieza por G- y son 10 caracteres).
//    Paso a paso: ver GUIA_GOOGLE_ANALYTICS.md en la raíz del sitio.
window.CULTULAB_ANALYTICS_CONFIG = {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    facebookPixelId: 'XXXXXXXXXXXXXXX',
    linkedinPartnerId: 'XXXXXXXX',
    hotjarId: 'XXXXXXXX',
    debug: true, // Cambiar a false en producción
    trackingConsent: true, // Integrar con banner de cookies
    webhookUrl: 'https://hooks.cultulab.co/analytics',
    
    // Eventos personalizados de CultuLab
    customEvents: {
        planInterest: true,
        resourceDownload: true,
        demoRequest: true,
        leadGeneration: true
    },
    
    // Configuración de scroll tracking
    scrollTracking: {
        enabled: true,
        thresholds: [25, 50, 75, 90]
    },
    
    // Configuración de time tracking
    timeTracking: {
        enabled: true,
        intervals: [30, 60, 120] // segundos
    }
};