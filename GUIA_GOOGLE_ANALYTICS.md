# Cómo conectar Google Analytics a la web de CultuLab

Ahora mismo la web **no mide nada**. Cada visita que llega desde Instagram, LinkedIn o WhatsApp se pierde sin registro. Esto se arregla en unos 10 minutos.

---

## Paso 1 — Crear la cuenta

Entra a **https://analytics.google.com** con la cuenta de Google de CultuLab (la misma de `cultulab.comercial@gmail.com`).

Si es la primera vez, te va a pedir crear una cuenta:

- **Nombre de la cuenta:** CultuLab
- **País:** Colombia
- **Zona horaria:** (GMT-05:00) Bogotá
- **Moneda:** Peso colombiano (COP)

## Paso 2 — Crear la propiedad

- **Nombre de la propiedad:** Sitio web CultuLab
- **Categoría del sector:** Servicios empresariales
- **Tamaño de la empresa:** Pequeña

## Paso 3 — Crear el flujo de datos

Elige **Web** y pega la URL del sitio:

```
https://cultulab.github.io/cultulab-website/
```

Nombre del flujo: `Web principal`.

## Paso 4 — Copiar el ID de medición

Al terminar, Google te muestra un **ID de medición** arriba a la derecha. Se ve así:

```
G-1A2B3C4D5E
```

Empieza siempre por `G-`. Ese es el que necesitas. Cópialo.

## Paso 5 — Pegarlo en el código

Abre el archivo:

```
cultulab-website/js/analytics-config.js
```

Y reemplaza la línea 5:

```js
googleAnalyticsId: 'G-XXXXXXXXXX',
```

por la tuya:

```js
googleAnalyticsId: 'G-1A2B3C4D5E',
```

**Solo hay que cambiarlo ahí.** El `index.html` lo lee de este archivo automáticamente.

## Paso 6 — Publicar y verificar

Sube el cambio a GitHub. Espera 2 minutos a que GitHub Pages lo despliegue.

Luego:

1. Abre https://cultulab.github.io/cultulab-website/ en tu celular.
2. En Google Analytics ve a **Informes → Tiempo real**.
3. Deberías verte a ti mismo como usuario activo en menos de 30 segundos.

Si no aparece nadie, abre la consola del navegador (F12). Si dice `[CultuLab] Google Analytics NO configurado`, el ID quedó mal pegado o todavía tiene una X.

---

## Qué mirar una vez esté andando

Las tres cosas que de verdad importan para el negocio:

| Métrica | Dónde está | Para qué sirve |
|---|---|---|
| Usuarios por fuente | Adquisición → Adquisición de tráfico | Saber si Instagram te trae gente o no |
| Clics en botones de WhatsApp | Interacción → Eventos | Es tu conversión real, no las visitas |
| Páginas más vistas | Interacción → Páginas y pantallas | Ver si el checklist se está usando |

El evento clave a vigilar es el clic en WhatsApp. Las visitas no pagan facturas; las conversaciones sí.

---

## Pendientes relacionados

En `analytics-config.js` también quedaron con placeholder:

- `facebookPixelId` — necesario si vas a pautar en Meta Ads
- `linkedinPartnerId` — necesario si vas a pautar en LinkedIn
- `hotjarId` — opcional, sirve para ver grabaciones de sesión
- `webhookUrl` — apunta a `hooks.cultulab.co`, un dominio que no existe todavía

Ninguno rompe el sitio, pero tampoco hace nada. Configúralos solo cuando vayas a encender la pauta.
