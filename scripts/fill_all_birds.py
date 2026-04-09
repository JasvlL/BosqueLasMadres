#!/usr/bin/env python3
"""
Rellena todas las fichas del birds.json con datos basados en
Cornell Lab, eBird, BirdLife/IUCN y fuentes regionales.
Ejecutar: python scripts/fill_all_birds.py
"""
from __future__ import annotations
import json
from pathlib import Path
from urllib.parse import quote_plus

ROOT = Path(__file__).resolve().parents[1]
JSON_PATH = ROOT / "data" / "birds.json"

H = "bosque"
R = "rio"
M = "manglar"
C = "costa"
Z = "zonas_abiertas"
J = "jardines"

def src(sci: str) -> list[str]:
    q = quote_plus(sci)
    return [
        f"https://ebird.org/search?query={q}",
        f"https://www.allaboutbirds.org/?s={q}",
        f"https://www.iucnredlist.org/search?query={q}&searchType=species",
    ]

# id -> (habitat, conservacion, descripcion, dieta, comportamiento)
DATA: dict[str, tuple] = {
    # ── Accipitriformes ─────────────────────────────────────────────────────
    "buteogallus-anthracinus": (
        [H, R, M, C],
        "Preocupación Menor (IUCN)",
        "Gavilán Cangrejero (Buteogallus anthracinus) es una rapaz de tamaño mediano-grande asociada a riberas, manglares y estuarios en tierras bajas del Caribe costarricense. Su plumaje es casi totalmente negro con una franja blanca en la cola. Es residente permanente en el corredor.",
        "Dieta: cangrejos (su presa principal), peces, anfibios, reptiles e invertebrados acuáticos.",
        "Comportamiento: caza desde perchas bajas junto al agua, descendiendo para capturar cangrejos en las orillas.",
    ),
    "buteo-brachyurus": (
        [H, Z, R],
        "Preocupación Menor (IUCN)",
        "Gavilán Colicorto (Buteo brachyurus) es una rapaz compacta con cola notablemente corta. Habita bordes de bosque húmedo y zonas abiertas en tierras bajas y piedemonte. Existen morfos claro y oscuro; el morfo claro es el más frecuente en Costa Rica.",
        "Dieta: principalmente aves pequeñas; también lagartijas, serpientes, roedores e insectos.",
        "Comportamiento: caza en vuelo, planeando alto sobre el dosel o el borde de bosque y luego se lanza en picada sobre la presa.",
    ),
    "buteo-platypterus": (
        [H, Z, R],
        "Preocupación Menor (IUCN)",
        "Gavilán Pollero (Buteo platypterus) es una rapaz migratoria presente en Costa Rica principalmente durante la temporada no reproductiva. Habita bosques con claros, bordes y zonas arboladas. Es famoso por sus migraciones masivas que pasan por el país.",
        "Dieta: insectos, anfibios, reptiles, pequeños mamíferos y aves; la composición varía según la estación.",
        "Comportamiento: solitario y territorial en la temporada reproductiva; durante migración forma enormes bandadas (\"kettles\") que aprovechan corrientes térmicas.",
    ),
    "buteo-plagiatus": (
        [H, R, Z],
        "Preocupación Menor (IUCN)",
        "Gavilán Gris (Buteo plagiatus) es una rapaz de tamaño mediano con dorso gris y pecho finamente barrado. Habita bosques abiertos, sabanas arboladas y orillas de ríos o arroyos en tierras bajas.",
        "Dieta: principalmente reptiles (lagartijas y serpientes); complementa con roedores y otros vertebrados pequeños.",
        "Comportamiento: caza activa desde posaderos; realiza vuelos cortos y rápidos hacia el suelo para capturar presas.",
    ),
    "buteo-swainsoni": (
        [Z, H],
        "Preocupación Menor (IUCN)",
        "Gavilán de Swainson (Buteo swainsoni) es una rapaz migratoria de larga distancia que transita por Costa Rica en grandes bandadas durante sus movimientos entre Norteamérica y Sudamérica. Se ve sobre zonas abiertas y bordes de bosque.",
        "Dieta: en migración consume principalmente insectos (langostas, grillos); en reproducción también pequeños mamíferos y aves.",
        "Comportamiento: migrador excepcional que forma columnas de miles de individuos aprovechando corrientes de viento sobre tierras bajas.",
    ),
    "harpagus-bidentatus": (
        [H],
        "Preocupación Menor (IUCN)",
        "Gavilán Gorgirrayado (Harpagus bidentatus) es una rapaz pequeña del bosque húmedo tropical. Se distingue por las rayas rojizas en la garganta y el pecho. Vive en el interior y bordes del bosque maduro en tierras bajas del Caribe.",
        "Dieta: principalmente lagartijas y ciertos insectos grandes; ocasionalmente pequeños vertebrados.",
        "Comportamiento: discreta y difícil de ver; se desplaza a media altura dentro del bosque, a menudo siguiendo bandadas mixtas de aves.",
    ),
    "leptodon-cayanensis": (
        [H, M],
        "Preocupación Menor (IUCN)",
        "Gavilán Cabecigris (Leptodon cayanensis) es una rapaz de dosel poco conocida con cabeza grisácea y cuello blanco. Habita bosques húmedos maduros y bordes de bosque en tierras bajas, incluyendo manglares.",
        "Dieta: principalmente nidos de avispas y abejas (larvas e imagos); también reptiles y ranas.",
        "Comportamiento: se mueve lentamente entre el dosel; generalmente silencioso y difícil de detectar.",
    ),
    "rupornis-magnirostris": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Gavilán Chapulinero (Rupornis magnirostris) es la rapaz más común y de distribución más amplia en Costa Rica. Tolera bien los ambientes modificados por el hombre y se adapta a bordes de bosque, jardines y paisajes agropecuarios.",
        "Dieta: lagartijas, serpientes, ranas, pequeños roedores, insectos y cangrejos terrestres.",
        "Comportamiento: caza desde posaderos visibles; su llamado agudo y repetitivo es muy característico del paisaje rural costarricense.",
    ),
    "pandion-haliaetus": (
        [R, C],
        "Preocupación Menor (IUCN)",
        "Águila Pescadora (Pandion haliaetus) es una rapaz acuática de distribución casi mundial que visita Costa Rica como migradora. Se observa sobre ríos, embalses, estuarios y costas. Posee adaptaciones únicas para capturar peces con las patas.",
        "Dieta: casi exclusivamente peces vivos, capturados mediante zambullidas espectaculares desde vuelo.",
        "Comportamiento: patrulla cuerpos de agua a baja altura; se cierne y luego se lanza en picada; suele posarse en ramas o postes junto al agua.",
    ),
    # ── Anseriformes ────────────────────────────────────────────────────────
    "cairina-moschata": (
        [H, R, M],
        "Preocupación Menor (IUCN)",
        "Pato Real (Cairina moschata) es el pato silvestre más grande de Centroamérica, con plumaje negro brillante con reflejos verdes y una carúncula roja en la cara. Habita ríos, lagunas y manglares en tierras bajas húmedas del Caribe.",
        "Dieta: omnívoro; consume plantas acuáticas, semillas, peces pequeños, insectos y crustáceos.",
        "Comportamiento: se desplaza en parejas o grupos pequeños; se posa en ramas sobre el agua; es más activo al amanecer y al atardecer.",
    ),
    # ── Apodiformes – Apodidae ───────────────────────────────────────────────
    "chaetura-vauxi": (
        [Z, H, J],
        "Preocupación Menor (IUCN)",
        "Vencejo Común (Chaetura vauxi) es uno de los vencejos más pequeños de Costa Rica, con silueta de cigarro y alas muy anguladas. Se ve con frecuencia en cielos abiertos sobre bosques, ríos y zonas urbanas, a menudo en grupos.",
        "Dieta: exclusivamente insectos capturados en vuelo (moscas, hormigas voladoras, coleópteros).",
        "Comportamiento: pasa prácticamente toda su vida volando; anida en huecos de árboles viejos o estructuras artificiales; forma grupos numerosos.",
    ),
    "panyptila-cayennensis": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Vencejo Tijereta Menor (Panyptila cayennensis) es un vencejo esbelto con cola profundamente ahorquillada, inconfundible en vuelo. Habita sobre bosques tropicales húmedos, bordes de bosque y zonas abiertas en tierras bajas.",
        "Dieta: insectos capturados en vuelo a gran altura.",
        "Comportamiento: vuelo ágil y acrobático; construye nidos tubulares de fibras vegetales pegados verticalmente en acantilados o árboles.",
    ),
    "streptoprocne-zonaris": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Vencejo Cuelliblanco (Streptoprocne zonaris) es el vencejo más grande de Costa Rica, reconocible por su collar blanco completo. Vive en grupos ruidosos que sobrevuelan montañas, valles y zonas costeras.",
        "Dieta: insectos capturados en vuelo.",
        "Comportamiento: forma bandadas muy numerosas y ruidosas; anida en cavidades de acantilados o detrás de cascadas.",
    ),
    # ── Apodiformes – Trochilidae ────────────────────────────────────────────
    "anthracothorax-prevostii": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Manguito Pechiverde (Anthracothorax prevostii) es un colibrí de tamaño mediano con pico largo y curvado. El macho tiene pecho verde brillante con una franja oscura ventral. Habita bordes de bosque, jardines y áreas abiertas con flores en las tierras bajas del Caribe.",
        "Dieta: néctar de flores (especialmente flores tubulares); complementa con insectos pequeños.",
        "Comportamiento: territorial cerca de plantas en flor; el macho defiende activamente los recursos de néctar.",
    ),
    "amazilia-tzacatl": (
        [H, J, Z, M],
        "Preocupación Menor (IUCN)",
        "Colibrí Rabirufo (Amazilia tzacatl) es uno de los colibríes más comunes del Caribe costarricense, con cola rojiza característica. Habita una gran variedad de ambientes: jardines, bordes de bosque, manglares y cultivos con flores.",
        "Dieta: néctar de una gran diversidad de flores; también captura insectos y arañas.",
        "Comportamiento: muy activo y agresivo en la defensa de flores; se le ve en casi cualquier ambiente modificado con flores disponibles.",
    ),
    "archilochus-colubris": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Colibrí Garganta de Rubí (Archilochus colubris) es el único colibrí migratorio que anida en Norteamérica. El macho tiene garganta iridiscente roja. Visita Costa Rica durante la temporada no reproductiva (octubre–abril).",
        "Dieta: néctar y pequeños insectos capturados al vuelo.",
        "Comportamiento: solitario y territorial; el macho defiende las flores de néctar; migra solo atravesando el Golfo de México.",
    ),
    "florisuga-mellivora": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Jacobino Nuquiblanco (Florisuga mellivora) es un colibrí grande con cabeza azul oscura y nuca blanca brillante en el macho. Vive en bordes de bosque húmedo y jardines arbolados de las tierras bajas.",
        "Dieta: néctar, especialmente de flores en el dosel y bordes de bosque; también insectos.",
        "Comportamiento: visita flores altas del dosel; se mueve entre parches florales; el macho es territorial y muy vistoso.",
    ),
    "glaucis-aeneus": (
        [H, M],
        "Preocupación Menor (IUCN)",
        "Ermitaño Bronceado (Glaucis aeneus) es un colibrí ermitaño de tierras bajas con plumaje bronceado y pico curvado. Habita el interior y bordes del bosque húmedo del Caribe y manglares. Es especie emblemática del corredor.",
        "Dieta: néctar de heliconias y otras flores de bosque; también pequeños insectos y arañas.",
        "Comportamiento: sigue una ruta fija de flores (tramplining); el macho canta en leks para atraer hembras.",
    ),
    "heliothryx-barroti": (
        [H],
        "Preocupación Menor (IUCN)",
        "Colibrí Picopunzón (Heliothryx barroti) es un colibrí de pico corto y recto con cola larga y blanca en la punta. Habita el dosel y bordes del bosque húmedo tropical en tierras bajas del Caribe.",
        "Dieta: néctar; también roba néctar perforando la base de flores tubulares; captura insectos.",
        "Comportamiento: vive en el dosel alto; el macho es llamativo en vuelo por su cola blanca; se mueve activamente entre las flores del dosel.",
    ),
    "phaetornis-longirostris": (
        [H],
        "Preocupación Menor (IUCN)",
        "Ermitaño Colilargo (Phaethornis longirostris) es uno de los ermitaños más grandes de Costa Rica, con pico muy largo y curvado y cola con plumas centrales alargadas. Habita el sotobosque del bosque húmedo y secundario maduro.",
        "Dieta: néctar de heliconias, gingers y otras flores del sotobosque; también arañas e insectos.",
        "Comportamiento: sigue rutas repetidas entre flores del sotobosque; los machos se congregan en leks para cantar con voz repetitiva.",
    ),
    "polyerata-amabilis": (
        [H, J],
        "Preocupación Menor (IUCN)",
        "Colibrí Pechiazul (Polyerata amabilis) es un colibrí de pecho azul brillante en el macho, característico de las tierras bajas del Caribe costarricense. Habita bordes de bosque, jardines y áreas arboladas.",
        "Dieta: néctar y pequeños artrópodos capturados en el follaje.",
        "Comportamiento: territorial en parches de flores; el macho defiende recursos de néctar activamente.",
    ),
    "thalurania-colombica": (
        [H, J],
        "Preocupación Menor (IUCN)",
        "Colibrí Ninfa Verde-Violeta (Thalurania colombica) es un colibrí de tamaño mediano cuyo macho presenta corona verde brillante y vientre violeta. Habita bordes de bosque húmedo y jardines arbolados en tierras bajas.",
        "Dieta: néctar de diversas flores; también insectos y arañas del follaje.",
        "Comportamiento: activo y territorial; vuela rápido entre arbustos con flores; el macho hace despliegues de vuelo muy llamativos.",
    ),
    "phaethornis-striigularis": (
        [H, M],
        "Preocupación Menor (IUCN)",
        "Ermitaño Enano (Phaethornis striigularis) es el más pequeño de los ermitaños de Costa Rica, con pico curvado y rayas en la cara. Vive en el sotobosque del bosque húmedo y manglares en tierras bajas del Caribe.",
        "Dieta: néctar de flores pequeñas del sotobosque (Costus, Heliconia pequeñas); también artrópodos.",
        "Comportamiento: recorre rutas fijas de flores a baja altura en el sotobosque; los machos cantan en pequeños leks.",
    ),
    # ── Cathartiformes ──────────────────────────────────────────────────────
    "cathartes-aura": (
        [H, Z, C, M],
        "Preocupación Menor (IUCN)",
        "Zopilote Cabecirrojo (Cathartes aura) es el buitre americano más distribuido, reconocible por su cabeza roja desnuda y su vuelo en V característica. Presente en casi todo tipo de ambiente en Costa Rica, desde la costa hasta las montañas.",
        "Dieta: carroña (cadáveres de animales); localiza los cuerpos principalmente por olfato, capacidad rara entre las aves.",
        "Comportamiento: vuela planeo largas distancias con mínimo esfuerzo aprovechando térmicas; a menudo se ve en grupos sobre carroña.",
    ),
    "coragyps-atratus": (
        [H, Z, C, M, J],
        "Preocupación Menor (IUCN)",
        "Zopilote Negro (Coragyps atratus) es el buitre más abundante de Costa Rica, con plumaje totalmente negro y la cabeza grisácea. Se adapta muy bien a ambientes perturbados, incluyendo basureros y ciudades.",
        "Dieta: carroña; localiza los cadáveres por vista; frecuentemente sigue al Zopilote Cabecirrojo que los detecta primero por olfato.",
        "Comportamiento: forma grupos grandes en corrales de termales; muy gregario; compite agresivamente por los cadáveres.",
    ),
    "sarcoramphus-papa": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Zopilote Rey (Sarcoramphus papa) es el buitre americano más vistoso, con plumaje blanco y negro y pico y cara multicolores. Habita bosques primarios y secundarios maduros de tierras bajas en ambas vertientes.",
        "Dieta: carroña; localiza los cuerpos por olfato/vista; domina a otros buitres en los festines.",
        "Comportamiento: suele verse sobrevolando solo o en pareja sobre el dosel; baja a los cadáveres primero por su rango dominante.",
    ),
    # ── Caprimulgiformes ────────────────────────────────────────────────────
    "nyctidromus-albicollis": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Cuyeo (Nyctidromus albicollis) es un chotacabras de hábitos nocturnos con plumaje críptico marrón y gris. Su llamada onomopéyica \"cuyeo\" es uno de los sonidos más icónicos de las noches tropicales costarricenses.",
        "Dieta: insectos capturados en vuelo nocturno (polillas, escarabajos, moscas).",
        "Comportamiento: descansa inmóvil en el suelo durante el día; al anochecer caza insectos con vuelo ágil; sus ojos brillan rojo en la luz.",
    ),
    # ── Charadriiformes ─────────────────────────────────────────────────────
    "charadrius-semipalmatus": (
        [C, R],
        "Preocupación Menor (IUCN)",
        "Chorlitejo Semipalmado (Charadrius semipalmatus) es una pequeña ave playera migratoria con un collar negro parcial y pico naranja con punta oscura. Visita playas, estuarios y bancos de lodo de Costa Rica durante su migración y en invernada.",
        "Dieta: invertebrados pequeños (gusanos, crustáceos, insectos) que pica del sustrato húmedo.",
        "Comportamiento: corre y se detiene repetidamente mientras forrajea; en migración forma bandadas mixtas con otros playeros.",
    ),
    "pluvialis-squatarola": (
        [C, R],
        "Preocupación Menor (IUCN)",
        "Chorlito Gris (Pluvialis squatarola) es un chorlito grande y robusto de plumaje gris jaspeado en plumaje de invierno. Visita costas y estuarios de Costa Rica durante la migración y en invernada (octubre–abril).",
        "Dieta: invertebrados bentónicos (poliquetos, crustáceos, moluscos) que extrae del fango.",
        "Comportamiento: solitario o en grupos pequeños; corre y pica el sustrato de forma característica; emite un silbido melancólico de tres notas.",
    ),
    "jacana-spinosa": (
        [R],
        "Preocupación Menor (IUCN)",
        "Jacana Centroamericana (Jacana spinosa) es un ave de humedales con dedos muy largos que le permiten caminar sobre hojas flotantes. Posee un escudo frontal amarillo brillante y espuelas en las alas.",
        "Dieta: insectos, arañas, pequeños crustáceos y semillas que recoge de la vegetación acuática.",
        "Comportamiento: el macho incuba los huevos y cuida a los pollos (poliandria); la hembra defiende el territorio; camina sobre lenteja de agua y otras plantas flotantes.",
    ),
    "thalasseus-maximus": (
        [C, R],
        "Preocupación Menor (IUCN)",
        "Pagaza Real (Thalasseus maximus) es el gaviotín más grande del mundo, con pico anaranjado y cresta negra en época reproductiva. Se observa en costas del Pacífico y el Caribe de Costa Rica durante la temporada no reproductiva.",
        "Dieta: peces que captura zambulléndose en picada desde el vuelo.",
        "Comportamiento: vuela lento sobre el agua con el pico apuntando hacia abajo; se zambulle verticalmente; forma grupos en playas y estuarios.",
    ),
    "himantopus-mexicanus": (
        [R, C],
        "Preocupación Menor (IUCN)",
        "Cigüeñuela Cuellinegra (Himantopus mexicanus) es inconfundible por sus largas patas rosadas, contrastando con el negro del dorso y blanco del vientre. Habita charcas, pantanos, arrozales y costas de baja profundidad.",
        "Dieta: insectos acuáticos, crustáceos, pequeños peces y moluscos que pica del agua somera.",
        "Comportamiento: muy ruidosa y agresiva en la defensa del nido; forma colonias pequeñas; camina con elegancia en aguas someras.",
    ),
    "actitis-macularius": (
        [R, C],
        "Preocupación Menor (IUCN)",
        "Andarríos Maculado (Actitis macularius) es un playero migratorio pequeño y activo, reconocible por su comportamiento de mecer la cola arriba y abajo constantemente. Se observa en orillas de ríos, lagos y manglares.",
        "Dieta: insectos acuáticos, gusanos, crustáceos y peces pequeños.",
        "Comportamiento: solitario; camina entre las piedras de las orillas de ríos balanceando la cola; vuela bajo con aleteos característicos.",
    ),
    "arenaria-interpres": (
        [C],
        "Preocupación Menor (IUCN)",
        "Vuelvepiedras Rojizo (Arenaria interpres) es un playero robusto que voltea piedras y algas para buscar alimento. Su plumaje de invierno es pardo jaspeado con un patrón facial llamativo. Visita costas rocosas y arenosas.",
        "Dieta: invertebrados que se esconden bajo piedras, algas y detritos (cangrejos, insectos, moluscos).",
        "Comportamiento: usa el pico para voltear objetos del sustrato; se desplaza de forma activa y bulliciosa en grupos.",
    ),
    "calidris-alba": (
        [C],
        "Preocupación Menor (IUCN)",
        "Playero Arenero (Calidris alba) es un playero pálido que corre en grupo persiguiendo y huyendo de las olas en las playas arenosas. Su plumaje blanco lo distingue fácilmente de otros playeros.",
        "Dieta: pequeños invertebrados (anfípodos, insectos, gusanos) que captura en la zona de rompiente.",
        "Comportamiento: forma bandadas muy coordinadas que corren en la orilla de la playa siguiendo las olas.",
    ),
    # ── Columbiformes ───────────────────────────────────────────────────────
    "claravis-pretiosa": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Tortolita Azulada (Claravis pretiosa) es una palomita de suelo pequeña y discreta; el macho es azul-grisáceo con puntos oscuros en las alas y la hembra es parda. Habita bordes de bosque, claros con bambú y áreas arboladas.",
        "Dieta: semillas, especialmente de bambú y gramíneas; también pequeños frutos.",
        "Comportamiento: se mueve sigilosamente por el suelo en pareja o grupos pequeños; difícil de observar; su presencia a menudo solo se detecta por el canto.",
    ),
    "columbina-talpacoti": (
        [Z, J, H],
        "Preocupación Menor (IUCN)",
        "Tortolita Rojiza (Columbina talpacoti) es la paloma más pequeña y común de Costa Rica, de plumaje canela-rojizo. Se adapta perfectamente a jardines, cultivos y áreas urbanas.",
        "Dieta: semillas pequeñas que recoge del suelo.",
        "Comportamiento: muy gregaria y confiada cerca del ser humano; se mueve en bandadas sobre suelos descubiertos; el macho arrulla incesantemente.",
    ),
    "leptotila-verreauxi": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Paloma Coliblanca (Leptotila verreauxi) es una paloma de tamaño mediano que vive principalmente en el suelo. Tiene partes inferiores blancas y cola con puntas blancas visibles en vuelo. Habita bordes de bosque, jardines y zonas arboladas.",
        "Dieta: semillas, pequeños frutos y algunos invertebrados que busca en el suelo.",
        "Comportamiento: solitaria o en parejas; camina por el suelo bajo la vegetación densa; su llamada es un «uh-whooo» suave y melancólico.",
    ),
    "patagioenas-cayennensis": (
        [H, Z, M],
        "Preocupación Menor (IUCN)",
        "Paloma Colorada (Patagioenas cayennensis) es una paloma grande de coloración vinosa en el pecho y gris en el dorso. Vive en copas de árboles en bosques abiertos, manglares y zonas arboladas de tierras bajas.",
        "Dieta: frutos y semillas que consume en el dosel de los árboles.",
        "Comportamiento: se mueve en grupos por el dosel; muy sonora al amanecer y al atardecer; forma grandes grupos en dormideros.",
    ),
    "patagioenas-flavirostris": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Paloma Piquirroja (Patagioenas flavirostris) es una paloma grande de color vinoso con pico rojo en la base. Vive en bosques y zonas arboladas; es especialmente abundante en el Caribe costarricense.",
        "Dieta: frutos y semillas tomados principalmente del dosel.",
        "Comportamiento: gregaria; forma bandadas que pueden ser numerosas; arrulla desde el dosel al amanecer.",
    ),
    "patagioenas-nigrirostris": (
        [H],
        "Preocupación Menor (IUCN)",
        "Paloma Piquicorta (Patagioenas nigrirostris) es una paloma oscura con pico corto de color oscuro que habita principalmente en el interior del bosque húmedo maduro. Es la menos común de las palomas arborícolas del Caribe.",
        "Dieta: frutos y semillas de árboles del bosque.",
        "Comportamiento: solitaria o en parejas dentro del bosque denso; se detecta mejor por el canto.",
    ),
    # ── Coraciiformes ───────────────────────────────────────────────────────
    "chloroceryle-americana": (
        [R, M],
        "Preocupación Menor (IUCN)",
        "Martín Pescador Verde (Chloroceryle americana) es el más pequeño de los martines pescadores en Costa Rica, con dorso verde metálico y pecho castaño en el macho. Habita ríos, quebradas y manglares en tierras bajas.",
        "Dieta: peces pequeños y camarones capturados zambulléndose desde posaderos sobre el agua.",
        "Comportamiento: territorial a lo largo de tramos de río; solitario; vuela bajo y rápido a ras del agua.",
    ),
    "megaceryle-torquata": (
        [R, C, M],
        "Preocupación Menor (IUCN)",
        "Martín Pescador Collarejo (Megaceryle torquata) es el más grande de los martines pescadores de Costa Rica, de plumaje azul pizarra y rufoso en el vientre. Habita ríos grandes, estuarios, costas y manglares.",
        "Dieta: peces principalmente; también crustáceos, anfibios y ocasionalmente insectos acuáticos.",
        "Comportamiento: territorial y sonoro; vuela largo sobre el agua antes de zambullirse; se posa en ramas o postes prominentes.",
    ),
    "electron-platyrhynchum": (
        [H],
        "Preocupación Menor (IUCN)",
        "Momoto Piquiancho (Electron platyrhynchum) es un momoto con pico muy ancho y aplanado dorsoventalmente, única característica de la especie. Habita el sotobosque del bosque húmedo maduro en tierras bajas del Caribe.",
        "Dieta: insectos grandes, arañas, lagartijas, ranas y frutos.",
        "Comportamiento: percha quieto y erguido en el sotobosque; mueve la cola péndulo de lado a lado; caza lanzándose desde la percha.",
    ),
    # ── Cuculiformes ────────────────────────────────────────────────────────
    "crotophaga-sulcirostris": (
        [Z, J, H],
        "Preocupación Menor (IUCN)",
        "Garrapatero Piquiestriado (Crotophaga sulcirostris) es un cuco negro brillante con pico alto y comprimido lateralmente con estrías. Muy común en pastizales, áreas ganaderas, jardines y matorrales.",
        "Dieta: insectos grandes (chapulines, grillos), lagartijas, roedores pequeños y garrapatas (de aquí su nombre popular).",
        "Comportamiento: muy gregario; vive en grupos cooperativos que pueden criar juntos en el mismo nido; sigue al ganado para aprovechar los insectos que levantan.",
    ),
    "piaya-cayana": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Cuco Ardilla (Piaya cayana) es un cuco grande y esbelto con plumaje canela en el dorso y cola muy larga con puntas blancas. Habita bordes de bosque, jardines arbolados y el dosel del bosque en tierras bajas.",
        "Dieta: principalmente orugas e insectos grandes; también lagartijas y ranas.",
        "Comportamiento: ágil en la vegetación; salta entre ramas del dosel con movimientos rápidos; su llamado áspero es muy característico.",
    ),
    # ── Falconiformes ───────────────────────────────────────────────────────
    "daptrius-chimachima": (
        [Z, J, H],
        "Preocupación Menor (IUCN)",
        "Caracara Cabecigualdo (Daptrius chimachima) es un falcónido con cara y garganta amarillas y dorso pardo. Muy adaptable; se ve en pastizales, bordes de bosque, zonas arroceras y junto al ganado.",
        "Dieta: oportunista; insectos, garrapatas del ganado, carroña, huevos, pollos y desperdicios.",
        "Comportamiento: gregario en dormideros; con frecuencia se posa sobre el ganado para quitar garrapatas; vuela lento con planeos y aleteos.",
    ),
    "caracara-plancus": (
        [Z, C, H],
        "Preocupación Menor (IUCN)",
        "Caracara Cargahuesos (Caracara plancus) es el caracara más grande de Costa Rica, con cara roja-naranja, corona negra y dorso barrado. Habita áreas abiertas, playones costeros y sabanas.",
        "Dieta: carroña, insectos, reptiles, anfibios, pequeños mamíferos y otros vertebrados pequeños.",
        "Comportamiento: terrícola y oportunista; camina por el suelo buscando alimento; dominante sobre buitres en la carroña.",
    ),
    "falco-columbarius": (
        [Z, C, H],
        "Preocupación Menor (IUCN)",
        "Esmerejón (Falco columbarius) es el halcón más pequeño migratorio que visita Costa Rica; el macho es azul pizarra encima y la hembra es parda. Se ve en zonas abiertas, costas y bordes de bosque durante la invernada.",
        "Dieta: principalmente aves pequeñas capturadas en vuelo; también insectos grandes.",
        "Comportamiento: vuelo veloz y directo; persigue presas en vuelo ágil y veloz; percha en sitios expuestos.",
    ),
    "falco-peregrinus": (
        [Z, C, H, R],
        "Preocupación Menor (IUCN)",
        "Halcón Peregrino (Falco peregrinus) es el ave más rápida del mundo; puede alcanzar más de 300 km/h en picada. Visita Costa Rica como migratorio; se observa en costas, ciudades y zonas abiertas.",
        "Dieta: aves de tamaño pequeño a mediano capturadas en picada a gran velocidad.",
        "Comportamiento: ataca presas en picadas espectaculares desde gran altura; puede criar en edificios de ciudades; muy territorial en sus posaderos.",
    ),
    "falco-rufigularis": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Halcón Cuelliblanco (Falco rufigularis) es un halcón pequeño de bosque con dorso negro y garganta blanca o rojiza. Habita bordes de bosque húmedo, bosques secundarios maduros y zonas arboladas.",
        "Dieta: murciélagos, aves pequeñas e insectos grandes (libélulas, Orthoptera) capturados al atardecer o amanecer.",
        "Comportamiento: caza al amanecer y al atardecer cerca del dosel; muy ágil en vuelo entre árboles; se posa en ramas expuestas.",
    ),
    "herpetotheres-cachinnans": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Guaco (Herpetotheres cachinnans) es un falcónido especializado en comer serpientes, con cara negra como máscara y dorso marrón. Su llamada es un grito fuerte y prolongado inconfundible en el paisaje.",
        "Dieta: serpientes (principal presa); también lagartijas y otros reptiles pequeños.",
        "Comportamiento: caza desde perchas altas y prominentes; su grito fuerte al amanecer y al atardecer es muy característico; se adentra en el bosque para cazar.",
    ),
    "micrastur-mirandollei": (
        [H],
        "Preocupación Menor (IUCN)",
        "Halcón de Monte Dorsigris (Micrastur mirandollei) es un halcón del bosque con dorso gris pizarra y partes inferiores blancas barradas. Habita el interior del bosque húmedo maduro, donde es difícil de observar.",
        "Dieta: aves pequeñas y reptiles que captura en el interior del bosque.",
        "Comportamiento: secreto y difícil de localizar; vuela entre el sotobosque y el dosel; se detecta mejor por su llamada ronca.",
    ),
    # ── Galbuliformes ───────────────────────────────────────────────────────
    "malacoptila-panamensis": (
        [H],
        "Preocupación Menor (IUCN)",
        "Buco Barbón (Malacoptila panamensis) es un buco rechoncho con bigotes o 'barba' de plumas blancas en la cara y plumaje canela rayado. Habita el sotobosque del bosque húmedo y bordes de bosque maduro.",
        "Dieta: insectos grandes, arañas, lagartijas y ocasionalmente ranas que captura desde perchas.",
        "Comportamiento: se queda inmóvil en perchas del sotobosque esperando presas; sorprendentemente fácil de acercarse dada su confianza.",
    ),
    "notharchus-hyperrhynchus": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Buco Collarejo (Notharchus hyperrhynchus) es un buco grande con dorso negro brillante, collar negro y vientre blanco. Habita bordes de bosque y claros arbolados, perchas expuestas en el dosel.",
        "Dieta: insectos grandes (avispas, cucarachas, grillos), lagartijas y arañas.",
        "Comportamiento: permanece muy quieto en perchas expuestas del dosel esperando pasar presas; cava su nido en termiteros o barrancos de tierra.",
    ),
    # ── Galliformes ─────────────────────────────────────────────────────────
    "penelope-purpurascens": (
        [H],
        "Preocupación Menor (IUCN)",
        "Pava Crestada (Penelope purpurascens) es la chachalaca más grande de Costa Rica, con plumaje pardo oscuro, garganta rojiza desnuda y cresta. Habita el bosque húmedo maduro y secundario avanzado, es indicadora de bosques bien conservados.",
        "Dieta: frutos, semillas, flores y hojas del dosel y borde del bosque.",
        "Comportamiento: gregaria en grupos familiares; vocaliza a coro en el amanecer; anda caminando por ramas del dosel en busca de frutos.",
    ),
    # ── Gruiformes ──────────────────────────────────────────────────────────
    "aramides-cajaneus": (
        [R, M, H],
        "Preocupación Menor (IUCN)",
        "Rascón Cuelligrís (Aramides cajaneus) es un rascón grande y vistoso con cuello gris, pecho canela y patas rojizas. Habita orillas de ríos, manglares y humedales boscosos. Se escucha mucho más de lo que se ve.",
        "Dieta: cangrejos, crustáceos, insectos, gusanos, ranas y pequeños vertebrados acuáticos.",
        "Comportamiento: emite fuertes vocalizaciones en grupo (coros) especialmente al amanecer y al atardecer; camina rápidamente entre la vegetación ribereña.",
    ),
    "laterallus-albigularis": (
        [R, H],
        "Preocupación Menor (IUCN)",
        "Polluela Gargantiblanca (Laterallus albigularis) es un rascón pequeño y muy críptico con garganta blanca y flancos barrados. Habita humedales, pastos húmedos y orillas de ríos en tierras bajas.",
        "Dieta: insectos pequeños, arañas y semillas que busca en la vegetación densa.",
        "Comportamiento: extremadamente reservado; rara vez visible; se mueve entre la vegetación densa; su llamada rápida y repetitiva es el mejor modo de detectarlo.",
    ),
    # ── Passeriformes – Cardinalidae ─────────────────────────────────────────
    "caryothraustes-poliogaster": (
        [H],
        "Preocupación Menor (IUCN)",
        "Picogrueso Carinegro (Caryothraustes poliogaster) es un cardinalido de cabeza negra, dorso verde-amarillo y pecho amarillo. Vive en el dosel del bosque húmedo del Caribe, donde se mueve en bandadas mixtas.",
        "Dieta: frutos, semillas e insectos.",
        "Comportamiento: muy gregario; se une a bandadas mixtas del dosel; sus llamadas son constantes mientras el grupo se mueve.",
    ),
    "driophlox-fuscicauda": (
        [H],
        "Preocupación Menor (IUCN)",
        "Tangara Hormiguera Gorgirroja (Driophlox fuscicauda) es un cardinalido del sotobosque con garganta y pecho rojos vívidos. Habita el interior y bordes del bosque húmedo maduro, a menudo siguiendo hormigas guerreras.",
        "Dieta: insectos y artrópodos que captura del suelo o vegetación, especialmente los que huyen de las hormigas guerreras.",
        "Comportamiento: sigue ejércitos de hormigas guerreras junto con otras aves hormigueras; se mueve furtivamente en el sotobosque.",
    ),
    "pheucticus-ludovicianus": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Picogrueso Pechirrosado (Pheucticus ludovicianus) es un pinzón migratorio grande con pico cónico grueso; el macho en plumaje nupcial tiene pecho rosado-rojo. Visita Costa Rica en invernada.",
        "Dieta: insectos, semillas y frutos; en invierno principalmente frutos y semillas.",
        "Comportamiento: canta con hermosas frases musicales; en invernada frecuenta jardines y bordes de bosque junto a grupos mixtos.",
    ),
    "piranga-olivacea": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Tangara Escarlata (Piranga olivacea) es un tánger migratorio; el macho en plumaje nupcial es rojo brillante con alas negras. Visita Costa Rica en migración y como visitante invernal.",
        "Dieta: insectos, avispas y frutos.",
        "Comportamiento: en migración se ve en bordes de bosque y jardines; solitario o en grupos pequeños; busca insectos en el follaje.",
    ),
    "piranga-rubra": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Tangara Veranera (Piranga rubra) es un tánger migratorio cuyo macho adulto es completamente rojo. Visita Costa Rica como migratorio e invernante; es uno de los tángeres más abundantes en el país.",
        "Dieta: insectos (especialmente avispas y abejas) y frutos.",
        "Comportamiento: busca avispas en el follaje del dosel; roba abejas en las entradas de las colmenas; en invernada se ve solo o con bandadas mixtas.",
    ),
    # ── Passeriformes – Corvidae ─────────────────────────────────────────────
    "cyanocorax-affinis": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Urraca Pechinegra (Cyanocorax affinis) es una urraca grande con plumaje azul brillante, pecho negro y cara blanca. Especie endémica-regional, muy carismática, emblema del Conteo 2024 del corredor. Habita bordes de bosque y zonas arboladas.",
        "Dieta: omnívora; frutos, insectos, huevos y pollos de otras aves, lagartijas y carroña.",
        "Comportamiento: muy gregaria en grupos familiares ruidosos; inteligente y curiosa; comunica con gran variedad de vocalizaciones.",
    ),
    "cyanocorax-morio": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Urraca Parda (Cyanocorax morio) es una urraca grande de plumaje pardo oscuro con zona blanca en la cola. Muy ruidosa y común en Costa Rica en bordes de bosque, cafetales y jardines.",
        "Dieta: omnívora; insectos, frutos, lagartijas, huevos y carroña.",
        "Comportamiento: forma grupos familiares bulliciosos; exploran activamente el follaje buscando presas; muy confiada cerca del humano.",
    ),
    # ── Passeriformes – Cotingidae ───────────────────────────────────────────
    "carpodectes-nitidus": (
        [H, M],
        "Preocupación Menor (IUCN)",
        "Cotinga Blanca (Carpodectes nitidus) es una cotinga de las tierras bajas del Caribe cuyo macho es blanco níveo con cara azul-grisácea. Habita el dosel del bosque maduro y manglares; rara y localizada.",
        "Dieta: frutos del dosel, principalmente frutas blandas y bayas.",
        "Comportamiento: se ve solitario o en parejas en el dosel; el macho se sienta muy visible en ramas altas; voz inusualmente silenciosa para ser una cotinga.",
    ),
    "querula-purpurata": (
        [H],
        "Preocupación Menor (IUCN)",
        "Querula Gorgimorada (Querula purpurata) es una cotinga robusta con garganta roja-púrpura vívida en el macho. Habita el dosel del bosque húmedo maduro en tierras bajas del Caribe.",
        "Dieta: principalmente frutos del dosel.",
        "Comportamiento: en grupos ruidosos; el macho despliega la garganta en cortejos; anida en colonias.",
    ),
    # ── Passeriformes – Fringillidae ─────────────────────────────────────────
    "euphonia-goldi": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Eufonia Olivácea (Euphonia goldi) es un pequeño fringílido cuyo macho tiene corona amarilla, dorso gris verdoso y vientre amarillo. Frecuente en bordes de bosque y jardines del Caribe.",
        "Dieta: frutos pequeños (especialmente muérdagos/Loranthus), bayas e insectos.",
        "Comportamiento: vive en parejas o grupos pequeños en el dosel; frecuenta parches de muérdagos; su canto imita sonidos de otras aves.",
    ),
    "euphonia-luteicapilla": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Eufonia Coroniamarilla (Euphonia luteicapilla) es un pequeño fringílido con corona y vientre amarillos brillantes y dorso azul oscuro. Habita el dosel de bosques y jardines arbolados.",
        "Dieta: frutos pequeños y bayas, especialmente de muérdagos; también insectos.",
        "Comportamiento: activo en el dosel y dosel medio; busca muérdagos en fruta; cantor frecuente con trinos variados.",
    ),
    # ── Passeriformes – Furnariidae ──────────────────────────────────────────
    "dendrocolaptes-sanctithomae": (
        [H],
        "Preocupación Menor (IUCN)",
        "Trepador Barreteado (Dendrocolaptes sanctithomae) es un trepador grande con plumaje pardo fuertemente barrado. Habita el interior del bosque húmedo maduro, especialmente frecuenta los ejércitos de hormigas guerreras.",
        "Dieta: insectos y artropodos que huyen de las hormigas guerreras.",
        "Comportamiento: sigue activamente los ejércitos de hormigas guerreras para capturar insectos que escapen; trepa por los troncos con su cola de soporte.",
    ),
    "lepidocolaptes-souleyetii": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Trepador Cabecirrayado (Lepidocolaptes souleyetii) es un trepador delgado con pico curvo y cabeza con rayas crema sobre pardo. Habita bordes de bosque, bosque secundario y jardines arbolados.",
        "Dieta: insectos, arañas y pequeños artrópodos que extrae de la corteza de los árboles.",
        "Comportamiento: trepa en espiral por los troncos en busca de artrópodos; suele unirse a bandadas mixtas de aves.",
    ),
    "xiphorhynchus-susurrans": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Trepador Gorgianteado (Xiphorhynchus susurrans) es un trepador con garganta moteada y pico recto mediano. Habita el sotobosque y estrato medio del bosque húmedo.",
        "Dieta: insectos y artrópodos que extrae de la corteza y hojarasca acumulada.",
        "Comportamiento: trepa por troncos y ramas; su canto es un trino suave y continuo en el sotobosque.",
    ),
    # ── Passeriformes – Hirundinidae ─────────────────────────────────────────
    "stelgidopteryx-ruficollis": (
        [Z, R, H],
        "Preocupación Menor (IUCN)",
        "Golondrina Alirrasposa Sureña (Stelgidopteryx ruficollis) es una golondrina de garganta canela y cola ligeramente ahorquillada. Muy abundante en Costa Rica; se ve en zonas abiertas, ríos y carreteras rurales.",
        "Dieta: insectos capturados en vuelo rasante sobre campos y ríos.",
        "Comportamiento: muy gregaria; forma grupos mixtos con otras golondrinas; anida en huecos de barrancos y estructuras artificiales.",
    ),
    "stelgidopteryx-serripennis": (
        [Z, R, H],
        "Preocupación Menor (IUCN)",
        "Golondrina Alirrasposa Norteña (Stelgidopteryx serripennis) es similar a la Sureña pero migratoria, presente principalmente en temporada no reproductiva. Se mezcla con otras golondrinas sobre campos y ríos.",
        "Dieta: insectos capturados en vuelo.",
        "Comportamiento: migratoria; llega en grupos; con frecuencia se mezcla con grupos de otras golondrinas.",
    ),
    "tachycineta-albilinea": (
        [R, C, M],
        "Preocupación Menor (IUCN)",
        "Golondrina Lomiblanca (Tachycineta albilinea) es una golondrina de lomo blanco brillante, pecho blanco y dorso verde-azulado. Habita muy cerca de ríos, estuarios y costas.",
        "Dieta: insectos capturados en vuelo bajo sobre la superficie del agua.",
        "Comportamiento: vuela muy bajo sobre el agua; anida en huecos de árboles o en grietas cerca del agua; se reúne en grupos sobre el agua.",
    ),
    # ── Passeriformes – Icteridae ────────────────────────────────────────────
    "cacicus-uropygialis": (
        [H, M],
        "Preocupación Menor (IUCN)",
        "Cacique Lomiescarlata (Cacicus uropygialis) es un ictérido negro brillante con parche rojo escarlata en el lomo, muy vistoso en vuelo. Habita el dosel del bosque húmedo maduro del Caribe.",
        "Dieta: insectos, frutos y néctar.",
        "Comportamiento: vive en pequeñas colonias; sus nidos colgantes son frecuentes en lo alto de árboles emergentes; canto complejo y variable.",
    ),
    "dives-dives": (
        [Z, J, H],
        "Preocupación Menor (IUCN)",
        "Tordo Cantor (Dives dives) es un ictérido completamente negro brillante con un canto melodioso y variado. Común en jardines, pastizales con árboles y bordes de bosque de Costa Rica.",
        "Dieta: insectos, gusanos, frutos y semillas; muy oportunista.",
        "Comportamiento: solitario o en parejas; canta desde perchas prominentes con gran variedad de frases; el macho es muy territorial.",
    ),
    "icterus-galbula": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Bolsero Norteño (Icterus galbula) es un bolsero migratorio cuyo macho adulto tiene llamativo plumaje naranja y negro. Visita Costa Rica durante la temporada no reproductiva; frecuenta jardines y bordes de bosque.",
        "Dieta: insectos, néctar y frutos.",
        "Comportamiento: busca insectos entre el follaje; visita flores para tomar néctar; en invernada se ve solitario o en grupos pequeños.",
    ),
    "icterus-prosthemelas": (
        [H, J, Z, M],
        "Preocupación Menor (IUCN)",
        "Bolsero Capuchinegro (Icterus prosthemelas) es un bolsero residente con cabeza, pecho y dorso negros y abdomen naranja vivo. Habita bordes de bosque, jardines, manglares y áreas arboladas del Caribe.",
        "Dieta: néctar, insectos y frutos.",
        "Comportamiento: activo en el follaje buscando flores e insectos; canta frecuentemente con frases melodiosas; construye nidos colgantes.",
    ),
    "psarocolius-wagleri": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Oropéndola Cabecicastaña (Psarocolius wagleri) es una oropéndola con cabeza castaña y plumaje negro; más pequeña que la de Montezuma. Habita el dosel del bosque húmedo y bosque secundario del Caribe.",
        "Dieta: insectos, frutos e invertebrados del dosel.",
        "Comportamiento: colonial; nidifica en colonias colgantes; el macho realiza despliegues acrobáticos con vocalizaciones gurgling.",
    ),
    "psarocolius-montezuma": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Oropéndola de Montezuma (Psarocolius montezuma) es la oropéndola más grande de Costa Rica; tiene cara naranja-azul, pico claro y cuerpo pardo con cola amarilla. Sus colonias con nidos colgantes larguísimos son muy llamativas.",
        "Dieta: frutos grandes, insectos y pequeños vertebrados.",
        "Comportamiento: colonial; construye nidos colgantes de 1–2 m en grupos de 10–30 nidos por árbol; el macho emite un gorjeo líquido e inconfundible.",
    ),
    "quiscalus-mexicanus": (
        [Z, J, R, C],
        "Preocupación Menor (IUCN)",
        "Zanate Grande (Quiscalus mexicanus) es el más grande de los ictéridos en Costa Rica; el macho es negro brillante con cola en forma de quilla. Muy común en ciudades, playas y zonas abiertas.",
        "Dieta: omnívoro; insectos, desperdicios, frutos, granos y pequeños vertebrados.",
        "Comportamiento: extremadamente adaptable al humano; gregario en dormideros urbanos; voz metálica y áspera.",
    ),
    # ── Passeriformes – Mimidae ──────────────────────────────────────────────
    "mimus-gilvus": (
        [Z, J, C],
        "Preocupación Menor (IUCN)",
        "Pájaro Imitador Tropical (Mimus gilvus) es el sinsonte tropical con plumaje gris pálido y vientre blancuzco. Imita los cantos de otras aves. Habita zonas abiertas, jardines, campos y costas.",
        "Dieta: insectos, bayas pequeñas y frutos.",
        "Comportamiento: canta desde posaderos altos con frases variadas que imitan otras aves; muy territorial; activo durante casi todo el día.",
    ),
    # ── Passeriformes – Parulidae ────────────────────────────────────────────
    "geothlypis-poliocephala": (
        [R, H, Z],
        "Preocupación Menor (IUCN)",
        "Antifacito Coronigrís (Geothlypis poliocephala) es una reinita residente con corona gris, máscara negra y pecho amarillo. Habita pastizales húmedos, orillas de ríos y matorrales en tierras bajas.",
        "Dieta: insectos y artrópodos pequeños.",
        "Comportamiento: se mueve furtivamente entre los pastos y arbustos bajos; sube a posarse en tallos altos para cantar.",
    ),
    "leiothlypis-peregrina": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Reinita Verdilla (Leiothlypis peregrina) es una reinita migratoria pequeña, uniforme verde-oliva encima y blancuzca abajo, con supercilio claro. Una de las reinitas más abundantes en Costa Rica durante la invernada.",
        "Dieta: insectos del follaje; en invernada también consume néctar y frutos pequeños.",
        "Comportamiento: muy activa en el follaje; en invernada frecuenta flores de Inga y otras flores amarillas en grupos mixtos.",
    ),
    "parkesia-motacilla": (
        [R, H],
        "Preocupación Menor (IUCN)",
        "Reinita Acuática Piquigrande (Parkesia motacilla) es una reinita migratoria acuática con rayas oscuras abajo y supercilio pálido. Habita orillas de ríos con agua clara y sotobosque ribereño; distintiva por su caminata en orillas.",
        "Dieta: insectos acuáticos y terrestres, artrópodos y pequeños crustáceos.",
        "Comportamiento: camina por las orillas de los ríos inclinando el cuerpo hacia adelante; mueve la cola arriba y abajo; territorial en sus orillas.",
    ),
    "parkesia-noveboracensis": (
        [R, H, M],
        "Preocupación Menor (IUCN)",
        "Reinita Acuática Norteña (Parkesia noveboracensis) es similar a la Piquigrande pero con rayas más uniformes abajo. Migratoria; invernante en Costa Rica en manglares, orillas de ríos y bosque húmedo.",
        "Dieta: insectos acuáticos y artrópodos ribereños.",
        "Comportamiento: frecuenta orillas fangosas; mueve cola; invierna en hábitats variados y húmedos.",
    ),
    "protonotaria-citrea": (
        [R, M, H],
        "Preocupación Menor (IUCN)",
        "Reinita Cabecidorada (Protonotaria citrea) es una de las reinitas más vistosas, con cabeza y pecho amarillo-dorado intenso. Migratoria; invernante en manglares y bosques ribereños del Caribe costarricense.",
        "Dieta: insectos y pequeños invertebrados del follaje y corteza cerca del agua.",
        "Comportamiento: prefiere hábitats boscosos cerca del agua; busca presas en el sotobosque cercano a manglares y ríos.",
    ),
    "setophaga-ruticilla": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Candelita Norteña (Setophaga ruticilla) es una reinita migratoria muy activa; el macho adulto es negro con manchas naranjas y la hembra grisácea con manchas amarillas. Muy común en Costa Rica en invernada.",
        "Dieta: insectos que captura al vuelo desde el follaje.",
        "Comportamiento: muy activa; abre las alas para asustar insectos; persigue presas en el aire; se mueve sin parar en el follaje.",
    ),
    "setophaga-castanea": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Reinita Castaña (Setophaga castanea) es una reinita migratoria con flancos castaños en el macho; el plumaje no nupcial es más apagado. Invernante en Costa Rica en bosques y jardines arbolados.",
        "Dieta: insectos del follaje.",
        "Comportamiento: busca insectos lentamente en el follaje del dosel y dosel medio; se une a bandadas mixtas en invernada.",
    ),
    "setophaga-fusca": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Reinita Gorginaranja (Setophaga fusca) es una reinita migratoria con garganta naranja brillante en el macho y rayas negras vívidas. Visita Costa Rica en migración; buscada por los aficionados.",
        "Dieta: insectos y artrópodos del follaje.",
        "Comportamiento: activa en el dosel; mezcla con bandadas mixtas en migración.",
    ),
    "setophaga-pensylvanica": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Reinita de Costillas Castañas (Setophaga pensylvanica) es una reinita migratoria con flancos castañas y corona amarilla en el macho. Invernante y transeúnte en Costa Rica.",
        "Dieta: insectos del follaje.",
        "Comportamiento: busca insectos activamente en follaje bajo y medio; en invernada frecuenta bordes de bosque y jardines.",
    ),
    "setophaga-petechia": (
        [H, M, J, Z],
        "Preocupación Menor (IUCN)",
        "Reinita Amarilla (Setophaga petechia) es la reinita más amarilla; el macho tiene rayas castañas en el pecho. Habita manglares, jardines, bordes de bosque y zonas riparias; hay poblaciones residentes y migratorias en Costa Rica.",
        "Dieta: insectos y artrópodos del follaje.",
        "Comportamiento: muy activa en arbustos y árboles pequeños; canta frecuentemente; la población de manglar es sedentaria.",
    ),
    "vermivora-chrysoptera": (
        [H, Z, J],
        "Casi Amenazada (IUCN)",
        "Reinita Alidorada (Vermivora chrysoptera) es una reinita migratoria de especial interés de conservación; el macho tiene alas doradas y cara con máscara negra y garganta negra. Visita Costa Rica en migración.",
        "Dieta: insectos del follaje y ramas.",
        "Comportamiento: busca insectos trepando por ramas y rollizos; con frecuencia se une a bandadas mixtas en bosque secundario.",
    ),
    # ── Passeriformes – Passerellidae ────────────────────────────────────────
    "arremonops-conirostris": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Pinzón Cabecilistado (Arremonops conirostris) es un pinzón con rayas negras y blancas en la cabeza y dorso verde oliva. Muy común en orillas de bosque, jardines y matorrales del Caribe.",
        "Dieta: semillas e insectos que busca entre la hojarasca del suelo.",
        "Comportamiento: se mueve en el suelo y la vegetación baja; canta frecuentemente desde posaderos bajos; no muy arisca.",
    ),
    "arremon-aurantiirostris": (
        [H],
        "Preocupación Menor (IUCN)",
        "Pinzón Piquinaranja (Arremon aurantiirostris) es un pinzón del sotobosque con pico naranja brillante, cabeza negra con rayas blancas y pecho con collar negro. Habita el suelo del bosque húmedo maduro.",
        "Dieta: semillas e insectos que busca entre la hojarasca.",
        "Comportamiento: solitario y discreto; forrajea entre la hojarasca del bosque; se detecta mejor por el canto.",
    ),
    # ── Passeriformes – Pipridae ─────────────────────────────────────────────
    "manacus-candei": (
        [H],
        "Preocupación Menor (IUCN)",
        "Saltarín Cuelliblanco (Manacus candei) es un saltarín pequeño; el macho tiene collar y pecho blancos, dorso negro y corona amarilla, y la hembra es verde oliva. Habita el sotobosque del bosque húmedo del Caribe.",
        "Dieta: frutos pequeños y bayas del sotobosque; también insectos.",
        "Comportamiento: los machos realizan despliegues acrobáticos en leks (arenas de cortejo), produciendo sonidos mecánicos con las alas.",
    ),
    # ── Passeriformes – Polioptilidae ────────────────────────────────────────
    "polioptila-bilineata": (
        [H, Z, M],
        "Preocupación Menor (IUCN)",
        "Perlita Tropical (Polioptila bilineata) es un pequeño pájaro activo de cola larga que mantiene levantada frecuentemente; plumaje gris con rayas blancas en la cara. Habita bordes de bosque, manglares y zonas arboladas.",
        "Dieta: insectos y arañas que captura en el follaje.",
        "Comportamiento: muy activo e incansable; agita y levanta la cola constantemente; emite llamadas agudas; se une a bandadas mixtas.",
    ),
    # ── Passeriformes – Thamnophilidae ───────────────────────────────────────
    "cymbilaimus-lineatus": (
        [H, M],
        "Preocupación Menor (IUCN)",
        "Batará Lineado (Cymbilaimus lineatus) es una hormiguera con plumaje finamente barrado negro y blanco. Habita el interior y bordes del bosque húmedo maduro y manglares en las tierras bajas.",
        "Dieta: insectos y artrópodos del follaje denso.",
        "Comportamiento: se mueve lentamente en la vegetación densa; a menudo en parejas; canta desde el interior del bosque.",
    ),
    "microrhopias-quixensis": (
        [H],
        "Preocupación Menor (IUCN)",
        "Hormiguerito Alipunteado (Microrhopias quixensis) es un hormiguerito pequeño con alas negras con puntos blancos; el macho es oscuro y la hembra tiene flancos rojizos. Habita el sotobosque del bosque húmedo.",
        "Dieta: insectos y artrópodos del follaje bajo.",
        "Comportamiento: activo en la vegetación baja; en parejas o grupos mixtos; a veces sigue hormigas guerreras.",
    ),
    "poliocrania-exsul": (
        [H],
        "Preocupación Menor (IUCN)",
        "Hormiguero Dorsicastaño (Poliocrania exsul) es un hormiguero robusto con dorso castaño y partes inferiores con rayas o manchas en el macho. Habita el sotobosque del bosque húmedo maduro; sigue ejércitos de hormigas.",
        "Dieta: insectos que huyen de los ejércitos de hormigas guerreras.",
        "Comportamiento: especialista en seguir hormigas guerreras; vive en parejas territoriales en el sotobosque.",
    ),
    "thamnophilus-atrinucha": (
        [H, Z, M],
        "Preocupación Menor (IUCN)",
        "Batará Plomizo (Thamnophilus atrinucha) es un batará de tamaño mediano; el macho es gris oscuro y la hembra parda. Habita el sotobosque del bosque húmedo y bordes de bosque, incluyendo manglares.",
        "Dieta: insectos y artrópodos del sotobosque.",
        "Comportamiento: en parejas; se mueve deliberadamente entre la vegetación densa; canta en dúo macho y hembra.",
    ),
    # ── Passeriformes – Thraupidae ───────────────────────────────────────────
    "coereba-flaveola": (
        [H, J, Z, M],
        "Preocupación Menor (IUCN)",
        "Reinita Mielera (Coereba flaveola) es un pequeño pájaro con pico curvado, dorso azulado y vientre amarillo. Una de las aves más comunes y visibles del país; habita prácticamente cualquier ambiente con flores.",
        "Dieta: néctar (robado perforando la base de las flores), insectos y frutos pequeños.",
        "Comportamiento: perfora la base de flores para robar néctar sin polinizar; muy activa y generalmente solitaria pero no tímida.",
    ),
    "cyanerpes-lucidus": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Mielero Luciente (Cyanerpes lucidus) es un mielero de patas rosadas con plumaje azul brillante y máscara negra en el macho. Habita dosel del bosque húmedo y jardines arbolados del Caribe.",
        "Dieta: néctar, insectos y frutos pequeños.",
        "Comportamiento: activo en el dosel; visita flores; en grupos mixtos con otras tanágridas.",
    ),
    "dacnis-cayana": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Mielero Azulejo (Dacnis cayana) es un mielero pequeño cuyo macho es azul brillante con máscara negra. Habita el dosel del bosque húmedo y jardines arbolados.",
        "Dieta: insectos, frutos pequeños y néctar.",
        "Comportamiento: activo en el dosel; forma grupos mixtos con otras tanágridas y mieleros.",
    ),
    "dacnis-venusta": (
        [H, J],
        "Preocupación Menor (IUCN)",
        "Mielero Celeste y Negro (Dacnis venusta) es un mielero con plumaje azul celeste y negro en el macho. Habita el dosel del bosque húmedo y bordes de bosque.",
        "Dieta: insectos, frutos pequeños y néctar.",
        "Comportamiento: activo; busca insectos e flores en el dosel; se une a bandadas mixtas.",
    ),
    "saltator-atriceps": (
        [H, Z, J, M],
        "Preocupación Menor (IUCN)",
        "Saltator Cabecinegro (Saltator atriceps) es un saltator grande con cabeza y pecho negros, garganta blanca y dorso verde oliva. Muy común en bordes de bosque, jardines y manglares.",
        "Dieta: frutos, semillas, brotes y flores.",
        "Comportamiento: canta desde perchas prominentes con voz fuerte y melodiosa; vive en parejas o grupos pequeños.",
    ),
    "saltator-maximus": (
        [H, Z, J, M],
        "Preocupación Menor (IUCN)",
        "Saltator Gorgianteado (Saltator maximus) es un saltator con garganta blanca con borde negro, dorso verde y abdomen grisáceo. Habita bordes de bosque, jardines arbolados y manglares.",
        "Dieta: frutos, semillas y brotes.",
        "Comportamiento: vive en parejas o grupos familiares; canta con frases fuertes y variadas; se mezcla con el Cabecinegro.",
    ),
    "saltator-grandis": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Saltador Grisáceo (Saltator grandis) es un saltator de plumaje principalmente gris con garganta blanca. Habita bordes de bosque y zonas arboladas abiertas.",
        "Dieta: frutos, semillas y brotes.",
        "Comportamiento: en parejas o grupos pequeños; activo en arbustos y árboles bajos; canta con notas potentes.",
    ),
    "ramphocelus-passerini": (
        [H, J, Z, M],
        "Preocupación Menor (IUCN)",
        "Tangara Lomo Escarlata (Ramphocelus passerini) es una de las aves más vistosas del Caribe; el macho es negro brillante con lomo rojo-escarlata intenso y pico plateado-azulado. Muy común en jardines y bordes de bosque.",
        "Dieta: frutos, insectos y néctar.",
        "Comportamiento: gregaria; forma grupos en bordes de bosque; el macho exhibe el lomo escarlata en cortejos; muy adaptada a jardines.",
    ),
    "sporophila-corvina": (
        [Z, J, R],
        "Preocupación Menor (IUCN)",
        "Espiguero Variable (Sporophila corvina) es un espiguero con el macho negro brillante y la hembra pardo-canela. Muy común en pastizales, bordes de caminos y matorrales.",
        "Dieta: semillas de gramíneas y otras herbáceas.",
        "Comportamiento: gregario en grupos que forrajean semillas en el suelo y tallos; el macho canta en lo alto de un tallo.",
    ),
    "stilpnia-larvata": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Tangara Siete Colores (Stilpnia larvata) es una de las tanágridas más coloridas de Centroamérica, con múltiples tonos de azul, verde, dorado y negro. Habita bordes de bosque y jardines arbolados.",
        "Dieta: frutos pequeños e insectos del follaje.",
        "Comportamiento: activa en el dosel medio y bajo; forma grupos con otras tanágridas; visita árboles frutales.",
    ),
    "tangara-inornata": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Tangara Cenicienta (Tangara inornata) es una tangara de plumaje gris-azulado uniforme, sin el colorido llamativo de otras tanágridas. Habita el dosel del bosque húmedo y bordes de bosque.",
        "Dieta: frutos pequeños, insectos y artrópodos del follaje.",
        "Comportamiento: en grupos mixtos con otras tanágridas; activa en el dosel.",
    ),
    "thraupis-episcopus": (
        [H, J, Z, M],
        "Preocupación Menor (IUCN)",
        "Tangara Azuleja (Thraupis episcopus) es una de las aves más comunes de Costa Rica, con plumaje azul-gris suave. Ubicua en jardines, parques, bordes de bosque y áreas urbanas.",
        "Dieta: frutos, insectos y néctar; muy oportunista.",
        "Comportamiento: en parejas o grupos; muy adaptada a entornos humanos; canta desde posaderos expuestos.",
    ),
    "thraupis-palmarum": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Tangara Palmera (Thraupis palmarum) es una tangara olivácea con alas y cola azul-negras. Muy asociada a palmeras y espacios arbolados; también frecuente en jardines y bordes de bosque.",
        "Dieta: frutos (especialmente de palmas), insectos y néctar.",
        "Comportamiento: en parejas o grupos; con frecuencia en compañía de la Tangara Azuleja; se alimenta en las infrutescencias de las palmas.",
    ),
    "tiaris-olivaceus": (
        [Z, J, H],
        "Preocupación Menor (IUCN)",
        "Semillerito Cariamarillo (Tiaris olivaceus) es un pequeño pinzón con cara amarilla y negra en el macho y parduzca en la hembra. Habita pastizales, matorrales y jardines.",
        "Dieta: semillas pequeñas de gramíneas y herbáceas.",
        "Comportamiento: gregario; forrajea semillas en el suelo; el macho canta en lo alto de la vegetación.",
    ),
    "volatinia-jacarina": (
        [Z, J, H],
        "Preocupación Menor (IUCN)",
        "Semillero Negro Azulado (Volatinia jacarina) es un espiguero pequeño; el macho en época reproductiva tiene plumaje negro azulado brillante. Muy común en pastizales, cultivos y bordes de caminos.",
        "Dieta: semillas de gramíneas y herbáceas.",
        "Comportamiento: el macho realiza saltos verticales mientras canta para atraer a la hembra; gregario en la temporada no reproductiva.",
    ),
    # ── Passeriformes – Tityridae ────────────────────────────────────────────
    "tytira-semifasciata": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Tityra Carirroja (Tytira semifasciata) es un tityra rechoncho con plumaje blanco, alas y cola negras y cara roja en el macho. Habita el dosel de bosques y zonas arboladas. Su apodo \"Pájaro Chancho\" viene de su gruñido.",
        "Dieta: frutos del dosel e insectos.",
        "Comportamiento: en parejas en el dosel alto; anida en huecos de árboles; emite gruñidos graves.",
    ),
    "pachyramphus-cinnamomeus": (
        [H, Z, M],
        "Preocupación Menor (IUCN)",
        "Cabezón Canelo (Pachyramphus cinnamomeus) es un cabezón robusto de plumaje canela-rojizo brillante en el macho. Habita bordes de bosque húmedo, manglares y dosel de bosque secundario.",
        "Dieta: insectos grandes e invertebrados del follaje; también frutos.",
        "Comportamiento: activo en el dosel y follaje medio; canta con frases claras desde perchas expuestas.",
    ),
    # ── Passeriformes – Troglodytidae ────────────────────────────────────────
    "campylorhynchus-zonatus": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Soterrey Matraquero (Campylorhynchus zonatus) es el soterrey más grande de Costa Rica, con dorso barrado y vientre moteado. Muy gregario y ruidoso; habita bordes de bosque, jardines y zonas arboladas abiertas.",
        "Dieta: insectos, arañas y lagartijas pequeñas que busca en la corteza y follaje.",
        "Comportamiento: vive en grupos familiares cooperativos muy ruidosos; vocalizan en coro; muy activos explorando troncos.",
    ),
    "cantorchilus-nigricapillus": (
        [H, R, M],
        "Preocupación Menor (IUCN)",
        "Soterrey Castaño (Cantorchilus nigricapillus) es un soterrey de color castaño brillante con corona negra. Habita el sotobosque del bosque húmedo ribereño, manglares y orillas de ríos.",
        "Dieta: insectos y artrópodos que busca en la vegetación densa del sotobosque.",
        "Comportamiento: en parejas; muy vocal en dúos macho-hembra; difícil de ver pero fácil de escuchar.",
    ),
    "cantorchilus-thoracicus": (
        [H, R],
        "Preocupación Menor (IUCN)",
        "Soterrey Pechirrayado (Cantorchilus thoracicus) es un soterrey con pecho finamente rayado y corona castaña. Habita el sotobosque ribereño del bosque húmedo del Caribe.",
        "Dieta: insectos y artrópodos del sotobosque.",
        "Comportamiento: en parejas; canta en dúo desde el sotobosque denso; activo cerca del agua.",
    ),
    "henicorhina-leucosticta": (
        [H],
        "Preocupación Menor (IUCN)",
        "Soterrey de Selva Pechiblanco (Henicorhina leucosticta) es un pequeño soterrey del interior del bosque con pecho y garganta blancos finamente moteados. Habita el sotobosque del bosque húmedo maduro.",
        "Dieta: insectos y artrópodos que busca entre la hojarasca.",
        "Comportamiento: muy activo en el sotobosque; canta con frases fuertes y claras desde lo más denso; difícil de ver.",
    ),
    "troglodytes-aedon": (
        [Z, J, H],
        "Preocupación Menor (IUCN)",
        "Soterrey Cucarachero (Troglodytes aedon) es el soterrey más pequeño y común, de plumaje pardo uniforme. Muy adaptado a entornos humanos: jardines, casas y áreas rurales.",
        "Dieta: insectos, arañas y otros artrópodos pequeños.",
        "Comportamiento: muy activo y curioso; anida en huecos, macetas y estructuras humanas; canta sin parar con trinos rapidos.",
    ),
    # ── Passeriformes – Turdidae ─────────────────────────────────────────────
    "catharus-minimus": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Zorzal Carigrís (Catharus minimus) es un zorzal migratorio de tamaño mediano con mejillas grises y pecho con manchas. Visita Costa Rica en migración; habita bordes de bosque y zonas arboladas.",
        "Dieta: insectos, frutos y lombrices.",
        "Comportamiento: discreto; forrajea en el suelo y follaje bajo; en migración forma grupos en árboles con frutos.",
    ),
    "catharus-ustulatus": (
        [H, J, Z],
        "Preocupación Menor (IUCN)",
        "Zorzal de Swainson (Catharus ustulatus) es un zorzal migratorio muy abundante con anillo ocular bien definido. Muy frecuente en Costa Rica durante la migración; es conocido por su hermoso canto espiral.",
        "Dieta: insectos, frutos y lombrices.",
        "Comportamiento: forma grandes grupos en migración; usa los árboles con frutos; canta al amanecer y atardecer durante el paso.",
    ),
    "turdus-grayi": (
        [H, J, Z, M],
        "Preocupación Menor (IUCN)",
        "Mirlo Pardo (Turdus grayi) es el ave nacional de Costa Rica; plumaje pardo-oliva con pico amarillo anaranjado y anillo ocular amarillo. Omnipresente en jardines, parques y bordes de bosque.",
        "Dieta: lombrices, insectos, frutos y bayas.",
        "Comportamiento: muy confiado cerca del humano; canta mañana y tarde con frases musicales variadas; excelente cantor.",
    ),
    # ── Passeriformes – Tyrannidae ───────────────────────────────────────────
    "attila-spadiceus": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Atila Lomiamarilla (Attila spadiceus) es un tirano grande con lomo amarillo vivo y plumaje variable de pardo a rojizo. Habita bosques húmedos y bordes de bosque en tierras bajas. Su llamado en la madrugada es inconfundible.",
        "Dieta: insectos grandes, lagartijas, ranas y frutos.",
        "Comportamiento: vocaliza intensamente al amanecer; se sienta quieto en perchas del dosel y se lanza sobre las presas.",
    ),
    "colonia-colonus": (
        [H, R, Z],
        "Preocupación Menor (IUCN)",
        "Mosquero Coludo (Colonia colonus) es un tirano pequeño muy llamativo: el macho tiene una cola excepcionalmente larga con dos plumas centrales muy elongadas. Vive en bordes de bosque y claros sobre ríos. Especie emblemática del corredor.",
        "Dieta: insectos capturados en vuelo.",
        "Comportamiento: se posa en ramas expuestas sobre el agua o claros; sale en vuelos acrobáticos para cazar insectos; la larga cola lo hace inconfundible.",
    ),
    "contopus-virens": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Pibí Oriental (Contopus virens) es un pequeño tirano migratorio de color gris-oliva uniforme con dos barras alares. Visita Costa Rica en migración e invernada; difícil de identificar sin escuchar su canto.",
        "Dieta: insectos capturados en vuelos cortos desde perchas.",
        "Comportamiento: percha quieto en ramas expuestas del bosque y borde; sale en vuelo corto para capturar insectos.",
    ),
    "contopus-bogotensis": (
        [H, Z, R],
        "Preocupación Menor (IUCN)",
        "Pibí Tropical (Contopus bogotensis) es un pibí residente en Costa Rica, similar al Oriental pero con partes inferiores más pálidas. Habita bordes de bosque y claros con árboles dispersos.",
        "Dieta: insectos capturados en vuelo desde perchas expuestas.",
        "Comportamiento: percha visible en lo alto de ramas secas; sale a cazar en vuelo; vocaliza en el amanecer.",
    ),
    "contopus-sordidulus": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Pibí Occidental (Contopus sordidulus) es un pibí migratorio muy similar al Oriental. Visita Costa Rica en paso; prácticamente indistinguible del C. virens sin el canto.",
        "Dieta: insectos capturados en vuelo.",
        "Comportamiento: percha en ramas expuestas; vuela para capturar insectos; migratorio.",
    ),
    "empidonax-virescens": (
        [H, R],
        "Preocupación Menor (IUCN)",
        "Mosquerito Verdoso (Empidonax virescens) es un pequeño mosquero migratorio con plumaje verde-oliva, barras alares blanquecinas y anillo ocular. Invernante en Costa Rica en bosques ribereños húmedos.",
        "Dieta: insectos capturados en vuelos desde perchas.",
        "Comportamiento: percha quieto en el sotobosque cerca del agua; muy difícil de identificar sin el canto.",
    ),
    "empidonax-alnorum": (
        [H, Z, R],
        "Preocupación Menor (IUCN)",
        "Mosquerito de Charral (Empidonax alnorum) es un mosquero migratorio muy similar a E. traillii; habita bordes de bosque secundario y charrales en invernada.",
        "Dieta: insectos capturados en vuelo.",
        "Comportamiento: migratorio; prácticamente silencioso en invernada; difícil de identificar.",
    ),
    "empidonax-minimus": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Mosquerito Chebec (Empidonax minimus) es el más pequeño del género Empidonax que visita Costa Rica; migratorio e invernante en jardines y bordes de bosque.",
        "Dieta: insectos del follaje capturados en vuelo.",
        "Comportamiento: activo en bordes de bosque y jardines; emite un \"che-bec\" característico en el área de cría.",
    ),
    "myiornis-atricapillus": (
        [H],
        "Preocupación Menor (IUCN)",
        "Mosquerito Colicorto (Myiornis atricapillus) es uno de los pájaros más pequeños de Costa Rica; tiene cola muy corta, corona negra y partes inferiores amarillentas. Habita el sotobosque del bosque húmedo del Caribe.",
        "Dieta: insectos muy pequeños del follaje.",
        "Comportamiento: muy activo; se mueve rápidamente entre el follaje bajo; difícil de seguir con la vista.",
    ),
    "myiozetetes-granadensis": (
        [H, R, Z],
        "Preocupación Menor (IUCN)",
        "Mosquero Cabecigris (Myiozetetes granadensis) es un tirano mediano con cabeza gris, corona anaranjada semioculta y pecho amarillo. Habita bordes de bosque ribereño, manglares y zonas arboladas.",
        "Dieta: insectos, arañas y frutos pequeños.",
        "Comportamiento: activo en perchas a media altura; canta frecuentemente; en parejas o grupos pequeños.",
    ),
    "myiozetetes-similis": (
        [H, J, Z, R],
        "Preocupación Menor (IUCN)",
        "Mosquero Cejiblanco (Myiozetetes similis) es muy similar al Cabecigris pero con supercilio blanco bien marcado. Es uno de los tiranos más comunes de Costa Rica; habita jardines, bordes de bosque y zonas ribereñas.",
        "Dieta: insectos, frutos y lagartijas.",
        "Comportamiento: muy ruidoso y territorial; anida en grupos coloniales; voz chiillona repetitiva.",
    ),
    "myiarchus-tuberculifer": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Copetón Crestioscuro (Myiarchus tuberculifer) es el más pequeño de los Myiarchus en Costa Rica con cresta oscura y pecho grisáceo. Habita bosques y bordes de bosque.",
        "Dieta: insectos y frutos pequeños.",
        "Comportamiento: percha en perchas expuestas; vuela para capturar insectos o frutos; canta desde la percha.",
    ),
    "myiarchus-crinitus": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Copetón Viajero (Myiarchus crinitus) es un copetón migratorio grande con pecho amarillo brillante y rufo en la cola. Invernante en Costa Rica en bordes de bosque y jardines.",
        "Dieta: insectos y frutos.",
        "Comportamiento: percha en posiciones expuestas; activo en el dosel y dosel medio.",
    ),
    "megarynchus-pitangua": (
        [H, Z, R, J],
        "Preocupación Menor (IUCN)",
        "Mosquerón Picudo (Megarynchus pitangua) es un tirano grande con enorme pico curvado, dorso pardo oscuro y abdomen amarillo. Común en bordes de bosque y zonas arboladas.",
        "Dieta: insectos grandes, lagartijas, ranas y frutos.",
        "Comportamiento: caza desde perchas prominentes; ataca presas grandes para el tamaño del ave; canto fuerte y áspero.",
    ),
    "pitangus-sulphuratus": (
        [H, Z, R, J, M],
        "Preocupación Menor (IUCN)",
        "Bienteveo Grande (Pitangus sulphuratus) es uno de los tiranos más conocidos de Latinoamérica; corona amarilla, pecho amarillo, dorso pardo y supercilio blanco. Omnipresente en Costa Rica.",
        "Dieta: omnívoro; insectos, lagartijas, ranas, peces, ratones, frutos y carroña.",
        "Comportamiento: muy ruidoso con su canto repetitivo que da nombre al género; territorial y agresivo; ocupa todo tipo de hábitat modificado.",
    ),
    "oncostoma-cinereigulare": (
        [H],
        "Preocupación Menor (IUCN)",
        "Piquitorcido Norteño (Oncostoma cinereigulare) es un tirano pequeño con pico doblado hacia arriba (único en la familia). Habita el sotobosque denso del bosque húmedo del Caribe.",
        "Dieta: insectos muy pequeños del follaje denso.",
        "Comportamiento: se mueve entre enredaderas y follaje muy denso; muy difícil de ver; más fácil de detectar por el canto.",
    ),
    "ornithion-brunneicapillus": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Mosquerito Gorricafé (Ornithion brunneicapillus) es el tirano más pequeño de Costa Rica con corona café y supercilio blanco marcado. Habita el dosel del bosque húmedo y bordes de bosque.",
        "Dieta: insectos minúsculos del follaje del dosel.",
        "Comportamiento: activo pero pequeñísimo; se mueve en el dosel alto; canto agudo y repetitivo.",
    ),
    "todirostrum-nigriceps": (
        [H],
        "Preocupación Menor (IUCN)",
        "Espatulilla Cabecinegra (Todirostrum nigriceps) es una espatulilla pequeña con cabeza negra y partes inferiores amarillas. Habita el sotobosque y dosel bajo del bosque húmedo maduro.",
        "Dieta: insectos del follaje.",
        "Comportamiento: muy activa; se mueve constantemente en el follaje; canto suave y repetitivo.",
    ),
    "todirostrum-cinereum": (
        [H, Z, J, M],
        "Preocupación Menor (IUCN)",
        "Espatulilla Común (Todirostrum cinereum) es una espatulilla pequeña pero llamativa con pico ancho y plano; dorso gris y vientre amarillo. Muy común en jardines, bordes de bosque y manglares.",
        "Dieta: insectos del follaje.",
        "Comportamiento: muy activa; merodea en el follaje bajo y medio; anida en lugares pequeños y originales (marcos de puertas, tuberías).",
    ),
    "tyrannus-melancholicus": (
        [Z, J, R, H],
        "Preocupación Menor (IUCN)",
        "Tirano Tropical (Tyrannus melancholicus) es el tirano más abundante y visible de Costa Rica; plumaje gris en la cabeza, dorso verdoso y pecho amarillo. Posado en cables y postes es una imagen cotidiana.",
        "Dieta: insectos capturados en vuelo; también frutos.",
        "Comportamiento: territorial y agresivo incluso contra aves mucho más grandes; ataca gavilanes y zanates que se acerquen a su nido.",
    ),
    "zimmerius-parvus": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Mosquerito Cejigrís (Zimmerius parvus) es un pequeño tirano del dosel con dos barras alares y supercilio gris. Habita el dosel del bosque y bordes de bosque.",
        "Dieta: insectos minúsculos e invertebrados del follaje alto.",
        "Comportamiento: activo en el dosel; canto fino y repetitivo; se une a bandadas mixtas.",
    ),
    # ── Passeriformes – Vireonidae ───────────────────────────────────────────
    "pachysylvia-decurtata": (
        [H, Z, M],
        "Preocupación Menor (IUCN)",
        "Verdillo Menudo (Pachysylvia decurtata) es un pequeño víreo de color verde oliva uniforme con pico corto. Habita el dosel del bosque húmedo, bordes de bosque y manglares.",
        "Dieta: insectos del follaje.",
        "Comportamiento: se mueve en el dosel en grupos mixtos; canta frecuentemente.",
    ),
    "vireo-flavifrons": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Vireo Pechiamarillo (Vireo flavifrons) es un víreo migratorio con espectaculares gafas amarillas y pecho amarillo. Invernante y transeúnte en Costa Rica en bosques y jardines.",
        "Dieta: insectos y pequeños frutos.",
        "Comportamiento: lento en el follaje; canta con frases repetitivas; en invernada se mezcla con bandadas mixtas.",
    ),
    "vireo-olivaceus": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Vireo Ojirrojo (Vireo olivaceus) es un víreo migratorio muy común de ojos rojos en adultos y corona gris con raya oscura lateral. Uno de los migradores más numerosos que transitan por Costa Rica.",
        "Dieta: insectos y frutos.",
        "Comportamiento: muy activo; canta sin parar durante la migración; solitario o en grupos pequeños.",
    ),
    # ── Pelecaniformes – Ardeidae ────────────────────────────────────────────
    "ardea-alba": (
        [R, C, M, Z],
        "Preocupación Menor (IUCN)",
        "Garceta Grande (Ardea alba) es la garza blanca más grande de Costa Rica con pico amarillo y patas negras. Habita ríos, lagunas, costas, manglares y arrozales en todo el país.",
        "Dieta: peces, ranas, lagartijas, insectos y cangrejos; muy oportunista.",
        "Comportamiento: caza parada inmóvil esperando presas o caminando lentamente en aguas someras; muy gregaria en dormideros y colonias de nidificación.",
    ),
    "ardea-herodias": (
        [R, C, M],
        "Preocupación Menor (IUCN)",
        "Garzón Azulado (Ardea herodias) es la garza más grande del continente americano, de plumaje gris azulado con cabeza blanca y negra. Visitante migratorio en ríos, estuarios y costas.",
        "Dieta: peces principalmente; también ranas, serpientes, roedores y crustáceos.",
        "Comportamiento: caza parado en aguas someras o caminando lentamente; vuelo lento con cuello replegado en S.",
    ),
    "ardea-ibis": (
        [Z, R, C],
        "Preocupación Menor (IUCN)",
        "Garcilla Bueyera (Ardea ibis) es una garza pequeña blanca de origen africano que sigue al ganado para alimentarse. Muy abundante en pastizales ganaderos, campos y zonas abiertas.",
        "Dieta: insectos y otros invertebrados levantados por el ganado u otras grandes herbívoros; también lagartijas.",
        "Comportamiento: sigue directamente al ganado; gregaria; forma grandes colonias de nidificación mezcladas con otras garzas.",
    ),
    "butorides-virescens": (
        [R, M, C],
        "Preocupación Menor (IUCN)",
        "Garcilla Verde (Butorides virescens) es una garza pequeña de dorso verdoso metálico con espalda azul-gris y partes inferiores grises. Habita ríos, manglares y costas con vegetación.",
        "Dieta: peces pequeños, ranas, cangrejos e insectos.",
        "Comportamiento: muy críptica entre la vegetación ribereña; suele posarse inmóvil; caza en aguas someras desde perchas.",
    ),
    "cochlearius-cochlearius": (
        [R, M],
        "Preocupación Menor (IUCN)",
        "Pico Cuchara (Cochlearius cochlearius) es una garza nocturna con un pico enorme y ancho en forma de cuchara. Habita ríos, manglares y estuarios con vegetación densa. Espectacular y extraña de ver.",
        "Dieta: peces y crustáceos capturados con el pico de cuchara que actúa como trampa en el agua.",
        "Comportamiento: principalmente nocturno; se esconde durante el día entre la vegetación ribereña; sus ojos grandes son adaptación a la visión nocturna.",
    ),
    "egretta-caerulea": (
        [R, C, M],
        "Preocupación Menor (IUCN)",
        "Garceta Azul (Egretta caerulea) es una garza mediana de plumaje azul-grisáceo oscuro con cabeza y cuello azul-vino. Los juveniles son blancos con puntas de vuelo oscuras. Habita ríos, manglares y costas.",
        "Dieta: peces, ranas, crustáceos e insectos acuáticos.",
        "Comportamiento: más activa y veloz que otras garzas al cazar; suele mover el agua con las patas para asustar presas.",
    ),
    "egretta-thula": (
        [R, C, M],
        "Preocupación Menor (IUCN)",
        "Garceta Nivosa (Egretta thula) es una garza pequeña totalmente blanca con patas negras y pies amarillos. Habita estuarios, manglares, lagunas costeras y ríos en tierras bajas.",
        "Dieta: peces pequeños, camarones y artrópodos acuáticos.",
        "Comportamiento: muy activa al cazar; patalea el agua para asustar presas; forma grupos mixtos con otras garzas.",
    ),
    "egretta-tricolor": (
        [R, C, M],
        "Preocupación Menor (IUCN)",
        "Garceta Tricolor (Egretta tricolor) es una garza esbelta con cuello largo: dorso azul-grisáceo, pecho y cuello castaño-rayados y abdomen blanco. Habita lagunas costeras, manglares y estuarios.",
        "Dieta: peces pequeños y crustáceos.",
        "Comportamiento: caza activamente corriendo y volando bajo sobre el agua; más pelágica que otras garzas.",
    ),
    "pelecanus-occidentalis": (
        [C, R],
        "Preocupación Menor (IUCN)",
        "Pelícano Pardo (Pelecanus occidentalis) es el pelícano más oscuro de Norteamérica y el único que se zambulle en picada para pescar. Habita costas del Pacífico y el Caribe de Costa Rica.",
        "Dieta: peces exclusivamente capturados en zambullidas espectaculares.",
        "Comportamiento: vuela en líneas o V; se lanza en picada desde 10–30 m de altura; forma grupos en costas y estuarios.",
    ),
    # ── Piciformes ──────────────────────────────────────────────────────────
    "campephilus-guatemalensis": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Carpintero Picoplata (Campephilus guatemalensis) es el carpintero más grande de Costa Rica; el macho tiene cresta roja vívida y pico marfil. Requiere bosques maduros con árboles muertos o moribundos para anidar.",
        "Dieta: larvas de insectos xilófagos (principalmente larvas de coleópteros) que extrae excavando la madera.",
        "Comportamiento: excava profundamente en madera muerta; su golpeteo es muy sonoro; en parejas o grupos familiares.",
    ),
    "melanerpes-pucherani": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Carpintero Carinegro (Melanerpes pucherani) es un carpintero vistoso con mejillas y garganta negras, nuca y base del pico amarillos y vientre rojo en el macho. Muy común en el Caribe costarricense.",
        "Dieta: insectos, frutos y semillas; también visita comederos con frutas.",
        "Comportamiento: activo y ruidoso; en grupos familiares; visita frutales; almacena bellotas.",
    ),
    "pteroglossus-torquatus": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Tucancillo Collarejo (Pteroglossus torquatus) es el arasarí más común del Caribe costarricense, con collar negro en el pecho y pico bicolor negro y amarillo. Habita bordes de bosque, jardines arbolados y bosque secundario.",
        "Dieta: frutos, insectos, huevos y pollos de otras aves.",
        "Comportamiento: gregario en grupos de 6–12; vuela en fila con vuelo ondulante; ocupa cavidades para dormir.",
    ),
    "ramphastos-sulfuratus": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Tucán Pico Iris (Ramphastos sulfuratus) es el tucán más vistoso de Costa Rica; pico multicolor (verde, azul, naranja, rojo) y garganta amarillo vívida. Habita bordes de bosque y zonas arboladas del Caribe. Especie emblemática.",
        "Dieta: frutos del dosel; también huevos, pollos e insectos.",
        "Comportamiento: gregario en grupos pequeños; se desplaza en vuelo ondulante sobre el dosel; el grupo llega al mismo árbol frutero y vocaliza en conjunto.",
    ),
    "ramphastos-ambiguus": (
        [H, Z],
        "Casi Amenazada (IUCN)",
        "Tucán Pico Castaño (Ramphastos ambiguus) es un tucán grande similar al Pico Iris pero con pico principalmente negro-amarillo y garganta más amarillo-oscuro. Habita bosques maduros del Caribe; es el menos común de los tucanes costarricenses.",
        "Dieta: frutos grandes del dosel; también huevos y pollos de otras aves.",
        "Comportamiento: solitario o en parejas; requiere bosque maduro con árboles frutales grandes; vocaliza con un \"yelp\" agudo repetitivo.",
    ),
    # ── Psittaciformes ──────────────────────────────────────────────────────
    "amazona-autumnalis": (
        [H, Z, M],
        "Preocupación Menor (IUCN)",
        "Loro Frentirrojo (Amazona autumnalis) es un loro verde grande con frente y mejillas rojas y azul en las alas. Muy común en el Caribe costarricense; habita bosques maduros y secundarios avanzados.",
        "Dieta: semillas duras, frutos, flores y brotes.",
        "Comportamiento: en bandadas ruidosas que se desplazan entre zonas de alimentación y dormideros; muy vocales en vuelo.",
    ),
    "amazona-farinosa": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Loro Verde (Amazona farinosa) es el loro más grande de Costa Rica, de plumaje verde uniforme con pequeño toque azul en la coronilla. Habita bosques maduros del Caribe; es más silencioso que otras amazonas.",
        "Dieta: frutos, semillas y flores del dosel.",
        "Comportamiento: forma grandes bandadas en dormideros comunales; vuela alto sobre el bosque; su vuelo ruidoso y en V es característico.",
    ),
    "brotogeris-jugularis": (
        [H, Z, J, M],
        "Preocupación Menor (IUCN)",
        "Periquito Barbinaranja (Brotogeris jugularis) es el loro más pequeño y común de Costa Rica; verde con parche naranja en la barbilla. Muy adaptado a ambientes modificados: jardines, cultivos y bordes de bosque.",
        "Dieta: frutos, semillas y flores.",
        "Comportamiento: en grupos ruidosos y veloces; anida en termiteros; muy común alrededor de árboles frutales.",
    ),
    "eupsittula-nana": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Perico Azteco (Eupsittula nana) es un perico verde con pecho oliva y anillo ocular amarillo. Habita bosques secos y húmedos, bordes de bosque y zonas arboladas del Caribe.",
        "Dieta: frutos, semillas y flores.",
        "Comportamiento: en bandadas ruidosas y veloces; vuela en grupos compactos y chirriantes.",
    ),
    "psittacara-finschi": (
        [H, Z, J],
        "Preocupación Menor (IUCN)",
        "Perico Frentirrojo (Psittacara finschi) es un perico de tamaño mediano con frente y región facial rojas vívidas. Habita bordes de bosque y zonas arboladas; se adapta a paisajes modificados.",
        "Dieta: frutos y semillas.",
        "Comportamiento: en bandadas vocales que vuelan rápido sobre el dosel; gregario en dormideros.",
    ),
    "pionus-senilis": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Loro Coroniblanco (Pionus senilis) es un loro verde de mediano tamaño con corona blanca y flancos azulados. Habita bosques maduros y bordes de bosque del Caribe y Pacífico norte.",
        "Dieta: frutos, semillas y flores del dosel.",
        "Comportamiento: vive en parejas o bandadas; menos ruidoso que las amazonas; vuela en grupos compactos.",
    ),
    "pionus-menstruus": (
        [H, Z],
        "Preocupación Menor (IUCN)",
        "Loro Cabeciazul (Pionus menstruus) es un loro de cabeza azul brillante y cuerpo verde. Habita bosques maduros del Caribe; a menudo se mezcla con otras especies de loros.",
        "Dieta: frutos, semillas y flores.",
        "Comportamiento: en grupos de tamaño moderado; vuela en formaciones; vocaliza con chillidos característicos.",
    ),
    # ── Strigiformes ────────────────────────────────────────────────────────
    "glaucidium-griseiceps": (
        [H],
        "Preocupación Menor (IUCN)",
        "Mochuelo Enano (Glaucidium griseiceps) es la lechuza más pequeña de las tierras bajas del Caribe en Costa Rica, activa durante el día. Habita el interior del bosque húmedo y bordes de bosque maduro.",
        "Dieta: insectos grandes, lagartijas y pájaros pequeños.",
        "Comportamiento: diurno; acecha desde perchas del sotobosque; su presencia provoca reacción de acoso de otras aves (mobbing); posee manchas de «ojos falsos» en la nuca.",
    ),
    # ── Suliformes ──────────────────────────────────────────────────────────
    "anhinga-anhinga": (
        [R, M, C],
        "Preocupación Menor (IUCN)",
        "Pato Aguja (Anhinga anhinga) es un ave acuática con cuello largo y pico como lanza; el macho tiene plumaje negro verdoso con manchas blancas en las alas. Habita ríos, lagunas y manglares.",
        "Dieta: peces que captura bajo el agua persiguiéndolos activamente.",
        "Comportamiento: nada con el cuerpo hundido; suele posarse con las alas extendidas para secar el plumaje; a diferencia de los cormoranes no tiene aceite impermeable en las plumas.",
    ),
    "fregata-magnificens": (
        [C],
        "Preocupación Menor (IUCN)",
        "Rabihorcado Magno (Fregata magnificens) es un ave marina de envergadura enorme (hasta 2.3 m), cola muy ahorquillada y saco gular rojo en el macho. Se ve sobre ambas costas de Costa Rica.",
        "Dieta: peces y calamares obtenidos por piratería (robándole el alimento a otras aves) o capturados en la superficie del mar.",
        "Comportamiento: maestro del vuelo; vuela durante días sin posarse en el agua; roba alimento a gaviotas y pelícanos en el aire; el macho infla el saco rojo en el cortejo.",
    ),
    "nannopterum-brasilianum": (
        [R, C, M],
        "Preocupación Menor (IUCN)",
        "Cormorán Neotropical (Nannopterum brasilianum) es un cormorán de tamaño mediano totalmente negro brillante. Habita ríos, estuarios, lagunas costeras y manglares de Costa Rica.",
        "Dieta: peces que captura sumergiéndose y persiguiéndolos bajo el agua.",
        "Comportamiento: nada con el cuerpo semihundido; se posa en ramas sobre el agua con las alas abiertas para secarlas; forma colonias en dormideros.",
    ),
    # ── Tinamiformes ────────────────────────────────────────────────────────
    "crypturellus-soui": (
        [H],
        "Preocupación Menor (IUCN)",
        "Tinamú Chico (Crypturellus soui) es el tinamú más pequeño de Costa Rica, de plumaje pardo sin brillo. Vive en el suelo del sotobosque del bosque húmedo maduro y secundario avanzado; muy difícil de ver.",
        "Dieta: semillas, pequeños frutos, insectos y gusanos que busca en la hojarasca.",
        "Comportamiento: sumamente críptico; se queda inmóvil cuando se siente amenazado; su llamada melódica en dos notas es el mejor indicador de su presencia.",
    ),
}

def main() -> None:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    birds = data["birds"]
    by_id = {b["id"]: b for b in birds}

    hab_order = [H, R, M, C, Z, J]
    updated = 0
    missing = []

    for id_, (habitat, conservacion, descripcion, dieta, comportamiento) in DATA.items():
        if id_ not in by_id:
            missing.append(id_)
            continue
        b = by_id[id_]
        b["habitat"] = sorted(dict.fromkeys(habitat), key=lambda x: hab_order.index(x) if x in hab_order else 999)
        b["conservacion"] = conservacion
        b["descripcion"] = descripcion
        b["dieta"] = dieta
        b["comportamiento"] = comportamiento
        # Actualizar fuente a URL directa de eBird/AllAboutBirds/IUCN
        sci = b.get("nombreCientifico", "")
        q = quote_plus(sci)
        b["fuentes"] = [
            f"https://ebird.org/search?query={q}",
            f"https://www.allaboutbirds.org/?s={q}",
            f"https://www.iucnredlist.org/search?query={q}&searchType=species",
        ]
        updated += 1

    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"OK: {updated} especies actualizadas")
    if missing:
        print(f"ADVERTENCIA – IDs no encontrados en el JSON: {missing}")


if __name__ == "__main__":
    main()
