# Licencia Clara

Prototipo para el **Hackathon Nacional, Reto 03: Desbloqueo de licencia**.

Ofrece **dos consultas distintas**, con la misma importancia en la portada:

| Consulta | Cómo se entra | Qué muestra |
|---|---|---|
| **Multas vehiculares** | Por número de placa, **sin ingresar** | Multas de ejemplo del vehículo: infracción, municipalidad, monto base en quetzales, artículo y numeral, estado de pago simulado. Nunca datos de la persona titular. |
| **Estado de la licencia** | **Ingresando con identidad digital** (simulada) | La licencia de la persona y sus bloqueos: por qué existen, quién debe actuar y qué hacer. |

Una multa y un bloqueo son **registros distintos**: una placa no dice nada de la
licencia de nadie, y un bloqueo sin multa relacionada no suma dinero.

> **¿Buscas la consulta por placa?** Su guía completa está en
> [`CONSULTA-POR-PLACA.md`](CONSULTA-POR-PLACA.md): qué se construyó, cómo editar
> los portales y las placas, cómo probarlo y cómo migrarlo a Supabase.

> **Esto es una demostración.** Las placas, multas, ciudadanos, licencias y casos son ficticios.
> No consulta sistemas reales de Tránsito ni de los juzgados, no paga multas,
> no levanta bloqueos y no tiene respaldo de ninguna institución.

---

## 1. Cómo ejecutarlo (30 segundos, sin instalar nada)

**Doble clic en `index.html`.** Ya está.

No hace falta servidor, ni Node, ni internet. Los datos están en `js/datos.js`
como un archivo de JavaScript (no como JSON) precisamente para que esto
funcione al abrir el archivo directamente.

**Si prefieren un servidor local** (opcional, se ve idéntico):

```
cd licencia-clara
python3 -m http.server 8000
```

Luego abrir `http://localhost:8000` en el navegador.

---

## 2. Credenciales DEMO

Todas usan la misma contraseña: **`demo1234`**

| Ciudadano | Usuario | Qué muestra |
|---|---|---|
| Andrea Morales | `andrea.demo` | Sin bloqueos. Sirve para ver el estado vacío. |
| Diego Herrera | `diego.demo` | Un bloqueo en Mixco. Le toca a él. |
| **Sofía Castillo** | **`sofia.demo`** | **Caso principal de presentación.** Tres bloqueos, uno por municipalidad, cada uno en un estado distinto. |
| Luis Méndez | `luis.demo` | Dos bloqueos ya levantados, visibles en el historial. |

En la pantalla de identidad aparece una tabla con estos usuarios: **tocar uno
llena el formulario solo**. Úsenlo en la presentación, es más rápido.

---

## 3. Guion de presentación (60 segundos)

Antes de empezar: **reiniciar los datos** (pie de la pantalla de inicio, o el
botón del panel institucional). Así la demo siempre arranca igual.

| # | Qué hacer | Qué decir |
|---|---|---|
| 1 | Abrir `index.html` | "Licencia Clara separa dos cosas que la gente confunde: las multas de un vehículo y el estado de su licencia." |
| 2 | *Consultar mi licencia* → tocar `sofia.demo` → *Ingresar* | "El ciudadano no crea otra cuenta. Se identifica y regresa. Es una simulación de identidad digital." |
| 3 | Señalar los tres números y bajar por las tarjetas | "Sin escribir nada, ve sus bloqueos agrupados por municipalidad. Tres activos, **uno necesita su acción**. Primero aparece donde le toca a ella." |
| 4 | *Ver caso BLQ-GUA-2026-0311* | "Antes de mandarla a ningún lado, le explicamos el caso." |
| 5 | Señalar de arriba a abajo | "Qué tiene que hacer. **Quién debe actuar.** Por qué existe el bloqueo. Qué juzgado lo originó. La guía paso a paso con qué llevar. El contacto verificado. Y todo lo que ya se hizo, con fechas y con la fuente de cada evento." |

