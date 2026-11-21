import type { Metadata, Viewport } from "next";
import Link from "next/link";

import MicrositeDialogs from "./components/MicrositeDialogs";
import PartnersMarquee from "./components/PartnersMarquee";

// This landing's own stylesheets. They live here rather than in the segment
// layout, where they would also style every page beneath it.
import "./styles/style.css";
import "./styles/partners-marquee.css";
import "./styles/why-matchmycourse.css";
import "./styles/conoce-matchmycourse.css";
import "./styles/como-funciona-matchmycourse.css";
import "./styles/empresas-colegios.css";
import "./styles/portada-fondo-unificado.css";
import "./styles/portada-fondo-estilo-irlanda.css";

/**
 * /beneficios-empresa — the microsite landing.
 *
 * This is the published page's own markup, class for class, rendered against
 * its own stylesheets (imported and scoped in `layout.tsx`). It is reproduced
 * rather than re-expressed in Tailwind: an earlier attempt inferred the layout
 * from the structure alone and did not match. Re-port it with
 * `scripts/microsite/portMicrosite.py` whenever the source changes — it already
 * rewrote every heading once after the first port.
 *
 * Four deliberate departures, all because the original depends on Netlify or on
 * scripts that are not part of the page:
 *   - the contact <dialog> and its hidden Netlify form are replaced by the one
 *     in <MicrositeDialogs />, which posts to our own backend. Its triggers are
 *     the source's own buttons, untouched;
 *   - the about lightbox is mounted by <MicrositeDialogs /> too;
 *   - the marquee animation is driven by <PartnersMarquee />;
 *   - the source's floating WhatsApp button is dropped, because the root layout
 *     already mounts one site-wide with the same number and they overlapped.
 */

