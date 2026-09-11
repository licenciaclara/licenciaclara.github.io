# Multas vehiculares por placa · Guía para el equipo

Este documento explica qué hace la consulta por placa, cómo tocarla y cómo
probarla. Está escrito para principiantes.

> **Cambio importante en la versión 1.1.** La consulta por placa ya **no muestra
> bloqueos de licencia**. Ahora muestra **multas vehiculares** de ejemplo, con
> monto base y artículo del Reglamento de Tránsito. Los bloqueos de licencia
> solo se ven después de ingresar con identidad digital, en `mi-licencia.html`.

---

## 0. Decisiones que conviene conocer

### 0.1 No hay Supabase ni React en este proyecto

Es HTML, CSS y JavaScript normales, sin framework y sin backend, con los datos
en `js/datos.js`. La sección 6 deja preparada la migración a Supabase para
cuando la quieran.

### 0.2 Una multa no es un bloqueo

| | Multa vehicular | Bloqueo de licencia |
|---|---|---|
| Pertenece a | Una **placa** | Una **persona** |
| Se consulta | Sin ingresar, por placa | Ingresando con identidad digital |
| Tiene monto | Sí (monto base del Reglamento) o *pendiente de verificación* | No. Puede mencionar una multa relacionada |
| Dónde vive en `datos.js` | `multas` + `infracciones` | `bloqueos` |

Un bloqueo puede enlazar una multa con `multa_id`. **Ninguna multa crea un
bloqueo**, y consultar una placa **no dice nada** sobre la licencia de nadie.

### 0.3 La placa no identifica a nadie

Las filas de `multas` no tienen `ciudadano_id`, nombre ni DPI. La pantalla no
dice "esta placa es tuya" aunque haya una sesión abierta, y no enlaza a
`caso.html`. Así se evita mostrar información personal de la persona titular.

### 0.4 La lista tenía 11 portales, pero son 10

Los números 2 y 11 de la lista original eran el mismo portal (EMETRA). La demo
dice **10 portales**.

---

## 1. Qué hace la pantalla

**`consulta-placa.html`**, accesible desde el inicio con el botón
**Consultar multas**, sin necesidad de identificarse.

Recorrido: elegir tipo y escribir número de placa → animación que "revisa" los
10 portales (unos 3 segundos; más corta si la persona pidió menos movimiento) →
resultados:

1. **Total pendiente en esta demostración**: suma **solo** multas pendientes con
   monto conocido, sin repetir ninguna. Si hay multas sin monto confirmado, lo
   dice y no las cuenta como Q 0.00. Las pagadas no se suman.
2. Multas agrupadas por municipalidad, cada una con: **estado de pago simulado**,
   **infracción**, **monto base** (`Q 200.00`), **artículo y numeral**,
   **municipalidad**, fecha y referencia.

### Nada sale a internet

El código **no usa `fetch`, ni `XMLHttpRequest`, ni iframes, ni `postMessage`,
ni balizas**. Las pruebas en navegador comprueban que no haya peticiones externas.

---

## 2. Archivos relacionados

| Archivo | Qué hay |
|---|---|
| `consulta-placa.html` | Formulario, animación y resultados de multas |
| `js/datos.js` | `infracciones` (catálogo con montos y base legal), `multas` (ejemplos por placa), `portales`, `tipos_placa`, `base_legal`, `aclaraciones_legales` |
| `js/app.js` | `Datos.consultarPlaca()`, `Datos.totalPendiente()`, `Datos.multaPorId()`, `Ui.quetzales()`, `Ui.baseLegal()`, `Ui.chipPago()`, `Ui.tarjetaMulta()` |
| `orientacion.html` | Tabla de montos de referencia, correcciones y fuentes |
| `csv/9-portales.csv`, `csv/10-infracciones.csv`, `csv/11-multas-demo.csv` | Generados con `generar-csv.py` |

---

## 3. Cómo cambiar los datos (sin saber programar)

Todo está en **`js/datos.js`**.

### Agregar una multa de ejemplo

Busca `multas:` y agrega un bloque:

```javascript
{ id: "MUL-GUA-2026-0500", referencia: "REM-DEMO-12345",
  placa: "555ZZZ", tipo_placa: "P",
  municipalidad_id: "MUNI-GUA", portal_id: "POR-02",
  infraccion_id: "INF-181-34", fecha: "01/09/2026", estado_pago: "pendiente" },
```

Reglas que las pruebas verifican:

- `infraccion_id` debe existir en `infracciones`. **El monto sale de ahí**: no se
  escribe en la multa.
- `portal_id` debe pertenecer a la **misma municipalidad** de la multa.
- `tipo_placa` debe estar en `tipos_placa`.
- `estado_pago` solo acepta `"pendiente"` o `"pagada"`.
- **No agregues** nombre, DPI ni `ciudadano_id`.

### Agregar o corregir una infracción

Busca `infracciones:`. Cada una tiene `monto` (número en quetzales, **o `null`
si no se conoce; nunca 0**), `articulo`, `numeral`, `verificacion`
(`"verificado"`, `"numeral_pendiente"` o `"pendiente"`) y `fuente_id`.
Antes de cambiar un monto, verifica el dato en una fuente oficial y registra la
fuente en `fuentes` con su fecha de consulta.

### Agregar un portal

Busca `portales:` y copia un bloque completo, cambiando el `id`.
`estado_revision` acepta `responde`, `sin_https` o `no_verificado`.