**Remate fuerte** (10 segundos, en la misma pantalla): señalar el aviso de la
multa y decir: *"Y algo que confunde a mucha gente: pagar la multa no levanta
el bloqueo. Aquí se lo decimos."*

### Extensión opcional (30 segundos más)

| # | Qué hacer |
|---|---|
| 1 | Abrir `panel.html` en otra pestaña |
| 2 | Seleccionar *Sofía Castillo* → *Abrir* en `BLQ-MIX-2026-0104` |
| 3 | Estado → **Pendiente en Tránsito**; detalle → **Orden obtenida, falta presentar la solicitud** |
| 4 | Escribir: *"El juzgado emitió el oficio de desbloqueo y ya puedes retirarlo."* → **Guardar** |
| 5 | Volver a la pestaña del ciudadano → **Actualizar** |
| 6 | "El caso cambió, el contador subió de 1 a 2 acciones pendientes, y el historial guardó el evento nuevo **sin borrar** lo anterior." |

Si quieren enseñar honestidad técnica, cambien el estado a **Bloqueo levantado**
en el panel: aparece un aviso que dice que en el mundo real solo el Departamento
de Tránsito puede hacerlo. Eso es un punto a favor, no en contra.

---

## 4. Reiniciar la demo

Tres formas, todas equivalentes:

- Pie de la pantalla de inicio → *Reiniciar los datos de la demostración*
- Panel institucional → *Reiniciar datos DEMO*
- Consola del navegador: `Datos.reiniciar()`

Borra los cambios guardados y cierra la sesión. Los datos vuelven a `js/datos.js`.

**La sesión ya no necesita reiniciarse entre demostraciones:** vive solo en la
pestaña (ver sección 8). Al abrir la demo en una pestaña nueva siempre aparece
la portada pública.

---

## 5. Publicar en internet (GitHub Pages, 5 minutos)

> **Guía completa para principiantes:** [`GUIA-PUBLICAR-PAGINA-WEB.md`](GUIA-PUBLICAR-PAGINA-WEB.md)
> (GitHub Pages, Netlify Drop, un solo archivo, cómo actualizar y qué revisar).

1. Crear un repositorio en GitHub, por ejemplo `licencia-clara`.
2. Subir **todo el contenido de esta carpeta** a la rama `main`
   (arrastrar los archivos en *Add file → Upload files* funciona perfectamente).
3. En el repositorio: **Settings → Pages**.
4. En *Source* elegir **Deploy from a branch**; en *Branch* elegir **main** y la carpeta **/ (root)**. Guardar.
5. Esperar 1–2 minutos. La dirección será:
   `https://SU-USUARIO.github.io/licencia-clara/`

**Importante:** el archivo `index.html` debe estar en la raíz del repositorio,
no dentro de otra carpeta.

### Alternativa de un solo archivo

`una-pagina.html` es la misma web empaquetada en un archivo. Sirve para subirla
a cualquier lado, mandarla por correo o abrirla desde una memoria USB en un
celular. Se regenera con:

```
python3 construir-una-pagina.py
```

**Regenérenlo cada vez que cambien algo**, o quedará desactualizado.

---

## 6. Qué archivo toca cada quien

Regla de oro: **nadie edita un archivo que no sea suyo.** Si necesitan un cambio
en un archivo ajeno, se pide por el chat del equipo.

| Persona | Archivos | Responsabilidad |
|---|---|---|
| **A · Diseño e ingreso** | `css/estilos.css`, `index.html`, `identidad.html`, `orientacion.html` | Colores, tipografía, pantallas de entrada |
| **B · Ciudadano** | `mi-licencia.html` | Tarjeta de licencia y agrupación por municipalidad |
| **C · Caso y lógica** | `js/app.js`, `caso.html` | Estados, contadores, detalle del caso |
| **D · Datos e institución** | `js/datos.js`, `csv/`, `panel.html`, `README.md` | Contenido de la demo y panel institucional |
| **Compartido** | `consulta-placa.html` | Consulta por placa. Ver `CONSULTA-POR-PLACA.md` |

### Para cambiar textos, nombres o casos

