# Guía: captura de leads del Diagnóstico

Los leads llegan por dos vías al mismo tiempo:

1. **WhatsApp** — al enviar el formulario se abre tu WhatsApp con los datos ya escritos. Funciona desde ya, no requiere configuración.
2. **Hoja de Google + aviso** — respaldo. Guarda todo lead aunque la persona no presione enviar en WhatsApp. **Esto es lo que falta configurar.**

Todo se configura en un solo archivo: `js/leads-config.js`.

---

## Paso 1 — Crea la hoja

Nueva hoja de cálculo en Google Sheets llamada **Leads CultuLab**.

En la fila 1, estos encabezados exactos, en este orden:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Fecha | Nombre | Empresa | Correo | Teléfono | Alertas | Detalle | Prioridad |

---

## Paso 2 — Pega el script

En la hoja: menú **Extensiones → Apps Script**. Borra lo que haya y pega esto:

```javascript
// Recibe los leads del Diagnóstico de la web y los guarda en la hoja.
// Además envía un aviso por correo y, si lo configuras, por Telegram.

// ID de la hoja: es el trozo largo de su URL, entre /d/ y /edit
var HOJA_ID        = '18ZVvcseV_y7EbYyR3ZNtKZ_UP02A7ddmO7IpXxQEhWY';
var CORREO_AVISO   = 'cultulab.comercial@gmail.com';
var TELEGRAM_TOKEN = '';   // opcional
var TELEGRAM_CHAT  = '';   // opcional

function guardarLead(d) {
  var hoja = SpreadsheetApp.openById(HOJA_ID).getSheets()[0];

  hoja.appendRow([
    new Date(),
    d.nombre    || '',
    d.empresa   || '',
    d.correo    || '',
    d.telefono  || '',
    d.totalAlertas || 0,
    d.alertas   || '',
    d.servicioPrioritario || ''
  ]);

  var texto =
    'NUEVO LEAD — Diagnóstico de Gestión Humana\n\n' +
    'Nombre: '   + (d.nombre || '')   + '\n' +
    'Empresa: '  + (d.empresa || '')  + '\n' +
    'Correo: '   + (d.correo || '')   + '\n' +
    'Teléfono: ' + (d.telefono || '') + '\n\n' +
    'Alertas: '  + (d.totalAlertas || 0) + '\n' +
    (d.alertas || '') + '\n\n' +
    'Prioridad: ' + (d.servicioPrioritario || '');

  if (CORREO_AVISO) {
    MailApp.sendEmail(CORREO_AVISO, 'Nuevo lead: ' + (d.empresa || 'sin empresa'), texto);
  }

  if (TELEGRAM_TOKEN && TELEGRAM_CHAT) {
    UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_TOKEN + '/sendMessage', {
      method: 'post',
      payload: { chat_id: TELEGRAM_CHAT, text: texto }
    });
  }
}

// Recibe el lead desde la web
function doPost(e) {
  try {
    guardarLead(JSON.parse(e.postData.contents));
    return ContentService.createTextOutput('OK');
  } catch (err) {
    return ContentService.createTextOutput('ERROR: ' + err);
  }
}

// Sirve para dos cosas:
// 1) Abrir la URL en el navegador y comprobar que todo funciona (?test=1)
// 2) Respaldo por si el envío principal es bloqueado por el navegador
function doGet(e) {
  var p = (e && e.parameter) || {};

  if (p.test === '1') {
    try {
      SpreadsheetApp.openById(HOJA_ID).getSheets()[0].getName();
      return ContentService.createTextOutput('OK: el script ve la hoja y está listo.');
    } catch (err) {
      return ContentService.createTextOutput('ERROR al abrir la hoja: ' + err);
    }
  }

  if (p.nombre) {
    try {
      guardarLead(p);
      return ContentService.createTextOutput('OK');
    } catch (err) {
      return ContentService.createTextOutput('ERROR: ' + err);
    }
  }

  return ContentService.createTextOutput('Servicio activo. Usa ?test=1 para verificar.');
}
```

