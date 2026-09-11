# Cómo convertir Licencia Clara en una página web

Guía paso a paso para publicar los archivos del proyecto en internet, sin saber
programar y sin instalar nada. Tiempo aproximado: 10 a 20 minutos.

> **Antes de publicar, recuerda:** Licencia Clara es una **demostración con datos
> ficticios**. No la presentes como un servicio oficial, no uses nombres ni
> direcciones que parezcan del Gobierno (por ejemplo, que terminen en `gob.gt`) y
> no agregues datos reales de personas, placas ni contraseñas.

---

## 1. Prepara los archivos

1. **Descomprime el ZIP** `licencia-clara-1.1.zip` en tu computadora
   (clic derecho → *Extraer todo* en Windows, o doble clic en Mac).
2. Abre la carpeta y confirma que **`index.html` está a la vista**, junto con las
   carpetas `css`, `js` y `csv`. Si al abrir la carpeta ves otra carpeta adentro,
   entra hasta llegar a donde está `index.html`: esa es la carpeta que vas a publicar.
3. **Pruébala en tu computadora:** haz doble clic en `index.html`. Debe abrirse en
   tu navegador con los colores y los dos botones: *Consultar multas* y
   *Consultar mi licencia*. Si funciona aquí, funcionará publicada.

### Qué archivo hace qué

| Archivo o carpeta | ¿Lo necesita la web? | Para qué sirve |
|---|---|---|
| `index.html` y los demás `.html` | **Sí** | Las pantallas. `index.html` es la portada |
| `css/` | **Sí** | Colores, letras y diseño. Sin ella la página se ve sin estilo |
| `js/` | **Sí** | Los datos y el funcionamiento. Sin ella los botones no hacen nada |
| `una-pagina.html` | No, pero ayuda | Toda la web en un solo archivo (ver opción C) |
| `csv/`, `.py`, `.md` | No | Datos para hojas de cálculo, generadores y guías. Puedes subirlos igual; no molestan |

---

## 2. Elige cómo publicarla

| Opción | Ideal para | Necesitas | Dirección que obtienes |
|---|---|---|---|
| **A. GitHub Pages** (recomendada) | Una dirección fija para el equipo o un jurado | Cuenta gratuita de GitHub | `https://tu-usuario.github.io/licencia-clara/` |
| **B. Netlify Drop** | Publicar en 2 minutos arrastrando la carpeta | Cuenta gratuita de Netlify para dejarla pública y permanente | `https://un-nombre.netlify.app` |
| **C. Un solo archivo** | Enviarla por correo, WhatsApp o memoria USB, o abrirla sin internet | Nada | No tiene dirección: se abre con doble clic |
| **D. Vista en Claude** | Revisarla tú y compartirla desde Claude | Tu cuenta de Claude | Ya está publicada y es privada hasta que la compartas |

---

## 3. Opción A · GitHub Pages (paso a paso)

### 3.1 Crea tu cuenta y el repositorio

1. Entra a **github.com** y crea una cuenta gratuita (o inicia sesión).
2. Arriba a la derecha, pulsa **+** → **New repository**.
3. En **Repository name** escribe `licencia-clara` (en minúsculas, sin espacios).
4. Elige **Public**. En el plan gratuito, GitHub Pages solo funciona con
   repositorios públicos: **cualquier persona podrá ver los archivos**. Por eso es
   importante que todos los datos sean ficticios.
5. Pulsa **Create repository**.

### 3.2 Sube los archivos

1. En la página del repositorio nuevo, pulsa el enlace **uploading an existing file**
   (o **Add file → Upload files**).
2. Abre en tu computadora la carpeta donde está `index.html`, **selecciona todo su
   contenido** (archivos y carpetas) y **arrástralo** a la zona de subida del navegador.
   No arrastres la carpeta de afuera: arrastra lo que está *dentro* de ella.
3. Espera a que termine de cargar la lista.
4. Abajo, en el cuadro de mensaje, escribe algo como `Primera versión de Licencia Clara`.
5. Pulsa el botón verde **Commit changes**.
6. **Revisa** que en el repositorio se vean `index.html` y las carpetas `css` y `js`.
   Si faltan las carpetas, entra a la carpeta en tu computadora y súbelas de nuevo
   (o usa la opción C como respaldo).

> Límites de GitHub al subir desde el navegador: hasta 100 archivos por vez y
> 25 MB por archivo. Licencia Clara tiene unos 30 archivos y pesa menos de 1 MB.

### 3.3 Enciende la página web

1. En el repositorio, pulsa **Settings** (el engranaje, arriba).
2. En el menú de la izquierda, dentro de *Code and automation*, pulsa **Pages**.
3. En **Build and deployment → Source**, elige **Deploy from a branch**.
4. En **Branch**, elige **main** y la carpeta **/ (root)**.
5. Pulsa **Save**.
6. Espera unos minutos (GitHub indica que puede tardar **hasta 10 minutos**) y
   recarga esa misma pantalla. Arriba aparecerá **Your site is live at…** con tu dirección:

   `https://TU-USUARIO.github.io/licencia-clara/`

7. Ábrela, cópiala y compártela.

---

## 4. Opción B · Netlify Drop (paso a paso)

