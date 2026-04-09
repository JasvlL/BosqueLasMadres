"""Añade Conteo 2024 y Cuidar la naturaleza a enlaces rápidos del footer si faltan."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OLD = (
    "                        <li><a href=\"aves.html\">Aves</a></li>\n"
    "                        <li><a href=\"proyectos.html\">Proyectos</a></li>\n"
)
NEW = (
    "                        <li><a href=\"conteo-aves-2024.html\">Conteo 2024</a></li>\n"
    "                        <li><a href=\"cuidar-naturaleza.html\">Cuidar la naturaleza</a></li>\n"
    "                        <li><a href=\"aves.html\">Aves</a></li>\n"
    "                        <li><a href=\"proyectos.html\">Proyectos</a></li>\n"
)


def main() -> None:
    skip = {"conteo-aves-2024.html", "cuidar-naturaleza.html"}
    for p in ROOT.glob("*.html"):
        if p.name in skip:
            continue
        t = p.read_text(encoding="utf-8")
        if OLD not in t:
            continue
        t = t.replace(OLD, NEW, 1)
        p.write_text(t, encoding="utf-8")
        print("footer:", p.name)


if __name__ == "__main__":
    main()
