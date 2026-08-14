# Esquina personal

Blog personal estático construido con Astro. Está pensado como un archivo personal: textos largos, fotografías y proyectos, sin cuentas, comentarios, publicidad, trackers ni funcionalidades de engagement.

## Arquitectura

- Astro con salida estática.
- Markdown/MDX para las entradas.
- Colecciones de contenido para posts y fotografías.
- CSS propio, sin framework de UI.
- JavaScript de cliente: ninguno.
- Dependencias: Astro únicamente.
- Fotografías locales en `public/photos/`.
- RSS generado desde una ruta estática.
- GitHub Actions para GitHub Pages.

## Requisitos

Node.js 22 o superior recomendado.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Luego abre la dirección que muestra Astro, normalmente `http://localhost:4321`.

Para una compilación de producción:

```bash
npm run build
npm run preview
```

## Crear una entrada

Crea un archivo `.md` o `.mdx` en:

`src/content/blog/`

Ejemplo mínimo:

```md
---
title: "Mi título"
subtitle: "Una bajada opcional"
description: "Descripción para metadatos y RSS."
date: 2026-08-14
category: "Nueva categoría"
tags: ["uno", "dos"]
---

Aquí comienza el texto.
```

La categoría se crea automáticamente: no hay que registrarla en ningún archivo de configuración.

### Fecha de modificación

Si quieres mostrarla, agrega:

```yaml
updated: 2026-08-20
```

### Portada

Puedes agregar una imagen de portada:

```yaml
cover: "/photos/mi-foto.jpg"
```

## Agregar fotografías

1. Copia la fotografía a `public/photos/`.
2. Crea un archivo Markdown en `src/content/photos/`.
3. Apunta `image` al archivo público.

Ejemplo:

```md
---
title: "Mi fotografía"
date: 2026-08-14
location: "Lugar opcional"
description: "Descripción opcional."
image: "/photos/mi-foto.jpg"
tags: ["viaje", "ciudad"]
---
```

## Galerías dentro de una entrada

Puedes utilizar Markdown normal:

```md
![Descripción](/photos/foto-01.jpg)

![Otra fotografía](/photos/foto-02.jpg)
```

Para varias fotografías, simplemente añade varias imágenes en el orden que quieras.

## Categorías

No existe una lista fija de categorías. El sitio toma `category` desde las entradas y construye automáticamente `/categories/` y las páginas individuales.

Por ejemplo, esto crea una categoría nueva:

```yaml
category: "Electrónica"
```

No hay que editar ningún componente.

## Personalizar Sobre mí

Edita:

`src/pages/about/index.astro`

Puedes escribir allí lo que quieras. No está diseñado como currículum.

## Cambiar el nombre del sitio

Edita `src/layouts/BaseLayout.astro` y cambia `Esquina personal` por el nombre que quieras.

También cambia el valor de `site` en `astro.config.mjs` cuando tengas el dominio definitivo.

## GitHub Pages

El workflow de `.github/workflows/deploy.yml` construye `dist/` y lo publica mediante GitHub Pages.

Si el repositorio es `usuario.github.io`, puedes usar:

```js
export default defineConfig({
  site: 'https://usuario.github.io',
  output: 'static'
});
```

Si el repositorio es un proyecto como `usuario.github.io/esquina-personal`, Astro necesita una configuración `base` apropiada para esa ruta. Para un dominio propio, configura `site` con el dominio y añade un archivo `public/CNAME` con el dominio.

Después, en GitHub:

1. Sube el proyecto al repositorio.
2. Ve a Settings → Pages.
3. Selecciona `GitHub Actions` como fuente.
4. Haz push a `main`.

## Servidor propio

La salida estática queda en `dist/`. Puedes copiar ese directorio a cualquier servidor web que sirva archivos estáticos.

No hay base de datos ni proceso Node que mantener en producción.

## Filosofía de mantenimiento

La intención es que el sitio envejezca bien. Evita agregar dependencias solo porque sean populares. Si una función puede resolverse con Markdown, CSS o una pequeña función de Astro, esa es normalmente la opción preferible.
