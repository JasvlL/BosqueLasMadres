#!/usr/bin/env python3
"""
Script para generar el archivo JSON completo con las especies de aves
del Conteo 2024 del Corredor Biológico Bosque Las Madres.

Uso:
    python generate_birds_json.py
"""

import json
import re
from typing import Dict, List


def generate_id(nombre_cientifico: str) -> str:
    """Genera un ID único desde el nombre científico."""
    id = nombre_cientifico.lower().replace(' ', '-')
    id = re.sub(r'[^\w\-]', '', id)
    return id


def generate_image_path(nombre_cientifico: str) -> str:
    """Genera la ruta de imagen desde el nombre científico.
    Las imágenes están guardadas con el nombre científico original: 'Actitis macularius.jpg'
    """
    return f"assets/images/aves/{nombre_cientifico}.jpg"


def generate_audio_path(nombre_comun: str) -> str:
    """Genera la ruta de audio desde el nombre común."""
    filename = nombre_comun.lower()
    filename = re.sub(r'[áàäâ]', 'a', filename)
    filename = re.sub(r'[éèëê]', 'e', filename)
    filename = re.sub(r'[íìïî]', 'i', filename)
    filename = re.sub(r'[óòöô]', 'o', filename)
    filename = re.sub(r'[úùüû]', 'u', filename)
    filename = re.sub(r'[ñ]', 'n', filename)
    filename = re.sub(r'[^a-z0-9\s]', '', filename)
    filename = filename.replace(' ', '-')
    return f"assets/audio/aves/{filename}.mp3"


def estimate_size(orden: str, familia: str) -> str:
    """Estima el tamaño basado en orden y familia."""
    if orden in ['Accipitriformes', 'Falconiformes', 'Cathartiformes', 'Pelecaniformes', 'Suliformes']:
        return "grande"
    elif familia in ['Trochilidae', 'Apodidae']:
        return "pequeño"
    elif orden in ['Passeriformes']:
        if familia in ['Tyrannidae', 'Thamnophilidae', 'Parulidae', 'Polioptilidae', 'Pipridae']:
            return "pequeño"
        return "mediano"
    elif orden in ['Psittaciformes', 'Piciformes', 'Cuculiformes', 'Coraciiformes']:
        return "mediano"
    elif orden in ['Columbiformes']:
        return "mediano"
    else:
        return "mediano"


def estimate_habitat(orden: str, familia: str, nombre_comun: str) -> List[str]:
    """Estima el hábitat basado en orden, familia y nombre."""
    habitats = set()
    nombre_lower = nombre_comun.lower()

    if orden in ['Charadriiformes', 'Pelecaniformes', 'Suliformes', 'Anseriformes']:
        habitats.add("rio")
    if familia in ['Ardeidae', 'Alcedinidae']:
        habitats.add("rio")
    if 'pescador' in nombre_lower or 'acuático' in nombre_lower or 'acuatica' in nombre_lower:
        habitats.add("rio")
    if 'playero' in nombre_lower or 'chorlito' in nombre_lower or 'chorlitejo' in nombre_lower:
        habitats.add("rio")
    if orden in ['Accipitriformes', 'Falconiformes', 'Passeriformes', 'Piciformes',
                 'Psittaciformes', 'Cuculiformes', 'Galbuliformes', 'Galliformes']:
        habitats.add("bosque")
    if familia in ['Trochilidae', 'Apodidae']:
        habitats.add("bosque")
        habitats.add("jardines")
    if orden in ['Columbiformes']:
        habitats.add("bosque")
        habitats.add("zonas_abiertas")

    if not habitats:
        habitats.add("bosque")

    return list(habitats)


def estimate_colors(nombre_comun: str, nombre_ingles: str) -> List[str]:
    """Estima colores basado en nombres."""
    colors = []
    text = (nombre_comun + " " + nombre_ingles).lower()

    color_map = {
        'rojo': ['rojo', 'red', 'scarlet', 'crimson', 'rufous', 'frentirrojo', 'gorgirroja', 'lomo escarlata'],
        'azul': ['azul', 'blue', 'cyan', 'cabeciazul', 'pechiazul'],
        'verde': ['verde', 'green', 'emerald', 'olivácea', 'olive'],
        'amarillo': ['amarillo', 'yellow', 'golden', 'gold', 'coroniamarilla', 'cariamarillo'],
        'negro': ['negro', 'black', 'dark', 'carinegro', 'cabecinegro'],
        'blanco': ['blanco', 'white', 'snowy', 'pale', 'nuquiblanco', 'cuelliblanco', 'pechiblanco'],
        'gris': ['gris', 'gray', 'grey', 'slaty', 'coronigrís', 'cabecigris'],
        'marrón': ['marrón', 'brown', 'cinnamon', 'chestnut', 'castaño', 'pardo'],
        'multicolor': ['multicolor', 'rainbow', 'iridescent', 'iris', 'siete colores']
    }

    for color, keywords in color_map.items():
        if any(keyword in text for keyword in keywords):
            colors.append(color)

    if not colors:
        colors = ["marrón"]

    return colors


