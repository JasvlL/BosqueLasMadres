#!/usr/bin/env python3
"""
Actualiza las fuentes de cada ave con links directos a:
  1. Wikipedia en español  (https://es.wikipedia.org/wiki/Nombre_científico)
  2. AllAboutBirds         (https://www.allaboutbirds.org/guide/EnglishName/overview)
  3. eBird species page    (https://ebird.org/species/<code>)

Para eBird usamos un diccionario con los códigos de 6 letras de cada especie.
"""
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
JSON_PATH = ROOT / "data" / "birds.json"

# ── Códigos eBird (6 letras, fuente: eBird taxonomy 2024) ─────────────────────
# formato: "id-en-json": "código-ebird"
EBIRD_CODES: dict[str, str] = {
    "buteogallus-anthracinus":   "comblh1",
    "buteo-brachyurus":          "sthawk1",
    "buteo-platypterus":         "brwhaw",
    "buteo-plagiatus":           "gryhaw2",
    "buteo-swainsoni":           "swahaw",
    "harpagus-bidentatus":       "dotkit1",
    "leptodon-cayanensis":       "grhkit1",
    "rupornis-magnirostris":     "roahaw",
    "pandion-haliaetus":         "osprey",
    "cairina-moschata":          "musduc",
    "chaetura-vauxi":            "vauxsw",
    "panyptila-cayennensis":     "lestts1",
    "streptoprocne-zonaris":     "whcsw1",
    "anthracothorax-prevostii":  "grbman1",
    "amazilia-tzacatl":          "ruthum",
    "archilochus-colubris":      "rthhum",
    "florisuga-mellivora":       "whnjac1",
    "glaucis-aeneus":            "bronhe1",
    "heliothryx-barroti":        "pucfai1",
    "phaetornis-longirostris":   "lobihe1",
    "polyerata-amabilis":        "blchum1",
    "thalurania-colombica":      "crownm2",
    "phaethornis-striigularis":  "strher1",
    "cathartes-aura":            "turvul",
    "coragyps-atratus":          "blkvul",
    "sarcoramphus-papa":         "kinvul1",
    "nyctidromus-albicollis":    "compau",
    "charadrius-semipalmatus":   "semplo",
    "pluvialis-squatarola":      "bkbplo",
    "jacana-spinosa":            "norjac1",
    "thalasseus-maximus":        "roytern",
    "himantopus-mexicanus":      "bknsti",
    "actitis-macularius":        "spotsa",
    "arenaria-interpres":        "rudtur",
    "calidris-alba":             "sander",
    "claravis-pretiosa":         "blugrd1",
    "columbina-talpacoti":       "rugdov",
    "leptotila-verreauxi":       "whitdo",
    "patagioenas-cayennensis":   "palpio1",
    "patagioenas-flavirostris":  "rebpio1",
    "patagioenas-nigrirostris":  "shbpio1",
    "chloroceryle-americana":    "greker1",
    "megaceryle-torquata":       "rinker",
    "electron-platyrhynchum":    "brbmot1",
    "crotophaga-sulcirostris":   "grbani",
    "piaya-cayana":              "squcuc1",
    "daptrius-chimachima":       "yehcar1",
    "caracara-plancus":          "creker1",
    "falco-columbarius":         "merlin",
    "falco-peregrinus":          "perfal",
    "falco-rufigularis":         "batfal1",
    "herpetotheres-cachinnans":  "laufal1",
    "micrastur-mirandollei":     "slbfof1",
    "malacoptila-panamensis":    "whwpuf1",
    "notharchus-hyperrhynchus":  "whnpuf1",
    "penelope-purpurascens":     "cregua1",
    "aramides-cajaneus":         "grywor1",
    "laterallus-albigularis":    "whtcra1",
    "caryothraustes-poliogaster":"blfgro1",
    "driophlox-fuscicauda":      "retant2",
    "pheucticus-ludovicianus":   "robgro",
    "piranga-olivacea":          "scatan",
    "piranga-rubra":             "sumtan",
    "cyanocorax-affinis":        "blcjay1",
    "cyanocorax-morio":          "browja1",
    "carpodectes-nitidus":       "snwcot1",
    "querula-purpurata":         "purfru1",
    "euphonia-goldi":            "olbeuph1",
    "euphonia-luteicapilla":     "yelceuph1",
    "dendrocolaptes-sanctithomae":"nobbwc1",
    "lepidocolaptes-souleyetii": "strwc2",
    "xiphorhynchus-susurrans":   "cocwc1",
    "stelgidopteryx-ruficollis": "sourws",
    "stelgidopteryx-serripennis":"norrsw",
    "tachycineta-albilinea":     "manswa1",
    "cacicus-uropygialis":       "scrca1",
    "dives-dives":               "melbl1",
    "icterus-galbula":           "balori",
    "icterus-prosthemelas":      "bkcori1",
    "psarocolius-wagleri":       "cheoro1",
    "psarocolius-montezuma":     "monoro1",
    "quiscalus-mexicanus":       "grtgra",
    "mimus-gilvus":              "tropmo1",
    "geothlypis-poliocephala":   "greyth1",
    "leiothlypis-peregrina":     "tenwar",
    "parkesia-motacilla":        "louwar",
    "parkesia-noveboracensis":   "norwat",
    "protonotaria-citrea":       "prowar",
    "setophaga-ruticilla":       "amered",
    "setophaga-castanea":        "baywar",
    "setophaga-fusca":           "bltwar",
    "setophaga-pensylvanica":    "cheswa",
    "setophaga-petechia":        "yelwar",
    "vermivora-chrysoptera":     "golwar",
    "arremonops-conirostris":    "blsspa1",
    "arremon-aurantiirostris":   "orbspa1",
    "manacus-candei":            "whcman1",
    "polioptila-bilineata":      "whbgna1",
    "cymbilaimus-lineatus":      "fasant1",
    "microrhopias-quixensis":    "dotwna1",
    "poliocrania-exsul":         "chbant2",
    "thamnophilus-atrinucha":    "wecant1",
    "coereba-flaveola":          "banaqu",
    "cyanerpes-lucidus":         "shihon1",
    "dacnis-cayana":             "bludan1",
    "dacnis-venusta":            "scadan1",
    "saltator-atriceps":         "blhsal1",
    "saltator-maximus":          "bufsal1",
    "saltator-grandis":          "cinsal1",
    "ramphocelus-passerini":     "scrtan2",
    "sporophila-corvina":        "varsd1",
    "stilpnia-larvata":          "gohtan1",
    "tangara-inornata":          "plctan1",
    "thraupis-episcopus":        "bugtan",
    "thraupis-palmarum":         "paltan1",
    "tiaris-olivaceus":          "yefgra1",
    "volatinia-jacarina":        "blbgra1",
    "tytira-semifasciata":       "mastic1",
    "pachyramphus-cinnamomeus":  "cinbec1",
    "campylorhynchus-zonatus":   "babwre1",
    "cantorchilus-nigricapillus":"baywre1",
    "cantorchilus-thoracicus":   "stbwre1",
    "henicorhina-leucosticta":   "whbwrn1",
    "troglodytes-aedon":         "hoswre",
    "catharus-minimus":          "gratre",
    "catharus-ustulatus":        "swathr",
    "turdus-grayi":              "clathe",
    "attila-spadiceus":          "briatt1",
    "colonia-colonus":           "lotyr1",
    "contopus-virens":           "easwoo",
    "contopus-bogotensis":       "trpewee",
    "contopus-sordidulus":       "weswoo",
    "empidonax-virescens":       "acafly",
    "empidonax-alnorum":         "aldfly",
    "empidonax-minimus":         "leafly",
    "myiornis-atricapillus":     "blcpyt1",
    "myiozetetes-granadensis":   "gryflt1",
    "myiozetetes-similis":       "socfly1",
    "myiarchus-tuberculifer":    "ducfly",
    "myiarchus-crinitus":        "grcfly",
    "megarynchus-pitangua":      "boatfl1",
    "pitangus-sulphuratus":      "grekis",
    "oncostoma-cinereigulare":   "norben1",
    "ornithion-brunneicapillus": "brctyr1",
    "todirostrum-nigriceps":     "blhtfl1",
    "todirostrum-cinereum":      "comtfl1",
    "tyrannus-melancholicus":    "trokin",
    "zimmerius-parvus":          "mistyr1",
    "pachysylvia-decurtata":     "lesgre1",
    "vireo-flavifrons":          "yethvi",
    "vireo-olivaceus":           "reevir",
    "ardea-alba":                "greegr",
    "ardea-herodias":            "grbher",
    "ardea-ibis":                "categr",
    "butorides-virescens":       "grehen",
    "cochlearius-cochlearius":   "boaher1",
    "egretta-caerulea":          "libher",
    "egretta-thula":             "snoegr",
    "egretta-tricolor":          "triher",
    "pelecanus-occidentalis":    "brwpel",
    "campephilus-guatemalensis": "pabwoo1",
    "melanerpes-pucherani":      "blcwoo2",
    "pteroglossus-torquatus":    "colaac1",
    "ramphastos-sulfuratus":     "kbbtou1",
    "ramphastos-ambiguus":       "ytbtou1",
    "amazona-autumnalis":        "relpar1",
    "amazona-farinosa":          "meapar1",
    "brotogeris-jugularis":      "orccpa1",
    "eupsittula-nana":           "aztpar1",
    "psittacara-finschi":        "crfpar1",
    "pionus-senilis":            "whcpar1",
    "pionus-menstruus":          "bhupar1",
    "glaucidium-griseiceps":     "campo1",
    "anhinga-anhinga":           "anhinh",
    "fregata-magnificens":       "magfri",
    "nannopterum-brasilianum":   "neocor",
    "crypturellus-soui":         "littin1",
}

