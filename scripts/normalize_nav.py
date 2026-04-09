"""Reemplaza el bloque <ul class="nav-menu"> por un menú consistente y ordenado."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

ITEMS = [
    ("index.html", "Inicio"),
    ("sobre-nosotros.html", "Sobre Nosotros"),
    ("sobre-el-corredor.html", "Sobre el Corredor"),
    ("conteo-aves-2024.html", "Conteo 2024"),
    ("aves.html", "Fauna"),
    ("mapa.html", "Mapa"),
    ("proyectos.html", "Proyectos"),
    ("cuidar-naturaleza.html", "Cuidar la naturaleza"),
    ("creditos.html", "Créditos"),
]

# Qué enlace lleva class="active" en cada archivo
ACTIVE: dict[str, str] = {
    "index.html": "index.html",
    "sobre-nosotros.html": "sobre-nosotros.html",
    "sobre-el-corredor.html": "sobre-el-corredor.html",
    "conteo-aves-2024.html": "conteo-aves-2024.html",
    "aves.html": "aves.html",
    "ave-detalle.html": "aves.html",
    "mapa.html": "mapa.html",
    "galeria.html": "index.html",
    "proyectos.html": "proyectos.html",
    "cuidar-naturaleza.html": "cuidar-naturaleza.html",
    "creditos.html": "creditos.html",
    "voluntariado.html": "index.html",
    "otras-especies.html": "index.html",
}

UL_PATTERN = re.compile(
    r'<ul class="nav-menu">.*?</ul>\s*\n\s*</nav>',
    re.DOTALL,
)


def nav_html(active_href: str) -> str:
    lis = []
    for href, label in ITEMS:
        if href == active_href:
            lis.append(f'                    <li><a href="{href}" class="active">{label}</a></li>')
        else:
            lis.append(f'                    <li><a href="{href}">{label}</a></li>')
    lis.append(
        '                    <li><button class="theme-toggle" aria-label="Cambiar tema" '
        'title="Modo oscuro/claro">🌙</button></li>'
    )
    inner = "\n".join(lis)
    return f'                <ul class="nav-menu">\n{inner}\n                </ul>\n            </nav>'


def main() -> None:
    for p in ROOT.glob("*.html"):
        t = p.read_text(encoding="utf-8")
        if not re.search(UL_PATTERN, t):
            continue
        active = ACTIVE.get(p.name, "index.html")
        new_ul = nav_html(active)
        t2, n = UL_PATTERN.subn(new_ul, t, count=1)
        if n:
            p.write_text(t2, encoding="utf-8")
            print("ok", p.name, "active=", active)


if __name__ == "__main__":
    main()