Casi todo vive en **`js/datos.js`**. No hace falta saber programar: se cambian
los textos entre comillas. Después, si usan la versión de un archivo, hay que
regenerarla.

### Para cambiar colores

Solo las variables del inicio de `css/estilos.css`, dentro de `:root`.

---

## 7. Cómo está hecho

```
licencia-clara/
├── index.html                  A · Bienvenida
├── identidad.html              B · Identidad Digital DEMO
├── mi-licencia.html            C+D · Mi licencia y municipalidades
├── caso.html                   E+F+G · Detalle, cómo resolverlo y contacto
├── consulta-placa.html         Multas vehiculares por placa (simulación de 10 portales)
├── orientacion.html            Orientación general, fuentes y limitaciones
├── panel.html                  H · Panel institucional DEMO
├── una-pagina.html             Todo lo anterior en un solo archivo (generado)
├── css/estilos.css             Único archivo de estilos
├── js/datos.js                 Datos DEMO (el archivo que se edita)
├── js/app.js                   Sesión, lectura y escritura, cálculos
├── csv/                        Los 11 CSV, en orden de carga (generados)
├── generar-csv.py              Regenera los CSV desde datos.js
└── construir-una-pagina.py     Regenera una-pagina.html
```

**Sin frameworks, sin build, sin dependencias, sin CDN.** HTML, CSS y
JavaScript normales. Ninguna página carga nada de internet, así que funciona
aunque en la sede no haya señal.

### Los cuatro estados

| Estado | Icono | Responsable |
|---|---|---|
| Debes realizar una gestión | ▲ | Ciudadano |
| En trámite en el juzgado | ⏳ | Juzgado municipal |
| Pendiente en Tránsito | ◷ | *depende del detalle, ver abajo* |
| Bloqueo levantado | ✓ | Nadie |

**"Pendiente en Tránsito" siempre lleva un detalle**, porque la etiqueta sola
esconde si al ciudadano todavía le toca presentar la solicitud:

| Detalle | Responsable |
|---|---|
| Orden obtenida, falta presentar la solicitud | **Ciudadano** |
| Solicitud presentada, en revisión | Departamento de Tránsito |
| Con observación: falta corregir | **Ciudadano** |

Cada estado se muestra con **icono + texto + color**, nunca solo con color.

### Reglas que están escritas en el código

- **Los contadores se cuentan**, nunca se guardan. No pueden quedar desfasados.
- **Ni el pago ni la orden del juzgado producen "Bloqueo levantado".** Ese
  estado solo aparece por una actualización institucional explícita.
- **Guardar en el panel hace tres cosas juntas**: cambia el estado, actualiza la
  fecha y agrega un evento al historial. Nunca borra lo anterior.
- **Si falta un dato de contacto**, se muestra *"Información pendiente de
  verificar"* y su botón queda desactivado, con la explicación de por qué.
- **El teléfono directo del juzgado y el conmutador de la municipalidad son
  campos distintos.** Confundirlos hace que alguien llame a donde no le pueden
  responder.

---

## 8. Persistencia: qué guarda y qué no

**La sesión simulada** se guarda en `sessionStorage` (llave
`licencia-clara:sesion-pestana`): se conserva al cambiar de pantalla y al
recargar, y desaparece al cerrar la pestaña. Solo se abre al pulsar *Ingresar*
en la pantalla de identidad, y *Cerrar sesión* la borra y regresa al inicio.

En la versión 1.0 la sesión vivía en `localStorage` (llave
`licencia-clara:sesion`) y reaparecía en cada visita. Ahora, al cargar
cualquier pantalla, **se borra únicamente esa llave antigua**, sin restaurarla.
Los cambios del panel (`licencia-clara:cambios`) y cualquier otro dato se conservan.

**Los cambios del panel institucional** se guardan con `localStorage`, es decir **en este navegador y en
este dispositivo**.

- ✅ Sirve para demostrar que la información fluye de la institución al ciudadano.
- ❌ **No** es una base compartida. Si abren la demo en otra computadora, no verá
  los cambios hechos aquí.