export const metadata: Metadata = {
  title: "Cursos de Inglés en el Extranjero y Campamentos | MatchMyCourse",
  description:
    "Explora cursos de inglés en Irlanda, Canadá, Inglaterra, Escocia y Nueva Zelanda. Programas para adultos, campamentos para jóvenes y experiencias internacionales.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

export default function BeneficiosEmpresaPage() {
  return (
    <>
      <header className="site-header container"><Link aria-label="MatchMyCourse, volver a la portada de Beneficios" className="brand" href="/beneficios-empresa"><img alt="MatchMyCourse" height="58" src="/beneficios-empresa/assets/logo.png" width="216" /></Link></header><main id="inicio">
<section className="hero"><div aria-hidden="true" className="blob one"></div><div aria-hidden="true" className="blob two"></div><div aria-hidden="true" className="blob three"></div><div aria-hidden="true" className="blob yellow"></div><div className="container hero-inner"><span className="eyebrow">Tu próxima experiencia comienza aquí</span><h1><span className="hero-title-line">Cursos de inglés en el extranjero</span><span className="hero-title-line hero-title-line-two" style={{whiteSpace: 'normal'}}>para <span className="accent">adultos y jóvenes</span></span></h1><p>Aprende inglés, descubre nuevos destinos y vive mucho más. Explora cursos de corta duración, programas de estudio y trabajo, campamentos y experiencias internacionales para adultos y jóvenes.</p></div></section>
<section className="section choose destinations" id="elige"><div className="container"><div className="section-head center"><h2>Descubre dónde estudiar inglés <span className="accent">en el extranjero</span></h2><p>Elige tu curso y descubre los precios y detalles</p></div><div className="destinations-grid"><Link className="destination-card" href="/beneficios-empresa/irlanda"><img alt="Paisaje en Irlanda" decoding="async" loading="lazy" src="/beneficios-empresa/assets/irlanda-fallback.webp" /><span className="destination-shade"></span><span className="destination-label">Irlanda<span className="card-arrow">↗</span></span></Link><Link className="destination-card" href="/beneficios-empresa/nueva-zelanda"><img alt="Lago y montañas de Nueva Zelanda" decoding="async" loading="lazy" src="/beneficios-empresa/assets/nueva-zelanda-fallback.webp" /><span className="destination-shade"></span><span className="destination-label">Nueva Zelanda<span className="card-arrow">↗</span></span></Link><Link className="destination-card" href="/beneficios-empresa/canada"><img alt="Toronto, Canadá" decoding="async" loading="lazy" src="/beneficios-empresa/assets/canada-fallback.webp" /><span className="destination-shade"></span><span className="destination-label">Canadá<span className="card-arrow">↗</span></span></Link><Link className="destination-card" href="/beneficios-empresa/inglaterra"><img alt="Vista de Londres con el Big Ben" decoding="async" loading="lazy" src="/beneficios-empresa/assets/england-scenery.webp" /><span className="destination-shade"></span><span className="destination-label">Inglaterra<span className="card-arrow">↗</span></span></Link><Link className="destination-card" href="/beneficios-empresa/escocia"><img alt="Castillo de Edimburgo, Escocia" decoding="async" loading="lazy" src="/beneficios-empresa/assets/scotland-scenery.webp" /><span className="destination-shade"></span><span className="destination-label">Escocia<span className="card-arrow">↗</span></span></Link></div></div></section>
<section aria-labelledby="partners-marquee-heading" className="partners-marquee-section">
<div className="container partners-marquee-intro">
<span className="eyebrow">INSTITUCIONES Y ESCUELAS</span>
<h2 id="partners-marquee-heading">Escuelas e instituciones para estudiar inglés en el extranjero</h2>
</div>
<div aria-label="Logotipos de instituciones y escuelas con las que trabajamos" className="partners-marquee" tabIndex={0}>
<div className="partners-marquee-track">
<div className="partners-marquee-group" role="list">
<div className="partners-marquee-item" role="listitem"><img alt="Atlantic Language" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-01.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="Galway Language Centre" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-02.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="Worldwide School of English" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-03.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="Mount Maunganui Language Centre" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-04.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="Sprott Shaw Language College" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-05.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="Quest Language Studies" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-06.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="Linguaviva Centre" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-07.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="University of Limerick" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-08.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="International House Dublin" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-09.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="Cork English College" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-10.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="Centre of English Studies" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-11.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="University College Cork" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-12.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="ATC Language Schools" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-13.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="Apollo English Language Centre" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-14.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="Emerald Cultural Institute" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-15.webp" width="150" /></div>
<div className="partners-marquee-item" role="listitem"><img alt="RELA" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-16.webp" width="150" /></div>
</div>
<div aria-hidden="true" className="partners-marquee-group">
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-01.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-02.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-03.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-04.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-05.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-06.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-07.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-08.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-09.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-10.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-11.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-12.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-13.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-14.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-15.webp" width="150" /></div>
<div className="partners-marquee-item"><img alt="" decoding="async" height="54" loading="eager" src="/beneficios-empresa/assets/institution-logos/logo-16.webp" width="150" /></div>
</div>
</div>
</div>
</section>
<section aria-labelledby="why-mmc-heading" className="why-mmc-section">
<div className="container why-mmc-inner">
<div className="why-mmc-heading">
<span className="eyebrow">POR QUÉ MATCHMYCOURSE</span>
<h2 id="why-mmc-heading">¿Por qué elegir MatchMyCourse para <span className="accent">estudiar inglés en el extranjero?</span></h2>
<p>En MatchMyCourse te ayudamos a explorar programas de inglés en diferentes destinos, comparar alternativas y encontrar una experiencia educativa que se adapte a tus objetivos.</p>
</div>
<div className="why-mmc-grid">
<article className="why-mmc-card"><div aria-hidden="true" className="why-mmc-icon"><svg aria-hidden="true" fill="none" focusable="false" height="25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" width="25"><path d="m4 10 8-6 8 6" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /><path d="M3 20h18" /><path d="M9 11h.01M15 11h.01" /></svg></div><h3>Diversas instituciones educativas</h3><p>Explora programas de distintas escuelas e instituciones internacionales y encuentra alternativas según tu destino, intereses y objetivos.</p></article>
<article className="why-mmc-card"><div aria-hidden="true" className="why-mmc-icon"><svg aria-hidden="true" fill="none" focusable="false" height="25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" width="25"><rect height="18" rx="2" width="16" x="4" y="3" /><path d="m8 9 2 2 4-4M8 16h8M13 11h3" /></svg></div><h3>Información clara y transparente</h3><p>Conoce los precios, la duración, las características y las condiciones de cada programa antes de tomar una decisión.</p></article>
<article className="why-mmc-card"><div aria-hidden="true" className="why-mmc-icon"><svg aria-hidden="true" fill="none" focusable="false" height="25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" width="25"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.5-.8L4 20l1.8-5A7.5 7.5 0 1 1 20 11.5Z" /><path d="M8 11h8M8 14h5" /></svg></div><h3>Orientación personalizada</h3><p>Te ayudamos a resolver tus dudas y a encontrar una alternativa adecuada según tus necesidades y preferencias.</p></article>
<article className="why-mmc-card"><div aria-hidden="true" className="why-mmc-icon"><svg aria-hidden="true" fill="none" focusable="false" height="25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" width="25"><path d="M21 3 3 10.5l7 3.1L13.1 21 21 3Z" /><path d="m10 13.6 11-10.6" /></svg></div><h3>Acompañamiento en tu experiencia</h3><p>Recibe orientación durante la preparación de tu viaje y apoyo en las diferentes etapas del proceso, según los servicios de tu programa.</p></article>
</div>
</div>
</section>
<section aria-labelledby="about-mmc-heading" className="about-mmc-section" id="conoce-matchmycourse">
<div className="container about-mmc-layout">
<div className="about-mmc-copy">
<span className="eyebrow">CONOCE MATCHMYCOURSE</span>
<h2 id="about-mmc-heading">Conoce MatchMyCourse y <span className="accent">nuestro equipo</span></h2>
<p>En MatchMyCourse conectamos a estudiantes con escuelas e instituciones educativas internacionales, ayudándolos a explorar programas de inglés y experiencias en el extranjero.</p>
<p>Creemos que elegir dónde estudiar es una decisión importante. Por eso, trabajamos directamente con instituciones educativas y buscamos entregar información clara, orientación personalizada y apoyo durante el proceso.</p>
<p>Nuestro trabajo nos permite conocer de cerca las escuelas, sus programas y las experiencias que ofrecen, para ayudarte a encontrar una alternativa que se adapte a tus objetivos.</p>
</div>
<div aria-label="Fotografías reales del equipo, estudiantes y visitas a escuelas" className="about-mmc-mosaic">
<button aria-label="Ampliar fotografía 1: Encuentro de estudiantes internacionales en una actividad grupal" className="about-mmc-photo about-mmc-photo-1" data-about-alt="Encuentro de estudiantes internacionales en una actividad grupal" data-about-photo="/beneficios-empresa/assets/conoce-matchmycourse/visita-estudiantes.webp" type="button"><img alt="Encuentro de estudiantes internacionales en una actividad grupal" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/assets/conoce-matchmycourse/visita-estudiantes.webp" width="800" /></button>
<button aria-label="Ampliar fotografía 2: Grupo de estudiantes reunidos durante una experiencia en Irlanda" className="about-mmc-photo about-mmc-photo-2" data-about-alt="Grupo de estudiantes reunidos durante una experiencia en Irlanda" data-about-photo="/beneficios-empresa/assets/conoce-matchmycourse/experiencia-grupal.webp" type="button"><img alt="Grupo de estudiantes reunidos durante una experiencia en Irlanda" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/assets/conoce-matchmycourse/experiencia-grupal.webp" width="800" /></button>
<button aria-label="Ampliar fotografía 3: Visita de MatchMyCourse a Cork English College" className="about-mmc-photo about-mmc-photo-3" data-about-alt="Visita de MatchMyCourse a Cork English College" data-about-photo="/beneficios-empresa/assets/conoce-matchmycourse/visita-cec.webp" type="button"><img alt="Visita de MatchMyCourse a Cork English College" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/assets/conoce-matchmycourse/visita-cec.webp" width="800" /></button>
<button aria-label="Ampliar fotografía 4: Visita profesional a Galway Business School" className="about-mmc-photo about-mmc-photo-4" data-about-alt="Visita profesional a Galway Business School" data-about-photo="/beneficios-empresa/assets/conoce-matchmycourse/visita-galway.webp" type="button"><img alt="Visita profesional a Galway Business School" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/assets/conoce-matchmycourse/visita-galway.webp" width="800" /></button>
<button aria-label="Ampliar fotografía 5: Encuentro de MatchMyCourse en Linguaviva Centre" className="about-mmc-photo about-mmc-photo-5" data-about-alt="Encuentro de MatchMyCourse en Linguaviva Centre" data-about-photo="/beneficios-empresa/assets/conoce-matchmycourse/visita-linguaviva.webp" type="button"><img alt="Encuentro de MatchMyCourse en Linguaviva Centre" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/assets/conoce-matchmycourse/visita-linguaviva.webp" width="800" /></button>
<button aria-label="Ampliar fotografía 6: Estudiantes celebrando una actividad en una escuela de inglés" className="about-mmc-photo about-mmc-photo-6" data-about-alt="Estudiantes celebrando una actividad en una escuela de inglés" data-about-photo="/beneficios-empresa/assets/conoce-matchmycourse/estudiantes-escuela.webp" type="button"><img alt="Estudiantes celebrando una actividad en una escuela de inglés" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/assets/conoce-matchmycourse/estudiantes-escuela.webp" width="800" /></button>
<button aria-label="Ampliar fotografía 7: Encuentro entre estudiantes durante una experiencia internacional" className="about-mmc-photo about-mmc-photo-7" data-about-alt="Encuentro entre estudiantes durante una experiencia internacional" data-about-photo="/beneficios-empresa/assets/conoce-matchmycourse/experiencia-dublin.webp" type="button"><img alt="Encuentro entre estudiantes durante una experiencia internacional" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/assets/conoce-matchmycourse/experiencia-dublin.webp" width="800" /></button>
<button aria-label="Ampliar fotografía 8: Experiencia de viaje frente a un castillo histórico en Irlanda" className="about-mmc-photo about-mmc-photo-8" data-about-alt="Experiencia de viaje frente a un castillo histórico en Irlanda" data-about-photo="/beneficios-empresa/assets/conoce-matchmycourse/experiencia-castillo.webp" type="button"><img alt="Experiencia de viaje frente a un castillo histórico en Irlanda" decoding="async" height="800" loading="lazy" src="/beneficios-empresa/assets/conoce-matchmycourse/experiencia-castillo.webp" width="800" /></button>
</div>
</div>
</section>

<section aria-labelledby="how-mmc-heading" className="how-mmc-section" id="como-funciona">
<div className="container">
<div className="how-mmc-head"><span className="eyebrow">ASÍ FUNCIONA MATCHMYCOURSE</span><h2 id="how-mmc-heading">Cómo elegir tu curso de inglés en el extranjero <span className="accent">en 3 pasos</span></h2></div>
<div className="how-mmc-grid"><article className="how-mmc-card"><div className="how-mmc-top"><span aria-hidden="true" className="how-mmc-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></svg></span><span aria-label="Paso 01" className="how-mmc-number">01</span></div><h3>Elige tu destino</h3><p>Explora nuestros cinco países y descubre las ciudades donde puedes estudiar inglés.</p></article><article className="how-mmc-card"><div className="how-mmc-top"><span aria-hidden="true" className="how-mmc-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /><path d="M8 7h8M8 11h6" /></svg></span><span aria-label="Paso 02" className="how-mmc-number">02</span></div><h3>Encuentra tu curso</h3><p>Revisa los cursos y ofertas disponibles, sus precios, alojamiento y características.</p></article><article className="how-mmc-card"><div className="how-mmc-top"><span aria-hidden="true" className="how-mmc-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-3.8-.8L3 21l1.8-5.7A8.5 8.5 0 1 1 21 11.5Z" /><path d="M8 11h8M8 14h5" /></svg></span><span aria-label="Paso 03" className="how-mmc-number">03</span></div><h3>Consulta y reserva</h3><p>Contáctanos para resolver tus dudas y recibir orientación antes de reservar tu programa.</p></article></div>
<div className="how-mmc-action"><a className="how-mmc-button" href="#elige">Elige tu destino <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m-6-6 6 6 6-6" /></svg></a></div>
</div>
</section>
<section aria-labelledby="institutional-mmc-title" className="institutional-mmc" id="empresas-colegios">
<div className="container institutional-mmc-inner">
<div className="institutional-mmc-heading">
<span className="institutional-mmc-eyebrow">EMPRESAS Y COLEGIOS</span>
<h2 id="institutional-mmc-title">Programas de inglés en el extranjero para <span>empresas y colegios</span></h2>
<p className="institutional-mmc-lead">En MatchMyCourse ayudamos a empresas y establecimientos educacionales a acercar oportunidades de aprendizaje de inglés en el extranjero a sus trabajadores, estudiantes y familias.</p>
</div>
<div className="institutional-mmc-grid">
<article className="institutional-mmc-card">
<span className="institutional-mmc-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><rect height="18" rx="2" width="18" x="3" y="3" /><path d="M7 7h2m6 0h2M7 11h2m6 0h2M7 15h2m6 0h2M10 21v-4h4v4" /></svg></span>
<span className="institutional-mmc-tag">PARA EMPRESAS</span>
<h3>Oportunidades internacionales para tus trabajadores</h3>
<p className="institutional-mmc-description">Facilita a tus colaboradores el acceso a cursos de inglés en el extranjero, con alternativas de distinta duración, destinos y precios. Una oportunidad para que puedan aprovechar sus vacaciones y vivir una experiencia educativa internacional.</p>
<button className="institutional-mmc-button" data-contact-destination="Información para empresas / Recursos Humanos" type="button">Solicitar información para empresas <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button>
</article>
<article className="institutional-mmc-card">
<span className="institutional-mmc-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m3 10 9-6 9 6M5 10v10h14V10M9 20v-6h6v6M2 20h20" /><path d="M10 9h4" /></svg></span>
<span className="institutional-mmc-tag">PARA COLEGIOS</span>
<h3>Experiencias educativas para tus estudiantes</h3>
<p className="institutional-mmc-description">Presenta a padres y apoderados programas de inglés, campamentos y experiencias internacionales para jóvenes. Descubre alternativas que pueden combinar aprendizaje, actividades culturales y excursiones en distintos destinos.</p>
<button className="institutional-mmc-button" data-contact-destination="Información para colegios" type="button">Solicitar información para colegios <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button>
</article>
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
<h2>Contacta con MatchMyCourse</h2>
<div className="footer-contact-item"><span aria-hidden="true" className="footer-contact-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></svg></span><div><strong>Oficina en Irlanda · Dublín</strong><address>77 Candem Street Lower, Dublin 2</address></div></div>
<div className="footer-contact-item"><span aria-hidden="true" className="footer-contact-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></svg></span><div><strong>Oficina en Chile · Santiago</strong><address>Fray Angélico 133, Las Condes</address></div></div>
<div className="footer-contact-item"><span aria-hidden="true" className="footer-contact-icon"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m6.2 2.8 3.2 3.5-1.7 2.3c1.5 3 3.8 5.3 6.8 6.8l2.3-1.7 3.5 3.2-1.1 3.2c-.3.8-1.2 1.1-2 1-8.1-.9-14.3-7.1-15.2-15.2-.1-.8.3-1.7 1-2z" /></svg></span><div><strong>Teléfonos de contacto</strong><a href="tel:+56982959118">Chile: +56 9 8295 9118</a><a href="tel:+353831134401">Irlanda: +353 83 113 4401</a></div></div>
<a className="footer-email" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20cursos%20de%20ingl%C3%A9s%20en%20el%20extranjero.">Escríbenos por WhatsApp</a>
</div>
</div>
<div className="container footer-bottom">© 2026 MatchMyCourse · Todos los derechos reservados.</div>
</footer>
      <PartnersMarquee />
      <MicrositeDialogs />
    </>
  );
}
