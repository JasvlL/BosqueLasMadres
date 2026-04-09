from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
M = '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
INS = M + '\n    <meta name="theme-color" content="#1e6a6d">'

for p in ROOT.glob("*.html"):
    t = p.read_text(encoding="utf-8")
    if "theme-color" in t:
        continue
    if M not in t:
        continue
    p.write_text(t.replace(M, INS, 1), encoding="utf-8")
    print(p.name)
