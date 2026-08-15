"""Regenera icons/ejercicios/index.json con las imágenes disponibles.

Ejecutar tras añadir o quitar imágenes de ejercicio:
    python3 tools/generar-indice-imagenes.py
"""
import json, os, io

BASE = os.path.join(os.path.dirname(__file__), '..', 'icons', 'ejercicios')
paths = []
for muscle in sorted(os.listdir(BASE)):
    d = os.path.join(BASE, muscle)
    if not os.path.isdir(d):
        continue
    for f in sorted(os.listdir(d)):
        if f.lower().endswith('.webp'):
            paths.append(f'{muscle}/{f[:-5]}')

out = os.path.join(BASE, 'index.json')
io.open(out, 'w', encoding='utf-8').write(json.dumps(paths, ensure_ascii=False, indent=0))
print(f'{len(paths)} imágenes indexadas en icons/ejercicios/index.json')
