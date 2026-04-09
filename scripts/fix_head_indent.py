from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

for p in ROOT.glob("*.html"):
    t = p.read_text(encoding="utf-8")
    t2 = t.replace("        <link rel=\"icon\"", "    <link rel=\"icon\"")
    t2 = t2.replace("\n<link rel=\"stylesheet\"", "\n    <link rel=\"stylesheet\"")
    if t2 != t:
        p.write_text(t2, encoding="utf-8")
        print(p.name)
