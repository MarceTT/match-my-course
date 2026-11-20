import type { Metadata, Viewport } from "next";
import Link from "next/link";

import MicrositeDialogs from "@/app/beneficios-empresa/components/MicrositeDialogs";

import "@/app/beneficios-empresa/styles/programas/irlanda_junior_emerald-cultural-institute_sandford-park-school.css";

/**
 * /beneficios-empresa/irlanda/junior/emerald-cultural-institute/sandford-park-school — ported from the published source, class for class, against its own
 * stylesheet. Re-port with `scripts/microsite/portMicrosite.py`.
 *
 * The source's inline tab script and Netlify contact form are replaced by
 * components; the floating WhatsApp button is dropped because the root layout
 * already mounts one site-wide.
 */

export const metadata: Metadata = {
  title: "Campamentos de Inglés en Dublín | Sandford Park School",
  description:
    "Descubre tres programas de verano de Emerald en Sandford Park School, Dublín: inglés con actividades, intensivo y Young Adult, con alojamiento en familia.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

export default function eraldCulturalInstituteSandfordParkSchoolPage() {
  return (
    <>
      <header className="navbar">
<Link className="logo" href="/beneficios-empresa"><img alt="MatchMyCourse" src="/beneficios-empresa/assets/logo.png" /></Link>
<Link className="back" href="/beneficios-empresa">← Volver a programas</Link>
</header>
<main>
<section className="hero">
<img alt="Edificio de Sandford Park School en Dublín" className="hero-image" src="/beneficios-empresa/irlanda/junior/emerald-cultural-institute/sandford-park-school/media/hero.webp" />
<div className="hero-overlay"></div>
<div className="hero-copy">
<span className="eyebrow">DUBLÍN · IRLANDA · EMERALD CULTURAL INSTITUTE</span>
<h1>Campamentos de inglés en Dublín <br /><em>para adolescentes</em></h1>
<p>Vive el verano en Sandford Park School con Emerald Cultural Institute. Elige entre inglés con actividades, un programa intensivo o Young Adult, y descubre Dublín mientras practicas el idioma.</p>
<a className="action" href="#programas">Descubre los programas ↓</a>
</div>
</section>
<section className="wrap intro" id="programas">
<div>
<span className="kicker">PROGRAMAS JUNIOR</span>
<h2>Tres maneras de aprender y disfrutar el verano en Sandford Park</h2>
<p>En <b>Sandford Park School</b>, Dublín, <b>Emerald Cultural Institute</b> ofrece tres modalidades para jóvenes: Inglés + Multi-Activity, Inglés intensivo y Young Adult. Los programas combinan clases y experiencias internacionales, con alojamiento en familias anfitrionas y actividades que varían según la modalidad y la edad del estudiante.</p>
</div>
<div className="logo-school">
<img alt="Logotipo Emerald Cultural Institute" src="/beneficios-empresa/irlanda/junior/emerald-cultural-institute/sandford-park-school/media/emerald-logo.png" />
</div>
</section>
<section className="wrap program-list">
<article className="program-card">
<div className="program-card-top"><div className="program-card-photo"><img alt="Estudiantes de Sandford Park School realizando actividades al aire libre" loading="lazy" src="/beneficios-empresa/irlanda/junior/emerald-cultural-institute/sandford-park-school/media/multi.webp" /></div><div className="program-card-content"><span className="kicker">VERANO · 27 DE JUNIO AL 8 DE AGOSTO</span><div className="program-headline">
<div>
<h2>Inglés + Multi-Activity</h2>
<p>Combina clases de inglés con actividades culturales, deportivas y recreativas en Dublín. Los estudiantes participan en excursiones, visitas a lugares de interés y actividades supervisadas, mientras practican inglés y conocen la cultura irlandesa.</p>
</div>
<div className="price-tag">
<small>VALOR DESDE</small>
<strong>€2.300</strong>
<span>2 semanas</span>
</div>
</div><div className="programme-dates compact">
<span><b>Edad:</b> 11 a 17 años</span>
<span><b>Inicio:</b> 27 de junio</span>
<span><b>Término:</b> 8 de agosto</span>
</div></div></div><div className="jr-fact-grid"><div className="jr-fact jr-fact-0"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m2 10 10-5 10 5-10 5-10-5Z" /><path d="M6 12v5c4 3 8 3 12 0v-5" /><path d="M22 10v7" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Clases de inglés</div><strong>15 horas</strong><span>Clases de inglés por semana</span></div></div><div className="jr-fact jr-fact-1"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><rect height="8" rx="1" width="4" x="3" y="13" /><rect height="12" rx="1" width="4" x="10" y="9" /><rect height="17" rx="1" width="4" x="17" y="4" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Nivel de inglés</div><strong>Todos los niveles</strong><span>Niveles de inglés admitidos</span></div></div><div className="jr-fact jr-fact-0"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 18V7m18 11V7M3 14h18v4H3zM6 14V9h6a3 3 0 0 1 3 3v2M15 12h4a2 2 0 0 1 2 2" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Alojamiento</div><strong>Homestay o Residencia</strong><span>Familia anfitriona o Trinity Hall</span></div></div><div className="jr-fact jr-fact-1"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4 2v7a3 3 0 0 0 6 0V2M7 2v20M19 22V2c-4 2-5 7-5 12h5" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Alimentación</div><strong>Todos los días</strong><span>3 comidas al día</span></div></div></div><details className="jr-accordion"><summary>Actividades y detalles del programa <span aria-hidden="true" className="jr-chevron">⌄</span></summary><div className="jr-accordion-inner"><div className="jr-detail-grid"><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m2 20 7-12 4 6 3-4 6 10H2Z" /><path d="M9 8V3l5 2-5 2" /></svg></div><h3>Actividades</h3><p>Visitas culturales, excursiones, deportes y actividades recreativas.</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg></div><h3>Supervisión</h3><p>Actividades supervisadas.</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M11 13 22 2" /></svg></div><h3>Traslados</h3><p>No incluido, consultar coordinación.</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /><path d="M5 12h4l2-3 2 6 2-3h4" /></svg></div><h3>Seguro médico</h3><p>Incluido.</p></div></div><div className="jr-contact"><a aria-label="Consultar por WhatsApp: Inglés + Multi-Activity de Sandford Park School" className="jr-contact-btn" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Ingl%C3%A9s%20%2B%20Multi-Activity%20de%20Sandford%20Park%20School%20que%20se%20cursa%20en%20Irlanda.">Solicitar información <span aria-hidden="true">→</span></a></div><p className="jr-max">Duración máxima del programa: 6 semanas</p></div></details></article>
<article className="program-card">
<div className="program-card-top"><div className="program-card-photo"><img alt="Estudiantes en clase de inglés en Sandford Park School" loading="lazy" src="/beneficios-empresa/irlanda/junior/emerald-cultural-institute/sandford-park-school/media/intensive.webp" /></div><div className="program-card-content"><span className="kicker">VERANO · 4 DE JULIO AL 8 DE AGOSTO</span><div className="program-headline">
<div>
<h2>Inglés intensivo</h2>
<p>Programa diseñado para estudiantes que buscan avanzar más rápidamente en el aprendizaje del inglés. Ofrece una mayor dedicación a las clases para desarrollar la comunicación, comprensión y fluidez, combinando el aprendizaje con una experiencia internacional en Irlanda.</p>
</div>
<div className="price-tag">
<small>VALOR DESDE</small>
<strong>€2.420</strong>
<span>2 semanas</span>
</div>
</div><div className="programme-dates compact">
<span><b>Edad:</b> 14 a 17 años</span>
<span><b>Inicio:</b> 4 de julio</span>
<span><b>Término:</b> 8 de agosto</span>
</div></div></div><div className="jr-fact-grid"><div className="jr-fact jr-fact-0"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m2 10 10-5 10 5-10 5-10-5Z" /><path d="M6 12v5c4 3 8 3 12 0v-5" /><path d="M22 10v7" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Clases de inglés</div><strong>15 horas</strong><span>Clases de inglés por semana</span></div></div><div className="jr-fact jr-fact-1"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><rect height="8" rx="1" width="4" x="3" y="13" /><rect height="12" rx="1" width="4" x="10" y="9" /><rect height="17" rx="1" width="4" x="17" y="4" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Nivel de inglés</div><strong>A2 a C1</strong><span>Niveles de inglés admitidos</span></div></div><div className="jr-fact jr-fact-0"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 18V7m18 11V7M3 14h18v4H3zM6 14V9h6a3 3 0 0 1 3 3v2M15 12h4a2 2 0 0 1 2 2" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Alojamiento</div><strong>Homestay</strong><span>Familia anfitriona</span></div></div><div className="jr-fact jr-fact-1"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4 2v7a3 3 0 0 0 6 0V2M7 2v20M19 22V2c-4 2-5 7-5 12h5" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Alimentación</div><strong>Todos los días</strong><span>3 comidas al día</span></div></div></div><details className="jr-accordion"><summary>Actividades y detalles del programa <span aria-hidden="true" className="jr-chevron">⌄</span></summary><div className="jr-accordion-inner"><div className="jr-detail-grid"><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m2 20 7-12 4 6 3-4 6 10H2Z" /><path d="M9 8V3l5 2-5 2" /></svg></div><h3>Actividades</h3><p>Actividades sociales y excursiones.</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg></div><h3>Supervisión</h3><p>Actividades supervisadas.</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M11 13 22 2" /></svg></div><h3>Traslados</h3><p>No incluido, consultar coordinación.</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /><path d="M5 12h4l2-3 2 6 2-3h4" /></svg></div><h3>Seguro médico</h3><p>Incluido.</p></div></div><div className="jr-contact"><a aria-label="Consultar por WhatsApp: Inglés intensivo de Sandford Park School" className="jr-contact-btn" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Ingl%C3%A9s%20intensivo%20de%20Sandford%20Park%20School%20que%20se%20cursa%20en%20Irlanda.">Solicitar información <span aria-hidden="true">→</span></a></div><p className="jr-max">Duración máxima del programa: 6 semanas</p></div></details></article>
<article className="program-card">
<div className="program-card-top"><div className="program-card-photo"><img alt="Grupo de estudiantes jóvenes en actividad urbana en Dublín" loading="lazy" src="/beneficios-empresa/irlanda/junior/emerald-cultural-institute/sandford-park-school/media/young.webp" /></div><div className="program-card-content"><span className="kicker">VERANO · 27 DE JUNIO AL 8 DE AGOSTO</span><div className="program-headline">
<div>
<h2>Inglés para Jóvenes (Young Adult)</h2>
<p>Programa dirigido a jóvenes que desean mejorar su inglés y desarrollar mayor independencia durante una experiencia internacional en Irlanda. Combina el aprendizaje del idioma con la oportunidad de practicarlo en situaciones cotidianas y compartir con estudiantes de distintas nacionalidades.</p>
</div>
<div className="price-tag">
<small>VALOR DESDE</small>
<strong>€2.300</strong>
<span>2 semanas</span>
</div>
</div><div className="programme-dates compact">
<span><b>Edad:</b> 16 a 19 años</span>
<span><b>Inicio:</b> 27 de junio</span>
<span><b>Término:</b> 8 de agosto</span>
</div></div></div><div className="jr-fact-grid"><div className="jr-fact jr-fact-0"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m2 10 10-5 10 5-10 5-10-5Z" /><path d="M6 12v5c4 3 8 3 12 0v-5" /><path d="M22 10v7" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Clases de inglés</div><strong>15 horas</strong><span>Clases de inglés por semana</span></div></div><div className="jr-fact jr-fact-1"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><rect height="8" rx="1" width="4" x="3" y="13" /><rect height="12" rx="1" width="4" x="10" y="9" /><rect height="17" rx="1" width="4" x="17" y="4" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Nivel de inglés</div><strong>B1 a C1</strong><span>Niveles de inglés admitidos</span></div></div><div className="jr-fact jr-fact-0"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 18V7m18 11V7M3 14h18v4H3zM6 14V9h6a3 3 0 0 1 3 3v2M15 12h4a2 2 0 0 1 2 2" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Alojamiento</div><strong>Homestay o Residencia</strong><span>Familia anfitriona o Trinity Hall</span></div></div><div className="jr-fact jr-fact-1"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4 2v7a3 3 0 0 0 6 0V2M7 2v20M19 22V2c-4 2-5 7-5 12h5" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Alimentación</div><strong>Todos los días</strong><span>3 comidas al día</span></div></div></div><details className="jr-accordion"><summary>Actividades y detalles del programa <span aria-hidden="true" className="jr-chevron">⌄</span></summary><div className="jr-accordion-inner"><div className="jr-detail-grid"><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m2 20 7-12 4 6 3-4 6 10H2Z" /><path d="M9 8V3l5 2-5 2" /></svg></div><h3>Actividades</h3><p>Talleres y seminarios de habilidades personales (5 h/semana); actividades culturales y excursiones.</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg></div><h3>Supervisión</h3><p>Actividades supervisadas.</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M11 13 22 2" /></svg></div><h3>Traslados</h3><p>No incluido, consultar coordinación.</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /><path d="M5 12h4l2-3 2 6 2-3h4" /></svg></div><h3>Seguro médico</h3><p>Incluido.</p></div></div><div className="jr-contact"><a aria-label="Consultar por WhatsApp: Inglés para Jóvenes (Young Adult) de Sandford Park School" className="jr-contact-btn" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Ingl%C3%A9s%20para%20J%C3%B3venes%20%28Young%20Adult%29%20de%20Sandford%20Park%20School%20que%20se%20cursa%20en%20Irlanda.">Solicitar información <span aria-hidden="true">→</span></a></div><p className="jr-max">Duración máxima del programa: 6 semanas</p></div></details></article>
</section>
<section className="wrap schedule-section">
<div className="section-heading">
<span className="kicker">CALENDARIO OPERATIVO</span>
<h2>Calendario de verano y edades por modalidad</h2>
<p>Estos son los periodos de funcionamiento informados para Sandford Park School durante la temporada de verano.</p>
</div>
<div className="schedule-grid">
<div className="schedule-card">
<h3>Inglés + Multi-Activity</h3>
<p><b>Edad:</b> 11 a 17 años</p>
<ul>
<li><b>Inicio:</b> 27 de junio</li>
<li><b>Término:</b> 8 de agosto</li>
<li><b>Duración recomendada:</b> 2 a 6 semanas</li>
</ul>
</div>
<div className="schedule-card">
<h3>Inglés intensivo</h3>
<p><b>Edad:</b> 14 a 17 años</p>
<ul>
<li><b>Inicio:</b> 4 de julio</li>
<li><b>Término:</b> 8 de agosto</li>
<li><b>Duración recomendada:</b> 2 a 6 semanas</li>
</ul>
</div>
<div className="schedule-card">
<h3>Young Adult</h3>
<p><b>Edad:</b> 16 a 19 años</p>
<ul>
<li><b>Inicio:</b> 27 de junio</li>
<li><b>Término:</b> 8 de agosto</li>
<li><b>Duración recomendada:</b> 2 a 6 semanas</li>
</ul>
</div>
</div>
</section>
<section className="wrap campus-feature">
<img alt="Fachada de Sandford Park School" loading="lazy" src="/beneficios-empresa/irlanda/junior/emerald-cultural-institute/sandford-park-school/media/campus.webp" />
<div className="campus-panel">
<span className="kicker">CAMPUS Y ALOJAMIENTO</span>
<h2>Sandford Park School: campus y entorno en Dublín</h2>
<p>Sandford Park School se ubica en Dublín, sobre hermosos terrenos arbolados y muy bien comunicados con el centro de la ciudad. El campus cuenta con aulas modernas, espacios recreativos y acceso a instalaciones deportivas.</p>
<ul>
<li>Ranelagh y Beechwood LUAS a pocos minutos caminando.</li>
<li>Instalaciones para deportes, actividades y eventos en campus.</li>
<li>Comedor, salas de clase luminosas y ambiente internacional.</li>
<li>Opciones de alojamiento en familia anfitriona y, según programa, residencia.</li>
</ul>
</div>
</section>
<section className="wrap common-note">
<span className="kicker">INFORMACIÓN GENERAL</span>
<h2>Alojamiento, servicios y condiciones de participación</h2>
<ul className="check">
<li>Los valores publicados corresponden a precios <b>desde</b> el mínimo de 2 semanas.</li>
<li>La cotización final puede variar según la duración elegida y el tipo de alojamiento.</li>
<li>Durante el verano hay disponibilidad para distintos niveles de inglés, desde principiante hasta avanzado.</li>
<li>Los programas incluyen clases, materiales de estudio, actividades y excursiones según la modalidad.</li>
<li>La escuela confirma disponibilidad, calendario final y condiciones de reserva al momento de la postulación.</li>
</ul>
</section>
<section className="wrap closing">
<div>
<span className="kicker">MATCHMYCOURSE</span>
<h2>Encuentra la opción adecuada para tu hijo</h2>
<p>Podemos ayudarte a revisar disponibilidad, tipo de alojamiento, fechas y el programa que mejor se adapta al perfil del estudiante.</p>
</div>
<a className="action" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Programas%20de%20verano%20de%20Sandford%20Park%20School%20que%20se%20cursa%20en%20Irlanda.">Consultar disponibilidad ↗</a>
</section>
<p className="wrap lastnote">* La información publicada corresponde al material compartido para Sandford Park School. Los valores, fechas y disponibilidad deben ser confirmados por la escuela al momento de la reserva.</p>
</main>
<footer>© 2026 MatchMyCourse · <Link href="/beneficios-empresa">Volver al inicio</Link></footer>
      <MicrositeDialogs />
    </>
  );
}
