"""Quita Otras Especies y Voluntariado del menú en todos los HTML del sitio."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAT = re.compile(
    r'^\s*<li><a href="(otras-especies|voluntariado)\.html"[^>]*>.*?</a></li>\s*\n',
    re.MULTILINE,
)


def main() -> None:
    for p in ROOT.glob("*.html"):
        t = p.read_text(encoding="utf-8")
        n = PAT.sub("", t)
        if n != t:
            p.write_text(n, encoding="utf-8")
            print("updated", p.name)


if __name__ == "__main__":
    main()
