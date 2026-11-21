import type { Metadata, Viewport } from "next";
import Link from "next/link";

import CurrencySelector from "../components/CurrencySelector";
import MicrositeDialogs from "../components/MicrositeDialogs";
import SchoolMediaGallery from "../components/SchoolMediaGallery";
import ProgrammeSectionLayout from "../components/ProgrammeSectionLayout";

import { NuevaZelandaSchoolMedia } from "../data/schoolMedia";

import "../styles/paises/nueva-zelanda-nueva-zelanda-b.css";
import "../styles/paises/nueva-zelanda-promociones-originales.css";
import "../styles/paises/currency-selector.css";
import "../styles/paises/nueva-zelanda-inline.css";

/**
 * /beneficios-empresa/nueva-zelanda — ported from the published source, class for
 * class, against its own stylesheets. Re-port with
 * `scripts/microsite/portMicrosite.py`; the source changes often.
 *
 * The source page's body classes move onto the wrapper below, since the
 * microsite cannot style the shared <body>.
 *
 * Behaviour the source loads as external scripts is supplied by components:
 * the currency converter, the offerings reflow, and the contact dialog, which
 * replaces the Netlify form and posts to our own backend.
 */

export const metadata: Metadata = {
  title: "Cursos de Inglés en Nueva Zelanda | Destinos y Programas",
  description:
    "Explora cursos de inglés en Auckland, Rotorua y Tauranga: packs de 2 a 4 semanas, opciones de estudio y trabajo y experiencias para jóvenes.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

export default function NuevaZelandaPage() {
  return (
    <div className="principal-b-page">
      <header className="site-header container"><Link aria-label="MatchMyCourse, volver a la portada de Beneficios" className="brand" href="/beneficios-empresa"><img alt="MatchMyCourse" height="58" src="/beneficios-empresa/assets/logo.png" width="216" /></Link></header><main id="inicio">
<section className="hero"><div aria-hidden="true" className="blob one"></div><div aria-hidden="true" className="blob two"></div><div aria-hidden="true" className="blob three"></div><div aria-hidden="true" className="blob yellow"></div><div className="container hero-inner"><span className="eyebrow">NUEVA ZELANDA · PROGRAMAS INTERNACIONALES</span>
<h1><span className="hero-title-line">Cursos de inglés en Nueva Zelanda</span><span className="hero-title-line hero-title-line-two accent">Descubre tu próxima experiencia</span></h1>
<p>Compara distintas formas de estudiar inglés en Nueva Zelanda. Descubre packs de corta duración en Auckland, Rotorua y Tauranga, alternativas de estudio y trabajo y experiencias de inglés con actividades para jóvenes. Elige la ciudad y el programa que mejor se adapten a tus objetivos.</p></div></section>
<section className="section choose" id="elige"><div aria-hidden="true" className="flight-motif"><svg fill="none" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg"><path d="M4 119C57 143 83 85 128 89S197 127 218 64C224 45 230 36 249 29" stroke="#9CB5F5" strokeDasharray="3 10" strokeLinecap="round" strokeWidth="2.3" /><circle cx="16" cy="120" fill="#D6E5FF" r="6" /><circle cx="169" cy="99" fill="#CFDDFE" r="4.5" /><g stroke="#6C8CEB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" transform="translate(246 5) rotate(18 21 22)"><path d="M39 6L23 23M39 6L28 37L21 25L9 18L39 6Z" fill="#E8EFFF" /><path d="M21 25L16 36L28 37" fill="#D0E0FF" /></g></svg></div><div className="container"><div className="section-head center"><h2>Elige una experiencia a tu medida</h2><p>Explora las distintas experiencias educativas disponibles en Nueva Zelanda y descubre las alternativas para adultos y jóvenes.</p></div><div className="principal-b-categories"><a aria-label="Ir a Inglés de corta duración" className="principal-b-category-card" href="#ingles-corta-duracion"><div className="principal-b-category-photo"><img alt="Estudiantes internacionales compartiendo una experiencia de aprendizaje en Auckland" decoding="async" height="750" loading="lazy" src="/beneficios-empresa/nueva-zelanda/media/ingles-corta-duracion.webp" width="1000" /><span aria-hidden="true" className="principal-b-category-arrow">↗</span></div><div className="principal-b-category-body"><span className="principal-b-category-tag">ADULTOS Y JÓVENES</span><h3>Inglés de corta duración</h3><p>Cursos de inglés para quienes desean mejorar sus habilidades durante sus vacaciones o una estancia breve en Nueva Zelanda.</p></div></a><a aria-label="Ir a Estudio y trabajo" className="principal-b-category-card" href="#estudio-trabajo"><div className="principal-b-category-photo"><img alt="Fotografía ilustrativa de jóvenes adultos trabajando en una cafetería" decoding="async" height="750" loading="lazy" src="/beneficios-empresa/nueva-zelanda/media/estudio-trabajo.webp" width="1000" /><span aria-hidden="true" className="principal-b-category-arrow">↗</span></div><div className="principal-b-category-body"><span className="principal-b-category-tag">PROGRAMAS PARA ADULTOS</span><h3>Estudio y trabajo</h3><p>Programas de inglés de larga duración que permiten combinar el aprendizaje del idioma con oportunidades de trabajo, según las condiciones migratorias de Nueva Zelanda.</p></div></a><a aria-label="Ir a Campamentos y experiencias" className="principal-b-category-card" href="#campamentos-experiencias"><div className="principal-b-category-photo"><img alt="Imagen ilustrativa de adolescentes participando en una actividad educativa" decoding="async" height="750" loading="lazy" src="/beneficios-empresa/nueva-zelanda/media/skyline-rotovegas-campamentos.webp" width="1000" /><span aria-hidden="true" className="principal-b-category-arrow">↗</span></div><div className="principal-b-category-body"><span className="principal-b-category-tag">PROGRAMAS PARA JÓVENES</span><h3>Campamentos y experiencias</h3><p>Experiencias educativas internacionales para jóvenes que pueden combinar aprendizaje, actividades culturales y convivencia con estudiantes de distintas nacionalidades, según el programa.</p></div></a></div></div></section>
<section className="section destinations principal-b-auto-section" id="adultos"><div className="container"><div className="principal-b-auto-layout"><div className="section-head"><span className="eyebrow">CURSOS DE INGLÉS DE CORTA DURACIÓN</span><h2 id="ingles-corta-duracion">Packs de inglés en Auckland, Rotorua y Tauranga</h2><p>Mejora tu inglés mientras descubres diferentes ciudades de Nueva Zelanda. Desde la vida urbana y multicultural de Auckland hasta los paisajes naturales y experiencias culturales de Rotorua y el ambiente costero de Tauranga. Elige dónde vivir tu experiencia y aprovecha tu estancia para aprender inglés, conocer nuevas personas y descubrir todo lo que este destino tiene para ofrecer.</p></div><div aria-label="Promociones de cursos y alojamiento en Nueva Zelanda" className="nz-promo-embed"><div className="compact-grid" id="nzPromoPackGrid">
<article className="compact-card" data-city="Auckland" data-course="Inglés General 20 horas" data-school="worldwide">
<div className="compact-photo">
<img alt="Worldwide School of English en Auckland" className="compact-cover" loading="lazy" src="/beneficios-empresa/nueva-zelanda/auckland-new.webp" />
<span className="photo-school">Worldwide School of English</span>
</div>
<div className="compact-content">
<div className="compact-heading">
<div>
<p className="kicker">AUCKLAND · INGLÉS GENERAL</p>
<h3>Curso + Alojamiento</h3>
</div>
<img alt="Logo Worldwide School of English" className="compact-logo compact-logo-badge worldwide-logo" src="/beneficios-empresa/nueva-zelanda/worldwide-logo.png" />
</div>
<p className="compact-hours">20 horas de inglés por semana</p>
<div className="compact-prices nz-three-prices"><div><strong>$2.320</strong><span>2 semanas</span></div><div><strong>$3.150</strong><span>3 semanas</span></div><div><strong>$3.980</strong><span>4 semanas</span></div></div><p className="price-exclusion-note">Precio total del pack: curso de inglés, matrícula, alojamiento en residencia con habitación individual, comidas y transfer incluidos. Materiales y seguro médico no incluidos.</p><p className="currency-caption">• <em>Los precios se encuentran en dólares neozelandeses.</em></p>
<details className="program-details">
<summary>Ver detalles del programa <span aria-hidden="true" className="chevron">⌄</span></summary>
<div className="details-body"><div className="details-grid"><div><small>Ciudad</small><strong>Auckland, Nueva Zelanda</strong></div><div><small>Duración</small><strong>2, 3, 4 semanas</strong></div><div><small>Horario</small><strong>Lunes a viernes, 09:00–14:20</strong></div><div><small>Clases semanales</small><strong>20 horas</strong></div><div><small>Nivel mínimo</small><strong>A1</strong></div><div><small>Tipo de alojamiento</small><strong>Residencia de estudiantes</strong></div></div><div className="pack-breakdown"><strong>¿Qué incluye el precio total?</strong><p>Los precios publicados corresponden al pack completo de 2, 3 o 4 semanas, según la duración elegida.</p><ul><li>Curso de inglés general: 20 horas por semana</li><li>Matrícula de la escuela</li><li>Alojamiento en residencia de estudiantes, habitación individual</li><li>Comidas</li><li>Transfer de aeropuerto</li><li>Gastos de alojamiento incluidos en el pack</li></ul><strong>¿Qué no incluye?</strong><ul><li>Materiales del curso: NZD $20</li><li>Seguro médico: valor por confirmar</li><li>Pasajes aéreos</li></ul><p><strong>Beneficio por convenio con MatchMyCourse: </strong>si tienes un convenio, te regalamos los materiales del curso y el seguro médico, sin costo adicional.</p><p className="pack-total-note">Precios expresados en dólares neozelandeses (NZD). Valores sujetos a disponibilidad y confirmación antes de reservar.</p></div>
<div className="media-actions">
<button className="media-action" data-modal="photos" type="button">Ver imágenes de la escuela <span aria-hidden="true">↗</span></button>
</div>
<a className="contact-action" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Curso%20%2B%20Alojamiento%20de%20Worldwide%20School%20of%20English%20en%20Auckland%20que%20se%20cursa%20en%20Nueva%20Zelanda.">Consultar este programa →</a>
</div>
</details>
</div>
</article>
<article className="compact-card" data-city="Mount Maunganui" data-course="Inglés General 15 horas" data-school="mount">
<div className="compact-photo">
<img alt="Surfistas en la playa de Tauranga, Nueva Zelanda" className="compact-cover" loading="lazy" src="/beneficios-empresa/nueva-zelanda/tauranga-new.webp" />
<span className="photo-school">Mount Maunganui Language Centre</span>
</div>
<div className="compact-content">
<div className="compact-heading">
<div><p className="kicker">MOUNT MAUNGANUI · INGLÉS GENERAL</p>
<h3>Curso + Alojamiento</h3></div>
</div>
<p className="compact-hours">15 horas de inglés por semana</p>
<div className="compact-prices"><div><strong>$3.033</strong><span>2 semanas</span></div><div><strong>$3.862</strong><span>3 semanas</span></div><div><strong>$4.691</strong><span>4 semanas</span></div></div><p className="price-exclusion-note">Precio total del pack: curso de inglés, alojamiento en familia anfitriona y comidas incluidos. Matrícula, traslado de aeropuerto, materiales y seguro médico no incluidos.</p><p className="currency-caption">• <em>Los precios se encuentran en dólares neozelandeses.</em></p>
<details className="program-details">
<summary>Ver detalles del programa <span aria-hidden="true" className="chevron">⌄</span></summary>
<div className="details-body"><div className="details-grid"><div><small>Ciudad</small><strong>Mount Maunganui, Nueva Zelanda</strong></div><div><small>Duración</small><strong>2, 3, 4 semanas</strong></div><div><small>Horario</small><strong>Lunes a viernes, 09:00–12:15</strong></div><div><small>Clases semanales</small><strong>15 horas</strong></div><div><small>Nivel mínimo</small><strong>A1</strong></div><div><small>Tipo de alojamiento</small><strong>Homestay</strong></div></div><div className="pack-breakdown"><strong>¿Qué incluye el precio total?</strong><p>Los valores de 2, 3 y 4 semanas corresponden al pack de la duración elegida; no incluyen los servicios indicados a continuación.</p><ul><li>Curso de inglés general: 15 horas semanales</li><li>Alojamiento con familia anfitriona (homestay)</li><li>Comidas durante la estancia</li></ul><strong>¿Qué no incluye?</strong><ul><li>Matrícula de la escuela (costo adicional)</li><li>Traslado de aeropuerto de ida y vuelta (costo adicional)</li><li>Materiales del curso: NZD $75</li><li>Seguro médico: valor por confirmar</li><li>Pasajes aéreos</li></ul><p><strong>Beneficio por convenio con MatchMyCourse:</strong> si tienes un convenio, te regalamos los materiales del curso y el seguro médico, sin costo adicional.</p><p className="pack-total-note">Precios expresados en dólares neozelandeses (NZD). Valores sujetos a disponibilidad y confirmación antes de reservar.</p></div>
<div className="media-actions">
<button className="media-action" data-modal="photos" type="button">Ver imágenes de la escuela <span aria-hidden="true">↗</span></button>
</div>
<a className="contact-action" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Curso%20%2B%20Alojamiento%20de%20Mount%20Maunganui%20Language%20Centre%20en%20Mount%20Maunganui%20que%20se%20cursa%20en%20Nueva%20Zelanda.">Consultar este programa →</a>
</div>
</details>
</div>
</article>
<article className="compact-card" data-city="Rotorua" data-course="Inglés General 15 horas" data-school="rela">
<div className="compact-photo">
<img alt="Rotorua English Language Academy en Rotorua" className="compact-cover" loading="lazy" src="/beneficios-empresa/nueva-zelanda/rotorua-bote-portada.webp" />
<span className="photo-school">Rotorua English Language Academy</span>
</div>
<div className="compact-content">
<div className="compact-heading">
<div>
<p className="kicker">ROTORUA · INGLÉS GENERAL</p>
<h3>Curso + Alojamiento</h3>
</div>
<img alt="Logo Rotorua English Language Academy" className="compact-logo compact-logo-badge rela-logo" src="/beneficios-empresa/nueva-zelanda/rela-logo.png" />
</div>
<p className="compact-hours">15 horas de inglés por semana</p>
<div className="compact-prices nz-three-prices"><div><strong>$2.292</strong><span>2 semanas</span></div><div><strong>$2.907</strong><span>3 semanas</span></div><div><strong>$3.522</strong><span>4 semanas</span></div></div><p className="price-exclusion-note">Precio total del pack: curso de inglés, matrícula, traslado de aeropuerto, alojamiento con familia anfitriona y comidas incluidos. Materiales y seguro médico no incluidos.</p><p className="currency-caption">• <em>Los precios se encuentran en dólares neozelandeses.</em></p>
<details className="program-details">
<summary>Ver detalles del programa <span aria-hidden="true" className="chevron">⌄</span></summary>
<div className="details-body"><div className="details-grid"><div><small>Ciudad</small><strong>Rotorua, Nueva Zelanda</strong></div><div><small>Duración</small><strong>2, 3, 4 semanas</strong></div><div><small>Horario</small><strong>Lunes a viernes, 09:00–12:15</strong></div><div><small>Clases semanales</small><strong>15 horas</strong></div><div><small>Nivel mínimo</small><strong>A1</strong></div><div><small>Tipo de alojamiento</small><strong>Familia anfitriona</strong></div></div><div className="pack-breakdown"><strong>¿Qué incluye el precio total?</strong><p>Los valores de 2, 3 y 4 semanas corresponden al pack de la duración elegida; no incluyen los servicios indicados a continuación.</p><ul><li>Curso de inglés general: 15 horas semanales</li><li>Matrícula de la escuela</li><li>Traslado de aeropuerto</li><li>Alojamiento con familia anfitriona</li><li>Comidas durante la estancia</li></ul><strong>¿Qué no incluye?</strong><ul><li>Materiales del curso: NZD $120</li><li>Seguro médico: valor por confirmar</li><li>Pasajes aéreos</li></ul><p><strong>Beneficio por convenio con MatchMyCourse:</strong> si tienes un convenio, te regalamos los materiales del curso y el seguro médico, sin costo adicional.</p><p className="pack-total-note">Precios expresados en dólares neozelandeses (NZD). Valores sujetos a disponibilidad y confirmación antes de reservar.</p></div>
<div className="media-actions">
<button className="media-action" data-modal="photos" type="button">Ver imágenes de la escuela <span aria-hidden="true">↗</span></button>
</div>
<a className="contact-action" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Curso%20%2B%20Alojamiento%20de%20Rotorua%20English%20Language%20Academy%20en%20Rotorua%20que%20se%20cursa%20en%20Nueva%20Zelanda.">Consultar este programa →</a>
</div>
</details>
</div>
</article>
</div><dialog aria-labelledby="modalTitle" className="media-dialog" id="mediaDialog">
<div className="modal-top">
<div>
<p className="modal-eyebrow" id="modalEyebrow">ESCUELA</p>
<h2 id="modalTitle">Galería de la escuela</h2>
</div>
<button aria-label="Cerrar ventana" className="modal-close" id="closeModal" type="button">×</button>
</div>
<div className="modal-photos" hidden={true} id="modalPhotos">
<figure>
<img alt="Fotografía de la escuela" id="galleryImage" />
<figcaption>
<span id="galleryCaption"></span>
<span id="galleryCount"></span>
</figcaption>
</figure>
<div className="photo-navigation">
<button id="prevPhoto" type="button">← Anterior</button>
<button id="nextPhoto" type="button">Siguiente →</button>
</div>
<div aria-label="Seleccionar fotografía" className="photo-thumbs" id="photoThumbs"></div>
</div>
<div hidden={true} id="modalVideo">
<div className="video-holder" id="videoHolder"></div>
<p className="video-note" id="videoNote">Video de la escuela.</p>
</div>
</dialog></div></div></div></section><section className="section long-term principal-b-auto-section principal-b-work-feature" id="larga-duracion">
<div aria-hidden="true" className="principal-b-work-backdrop"></div>
<svg aria-hidden="true" className="principal-b-work-clip-defs" focusable="false" height="0" width="0" xmlns="http://www.w3.org/2000/svg"><defs><clipPath clipPathUnits="objectBoundingBox" id="principal-b-work-curve"><path d="M .67 0 C .41 .01 .30 .11 .26 .30 C .19 .53 .14 .79 0 1 L 1 1 L 1 0 Z" /></clipPath></defs></svg>
<div className="container principal-b-work-container">
<div className="principal-b-work-feature-panel principal-b-auto-layout">
<div className="section-head principal-b-work-feature-copy">
<span className="eyebrow">PROGRAMA PARA ADULTOS</span>
<h2 id="estudio-trabajo">Alternativas de estudio y trabajo</h2>
<p>Vive una experiencia internacional de larga duración mientras mejoras tu inglés y descubres cómo es vivir en Nueva Zelanda. Nuestros programas de estudio y trabajo te permiten dedicar varios meses al aprendizaje del idioma y, cuando las condiciones de tu visa lo autorizan, combinar las clases con un empleo. Una oportunidad para conocer nuevas personas, desenvolverte en otro país y disfrutar de una experiencia cultural y personal diferente.</p>
</div>
<div className="principal-b-work-feature-visual principal-b-auto-cards">
<button aria-label="Consultar información del programa de estudio y trabajo en Nueva Zelanda" className="principal-b-work-feature-action" data-contact-destination="Nueva Zelanda" type="button">
<span className="principal-b-work-feature-image"><img alt="Vista del centro de Auckland, Nueva Zelanda" decoding="async" loading="lazy" src="/beneficios-empresa/nueva-zelanda/media/auckland-estudio-trabajo.webp" /></span>
</button>
</div>
</div>
</div>
</section><section className="section principal-b-auto-section junior" id="jovenes"><div className="container"><div className="principal-b-auto-layout"><div className="section-head"><span className="eyebrow">PROGRAMAS PARA JÓVENES</span><h2 id="campamentos-experiencias">Inglés y actividades para jóvenes</h2><p>Dale a tu hijo la oportunidad de vivir una experiencia educativa internacional en Nueva Zelanda. Descubre programas que pueden combinar aprendizaje del inglés, actividades culturales, excursiones y convivencia con jóvenes de distintas nacionalidades, en entornos organizados para favorecer su confianza, autonomía y desarrollo personal.</p></div><div className="programmes principal-b-auto-cards principal-b-junior-cards"><Link aria-label="Ver programa Inglés y actividades en Rotorua de RELA" className="programme-card" href="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades"><div className="programme-photo"><img alt="Imagen de Rotorua, Nueva Zelanda; fotografía ilustrativa del destino" loading="lazy" src="/beneficios-empresa/nueva-zelanda/media/rotorua-programa-actualizado.webp" /><span aria-hidden="true" className="programme-go">↗</span></div><div className="programme-copy"><span className="programme-place">ROTORUA · NUEVA ZELANDA</span><h3>Inglés + actividades en Rotorua</h3><p>Programa para jóvenes</p></div></Link></div></div></div></section>
</main><footer className="site-footer" id="contacto">
<div className="container footer-grid">
<div className="footer-brand">
<a aria-label="MatchMyCourse, volver al inicio" className="footer-logo" href="#inicio"><img alt="MatchMyCourse" height="58" loading="lazy" src="/beneficios-empresa/assets/logo.png" width="215" /></a>
<p className="footer-mission">Maximizamos la compatibilidad entre estudiantes y escuelas de inglés con una plataforma transparente, confiable y personalizada, que permite tomar decisiones informadas, simplificando todo el proceso de búsqueda, comparación y reserva.</p>
<nav aria-label="Redes sociales de MatchMyCourse" className="footer-social">
<a aria-label="Facebook de MatchMyCourse" href="https://www.facebook.com/matchmycourse" rel="noopener noreferrer" target="_blank" title="Facebook"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M15 21v-8h3l.45-4H15V7c0-1.16.3-2 2-2h1V1.45A17 17 0 0 0 15.5 1C12.7 1 11 2.75 11 5.9V9H8v4h3v8z" fill="currentColor" stroke="none" /></svg></a>
<a aria-label="Instagram de MatchMyCourse" href="https://www.instagram.com/match.my.course/" rel="noopener noreferrer" target="_blank" title="Instagram"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24"><rect height="19.2" rx="5.2" width="19.2" x="2.4" y="2.4" /><circle cx="12" cy="12" r="4.3" /><circle cx="17.9" cy="6.2" fill="currentColor" r="1" stroke="none" /></svg></a>
<a aria-label="LinkedIn de MatchMyCourse" href="https://www.linkedin.com/company/matchmycourse/about/" rel="noopener noreferrer" target="_blank" title="LinkedIn"><svg aria-hidden="true" fill="currentColor" stroke="none" viewBox="0 0 24 24"><path d="M4.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM3 9h3v12H3zM9 9h3v1.65c.5-1.1 1.7-1.95 3.45-1.95 3.3 0 4.55 2.05 4.55 5.4V21h-3.2v-6.15c0-1.75-.2-3.05-2.1-3.05-1.85 0-2.5 1.3-2.5 2.95V21H9z" /></svg></a>
<a aria-label="YouTube de MatchMyCourse" href="https://www.youtube.com/@matchmycourse" rel="noopener noreferrer" target="_blank" title="YouTube"><svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><rect fill="currentColor" height="15.4" rx="5" width="21" x="1.5" y="4.3" /><path d="m10 8.15 6.2 3.85L10 15.85z" fill="white" /></svg></a>
</nav>
</div>
<div className="footer-contact">
<h2>Habla con MatchMyCourse</h2>
<div className="footer-contact-item"><span aria-hidden="true" className="footer-contact-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></svg></span><div><strong>Oficina en Irlanda · Dublín</strong><address>77 Candem Street Lower, Dublin 2</address></div></div>
<div className="footer-contact-item"><span aria-hidden="true" className="footer-contact-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></svg></span><div><strong>Oficina en Chile · Santiago</strong><address>Fray Angélico 133, Las Condes</address></div></div>
<div className="footer-contact-item"><span aria-hidden="true" className="footer-contact-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m6.2 2.8 3.2 3.5-1.7 2.3c1.5 3 3.8 5.3 6.8 6.8l2.3-1.7 3.5 3.2-1.1 3.2c-.3.8-1.2 1.1-2 1-8.1-.9-14.3-7.1-15.2-15.2-.1-.8.3-1.7 1-2z" /></svg></span><div><strong>Teléfonos de contacto</strong><a href="tel:+56982959118">Chile: +56 9 8295 9118</a><a href="tel:+353831134401">Irlanda: +353 83 113 4401</a></div></div>
<a className="footer-email" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20cursos%20de%20ingl%C3%A9s%20en%20el%20extranjero.">Escríbenos por WhatsApp</a>
</div>
</div>
<div className="container footer-bottom">© 2026 MatchMyCourse · Todos los derechos reservados.</div>
</footer>
      <CurrencySelector base="NZD" />
      <SchoolMediaGallery media={NuevaZelandaSchoolMedia} scope="#adultos .nz-promo-embed" />
      <ProgrammeSectionLayout />
      <MicrositeDialogs />
    </div>
  );
}
