#!/usr/bin/env python3
"""
Genera los archivos CSV a partir de js/datos.js.

Para qué sirve: los CSV son la forma cómoda de EDITAR los datos de la demo en
Excel o Google Sheets, y son también lo que se importaría a Supabase si más
adelante quisieran una base compartida. La web NO lee los CSV: lee datos.js.

Uso:
    python3 generar-csv.py

Requiere Node.js instalado (se usa para leer datos.js sin tener que
reescribirlo en Python).
"""

import csv, json, os, subprocess, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
SALIDA = os.path.join(AQUI, "csv")

# Leemos datos.js con Node y lo convertimos a JSON.
lector = """
var fs = require('fs'), vm = require('vm');
var caja = { window: {} }; caja.window.window = caja.window;
vm.createContext(caja);
vm.runInContext(fs.readFileSync(process.argv[1], 'utf8'), caja);
process.stdout.write(JSON.stringify(caja.window.DATOS));
"""

try:
    crudo = subprocess.check_output(
        ["node", "-e", lector, os.path.join(AQUI, "js", "datos.js")],
        text=True)
except FileNotFoundError:
    sys.exit("Necesitas Node.js instalado para ejecutar este script.")

D = json.loads(crudo)
os.makedirs(SALIDA, exist_ok=True)


def escribir(nombre, columnas, filas):
    ruta = os.path.join(SALIDA, nombre)
    with open(ruta, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=columnas, extrasaction="ignore")
        w.writeheader()
        for fila in filas:
            w.writerow({c: fila.get(c, "") for c in columnas})
    print("  %-24s %3d filas" % (nombre, len(filas)))


print("Generando CSV en orden de carga:\n")

# 1
escribir("1-municipalidades.csv",
         ["id", "nombre", "sitio_url", "telefono_general", "consulta_multas_url", "fuente_id"],
         D["municipalidades"])

# 2
escribir("2-fuentes.csv",
         ["id", "entidad", "titulo", "url", "jurisdiccion", "fecha_consulta", "nota"],
         D["fuentes"])

# 3
escribir("3-juzgados.csv",
         ["id", "municipalidad_id", "nombre", "direccion", "telefono", "extension",
          "horario", "verificacion", "fuente_id", "sitio_url", "nota_verificacion"],
         D["juzgados"])

# 4
escribir("4-ciudadanos.csv",
         ["id", "nombre", "cui_demo", "iniciales", "usuario_demo", "clave_demo"],
         D["ciudadanos"])

# 5
escribir("5-licencias.csv",
         ["id", "ciudadano_id", "numero", "tipo", "fecha_vencimiento"],
         D["licencias"])

# 6 — una fila por PASO de guía
pasos = []
for g in D["guias"]:
    for i, p in enumerate(g["pasos"], start=1):
        pasos.append({
            "id": "%s-P%d" % (g["id"], i),
            "guia_id": g["id"],
            "guia_titulo": g["titulo"],
            "aplica_a": g["aplica_a"],
            "paso_orden": i,
            "paso_titulo": p.get("titulo", ""),
            "paso_detalle": p.get("detalle", ""),
            "paso_que_llevar": " | ".join(p.get("que_llevar", []) or []),
            "paso_donde": p.get("donde", ""),
            "paso_pago": p.get("pago", ""),
            "paso_documento": p.get("documento", ""),
            "paso_verificacion": p.get("verificacion", ""),
            "paso_aviso": p.get("aviso", ""),
            "fuente_id": p.get("fuente_id", ""),
        })
escribir("6-guias.csv",
         ["id", "guia_id", "guia_titulo", "aplica_a", "paso_orden", "paso_titulo",
          "paso_detalle", "paso_que_llevar", "paso_donde", "paso_pago",
          "paso_documento", "paso_verificacion", "paso_aviso", "fuente_id"],
         pasos)

# 7
escribir("7-bloqueos.csv",
         ["id", "ciudadano_id", "municipalidad_id", "juzgado_id", "razon", "estado",
          "subestado", "responsable", "proxima_accion", "detalle", "fecha_registro",
          "ultima_actualizacion", "guia_id", "multa_id"],
         D["bloqueos"])

# 8
escribir("8-historial.csv",
         ["id", "bloqueo_id", "fecha", "titulo", "detalle", "fuente", "estado_resultante"],
         D["historial"])

# 9 — portales públicos de consulta (los que la demo SIMULA, nunca consulta)
escribir("9-portales.csv",
         ["id", "nombre", "lugar", "url", "municipalidad_id", "estado_revision", "nota"],
         D["portales"])

# 10 — catálogo de infracciones con monto base y base legal
#      monto vacío = monto desconocido (NO es 0)
infracciones = []
for i in D["infracciones"]:
    fila = dict(i)
    fila["monto"] = "" if i.get("monto") is None else "%.2f" % i["monto"]
    fila["solo_demo"] = "si" if i.get("solo_demo") else "no"
    infracciones.append(fila)
escribir("10-infracciones.csv",
         ["id", "conducta", "texto_legal", "articulo", "numeral", "monto",
          "verificacion", "nota_verificacion", "nota", "correccion", "fuente_id",
          "solo_demo"],
         infracciones)

# 11 — multas vehiculares ficticias, asociadas a una PLACA (sin datos personales)
escribir("11-multas-demo.csv",
         ["id", "referencia", "placa", "tipo_placa", "municipalidad_id", "portal_id",
          "infraccion_id", "fecha", "estado_pago"],
         D["multas"])

print("""
Listo. Importa en ese mismo orden: cada archivo depende de los anteriores.
Excepción: la columna multa_id de 7-bloqueos apunta a 11-multas-demo; si usas
llaves foráneas, agrégala después de importar el archivo 11.
Recuerda: ningún CSV lleva una columna con la CANTIDAD de bloqueos.
Ese número se cuenta a partir de los registros, para que nunca quede desfasado.""")
