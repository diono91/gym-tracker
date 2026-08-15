# Imágenes de ejercicios

Fuente: **[free-exercise-db](https://github.com/yuhonas/free-exercise-db)**
Licencia: **Unlicense** (dominio público — sin restricciones de uso ni obligación de atribuir).

Cada archivo combina las dos posiciones del movimiento (inicio y final) apiladas
en vertical sobre lienzo cuadrado de 600×600, en WebP.

## Convención de nombres

```
icons/ejercicios/<Músculo>/<nombre-del-ejercicio-en-slug>.webp
```

El slug se obtiene del nombre exacto del ejercicio en la app: minúsculas, sin
acentos y con guiones en lugar de espacios y símbolos.

Ejemplo: `Aperturas en máquina (Pec Deck)` → `Pecho/aperturas-en-maquina-pec-deck.webp`

## Añadir o cambiar una imagen

1. Deja el archivo con el nombre correcto en la carpeta del músculo.
2. Regenera el índice:

```
python3 tools/generar-indice-imagenes.py
```

El índice (`index.json`) es lo que usa la app para saber qué ejercicios tienen
imagen y mostrar el botón de información solo en esos. Si un ejercicio no la
tiene, no aparece el botón y la app funciona con normalidad.

## Estado actual

88 de los 89 ejercicios del catálogo tienen imagen.

Sin imagen: **Hollow Hold** (Core) — no existe un equivalente en el catálogo de
origen. Se puede sustituir el ejercicio en la app por otro que sí la tenga, o
dejarlo sin ilustración.
