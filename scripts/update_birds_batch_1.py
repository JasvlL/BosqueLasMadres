#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
JSON_PATH = ROOT / "data" / "birds.json"


def main() -> None:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    birds = data["birds"]
    by_id = {b["id"]: b for b in birds}

    def up(id_: str, **kwargs) -> None:
        by_id[id_].update(kwargs)

    up(
        "buteogallus-anthracinus",
        habitat=["bosque", "rio", "manglar", "costa"],
        conservacion="Preocupación Menor (IUCN)",
        descripcion=(
            "Gavilán Cangrejero (Buteogallus anthracinus) es una rapaz asociada a zonas ribereñas y costeras. "
            "Se observa con frecuencia en manglares, estuarios y ríos, donde busca alimento en orillas y claros. "
            "Su presencia suele depender de hábitats acuáticos bien conservados."
        ),
        dieta="Dieta: principalmente cangrejos; también puede consumir peces, anfibios, reptiles e insectos.",
        comportamiento=(
            "Comportamiento: caza desde perchas cercanas al agua y se desplaza a baja altura sobre riberas para capturar presas."
        ),
        fuentes=[
            "https://animaldiversity.org/accounts/Buteogallus_anthracinus/",
            "https://datazone.birdlife.org/species/factsheet/common-black-hawk-buteogallus-anthracinus",
            "https://www.iucnredlist.org/search?query=Buteogallus%20anthracinus&searchType=species",
        ],
    )

    up(
        "buteo-brachyurus",
        habitat=["bosque", "rio", "manglar", "costa", "zonas_abiertas"],
        conservacion="Preocupación Menor (IUCN)",
        descripcion=(
            "Gavilán Colicorto (Buteo brachyurus) es una rapaz que suele verse planeando alto sobre bordes de bosque y zonas abiertas. "
            "Anida en parches de bosque alto cerca del agua, incluyendo manglares y humedales arbolados. "
            "En migración puede registrarse en Costa Rica."
        ),
        dieta="Dieta: principalmente aves pequeñas; también caza reptiles (lagartijas/serpientes), roedores e insectos.",
        comportamiento=(
            "Comportamiento: caza volando/planeando o haciendo 'hover' cerca de bordes de bosque y luego se lanza en picada sobre la presa."
        ),
        fuentes=[
            "https://animaldiversity.org/accounts/Buteo_brachyurus/",
            "https://www.iucnredlist.org/search?query=Buteo%20brachyurus&searchType=species",
            "https://ebird.org/search?query=Buteo%20brachyurus",
        ],
    )

    up(
        "buteo-platypterus",
        habitat=["bosque", "rio", "zonas_abiertas"],
        conservacion="Preocupación Menor (IUCN)",
        descripcion=(
            "Gavilán Pollero (Buteo platypterus) es una rapaz de bosques densos (caducifolios o mixtos) que utiliza claros y bordes para forrajear. "
            "En época no reproductiva ocupa bosques en Mesoamérica y puede encontrarse desde tierras bajas hasta elevaciones medias. "
            "Es conocido por sus migraciones masivas."
        ),
        dieta="Dieta: carnívoro oportunista; consume insectos, anfibios, reptiles, pequeños mamíferos y aves según la disponibilidad.",
        comportamiento=(
            "Comportamiento: generalmente solitario y territorial, pero durante migración forma grandes bandadas ('kettles') que aprovechan corrientes térmicas."
        ),
        fuentes=[
            "https://animaldiversity.org/accounts/Buteo_platypterus/",
            "https://www.iucnredlist.org/search?query=Buteo%20platypterus&searchType=species",
            "https://ebird.org/search?query=Buteo%20platypterus",
        ],
    )

    up(
        "buteo-plagiatus",
        habitat=["bosque", "rio", "zonas_abiertas"],
        conservacion="Preocupación Menor (IUCN)",
        descripcion=(
            "Gavilán Gris (Buteo plagiatus) suele habitar bosques abiertos, matorrales y bordes de bosque, especialmente cerca de ríos o arroyos. "
            "Es una rapaz frecuente en paisajes con claros y arbolado disperso. "
            "Se reconoce por su caza activa desde posaderos."
        ),
        dieta="Dieta: principalmente reptiles (lagartijas y serpientes); también puede tomar otros vertebrados pequeños.",
        comportamiento=(
            "Comportamiento: acecha desde ramas/posaderos y realiza vuelos cortos y rápidos hacia el suelo o troncos para capturar presas."
        ),
        fuentes=[
            "https://birdsoftheworld.org/bow/species/gryhaw2/cur/introduction",
            "https://www.iucnredlist.org/search?query=Buteo%20plagiatus&searchType=species",
            "https://ebird.org/search?query=Buteo%20plagiatus",
        ],
    )

    up(
        "pandion-haliaetus",
        habitat=["rio", "costa"],
        conservacion="Preocupación Menor (IUCN)",
        descripcion=(
            "Águila Pescadora (Pandion haliaetus) es una rapaz especializada en capturar peces. "
            "Se asocia a ríos, lagunas y zonas costeras con aguas someras donde puede pescar. "
            "Suele anidar en estructuras elevadas y es migratoria en gran parte de su rango."
        ),
        dieta="Dieta: casi exclusivamente peces vivos, capturados con zambullidas desde el vuelo.",
        comportamiento=(
            "Comportamiento: patrulla cuerpos de agua y se lanza en picada para atrapar peces; puede concentrarse en sitios de pesca durante la migración."
        ),
        fuentes=[
            "https://www.iucnredlist.org/species/pdf/206628879",
            "https://www.iucnredlist.org/search?query=Pandion%20haliaetus&searchType=species",
            "https://ebird.org/search?query=Pandion%20haliaetus",
        ],
    )

    # Mantener orden preferido para `habitat`
    order = ["bosque", "rio", "manglar", "costa", "zonas_abiertas", "jardines"]
    for b in birds:
        if isinstance(b.get("habitat"), list):
            b["habitat"] = sorted(dict.fromkeys(b["habitat"]), key=lambda x: order.index(x) if x in order else 999)

    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print("OK: actualizadas 5 especies (batch 1)")


if __name__ == "__main__":
    main()