### Después de editar

```
python3 construir-una-pagina.py    # regenera una-pagina.html
python3 generar-csv.py             # regenera los CSV
```

---

## 4. Cómo probarlo

Abre `index.html` → **Consultar multas**. Los botones de prueba están en la pantalla.

| Placa | Qué debe pasar |
|---|---|
| **P-123ABC** | 3 multas: 2 pendientes (Guatemala, semáforo, art. 181 num. 14, Q 200.00; Mixco, cinturón, art. 181 num. 34, Q 200.00) y 1 pagada (teléfono, art. 180, Q 100.00, numeral pendiente). **Total: Q 400.00** |
| **P-456DEF** | 2 pendientes en Villa Nueva: arcén (Q 100.00) y una sin monto confirmado. **Total: Q 100.00** y aviso de que una no se suma |
| **M-2244BC** | 1 multa en Mixco: casco y chaleco, art. 184 num. 10, **Q 500.00** |
| **P-9090XY** | 2 multas pagadas. "Multas pendientes de pago: Ninguna" |
| **P-789GHI** | "No encontramos multas" |
| **P-2244BC** | Tipo equivocado a propósito: "Revisa el tipo de placa" con botón para reintentar como M |

También vale la pena mostrar:

- `p-123 abc` encuentra lo mismo que `123ABC`.
- Con la sesión de Sofía abierta, la consulta de `P-123ABC` se ve **igual** que sin sesión: no aparece su nombre.
- En `mi-licencia.html` (Sofía) → bloqueo `BLQ-GUA-2026-0311` → aparece la **multa relacionada** `REM-DEMO-88421` con su monto y el aviso de que pagarla no levanta el bloqueo.

---

## 5. Cómo publicar la actualización

1. Sube los archivos cambiados al repositorio.
2. GitHub Pages se actualiza solo en 1–2 minutos.
3. Si usas `una-pagina.html`, **regenéralo antes de subirlo**.

---

## 6. Migrar a Supabase (opcional, para después)

### 6.1 Tablas

Crea en **Table Editor** estas tablas (columnas `text`, salvo donde se indica):

- `portales`: `id`, `nombre`, `lugar`, `url`, `municipalidad_id`, `estado_revision`, `nota`
- `infracciones`: `id`, `conducta`, `texto_legal`, `articulo`, `numeral`,
  `monto` (**numeric, admite nulo**), `verificacion`, `nota_verificacion`, `nota`,
  `correccion`, `fuente_id`, `solo_demo`
- `multas_demo`: `id`, `referencia`, `placa`, `tipo_placa`, `municipalidad_id`,
  `portal_id`, `infraccion_id`, `fecha`, `estado_pago`

### 6.2 Importar

**Insert → Import data from CSV** con `csv/9-portales.csv`,
`csv/10-infracciones.csv` y `csv/11-multas-demo.csv`, después de los ocho
anteriores. En `10-infracciones.csv` un monto vacío significa **desconocido**:
impórtalo como nulo, no como 0.

### 6.3 Permisos

- Activa RLS con política de solo **lectura pública** (`SELECT`) para
  `portales`, `infracciones` y `multas_demo`: no contienen datos personales.
- **Los bloqueos y las licencias no deben tener lectura pública.** Sin
  autenticación real no hay forma segura de protegerlos por persona; manténganlos
  como datos locales ficticios.
- La `anon key` puede ir en el frontend. **La `service_role` nunca.**

### 6.4 Conservar el respaldo local

`js/datos.js` debe seguir existiendo como respaldo para presentar si la conexión falla.

---

## 7. Lista de verificación de la demo

- [ ] Entrar a "Consultar multas" sin identificarse
- [ ] Elegir tipo, escribir la placa y ver la animación de los portales
- [ ] Ver el total pendiente y cada multa con infracción, municipalidad, monto base, artículo y estado de pago
- [ ] Escribir `P-456DEF` y ver el aviso de monto sin confirmar
- [ ] Escribir `P-789GHI` y ver "No encontramos multas"
- [ ] Confirmar que no aparece ningún nombre, DPI ni bloqueo
- [ ] Aviso "DEMO" visible en la consulta y en los resultados

---

## 8. Guion de presentación (90 segundos)

| # | Qué hacer | Qué decir |
|---|---|---|
| 1 | Abrir el inicio | "Dos consultas distintas: las multas de un vehículo, por placa, y el estado de tu licencia, con tu identidad digital." |
| 2 | **Consultar multas** | "Hoy, para saber si un vehículo tiene multas, hay que visitar diez portales municipales, uno por uno." |
| 3 | Tocar `P-123ABC` → **Consultar multas** | "Aquí escribes la placa una sola vez." |
| 4 | Dejar correr la animación | "Y los revisa todos." |
| 5 | Señalar el total y una multa | "Cada multa dice qué infracción es, en qué municipalidad, el monto base y el artículo del Reglamento de Tránsito. El total solo suma lo pendiente." |
| 6 | Señalar que no hay nombre | "La placa no identifica a nadie. Para ver una licencia hay que ingresar." |
| 7 | Señalar el aviso DEMO | "Los portales reales no permiten consultas automatizadas. Esto muestra cómo funcionaría **si las instituciones expusieran APIs públicas**." |

El paso 7 es el más importante delante de un jurado. **Díganlo ustedes antes de
que lo pregunten.**
