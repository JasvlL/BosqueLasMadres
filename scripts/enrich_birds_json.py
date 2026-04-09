#!/usr/bin/env python3
"""
Enriquece data/birds.json con:
- vocabulario controlado de habitat
- textos cortos y uniformes (descripcion/dieta/comportamiento)
- fuentes por especie (búsqueda directa por nombre científico)

No hace web-scraping ni llamadas a APIs: solo agrega enlaces verificables
para que luego puedas refinar la ficha especie-por-especie con evidencia.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Dict, List, Tuple
from urllib.parse import quote_plus


ROOT = Path(__file__).resolve().parents[1]
JSON_PATH = ROOT / "data" / "birds.json"

# Vocabulario controlado para filtros
HABITAT_VOCAB = {
    "bosque",
    "rio",
    "manglar",
    "costa",
    "zonas_abiertas",
    "jardines",
}


def sources_for(scientific_name: str) -> List[str]:
    q = quote_plus(scientific_name)
    return [
        f"https://ebird.org/search?query={q}",
        f"https://www.allaboutbirds.org/?s={q}",
        f"https://www.iucnredlist.org/search?query={q}&searchType=species",
    ]


def normalize_habitat(habitats: List[str]) -> List[str]:
    # Mantener solo vocabulario controlado; si queda vacío, asumir bosque.
    out = []
    for h in habitats or []:
        if h in HABITAT_VOCAB:
            out.append(h)
    if not out:
        out = ["bosque"]
    # Estable y sin duplicados, preservando orden
    seen = set()
    uniq = []
    for h in out:
        if h not in seen:
            uniq.append(h)
            seen.add(h)
    return uniq


def short_templates(bird: Dict) -> Tuple[str, str, str]:
    nombre = bird.get("nombreComun", "Esta especie")
    sci = bird.get("nombreCientifico", "")
    orden = bird.get("orden", "")
    familia = bird.get("familia", "")
    habs = bird.get("habitat", [])

    hab_text = ", ".join(habs) if isinstance(habs, list) and habs else "bosque"
    # Plantillas deliberadamente conservadoras (sin detalles finos no verificados)
    descripcion = (
        f"{nombre} ({sci}) es un ave registrada en el Corredor Biológico Bosque Las Madres. "
        f"Pertenece al orden {orden} y la familia {familia}. "
        f"Suele observarse en ambientes como: {hab_text}."
    ).strip()
    dieta = "Dieta: pendiente de completar con evidencia (ver fuentes)."
    comportamiento = "Comportamiento: pendiente de completar con evidencia (ver fuentes)."
    return descripcion, dieta, comportamiento


def main() -> None:
    if not JSON_PATH.exists():
        raise SystemExit(f"No existe el archivo: {JSON_PATH}")

    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    birds = data.get("birds", [])
    if not isinstance(birds, list):
        raise SystemExit("Estructura inválida: data['birds'] no es una lista")

    updated = 0
    for bird in birds:
        if not isinstance(bird, dict):
            continue

        bird["habitat"] = normalize_habitat(bird.get("habitat", []))

        # Textos cortos y uniformes
        bird["descripcion"], bird["dieta"], bird["comportamiento"] = short_templates(bird)

        # Conservación: dejar como pendiente si estaba genérica.
        if bird.get("conservacion") in (None, "", "Preocupación Menor"):
            bird["conservacion"] = "Pendiente (ver IUCN en fuentes)"

        # Fuentes verificables por ave
        sci = bird.get("nombreCientifico")
        if sci:
            bird["fuentes"] = sources_for(sci)
        else:
            bird["fuentes"] = []

        updated += 1

    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"OK: actualizadas {updated} especies en {JSON_PATH}")


if __name__ == "__main__":
    main()