Esto está escrito dentro de la propia web, en el panel institucional. **Díganlo
ustedes en la presentación antes de que lo pregunte un juez**: se ve mejor.

### Si más adelante quieren Supabase

Los CSV de `csv/` están numerados en el orden exacto de importación, porque cada
uno depende de los anteriores. Advertencias importantes:

- La `anon key` puede ir en el frontend; **la `service_role` nunca**.
- Como **no habrá autenticación real**, el proyecto queda limitado a datos
  públicos ficticios de demostración. Elegir un perfil en el navegador **no**
  protege datos por usuario.
- Conservar siempre el modo local como respaldo para presentar si falla la conexión.

---

## 9. Diferencia con el alcance original del reto

El Reto 03 propone que el ciudadano **registre** sus bloqueos y reciba un
**código de seguimiento**. Nosotros elegimos **carga automática** desde una base
ficticia que representa información institucional, porque el problema que
describe el propio reto no es *"no tener dónde anotar"* sino *"no saber qué
está pasando"*.

**Esto hay que conversarlo con los organizadores.** Si el registro manual
resulta obligatorio para la evaluación, la opción secundaria mínima ya está
pensada: un botón *"Agregar un bloqueo que no aparece"*, con el caso marcado
como **"Reportado por el ciudadano · sin confirmar por la institución"**, sin
mezclarse con los casos institucionales.

---

## 10. Fuentes y limitaciones

Todas las fuentes están dentro de la web, en **Orientación y fuentes**, con
entidad, enlace, jurisdicción y fecha de consulta (**10/09/2026**). Las
principales:

