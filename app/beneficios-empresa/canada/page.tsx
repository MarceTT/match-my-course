import type { Metadata, Viewport } from "next";
import Link from "next/link";

import CurrencySelector from "../components/CurrencySelector";
import MicrositeDialogs from "../components/MicrositeDialogs";
import SchoolMediaGallery from "../components/SchoolMediaGallery";
import ProgrammeSectionLayout from "../components/ProgrammeSectionLayout";

import { CanadaSchoolMedia } from "../data/schoolMedia";

import "../styles/paises/canada-canada-b.css";
import "../styles/paises/canada-ces-canada-original.css";
import "../styles/paises/currency-selector.css";
import "../styles/paises/canada-inline.css";

/**
 * /beneficios-empresa/canada — ported from the published source, class for
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
  title: "Cursos de Inglés en Canadá: Packs y Programas Junior | MatchMyCourse",
  description:
    "Compara cursos de inglés en Toronto y Vancouver con packs de 2 a 4 semanas y alojamiento. Descubre programas junior, liderazgo y opciones para padres e hijos.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

export default function CanadaPage() {
  return (
    <div className="principal-b-page canada-b-page">
      <header className="site-header container"><Link aria-label="MatchMyCourse, volver a la portada de Beneficios" className="brand" href="/beneficios-empresa"><img alt="MatchMyCourse" height="58" src="/beneficios-empresa/assets/logo.png" width="216" /></Link></header><main id="inicio">
<section className="hero"><div aria-hidden="true" className="blob one"></div><div aria-hidden="true" className="blob two"></div><div aria-hidden="true" className="blob three"></div><div aria-hidden="true" className="blob yellow"></div><div className="container hero-inner"><span className="eyebrow">CANADÁ · PROGRAMAS INTERNACIONALES</span>
<h1><span className="hero-title-line">Cursos de inglés en Canadá</span><span className="hero-title-line hero-title-line-two accent">para adultos y jóvenes</span></h1>
<p>Descubre diferentes formas de aprender inglés en Canadá, desde cursos de corta duración hasta experiencias educativas internacionales para jóvenes. Explora nuestras alternativas en ciudades como Toronto y Vancouver, mejora tu inglés y disfruta de un país reconocido por su diversidad cultural, sus grandes ciudades y sus impresionantes paisajes naturales.</p></div></section>
<section className="section choose" id="elige"><div aria-hidden="true" className="flight-motif"><svg fill="none" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg"><path d="M4 119C57 143 83 85 128 89S197 127 218 64C224 45 230 36 249 29" stroke="#9CB5F5" strokeDasharray="3 10" strokeLinecap="round" strokeWidth="2.3" /><circle cx="16" cy="120" fill="#D6E5FF" r="6" /><circle cx="169" cy="99" fill="#CFDDFE" r="4.5" /><g stroke="#6C8CEB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" transform="translate(246 5) rotate(18 21 22)"><path d="M39 6L23 23M39 6L28 37L21 25L9 18L39 6Z" fill="#E8EFFF" /><path d="M21 25L16 36L28 37" fill="#D0E0FF" /></g></svg></div><div className="container"><div className="section-head center"><h2>¿Qué curso de inglés buscas en Canadá?</h2><p>Explora las distintas experiencias educativas disponibles en Canadá y descubre nuestras alternativas de inglés para adultos y jóvenes.</p></div><div className="principal-b-categories"><a aria-label="Ir a Inglés de corta duración" className="principal-b-category-card" href="#ingles-corta-duracion"><div className="principal-b-category-photo"><img alt="Vista de Toronto, Canadá" decoding="async" height="750" loading="lazy" src="/beneficios-empresa/canada/toronto-00.webp" width="1000" /><span aria-hidden="true" className="principal-b-category-arrow">↗</span></div><div className="principal-b-category-body"><span className="principal-b-category-tag">ADULTOS Y JÓVENES</span><h3>Inglés de corta duración</h3><p>Cursos de inglés para mejorar el idioma durante tus vacaciones o una estancia breve en Canadá.</p></div></a><a aria-label="Ir a Campamentos y experiencias" className="principal-b-category-card" href="#campamentos-experiencias"><div className="principal-b-category-photo"><img alt="Vista de Vancouver, Canadá" decoding="async" height="750" loading="lazy" src="/beneficios-empresa/canada/vancouver-00.webp" width="1000" /><span aria-hidden="true" className="principal-b-category-arrow">↗</span></div><div className="principal-b-category-body"><span className="principal-b-category-tag">ADULTOS Y JÓVENES</span><h3>Campamentos y experiencias</h3><p>Programas educativos que combinan inglés, actividades culturales, excursiones y experiencias internacionales para jóvenes.</p></div></a></div></div></section>
<section className="section destinations principal-b-auto-section" id="adultos"><div className="container"><div className="principal-b-auto-layout"><div className="section-head"><span className="eyebrow">VIVE LA EXPERIENCIA CANADIENSE</span><h2 id="ingles-corta-duracion">Cursos de inglés en Toronto y Vancouver <span className="accent">con alojamiento</span></h2><p>Compara cursos de inglés en Toronto y Vancouver con packs de 2, 3 y 4 semanas que incluyen alojamiento. Revisa las alternativas de Centre of English Studies y elige una experiencia para mejorar tu inglés durante tus vacaciones o una estancia breve en Canadá.</p></div><div className="principal-b-auto-cards canada-offers"><div className="canada-ces-offers canada-packs-page"><div className="compact-grid" id="canada-b-pack-grid">
<article className="compact-card" data-city="Toronto" data-course="Inglés General 15 horas" data-school="toronto">
<div className="compact-photo"><img alt="Centre of English Studies en Toronto" className="compact-cover" loading="lazy" src="/beneficios-empresa/canada/toronto-00.webp" /><span className="photo-school">Centre of English Studies · Toronto</span></div>
<div className="compact-content">
<div className="compact-heading"><div><p className="kicker">TORONTO · INGLÉS GENERAL</p><h3>Curso + Alojamiento</h3></div><img alt="Logo Centre of English Studies" className="compact-logo compact-logo-badge" src="/beneficios-empresa/canada/ces-logo-badge.png" /></div>
<p className="compact-hours">15 horas de inglés por semana</p>
<div className="compact-prices canada-three-prices"><div><strong>$3.020</strong><span>2 semanas</span></div><div><strong>$4.045</strong><span>3 semanas</span></div><div><strong>$5.070</strong><span>4 semanas</span></div></div><p className="price-exclusion-note">Precio total del pack: curso de inglés, matrícula, transfer de aeropuerto, alojamiento en residencia de estudiantes y comidas incluidos. Materiales y seguro médico no incluidos.</p><p className="currency-caption">• <em>Los precios se encuentran en dólares canadienses.</em></p>
<details className="program-details"><summary>Ver detalles del programa <span aria-hidden="true" className="chevron">⌄</span></summary>
<div className="details-body"><div className="details-grid"><div><small>Ciudad</small><strong>Toronto, Canadá</strong></div><div><small>Duración</small><strong>2, 3, 4 semanas</strong></div><div><small>Horario</small><strong>Lunes a viernes, 09:00–12:15</strong></div><div><small>Clases semanales</small><strong>15 horas</strong></div><div><small>Nivel mínimo</small><strong>A1</strong></div><div><small>Tipo de alojamiento</small><strong>Residencia de estudiantes</strong></div></div><div className="pack-breakdown">
<strong>¿Qué incluye el precio total?</strong>
<p>Los precios publicados corresponden al pack completo de 2, 3 o 4 semanas, según la duración elegida.</p>
<ul>
<li>Curso de inglés general: 15 horas por semana</li>
<li>Matrícula de la escuela</li>
<li>Traslado de aeropuerto</li>
<li>Alojamiento en residencia de estudiantes</li>
<li>Comidas durante la estancia</li>
</ul>
<strong>¿Qué no incluye?</strong>
<ul>
<li>Materiales del curso: CAD $80</li>
<li>Seguro médico: valor por confirmar</li>
<li>Pasajes aéreos</li>
</ul>
<p><strong>Beneficio por convenio con MatchMyCourse:</strong> si tienes un convenio, te regalamos los materiales del curso y el seguro médico, sin costo adicional.</p>
<p className="pack-total-note">Precios expresados en dólares canadienses (CAD). Valores sujetos a disponibilidad y confirmación antes de reservar.</p>
</div>
<div className="media-actions"><button className="media-action" data-modal="photos" type="button">Ver imágenes de la escuela <span aria-hidden="true">↗</span></button></div>
<a className="contact-action" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Curso%20%2B%20Alojamiento%20de%20Centre%20of%20English%20Studies%20en%20Toronto%20que%20se%20cursa%20en%20Canad%C3%A1.">Consultar este programa →</a>
</div>
</details>
</div>
</article>
<article className="compact-card" data-city="Vancouver" data-course="Inglés General 15 horas" data-school="vancouver">
<div className="compact-photo"><img alt="Centre of English Studies en Vancouver" className="compact-cover" loading="lazy" src="/beneficios-empresa/canada/vancouver-00.webp" /><span className="photo-school">Centre of English Studies · Vancouver</span></div>
<div className="compact-content">
<div className="compact-heading"><div><p className="kicker">VANCOUVER · INGLÉS GENERAL</p><h3>Curso + Alojamiento</h3></div><img alt="Logo Centre of English Studies" className="compact-logo compact-logo-badge" src="/beneficios-empresa/canada/ces-logo-badge.png" /></div>
<p className="compact-hours">15 horas de inglés por semana</p>
<div className="compact-prices canada-three-prices"><div><strong>$3.205</strong><span>2 semanas</span></div><div><strong>$4.305</strong><span>3 semanas</span></div><div><strong>$5.405</strong><span>4 semanas</span></div></div><p className="price-exclusion-note">Precio total del pack: curso de inglés, matrícula, transfer de aeropuerto, alojamiento en residencia de estudiantes y comidas incluidos. Materiales y seguro médico no incluidos.</p><p className="currency-caption">• <em>Los precios se encuentran en dólares canadienses.</em></p>
<details className="program-details"><summary>Ver detalles del programa <span aria-hidden="true" className="chevron">⌄</span></summary>
<div className="details-body"><div className="details-grid"><div><small>Ciudad</small><strong>Vancouver, Canadá</strong></div><div><small>Duración</small><strong>2, 3, 4 semanas</strong></div><div><small>Horario</small><strong>Lunes a viernes, 09:00–12:15</strong></div><div><small>Clases semanales</small><strong>15 horas</strong></div><div><small>Nivel mínimo</small><strong>A1</strong></div><div><small>Tipo de alojamiento</small><strong>Residencia de estudiantes</strong></div></div><div className="pack-breakdown">
<strong>¿Qué incluye el precio total?</strong>
<p>Los precios publicados corresponden al pack completo de 2, 3 o 4 semanas, según la duración elegida.</p>
<ul>
<li>Curso de inglés general: 15 horas por semana</li>
<li>Matrícula de la escuela</li>
<li>Traslado de aeropuerto</li>
<li>Alojamiento en residencia de estudiantes</li>
<li>Comidas durante la estancia</li>
</ul>
<strong>¿Qué no incluye?</strong>
<ul>
<li>Materiales del curso: CAD $80</li>
<li>Seguro médico: valor por confirmar</li>
<li>Pasajes aéreos</li>
</ul>
<p><strong>Beneficio por convenio con MatchMyCourse:</strong> si tienes un convenio, te regalamos los materiales del curso y el seguro médico, sin costo adicional.</p>
<p className="pack-total-note">Precios expresados en dólares canadienses (CAD). Valores sujetos a disponibilidad y confirmación antes de reservar.</p>
</div>
<div className="media-actions"><button className="media-action" data-modal="photos" type="button">Ver imágenes de la escuela <span aria-hidden="true">↗</span></button></div>
<a className="contact-action" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Curso%20%2B%20Alojamiento%20de%20Centre%20of%20English%20Studies%20en%20Vancouver%20que%20se%20cursa%20en%20Canad%C3%A1.">Consultar este programa →</a>
</div>
</details>
</div>
</article></div></div></div></div></div></section><section className="section principal-b-auto-section junior" id="jovenes"><div className="container"><div className="principal-b-auto-layout"><div className="section-head"><span className="eyebrow">PROGRAMAS JUNIOR</span><h2 id="campamentos-experiencias">Programas de inglés en Canadá para <span className="accent">jóvenes y familias</span></h2><p>Descubre programas de inglés en Canadá para jóvenes y familias, con alternativas en Vancouver y Toronto. Encuentra experiencias que pueden combinar clases de inglés, actividades y desarrollo personal, además de opciones para padres que desean estudiar junto a sus hijos.</p></div><div className="programmes principal-b-auto-cards principal-b-junior-cards"><Link className="programme-card canada-junior-link" href="/beneficios-empresa/canada/junior/centre-of-english-studies/ingles-actividades" prefetch={false}><div className="programme-photo canada-junior-cover canada-junior-cover-ingles-actividades"><span aria-hidden="true" className="canada-junior-cover-label">Inglés + Actividades</span><span aria-hidden="true" className="programme-go">↗</span></div><div className="programme-copy"><span className="programme-place">VANCOUVER Y TORONTO · CANADÁ</span><h3>Inglés + Actividades</h3><p>Programa de inglés para jóvenes</p></div></Link><Link className="programme-card canada-junior-link" href="/beneficios-empresa/canada/junior/centre-of-english-studies/ingles-liderazgo" prefetch={false}><div className="programme-photo canada-junior-cover canada-junior-cover-ingles-liderazgo"><span aria-hidden="true" className="canada-junior-cover-label">Inglés + Liderazgo</span><span aria-hidden="true" className="programme-go">↗</span></div><div className="programme-copy"><span className="programme-place">VANCOUVER Y TORONTO · CANADÁ</span><h3>Inglés + Liderazgo</h3><p>Programa de inglés para jóvenes</p></div></Link><Link className="programme-card canada-junior-link" href="/beneficios-empresa/canada/familia/centre-of-english-studies/ingles-padre-hijo" prefetch={false}><div className="programme-photo canada-junior-cover canada-junior-cover-ingles-padre-hijo"><span aria-hidden="true" className="canada-junior-cover-label">Inglés Padre e Hijo</span><span aria-hidden="true" className="programme-go">↗</span></div><div className="programme-copy"><span className="programme-place">VANCOUVER Y TORONTO · CANADÁ</span><h3>Inglés Padre e Hijo</h3><p>Programa de inglés para familias</p></div></Link></div></div></div></section>
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
<dialog aria-labelledby="modalTitle" className="media-dialog" id="mediaDialog">
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
</dialog>
      <CurrencySelector base="CAD" />
      <SchoolMediaGallery media={CanadaSchoolMedia} />
      <ProgrammeSectionLayout />
      <MicrositeDialogs />
    </div>
  );
}
