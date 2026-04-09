from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OLD = 'href="aves.html">Aves</a>'
NEW = 'href="aves.html">Fauna</a>'

for p in ROOT.glob("*.html"):
    t = p.read_text(encoding="utf-8")
    if OLD not in t:
        continue
    p.write_text(t.replace(OLD, NEW), encoding="utf-8")
    print(p.name)
