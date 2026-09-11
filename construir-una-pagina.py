#!/usr/bin/env python3
"""
Construye 'una-pagina.html': la misma web, empaquetada en UN SOLO archivo.

Para qué sirve: publicar la demo en cualquier lado sin subir carpetas, o
abrirla en un celular desde una memoria USB. Las 6 pantallas se convierten en
secciones y la navegación pasa a usar direcciones con almohadilla (#).

    licencia.html?caso=BLQ-...   ->   una-pagina.html#caso?caso=BLQ-...

La versión de varios archivos sigue siendo la principal: es la que el equipo
edita. Esta se REGENERA cada vez que cambien algo:

    python3 construir-una-pagina.py
"""

import os, re, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
PAGINAS = ["index", "identidad", "mi-licencia", "caso", "consulta-placa",
           "orientacion", "panel"]
INICIO = "index"


def leer(nombre):
    with open(os.path.join(AQUI, nombre), encoding="utf-8") as f:
        return f.read()


def cuerpo_de(html):
    """Devuelve (clase del body, contenido visible, cuerpo del script inline)."""
    m = re.search(r"<body([^>]*)>(.*)</body>", html, re.S)
    if not m:
        sys.exit("No encontré el <body>")
    clase = ""
    c = re.search(r'class="([^"]*)"', m.group(1))
    if c:
        clase = c.group(1)
    interior = m.group(2)

    # El último <script> sin src es el guion de la pantalla.
    guiones = re.findall(r"<script>(.*?)</script>", interior, re.S)
    guion = guiones[-1] if guiones else ""

    # Quitamos todos los <script> del contenido visible.
    visible = re.sub(r"<script[^>]*>.*?</script>", "", interior, flags=re.S)
    return clase, visible.strip(), guion


def estilos_de(html):
    """Los <style> propios de una pantalla, para conservarlos."""
    return "\n".join(re.findall(r"<style>(.*?)</style>", html, re.S))


def reescribir_enlaces(texto):
    """Convierte pagina.html en #pagina, tanto en HTML como en JavaScript."""
    for p in PAGINAS:
        destino = "#" + ("inicio" if p == INICIO else p)
        texto = texto.replace('href="%s.html' % p, 'href="%s' % destino)
        texto = texto.replace("'%s.html" % p, "'%s" % destino)
        texto = texto.replace('"%s.html' % p, '"%s' % destino)
    return texto


secciones, guiones, estilos = [], [], []

for p in PAGINAS:
    html = leer(p + ".html")
    clase, visible, guion = cuerpo_de(html)
    ruta = "inicio" if p == INICIO else p

    visible = reescribir_enlaces(visible)
    guion = reescribir_enlaces(guion)

    # El enlace "saltar al contenido" no puede usar una almohadilla: aquí la
    # almohadilla es la navegación. Lo marcamos para que el enrutador lo maneje.
    visible = visible.replace('<a class="saltar" href="#contenido">',
                              '<a class="saltar" href="#" data-saltar="1">')

    if "</script" in visible:
        sys.exit("La pantalla %s contiene '</script' en su HTML visible." % p)

    estilos.append(estilos_de(html))
    # Guardamos cada pantalla como TEXTO, no como HTML vivo. Así solo existe
    # una en el documento a la vez y los identificadores nunca se repiten.
    secciones.append(
        '<script type="text/plantilla" id="tpl-%s" data-clase="%s">\n%s\n</script>'
        % (ruta, clase, visible))
    guiones.append(
        'RUTAS["%s"] = function () {\n%s\n};' % (ruta, guion))

plantilla = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Licencia Clara · Multas vehiculares y estado de tu licencia</title>
<meta name="description" content="Demostración con datos ficticios para consultar multas vehiculares por placa y el estado de una licencia de conducir en Guatemala. No es un servicio oficial.">
<style>
%(estilos_base)s
</style>
<style>
%(estilos_pagina)s
</style>
</head>
<body>

<div id="app"></div>

%(secciones)s

<script>
%(datos)s
</script>
<script>
%(app)s
</script>
<script>
/* ------------------------------------------------------------------ */
/*  Enrutador de la versión de un solo archivo.                        */
/*                                                                     */
/*  Cada pantalla está guardada como TEXTO en una plantilla. Al entrar  */
/*  se copia al contenedor y se ejecuta su guion. Solo una pantalla     */
/*  existe en el documento a la vez, así que los identificadores        */
/*  (#pagina, #contenido, #reiniciar…) nunca se repiten ni se cruzan.   */
/* ------------------------------------------------------------------ */
(function () {
  var RUTAS = {};
  var app = document.getElementById("app");

  /* En esta versión los parámetros viajan en la almohadilla:
     #caso?caso=BLQ-...   Sustituimos la lectura por una que entienda eso. */
  Ui.parametro = function (clave) {
    var h = location.hash.replace(/^#/, "");
    var i = h.indexOf("?");
    if (i === -1) return "";
    var partes = h.substring(i + 1).split("&");
    for (var k = 0; k < partes.length; k++) {
      var par = partes[k].split("=");
      if (decodeURIComponent(par[0]) === clave) {
        return decodeURIComponent((par[1] || "").replace(/\\+/g, " "));
      }
    }
    return "";
  };

  /* Las navegaciones que hace app.js (cerrar sesión, pedir identidad) usan
     la almohadilla. Si el destino es la pantalla actual, se vuelve a pintar,
     porque cambiar a la misma almohadilla no dispara "hashchange". */
  Ui.navegar = function (destino) {
    var nuevo = String(destino).replace(/^#/, "");
    if (location.hash.replace(/^#/, "") === nuevo) { pintar(); return; }
    location.hash = nuevo;
  };

%(rutas)s

  function nombreActual() {
    var h = location.hash.replace(/^#/, "");
    var i = h.indexOf("?");
    if (i !== -1) h = h.substring(0, i);
    return RUTAS[h] ? h : "inicio";
  }

  function pintar() {
    var nombre = nombreActual();
    var plantilla = document.getElementById("tpl-" + nombre);
    app.innerHTML = plantilla.textContent;
    document.body.className = plantilla.getAttribute("data-clase") || "";
    try { RUTAS[nombre](); } catch (e) { console.error(e); }
    window.scrollTo(0, 0);
  }

  /* "Saltar al contenido" mueve el foco en vez de cambiar la almohadilla. */
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("[data-saltar]") : null;
    if (!a) return;
    e.preventDefault();
    var destino = document.getElementById("contenido");
    if (destino) { destino.setAttribute("tabindex", "-1"); destino.focus(); }
  });

  window.addEventListener("hashchange", pintar);
  pintar();
})();
</script>

</body>
</html>
"""

salida = plantilla % {
    "estilos_base": leer("css/estilos.css"),
    "estilos_pagina": "\n".join([e for e in estilos if e.strip()]),
    "secciones": "\n\n".join(secciones),
    "datos": leer("js/datos.js"),
    # app.js también navega (cerrar sesión, pedir identidad): sus enlaces
    # se reescriben igual que los de las pantallas.
    "app": reescribir_enlaces(leer("js/app.js")),
    "rutas": "\n".join("  " + g.replace("\n", "\n  ") for g in guiones),
}

destino = os.path.join(AQUI, "una-pagina.html")
with open(destino, "w", encoding="utf-8") as f:
    f.write(salida)

print("Listo: una-pagina.html  (%d KB)" % (len(salida.encode("utf-8")) // 1024))
print("Ábrelo con doble clic. Funciona sin servidor y sin internet.")