# AllAboutBirds: usa el nombre en inglés con underscores
def aab_url(english_name: str) -> str:
    slug = english_name.replace("'", "").replace("-", "_").replace(" ", "_")
    return f"https://www.allaboutbirds.org/guide/{slug}/overview"

# Wikipedia en español: usa el nombre científico con underscores
def wiki_es_url(sci_name: str) -> str:
    slug = sci_name.replace(" ", "_")
    return f"https://es.wikipedia.org/wiki/{slug}"

def main() -> None:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    birds = data["birds"]

    updated = 0
    for b in birds:
        bid = b.get("id", "")
        sci = b.get("nombreCientifico", "")
        eng = b.get("nombreIngles", "")

        code = EBIRD_CODES.get(bid)
        ebird = (
            f"https://ebird.org/species/{code}"
            if code
            else f"https://ebird.org/search?query={sci.replace(' ', '+')}"
        )

        fuentes = [
            ebird,
            aab_url(eng) if eng else f"https://www.allaboutbirds.org/?s={sci.replace(' ', '+')}",
            wiki_es_url(sci),
        ]
        b["fuentes"] = fuentes
        updated += 1

    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"OK: fuentes actualizadas para {updated} aves")
    sin_codigo = [b["id"] for b in birds if not EBIRD_CODES.get(b["id"])]
    if sin_codigo:
        print(f"Aves sin código eBird directo ({len(sin_codigo)}): {sin_codigo}")
    else:
        print("Todas las aves tienen código eBird directo.")

if __name__ == "__main__":
    main()