1. Entra a **app.netlify.com/drop**.
2. **Arrastra la carpeta** donde está `index.html` al recuadro de la página.
   También acepta el archivo ZIP.
3. Espera unos segundos: Netlify te muestra la dirección de tu sitio.
4. **Crea tu cuenta o inicia sesión** cuando te lo pida. Mientras no reclames el
   sitio, Netlify lo deja protegido con una contraseña temporal. Al reclamarlo
   queda guardado en tu cuenta.
5. Revisa la visibilidad en la configuración de tu proyecto en Netlify: según tu
   plan, el sitio puede quedar **privado por defecto**. Si quieres que otras
   personas lo vean, cámbialo a público.

**Para actualizarlo después:** entra a tu proyecto en Netlify → sección
**Deploys** → arrastra la carpeta nueva al área de *Production deploys*.

---

## 5. Opción C · Un solo archivo

1. Toma el archivo **`una-pagina.html`**.
2. Envíalo por correo o WhatsApp, cópialo a una memoria USB o súbelo a cualquier
   servicio de archivos.
3. Quien lo reciba solo tiene que **abrirlo** (doble clic en computadora, o abrirlo
   con el navegador en el celular). Funciona **sin internet**.

También puedes publicar este único archivo en GitHub Pages o Netlify: en ese caso
renómbralo a `index.html` antes de subirlo.

---

## 6. Actualizar la página cuando cambies algo

1. Haz tus cambios en los archivos (por ejemplo, textos en `js/datos.js`).
2. Si tienes Python instalado, regenera la versión de un archivo:

   ```
   python3 construir-una-pagina.py
   ```

   Si no puedes ejecutarlo, avisa a quien lleve el proyecto: `una-pagina.html`
   quedaría desactualizado.
3. **GitHub Pages:** en el repositorio, **Add file → Upload files**, arrastra los
   archivos cambiados (se reemplazan los que tengan el mismo nombre) y pulsa
   **Commit changes**. La página se actualiza en unos minutos.
4. **Netlify:** arrastra otra vez la carpeta completa en *Deploys*.
5. En tu navegador, recarga con **Ctrl + Shift + R** (Windows) o
   **Cmd + Shift + R** (Mac) para no ver la versión anterior guardada.

---

## 7. Comprueba que quedó bien

Abre la dirección publicada **en un celular y en una computadora** y revisa:

- [ ] La portada muestra *Consulta tus multas vehiculares y el estado de tu licencia*, sin ningún nombre arriba.
- [ ] **Consultar multas** → toca `P-123ABC` → **Consultar multas**: aparecen 3 multas y el total **Q 400.00**.
- [ ] En esa consulta no aparece ningún nombre de persona.
- [ ] **Consultar mi licencia** → toca `sofia.demo` → **Ingresar**: aparece *Estado de tu licencia* con 3 bloqueos.
- [ ] **Cerrar sesión** te regresa a la portada sin nombre.
- [ ] Al abrir la dirección en una **pestaña nueva**, la portada vuelve a aparecer sin sesión.
- [ ] **Consultar orientación** muestra la tabla de montos y las fuentes.

---

## 8. Si algo sale mal

| Qué ves | Qué pasa | Cómo arreglarlo |
|---|---|---|
| **Error 404** en GitHub Pages | Todavía se está publicando, o `index.html` no quedó en la raíz | Espera 10 minutos. Revisa que `index.html` se vea en la página principal del repositorio y no dentro de otra carpeta |
| La página se ve **sin colores**, todo en blanco y negro | No se subió la carpeta `css` | Sube la carpeta `css` completa |
| Los **botones no hacen nada** o la consulta no avanza | No se subió la carpeta `js` | Sube la carpeta `js` completa |
| Netlify **pide una contraseña** | El sitio aún no está reclamado | Inicia sesión o crea tu cuenta y reclámalo |
| Hiciste cambios y **no aparecen** | El navegador guarda la versión anterior | Recarga con Ctrl + Shift + R, o espera unos minutos más |
| Los cambios del **panel institucional** no se ven en otro celular | Así funciona la demo: se guardan solo en ese navegador | Es lo esperado. Explícalo en la presentación |

---

## 9. Buenas prácticas

- Mantén visible el aviso de **demostración** en todas las pantallas.
- **No uses** logos, nombres de dominio ni colores institucionales que hagan pensar
  que es una página oficial.
- **No pidas contraseñas reales** a nadie. GitHub Pages prohíbe usar sus sitios para
  transacciones sensibles como enviar contraseñas o números de tarjeta; la pantalla
  de identidad de Licencia Clara es solo una simulación con usuarios de prueba.
- No cobres ni recibas pagos a través de la página.

---

### Fuentes de esta guía (consultadas el 10/09/2026)

- [GitHub Docs — Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [GitHub Docs — Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Docs — GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [GitHub Docs — Adding a file to a repository](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [Netlify Docs — Netlify Drop Quickstart](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/)
- [Netlify Changelog — Netlify Drop updates (27/07/2026)](https://www.netlify.com/changelog/2026-07-27-netlify-drop-refresh/)

Los nombres de botones y menús pueden cambiar si GitHub o Netlify actualizan sus pantallas.