SPECIES_DATA = [
    # Accipitriformes
    {"orden": "Accipitriformes", "familia": "Accipitridae", "nombreCientifico": "Buteogallus anthracinus", "nombreIngles": "Common Black Hawk", "nombreComun": "Gavilán Cangrejero"},
    {"orden": "Accipitriformes", "familia": "Accipitridae", "nombreCientifico": "Buteo brachyurus", "nombreIngles": "Short-tailed Hawk", "nombreComun": "Gavilán Colicorto"},
    {"orden": "Accipitriformes", "familia": "Accipitridae", "nombreCientifico": "Buteo platypterus", "nombreIngles": "Broad-winged Hawk", "nombreComun": "Gavilán Pollero"},
    {"orden": "Accipitriformes", "familia": "Accipitridae", "nombreCientifico": "Buteo plagiatus", "nombreIngles": "Gray Hawk", "nombreComun": "Gavilán Gris"},
    {"orden": "Accipitriformes", "familia": "Accipitridae", "nombreCientifico": "Buteo swainsoni", "nombreIngles": "Swainson's Hawk", "nombreComun": "Gavilán de Swainson"},
    {"orden": "Accipitriformes", "familia": "Accipitridae", "nombreCientifico": "Harpagus bidentatus", "nombreIngles": "Double-toothed Kite", "nombreComun": "Gavilán Gorgirrayado"},
    {"orden": "Accipitriformes", "familia": "Accipitridae", "nombreCientifico": "Leptodon cayanensis", "nombreIngles": "Gray-headed Kite", "nombreComun": "Gavilán Cabecigris"},
    {"orden": "Accipitriformes", "familia": "Accipitridae", "nombreCientifico": "Rupornis magnirostris", "nombreIngles": "Roadside Hawk", "nombreComun": "Gavilán Chapulinero"},
    {"orden": "Accipitriformes", "familia": "Pandionidae", "nombreCientifico": "Pandion haliaetus", "nombreIngles": "Osprey", "nombreComun": "Águila Pescadora"},
    # Anseriformes
    {"orden": "Anseriformes", "familia": "Anatidae", "nombreCientifico": "Cairina moschata", "nombreIngles": "Muscovy Duck", "nombreComun": "Pato Real o Perulero"},
    # Apodiformes - Apodidae
    {"orden": "Apodiformes", "familia": "Apodidae", "nombreCientifico": "Chaetura vauxi", "nombreIngles": "Vaux's Swift", "nombreComun": "Vencejo Común"},
    {"orden": "Apodiformes", "familia": "Apodidae", "nombreCientifico": "Panyptila cayennensis", "nombreIngles": "Lesser Swallow-tailed Swift", "nombreComun": "Vencejo Tijereta Menor"},
    {"orden": "Apodiformes", "familia": "Apodidae", "nombreCientifico": "Streptoprocne zonaris", "nombreIngles": "White-collared Swift", "nombreComun": "Vencejo Cuelliblanco"},
    # Apodiformes - Trochilidae
    {"orden": "Apodiformes", "familia": "Trochilidae", "nombreCientifico": "Anthracothorax prevostii", "nombreIngles": "Green-breasted Mango", "nombreComun": "Manguito Pechiverde"},
    {"orden": "Apodiformes", "familia": "Trochilidae", "nombreCientifico": "Amazilia tzacatl", "nombreIngles": "Rufous-tailed Hummingbird", "nombreComun": "Colibrí Rabirufo"},
    {"orden": "Apodiformes", "familia": "Trochilidae", "nombreCientifico": "Archilochus colubris", "nombreIngles": "Ruby-throated Hummingbird", "nombreComun": "Colibrí Garganta de Rubí"},
    {"orden": "Apodiformes", "familia": "Trochilidae", "nombreCientifico": "Florisuga mellivora", "nombreIngles": "White-necked Jacobin", "nombreComun": "Jacobino Nuquiblanco"},
    {"orden": "Apodiformes", "familia": "Trochilidae", "nombreCientifico": "Glaucis aeneus", "nombreIngles": "Bronzy Hermit", "nombreComun": "Ermitaño Bronceado"},
    {"orden": "Apodiformes", "familia": "Trochilidae", "nombreCientifico": "Heliothryx barroti", "nombreIngles": "Purple-crowned Fairy", "nombreComun": "Colibrí Picopunzón"},
    {"orden": "Apodiformes", "familia": "Trochilidae", "nombreCientifico": "Phaetornis longirostris", "nombreIngles": "Long-billed Hermit", "nombreComun": "Ermitaño Colilargo"},
    {"orden": "Apodiformes", "familia": "Trochilidae", "nombreCientifico": "Polyerata amabilis", "nombreIngles": "Blue-chested Hummingbird", "nombreComun": "Colibrí Pechiazul"},
    {"orden": "Apodiformes", "familia": "Trochilidae", "nombreCientifico": "Thalurania colombica", "nombreIngles": "Crowned Woodnymph", "nombreComun": "Colibrí Ninfa Verde-Violeta"},
    {"orden": "Apodiformes", "familia": "Trochilidae", "nombreCientifico": "Phaethornis striigularis", "nombreIngles": "Stripe-throated Hermit", "nombreComun": "Ermitaño Enano"},
    # Cathartiformes
    {"orden": "Cathartiformes", "familia": "Cathartidae", "nombreCientifico": "Cathartes aura", "nombreIngles": "Turkey Vulture", "nombreComun": "Zopilote Cabecirrojo"},
    {"orden": "Cathartiformes", "familia": "Cathartidae", "nombreCientifico": "Coragyps atratus", "nombreIngles": "Black Vulture", "nombreComun": "Zopilote Negro"},
    {"orden": "Cathartiformes", "familia": "Cathartidae", "nombreCientifico": "Sarcoramphus papa", "nombreIngles": "King Vulture", "nombreComun": "Zopilote Rey"},
    # Caprimulgiformes
    {"orden": "Caprimulgiformes", "familia": "Caprimulgidae", "nombreCientifico": "Nyctidromus albicollis", "nombreIngles": "Common Pauraque", "nombreComun": "Cuyeo"},
    # Charadriiformes
    {"orden": "Charadriiformes", "familia": "Charadriidae", "nombreCientifico": "Charadrius semipalmatus", "nombreIngles": "Semipalmated Plover", "nombreComun": "Chorlitejo Semipalmado"},
    {"orden": "Charadriiformes", "familia": "Charadriidae", "nombreCientifico": "Pluvialis squatarola", "nombreIngles": "Black-bellied Plover", "nombreComun": "Chorlito Gris"},
    {"orden": "Charadriiformes", "familia": "Jacanidae", "nombreCientifico": "Jacana spinosa", "nombreIngles": "Northern Jacana", "nombreComun": "Jacana Centroamericana"},
    {"orden": "Charadriiformes", "familia": "Laridae", "nombreCientifico": "Thalasseus maximus", "nombreIngles": "Royal Tern", "nombreComun": "Pagaza Real"},
    {"orden": "Charadriiformes", "familia": "Recurvirostridae", "nombreCientifico": "Himantopus mexicanus", "nombreIngles": "Black-necked Stilt", "nombreComun": "Cigüeñuela Cuellinegra"},
    {"orden": "Charadriiformes", "familia": "Scolopacidae", "nombreCientifico": "Actitis macularius", "nombreIngles": "Spotted Sandpiper", "nombreComun": "Andarríos Maculado"},
    {"orden": "Charadriiformes", "familia": "Scolopacidae", "nombreCientifico": "Arenaria interpres", "nombreIngles": "Ruddy Turnstone", "nombreComun": "Vuelvepiedras Rojizo"},
    {"orden": "Charadriiformes", "familia": "Scolopacidae", "nombreCientifico": "Calidris alba", "nombreIngles": "Sanderling", "nombreComun": "Playero Arenero"},
    # Columbiformes
    {"orden": "Columbiformes", "familia": "Columbidae", "nombreCientifico": "Claravis pretiosa", "nombreIngles": "Blue Ground Dove", "nombreComun": "Tortolita Azulada"},
    {"orden": "Columbiformes", "familia": "Columbidae", "nombreCientifico": "Columbina talpacoti", "nombreIngles": "Ruddy Ground Dove", "nombreComun": "Tortolita Rojiza"},
    {"orden": "Columbiformes", "familia": "Columbidae", "nombreCientifico": "Leptotila verreauxi", "nombreIngles": "White-tipped Dove", "nombreComun": "Paloma Coliblanca"},
    {"orden": "Columbiformes", "familia": "Columbidae", "nombreCientifico": "Patagioenas cayennensis", "nombreIngles": "Pale-vented Pigeon", "nombreComun": "Paloma Colorada"},
    {"orden": "Columbiformes", "familia": "Columbidae", "nombreCientifico": "Patagioenas flavirostris", "nombreIngles": "Red-billed Pigeon", "nombreComun": "Paloma Piquirroja"},
    {"orden": "Columbiformes", "familia": "Columbidae", "nombreCientifico": "Patagioenas nigrirostris", "nombreIngles": "Short-billed Pigeon", "nombreComun": "Paloma Piquicorta"},
    # Coraciiformes
    {"orden": "Coraciiformes", "familia": "Alcedinidae", "nombreCientifico": "Chloroceryle americana", "nombreIngles": "Green Kingfisher", "nombreComun": "Martín Pescador Verde"},
    {"orden": "Coraciiformes", "familia": "Alcedinidae", "nombreCientifico": "Megaceryle torquata", "nombreIngles": "Ringed Kingfisher", "nombreComun": "Martín Pescador Collarejo"},
    {"orden": "Coraciiformes", "familia": "Momotidae", "nombreCientifico": "Electron platyrhynchum", "nombreIngles": "Broad-billed Motmot", "nombreComun": "Momoto Piquiancho"},
    # Cuculiformes
    {"orden": "Cuculiformes", "familia": "Cuculidae", "nombreCientifico": "Crotophaga sulcirostris", "nombreIngles": "Groove-billed Ani", "nombreComun": "Garrapatero Piquiestriado"},
    {"orden": "Cuculiformes", "familia": "Cuculidae", "nombreCientifico": "Piaya cayana", "nombreIngles": "Squirrel Cuckoo", "nombreComun": "Cuco Ardilla"},
    # Falconiformes
    {"orden": "Falconiformes", "familia": "Falconidae", "nombreCientifico": "Daptrius chimachima", "nombreIngles": "Yellow-headed Caracara", "nombreComun": "Caracara Cabecigualdo"},
    {"orden": "Falconiformes", "familia": "Falconidae", "nombreCientifico": "Caracara plancus", "nombreIngles": "Crested Caracara", "nombreComun": "Caracara Cargahuesos"},
    {"orden": "Falconiformes", "familia": "Falconidae", "nombreCientifico": "Falco columbarius", "nombreIngles": "Merlin", "nombreComun": "Esmerejón"},
    {"orden": "Falconiformes", "familia": "Falconidae", "nombreCientifico": "Falco peregrinus", "nombreIngles": "Peregrine Falcon", "nombreComun": "Halcón Peregrino"},
    {"orden": "Falconiformes", "familia": "Falconidae", "nombreCientifico": "Falco rufigularis", "nombreIngles": "Bat Falcon", "nombreComun": "Halcón Cuelliblanco"},
    {"orden": "Falconiformes", "familia": "Falconidae", "nombreCientifico": "Herpetotheres cachinnans", "nombreIngles": "Laughing Falcon", "nombreComun": "Guaco"},
    {"orden": "Falconiformes", "familia": "Falconidae", "nombreCientifico": "Micrastur mirandollei", "nombreIngles": "Slaty-backed Forest-Falcon", "nombreComun": "Halcón de Monte Dorsigris"},
    # Galbuliformes
    {"orden": "Galbuliformes", "familia": "Bucconidae", "nombreCientifico": "Malacoptila panamensis", "nombreIngles": "White-whiskered Puffbird", "nombreComun": "Buco Barbón"},
    {"orden": "Galbuliformes", "familia": "Bucconidae", "nombreCientifico": "Notharchus hyperrhynchus", "nombreIngles": "White-necked Puffbird", "nombreComun": "Buco Collarejo"},
    # Galliformes
    {"orden": "Galliformes", "familia": "Cracidae", "nombreCientifico": "Penelope purpurascens", "nombreIngles": "Crested Guan", "nombreComun": "Pava Crestada"},
    # Gruiformes
    {"orden": "Gruiformes", "familia": "Rallidae", "nombreCientifico": "Aramides cajaneus", "nombreIngles": "Gray-cowled Wood-Rail", "nombreComun": "Rascón Cuelligrís"},
    {"orden": "Gruiformes", "familia": "Rallidae", "nombreCientifico": "Laterallus albigularis", "nombreIngles": "White-throated Crake", "nombreComun": "Polluela Gargantiblanca"},
    # Passeriformes - Cardinalidae
    {"orden": "Passeriformes", "familia": "Cardinalidae", "nombreCientifico": "Caryothraustes poliogaster", "nombreIngles": "Black-faced Grosbeak", "nombreComun": "Picogrueso Carinegro"},
    {"orden": "Passeriformes", "familia": "Cardinalidae", "nombreCientifico": "Driophlox fuscicauda", "nombreIngles": "Red-throated Ant-Tanager", "nombreComun": "Tangara Hormiguera Gorgirroja"},
    {"orden": "Passeriformes", "familia": "Cardinalidae", "nombreCientifico": "Pheucticus ludovicianus", "nombreIngles": "Rose-breasted Grosbeak", "nombreComun": "Picogrueso Pechirrosado"},
    {"orden": "Passeriformes", "familia": "Cardinalidae", "nombreCientifico": "Piranga olivacea", "nombreIngles": "Scarlet Tanager", "nombreComun": "Tangara Escarlata"},
    {"orden": "Passeriformes", "familia": "Cardinalidae", "nombreCientifico": "Piranga rubra", "nombreIngles": "Summer Tanager", "nombreComun": "Tangara Veranera"},
    # Passeriformes - Corvidae
    {"orden": "Passeriformes", "familia": "Corvidae", "nombreCientifico": "Cyanocorax affinis", "nombreIngles": "Black-chested Jay", "nombreComun": "Urraca Pechinegra"},
    {"orden": "Passeriformes", "familia": "Corvidae", "nombreCientifico": "Cyanocorax morio", "nombreIngles": "Brown Jay", "nombreComun": "Urraca Parda"},
    # Passeriformes - Cotingidae
    {"orden": "Passeriformes", "familia": "Cotingidae", "nombreCientifico": "Carpodectes nitidus", "nombreIngles": "Snowy Cotinga", "nombreComun": "Cotinga Blanca"},
    {"orden": "Passeriformes", "familia": "Cotingidae", "nombreCientifico": "Querula purpurata", "nombreIngles": "Purple-throated Fruitcrow", "nombreComun": "Querula Gorgimorada"},
    # Passeriformes - Fringillidae
    {"orden": "Passeriformes", "familia": "Fringillidae", "nombreCientifico": "Euphonia goldi", "nombreIngles": "Olive-backed Euphonia", "nombreComun": "Eufonia Olivácea"},
    {"orden": "Passeriformes", "familia": "Fringillidae", "nombreCientifico": "Euphonia luteicapilla", "nombreIngles": "Yellow-crowned Euphonia", "nombreComun": "Eufonia Coroniamarilla"},
    # Passeriformes - Furnariidae
    {"orden": "Passeriformes", "familia": "Furnariidae", "nombreCientifico": "Dendrocolaptes sanctithomae", "nombreIngles": "Northern Barred-Woodcreeper", "nombreComun": "Trepador Barreteado"},
    {"orden": "Passeriformes", "familia": "Furnariidae", "nombreCientifico": "Lepidocolaptes souleyetii", "nombreIngles": "Streak-headed Woodcreeper", "nombreComun": "Trepador Cabecirrayado"},
    {"orden": "Passeriformes", "familia": "Furnariidae", "nombreCientifico": "Xiphorhynchus susurrans", "nombreIngles": "Cocoa Woodcreeper", "nombreComun": "Trepador Gorgianteado"},
    # Passeriformes - Hirundinidae
    {"orden": "Passeriformes", "familia": "Hirundinidae", "nombreCientifico": "Stelgidopteryx ruficollis", "nombreIngles": "Southern Rough-winged Swallow", "nombreComun": "Golondrina Alirrasposa Sureña"},
    {"orden": "Passeriformes", "familia": "Hirundinidae", "nombreCientifico": "Stelgidopteryx serripennis", "nombreIngles": "Northern Rough-winged Swallow", "nombreComun": "Golondrina Alirrasposa Norteña"},
    {"orden": "Passeriformes", "familia": "Hirundinidae", "nombreCientifico": "Tachycineta albilinea", "nombreIngles": "Mangrove Swallow", "nombreComun": "Golondrina Lomiblanca"},
    # Passeriformes - Icteridae
    {"orden": "Passeriformes", "familia": "Icteridae", "nombreCientifico": "Cacicus uropygialis", "nombreIngles": "Scarlet-rumped Cacique", "nombreComun": "Cacique Lomiescarlata"},
    {"orden": "Passeriformes", "familia": "Icteridae", "nombreCientifico": "Dives dives", "nombreIngles": "Melodious Blackbird", "nombreComun": "Tordo Cantor"},
    {"orden": "Passeriformes", "familia": "Icteridae", "nombreCientifico": "Icterus galbula", "nombreIngles": "Baltimore Oriole", "nombreComun": "Bolsero Norteño"},
    {"orden": "Passeriformes", "familia": "Icteridae", "nombreCientifico": "Icterus prosthemelas", "nombreIngles": "Black-cowled Oriole", "nombreComun": "Bolsero Capuchinegro"},
    {"orden": "Passeriformes", "familia": "Icteridae", "nombreCientifico": "Psarocolius wagleri", "nombreIngles": "Chestnut-headed Oropendola", "nombreComun": "Oropéndola Cabecicastaña"},
    {"orden": "Passeriformes", "familia": "Icteridae", "nombreCientifico": "Psarocolius montezuma", "nombreIngles": "Montezuma Oropendola", "nombreComun": "Oropéndola de Montezuma"},
    {"orden": "Passeriformes", "familia": "Icteridae", "nombreCientifico": "Quiscalus mexicanus", "nombreIngles": "Great-tailed Grackle", "nombreComun": "Zanate Grande"},
    # Passeriformes - Mimidae
    {"orden": "Passeriformes", "familia": "Mimidae", "nombreCientifico": "Mimus gilvus", "nombreIngles": "Tropical Mockingbird", "nombreComun": "Pájaro-imitador Tropical"},
    # Passeriformes - Parulidae
    {"orden": "Passeriformes", "familia": "Parulidae", "nombreCientifico": "Geothlypis poliocephala", "nombreIngles": "Gray-crowned Yellowthroat", "nombreComun": "Antifacito Coronigrís"},
    {"orden": "Passeriformes", "familia": "Parulidae", "nombreCientifico": "Leiothlypis peregrina", "nombreIngles": "Tennessee Warbler", "nombreComun": "Reinita Verdilla"},
    {"orden": "Passeriformes", "familia": "Parulidae", "nombreCientifico": "Parkesia motacilla", "nombreIngles": "Louisiana Waterthrush", "nombreComun": "Reinita Acuática Piquigrande"},
    {"orden": "Passeriformes", "familia": "Parulidae", "nombreCientifico": "Parkesia noveboracensis", "nombreIngles": "Northern Waterthrush", "nombreComun": "Reinita Acuática Norteña"},
    {"orden": "Passeriformes", "familia": "Parulidae", "nombreCientifico": "Protonotaria citrea", "nombreIngles": "Prothonotary Warbler", "nombreComun": "Reinita Cabecidorada"},
    {"orden": "Passeriformes", "familia": "Parulidae", "nombreCientifico": "Setophaga ruticilla", "nombreIngles": "American Redstart", "nombreComun": "Candelita Norteña"},
    {"orden": "Passeriformes", "familia": "Parulidae", "nombreCientifico": "Setophaga castanea", "nombreIngles": "Bay-breasted Warbler", "nombreComun": "Reinita Castaña"},
    {"orden": "Passeriformes", "familia": "Parulidae", "nombreCientifico": "Setophaga fusca", "nombreIngles": "Blackburnian Warbler", "nombreComun": "Reinita Gorginaranja"},
    {"orden": "Passeriformes", "familia": "Parulidae", "nombreCientifico": "Setophaga pensylvanica", "nombreIngles": "Chestnut-sided Warbler", "nombreComun": "Reinita de Costillas Castañas"},
    {"orden": "Passeriformes", "familia": "Parulidae", "nombreCientifico": "Setophaga petechia", "nombreIngles": "Yellow Warbler", "nombreComun": "Reinita Amarilla"},
    {"orden": "Passeriformes", "familia": "Parulidae", "nombreCientifico": "Vermivora chrysoptera", "nombreIngles": "Golden-winged Warbler", "nombreComun": "Reinita Alidorada"},
    # Passeriformes - Passerellidae
    {"orden": "Passeriformes", "familia": "Passerellidae", "nombreCientifico": "Arremonops conirostris", "nombreIngles": "Black-striped Sparrow", "nombreComun": "Pinzón Cabecilistado"},
    {"orden": "Passeriformes", "familia": "Passerellidae", "nombreCientifico": "Arremon aurantiirostris", "nombreIngles": "Orange-billed Sparrow", "nombreComun": "Pinzón Piquinaranja"},
    # Passeriformes - Pipridae
    {"orden": "Passeriformes", "familia": "Pipridae", "nombreCientifico": "Manacus candei", "nombreIngles": "White-collared Manakin", "nombreComun": "Saltarín Cuelliblanco"},
    # Passeriformes - Polioptilidae
    {"orden": "Passeriformes", "familia": "Polioptilidae", "nombreCientifico": "Polioptila bilineata", "nombreIngles": "White-browed Gnatcatcher", "nombreComun": "Perlita Tropical"},
    # Passeriformes - Thamnophilidae
    {"orden": "Passeriformes", "familia": "Thamnophilidae", "nombreCientifico": "Cymbilaimus lineatus", "nombreIngles": "Fasciated Antshrike", "nombreComun": "Batará Lineado"},
    {"orden": "Passeriformes", "familia": "Thamnophilidae", "nombreCientifico": "Microrhopias quixensis", "nombreIngles": "Dot-winged Antwren", "nombreComun": "Hormiguerito Alipunteado"},
    {"orden": "Passeriformes", "familia": "Thamnophilidae", "nombreCientifico": "Poliocrania exsul", "nombreIngles": "Chestnut-backed Antbird", "nombreComun": "Hormiguero Dorsicastaño"},
    {"orden": "Passeriformes", "familia": "Thamnophilidae", "nombreCientifico": "Thamnophilus atrinucha", "nombreIngles": "Black-crowned Antshrike", "nombreComun": "Batará Plomizo"},
    # Passeriformes - Thraupidae
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Coereba flaveola", "nombreIngles": "Bananaquit", "nombreComun": "Reinita Mielera"},
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Cyanerpes lucidus", "nombreIngles": "Shining Honeycreeper", "nombreComun": "Mielero Luciente"},
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Dacnis cayana", "nombreIngles": "Blue Dacnis", "nombreComun": "Mielero Azulejo"},
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Dacnis venusta", "nombreIngles": "Scarlet-thighed Dacnis", "nombreComun": "Mielero Celeste y Negro"},
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Saltator atriceps", "nombreIngles": "Black-headed Saltator", "nombreComun": "Saltator Cabecinegro"},
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Saltator maximus", "nombreIngles": "Buff-throated Saltator", "nombreComun": "Saltator Gorgianteado"},
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Saltator grandis", "nombreIngles": "Cinnamon-bellied Saltator", "nombreComun": "Saltador Grisáceo"},
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Ramphocelus passerini", "nombreIngles": "Scarlet-rumped Tanager", "nombreComun": "Tangara Lomo Escarlata"},
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Sporophila corvina", "nombreIngles": "Variable Seedeater", "nombreComun": "Espiguero Variable"},
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Stilpnia larvata", "nombreIngles": "Golden-hooded Tanager", "nombreComun": "Tangara Siete Colores"},
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Tangara inornata", "nombreIngles": "Plain-colored Tanager", "nombreComun": "Tangara Cenicienta"},
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Thraupis episcopus", "nombreIngles": "Blue-gray Tanager", "nombreComun": "Tangara Azuleja"},
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Thraupis palmarum", "nombreIngles": "Palm Tanager", "nombreComun": "Tangara Palmera"},
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Tiaris olivaceus", "nombreIngles": "Yellow-faced Grassquit", "nombreComun": "Semillerito Cariamarillo"},
    {"orden": "Passeriformes", "familia": "Thraupidae", "nombreCientifico": "Volatinia jacarina", "nombreIngles": "Blue-black Grassquit", "nombreComun": "Semillero Negro Azulado"},
    # Passeriformes - Tityridae
    {"orden": "Passeriformes", "familia": "Tityridae", "nombreCientifico": "Tytira semifasciata", "nombreIngles": "Masked Tityra", "nombreComun": "Tityra Carirroja"},
    {"orden": "Passeriformes", "familia": "Tityridae", "nombreCientifico": "Pachyramphus cinnamomeus", "nombreIngles": "Cinnamon Becard", "nombreComun": "Cabezón Canelo"},
    # Passeriformes - Troglodytidae
    {"orden": "Passeriformes", "familia": "Troglodytidae", "nombreCientifico": "Campylorhynchus zonatus", "nombreIngles": "Band-backed Wren", "nombreComun": "Soterrey Matraquero"},
    {"orden": "Passeriformes", "familia": "Troglodytidae", "nombreCientifico": "Cantorchilus nigricapillus", "nombreIngles": "Bay Wren", "nombreComun": "Soterrey Castaño"},
    {"orden": "Passeriformes", "familia": "Troglodytidae", "nombreCientifico": "Cantorchilus thoracicus", "nombreIngles": "Stripe-breasted Wren", "nombreComun": "Soterrey Pechirrayado"},
    {"orden": "Passeriformes", "familia": "Troglodytidae", "nombreCientifico": "Henicorhina leucosticta", "nombreIngles": "White-breasted Wood-Wren", "nombreComun": "Soterrey de Selva Pechiblanco"},
    {"orden": "Passeriformes", "familia": "Troglodytidae", "nombreCientifico": "Troglodytes aedon", "nombreIngles": "Northern House Wren", "nombreComun": "Soterrey Cucarachero"},
    # Passeriformes - Turdidae
    {"orden": "Passeriformes", "familia": "Turdidae", "nombreCientifico": "Catharus minimus", "nombreIngles": "Gray-cheeked Thrush", "nombreComun": "Zorzal Carigrís"},
    {"orden": "Passeriformes", "familia": "Turdidae", "nombreCientifico": "Catharus ustulatus", "nombreIngles": "Swainson's Thrush", "nombreComun": "Zorzal de Swainson"},
    {"orden": "Passeriformes", "familia": "Turdidae", "nombreCientifico": "Turdus grayi", "nombreIngles": "Clay-colored Thrush", "nombreComun": "Mirlo Pardo"},
    # Passeriformes - Tyrannidae
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Attila spadiceus", "nombreIngles": "Bright-rumped Attila", "nombreComun": "Atila Lomiamarilla"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Colonia colonus", "nombreIngles": "Long-tailed Tyrant", "nombreComun": "Mosquero Coludo"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Contopus virens", "nombreIngles": "Eastern Wood-Pewee", "nombreComun": "Pibí Oriental"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Contopus bogotensis", "nombreIngles": "Northern Tropical Pewee", "nombreComun": "Pibí Tropical"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Contopus sordidulus", "nombreIngles": "Western Wood-Pewee", "nombreComun": "Pibí Occidental"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Empidonax virescens", "nombreIngles": "Acadian Flycatcher", "nombreComun": "Mosquerito Verdoso"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Empidonax alnorum", "nombreIngles": "Alder Flycatcher", "nombreComun": "Mosquerito de Charral"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Empidonax minimus", "nombreIngles": "Least Flycatcher", "nombreComun": "Mosquerito Chebec"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Myiornis atricapillus", "nombreIngles": "Black-capped Pygmy-Tyrant", "nombreComun": "Mosquerito Colicorto"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Myiozetetes granadensis", "nombreIngles": "Gray-capped Flycatcher", "nombreComun": "Mosquero Cabecigris"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Myiozetetes similis", "nombreIngles": "Social Flycatcher", "nombreComun": "Mosquero Cejiblanco"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Myiarchus tuberculifer", "nombreIngles": "Dusky-capped Flycatcher", "nombreComun": "Copetón Crestioscuro"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Myiarchus crinitus", "nombreIngles": "Great Crested Flycatcher", "nombreComun": "Copetón Viajero"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Megarynchus pitangua", "nombreIngles": "Boat-billed Flycatcher", "nombreComun": "Mosquerón Picudo"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Pitangus sulphuratus", "nombreIngles": "Great Kiskadee", "nombreComun": "Bienteveo Grande"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Oncostoma cinereigulare", "nombreIngles": "Northern Bentbill", "nombreComun": "Piquitorcido Norteño"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Ornithion brunneicapillus", "nombreIngles": "Brown-capped Tyrannulet", "nombreComun": "Mosquerito Gorricafé"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Todirostrum nigriceps", "nombreIngles": "Black-headed Tody-Flycatcher", "nombreComun": "Espatulilla Cabecinegra"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Todirostrum cinereum", "nombreIngles": "Common Tody-Flycatcher", "nombreComun": "Espatulilla Común"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Tyrannus melancholicus", "nombreIngles": "Tropical Kingbird", "nombreComun": "Tirano Tropical"},
    {"orden": "Passeriformes", "familia": "Tyrannidae", "nombreCientifico": "Zimmerius parvus", "nombreIngles": "Mistletoe Tyrannulet", "nombreComun": "Mosquerito Cejigrís"},
    # Passeriformes - Vireonidae
    {"orden": "Passeriformes", "familia": "Vireonidae", "nombreCientifico": "Pachysylvia decurtata", "nombreIngles": "Lesser Greenlet", "nombreComun": "Verdillo Menudo"},
    {"orden": "Passeriformes", "familia": "Vireonidae", "nombreCientifico": "Vireo flavifrons", "nombreIngles": "Yellow-throated Vireo", "nombreComun": "Vireo Pechiamarillo"},
    {"orden": "Passeriformes", "familia": "Vireonidae", "nombreCientifico": "Vireo olivaceus", "nombreIngles": "Red-eyed Vireo", "nombreComun": "Vireo Ojirrojo"},
    # Pelecaniformes - Ardeidae
    {"orden": "Pelecaniformes", "familia": "Ardeidae", "nombreCientifico": "Ardea alba", "nombreIngles": "Great Egret", "nombreComun": "Garceta Grande"},
    {"orden": "Pelecaniformes", "familia": "Ardeidae", "nombreCientifico": "Ardea herodias", "nombreIngles": "Great Blue Heron", "nombreComun": "Garzón Azulado"},
    {"orden": "Pelecaniformes", "familia": "Ardeidae", "nombreCientifico": "Ardea ibis", "nombreIngles": "Western Cattle-Egret", "nombreComun": "Garcilla Bueyera"},
    {"orden": "Pelecaniformes", "familia": "Ardeidae", "nombreCientifico": "Butorides virescens", "nombreIngles": "Green Heron", "nombreComun": "Garcilla Verde"},
    {"orden": "Pelecaniformes", "familia": "Ardeidae", "nombreCientifico": "Cochlearius cochlearius", "nombreIngles": "Boat-billed Heron", "nombreComun": "Pico Cuchara"},
    {"orden": "Pelecaniformes", "familia": "Ardeidae", "nombreCientifico": "Egretta caerulea", "nombreIngles": "Little Blue Heron", "nombreComun": "Garceta Azul"},
    {"orden": "Pelecaniformes", "familia": "Ardeidae", "nombreCientifico": "Egretta thula", "nombreIngles": "Snowy Egret", "nombreComun": "Garceta Nivosa"},
    {"orden": "Pelecaniformes", "familia": "Ardeidae", "nombreCientifico": "Egretta tricolor", "nombreIngles": "Tricolored Heron", "nombreComun": "Garceta Tricolor"},
    {"orden": "Pelecaniformes", "familia": "Pelecanidae", "nombreCientifico": "Pelecanus occidentalis", "nombreIngles": "Brown Pelican", "nombreComun": "Pelícano Pardo"},
    # Piciformes
    {"orden": "Piciformes", "familia": "Picidae", "nombreCientifico": "Campephilus guatemalensis", "nombreIngles": "Pale-billed Woodpecker", "nombreComun": "Carpintero Picoplata"},
    {"orden": "Piciformes", "familia": "Picidae", "nombreCientifico": "Melanerpes pucherani", "nombreIngles": "Black-cheeked Woodpecker", "nombreComun": "Carpintero Carinegro"},
    {"orden": "Piciformes", "familia": "Ramphastidae", "nombreCientifico": "Pteroglossus torquatus", "nombreIngles": "Collared Aracari", "nombreComun": "Tucancillo Collarejo"},
    {"orden": "Piciformes", "familia": "Ramphastidae", "nombreCientifico": "Ramphastos sulfuratus", "nombreIngles": "Keel-billed Toucan", "nombreComun": "Tucán Pico Iris"},
    {"orden": "Piciformes", "familia": "Ramphastidae", "nombreCientifico": "Ramphastos ambiguus", "nombreIngles": "Yellow-throated Toucan", "nombreComun": "Tucán Pico Castaño"},
    # Psittaciformes
    {"orden": "Psittaciformes", "familia": "Psittacidae", "nombreCientifico": "Amazona autumnalis", "nombreIngles": "Red-lored Amazon", "nombreComun": "Loro Frentirrojo"},
    {"orden": "Psittaciformes", "familia": "Psittacidae", "nombreCientifico": "Amazona farinosa", "nombreIngles": "Mealy Amazon", "nombreComun": "Loro Verde"},
    {"orden": "Psittaciformes", "familia": "Psittacidae", "nombreCientifico": "Brotogeris jugularis", "nombreIngles": "Orange-chinned Parakeet", "nombreComun": "Periquito Barbinaranja"},
    {"orden": "Psittaciformes", "familia": "Psittacidae", "nombreCientifico": "Eupsittula nana", "nombreIngles": "Olive-throated Parakeet", "nombreComun": "Perico Azteco"},
    {"orden": "Psittaciformes", "familia": "Psittacidae", "nombreCientifico": "Psittacara finschi", "nombreIngles": "Crimson-fronted Parakeet", "nombreComun": "Perico Frentirrojo"},
    {"orden": "Psittaciformes", "familia": "Psittacidae", "nombreCientifico": "Pionus senilis", "nombreIngles": "White-crowned Parrot", "nombreComun": "Loro Coroniblanco"},
    {"orden": "Psittaciformes", "familia": "Psittacidae", "nombreCientifico": "Pionus menstruus", "nombreIngles": "Blue-headed Parrot", "nombreComun": "Loro Cabeciazul"},
    # Strigiformes
    {"orden": "Strigiformes", "familia": "Strigidae", "nombreCientifico": "Glaucidium griseiceps", "nombreIngles": "Central American Pygmy-Owl", "nombreComun": "Mochuelo Enano"},
    # Suliformes
    {"orden": "Suliformes", "familia": "Anhingidae", "nombreCientifico": "Anhinga anhinga", "nombreIngles": "Anhinga", "nombreComun": "Pato Aguja"},
    {"orden": "Suliformes", "familia": "Fregatidae", "nombreCientifico": "Fregata magnificens", "nombreIngles": "Magnificent Frigatebird", "nombreComun": "Rabihorcado Magno"},
    {"orden": "Suliformes", "familia": "Phalacrocoracidae", "nombreCientifico": "Nannopterum brasilianum", "nombreIngles": "Neotropic Cormorant", "nombreComun": "Cormorán Neotropical"},
    # Tinamiformes
    {"orden": "Tinamiformes", "familia": "Tinamidae", "nombreCientifico": "Crypturellus soui", "nombreIngles": "Little Tinamou", "nombreComun": "Tinamú Chico"},
]


