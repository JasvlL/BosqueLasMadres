"""Añade favicon y apple-touch-icon (mismo logo) a todos los HTML."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MARKER = '<link rel="stylesheet" href="css/styles.css">'
SNIPPET = (
    "    <link rel=\"icon\" type=\"image/png\" href=\"assets/images/aves/image183.png\">\n"
    "    <link rel=\"apple-touch-icon\" href=\"assets/images/aves/image183.png\">\n"
)


def main() -> None:
    for p in ROOT.glob("*.html"):
        t = p.read_text(encoding="utf-8")
        if 'rel="icon"' in t:
            continue
        if MARKER not in t:
            print("skip (no marker):", p.name)
            continue
        t = t.replace(MARKER, SNIPPET + MARKER, 1)
        p.write_text(t, encoding="utf-8")
        print("favicon:", p.name)


if __name__ == "__main__":
    main()
