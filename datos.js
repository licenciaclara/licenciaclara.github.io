/* ==========================================================================
   LICENCIA CLARA · Datos de demostración (semilla)
   --------------------------------------------------------------------------
   TODOS los ciudadanos, licencias, bloqueos e historiales de este archivo son
   FICTICIOS. Representan información que en un sistema real provendría de las
   instituciones. No corresponden a personas ni expedientes reales.

   Los datos de CONTACTO de juzgados y municipalidades sí son datos públicos
   consultados el 10/09/2026; cada uno indica su fuente y su nivel de
   verificación. Lo que no pudimos verificar aparece como "pendiente".

   Para editar el contenido de la demo, este es el ÚNICO archivo que hay que
   tocar. No hace falta saber programar: solo cambiar los textos entre comillas.
   ========================================================================== */

window.DATOS = {

  version: "1.1",
  fechaConsultaFuentes: "10/09/2026",

  /* ---------------------------------------------------------- FUENTES --- */
  fuentes: [
    { id: "F-01", entidad: "Catálogo Nacional de Trámites (MINGOB)",
      titulo: "Desbloqueo de licencias de conducir de juzgados municipales de tránsito",
      url: "https://tramites.gob.gt/servicio/3142/",
      jurisdiccion: "Nacional", fecha_consulta: "10/09/2026",
      nota: "Requisito: oficio original de desbloqueo del juzgado. Costo Q 0. Tiempo de respuesta 5 días. Base legal: artículos 40 y 40 bis de la Ley de Tránsito." },

    { id: "F-02", entidad: "Catálogo Nacional de Trámites (MINGOB)",
      titulo: "Bloqueo de licencias de conducir de juzgados municipales de tránsito",
      url: "https://tramites.gob.gt/servicio/3141/",
      jurisdiccion: "Nacional", fecha_consulta: "10/09/2026",
      nota: "Confirma que quien ordena el bloqueo y el desbloqueo es el juzgado; el Departamento de Tránsito ejecuta." },

    { id: "F-03", entidad: "Departamento de Tránsito de la PNC",
      titulo: "Requisitos para el desbloqueo de licencias de conducir",
      url: "https://transito.gob.gt/requisitos-para-el-desbloqueo-de-licencias-de-conducir/",
      jurisdiccion: "Nacional", fecha_consulta: "10/09/2026",
      nota: "Requisitos: solicitud de usuario y orden de desbloqueo emitida por juez competente. El trámite en línea incluye una bitácora donde se ve el avance." },

    { id: "F-04", entidad: "Departamento de Tránsito de la PNC",
      titulo: "Trámites en línea",
      url: "https://transito.gob.gt/tramites-en-linea/",
      jurisdiccion: "Nacional", fecha_consulta: "10/09/2026",
      nota: "La plataforma aparece publicada en dos direcciones distintas: tramites.transito.gob.gt y servicios.transito.gob.gt. No pudimos determinar cuál es la vigente." },

    { id: "F-05", entidad: "Municipalidad de Guatemala",
      titulo: "Juzgados de Asuntos Municipales",
      url: "https://www.muniguate.com/juzgados-de-asuntos-municipales/",
      jurisdiccion: "Municipio de Guatemala", fecha_consulta: "10/09/2026",
      nota: "Direcciones, teléfonos y horarios de los juzgados primero, segundo y tercero de tránsito." },

    { id: "F-06", entidad: "Municipalidad de Villa Nueva",
      titulo: "Directorio municipal",
      url: "https://www.villanueva.gob.gt/directorio/",
      jurisdiccion: "Municipio de Villa Nueva", fecha_consulta: "10/09/2026",
      nota: "Edificio municipal en 5a avenida 4-45, zona 1. Conmutador 1581. Juzgado de Asuntos Municipales y de Tránsito con extensiones administrativas y de tránsito." },

    { id: "F-07", entidad: "Municipalidad de Mixco",
      titulo: "Directorio de dependencias municipales (documento fechado 19/02/2018)",
      url: "https://www2.munimixco.gob.gt/wp-content/uploads/2016/02/NUMERAL-2-FEBRERO.pdf",
      jurisdiccion: "Municipio de Mixco", fecha_consulta: "10/09/2026",
      nota: "Es la única fuente municipal donde encontramos la dirección del juzgado. El documento es de 2018, por eso marcamos estos datos como pendientes de reconfirmar." },

    { id: "F-08", entidad: "Municipalidad de Mixco",
      titulo: "Sitio oficial y consulta de multas (EMIXTRA)",
      url: "https://munimixco.gob.gt/",
      jurisdiccion: "Municipio de Mixco", fecha_consulta: "10/09/2026",
      nota: "Conmutador municipal 1593. Consulta de multas en consultas.munimixco.gob.gt/emixtra/consulta." },

    /* --- Base legal de los montos de las multas ------------------------- */
    { id: "F-09", entidad: "Departamento de Tránsito de la PNC",
      titulo: "Cartilla de infracciones y sanciones de tránsito (artículos 180 a 185 del Reglamento de Tránsito)",
      url: "https://transito.gob.gt/wp-content/uploads/2021/01/CARTILLA-DE-INFRACCIONES-Y-SANCIONES-DE-TR%C3%81NSITO.pdf",
      jurisdiccion: "Nacional", fecha_consulta: "10/09/2026",
      nota: "Fuente principal de montos, artículos y numerales. El documento no muestra fecha; el archivo está publicado en una carpeta de enero de 2021. Ya incluye el casco y el chaleco de motociclistas en el artículo 184. Por su antigüedad, no la tomamos como prueba suficiente de vigencia en 2026." },

    { id: "F-10", entidad: "Municipalidad de Guatemala",
      titulo: "Reglamento de Tránsito, Acuerdo Gubernativo 273-98, Título VI: Infracciones y sanciones (compilación en línea)",
      url: "https://www.muniguate.com/images/especiales/reglamento_transito/273_98/06t_01capitulo.htm",
      jurisdiccion: "Nacional", fecha_consulta: "10/09/2026",
      nota: "Compilación sin fecha. Coincide con la cartilla en montos, en el cinturón (181, numeral 34) y en el semáforo (181, numeral 14). Es anterior a una reforma: todavía pone 'circular sin casco' en el artículo 180 y numera como 9 el uso del teléfono. La usamos solo para contrastar." },

    { id: "F-11", entidad: "Departamento de Tránsito de la PNC",
      titulo: "Sanciones severas a conductores en estado de ebriedad (nota del 22/11/2024)",
      url: "https://transito.gob.gt/sanciones-severas-a-conductores-en-estado-de-ebriedad/",
      jurisdiccion: "Nacional", fecha_consulta: "10/09/2026",
      nota: "Atribuye la sanción por conducir en estado de ebriedad al artículo 157 del Código Penal (multa de Q 5,000 a Q 25,000 y suspensión de la licencia), no al artículo 185 del Reglamento. No pudimos consultar el texto oficial del Código Penal para confirmarlo." },

    { id: "F-12", entidad: "Agencia Guatemalteca de Noticias (AGN)",
      titulo: "Lo que debes saber sobre las reformas a la Ley de Tránsito (Decreto 33-2024), nota del 22/11/2024",
      url: "https://agn.gt/lo-que-debes-saber-sobre-las-reformas-a-la-ley-de-transito/",
      jurisdiccion: "Nacional", fecha_consulta: "10/09/2026",
      nota: "Reforma posterior revisada. Cambia la notificación de las multas (120 días para notificar, 60 días para pagar). La nota no menciona cambios en los montos de los artículos 180 a 185." },

    { id: "F-13", entidad: "Departamento de Tránsito de la PNC",
      titulo: "Reglamento para la contratación del seguro obligatorio (Acuerdos Gubernativos 46-2025 a 49-2025)",
      url: "https://transito.gob.gt/reglamento-para-la-contratacion-del-seguro-obligatorio/",
      jurisdiccion: "Nacional", fecha_consulta: "10/09/2026",
      nota: "Reformas posteriores revisadas. Según lo publicado, regulan el seguro obligatorio de vehículos. No pudimos leer el texto completo de los acuerdos para descartar cambios en los artículos 180 a 185." }
  ],

  /* ------------------------------------------------ BASE LEGAL MULTAS --- */
  /* Resumen de lo que se pudo verificar. Se muestra en Orientación.        */
  base_legal: {
    norma: "Reglamento de Tránsito, Acuerdo Gubernativo 273-98, y sus reformas",
    fecha_consulta: "10/09/2026",
    fuentes: ["F-09", "F-10", "F-12", "F-13"],
    vigencia: "Montos, artículos y numerales tomados de la cartilla oficial del Departamento de Tránsito y contrastados con la compilación de la Municipalidad de Guatemala. Revisamos reformas posteriores (Decreto 33-2024 y Acuerdos Gubernativos 46-2025 a 49-2025) y, en lo que pudimos consultar, no cambian estos montos. No encontramos un texto consolidado oficial actualizado a 2026: la vigencia actual queda pendiente de confirmar."
  },

  /* ---------------------------------------------------- INFRACCIONES --- */
  /* Catálogo de referencia. "monto" es el MONTO BASE en quetzales que fija
     el Reglamento. No es una deuda, no incluye descuentos, intereses ni
     recargos. Si el monto no se conoce, "monto" es null (nunca 0).

     verificacion:
       "verificado"         → monto, artículo y numeral coinciden en la fuente
       "numeral_pendiente"  → el monto coincide, el numeral no
       "pendiente"          → no se pudo confirmar el monto

     correccion: qué cambió respecto a la clasificación recibida como insumo.
     solo_demo:  true = registro ficticio para probar la interfaz; no se
                 muestra en la tabla de montos de referencia.              */
  infracciones: [
    { id: "INF-180-1", conducta: "Bicicleta o motobicicleta sin el equipo básico en buen estado",
      texto_legal: "Por no tener las bicicletas y motobicicletas, el equipamiento básico en óptimas condiciones de funcionamiento.",
      articulo: "180", numeral: "1", monto: 100, verificacion: "verificado", fuente_id: "F-09",
      correccion: "La lista recibida hablaba de motocicletas. Este numeral es para bicicletas y motobicicletas. El casco y el chaleco de motociclistas están en el artículo 184, numeral 10." },

    { id: "INF-180-3", conducta: "Circular por el arcén (la orilla de la carretera) sin causa justificada",
      texto_legal: "Por circular en el arcén sin causa justificada.",
      articulo: "180", numeral: "3", monto: 100, verificacion: "verificado", fuente_id: "F-09",
      correccion: "" },

    { id: "INF-180-8", conducta: "Conducir usando el teléfono, auriculares u otros aparatos similares",
      texto_legal: "Por conducir utilizando auriculares conectados y aparatos receptores o reproductores de sonido, o utilizando teléfonos, radios comunicadores u otros aparatos similares.",
      articulo: "180", numeral: "8", monto: 100, verificacion: "numeral_pendiente", fuente_id: "F-09",
      nota_verificacion: "La cartilla del Departamento de Tránsito lo numera 8; la compilación de la Municipalidad de Guatemala lo numera 9.",
      correccion: "La lista recibida lo ponía en el artículo 184 (Q 500.00) como uso del teléfono sin manos libres. Está en el artículo 180 (Q 100.00) y el texto no menciona manos libres." },

    { id: "INF-181-1", conducta: "No portar la tarjeta de circulación ni una fotocopia autenticada",
      texto_legal: "Por circular sin portar la tarjeta de circulación o fotocopia autenticada de la misma.",
      articulo: "181", numeral: "1", monto: 200, verificacion: "verificado", fuente_id: "F-09",
      correccion: "" },

    { id: "INF-181-2", conducta: "Colocar las placas en un lugar no autorizado",
      texto_legal: "Por portar las placas de circulación en lugares no autorizados.",
      articulo: "181", numeral: "2", monto: 200, verificacion: "verificado", fuente_id: "F-09",
      correccion: "" },

    { id: "INF-181-14", conducta: "No respetar la señal de alto o el alto del semáforo",
      texto_legal: "Por no respetar las señales de tránsito siguientes: Alto; Alto, del semáforo; No hay paso; del Agente, Inspector Ad-honorem o Inspector Escolar; Altura máxima; y Ancho máximo.",
      articulo: "181", numeral: "14", monto: 200, verificacion: "verificado", fuente_id: "F-09",
      correccion: "La lista recibida lo ponía en el artículo 183 (Q 400.00). Está en el artículo 181, numeral 14 (Q 200.00)." },

    { id: "INF-181-34", conducta: "Circular sin cinturón de seguridad",
      texto_legal: "Por circular sin cinturones de seguridad, salvo los casos de excepción previstos en el presente reglamento.",
      articulo: "181", numeral: "34", monto: 200, verificacion: "verificado", fuente_id: "F-09",
      correccion: "La lista recibida lo ponía en el artículo 184 (Q 500.00). Está en el artículo 181, numeral 34 (Q 200.00)." },

    { id: "INF-182-1", conducta: "Conducir con la licencia vencida",
      texto_legal: "Por conducir con licencia vencida.",
      articulo: "182", numeral: "1", monto: 300, verificacion: "verificado", fuente_id: "F-09",
      correccion: "" },

    { id: "INF-182-3", conducta: "Tirar basura u objetos a la calle desde un vehículo",
      texto_legal: "Por tirar o lanzar basura u otros objetos a la vía pública, desde un vehículo estacionado o en marcha.",
      articulo: "182", numeral: "3", monto: 300, verificacion: "verificado", fuente_id: "F-09",
      correccion: "",
      nota: "Si la basura u objetos pueden entorpecer la circulación, el artículo 183, numeral 13, fija Q 400.00." },

    { id: "INF-183-1", conducta: "Conducir sin haber obtenido licencia",
      texto_legal: "Por conducir sin tener licencia.",
      articulo: "183", numeral: "1", monto: 400, verificacion: "verificado", fuente_id: "F-09",
      correccion: "" },

    { id: "INF-184-1", conducta: "Circular sin placas",
      texto_legal: "Por circular sin placas de circulación.",
      articulo: "184", numeral: "1", monto: 500, verificacion: "verificado", fuente_id: "F-09",
      correccion: "" },

    { id: "INF-184-10", conducta: "Motociclista o acompañante sin casco protector y chaleco",
      texto_legal: "Cuando los conductores de motocicletas o motobicicletas y sus acompañantes no cumplan con la obligación de portar el casco protector y el chaleco.",
      articulo: "184", numeral: "10", monto: 500, verificacion: "verificado", fuente_id: "F-09",
      nota: "Numeral agregado por una reforma. La compilación de la Municipalidad de Guatemala es anterior y todavía pone el casco en el artículo 180 (Q 100.00). El número del acuerdo que hizo el cambio queda pendiente de verificar.",
      correccion: "La lista recibida ubicaba el equipo de seguridad de motocicletas en el artículo 180 (Q 100.00)." },

    { id: "INF-185-A2", conducta: "Faltar el respeto, ofender, agredir o insultar a la autoridad de tránsito",
      texto_legal: "Faltar el respeto, ofender, agredir o insultar a la autoridad de Tránsito.",
      articulo: "185", numeral: "literal a), numeral 2", monto: 1000, verificacion: "verificado", fuente_id: "F-09",
      correccion: "" },

    { id: "INF-185-B", conducta: "Poner obstáculos u otros medios en la vía para facilitar carreras sin permiso",
      texto_legal: "Para quien altere la seguridad del tránsito mediante la colocación de obstáculos imprevisibles o por cualquier otro medio, en la vía pública para facilitar carreras, concursos o actividades similares, sin el permiso correspondiente.",
      articulo: "185", numeral: "literal b)", monto: 5000, verificacion: "verificado", fuente_id: "F-09",
      correccion: "La lista recibida decía 'participar en carreras'. Este literal sanciona a quien facilita las carreras, no a quien participa como conductor." },

    { id: "INF-185-C", conducta: "Participar como conductor en carreras en la vía pública sin permiso",
      texto_legal: "Por utilizar la vía pública para carreras, concursos o actividades similares, sin el permiso correspondiente, para cada conductor que participe.",
      articulo: "185", numeral: "literal c)", monto: 25000, verificacion: "verificado", fuente_id: "F-09",
      correccion: "La lista recibida atribuía Q 25,000.00 a conducir bajo efectos de alcohol. En el artículo 185 ese monto corresponde a participar en carreras sin permiso." },

    { id: "INF-DEMO-SIN-MONTO", conducta: "Infracción registrada por la municipalidad, sin clasificación confirmada",
      texto_legal: "",
      articulo: "", numeral: "", monto: null, verificacion: "pendiente", fuente_id: "",
      correccion: "", solo_demo: true,
      nota: "Registro ficticio para mostrar qué pasa cuando no se conoce el monto: se indica como pendiente y no se suma al total." }
  ],

  /* Temas de la clasificación recibida que NO son multas de los artículos
     180 a 185 y que por eso no se usan en las multas de ejemplo. */
  aclaraciones_legales: [
    { id: "ACL-01", tema: "Conducir bajo efectos de alcohol o estupefacientes",
      texto: "No encontramos esta conducta en los artículos 180 a 185 del Reglamento de Tránsito, ni una disposición que le fije Q 25,000.00 en el artículo 185. Una nota del Departamento de Tránsito (22/11/2024) la atribuye al artículo 157 del Código Penal, con multa de Q 5,000.00 a Q 25,000.00 y suspensión de la licencia, que decide un juez. No pudimos confirmarlo en el texto oficial del Código Penal.",
      verificacion: "pendiente", fuente_id: "F-11" }
  ],

  /* ---------------------------------------------------------- PORTALES --- */
  /* Portales públicos de consulta de remisiones y multas que existen hoy.
     La consulta por placa de esta demostración los LISTA y SIMULA; NO les
     envía ninguna petición. Los portales de terceros bloquean las consultas
     automatizadas (CORS, sin API pública, sin permitir lectura en iframe),
     así que cualquier otra cosa sería falsa.

     estado_revision:
       "responde"   → la página cargó cuando la revisamos (10/09/2026)
       "sin_https"  → responde solo por http, el navegador puede advertir
       "no_verificado" → no pudimos comprobarlo; lo listamos igual porque
                         forma parte del listado de portales municipales   */
  portales: [
    { id: "POR-01", nombre: "Departamento de Tránsito (PNC)", lugar: "Nacional",
      url: "https://sistemas.transito.gob.gt/consultaremisiones/consultaremisiones",
      municipalidad_id: "", estado_revision: "responde",
      nota: "Pide tipo de placa y número. Ofrece 14 categorías de placa." },

    { id: "POR-02", nombre: "EMETRA", lugar: "Municipalidad de Guatemala",
      url: "https://especiales.muniguate.com/remisiones.htm",
      municipalidad_id: "MUNI-GUA", estado_revision: "responde",
      nota: "Consulta de remisiones por tipo y número de placa." },

    { id: "POR-03", nombre: "EMIXTRA", lugar: "Municipalidad de Mixco",
      url: "https://consultas.munimixco.gob.gt/emixtra/consulta",
      municipalidad_id: "MUNI-MIX", estado_revision: "responde",
      nota: "Consulta y pago de multas de tránsito de Mixco." },

    { id: "POR-04", nombre: "Municipalidad de Villa Nueva", lugar: "Villa Nueva",
      url: "https://www.villanueva.gob.gt/",
      municipalidad_id: "MUNI-VNU", estado_revision: "responde",
      nota: "Consulta de remisiones dentro del sitio municipal." },

    { id: "POR-05", nombre: "Municipalidad de Santa Catarina Pinula", lugar: "Santa Catarina Pinula",
      url: "http://www.consultas.scp.gob.gt/transito/",
      municipalidad_id: "", estado_revision: "sin_https",
      nota: "El sitio responde solo por http; algunos navegadores lo marcan como no seguro." },

    { id: "POR-06", nombre: "Municipalidad de Palencia", lugar: "Palencia",
      url: "http://consultamulta.munipalencia.gob.gt/",
      municipalidad_id: "", estado_revision: "sin_https",
      nota: "El sitio responde solo por http; algunos navegadores lo marcan como no seguro." },

    { id: "POR-07", nombre: "Municipalidad de San Lucas Sacatepéquez", lugar: "San Lucas Sacatepéquez",
      url: "http://www.munisanlucas.gob.gt/Municipalidad_de_San_Lucas/Consulta_de_Remisiones.htm",
      municipalidad_id: "", estado_revision: "no_verificado",
      nota: "No pudimos comprobar que estuviera activo el día de la revisión." },

    { id: "POR-08", nombre: "Municipalidad de Antigua Guatemala", lugar: "Antigua Guatemala",
      url: "https://pagos.muniantigua.gob.gt/multas-transito",
      municipalidad_id: "", estado_revision: "no_verificado",
      nota: "No pudimos comprobar que estuviera activo el día de la revisión." },

    { id: "POR-09", nombre: "Portal de Servicios GL (MINFIN)", lugar: "Varias municipalidades",
      url: "https://serviciosportalgl.minfin.gob.gt/consulta-multa-transito",
      municipalidad_id: "", estado_revision: "no_verificado",
      nota: "No pudimos comprobar que estuviera activo el día de la revisión." },

    { id: "POR-10", nombre: "PMT Amatitlán", lugar: "Amatitlán",
      url: "https://amatitlanpmt.com/",
      municipalidad_id: "", estado_revision: "no_verificado",
      nota: "No pudimos comprobar que estuviera activo el día de la revisión." }
  ],

  /* Categorías de placa. Son EXACTAMENTE las que ofrece el formulario del
     Departamento de Tránsito. No inventamos el significado de cada letra
     porque los portales tampoco lo publican. */
  tipos_placa: ["P", "C", "A", "M", "CD", "CC", "DIS", "TC", "O", "U", "MI", "STP", "TRC", "PNC"],

  /* ------------------------------------------------ MULTAS VEHICULARES --- */
  /* Multas FICTICIAS asociadas a una PLACA, no a una persona. Por eso aquí
     no hay nombre, DPI ni ciudadano: consultar una placa nunca debe mostrar
     quién es el titular.

     Una multa vehicular NO es un bloqueo de licencia. Son registros
     distintos: un bloqueo puede mencionar una multa (campo multa_id del
     bloqueo), pero ninguna multa crea un bloqueo ni dice nada de la licencia.

     infraccion_id → catálogo "infracciones" (de ahí salen monto y artículo)
     estado_pago   → "pendiente" | "pagada"   (simulado)                   */
  multas: [
    { id: "MUL-GUA-2026-0412", referencia: "REM-DEMO-88421",
      placa: "123ABC", tipo_placa: "P",
      municipalidad_id: "MUNI-GUA", portal_id: "POR-02",
      infraccion_id: "INF-181-14", fecha: "28/06/2026", estado_pago: "pendiente" },

    { id: "MUL-MIX-2026-0198", referencia: "REM-DEMO-51007",
      placa: "123ABC", tipo_placa: "P",
      municipalidad_id: "MUNI-MIX", portal_id: "POR-03",
      infraccion_id: "INF-181-34", fecha: "15/04/2026", estado_pago: "pendiente" },

    { id: "MUL-GUA-2026-0233", referencia: "REM-DEMO-80115",
      placa: "123ABC", tipo_placa: "P",
      municipalidad_id: "MUNI-GUA", portal_id: "POR-02",
      infraccion_id: "INF-180-8", fecha: "02/03/2026", estado_pago: "pagada" },

    { id: "MUL-VNU-2026-0071", referencia: "REM-DEMO-30452",
      placa: "456DEF", tipo_placa: "P",
      municipalidad_id: "MUNI-VNU", portal_id: "POR-04",
      infraccion_id: "INF-180-3", fecha: "09/08/2026", estado_pago: "pendiente" },

    { id: "MUL-VNU-2026-0090", referencia: "REM-DEMO-30988",
      placa: "456DEF", tipo_placa: "P",
      municipalidad_id: "MUNI-VNU", portal_id: "POR-04",
      infraccion_id: "INF-DEMO-SIN-MONTO", fecha: "21/08/2026", estado_pago: "pendiente" },

    { id: "MUL-MIX-2026-0155", referencia: "REM-DEMO-50631",
      placa: "2244BC", tipo_placa: "M",
      municipalidad_id: "MUNI-MIX", portal_id: "POR-03",
      infraccion_id: "INF-184-10", fecha: "30/05/2026", estado_pago: "pendiente" },

    { id: "MUL-GUA-2025-0870", referencia: "REM-DEMO-71230",
      placa: "9090XY", tipo_placa: "P",
      municipalidad_id: "MUNI-GUA", portal_id: "POR-02",
      infraccion_id: "INF-181-1", fecha: "14/08/2025", estado_pago: "pagada" },

    { id: "MUL-VNU-2025-0031", referencia: "REM-DEMO-29874",
      placa: "9090XY", tipo_placa: "P",
      municipalidad_id: "MUNI-VNU", portal_id: "POR-04",
      infraccion_id: "INF-182-1", fecha: "03/02/2025", estado_pago: "pagada" }

    /* 789GHI (tipo P) existe a propósito SIN filas: sirve para mostrar el
       mensaje de "no se encontraron multas". */
  ],

  /* -------------------------------------------------- MUNICIPALIDADES --- */
  municipalidades: [
    { id: "MUNI-GUA", nombre: "Municipalidad de Guatemala",
      sitio_url: "https://www.muniguate.com/juzgados-de-asuntos-municipales/",
      telefono_general: "1551",
      consulta_multas_url: "https://www.muniguate.com/emetra/",
      fuente_id: "F-05" },

    { id: "MUNI-MIX", nombre: "Municipalidad de Mixco",
      sitio_url: "https://munimixco.gob.gt/",
      telefono_general: "1593",
      consulta_multas_url: "https://consultas.munimixco.gob.gt/emixtra/consulta",
      fuente_id: "F-08" },

    { id: "MUNI-VNU", nombre: "Municipalidad de Villa Nueva",
      sitio_url: "https://www.villanueva.gob.gt/directorio/",
      telefono_general: "1581",
      consulta_multas_url: "https://www.villanueva.gob.gt/",
      fuente_id: "F-06" }
  ],

  /* --------------------------------------------------------- JUZGADOS --- */
  /* verificacion: "verificado" | "parcial" | "pendiente"                   */
  /*                                                                        */
  /* IMPORTANTE: distinguimos el TELÉFONO DIRECTO DEL JUZGADO del           */
  /* CONMUTADOR GENERAL DE LA MUNICIPALIDAD. No son lo mismo y confundirlos */
  /* hace que la persona llame a un lugar donde no le pueden responder.     */
  /* Si no encontramos una línea directa publicada, "telefono" queda vacío  */
  /* y en la web el botón "Llamar al juzgado" aparece desactivado.          */
  juzgados: [
    { id: "JUZ-GUA-1", municipalidad_id: "MUNI-GUA",
      nombre: "Juzgado Primero de Tránsito",
      direccion: "21 calle 6-77, zona 1, Centro Cívico, Palacio Municipal, sótano",
      telefono: "2285-8273",
      horario: "Lunes a jueves de 7:00 a 17:00. Viernes de 7:00 a 15:00.",
      verificacion: "verificado", fuente_id: "F-05",
      sitio_url: "https://www.muniguate.com/juzgados-de-asuntos-municipales/" },

    { id: "JUZ-GUA-2", municipalidad_id: "MUNI-GUA",
      nombre: "Juzgado Segundo de Tránsito",
      direccion: "51 calle final, Villa Lobos I, zona 12, Edificio Administrativo CENMA, primer nivel",
      telefono: "2485-1876",
      horario: "Lunes a viernes de 7:00 a 16:00.",
      verificacion: "verificado", fuente_id: "F-05",
      sitio_url: "https://www.muniguate.com/juzgados-de-asuntos-municipales/" },

    { id: "JUZ-GUA-3", municipalidad_id: "MUNI-GUA",
      nombre: "Juzgado Tercero de Tránsito",
      direccion: "Km 4.5 carretera al Atlántico, centro comercial Los Álamos, local 5",
      telefono: "2258-2666",
      horario: "Lunes a viernes de 7:00 a 16:00.",
      verificacion: "verificado", fuente_id: "F-05",
      sitio_url: "https://www.muniguate.com/juzgados-de-asuntos-municipales/" },

    { id: "JUZ-MIX-1", municipalidad_id: "MUNI-MIX",
      nombre: "Juzgado Primero de Asuntos Municipales y de Tránsito",
      direccion: "5a avenida 3-13, zona 1, Mixco. Edificio Juzgado Primero, segundo nivel.",
      telefono: "",                      /* vacío = no encontramos línea directa */
      extension: "4232",
      horario: "",                       /* vacío = pendiente de verificar */
      verificacion: "parcial", fuente_id: "F-07",
      sitio_url: "https://munimixco.gob.gt/",
      nota_verificacion: "No encontramos una línea directa publicada para este juzgado. Llama al conmutador municipal 1593 y pide la extensión 4232. La dirección proviene del directorio municipal fechado en 2018, así que conviene reconfirmarla antes de ir. El horario de atención no está publicado en ninguna fuente oficial que hayamos podido consultar." },

    { id: "JUZ-VNU-1", municipalidad_id: "MUNI-VNU",
      nombre: "Juzgado de Asuntos Municipales y de Tránsito",
      direccion: "5a avenida 4-45, zona 1, Villa Nueva (edificio municipal)",
      telefono: "",                      /* vacío = no encontramos línea directa */
      extension: "178",
      horario: "Lunes a viernes de 8:00 a 16:00.",
      verificacion: "parcial", fuente_id: "F-06",
      sitio_url: "https://www.villanueva.gob.gt/directorio/",
      nota_verificacion: "No encontramos una línea directa publicada para este juzgado. Llama al conmutador municipal 1581 y pide la extensión 178 o 122 (oficiales de tránsito), o 105 y 181 (oficiales administrativos)." }
  ],

  /* ------------------------------------------------------- CIUDADANOS --- */
  ciudadanos: [
    { id: "C-100001", nombre: "Andrea Morales", cui_demo: "**** **** 0001",
      iniciales: "AM", usuario_demo: "andrea.demo", clave_demo: "demo1234" },

    { id: "C-100002", nombre: "Diego Herrera",  cui_demo: "**** **** 0002",
      iniciales: "DH", usuario_demo: "diego.demo",  clave_demo: "demo1234" },

    { id: "C-100003", nombre: "Sofía Castillo", cui_demo: "**** **** 0003",
      iniciales: "SC", usuario_demo: "sofia.demo",  clave_demo: "demo1234" },

    { id: "C-100004", nombre: "Luis Méndez",    cui_demo: "**** **** 0004",
      iniciales: "LM", usuario_demo: "luis.demo",   clave_demo: "demo1234" }
  ],

  /* --------------------------------------------------------- LICENCIAS --- */
  licencias: [
    { id: "L-01", ciudadano_id: "C-100001", numero: "LIC-DEMO-100001", tipo: "Tipo B", fecha_vencimiento: "14/03/2027" },
    { id: "L-02", ciudadano_id: "C-100002", numero: "LIC-DEMO-100002", tipo: "Tipo M (motocicleta)", fecha_vencimiento: "30/11/2026" },
    { id: "L-03", ciudadano_id: "C-100003", numero: "LIC-DEMO-100003", tipo: "Tipo A", fecha_vencimiento: "22/01/2028" },
    { id: "L-04", ciudadano_id: "C-100004", numero: "LIC-DEMO-100004", tipo: "Tipo B", fecha_vencimiento: "05/08/2027" }
  ],

  /* ---------------------------------------------------------- BLOQUEOS --- */
  /* Bloqueos de LICENCIA: pertenecen a una persona y solo se muestran
     después de ingresar con identidad digital.
     estado:    gestion_ciudadano | en_juzgado | en_transito | levantado
     subestado: "" | orden_sin_presentar | solicitud_presentada | con_observacion
     multa_id:  "" si no hay multa relacionada. Un bloqueo sin multa NO suma
                dinero en ninguna pantalla. */
  bloqueos: [

    /* --- Diego Herrera ------------------------------------------------- */
    { id: "BLQ-MIX-2026-0087",
      ciudadano_id: "C-100002", municipalidad_id: "MUNI-MIX", juzgado_id: "JUZ-MIX-1",
      razon: "Proceso administrativo abierto en el juzgado por una infracción de tránsito que no fue resuelta dentro del plazo. Caso ficticio de demostración.",
      estado: "gestion_ciudadano", subestado: "",
      responsable: "Ciudadano",
      proxima_accion: "Acude al juzgado a resolver el caso y a solicitar la orden de desbloqueo.",
      detalle: "Todavía no se ha iniciado ninguna gestión sobre este caso.",
      fecha_registro: "12/06/2026", ultima_actualizacion: "12/06/2026",
      guia_id: "GUIA-GESTION",
      multa_id: "" },

    /* --- Sofía Castillo (caso principal) -------------------------------- */
    { id: "BLQ-GUA-2026-0311",
      ciudadano_id: "C-100003", municipalidad_id: "MUNI-GUA", juzgado_id: "JUZ-GUA-1",
      razon: "Expediente abierto en el juzgado por una infracción de tránsito pendiente de resolver. Caso ficticio de demostración.",
      estado: "gestion_ciudadano", subestado: "",
      responsable: "Ciudadano",
      proxima_accion: "Acude al juzgado a resolver el caso y a solicitar la orden de desbloqueo.",
      detalle: "Este expediente tiene una multa relacionada. Resolverla es parte del caso, pero pagarla no levanta el bloqueo por sí sola.",
      fecha_registro: "03/07/2026", ultima_actualizacion: "03/07/2026",
      guia_id: "GUIA-GESTION",
      multa_id: "MUL-GUA-2026-0412" },

    { id: "BLQ-MIX-2026-0104",
      ciudadano_id: "C-100003", municipalidad_id: "MUNI-MIX", juzgado_id: "JUZ-MIX-1",
      razon: "Expediente abierto en el juzgado por una infracción de tránsito. Caso ficticio de demostración.",
      estado: "en_juzgado", subestado: "",
      responsable: "Juzgado municipal",
      proxima_accion: "Espera la resolución del juzgado. Si pasa el plazo que te indicaron, consulta por teléfono con tu número de expediente.",
      detalle: "La solicitud de orden de desbloqueo fue recibida por el juzgado y está en revisión.",
      fecha_registro: "19/05/2026", ultima_actualizacion: "26/08/2026",
      guia_id: "GUIA-JUZGADO-ESPERA",
      multa_id: "" },

    { id: "BLQ-VNU-2026-0056",
      ciudadano_id: "C-100003", municipalidad_id: "MUNI-VNU", juzgado_id: "JUZ-VNU-1",
      razon: "Expediente abierto en el juzgado por una infracción de tránsito. Caso ficticio de demostración.",
      estado: "en_transito", subestado: "solicitud_presentada",
      responsable: "Departamento de Tránsito",
      proxima_accion: "Espera la resolución y revisa la bitácora de tu trámite en la plataforma de Tránsito.",
      detalle: "Ya obtuviste la orden del juzgado y ya presentaste la solicitud. Ahora le toca al Departamento de Tránsito.",
      fecha_registro: "11/04/2026", ultima_actualizacion: "02/09/2026",
      guia_id: "GUIA-TRANSITO-ESPERA",
      multa_id: "" },

    /* --- Luis Méndez (historial resuelto) ------------------------------- */
    { id: "BLQ-GUA-2025-0187",
      ciudadano_id: "C-100004", municipalidad_id: "MUNI-GUA", juzgado_id: "JUZ-GUA-3",
      razon: "Expediente abierto en el juzgado por una infracción de tránsito. Caso ficticio de demostración.",
      estado: "levantado", subestado: "",
      responsable: "Nadie",
      proxima_accion: "Ninguna. Conserva la resolución del Departamento de Tránsito.",
      detalle: "Caso concluido.",
      fecha_registro: "08/09/2025", ultima_actualizacion: "21/11/2025",
      guia_id: "GUIA-LEVANTADO",
      multa_id: "" },

    { id: "BLQ-VNU-2025-0042",
      ciudadano_id: "C-100004", municipalidad_id: "MUNI-VNU", juzgado_id: "JUZ-VNU-1",
      razon: "Expediente abierto en el juzgado por una infracción de tránsito. Caso ficticio de demostración.",
      estado: "levantado", subestado: "",
      responsable: "Nadie",
      proxima_accion: "Ninguna. Conserva la resolución del Departamento de Tránsito.",
      detalle: "Caso concluido.",
      fecha_registro: "17/02/2025", ultima_actualizacion: "30/05/2025",
      guia_id: "GUIA-LEVANTADO",
      multa_id: "" }
  ],

  /* --------------------------------------------------------- HISTORIAL --- */
  /* fuente: "Ciudadano" | "Juzgado DEMO" | "Tránsito DEMO"                  */
  historial: [
    { id: "H-01", bloqueo_id: "BLQ-MIX-2026-0087", fecha: "12/06/2026",
      titulo: "Bloqueo registrado por el juzgado",
      detalle: "El juzgado registró el bloqueo de la licencia ante el Departamento de Tránsito.",
      fuente: "Juzgado DEMO", estado_resultante: "gestion_ciudadano" },

    { id: "H-02", bloqueo_id: "BLQ-GUA-2026-0311", fecha: "03/07/2026",
      titulo: "Bloqueo registrado por el juzgado",
      detalle: "El juzgado registró el bloqueo de la licencia ante el Departamento de Tránsito. Hay una remisión asociada al expediente.",
      fuente: "Juzgado DEMO", estado_resultante: "gestion_ciudadano" },

    { id: "H-03", bloqueo_id: "BLQ-MIX-2026-0104", fecha: "19/05/2026",
      titulo: "Bloqueo registrado por el juzgado",
      detalle: "El juzgado registró el bloqueo de la licencia ante el Departamento de Tránsito.",
      fuente: "Juzgado DEMO", estado_resultante: "gestion_ciudadano" },
    { id: "H-04", bloqueo_id: "BLQ-MIX-2026-0104", fecha: "14/08/2026",
      titulo: "Te presentaste al juzgado",
      detalle: "Resolviste tu situación con la municipalidad y solicitaste la orden de desbloqueo.",
      fuente: "Ciudadano", estado_resultante: "en_juzgado" },
    { id: "H-05", bloqueo_id: "BLQ-MIX-2026-0104", fecha: "26/08/2026",
      titulo: "Solicitud recibida por el juzgado",
      detalle: "El juzgado confirmó que la solicitud de orden de desbloqueo está en revisión.",
      fuente: "Juzgado DEMO", estado_resultante: "en_juzgado" },

    { id: "H-06", bloqueo_id: "BLQ-VNU-2026-0056", fecha: "11/04/2026",
      titulo: "Bloqueo registrado por el juzgado",
      detalle: "El juzgado registró el bloqueo de la licencia ante el Departamento de Tránsito.",
      fuente: "Juzgado DEMO", estado_resultante: "gestion_ciudadano" },
    { id: "H-07", bloqueo_id: "BLQ-VNU-2026-0056", fecha: "20/08/2026",
      titulo: "Orden de desbloqueo emitida",
      detalle: "El juzgado emitió el oficio original de desbloqueo y te lo entregó.",
      fuente: "Juzgado DEMO", estado_resultante: "en_transito" },
    { id: "H-08", bloqueo_id: "BLQ-VNU-2026-0056", fecha: "02/09/2026",
      titulo: "Solicitud presentada ante Tránsito",
      detalle: "Presentaste la solicitud de desbloqueo con el oficio original. Quedó en revisión.",
      fuente: "Ciudadano", estado_resultante: "en_transito" },

    { id: "H-09", bloqueo_id: "BLQ-GUA-2025-0187", fecha: "08/09/2025",
      titulo: "Bloqueo registrado por el juzgado",
      detalle: "El juzgado registró el bloqueo de la licencia ante el Departamento de Tránsito.",
      fuente: "Juzgado DEMO", estado_resultante: "gestion_ciudadano" },
    { id: "H-10", bloqueo_id: "BLQ-GUA-2025-0187", fecha: "02/10/2025",
      titulo: "Caso resuelto en el juzgado",
      detalle: "Resolviste tu situación con la municipalidad.",
      fuente: "Ciudadano", estado_resultante: "en_juzgado" },
    { id: "H-11", bloqueo_id: "BLQ-GUA-2025-0187", fecha: "24/10/2025",
      titulo: "Orden de desbloqueo emitida y solicitud presentada",
      detalle: "El juzgado emitió el oficio original y presentaste la solicitud ante el Departamento de Tránsito.",
      fuente: "Ciudadano", estado_resultante: "en_transito" },
    { id: "H-12", bloqueo_id: "BLQ-GUA-2025-0187", fecha: "21/11/2025",
      titulo: "Bloqueo levantado",
      detalle: "El Departamento de Tránsito emitió la resolución y levantó el bloqueo.",
      fuente: "Tránsito DEMO", estado_resultante: "levantado" },

    { id: "H-13", bloqueo_id: "BLQ-VNU-2025-0042", fecha: "17/02/2025",
      titulo: "Bloqueo registrado por el juzgado",
      detalle: "El juzgado registró el bloqueo de la licencia ante el Departamento de Tránsito.",
      fuente: "Juzgado DEMO", estado_resultante: "gestion_ciudadano" },
    { id: "H-14", bloqueo_id: "BLQ-VNU-2025-0042", fecha: "19/03/2025",
      titulo: "Caso resuelto en el juzgado",
      detalle: "Resolviste tu situación con la municipalidad y obtuviste la orden de desbloqueo.",
      fuente: "Ciudadano", estado_resultante: "en_transito" },
    { id: "H-15", bloqueo_id: "BLQ-VNU-2025-0042", fecha: "07/04/2025",
      titulo: "Solicitud presentada ante Tránsito",
      detalle: "Presentaste la solicitud de desbloqueo con el oficio original.",
      fuente: "Ciudadano", estado_resultante: "en_transito" },
    { id: "H-16", bloqueo_id: "BLQ-VNU-2025-0042", fecha: "30/05/2025",
      titulo: "Bloqueo levantado",
      detalle: "El Departamento de Tránsito emitió la resolución y levantó el bloqueo.",
      fuente: "Tránsito DEMO", estado_resultante: "levantado" }
  ],

  /* ------------------------------------------------------------ GUÍAS --- */
  /* Orientación general basada en fuentes públicas. NO es una resolución    */
  /* legal sobre un caso concreto.                                          */
  guias: [
    {
      id: "GUIA-GESTION",
      titulo: "Cómo resolverlo",
      aplica_a: "Casos en los que te toca a ti dar el siguiente paso.",
      pasos: [
        { titulo: "Ve al juzgado que registró el bloqueo",
          detalle: "El bloqueo lo ordenó un Juzgado de Asuntos Municipales de Tránsito. Ahí empieza todo. Lleva tus documentos y pregunta por tu expediente con el código de este caso.",
          que_llevar: ["Tu DPI", "Tu licencia de conducir, si la tienes contigo", "El código de este caso", "Las esquelas o remisiones que tengas, si las conservas"],
          donde: "juzgado",
          pago: "Todavía no se paga nada. El juzgado te dirá si tu caso tiene una multa y cuánto es. No pagues a ninguna persona particular ni fuera de las cajas oficiales.",
          documento: "",
          verificacion: "" },

        { titulo: "Resuelve tu situación con la municipalidad",
          detalle: "El juzgado te indica qué corresponde en tu caso. Si hay una multa, se paga en las cajas de la municipalidad o en los bancos autorizados. Guarda siempre el comprobante.",
          que_llevar: ["El comprobante de pago, si pagaste", "Cualquier documento que te haya pedido el juzgado"],
          donde: "municipalidad",
          pago: "El monto a pagar lo confirma el juzgado o la municipalidad. Si tu caso tiene una multa relacionada, esta demostración muestra su monto base según el Reglamento de Tránsito, con su artículo. No calcula descuentos, intereses ni recargos.",
          documento: "",
          verificacion: "",
          aviso: "Pagar la multa no levanta el bloqueo por sí solo. El pago resuelve tu situación con la municipalidad; el bloqueo lo levanta el Departamento de Tránsito cuando recibe la orden del juzgado." },

        { titulo: "Pide la orden de desbloqueo",
          detalle: "Cuando tu situación quede resuelta, pide en el mismo juzgado el oficio original de desbloqueo. Este documento es el requisito principal del trámite ante Tránsito.",
          que_llevar: ["Tu DPI", "El comprobante de que resolviste el caso"],
          donde: "juzgado",
          pago: "",
          documento: "Oficio original de desbloqueo de licencia, emitido por el Juzgado de Asuntos Municipales de Tránsito.",
          verificacion: "" },

        { titulo: "Presenta la solicitud ante el Departamento de Tránsito",
          detalle: "Con el oficio original en la mano, se presenta la solicitud de desbloqueo. Según el Catálogo Nacional de Trámites, este trámite no tiene costo y se resuelve en 5 días.",
          que_llevar: ["Oficio original de desbloqueo", "Tu DPI", "El formulario de trámites del Departamento de Tránsito"],
          donde: "transito",
          pago: "Q 0. Según el Catálogo Nacional de Trámites, el desbloqueo de licencias de juzgados municipales no tiene costo.",
          documento: "",
          verificacion: "",
          fuente_id: "F-01" },

        { titulo: "Confirma que el bloqueo se levantó",
          detalle: "No des el caso por cerrado hasta que el Departamento de Tránsito emita la resolución. En la plataforma de trámites en línea puedes revisar la bitácora, que muestra el avance de tu solicitud.",
          que_llevar: ["El número de trámite que te dieron al presentar la solicitud"],
          donde: "transito",
          pago: "",
          documento: "Resolución del Departamento de Tránsito.",
          verificacion: "El bloqueo está levantado únicamente cuando el Departamento de Tránsito lo resuelve. Ni el pago ni la orden del juzgado, por sí solos, lo levantan.",
          fuente_id: "F-03" }
      ]
    },

    {
      id: "GUIA-JUZGADO-ESPERA",
      titulo: "Cómo resolverlo",
      aplica_a: "Casos que están en manos del juzgado.",
      pasos: [
        { titulo: "Ahora le toca al juzgado",
          detalle: "Tu solicitud fue recibida. En este momento no tienes que hacer ningún trámite nuevo. Guarda el código de tu caso.",
          que_llevar: [], donde: "", pago: "", documento: "", verificacion: "",
          hecho: false },

        { titulo: "Consulta si pasa el plazo",
          detalle: "Si el juzgado te dio un plazo y ya pasó, llama y pregunta por tu expediente. Ten a mano el código de este caso.",
          que_llevar: ["El código de este caso", "Tu DPI"],
          donde: "juzgado", pago: "", documento: "", verificacion: "" },

        { titulo: "Recoge el oficio original de desbloqueo",
          detalle: "Cuando el juzgado resuelva, te entregará el oficio original de desbloqueo. Revisa que tus datos estén correctos antes de retirarte.",
          que_llevar: ["Tu DPI"],
          donde: "juzgado", pago: "",
          documento: "Oficio original de desbloqueo de licencia.",
          verificacion: "" },

        { titulo: "Presenta la solicitud ante el Departamento de Tránsito",
          detalle: "Con el oficio original se presenta la solicitud de desbloqueo. Según el Catálogo Nacional de Trámites no tiene costo y se resuelve en 5 días.",
          que_llevar: ["Oficio original de desbloqueo", "Tu DPI"],
          donde: "transito",
          pago: "Q 0 según el Catálogo Nacional de Trámites.",
          documento: "", verificacion: "", fuente_id: "F-01" },

        { titulo: "Confirma que el bloqueo se levantó",
          detalle: "Revisa la bitácora de tu trámite en la plataforma de Tránsito hasta que aparezca la resolución.",
          que_llevar: ["El número de trámite"],
          donde: "transito", pago: "",
          documento: "Resolución del Departamento de Tránsito.",
          verificacion: "El bloqueo está levantado únicamente cuando el Departamento de Tránsito lo resuelve.",
          fuente_id: "F-03" }
      ]
    },

    {
      id: "GUIA-TRANSITO-PRESENTAR",
      titulo: "Cómo resolverlo",
      aplica_a: "Ya tienes la orden del juzgado, pero falta presentar la solicitud.",
      pasos: [
        { titulo: "Ten a la mano el oficio original",
          detalle: "El requisito principal es el oficio original de desbloqueo emitido por el juzgado. Sin ese documento no se puede continuar.",
          que_llevar: ["Oficio original de desbloqueo", "Tu DPI"],
          donde: "", pago: "", documento: "", verificacion: "", fuente_id: "F-01" },

        { titulo: "Entra a los trámites en línea del Departamento de Tránsito",
          detalle: "Hay que crear un usuario adjuntando el DPI y confirmar la cuenta por correo electrónico. Si no tienes correo o no puedes hacerlo en línea, el trámite también se puede presentar de forma presencial.",
          que_llevar: ["Tu DPI escaneado o fotografiado", "Un correo electrónico al que tengas acceso"],
          donde: "transito", pago: "", documento: "", verificacion: "", fuente_id: "F-03" },

        { titulo: "Crea la solicitud y adjunta los documentos",
          detalle: "Selecciona una nueva solicitud, llena el formulario y adjunta el oficio de desbloqueo.",
          que_llevar: ["Oficio original de desbloqueo"],
          donde: "transito",
          pago: "Q 0 según el Catálogo Nacional de Trámites.",
          documento: "", verificacion: "", fuente_id: "F-01" },

        { titulo: "Guarda el número de trámite",
          detalle: "Al enviar la solicitud recibirás un número de trámite. Anótalo: es con lo que vas a poder consultar el avance.",
          que_llevar: [], donde: "", pago: "",
          documento: "Número de trámite.", verificacion: "" },

        { titulo: "Confirma que el bloqueo se levantó",
          detalle: "Revisa la bitácora de tu trámite. El Catálogo Nacional de Trámites indica un tiempo de respuesta de 5 días.",
          que_llevar: ["El número de trámite"],
          donde: "transito", pago: "",
          documento: "Resolución del Departamento de Tránsito.",
          verificacion: "El bloqueo está levantado únicamente cuando el Departamento de Tránsito lo resuelve.",
          fuente_id: "F-01" }
      ]
    },

    {
      id: "GUIA-TRANSITO-ESPERA",
      titulo: "Cómo resolverlo",
      aplica_a: "Ya presentaste la solicitud y está en revisión.",
      pasos: [
        { titulo: "Ahora le toca al Departamento de Tránsito",
          detalle: "Tu solicitud está presentada. En este momento no tienes que hacer ningún trámite nuevo.",
          que_llevar: [], donde: "", pago: "", documento: "", verificacion: "" },

        { titulo: "Revisa la bitácora de tu trámite",
          detalle: "En la plataforma de trámites en línea aparece el avance de tu solicitud. Consúltala con tu número de trámite.",
          que_llevar: ["El número de trámite"],
          donde: "transito", pago: "", documento: "", verificacion: "", fuente_id: "F-03" },

        { titulo: "Si te hacen una observación, corrígela",
          detalle: "Si la solicitud necesita una corrección, te lo indicarán. En ese momento el siguiente paso vuelve a ser tuyo: corrige lo señalado y vuelve a presentar. Lo que ya hiciste no se pierde.",
          que_llevar: ["El documento o dato que te pidan corregir"],
          donde: "transito", pago: "", documento: "", verificacion: "" },

        { titulo: "Confirma que el bloqueo se levantó",
          detalle: "El caso se cierra cuando aparece la resolución. El Catálogo Nacional de Trámites indica un tiempo de respuesta de 5 días.",
          que_llevar: ["El número de trámite"],
          donde: "transito", pago: "",
          documento: "Resolución del Departamento de Tránsito.",
          verificacion: "El bloqueo está levantado únicamente cuando el Departamento de Tránsito lo resuelve.",
          fuente_id: "F-01" }
      ]
    },

    {
      id: "GUIA-LEVANTADO",
      titulo: "Qué hacer ahora",
      aplica_a: "Casos ya resueltos.",
      pasos: [
        { titulo: "Guarda la resolución",
          detalle: "Conserva la resolución del Departamento de Tránsito. Es tu respaldo de que este bloqueo fue levantado.",
          que_llevar: [], donde: "", pago: "",
          documento: "Resolución del Departamento de Tránsito.", verificacion: "" },

        { titulo: "Revisa si te queda algún otro bloqueo",
          detalle: "Que este caso esté resuelto no significa que no existan otros. Revisa la pantalla de tu licencia para ver si te queda alguno activo.",
          que_llevar: [], donde: "", pago: "", documento: "", verificacion: "" }
      ]
    }
  ]
};
