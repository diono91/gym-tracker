# Gym Tracker

Aplicación web para registrar entrenamientos de gimnasio, seguir la evolución de cada
ejercicio y mantener la constancia mediante un sistema de gamificación con monstruos.

Funciona como PWA: se puede instalar en el móvil y usar sin conexión. Todos los datos
se guardan en el navegador (`localStorage`), no hay servidor ni cuenta de usuario.

## Características

- **Hoy** — registro de series por día de entrenamiento (Día 1–5), con calentamiento,
  ejercicios musculares por grupo y estiramientos.
- **Medidas** — peso y medidas corporales con gráfica de evolución.
- **Progreso** — histórico y récords por ejercicio.
- **Calendario** — vista mensual con la calidad de cada día (bueno / mediocre / malo)
  y exportación/importación en Excel.
- **Batalla** — nivel, XP, insignias y un bestiario de 16 monstruos repartidos en cuatro
  elementos, cada uno enfocado en una cualidad del entrenamiento:

  | Elemento | Tema | Cómo se vence |
  |---|---|---|
  | Fuego | Potencia | Subir el peso en más ejercicios |
  | Tierra | Volumen | Añadir series |
  | Viento | Cardio | Más minutos de calentamiento |
  | Agua | Resistencia | Más repeticiones por serie |

  Los monstruos de cada elemento se desbloquean en orden, solo se puede elegir un rival
  al día, y al derrotar a los 16 se desbloquea el Dragón Anciano.

## Uso

No requiere compilación ni dependencias. Basta con servir la carpeta:

```bash
python3 -m http.server 8642
```

Y abrir `http://localhost:8642`.

## Créditos

Las ilustraciones de los ejercicios proceden de
[free-exercise-db](https://github.com/yuhonas/free-exercise-db), publicado bajo
Unlicense (dominio público). Detalles y convención de nombres en
[icons/ejercicios/CREDITOS.md](icons/ejercicios/CREDITOS.md).

## Tecnología

HTML, CSS y JavaScript sin frameworks. Chart.js para las gráficas y SheetJS para la
exportación a Excel, ambos vía CDN. Service worker con estrategia *network-first* para
el código y *cache-first* para imágenes y librerías.
