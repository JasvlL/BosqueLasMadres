#!/usr/bin/env python3
"""
Script para generar el archivo JSON completo con las 180 especies de aves
del Conteo 2024 del Corredor Biológico Bosque Las Madres.

Uso:
    python generate_birds_json.py

Este script toma los datos de la lista proporcionada y genera el JSON
con la estructura correcta para el sistema.
"""

import json
import re
from typing import Dict, List

def generate_id(nombre_cientifico: str) -> str:
    """Genera un ID único desde el nombre científico."""
    # Convertir a minúsculas y reemplazar espacios con guiones
    id = nombre_cientifico.lower().replace(' ', '-')
    # Remover caracteres especiales
    id = re.sub(r'[^\w\-]', '', id)
    return id

def generate_image_path(nombre_comun: str) -> str:
    """Genera la ruta de imagen desde el nombre común."""
    # Convertir a minúsculas, reemplazar espacios y caracteres especiales
    filename = nombre_comun.lower()
    filename = re.sub(r'[áàäâ]', 'a', filename)
    filename = re.sub(r'[éèëê]', 'e', filename)
    filename = re.sub(r'[íìïî]', 'i', filename)
    filename = re.sub(r'[óòöô]', 'o', filename)
    filename = re.sub(r'[úùüû]', 'u', filename)
    filename = re.sub(r'[ñ]', 'n', filename)
    filename = re.sub(r'[^a-z0-9\s]', '', filename)
    filename = filename.replace(' ', '-')
    return f"assets/images/aves/{filename}.jpg"

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
    # Lógica básica para estimar tamaño
    if orden in ['Accipitriformes', 'Falconiformes', 'Cathartiformes', 'Pelecaniformes']:
        return "grande"
    elif orden in ['Passeriformes', 'Piciformes', 'Psittaciformes']:
        # Passeriformes pueden ser pequeños o medianos
        if 'Trochilidae' in familia:
            return "pequeño"
        return "mediano"
    elif orden in ['Apodiformes']:
        return "pequeño"
    else:
        return "mediano"

def estimate_habitat(orden: str, familia: str, nombre_comun: str) -> List[str]:
    """Estima el hábitat basado en orden, familia y nombre."""
    habitats = []
    
    # Lógica básica
    if 'acuático' in nombre_comun.lower() or 'agua' in nombre_comun.lower():
        habitats.append("rio")
    
    if orden in ['Charadriiformes', 'Pelecaniformes', 'Suliformes']:
        habitats.append("rio")
        if 'mar' in nombre_comun.lower() or 'pelicano' in nombre_comun.lower():
            habitats.append("mar")
    
    if orden in ['Accipitriformes', 'Falconiformes', 'Passeriformes', 'Piciformes', 'Psittaciformes']:
        habitats.append("bosque")
        habitats.append("arboles")
    
    if not habitats:
        habitats = ["bosque"]
    
    return list(set(habitats))  # Remover duplicados

def estimate_colors(nombre_comun: str, nombre_ingles: str) -> List[str]:
    """Estima colores basado en nombres."""
    colors = []
    text = (nombre_comun + " " + nombre_ingles).lower()
    
    color_map = {
        'rojo': ['rojo', 'red', 'scarlet', 'crimson', 'rufous', 'rufo'],
        'azul': ['azul', 'blue', 'cyan'],
        'verde': ['verde', 'green', 'emerald'],
        'amarillo': ['amarillo', 'yellow', 'golden', 'gold'],
        'negro': ['negro', 'black', 'dark'],
        'blanco': ['blanco', 'white', 'snowy', 'pale'],
        'gris': ['gris', 'gray', 'grey', 'slaty'],
        'marrón': ['marrón', 'brown', 'cinnamon', 'chestnut'],
        'multicolor': ['multicolor', 'rainbow', 'iridescent']
    }
    
    for color, keywords in color_map.items():
        if any(keyword in text for keyword in keywords):
            colors.append(color)
    
    if not colors:
        colors = ["marrón"]  # Default
    
    return colors

# Lista de especies del conteo (ejemplo con algunas especies)
# Necesitas completar esta lista con todas las 180 especies
SPECIES_DATA = [
    {
        "orden": "Accipitriformes",
        "familia": "Accipitridae",
        "nombreCientifico": "Buteogallus anthracinus",
        "nombreIngles": "Common Black Hawk",
        "nombreComun": "Gavilán Cangrejero"
    },
    # ... Agregar aquí todas las 180 especies
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
        "imagen": generate_image_path(species["nombreComun"]),
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
    
    # Metadata
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
    
    # Procesar especies
    birds = []
    for species in SPECIES_DATA:
        bird = create_bird_entry(species)
        birds.append(bird)
    
    # Marcar especies emblemáticas
    emblematic_names = ["Tucán Pico Iris", "Urraca Pechinegra", "Mosquero Coludo", "Ermitaño Bronceado"]
    for bird in birds:
        if bird["nombreComun"] in emblematic_names:
            bird["emblematica"] = True
            if bird["nombreComun"] == "Urraca Pechinegra":
                bird["ganadoraConteo2024"] = True
    
    # Crear estructura final
    output = {
        "metadata": metadata,
        "birds": birds
    }
    
    # Guardar JSON
    output_file = "../data/birds.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"✅ JSON generado exitosamente: {output_file}")
    print(f"   Total de especies: {len(birds)}")
    print("\n⚠️  IMPORTANTE: Revisa y completa los siguientes campos:")
    print("   - descripcion")
    print("   - dieta")
    print("   - comportamiento")
    print("   - habitat (verificar)")
    print("   - colores (verificar)")
    print("   - tamaño (verificar)")

if __name__ == "__main__":
    main()