def create_bird_entry(species: Dict) -> Dict:
    """Crea una entrada completa de ave desde datos básicos."""
    id = generate_id(species["nombreCientifico"])

    return {
        "id": id,
        "orden": species["orden"],
        "familia": species["familia"],
        "nombreCientifico": species["nombreCientifico"],
        "nombreIngles": species["nombreIngles"],
        "nombreComun": species["nombreComun"],
        "imagen": generate_image_path(species["nombreCientifico"]),
        "audio": generate_audio_path(species["nombreComun"]),
        "tamaño": estimate_size(species["orden"], species["familia"]),
        "habitat": estimate_habitat(species["orden"], species["familia"], species["nombreComun"]),
        "colores": estimate_colors(species["nombreComun"], species["nombreIngles"]),
        "descripcion": f"Información sobre {species['nombreComun']} ({species['nombreCientifico']}).",
        "dieta": "Información de alimentación pendiente.",
        "comportamiento": "Información de comportamiento pendiente.",
        "conservacion": "Preocupación Menor",
        "rutaObservada": [],
        "emblematica": False
    }


def main():
    """Función principal."""
    print("Generando archivo JSON de aves...")

    metadata = {
        "title": "Inventario de Aves - Conteo 2024",
        "corredor": "Corredor Biológico Bosque Las Madres",
        "fecha": "26-27 de octubre, 2024",
        "totalEspecies": len(SPECIES_DATA),
        "rutas": [
            "Selva Bananito",
            "Ruta Burrico",
            "San Clemente",
            "Aviarios del Caribe"
        ],
        "especiesEmblematicas": {
            "ganadora": "Urraca Pechinegra",
            "candidatas": [
                "Tucán Pico Iris",
                "Urraca Pechinegra",
                "Mosquero Coludo",
                "Ermitaño Bronceado"
            ]
        }
    }

    birds = []
    for species in SPECIES_DATA:
        bird = create_bird_entry(species)
        birds.append(bird)

    emblematic_names = ["Tucán Pico Iris", "Urraca Pechinegra", "Mosquero Coludo", "Ermitaño Bronceado"]
    for bird in birds:
        if bird["nombreComun"] in emblematic_names:
            bird["emblematica"] = True
            if bird["nombreComun"] == "Urraca Pechinegra":
                bird["ganadoraConteo2024"] = True

    output = {
        "metadata": metadata,
        "birds": birds
    }

    output_file = "../data/birds.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"JSON generado exitosamente: {output_file}")
    print(f"   Total de especies: {len(birds)}")
    print("\nNota: Las rutas de imagen usan el nombre cientifico:")
    print("   Ejemplo: assets/images/aves/buteogallus-anthracinus.jpg")
    print("\nCampos que puedes completar manualmente despues:")
    print("   - descripcion")
    print("   - dieta")
    print("   - comportamiento")
    print("   - rutaObservada")


if __name__ == "__main__":
    main()
