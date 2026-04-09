"""Inserta enlaces Conteo 2024 y Cuidar la naturaleza antes de Créditos en todos los HTML."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SNIPPET = (
    '                    <li><a href="conteo-aves-2024.html">Conteo 2024</a></li>\n'
    '                    <li><a href="cuidar-naturaleza.html">Cuidar la naturaleza</a></li>\n'
)


def main() -> None:
    pat = re.compile(
        r'^(\s*)(<li><a href="creditos\.html")',
        re.MULTILINE,
    )

    for p in ROOT.glob("*.html"):
        t = p.read_text(encoding="utf-8")
        if "conteo-aves-2024.html" in t:
            continue
        n, c = pat.subn(lambda m: f"{m.group(1)}{SNIPPET}{m.group(2)}", t, count=1)
        if c:
            p.write_text(n, encoding="utf-8")
            print("nav+:", p.name)


if __name__ == "__main__":
    main()