- [Catálogo Nacional de Trámites — Desbloqueo de licencias de conducir de juzgados municipales de tránsito](https://tramites.gob.gt/servicio/3142/) · requisito: oficio original del juzgado · Q 0 · 5 días · artículos 40 y 40 bis de la Ley de Tránsito
- [Catálogo Nacional de Trámites — Bloqueo de licencias](https://tramites.gob.gt/servicio/3141/)
- [Departamento de Tránsito — Requisitos para el desbloqueo](https://transito.gob.gt/requisitos-para-el-desbloqueo-de-licencias-de-conducir/)
- [Departamento de Tránsito — Trámites en línea](https://transito.gob.gt/tramites-en-linea/)
- [Municipalidad de Guatemala — Juzgados de Asuntos Municipales](https://www.muniguate.com/juzgados-de-asuntos-municipales/)
- [Municipalidad de Villa Nueva — Directorio](https://www.villanueva.gob.gt/directorio/)
- [Municipalidad de Mixco](https://munimixco.gob.gt/) y su [directorio de dependencias (documento de 2018)](https://www2.munimixco.gob.gt/wp-content/uploads/2016/02/NUMERAL-2-FEBRERO.pdf)

### Montos de las multas y base legal

Los montos base de las multas de ejemplo salen del **Reglamento de Tránsito
(Acuerdo Gubernativo 273-98) y sus reformas**, artículos 180 a 185:

- [Departamento de Tránsito — Cartilla de infracciones y sanciones de tránsito](https://transito.gob.gt/wp-content/uploads/2021/01/CARTILLA-DE-INFRACCIONES-Y-SANCIONES-DE-TR%C3%81NSITO.pdf) (fuente principal; sin fecha visible, publicada en una carpeta de enero de 2021)
- [Municipalidad de Guatemala — Reglamento de Tránsito, Título VI](https://www.muniguate.com/images/especiales/reglamento_transito/273_98/06t_01capitulo.htm) (para contrastar; compilación anterior a una reforma)
- Reformas posteriores revisadas: [Decreto 33-2024 (nota de AGN)](https://agn.gt/lo-que-debes-saber-sobre-las-reformas-a-la-ley-de-transito/) y [Acuerdos Gubernativos 46-2025 a 49-2025](https://transito.gob.gt/reglamento-para-la-contratacion-del-seguro-obligatorio/)
- [Departamento de Tránsito — Sanciones a conductores en estado de ebriedad (22/11/2024)](https://transito.gob.gt/sanciones-severas-a-conductores-en-estado-de-ebriedad/)

Cada multa muestra **monto base** (`Q 200.00`), **artículo y numeral**,
municipalidad y **estado de pago simulado**. El total suma **solo multas
pendientes con monto conocido, sin duplicados**; un monto desconocido se avisa y
no cuenta como Q 0.00. No se calculan descuentos, intereses ni recargos.

**Correcciones a la clasificación recibida como insumo:**

| Conducta | Decía | Quedó |
|---|---|---|
| Cinturón de seguridad | Art. 184, Q 500 | **Art. 181, numeral 34, Q 200** |
| Semáforo y señal de alto | Art. 183, Q 400 | **Art. 181, numeral 14, Q 200** |
| Uso del teléfono | Art. 184, Q 500, "sin manos libres" | **Art. 180, Q 100**; el texto no menciona manos libres; numeral 8 u 9 según la fuente (**pendiente**) |
| Equipo de seguridad de motociclistas | Art. 180, Q 100 | **Casco y chaleco: art. 184, numeral 10, Q 500**. El art. 180, numeral 1 es para bicicletas y motobicicletas |
| Carreras | Q 5,000 por participar | **Q 5,000 (185 b) por facilitarlas con obstáculos; Q 25,000 (185 c) por participar como conductor** |
| Alcohol o estupefacientes | Art. 185, Q 25,000 | **No está en los arts. 180-185.** El Departamento de Tránsito lo atribuye al art. 157 del Código Penal (Q 5,000 a Q 25,000, lo decide un juez). **Pendiente de verificar** en el texto oficial; no se usa en la demo |

### Lo que NO pudimos verificar

- Qué significa exactamente **"presentar el original"** cuando el canal es en línea.
- Cuál de las **dos direcciones publicadas** de la plataforma de trámites está vigente. El nombre *"Portal SCT"* que menciona el reto no aparece en las páginas oficiales que consultamos; ahí se llama *"Trámites en línea"*.
- El **horario del juzgado de Mixco** y la vigencia de su dirección (fuente de 2018).
- **La vigencia actual de los montos**: no encontramos un texto consolidado oficial actualizado a 2026.
- El **numeral exacto del uso del teléfono** (8 en la cartilla, 9 en la compilación municipal) y el **número del acuerdo** que llevó el casco y el chaleco al artículo 184.
- **Descuentos, intereses, recargos y plazos de cada municipalidad**: no se muestran.

---

## 11. Qué se probó en esta versión (1.1)

Se ejecutaron dos baterías automáticas:

- **164 comprobaciones de lógica y datos en Node**: sesión antigua no restaurada
  y solo esa llave borrada; entrar, conservar la sesión entre pantallas, pestaña
  nueva sin sesión, salir y reiniciar; resultados por placa sin datos personales
  e idénticos con o sin sesión; totales (solo pendientes, sin duplicados, montos
  desconocidos aparte); formato `Q 1,000.00`; integridad entre multas,
  infracciones, portales y bloqueos; correcciones legales; textos obsoletos
  eliminados; ausencia de `fetch`, `XMLHttpRequest`, balizas e iframes.
- **234 comprobaciones en Chromium**, sobre la versión de varios archivos y
  sobre `una-pagina.html`: portada pública con una sesión antigua guardada;
  bloqueos y licencia inaccesibles sin sesión y bloqueos ajenos protegidos;
  consulta de las placas de prueba sin identificarse; errores de formulario;
  identificación explícita, navegación, recarga, pestaña nueva y cierre de sesión
  (también desde el inicio); navegación con teclado y foco visible; sin
  desplazamiento horizontal a 320, 390 y 1280 px; controles de 44 px o más;
  letra al 200 % sin desbordes; **contraste AA medido en todos los textos
  visibles** de siete pantallas; movimiento reducido; ninguna petición externa.

**No se probó** en dispositivos físicos, con lectores de pantalla reales ni con
conexiones lentas reales (la web no carga recursos externos y pesa unos 200 KB).
Tampoco se publicó en GitHub Pages.
