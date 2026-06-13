import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Conteo de Aves 2024",
  description:
    "Sistematización del Conteo de Aves 2024 del Corredor Biológico Bosque Las Madres: antecedente, rutas, resultados y comunidad.",
};

export default function ConteoAves2024() {
  return (
    <div className="conteo-page">
      <section className="hero-page">
        <div className="hero-page-bg">
          {/* Usamos el ave ganadora: Urraca Pechinegra, o una imagen representativa si no existe Urraca Pechinegra.jpg, uso placeholder u otro */}
          <Image src="/assets/images/aves/Cyanocorax affinis.jpg" alt="Conteo de Aves" fill priority />
        </div>
        <div className="hero-page-content">
          <h1>Sistematización del Conteo de Aves 2024</h1>
          <p>Documento de divulgación basado en el trabajo comunitario y científico ciudadano del conteo realizado en octubre de 2024.</p>
        </div>
      </section>

      <section className="section-light content-section" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container container-narrow">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link> / <span>Conteo de aves 2024</span>
          </nav>

          <section className="content-section" style={{ paddingTop: 0 }}>
          <h2>¿Por qué importan los corredores biológicos y los conteos de aves?</h2>
          <p>
            Los corredores biológicos son territorios que conectan áreas silvestres
            protegidas, paisajes, ecosistemas y hábitats para mantener la
            biodiversidad y los procesos ecológicos. Costa Rica cuenta con{" "}
            <strong>52 corredores biológicos</strong>, que representan casi un{" "}
            <strong>33&nbsp;% del territorio continental</strong>, según el SINAC.
          </p>
          <p>
            Registrar las especies que habitan estos espacios permite entender
            mejor la <strong>salud de los ecosistemas</strong> y, con el tiempo,
            analizar si hay cambios en la abundancia o presencia de especies. En
            un contexto de <strong>crisis climática y presiones sobre el territorio</strong>
            , esa línea base es una herramienta valiosa para la gestión y la
            educación.
          </p>
        </section>

        <section className="content-section">
          <h2>Antecedentes del Corredor Biológico Bosque Las Madres</h2>
          <p>
            El CBBM se ubica en los distritos de <strong>Matama</strong> y{" "}
            <strong>Valle de la Estrella</strong>, cantón y provincia de{" "}
            <strong>Limón</strong>, dentro del ámbito de la{" "}
            <strong>Área de Conservación La Amistad Caribe (ACLAC)</strong>.
          </p>
          <p>
            <strong>Límites generales:</strong> al norte, la cuenca del río Banano;
            al oeste, la Zona Protectora Río Banano; al este, el mar Caribe; al
            sureste, el Refugio de Vida Silvestre Aviarios del Caribe (Santuario de
            Perezosos) y la margen norte de la desembocadura del río Estrella; al
            sur, la Reserva Indígena Tayní y la cuenca del río Estrella.
          </p>
          <p>
            En <strong>abril de 2023</strong> se realizó la primera ecoferia o
            festival del corredor biológico, con gran acogida. A partir de ahí, el{" "}
            <strong>comité local</strong> propuso organizar un{" "}
            <strong>conteo de aves</strong> para generar el primer inventario
            regional, articulando ciencia ciudadana con{" "}
            <strong>intervenciones artísticas y culturales</strong> y la
            participación de la comunidad.
          </p>
        </section>

        <section className="content-section">
          <h2>Quiénes hicieron posible el conteo</h2>
          <p>Participaron diversos aliados clave:</p>
          <ul className="partners-list" style={{ paddingLeft: "1.5rem", lineHeight: "1.8" }}>
            <li>
              <strong>Selva Bananito Experience:</strong> alojamiento y alimentación
              para observadores de aves y funcionarios del SINAC.
            </li>
            <li>
              <strong>Work With Nature:</strong> apoyo en el conteo de aves.
            </li>
            <li>
              <strong>Niños y Aves:</strong> actividades sociales el día posterior
              al conteo, integrando a niñez y comunidad en la observación con
              binoculares y dinámicas.
            </li>
            <li>
              <strong>Fundación Cuencas de Limón:</strong> financiamiento de
              acciones, alimentación comunitaria el domingo y apoyo a hospedaje y
              alimentación en Selva Bananito.
            </li>
            <li>
              <strong>The Dallas World Aquarium:</strong> recursos para acciones del
              Santuario de Perezosos.
            </li>
            <li>
              <strong>Sloth Sanctuary Costa Rica:</strong> hospedaje y apoyo
              logístico.
            </li>
            <li>
              <strong>Programa Nacional de Corredores Biológicos de Costa Rica.</strong>
            </li>
            <li>
              <strong>Área de Conservación La Amistad Caribe (ACLAC) y SINAC:</strong>{" "}
              personal, logística y transporte.
            </li>
            <li>
              <strong>Naturalista CR (iNaturalist Costa Rica):</strong> difusión
              nacional del conteo en redes.
            </li>
            <li>
              <strong>The Cornell Lab of Ornithology (Merlin):</strong> apoyo en
              identificación de aves.
            </li>
            <li>
              <strong>eBird:</strong> plataforma de ciencia ciudadana para subir
              listas por ruta.
            </li>
            <li>
              <strong>Universidad de Magallanes:</strong> apoyo en actividades del
              conteo y sistematización del primer inventario.
            </li>
            <li>
              <strong>Comité Local del CBBM:</strong> coordinación general, diseño
              de rutas y organización del evento comunal.
            </li>
            <li>
              <strong>Liceo Capitán Ramón Rivas:</strong> el grupo de danza se
              presentó un domingo, comunicó beneficios ecosistémicos de las aves y
              expuso obras pictóricas alusivas al conteo y al CBBM.
            </li>
          </ul>
        </section>

        <section className="content-section">
          <h2>¿Cómo se organizó el conteo?</h2>
          <p>
            Bajo la coordinación del Comité Local del CBBM se llevaron a cabo{" "}
            <strong>reuniones periódicas</strong> para definir logística: rutas,
            alojamientos, alimentación y equipos de trabajo.
          </p>
          <p>
            Las fechas del conteo fueron el <strong>26 y 27 de octubre de 2024</strong>
            . Los equipos llegaron el <strong>25 de octubre</strong> a los sitios
            de estadía para la reunión de planificación del día 26.
          </p>
          <p>
            Un grupo se alojó en <strong>Selva Bananito</strong> (Justo López,
            Marteen van der Beek, Constanza Lillo, Jean Carlos y Julio Barquero).
            Los demás equipos se alojaron en <strong>Aviarios del Caribe</strong>.
          </p>
          <p>
            El <strong>26 de octubre</strong> el conteo comenzó a las{" "}
            <strong>5:00 a. m.</strong> en todas las rutas y el cierre fue a las{" "}
            <strong>10:00 a. m.</strong>; luego los equipos regresaron a levantar
            las listas en <strong>eBird</strong>.
          </p>
        </section>

        <section className="content-section">
          <h2>Rutas del conteo</h2>
          <dl className="routes-dl">
            <dt>Selva Bananito</dt>
            <dd>
              Equipo: Justo López, Yerry y Constanza Lillo. Recorrido de unos{" "}
              <strong>3 km</strong> por senderos y caminos, desde las 5:00 a. m.,
              con eBird y Merlin. Se observaron migraciones de zopilotes y varios
              passeriformes. <strong>36 especies</strong> registradas en esta
              ruta.
            </dd>
            <dt>Ruta Burrico</dt>
            <dd>
              Equipo: Jean Carlos, Marteen van der Beek, Justo Barqueros y Pedro
              Porras. Salida 4:30 a. m. desde Selva Bananito Lodge hacia la escuela
              de Burrico, punto de inicio del conteo.
            </dd>
            <dt>San Clemente</dt>
            <dd>
              Equipo: Gabriel Naranjo, Carlos Solano, Eyder Fonseca y Briyan
              Pérez.
            </dd>
            <dt>Aviarios del Caribe</dt>
            <dd>Equipo: Mercedes Alpízar, Nacho y Alex Chávez.</dd>
          </dl>
        </section>

        <section className="content-section">
          <h2>Resultados del conteo</h2>
          <p>
            Al cerrar las listas, el equipo se reunió en Selva Bananito. Por
            problemas de conexión, el “rezo” de especies se hizo de forma manual:
            con la guía de identificación se nombraron las especies y los equipos
            confirmaron si las habían visto, mientras se digitaba en computadora.
            El resultado consolidado fue de <strong>180 especies</strong> entre
            todas las rutas.
          </p>
          <p className="text-note">
            El inventario en línea del CBBM presenta fichas sistematizadas para{" "}
            <strong>177 especies</strong>; la cifra de 180 corresponde al conteo
            de campo unificado ese fin de semana (posibles diferencias por
            criterios de registro o taxonomía al sistematizar).
          </p>
          <p>
            Las listas se subieron a <strong>eBird</strong> y se compartieron. Luego
            hubo dos dinámicas: cada equipo eligió una{" "}
            <strong>especie representativa</strong> de su ruta para presentar al
            día siguiente a la comunidad (voto para ave emblema del conteo 2025),
            y cada equipo diseñó una <strong>“especie mágica”</strong> ficticia
            para presentar al cierre.
          </p>
        </section>

        <section className="content-section">
          <h2>27 de octubre: día con la comunidad</h2>
          <p>
            Tras recoger pertenencias en Selva Bananito, el grupo se trasladó al{" "}
            <strong>gimnasio</strong> en buseta conducida por Pedro. Se repartieron
            camisetas y Mercedes preparó binoculares para la observación con la
            niñez, con apoyo de los observadores.
          </p>
          <p>
            Luego hubo charlas con docentes, exposición de estudiantes e{" "}
            <strong>intervención artística</strong> con el baile nacional de Costa
            Rica. Los observadores presentaron el resultado del conteo y cada
            equipo defendió su candidata a ave emblema:{" "}
            <strong>Tucán Pico Iris</strong>, <strong>Urraca Pechinegra</strong>,{" "}
            <strong>Mosquero Coludo</strong> y <strong>Ermitaño Bronceado</strong>.
            La comunidad votó y la{" "}
            <strong>ganadora fue la Urraca Pechinegra</strong>.
          </p>
          <p>
            Se cerró con un <strong>bio-bingo</strong> moderado por Eyder Fonseca,
            con premios como poleras del corredor y árboles nativos. Fue una
            jornada de cierre y despedida del equipo del conteo.
          </p>
        </section>

        <section className="content-section highlight-box" style={{ marginBottom: 0 }}>
          <h2>Inventario en línea</h2>
          <p>
            En este sitio puede explorar la <strong>sección Fauna</strong> con
            fichas, fotografías y enlaces de verificación. El trabajo de campo y
            la sistematización continúan siendo un esfuerzo colectivo del CBBM.
          </p>
          <p style={{ margin: 0 }}>
            <Link href="/aves" className="btn btn-primary">
              Ver fauna
            </Link>
          </p>
        </section>
        </div>
      </section>
    </div>
  );
}
