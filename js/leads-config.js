// leads-config.js
// ÚNICO LUGAR donde se configura la captura de leads del Diagnóstico.
// Paso a paso completo: GUIA_CAPTURA_LEADS.md en la raíz del sitio.

window.CULTULAB_LEADS = {

    // 1) Tu WhatsApp comercial, con indicativo y sin signos ni espacios.
    whatsapp: '573104086399',

    // 2) URL del Web App de Google Apps Script que guarda el lead en tu hoja
    //    y te manda el aviso. Mientras diga 'PENDIENTE' no se envía nada
    //    (WhatsApp sigue funcionando igual) y la consola te avisa.
    //    Se ve así: https://script.google.com/macros/s/AKfycb.../exec
    webhookUrl: 'https://script.google.com/macros/s/AKfycbxuj3emY3FNYOhi0bN9wAwdT5FYmgcDVqjCqCbpL2mcK0nADbNaCd_I2cnbbrrVGu0/exec',

    // 3) ¿Abrir WhatsApp automáticamente al enviar el formulario?
    //    true  = se abre en una pestaña nueva con el mensaje ya escrito.
    //    false = solo queda el botón de WhatsApp en los resultados.
    abrirWhatsAppAlEnviar: true,

    // 4) Duración que se anuncia de la llamada diagnóstico.
    //    Debe coincidir con lo que dice la página principal.
    duracionLlamada: '30 minutos'
};