Guarda con el icono del disquete.

> **Si ya habías pegado una versión anterior:** no basta con guardar. Tienes que volver a publicar (Paso 3) eligiendo **Nueva versión**, o la URL seguirá ejecutando el código viejo. Este es el error más común.

---

## Paso 3 — Publica el script

**Si es la primera vez:**

1. Botón azul **Implementar → Nueva implementación**
2. En el engranaje elige **Aplicación web**
3. Configura así:
   - **Ejecutar como:** Yo
   - **Quién tiene acceso:** **Cualquier usuario** ← si pones otra cosa, no funciona
4. **Implementar**
5. La primera vez pide permisos. Google muestra una advertencia porque el script es tuyo y no está verificado: **Configuración avanzada → Ir a (nombre del proyecto)** → **Permitir**
6. Copia la **URL de la aplicación web**. Termina en `/exec`

**Si ya lo habías publicado antes y cambiaste el código:**

1. **Implementar → Gestionar implementaciones**
2. Clic en el **lápiz** (editar) de la implementación existente
3. En **Versión** elige **Nueva versión**
4. **Implementar**

La URL no cambia. Si te saltas esto, tu URL sigue corriendo el código viejo — es el error más común.

---

## Verificación rápida

Abre esta dirección en tu navegador, pegándole `?test=1` al final:

```
https://script.google.com/macros/s/TU_URL.../exec?test=1
```

- **"OK: el script ve la hoja y está listo."** → todo bien
- **"ERROR al abrir la hoja: ..."** → revisa que el `HOJA_ID` sea correcto
- **"Script function not found: doGet"** → no publicaste la versión nueva. Vuelve al paso de arriba

---

## Paso 4 — Pega la URL en el sitio

Abre `js/leads-config.js` y reemplaza:

```javascript
webhookUrl: 'PENDIENTE',
```

por tu URL:

```javascript
webhookUrl: 'https://script.google.com/macros/s/AKfycb.../exec',
```

Listo.

---

## Paso 5 — Pruébalo

1. Abre el diagnóstico, marca dos o tres casillas y llena el formulario con datos falsos.
2. Debe pasar todo esto:
   - Se abre WhatsApp con el mensaje escrito
   - Aparece una fila nueva en la hoja
   - Te llega el correo de aviso
3. Borra la fila de prueba.

**Si no aparece la fila:** abre la consola del navegador (F12 → Consola). Si dice *"Captura de leads NO configurada"*, la URL no quedó pegada. Si no dice nada y aun así no llega, revisa que en el Paso 3 hayas puesto **"Cualquier usuario"**.

---

## Aviso por Telegram (opcional)

Si quieres que además te suene en el celular:

1. En Telegram busca **@BotFather**, envía `/newbot`, ponle nombre. Te da un token.
2. Escríbele algo a tu bot nuevo.
3. Abre en el navegador: `https://api.telegram.org/bot<TU_TOKEN>/getUpdates` y busca el número de `"chat":{"id":...}`.
4. Pega token y chat id en las dos variables del script.

---

## Cambiar de opinión

En `js/leads-config.js`:

- **`abrirWhatsAppAlEnviar: false`** — deja de abrirse WhatsApp automáticamente. El lead igual queda guardado y el botón de WhatsApp sigue en los resultados.
- **`whatsapp`** — cambiar el número que recibe.
- **`duracionLlamada`** — debe decir lo mismo que la página principal.

---

## Ley 1581 (habeas data)

Estás recogiendo nombre, correo y teléfono. Antes de publicar esto:

- El formulario debe tener una casilla de autorización de tratamiento de datos con enlace a `pages/privacidad.html`.
- **Hoy no la tiene.** Es lo único pendiente para que la captura quede en regla.
