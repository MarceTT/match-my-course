import type { Metadata, Viewport } from "next";
import Link from "next/link";

import CurrencySelector from "../components/CurrencySelector";
import MicrositeDialogs from "../components/MicrositeDialogs";
import SchoolMediaGallery from "../components/SchoolMediaGallery";
import ProgrammeSectionLayout from "../components/ProgrammeSectionLayout";

import { IrlandaSchoolMedia } from "../data/schoolMedia";

import "../styles/paises/irlanda-principal-b.css";
import "../styles/paises/irlanda-irlanda-ofertas-originales.css";
import "../styles/paises/irlanda-experiencias.css";
import "../styles/paises/currency-selector.css";

/**
 * /beneficios-empresa/irlanda — ported from the published source, class for
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
  title: "Cursos de Inglés en Irlanda: Packs y Campamentos | MatchMyCourse",
  description:
    "Estudia inglés en Irlanda con packs de curso y alojamiento de 2 a 4 semanas. Explora campamentos para jóvenes, programas deportivos y distintas ciudades.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

export default function IrlandaPage() {
  return (
    <div className="principal-b-page">
      <header className="site-header container"><Link aria-label="MatchMyCourse, volver a la portada de Beneficios" className="brand" href="/beneficios-empresa"><img alt="MatchMyCourse" height="58" src="/beneficios-empresa/assets/logo.png" width="216" /></Link></header><main id="inicio">
<section className="hero"><div aria-hidden="true" className="blob one"></div><div aria-hidden="true" className="blob two"></div><div aria-hidden="true" className="blob three"></div><div aria-hidden="true" className="blob yellow"></div><div className="container hero-inner"><span className="eyebrow">IRLANDA · PROGRAMAS INTERNACIONALES</span>
<h1><span className="hero-title-line">Cursos de inglés en Irlanda</span><span className="hero-title-line hero-title-line-two accent">para adultos y jóvenes</span></h1>
<p><strong>Vive una experiencia única. </strong>Descubre diferentes formas de estudiar en Irlanda, desde cursos de inglés de corta duración y programas de estudio y trabajo hasta campamentos educativos para jóvenes y experiencias que combinan el aprendizaje del idioma con actividades deportivas. Encuentra el programa que mejor se adapte a tus intereses y objetivos.</p></div></section>
<section className="section choose" id="elige"><div aria-hidden="true" className="flight-motif"><svg fill="none" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg"><path d="M4 119C57 143 83 85 128 89S197 127 218 64C224 45 230 36 249 29" stroke="#9CB5F5" strokeDasharray="3 10" strokeLinecap="round" strokeWidth="2.3" /><circle cx="16" cy="120" fill="#D6E5FF" r="6" /><circle cx="169" cy="99" fill="#CFDDFE" r="4.5" /><g stroke="#6C8CEB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" transform="translate(246 5) rotate(18 21 22)"><path d="M39 6L23 23M39 6L28 37L21 25L9 18L39 6Z" fill="#E8EFFF" /><path d="M21 25L16 36L28 37" fill="#D0E0FF" /></g></svg></div><div className="container"><div className="section-head center"><h2>¿Qué curso de inglés estás buscando en Irlanda?</h2><p>Explora las distintas experiencias educativas disponibles en Irlanda y descubre las alternativas para adultos y jóvenes.</p></div><div className="principal-b-categories"><a aria-label="Ir a Inglés de corta duración" className="principal-b-category-card" href="#ingles-corta-duracion"><div className="principal-b-category-photo"><img alt="Estudiantes internacionales en una clase de inglés" decoding="async" height="750" loading="lazy" src="/beneficios-empresa/irlanda/media/ingles-corta-duracion.webp" width="1000" /><span aria-hidden="true" className="principal-b-category-arrow">↗</span></div><div className="principal-b-category-body"><span className="principal-b-category-tag">ADULTOS Y JÓVENES</span><h3>Inglés de corta duración</h3><p>Programas de inglés para quienes desean mejorar sus habilidades durante unas vacaciones o una estancia breve en Irlanda, con alternativas para adultos y jóvenes.</p></div></a><a aria-label="Ir a Estudio y trabajo" className="principal-b-category-card" href="#estudio-trabajo"><div className="principal-b-category-photo"><img alt="Imagen ilustrativa de jóvenes adultos trabajando en una cafetería" decoding="async" height="750" loading="lazy" src="/beneficios-empresa/irlanda/media/estudio-trabajo.webp" width="1000" /><span aria-hidden="true" className="principal-b-category-arrow">↗</span></div><div className="principal-b-category-body"><span className="principal-b-category-tag">PROGRAMAS PARA ADULTOS</span><h3>Estudio y trabajo</h3><p>Programas de inglés de larga duración que permiten combinar el aprendizaje del idioma con posibilidades de trabajar en Irlanda, según las condiciones migratorias.</p></div></a><a aria-label="Ir a Campamentos y experiencias" className="principal-b-category-card" href="#campamentos-experiencias"><div className="principal-b-category-photo"><img alt="Imagen ilustrativa de adolescentes compartiendo una actividad educativa" decoding="async" height="750" loading="lazy" src="/beneficios-empresa/irlanda/media/campamentos-experiencias.webp" width="1000" /><span aria-hidden="true" className="principal-b-category-arrow">↗</span></div><div className="principal-b-category-body"><span className="principal-b-category-tag">PROGRAMAS PARA JÓVENES</span><h3>Campamentos y experiencias</h3><p>Experiencias educativas internacionales para menores de 18 años que combinan aprendizaje, actividades culturales, excursiones y convivencia con jóvenes de distintas nacionalidades.</p></div></a><a aria-label="Ir a Inglés y deportes" className="principal-b-category-card" href="#ingles-deportes"><div className="principal-b-category-photo"><img alt="Jóvenes participando en una actividad de rugby" decoding="async" height="750" loading="lazy" src="/beneficios-empresa/irlanda/media/ingles-deportes.webp" width="1000" /><span aria-hidden="true" className="principal-b-category-arrow">↗</span></div><div className="principal-b-category-body"><span className="principal-b-category-tag">JÓVENES Y ADULTOS</span><h3>Inglés y deportes</h3><p>Programas que combinan clases de inglés con actividades como golf y rugby, con alternativas para jóvenes y algunas experiencias disponibles para adultos.</p></div></a></div></div></section>
<section className="section destinations principal-b-auto-section" id="adultos"><div className="container"><div className="principal-b-auto-layout"><div className="section-head"><span className="eyebrow">VIVE LA EXPERIENCIA IRLANDESA</span><h2 id="ingles-corta-duracion">Cursos de inglés en Irlanda <span className="accent">de 2 a 4 semanas con alojamiento</span></h2><p>Compara cursos de inglés en Irlanda de 2, 3 y 4 semanas, con alternativas de alojamiento en familia anfitriona o residencia. Revisa los packs de curso y alojamiento disponibles en diferentes escuelas y ciudades para encontrar una opción adaptada a tu estancia.</p></div><div className="principal-b-irish-offers"><div className="compact-grid principal-b-auto-cards" id="principalBIrishPackGrid">
<article className="compact-card" data-city="Cork" data-course="Inglés General 20 horas" data-school="ucc">
<div className="compact-photo">
<img alt="University College Cork" className="compact-cover" loading="lazy" src="/beneficios-empresa/irlanda/ucc-cover-vivid.webp" />
<span className="photo-school">University College Cork</span>
</div>
<div className="compact-content">
<div className="compact-heading">
<div>
<p className="kicker">CORK · INGLÉS GENERAL</p>
<h3>Curso + Alojamiento</h3>
</div>
<img alt="Logo oficial University College Cork" className="compact-logo" src="/beneficios-empresa/irlanda/ucc-logo-oficial.png" />
</div>
<p className="compact-hours">20 horas de inglés por semana</p>
<div className="compact-prices"><div><strong>€1.365</strong><span>2 semanas</span></div><div><strong>€2.030</strong><span>3 semanas</span></div><div><strong>€2.615</strong><span>4 semanas</span></div></div><p className="price-exclusion-note">Precio total del pack: curso de inglés, matrícula, transfer, alojamiento en familia anfitriona y comidas incluidos. Seguro médico no incluido; materiales incluidos.</p>
<details className="program-details">
<summary>Ver detalles del programa <span aria-hidden="true" className="chevron">⌄</span></summary>
<div className="details-body"><div className="details-grid"><div><small>Ciudad</small><strong>Cork, Irlanda</strong></div><div><small>Duración</small><strong>2, 3, 4 semanas</strong></div><div><small>Horario</small><strong>Lunes a viernes, 09:00–13:00</strong></div><div><small>Clases semanales</small><strong>20 horas</strong></div><div><small>Nivel mínimo</small><strong>A2</strong></div><div><small>Tipo de alojamiento</small><strong>Familia anfitriona</strong></div></div><div className="pack-breakdown">
<strong>¿Qué incluye el precio total?</strong>
<p>Los precios publicados corresponden al pack completo de 2, 3 o 4 semanas, según la duración elegida.</p>
<ul><li>Curso de inglés general: 20 horas por semana</li><li>Matrícula de la escuela</li><li>Traslado de aeropuerto</li><li>Alojamiento en familia anfitriona</li><li>Comidas durante la estancia</li><li>Materiales del curso</li></ul>
<strong>¿Qué no incluye?</strong>
<ul><li>Seguro médico: valor por confirmar</li><li>Pasajes aéreos</li></ul>
<p><strong>Beneficio por convenio con MatchMyCourse:</strong> si tienes un convenio, te regalamos el seguro médico, sin costo adicional.</p>
<p className="pack-total-note">Precios expresados en euros (EUR). Valores sujetos a disponibilidad y confirmación antes de reservar.</p>
</div>
<div className="media-actions">
<button className="media-action" data-modal="photos" type="button">Ver imágenes de la escuela <span aria-hidden="true">↗</span></button>
<button className="media-action" data-modal="video" type="button">Ver video de la escuela <span aria-hidden="true">▶</span></button>
</div>
<a className="contact-action" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Curso%20%2B%20Alojamiento%20de%20University%20College%20Cork%20que%20se%20cursa%20en%20Irlanda.">Consultar este programa →</a>
</div>
</details>
</div>
</article>
<article className="compact-card" data-city="Cork" data-course="Inglés General 20 horas" data-school="cec">
<div className="compact-photo">
<img alt="Edificio de Cork English College en Cork" className="compact-cover" loading="lazy" src="/beneficios-empresa/irlanda/cec-cover.webp" />
<span className="photo-school">Cork English College</span>
</div>
<div className="compact-content">
<div className="compact-heading">
<div>
<p className="kicker">CORK · INGLÉS GENERAL</p>
<h3>Curso + Alojamiento</h3>
</div>
<img alt="Logo Cork English College" className="compact-logo cec-logo" src="/beneficios-empresa/irlanda/cec-logo.png" />
</div>
<p className="compact-hours">20 horas de inglés por semana</p>
<div className="compact-prices"><div><strong>€1.670</strong><span>2 semanas</span></div><div><strong>€2.335</strong><span>3 semanas</span></div><div><strong>€3.000</strong><span>4 semanas</span></div></div><p className="price-exclusion-note">Precio total del pack: curso de inglés, matrícula, transfer, alojamiento en familia anfitriona y comidas incluidos. Materiales y seguro médico no incluidos.</p>
<details className="program-details">
<summary>Ver detalles del programa <span aria-hidden="true" className="chevron">⌄</span></summary>
<div className="details-body"><div className="details-grid"><div><small>Ciudad</small><strong>Cork, Irlanda</strong></div><div><small>Duración</small><strong>2, 3, 4 semanas</strong></div><div><small>Horario</small><strong>Lunes a viernes, 08:40–13:00</strong></div><div><small>Clases semanales</small><strong>20 horas</strong></div><div><small>Nivel mínimo</small><strong>A2</strong></div><div><small>Tipo de alojamiento</small><strong>Familia anfitriona</strong></div></div><div className="pack-breakdown">
<strong>¿Qué incluye el precio total?</strong>
<p>Los precios publicados corresponden al pack completo de 2, 3 o 4 semanas, según la duración elegida.</p>
<ul><li>Curso de inglés general: 20 horas por semana</li><li>Matrícula de la escuela</li><li>Traslado de aeropuerto</li><li>Alojamiento en familia anfitriona</li><li>Comidas durante la estancia</li></ul>
<strong>¿Qué no incluye?</strong>
<ul><li>Materiales del curso: €75</li><li>Seguro médico: valor por confirmar</li><li>Pasajes aéreos</li></ul>
<p><strong>Beneficio por convenio con MatchMyCourse:</strong> si tienes un convenio, te regalamos los materiales del curso y el seguro médico, sin costo adicional.</p>
<p className="pack-total-note">Precios expresados en euros (EUR). Valores sujetos a disponibilidad y confirmación antes de reservar.</p>
</div>
<div className="media-actions">
<button className="media-action" data-modal="photos" type="button">Ver imágenes de la escuela <span aria-hidden="true">↗</span></button>
</div>
<a className="contact-action" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Curso%20%2B%20Alojamiento%20de%20Cork%20English%20College%20que%20se%20cursa%20en%20Irlanda.">Consultar este programa →</a>
</div>
</details>
</div>
</article>
<article className="compact-card" data-city="Dublín" data-course="Inglés General 18 horas" data-school="ces">
<div className="compact-photo">
<img alt="Vista urbana de Dublín en la zona de Centre of English Studies" className="compact-cover" loading="lazy" src="/beneficios-empresa/irlanda/ces-dublin-vivid.webp" />
<span className="photo-school">Centre of English Studies</span>
</div>
<div className="compact-content">
<div className="compact-heading">
<div>
<p className="kicker">DUBLÍN · INGLÉS GENERAL</p>
<h3>Curso + Alojamiento</h3>
</div>
<img alt="Centre of English Studies" className="compact-logo compact-logo-badge" src="/beneficios-empresa/irlanda/ces-logo-badge.png" />
</div>
<p className="compact-hours">18 horas de inglés por semana</p>
<div className="compact-prices"><div><strong>€1.773</strong><span>2 semanas</span></div><div><strong>€2.527</strong><span>3 semanas</span></div><div><strong>€3.281</strong><span>4 semanas</span></div></div><p className="price-exclusion-note">Precio total del pack: curso de inglés, matrícula, transfer, alojamiento en residencia de estudiantes y comidas incluidos. Materiales y seguro médico no incluidos.</p>
<details className="program-details">
<summary>Ver detalles del programa <span aria-hidden="true" className="chevron">⌄</span></summary>
<div className="details-body"><div className="details-grid"><div><small>Ciudad</small><strong>Dublín, Irlanda</strong></div><div><small>Duración</small><strong>2, 3, 4 semanas</strong></div><div><small>Horario</small><strong>Lunes a viernes, 09:00–13:00</strong></div><div><small>Clases semanales</small><strong>18 horas</strong></div><div><small>Nivel mínimo</small><strong>A1</strong></div><div><small>Tipo de alojamiento</small><strong>Residencia de estudiantes</strong></div></div><div className="pack-breakdown">
<strong>¿Qué incluye el precio total?</strong>
<p>Los precios publicados corresponden al pack completo de 2, 3 o 4 semanas, según la duración elegida.</p>
<ul><li>Curso de inglés general: 18 horas por semana</li><li>Matrícula de la escuela</li><li>Traslado de aeropuerto</li><li>Alojamiento en residencia de estudiantes</li><li>Comidas durante la estancia</li></ul>
<strong>¿Qué no incluye?</strong>
<ul><li>Materiales del curso: €45</li><li>Seguro médico: valor por confirmar</li><li>Pasajes aéreos</li></ul>
<p><strong>Beneficio por convenio con MatchMyCourse:</strong> si tienes un convenio, te regalamos los materiales del curso y el seguro médico, sin costo adicional.</p>
<p className="pack-total-note">Precios expresados en euros (EUR). Valores sujetos a disponibilidad y confirmación antes de reservar.</p>
</div>
<div className="media-actions">
<button className="media-action" data-modal="photos" type="button">Ver imágenes de la escuela <span aria-hidden="true">↗</span></button>
<button className="media-action" data-modal="video" type="button">Ver video de la escuela <span aria-hidden="true">▶</span></button>
</div>
<a className="contact-action" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Curso%20%2B%20Alojamiento%20de%20Centre%20of%20English%20Studies%20que%20se%20cursa%20en%20Irlanda.">Consultar este programa →</a>
</div>
</details>
</div>
</article>
<article className="compact-card" data-city="Limerick" data-course="Inglés General 15 horas" data-school="ul">
<div className="compact-photo">
<img alt="Fachada de University of Limerick" className="compact-cover" loading="lazy" src="/beneficios-empresa/irlanda/ul-fachada-actualizada.webp" />
<span className="photo-school">University of Limerick</span>
</div>
<div className="compact-content">
<div className="compact-heading">
<div><p className="kicker">LIMERICK · INGLÉS GENERAL</p><h3>Curso + Alojamiento</h3></div>
<img alt="Logo University of Limerick" className="compact-logo ul-logo" src="/beneficios-empresa/irlanda/ul-logo.png" />
</div>
<p className="compact-hours">15 horas de inglés por semana</p>
<div className="compact-prices"><div><strong>€1.290</strong><span>2 semanas</span></div><div><strong>€1.860</strong><span>3 semanas</span></div><div><strong>€2.430</strong><span>4 semanas</span></div></div><p className="price-exclusion-note">Precio total del pack: curso de inglés, matrícula, transfer, alojamiento en residencia de estudiantes y comidas incluidos. Seguro médico no incluido; materiales incluidos.</p>
<details className="program-details">
<summary>Ver detalles del programa <span aria-hidden="true" className="chevron">⌄</span></summary>
<div className="details-body"><div className="details-grid"><div><small>Ciudad</small><strong>Limerick, Irlanda</strong></div><div><small>Duración</small><strong>2, 3, 4 semanas</strong></div><div><small>Horario</small><strong>Lunes a viernes, 09:00–12:50</strong></div><div><small>Clases semanales</small><strong>15 horas</strong></div><div><small>Nivel mínimo</small><strong>A2</strong></div><div><small>Tipo de alojamiento</small><strong>Residencia de estudiantes</strong></div></div><div className="pack-breakdown">
<strong>¿Qué incluye el precio total?</strong>
<p>Los precios publicados corresponden al pack completo de 2, 3 o 4 semanas, según la duración elegida.</p>
<ul><li>Curso de inglés general: 15 horas por semana</li><li>Matrícula de la escuela</li><li>Traslado de aeropuerto</li><li>Alojamiento en residencia de estudiantes</li><li>Comidas durante la estancia</li><li>Materiales del curso</li></ul>
<strong>¿Qué no incluye?</strong>
<ul><li>Seguro médico: valor por confirmar</li><li>Pasajes aéreos</li></ul>
<p><strong>Beneficio por convenio con MatchMyCourse:</strong> si tienes un convenio, te regalamos el seguro médico, sin costo adicional.</p>
<p className="pack-total-note">Precios expresados en euros (EUR). Valores sujetos a disponibilidad y confirmación antes de reservar.</p>
</div>
<div className="media-actions"><button className="media-action" data-modal="photos" type="button">Ver imágenes de la escuela <span aria-hidden="true">↗</span></button></div>
<a className="contact-action" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Curso%20%2B%20Alojamiento%20de%20University%20of%20Limerick%20que%20se%20cursa%20en%20Irlanda.">Consultar este programa →</a>
</div>
</details>
</div>
</article>
<article className="compact-card" data-city="Galway" data-course="Inglés General 20 horas" data-school="gci">
<div className="compact-photo">
<img alt="Fachada de Galway Cultural Institute" className="compact-cover" loading="lazy" src="/beneficios-empresa/irlanda/gci-fachada-actualizada.webp" />
<span className="photo-school">Galway Cultural Institute</span>
</div>
<div className="compact-content">
<div className="compact-heading">
<div>
<p className="kicker">GALWAY · INGLÉS GENERAL</p>
<h3>Curso + Alojamiento</h3>
</div>
<img alt="Logo oficial Galway Cultural Institute" className="compact-logo gci-logo" src="/beneficios-empresa/irlanda/gci-logo-oficial.png" />
</div>
<p className="compact-hours">20 horas de inglés por semana</p>
<div className="compact-prices"><div><strong>€1.555</strong><span>2 semanas</span></div><div><strong>€2.175</strong><span>3 semanas</span></div><div><strong>€2.795</strong><span>4 semanas</span></div></div><p className="price-exclusion-note">Precio total del pack: curso de inglés, matrícula, transfer, alojamiento en residencia de estudiantes y comidas incluidos. Materiales y seguro médico no incluidos.</p>
<details className="program-details">
<summary>Ver detalles del programa <span aria-hidden="true" className="chevron">⌄</span></summary>
<div className="details-body"><div className="details-grid"><div><small>Ciudad</small><strong>Galway, Irlanda</strong></div><div><small>Duración</small><strong>2, 3, 4 semanas</strong></div><div><small>Horario</small><strong>Lunes a viernes, 09:00–12:30</strong></div><div><small>Clases semanales</small><strong>20 horas</strong></div><div><small>Nivel mínimo</small><strong>A1</strong></div><div><small>Tipo de alojamiento</small><strong>Residencia de estudiantes</strong></div></div><div className="pack-breakdown">
<strong>¿Qué incluye el precio total?</strong>
<p>Los precios publicados corresponden al pack completo de 2, 3 o 4 semanas, según la duración elegida.</p>
<ul><li>Curso de inglés general: 20 horas por semana</li><li>Matrícula de la escuela</li><li>Traslado de aeropuerto</li><li>Alojamiento en residencia de estudiantes</li><li>Comidas durante la estancia</li></ul>
<strong>¿Qué no incluye?</strong>
<ul><li>Materiales del curso: €75</li><li>Seguro médico: valor por confirmar</li><li>Pasajes aéreos</li></ul>
<p><strong>Beneficio por convenio con MatchMyCourse:</strong> si tienes un convenio, te regalamos los materiales del curso y el seguro médico, sin costo adicional.</p>
<p className="pack-total-note">Precios expresados en euros (EUR). Valores sujetos a disponibilidad y confirmación antes de reservar.</p>
</div>
<div className="media-actions">
<button className="media-action" data-modal="photos" type="button">Ver imágenes de la escuela <span aria-hidden="true">↗</span></button>
</div>
<a className="contact-action" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Curso%20%2B%20Alojamiento%20de%20Galway%20Cultural%20Institute%20que%20se%20cursa%20en%20Irlanda.">Consultar este programa →</a>
</div>
</details>
</div>
</article>
</div><dialog aria-labelledby="modalTitle" className="media-dialog" id="principalBIrishMediaDialog">
<div className="modal-top">
<div>
<p className="modal-eyebrow" id="principalBIrishModalEyebrow">ESCUELA</p>
<h2 id="principalBIrishModalTitle">Galería de la escuela</h2>
</div>
<button aria-label="Cerrar ventana" className="modal-close" id="principalBIrishCloseModal" type="button">×</button>
</div>
<div className="modal-photos" hidden={true} id="principalBIrishModalPhotos">
<figure>
<img alt="Fotografía de la escuela" id="principalBIrishGalleryImage" />
<figcaption>
<span id="principalBIrishGalleryCaption"></span>
<span id="principalBIrishGalleryCount"></span>
</figcaption>
</figure>
<div className="photo-navigation">
<button id="principalBIrishPrevPhoto" type="button">← Anterior</button>
<button id="principalBIrishNextPhoto" type="button">Siguiente →</button>
</div>
<div aria-label="Seleccionar fotografía" className="photo-thumbs" id="principalBIrishPhotoThumbs"></div>
</div>
<div hidden={true} id="principalBIrishModalVideo">
<div className="video-holder" id="principalBIrishVideoHolder"></div>
<p className="video-note" id="principalBIrishVideoNote">Video de la escuela.</p>
</div>
</dialog></div></div></div></section><section className="section long-term principal-b-auto-section principal-b-work-feature" id="larga-duracion">
<div aria-hidden="true" className="principal-b-work-backdrop"></div>
<svg aria-hidden="true" className="principal-b-work-clip-defs" focusable="false" height="0" width="0" xmlns="http://www.w3.org/2000/svg"><defs><clipPath clipPathUnits="objectBoundingBox" id="principal-b-work-curve"><path d="M .67 0 C .41 .01 .30 .11 .26 .30 C .19 .53 .14 .79 0 1 L 1 1 L 1 0 Z" /></clipPath></defs></svg>
<div className="container principal-b-work-container">
<div className="principal-b-work-feature-panel principal-b-auto-layout">
<div className="section-head principal-b-work-feature-copy">
<span className="eyebrow">PROGRAMA PARA ADULTOS</span>
<h2 id="estudio-trabajo">Programas de estudio y trabajo en Irlanda</h2>
<p>Vive una experiencia internacional de larga duración mientras mejoras tu inglés y descubres cómo es vivir en Irlanda. Nuestros programas de estudio y trabajo te permiten dedicar varios meses al aprendizaje del idioma y, cuando tu permiso migratorio lo autoriza, combinar las clases con un empleo. Una oportunidad para conocer nuevas personas, desenvolverte en otro país y disfrutar de la experiencia de vivir en el extranjero.</p>
<nav aria-label="Más información para estudiar y trabajar en Irlanda" className="irlanda-seo-work-links"><a href="https://matchmycourse.com/visa-estudio-trabajo-irlanda" rel="noopener">Conoce los requisitos para estudiar y trabajar en Irlanda</a><a href="https://matchmycourse.com/buscador-cursos-de-ingles?course=ingles-visa-de-trabajo" rel="noopener">Compara cursos de inglés de 25 semanas</a></nav></div>
<div className="principal-b-work-feature-visual principal-b-auto-cards">
<button aria-label="Consultar información del programa de estudio y trabajo en Irlanda" className="principal-b-work-feature-action" data-contact-destination="Irlanda" type="button">
<span className="principal-b-work-feature-image"><img alt="Estudiante internacional en Irlanda" decoding="async" loading="lazy" src="/beneficios-empresa/assets/ireland-study-hero.webp" /></span>
</button>
</div>
</div>
</div>
</section><section className="section principal-b-auto-section junior" id="jovenes"><div className="container"><div className="principal-b-auto-layout"><div className="section-head"><span className="eyebrow">PROGRAMAS PARA JÓVENES</span><h2 id="campamentos-experiencias">Campamentos de inglés en Irlanda <span className="accent">para jóvenes</span></h2><p>Dale a tu hijo la oportunidad de vivir una experiencia educativa internacional. Programas que combinan aprendizaje, actividades culturales, excursiones y convivencia con jóvenes de distintas nacionalidades, en entornos supervisados que favorecen su independencia, confianza y desarrollo personal.</p></div><div className="programmes principal-b-auto-cards principal-b-junior-cards"><Link className="programme-card" href="/beneficios-empresa/irlanda/junior/emerald-cultural-institute/sandford-park-school" prefetch={false}><div className="programme-photo"><img alt="Edificio de Sandford Park School en Dublín" decoding="async" loading="lazy" src="/beneficios-empresa/assets/sandford-card.webp" /><span aria-hidden="true" className="programme-go">↗</span></div><div className="programme-copy"><span className="programme-place">DUBLÍN · IRLANDA</span><h3>Sandford Park School</h3><p>Programa para jóvenes</p></div></Link><Link className="programme-card" href="/beneficios-empresa/irlanda/junior/emerald-cultural-institute/alexandra-college" prefetch={false}>
<div className="programme-photo"><img alt="Estudiantes compartiendo en Alexandra College, Dublín" decoding="async" loading="lazy" src="/beneficios-empresa/irlanda/junior/emerald-cultural-institute/alexandra-college/media/hero.webp" /><span aria-hidden="true" className="programme-go">↗</span></div>
<div className="programme-copy"><span className="programme-place">DUBLÍN · IRLANDA</span><h3>Alexandra College</h3><p>Programa para jóvenes</p></div>
</Link></div></div></div></section><section className="section principal-b-auto-section experience"><div className="container"><div className="principal-b-auto-layout"><div className="section-head"><span className="eyebrow">PROGRAMAS PARA JÓVENES Y ADULTOS</span><h2 id="ingles-deportes">Cursos de inglés con <span className="accent">golf, rugby y deportes en Irlanda</span></h2><p>Ofrece a tu hijo una experiencia internacional que combina aprendizaje, nuevas amistades y actividades culturales o deportivas. Nuestros programas incluyen campamentos educativos y cursos especializados en fútbol, rugby y golf, diseñados para desarrollar sus habilidades, confianza e independencia.</p><p>Además, algunos programas de inglés y golf están disponibles para adultos, permitiendo que padres e hijos disfruten juntos de esta experiencia en el extranjero.</p></div><div className="programmes principal-b-auto-cards"><Link className="programme-card" href="/beneficios-empresa/irlanda/avanti-language-institute/ingles-golf" prefetch={false}><div className="programme-photo"><img alt="Campo de golf en Naas, Irlanda" decoding="async" loading="lazy" src="/beneficios-empresa/irlanda/avanti-language-institute/ingles-golf/media/golf-hero.webp" /><span aria-hidden="true" className="programme-go">↗</span></div><div className="programme-copy"><span className="programme-place">NAAS · IRLANDA</span><h3>English + Golf en Craddockstown Golf Club</h3><p>Programa para adultos y jóvenes</p></div></Link><Link className="programme-card" href="/beneficios-empresa/irlanda/junior/cork-english-college/ingles-golf" prefetch={false}><div className="programme-photo"><img alt="Campo de golf del programa en Cork" decoding="async" loading="lazy" src="/beneficios-empresa/assets/cec-golf-card-new.webp" /><span aria-hidden="true" className="programme-go">↗</span></div><div className="programme-copy"><span className="programme-place">CORK · IRLANDA</span><h3>English + Golf con Fota Island Golf Academy</h3><p>Programa para jóvenes</p></div></Link><Link className="programme-card" href="/beneficios-empresa/irlanda/junior/cork-english-college/ingles-futbol" prefetch={false}><div className="programme-photo"><img alt="Equipo juvenil de fútbol en la cancha" decoding="async" loading="lazy" src="/beneficios-empresa/assets/sports-football-team-portrait.webp" /><span aria-hidden="true" className="programme-go">↗</span></div><div className="programme-copy"><span className="programme-place">CORK · IRLANDA</span><h3>Inglés + Fútbol con Valencia CF</h3><p>Programa para jóvenes</p></div></Link><Link className="programme-card" href="/beneficios-empresa/irlanda/junior/cork-english-college/ingles-rugby" prefetch={false}><div className="programme-photo"><img alt="Jóvenes entrenando rugby en un campo deportivo" decoding="async" loading="lazy" src="/beneficios-empresa/assets/sports-rugby-2026.webp" /><span aria-hidden="true" className="programme-go">↗</span></div><div className="programme-copy"><span className="programme-place">CORK · IRLANDA</span><h3>Inglés + Rugby con Munster Rugby</h3><p>Programa para jóvenes</p></div></Link></div></div></div></section>
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
<h2>Contacta con MatchMyCourse</h2>
<div className="footer-contact-item"><span aria-hidden="true" className="footer-contact-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></svg></span><div><strong>Oficina en Irlanda · Dublín</strong><address>77 Candem Street Lower, Dublin 2</address></div></div>
<div className="footer-contact-item"><span aria-hidden="true" className="footer-contact-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></svg></span><div><strong>Oficina en Chile · Santiago</strong><address>Fray Angélico 133, Las Condes</address></div></div>
<div className="footer-contact-item"><span aria-hidden="true" className="footer-contact-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m6.2 2.8 3.2 3.5-1.7 2.3c1.5 3 3.8 5.3 6.8 6.8l2.3-1.7 3.5 3.2-1.1 3.2c-.3.8-1.2 1.1-2 1-8.1-.9-14.3-7.1-15.2-15.2-.1-.8.3-1.7 1-2z" /></svg></span><div><strong>Teléfonos de contacto</strong><a href="tel:+56982959118">Chile: +56 9 8295 9118</a><a href="tel:+353831134401">Irlanda: +353 83 113 4401</a></div></div>
<a className="footer-email" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20cursos%20de%20ingl%C3%A9s%20en%20el%20extranjero.">Escríbenos por WhatsApp</a>
</div>
</div>
<div className="container footer-bottom">© 2026 MatchMyCourse · Todos los derechos reservados.</div>
</footer>
      <CurrencySelector base="EUR" />
      <SchoolMediaGallery media={IrlandaSchoolMedia} idPrefix="principalBIrish" />
      <ProgrammeSectionLayout />
      <MicrositeDialogs />
    </div>
  );
}
