import type { Metadata, Viewport } from "next";

import CurrencySelector from "../components/CurrencySelector";
import MicrositeDialogs from "../components/MicrositeDialogs";
import ExperiencesCarousel from "../components/ExperiencesCarousel";
import ProgrammeSectionLayout from "../components/ProgrammeSectionLayout";

import "../styles/paises/escocia-escocia-b.css";
import "../styles/paises/escocia-ces-edimburgo-original.css";
import "../styles/paises/escocia-experiencias.css";
import "../styles/paises/escocia-carrusel-experiencias.css";
import "../styles/paises/currency-selector.css";

/**
 * /beneficios-empresa/escocia — ported from the published source, class for
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
  title: "Estudiar Inglés en Edimburgo: Cursos y Campamentos | MatchMyCourse",
  description:
    "Explora Edimburgo con CES: cursos de inglés de 2 a 4 semanas con alojamiento en familia y programas junior con actividades. Compara opciones y consulta precios.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

export default function EscociaPage() {
  return (
    <div className="principal-b-page escocia-b-page">
      <header className="site-header container"><a aria-label="MatchMyCourse, volver a la portada de Beneficios" className="brand" href="/beneficios-empresa/"><img alt="MatchMyCourse" height="58" src="/beneficios-empresa/assets/logo.png" width="216" /></a></header><main id="inicio">
<section className="hero"><div aria-hidden="true" className="blob one"></div><div aria-hidden="true" className="blob two"></div><div aria-hidden="true" className="blob three"></div><div aria-hidden="true" className="blob yellow"></div><div className="container hero-inner"><span className="eyebrow">ESCOCIA · PROGRAMAS INTERNACIONALES</span>
<h1><span className="hero-title-line">Aprende inglés en Edimburgo</span><span className="hero-title-line hero-title-line-two accent">y descubre Escocia</span></h1>
<p>Mejora tu inglés en Edimburgo con cursos de corta duración y descubre una ciudad llena de historia y cultura. Conoce los packs de Centre of English Studies con alojamiento y explora las experiencias educativas para jóvenes que ofrecemos en Escocia.</p></div></section>
<section className="section choose" id="elige"><div aria-hidden="true" className="flight-motif"><svg fill="none" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg"><path d="M4 119C57 143 83 85 128 89S197 127 218 64C224 45 230 36 249 29" stroke="#9CB5F5" strokeDasharray="3 10" strokeLinecap="round" strokeWidth="2.3" /><circle cx="16" cy="120" fill="#D6E5FF" r="6" /><circle cx="169" cy="99" fill="#CFDDFE" r="4.5" /><g stroke="#6C8CEB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" transform="translate(246 5) rotate(18 21 22)"><path d="M39 6L23 23M39 6L28 37L21 25L9 18L39 6Z" fill="#E8EFFF" /><path d="M21 25L16 36L28 37" fill="#D0E0FF" /></g></svg></div><div className="container"><div className="section-head center"><h2>Encuentra el programa que mejor se adapta a ti</h2><p>Descubre nuestros cursos de inglés y programas para jóvenes en Escocia. Explora las alternativas disponibles en Edimburgo y encuentra una experiencia educativa internacional que se adapte a tus objetivos.</p></div><div className="principal-b-categories"><a aria-label="Ir a Inglés de corta duración" className="principal-b-category-card" href="#ingles-corta-duracion"><div className="principal-b-category-photo"><img alt="Vista del castillo y de la ciudad de Edimburgo" decoding="async" loading="lazy" src="/beneficios-empresa/escocia/experiencias/edimburgo-07.webp" /><span aria-hidden="true" className="principal-b-category-arrow">↗</span></div><div className="principal-b-category-body"><span className="principal-b-category-tag">INGLÉS DE CORTA DURACIÓN</span><h3>Inglés de corta duración</h3><p>Cursos de inglés para mejorar el idioma durante tus vacaciones o una estancia breve en Escocia.</p></div></a><a aria-label="Ir a Campamentos y experiencias" className="principal-b-category-card" href="#jovenes"><div className="principal-b-category-photo"><img alt="Celebración y actividad grupal en Centre of English Studies Edinburgh" decoding="async" loading="lazy" src="/beneficios-empresa/escocia/ces-edinburgh-burns-celebration.webp" /><span aria-hidden="true" className="principal-b-category-arrow">↗</span></div><div className="principal-b-category-body"><span className="principal-b-category-tag">CAMPAMENTOS Y EXPERIENCIAS</span><h3>Campamentos y experiencias</h3><p>Programas de inglés para jóvenes que combinan aprendizaje, actividades culturales y experiencias internacionales.</p></div></a></div></div></section>
<section className="section destinations principal-b-auto-section" id="adultos"><div className="container"><div className="principal-b-auto-layout"><div className="section-head"><span className="eyebrow">VIVE LA EXPERIENCIA ESCOCESA</span><h2 id="ingles-corta-duracion">Packs de 2 a 4 semanas <span className="accent">con alojamiento en Edimburgo</span></h2><p>Elige una estancia de 2, 3 o 4 semanas en Centre of English Studies, Edimburgo. El pack combina clases de inglés general y alojamiento en familia anfitriona; consulta el desglose de tarifas, horarios y servicios incluidos antes de reservar.</p></div><div aria-label="Promoción de inglés en Edimburgo" className="principal-b-auto-cards inglaterra-offers-placeholder"><div className="england-ces-offers canada-packs-page"><div className="compact-grid" id="england-ces-grid"><article className="compact-card" data-city="Edimburgo" data-course="Inglés General 15 horas" data-school="edinburgh">
<div className="compact-photo">
<img alt="Centre of English Studies en Edimburgo" className="compact-cover" loading="lazy" src="/beneficios-empresa/assets/scotland-vivid.webp" />
<span className="photo-school">Centre of English Studies · Edimburgo</span>
</div>
<div className="compact-content">
<div className="compact-heading">
<div>
<p className="kicker">EDIMBURGO · INGLÉS GENERAL</p>
<h3>Curso + Alojamiento</h3>
</div>
<img alt="Logo Centre of English Studies" className="compact-logo compact-logo-badge" src="/beneficios-empresa/canada/ces-logo-badge.png" />
</div>
<p className="compact-hours">15 horas de inglés por semana</p>
<div className="compact-prices canada-three-prices">
<div><strong>£1.777</strong><span>2 semanas</span></div>
<div><strong>£2.432</strong><span>3 semanas</span></div>
<div><strong>£3.087</strong><span>4 semanas</span></div>
</div>
<p className="price-exclusion-note">Precio total del pack: curso de inglés, matrícula, traslado de aeropuerto, alojamiento en familia anfitriona y comidas incluidos. Materiales y seguro médico no incluidos.</p>
<p className="currency-caption">• <em>Los precios se encuentran en libras esterlinas.</em></p>
<details className="program-details">
<summary>Ver detalles del programa <span aria-hidden="true" className="chevron">⌄</span></summary>
<div className="details-body">
<div className="details-grid">
<div><small>Ciudad</small><strong>Edimburgo, Escocia</strong></div>
<div><small>Duración</small><strong>2, 3 y 4 semanas</strong></div>
<div><small>Horario</small><strong>Lunes a viernes, 09:30–13:00</strong></div>
<div><small>Clases semanales</small><strong>15 horas</strong></div>
<div><small>Nivel mínimo</small><strong>A1</strong></div>
<div><small>Tipo de alojamiento</small><strong>Familia anfitriona</strong></div>
</div>
<div className="pack-breakdown">
<strong>¿Qué incluye el precio total?</strong>
<ul>
<li>Curso de inglés general de 15 horas semanales.</li>
<li>Matrícula de Centre of English Studies.</li>
<li>Traslado de aeropuerto.</li>
<li>Alojamiento en familia anfitriona con comidas.</li>
</ul>
<strong>¿Qué no incluye?</strong>
<ul>
<li>Materiales del curso: £37.</li>
<li>Seguro médico: valor por confirmar.</li>
<li>Pasajes aéreos.</li>
</ul>
<strong>Beneficio por convenio con MatchMyCourse</strong>
<p>Si tienes un convenio con MatchMyCourse, te regalamos los materiales del curso y el seguro médico, sin costo adicional.</p>
<p className="pack-total-note">Precios totales del pack en libras esterlinas (GBP) para 2, 3 y 4 semanas. Valores sujetos a disponibilidad y confirmación antes de la reserva.</p>
</div>
<a className="contact-action" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Curso%20%2B%20Alojamiento%20de%20Centre%20of%20English%20Studies%20en%20Edimburgo%20que%20se%20cursa%20en%20Escocia.">Consultar este programa →</a>
</div>
</details>
</div>
</article></div></div></div></div></div></section><section className="section principal-b-auto-section junior" id="jovenes"><div className="container"><div className="principal-b-auto-layout"><div className="section-head"><span className="eyebrow">PROGRAMAS PARA JÓVENES</span><h2 id="campamentos-experiencias">Campamentos y actividades <span className="accent">para jóvenes en Escocia</span></h2><p>Para colegios y grupos organizados, CES ofrece un programa junior que combina clases de inglés, actividades recreativas y visitas culturales en Edimburgo. Revisa la ficha del programa para conocer las condiciones y las fechas disponibles.</p></div><div className="programmes principal-b-auto-cards principal-b-junior-cards"><a className="programme-card" href="/beneficios-empresa/escocia/junior/centre-of-english-studies/ingles-actividades-edimburgo/"><div aria-label="Estudiantes participando en una actividad dentro del programa junior de CES en Edimburgo" className="programme-photo" role="img"><img alt="Estudiantes participando en una actividad dentro del programa junior de CES en Edimburgo" decoding="async" loading="lazy" src="/beneficios-empresa/escocia/ces-edinburgh-junior-cover.webp" /><span aria-hidden="true" className="programme-go">↗</span></div><div className="programme-copy"><span className="programme-place">EDIMBURGO · ESCOCIA</span><h3>Inglés + Actividades</h3><p>Programa para jóvenes</p></div></a></div></div></div></section>
<section aria-labelledby="experiencias-title" className="nz-experiences-section rela-activities" id="experiencias">
<div className="nz-experiences-inner">
<div className="nz-experiences-heading">
<span className="nz-experiences-eyebrow">EXPERIENCIAS EN ESCOCIA</span>
<h2 id="experiencias-title">Edimburgo más allá del aula</h2>
<p>Estudiar en Edimburgo también permite conocer su arquitectura, sus calles históricas y la vida cultural escocesa. Explora las fotografías de CES y de la ciudad para imaginar cómo sería tu estancia.</p>
</div>
<div aria-label="Fotografías de experiencias en Escocia y Edimburgo" aria-roledescription="carrusel" className="rela-carousel" data-rela-carousel="" tabIndex={0}>
<div className="rela-carousel-window">
<div className="rela-carousel-track" data-rela-track=""><figure aria-hidden="false" aria-label="1 de 13" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group"><img alt="Estudiantes en CES Edinburgh" decoding="async" height="800" loading="eager" src="/beneficios-empresa/escocia/experiencias/edimburgo-01.webp" width="1200" /><figcaption className="rela-carousel-caption">Estudiantes en CES Edinburgh</figcaption></figure><figure aria-hidden="true" aria-label="2 de 13" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group"><img alt="Encuentro de estudiantes" decoding="async" height="675" loading="lazy" src="/beneficios-empresa/escocia/experiencias/edimburgo-02.webp" width="1200" /><figcaption className="rela-carousel-caption">Encuentro de estudiantes</figcaption></figure><figure aria-hidden="true" aria-label="3 de 13" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group"><img alt="Paisajes de Edimburgo" decoding="async" height="798" loading="lazy" src="/beneficios-empresa/escocia/experiencias/edimburgo-03.webp" width="1200" /><figcaption className="rela-carousel-caption">Paisajes de Edimburgo</figcaption></figure><figure aria-hidden="true" aria-label="4 de 13" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group"><img alt="Vista de Edimburgo" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/escocia/experiencias/edimburgo-04.webp" width="1200" /><figcaption className="rela-carousel-caption">Vista de Edimburgo</figcaption></figure><figure aria-hidden="true" aria-label="5 de 13" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group"><img alt="Paisajes de Escocia" decoding="async" height="796" loading="lazy" src="/beneficios-empresa/escocia/experiencias/edimburgo-05.webp" width="1200" /><figcaption className="rela-carousel-caption">Paisajes de Escocia</figcaption></figure><figure aria-hidden="true" aria-label="6 de 13" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group"><img alt="Celebración en la escuela" decoding="async" height="900" loading="lazy" src="/beneficios-empresa/escocia/experiencias/edimburgo-06.webp" width="1200" /><figcaption className="rela-carousel-caption">Celebración en la escuela</figcaption></figure><figure aria-hidden="true" aria-label="7 de 13" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group"><img alt="Castillo de Edimburgo" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/escocia/experiencias/edimburgo-07.webp" width="1200" /><figcaption className="rela-carousel-caption">Castillo de Edimburgo</figcaption></figure><figure aria-hidden="true" aria-label="8 de 13" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group"><img alt="Clases de inglés" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/escocia/experiencias/edimburgo-08.webp" width="1200" /><figcaption className="rela-carousel-caption">Clases de inglés</figcaption></figure><figure aria-hidden="true" aria-label="9 de 13" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group"><img alt="Espacios comunes" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/escocia/experiencias/edimburgo-09.webp" width="1200" /><figcaption className="rela-carousel-caption">Espacios comunes</figcaption></figure><figure aria-hidden="true" aria-label="10 de 13" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group"><img alt="Actividades recreativas" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/escocia/experiencias/edimburgo-10.webp" width="1200" /><figcaption className="rela-carousel-caption">Actividades recreativas</figcaption></figure><figure aria-hidden="true" aria-label="11 de 13" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group"><img alt="Jardines de Edimburgo" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/escocia/experiencias/edimburgo-11.webp" width="1200" /><figcaption className="rela-carousel-caption">Jardines de Edimburgo</figcaption></figure><figure aria-hidden="true" aria-label="12 de 13" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group"><img alt="Calles de Edimburgo" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/escocia/experiencias/edimburgo-12.webp" width="1200" /><figcaption className="rela-carousel-caption">Calles de Edimburgo</figcaption></figure><figure aria-hidden="true" aria-label="13 de 13" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group"><img alt="Música en la ciudad" decoding="async" height="1200" loading="lazy" src="/beneficios-empresa/escocia/experiencias/edimburgo-13.webp" width="900" /><figcaption className="rela-carousel-caption">Música en la ciudad</figcaption></figure><figure aria-hidden="true" aria-label="Copia de la primera diapositiva" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group"><img alt="Estudiantes en CES Edinburgh" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/escocia/experiencias/edimburgo-01.webp" width="1200" /><figcaption className="rela-carousel-caption">Estudiantes en CES Edinburgh</figcaption></figure></div>
<button aria-label="Ver fotografía anterior" className="rela-carousel-arrow rela-carousel-prev" data-rela-prev="" type="button"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg></button>
<button aria-label="Ver fotografía siguiente" className="rela-carousel-arrow rela-carousel-next" data-rela-next="" type="button"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg></button>
</div>
<div aria-label="Seleccionar fotografía" className="rela-carousel-dots" data-rela-dots="" role="group"></div>
</div>
</div>
</section>
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
<h2>Hablemos de tu próxima experiencia</h2>
<div className="footer-contact-item"><span aria-hidden="true" className="footer-contact-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></svg></span><div><strong>Oficina en Irlanda · Dublín</strong><address>77 Candem Street Lower, Dublin 2</address></div></div>
<div className="footer-contact-item"><span aria-hidden="true" className="footer-contact-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></svg></span><div><strong>Oficina en Chile · Santiago</strong><address>Fray Angélico 133, Las Condes</address></div></div>
<div className="footer-contact-item"><span aria-hidden="true" className="footer-contact-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m6.2 2.8 3.2 3.5-1.7 2.3c1.5 3 3.8 5.3 6.8 6.8l2.3-1.7 3.5 3.2-1.1 3.2c-.3.8-1.2 1.1-2 1-8.1-.9-14.3-7.1-15.2-15.2-.1-.8.3-1.7 1-2z" /></svg></span><div><strong>Teléfonos de contacto</strong><a href="tel:+56982959118">Chile: +56 9 8295 9118</a><a href="tel:+353831134401">Irlanda: +353 83 113 4401</a></div></div>
<a className="footer-email" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20cursos%20de%20ingl%C3%A9s%20en%20el%20extranjero.">Escríbenos por WhatsApp</a>
</div>
</div>
<div className="container footer-bottom">© 2026 MatchMyCourse · Todos los derechos reservados.</div>
</footer>
      <CurrencySelector base="GBP" />
      <ExperiencesCarousel />
      <ProgrammeSectionLayout />
      <MicrositeDialogs />
    </div>
  );
}
