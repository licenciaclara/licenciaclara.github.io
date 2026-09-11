/* ==========================================================================
   LICENCIA CLARA · Lógica compartida
   --------------------------------------------------------------------------
   Aquí vive todo lo que las pantallas necesitan:
     Sesion  → entrar, saber quién está dentro, salir
     Datos   → leer ciudadanos y bloqueos de licencia, multas vehiculares por
               placa, guardar actualizaciones, reiniciar
     Ui      → dibujar chips de estado, formatear textos, escapar HTML

   Los cambios del panel usan localStorage: se guardan EN ESTE NAVEGADOR Y EN
   ESTE DISPOSITIVO. No es una base compartida entre computadoras.
   La sesión usa sessionStorage: dura solo mientras la pestaña esté abierta.
   ========================================================================== */

(function (global) {
  "use strict";

  /* La sesión se guarda en sessionStorage: dura mientras la pestaña siga
     abierta (se conserva al cambiar de pantalla y al recargar), y desaparece
     al cerrarla. Así una visita nueva SIEMPRE empieza en la portada pública.
     La llave es nueva a propósito: la sesión antigua vivía en localStorage
     con "licencia-clara:sesion" y volvía a aparecer en cada visita. */
  var LLAVE_SESION         = "licencia-clara:sesion-pestana";
  var LLAVE_SESION_ANTIGUA = "licencia-clara:sesion";          /* localStorage, v1.0 */
  var LLAVE_CAMBIOS = "licencia-clara:cambios";
  /* v1.0 guardaba aquí qué bloqueos quedaban visibles tras consultar una
     placa. Ya no se usa (una placa no da acceso a bloqueos de licencia);
     solo se borra al reiniciar la demo. */
  var LLAVE_PLACA   = "licencia-clara:consulta-placa";

  /* ================================================== Almacenamiento === */
  /* Envolvemos localStorage en try/catch: en algunos navegadores (modo
     privado, cookies bloqueadas) lanza error y no queremos romper la web. */

  var Guardado = {
    leer: function (llave) {
      try {
        var crudo = global.localStorage.getItem(llave);
        return crudo ? JSON.parse(crudo) : null;
      } catch (e) { return null; }
    },
    escribir: function (llave, valor) {
      try {
        global.localStorage.setItem(llave, JSON.stringify(valor));
        return true;
      } catch (e) { return false; }
    },
    borrar: function (llave) {
      try { global.localStorage.removeItem(llave); } catch (e) { /* nada */ }
    },
    disponible: function () {
      try {
        global.localStorage.setItem("__prueba__", "1");
        global.localStorage.removeItem("__prueba__");
        return true;
      } catch (e) { return false; }
    }
  };

  /* Almacén de la pestaña (sessionStorage). Si el navegador lo bloquea,
     usamos una variable en memoria: la sesión dura hasta cambiar de página
     en la versión de varios archivos, y toda la visita en una-pagina.html. */
  var memoriaPestana = {};
  var Pestana = {
    leer: function (llave) {
      try {
        var crudo = global.sessionStorage.getItem(llave);
        return crudo ? JSON.parse(crudo) : null;
      } catch (e) {
        return memoriaPestana[llave] || null;
      }
    },
    escribir: function (llave, valor) {
      try {
        global.sessionStorage.setItem(llave, JSON.stringify(valor));
      } catch (e) {
        memoriaPestana[llave] = valor;
      }
    },
    borrar: function (llave) {
      delete memoriaPestana[llave];
      try { global.sessionStorage.removeItem(llave); } catch (e) { /* nada */ }
    }
  };

  /* Migración única: la sesión antigua de localStorage NO se restaura.
     Se elimina solo esa llave; los cambios del panel y demás datos quedan. */
  Guardado.borrar(LLAVE_SESION_ANTIGUA);

  /* ========================================================= Estados === */

  var ESTADOS = {
    gestion_ciudadano: {
      clave: "gestion_ciudadano",
      etiqueta: "Debes realizar una gestión",
      etiquetaCorta: "Debes gestionar",
      icono: "▲",
      color: "accion",
      responsablePorDefecto: "Ciudadano"
    },
    en_juzgado: {
      clave: "en_juzgado",
      etiqueta: "En trámite en el juzgado",
      etiquetaCorta: "En el juzgado",
      icono: "⏳",
      color: "juzgado",
      responsablePorDefecto: "Juzgado municipal"
    },
    en_transito: {
      clave: "en_transito",
      etiqueta: "Pendiente en Tránsito",
      etiquetaCorta: "En Tránsito",
      icono: "◷",
      color: "transito",
      responsablePorDefecto: "Departamento de Tránsito"
    },
    levantado: {
      clave: "levantado",
      etiqueta: "Bloqueo levantado",
      etiquetaCorta: "Levantado",
      icono: "✓",
      color: "listo",
      responsablePorDefecto: "Nadie"
    }
  };

  /* Los subestados solo aplican a "Pendiente en Tránsito".
     Existen porque la etiqueta sola esconde si al ciudadano todavía le toca
     presentar la solicitud. */
  var SUBESTADOS = {
    orden_sin_presentar: {
      clave: "orden_sin_presentar",
      etiqueta: "Orden obtenida, falta presentar la solicitud",
      responsable: "Ciudadano",
      icono: "▲",
      color: "accion",
      guia: "GUIA-TRANSITO-PRESENTAR"
    },
    solicitud_presentada: {
      clave: "solicitud_presentada",
      etiqueta: "Solicitud presentada, en revisión",
      responsable: "Departamento de Tránsito",
      icono: "◷",
      color: "transito",
      guia: "GUIA-TRANSITO-ESPERA"
    },
    con_observacion: {
      clave: "con_observacion",
      etiqueta: "Con observación: falta corregir",
      responsable: "Ciudadano",
      icono: "⚠",
      color: "alerta",
      guia: "GUIA-TRANSITO-ESPERA"
    }
  };

  /* ========================================================== Sesión === */

  var Sesion = {
    /* Devuelve el ciudadano si las credenciales DEMO coinciden, o null.
       Es la ÚNICA forma de abrir una sesión: una acción explícita en la
       pantalla de identidad. Consultar una placa nunca abre sesión. */
    entrar: function (usuario, clave) {
      var u = String(usuario || "").trim().toLowerCase();
      var c = String(clave || "");
      var encontrado = null;

      global.DATOS.ciudadanos.forEach(function (ciu) {
        if (ciu.usuario_demo.toLowerCase() === u && ciu.clave_demo === c) {
          encontrado = ciu;
        }
      });

      if (encontrado) {
        Pestana.escribir(LLAVE_SESION, {
          ciudadano_id: encontrado.id,
          entrada: new Date().toISOString()
        });
      }
      return encontrado;
    },

    /* Ciudadano de la sesión simulada, o null. */
    actual: function () {
      var s = Pestana.leer(LLAVE_SESION);
      if (!s || !s.ciudadano_id) return null;
      return Datos.ciudadanoPorId(s.ciudadano_id);
    },

    salir: function () {
      Pestana.borrar(LLAVE_SESION);
      Guardado.borrar(LLAVE_SESION_ANTIGUA);
    },

    /* Envía a la pantalla de identidad si no hay sesión. */
    exigir: function () {
      var ciu = Sesion.actual();
      if (!ciu) {
        Ui.navegar("identidad.html?motivo=sesion");
        return null;
      }
      return ciu;
    }
  };

  /* =========================================================== Datos === */

  var Datos = {

    /* --- Búsquedas simples ------------------------------------------- */

    ciudadanoPorId: function (id) {
      return buscar(global.DATOS.ciudadanos, id);
    },
    licenciaDe: function (ciudadanoId) {
      var r = null;
      global.DATOS.licencias.forEach(function (l) {
        if (l.ciudadano_id === ciudadanoId) r = l;
      });
      return r;
    },
    municipalidadPorId: function (id) {
      return buscar(global.DATOS.municipalidades, id);
    },
    juzgadoPorId: function (id) {
      return buscar(global.DATOS.juzgados, id);
    },
    guiaPorId: function (id) {
      return buscar(global.DATOS.guias, id);
    },
    fuentePorId: function (id) {
      return buscar(global.DATOS.fuentes, id);
    },

    /* --- Cambios guardados ------------------------------------------- */

    cambios: function () {
      var c = Guardado.leer(LLAVE_CAMBIOS);
      if (!c || typeof c !== "object") c = {};
      if (!c.bloqueos)  c.bloqueos = {};
      if (!c.historial) c.historial = [];
      return c;
    },

    /* Bloqueo con los cambios del panel institucional ya aplicados. */
    bloqueoPorId: function (id) {
      var base = buscar(global.DATOS.bloqueos, id);
      if (!base) return null;
      var cambio = Datos.cambios().bloqueos[id];
      var b = copiar(base);
      if (cambio) {
        for (var k in cambio) {
          if (Object.prototype.hasOwnProperty.call(cambio, k)) b[k] = cambio[k];
        }
      }
      return b;
    },

    /* Todos los bloqueos de un ciudadano, ya con los cambios aplicados. */
    bloqueosDe: function (ciudadanoId) {
      var lista = [];
      global.DATOS.bloqueos.forEach(function (b) {
        if (b.ciudadano_id === ciudadanoId) {
          lista.push(Datos.bloqueoPorId(b.id));
        }
      });
      return lista;
    },

    /* Historial de un bloqueo: eventos de la semilla + eventos guardados,
       ordenados del más reciente al más antiguo. */
    historialDe: function (bloqueoId) {
      var lista = [];
      global.DATOS.historial.forEach(function (h) {
        if (h.bloqueo_id === bloqueoId) lista.push(copiar(h));
      });
      Datos.cambios().historial.forEach(function (h) {
        if (h.bloqueo_id === bloqueoId) lista.push(copiar(h));
      });
      lista.sort(function (a, b) {
        return aFecha(b.fecha) - aFecha(a.fecha);
      });
      return lista;
    },

    /* --- Vista completa para "Mi licencia" ---------------------------- */
    /* Los contadores SIEMPRE se calculan aquí, contando registros.
       No existe ningún contador guardado que pueda quedar desactualizado. */

    resumenDe: function (ciudadanoId) {
      var ciudadano = Datos.ciudadanoPorId(ciudadanoId);
      var licencia  = Datos.licenciaDe(ciudadanoId);
      var bloqueos  = Datos.bloqueosDe(ciudadanoId);

      var activos    = bloqueos.filter(function (b) { return b.estado !== "levantado"; });
      var resueltos  = bloqueos.filter(function (b) { return b.estado === "levantado"; });
      var requierenAccion = activos.filter(function (b) {
        return Datos.responsableDe(b) === "Ciudadano";
      });

      /* Agrupación por municipalidad, solo con lo que realmente existe. */
      var grupos = [];
      var indice = {};
      bloqueos.forEach(function (b) {
        if (!indice[b.municipalidad_id]) {
          indice[b.municipalidad_id] = {
            municipalidad: Datos.municipalidadPorId(b.municipalidad_id),
            activos: [], resueltos: []
          };
          grupos.push(indice[b.municipalidad_id]);
        }
        if (b.estado === "levantado") indice[b.municipalidad_id].resueltos.push(b);
        else                          indice[b.municipalidad_id].activos.push(b);
      });

      /* Primero las municipalidades donde el ciudadano tiene que actuar,
         después las que están en espera, al final las que ya no tienen nada.
         No inventamos urgencia legal ni ordenamos por cantidad de multas. */
      grupos.forEach(function (g) {
        g.requierenAccion = g.activos.filter(function (b) {
          return Datos.responsableDe(b) === "Ciudadano";
        }).length;
      });
      grupos.sort(function (a, b) {
        if (a.requierenAccion !== b.requierenAccion) return b.requierenAccion - a.requierenAccion;
        if (a.activos.length !== b.activos.length)   return b.activos.length - a.activos.length;
        return a.municipalidad.nombre.localeCompare(b.municipalidad.nombre, "es");
      });

      return {
        ciudadano: ciudadano,
        licencia: licencia,
        bloqueos: bloqueos,
        activos: activos,
        resueltos: resueltos,
        requierenAccion: requierenAccion,
        grupos: grupos,
        ultimaActualizacion: Datos.ultimaActualizacionDe(bloqueos)
      };
    },

    ultimaActualizacionDe: function (bloqueos) {
      var max = null;
      bloqueos.forEach(function (b) {
        var f = aFecha(b.ultima_actualizacion);
        if (f && (!max || f > max.valor)) max = { valor: f, texto: b.ultima_actualizacion };
      });
      return max ? max.texto : "";
    },

    /* --- Estado y responsable ----------------------------------------- */

    /* El responsable real: si hay subestado, manda el subestado. */
    responsableDe: function (bloqueo) {
      var sub = SUBESTADOS[bloqueo.subestado];
      if (bloqueo.estado === "en_transito" && sub) return sub.responsable;
      return bloqueo.responsable || ESTADOS[bloqueo.estado].responsablePorDefecto;
    },

    /* --- Escritura (panel institucional) ------------------------------ */

    /* Guardar cambia el estado, actualiza la fecha y AÑADE un evento al
       historial. Las tres cosas siempre juntas: nunca cambia un estado sin
       dejar rastro, y nunca borra lo que ya estaba. */
    actualizarBloqueo: function (codigo, cambio) {
      var base = Datos.bloqueoPorId(codigo);
      if (!base) return { ok: false, error: "No encontramos ese caso." };

      var estado    = cambio.estado || base.estado;
      var subestado = (estado === "en_transito") ? (cambio.subestado || "") : "";
      var sub       = SUBESTADOS[subestado];

      var responsable = sub ? sub.responsable
                            : (cambio.responsable || ESTADOS[estado].responsablePorDefecto);

      var guia = base.guia_id;
      if (estado === "gestion_ciudadano") guia = "GUIA-GESTION";
      else if (estado === "en_juzgado")   guia = "GUIA-JUZGADO-ESPERA";
      else if (estado === "levantado")    guia = "GUIA-LEVANTADO";
      else if (estado === "en_transito")  guia = sub ? sub.guia : "GUIA-TRANSITO-PRESENTAR";

      var hoy = cambio.fecha || fechaDeHoy();

      var almacen = Datos.cambios();
      almacen.bloqueos[codigo] = {
        estado: estado,
        subestado: subestado,
        responsable: responsable,
        proxima_accion: cambio.proxima_accion || base.proxima_accion,
        detalle: cambio.nota || base.detalle,
        ultima_actualizacion: hoy,
        guia_id: guia
      };
      almacen.historial.push({
        id: "H-USR-" + Date.now(),
        bloqueo_id: codigo,
        fecha: hoy,
        titulo: cambio.titulo || ("Actualización: " + ESTADOS[estado].etiqueta),
        detalle: cambio.nota || "",
        fuente: cambio.fuente || "Juzgado DEMO",
        estado_resultante: estado
      });

      var ok = Guardado.escribir(LLAVE_CAMBIOS, almacen);
      if (!ok) {
        return { ok: false, error: "Tu navegador no permitió guardar. Prueba fuera del modo privado." };
      }
      return { ok: true, bloqueo: Datos.bloqueoPorId(codigo) };
    },

    /* --- Multas vehiculares por placa (simuladas) --------------------- */
    /* Una multa vehicular pertenece a una PLACA. No es un bloqueo de
       licencia y no dice nada de la persona titular. Esta sección nunca lee
       la sesión ni devuelve nombres, DPI ni bloqueos. */

    portales: function () {
      return global.DATOS.portales.slice();
    },
    portalPorId: function (id) {
      return buscar(global.DATOS.portales, id);
    },
    tiposDePlaca: function () {
      return global.DATOS.tipos_placa.slice();
    },
    infraccionPorId: function (id) {
      return buscar(global.DATOS.infracciones, id);
    },
    fuentesDeMontos: function () {
      return global.DATOS.infracciones.filter(function (i) { return !i.solo_demo; });
    },

    /* Deja la placa como la piden los portales: mayúsculas y sin espacios
       ni guiones. Así "p-123 abc" y "P123ABC" encuentran lo mismo. */
    normalizarPlaca: function (texto) {
      return String(texto || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    },

    /* Multa lista para mostrar: con su infracción, municipalidad y portal.
       "monto" es el monto base del Reglamento, o null si no se conoce. */
    multaPorId: function (id) {
      var m = buscar(global.DATOS.multas, id);
      return m ? Datos.completarMulta(m) : null;
    },
    completarMulta: function (m) {
      var inf = Datos.infraccionPorId(m.infraccion_id) || null;
      var monto = (inf && typeof inf.monto === "number" && isFinite(inf.monto)) ? inf.monto : null;
      return {
        multa: copiar(m),
        infraccion: inf,
        monto: monto,
        municipalidad: Datos.municipalidadPorId(m.municipalidad_id),
        portal: Datos.portalPorId(m.portal_id)
      };
    },

    /* Total pendiente: suma SOLO multas pendientes, con monto conocido y
       sin repetir la misma multa. Un monto desconocido no vale Q 0: se
       cuenta aparte para avisarlo. */
    totalPendiente: function (lista) {
      var vistos = {}, total = 0, conMonto = 0, sinMonto = 0;
      lista.forEach(function (e) {
        var id = e.multa.id;
        if (vistos[id]) return;
        vistos[id] = true;
        if (e.multa.estado_pago !== "pendiente") return;
        if (e.monto === null) { sinMonto++; return; }
        total += e.monto; conMonto++;
      });
      return { total: total, conMonto: conMonto, sinMonto: sinMonto };
    },

    /* Busca las multas de ejemplo de una placa.
       IMPORTANTE: esto NO consulta ningún portal real. Los portales de
       terceros no permiten consultas automatizadas; ver el aviso en la
       pantalla de consulta. */
    consultarPlaca: function (placa, tipo) {
      var limpia = Datos.normalizarPlaca(placa);
      /* Si la persona escribió el tipo dentro de la placa ("P123ABC"),
         lo quitamos para que igual encuentre el registro. */
      if (tipo && limpia.indexOf(tipo) === 0) {
        var resto = limpia.substring(tipo.length);
        if (buscarMultasPlaca(resto, tipo).length > 0) limpia = resto;
      }

      /* Sin duplicados: la misma multa solo aparece una vez. */
      var vistos = {};
      var encontrados = [];
      buscarMultasPlaca(limpia, tipo).forEach(function (m) {
        if (vistos[m.id]) return;
        vistos[m.id] = true;
        encontrados.push(Datos.completarMulta(m));
      });

      /* Pendientes primero y, dentro de cada grupo, la más reciente primero. */
      encontrados.sort(function (a, b) {
        var pa = a.multa.estado_pago === "pendiente" ? 0 : 1;
        var pb = b.multa.estado_pago === "pendiente" ? 0 : 1;
        if (pa !== pb) return pa - pb;
        return (aFecha(b.multa.fecha) || 0) - (aFecha(a.multa.fecha) || 0);
      });

      /* Agrupamos por municipalidad: primero las que tienen pendientes. */
      var grupos = [], indice = {};
      encontrados.forEach(function (e) {
        var id = e.multa.municipalidad_id;
        if (!indice[id]) {
          indice[id] = { municipalidad: e.municipalidad, multas: [], portales: [] };
          grupos.push(indice[id]);
        }
        indice[id].multas.push(e);
        if (e.portal && indice[id].portales.indexOf(e.portal) === -1) {
          indice[id].portales.push(e.portal);
        }
      });
      grupos.forEach(function (g) {
        g.pendientes = g.multas.filter(function (e) { return e.multa.estado_pago === "pendiente"; }).length;
      });
      grupos.sort(function (a, b) {
        if (a.pendientes !== b.pendientes) return b.pendientes - a.pendientes;
        return a.municipalidad.nombre.localeCompare(b.municipalidad.nombre, "es");
      });

      /* Si con este tipo no hay nada pero la misma placa existe con otro
         tipo, lo decimos. Elegir mal el tipo es un tropiezo muy común y
         hace creer a la persona que no tiene nada pendiente. */
      var sugerencias = [];
      if (encontrados.length === 0) {
        global.DATOS.multas.forEach(function (m) {
          if (Datos.normalizarPlaca(m.placa) === limpia &&
              m.tipo_placa !== tipo &&
              sugerencias.indexOf(m.tipo_placa) === -1) {
            sugerencias.push(m.tipo_placa);
          }
        });
      }

      var pendientes = encontrados.filter(function (e) { return e.multa.estado_pago === "pendiente"; });
      var pagadas    = encontrados.filter(function (e) { return e.multa.estado_pago === "pagada"; });

      return {
        placa: limpia,
        tipo: tipo,
        encontrados: encontrados,
        grupos: grupos,
        pendientes: pendientes.length,
        pagadas: pagadas.length,
        total: Datos.totalPendiente(encontrados),
        sugerencias: sugerencias
      };
    },

    /* Borra lo guardado por la demo y vuelve a la semilla original. */
    reiniciar: function () {
      Guardado.borrar(LLAVE_CAMBIOS);
      Guardado.borrar(LLAVE_PLACA);
      Sesion.salir();
    },

    hayCambiosGuardados: function () {
      var c = Datos.cambios();
      return Object.keys(c.bloqueos).length > 0 || c.historial.length > 0;
    },

    almacenamientoDisponible: function () {
      return Guardado.disponible();
    }
  };

  /* ============================================================== Ui === */

  var Ui = {

    /* Escapa texto antes de meterlo en HTML. */
    esc: function (texto) {
      return String(texto === undefined || texto === null ? "" : texto)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    },

    estado: function (clave) {
      return ESTADOS[clave] || ESTADOS.gestion_ciudadano;
    },
    subestado: function (clave) {
      return SUBESTADOS[clave] || null;
    },
    listaEstados: function () {
      return [ESTADOS.gestion_ciudadano, ESTADOS.en_juzgado, ESTADOS.en_transito, ESTADOS.levantado];
    },
    listaSubestados: function () {
      return [SUBESTADOS.orden_sin_presentar, SUBESTADOS.solicitud_presentada, SUBESTADOS.con_observacion];
    },

    /* Chip con icono + texto + color. Nunca solo color. */
    chipEstado: function (bloqueo, opciones) {
      opciones = opciones || {};
      var est = Ui.estado(bloqueo.estado);
      var sub = (bloqueo.estado === "en_transito") ? SUBESTADOS[bloqueo.subestado] : null;
      var color = sub && opciones.usarColorSubestado ? sub.color : est.color;
      var icono = sub && opciones.usarColorSubestado ? sub.icono : est.icono;
      var texto = opciones.corto ? est.etiquetaCorta : est.etiqueta;
      return '<span class="chip chip--' + color + '">' +
               '<span class="chip-icono" aria-hidden="true">' + icono + '</span>' +
               Ui.esc(texto) +
             '</span>';
    },

    /* Texto completo del estado, con subestado si lo hay. */
    textoEstado: function (bloqueo) {
      var est = Ui.estado(bloqueo.estado);
      var sub = (bloqueo.estado === "en_transito") ? SUBESTADOS[bloqueo.subestado] : null;
      return sub ? est.etiqueta + " · " + sub.etiqueta : est.etiqueta;
    },

    /* Clase del bloque grande "qué tienes que hacer ahora". */
    claseAccion: function (bloqueo) {
      var responsable = Datos.responsableDe(bloqueo);
      if (bloqueo.estado === "levantado") return "accion-ahora--listo";
      if (responsable === "Ciudadano")    return "";       /* ámbar = te toca */
      if (bloqueo.estado === "en_juzgado") return "accion-ahora--espera";
      return "accion-ahora--transito";
    },

    /* Color estable por municipalidad: la misma siempre sale del mismo color,
       para que el ojo la reconozca entre pantallas. Es identidad, no estado. */
    colorMuni: function (municipalidadId) {
      var lista = global.DATOS.municipalidades.map(function (m) { return m.id; });
      var i = lista.indexOf(municipalidadId);
      if (i === -1) i = 0;
      return "var(--muni-" + ((i % 6) + 1) + ")";
    },

    /* Iniciales de una municipalidad: "Municipalidad de Villa Nueva" -> "VN" */
    inicialesMuni: function (nombre) {
      var palabras = String(nombre || "").replace(/Municipalidad de /i, "").split(/\s+/);
      var letras = palabras.filter(function (p) { return p.length > 2; })
                           .map(function (p) { return p.charAt(0).toUpperCase(); });
      return letras.slice(0, 2).join("") || "M";
    },

    /* Formato de quetzales: 1000 -> "Q 1,000.00". null -> null (no es 0). */
    quetzales: function (monto) {
      if (typeof monto !== "number" || !isFinite(monto)) return null;
      var partes = monto.toFixed(2).split(".");
      partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return "Q " + partes[0] + "." + partes[1];
    },

    /* "Artículo 181, numeral 34" */
    baseLegal: function (inf) {
      if (!inf || !inf.articulo) return "";
      var num = inf.numeral || "";
      var texto = "Artículo " + inf.articulo;
      if (num) texto += /^literal/.test(num) ? ", " + num : ", numeral " + num;
      return texto;
    },

    /* Estado de pago simulado, con icono + texto + color. */
    chipPago: function (estado) {
      if (estado === "pagada") {
        return '<span class="chip chip--listo"><span class="chip-icono" aria-hidden="true">✓</span>Pagada (simulado)</span>';
      }
      if (estado === "pendiente") {
        return '<span class="chip chip--accion"><span class="chip-icono" aria-hidden="true">●</span>Pendiente de pago (simulado)</span>';
      }
      return '<span class="chip"><span class="chip-icono" aria-hidden="true">?</span>Estado de pago sin dato</span>';
    },

    /* Etiqueta de servicio: distingue las dos consultas en todas partes. */
    servicio: function (clave, claro) {
      var s = clave === "licencia"
        ? { icono: "ID", texto: "Estado de la licencia · con identidad digital" }
        : { icono: "P", texto: "Multas vehiculares · por placa" };
      return '<span class="servicio servicio--' + (clave === "licencia" ? "licencia" : "multas") +
               (claro ? " servicio--claro" : "") + '">' +
               '<span class="servicio-icono" aria-hidden="true">' + s.icono + '</span>' + s.texto +
             '</span>';
    },

    /* Tarjeta de una multa vehicular. Muestra solo datos del vehículo y de
       la infracción: nunca datos de una persona. */
    tarjetaMulta: function (e) {
      var m = e.multa, inf = e.infraccion;
      var monto = Ui.quetzales(e.monto);
      var base = Ui.baseLegal(inf);
      var numeralPendiente = inf && inf.verificacion === "numeral_pendiente";

      return '<article class="multa' + (m.estado_pago === "pagada" ? " multa--pagada" : "") + '">' +
          '<div class="multa-arriba">' +
            Ui.chipPago(m.estado_pago) +
            '<span class="multa-ref">' + Ui.esc(m.fecha) + ' · <span class="nowrap">' + Ui.esc(m.referencia) + '</span></span>' +
          '</div>' +
          '<p class="multa-rotulo">Infracción</p>' +
          '<p class="multa-infraccion">' + Ui.esc(inf ? inf.conducta : "Sin dato de la infracción") + '</p>' +
          '<dl class="datos datos--compactos">' +
            '<div><dt>Monto base según el Reglamento</dt><dd class="monto">' +
              (monto ? Ui.esc(monto) : '<span class="pendiente">Pendiente de verificación</span>') + '</dd></div>' +
            '<div><dt>Artículo y numeral</dt><dd>' +
              (base
                ? Ui.esc(base) + (numeralPendiente ? ' <span class="pendiente">(numeral pendiente de verificación)</span>' : '')
                : '<span class="pendiente">Pendiente de verificación</span>') + '</dd></div>' +
            '<div><dt>Municipalidad</dt><dd>' + Ui.esc(e.municipalidad ? e.municipalidad.nombre : "Sin dato") + '</dd></div>' +
          '</dl>' +
          (numeralPendiente && inf.nota_verificacion
            ? '<p class="nota-verificacion">' + Ui.esc(inf.nota_verificacion) + '</p>' : '') +
          (monto === null
            ? '<p class="nota-verificacion">No conocemos el monto de esta multa. Por eso no se suma al total: un monto desconocido no equivale a Q 0.00.</p>' : '') +
        '</article>';
    },

    /* Dibuja una placa con su tipo, como en los formularios reales. */
    placa: function (tipo, numero) {
      return '<span class="placa-muestra">' +
               '<span class="tipo">' + Ui.esc(tipo) + '</span>' +
               Ui.esc(numero) +
             '</span>';
    },

    /* Cambia de pantalla. La versión de un solo archivo lo reemplaza para
       usar direcciones con almohadilla (#). */
    navegar: function (destino) {
      global.location.href = destino;
    },

    /* Lee ?clave=valor de la dirección. */
    parametro: function (clave) {
      var busqueda = global.location.search.substring(1);
      var partes = busqueda.split("&");
      for (var i = 0; i < partes.length; i++) {
        var par = partes[i].split("=");
        if (decodeURIComponent(par[0]) === clave) {
          return decodeURIComponent((par[1] || "").replace(/\+/g, " "));
        }
      }
      return "";
    },

    /* Pinta la cabecera con el nombre del ciudadano y el botón de salir. */
    pintarBarraCiudadano: function (ciudadano) {
      var caja = document.getElementById("barra-derecha");
      if (!caja) return;
      if (!ciudadano) { caja.innerHTML = ""; return; }
      caja.innerHTML =
        '<span class="pequeno suave">' + Ui.esc(ciudadano.nombre.split(" ")[0]) + '</span>' +
        '<button type="button" class="boton-texto" id="salir">Cerrar sesión</button>';
      var boton = document.getElementById("salir");
      if (boton) {
        boton.addEventListener("click", function () {
          Sesion.salir();
          Ui.navegar("index.html");
        });
      }
    },

    /* Aviso permanente de demostración. */
    avisoDemo: function (texto) {
      return '<div class="aviso" role="note">' +
               '<span class="aviso-icono" aria-hidden="true">●</span>' +
               '<span>' + (texto || '<strong>Esto es una demostración.</strong> Los ciudadanos, licencias y casos son ficticios. No consultamos sistemas reales de Tránsito ni de los juzgados, no pagamos multas y no levantamos bloqueos.') + '</span>' +
             '</div>';
    }
  };

  /* ======================================================= Auxiliares === */

  function buscar(lista, id) {
    var r = null;
    lista.forEach(function (x) { if (x.id === id) r = x; });
    return r;
  }

  function buscarMultasPlaca(limpia, tipo) {
    if (!limpia) return [];
    return global.DATOS.multas.filter(function (m) {
      return Datos.normalizarPlaca(m.placa) === limpia &&
             (!tipo || m.tipo_placa === tipo);
    });
  }

  function copiar(objeto) {
    return JSON.parse(JSON.stringify(objeto));
  }

  /* Convierte "dd/mm/aaaa" en Date. Devuelve null si no se puede. */
  function aFecha(texto) {
    if (!texto) return null;
    var p = String(texto).split("/");
    if (p.length !== 3) return null;
    var d = new Date(Number(p[2]), Number(p[1]) - 1, Number(p[0]));
    return isNaN(d.getTime()) ? null : d;
  }

  function fechaDeHoy() {
    var d = new Date();
    var dd = String(d.getDate()).padStart(2, "0");
    var mm = String(d.getMonth() + 1).padStart(2, "0");
    return dd + "/" + mm + "/" + d.getFullYear();
  }

  /* ======================================================== Exportar === */

  global.Sesion = Sesion;
  global.Datos  = Datos;
  global.Ui     = Ui;
  global.ESTADOS_LC = ESTADOS;
  global.SUBESTADOS_LC = SUBESTADOS;

})(window);
