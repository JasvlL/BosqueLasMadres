from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BAD = "                                <ul class=\"nav-menu\">"
GOOD = "                <ul class=\"nav-menu\">"

for p in ROOT.glob("*.html"):
    t = p.read_text(encoding="utf-8")
    if BAD not in t:
        continue
    p.write_text(t.replace(BAD, GOOD), encoding="utf-8")
    print(p.name)
