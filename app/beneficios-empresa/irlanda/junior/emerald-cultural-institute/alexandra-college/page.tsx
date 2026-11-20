import type { Metadata, Viewport } from "next";
import Link from "next/link";

import MicrositeDialogs from "@/app/beneficios-empresa/components/MicrositeDialogs";

import "@/app/beneficios-empresa/styles/programas/irlanda_junior_emerald-cultural-institute_alexandra-college.css";

/**
 * /beneficios-empresa/irlanda/junior/emerald-cultural-institute/alexandra-college — ported from the published source, class for class, against its own
 * stylesheet. Re-port with `scripts/microsite/portMicrosite.py`.
 *
 * The source's inline tab script and Netlify contact form are replaced by
 * components; the floating WhatsApp button is dropped because the root layout
 * already mounts one site-wide.
 */

export const metadata: Metadata = {
  title: "Alexandra College Dublín | Programa Junior de Inglés 2027",
  description:
    "Descubre el programa junior de inglés y actividades en Alexandra College, Dublín. Para jóvenes de 11 a 17 años, con residencia y precios desde €2.995.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

export default function EmeraldCulturalInstituteAlexandraCollegePage() {
  return (
    <div className="alexandra-college">
      <header className="navbar">
<Link className="logo" href="/beneficios-empresa"><img alt="MatchMyCourse" src="/beneficios-empresa/assets/logo.png" /></Link>
<Link className="back" href="/beneficios-empresa">← Volver a programas</Link>
</header>
<main>
<section className="hero">
<img alt="Estudiantes compartiendo en Alexandra College, Dublín" className="hero-image" src="/beneficios-empresa/irlanda/junior/emerald-cultural-institute/alexandra-college/media/hero.webp" />
<div className="hero-overlay"></div>
<div className="hero-copy">
<span className="eyebrow">DUBLÍN · IRLANDA · EMERALD CULTURAL INSTITUTE</span>
<h1>Estudia inglés en Alexandra College</h1>
<p>Descubre una experiencia junior en Dublín que combina clases de inglés, actividades culturales, deportes y excursiones, con alojamiento en residencia dentro del campus de Alexandra College.</p>
<a className="action" href="#programas">Descubre los programas ↓</a>
</div>
</section>
<section className="wrap intro" id="programas">
<div>
<span className="kicker">PROGRAMAS JUNIOR</span>
<h2>Una experiencia de inglés para jóvenes en Alexandra College</h2>
<p><b>Alexandra College</b>, en Dublín, es el campus donde se desarrolla esta experiencia junior de <b>Emerald Cultural Institute</b>. El programa combina clases de inglés durante la semana con actividades recreativas, deportivas y culturales, además de alojamiento en residencia.</p>
</div>
<div className="logo-school">
<img alt="Logotipo Emerald Cultural Institute" src="/beneficios-empresa/irlanda/junior/emerald-cultural-institute/alexandra-college/media/emerald-logo.png" />
</div>
</section>
<section className="wrap program-list">
<article className="program-card">
<div className="program-card-top">
<div className="program-card-photo">
<img alt="Estudiante de inglés en Dublín, imagen del programa Inglés + Multi-Activity de Alexandra College" decoding="async" loading="lazy" src="/beneficios-empresa/irlanda/junior/emerald-cultural-institute/alexandra-college/media/multi-activity.webp" />
</div>
<div className="program-card-content">
<span className="kicker">VERANO · 04 DE JULIO AL 01 DE AGOSTO</span>
<div className="program-headline">
<div>
<h2>Inglés + Multi-Activity</h2>
<p>Combina clases de inglés con actividades culturales, deportivas y recreativas en Dublín. Los estudiantes participan en excursiones, visitas a lugares de interés y actividades supervisadas, mientras practican inglés y conocen la cultura irlandesa.</p>
</div>
<div className="price-tag">
<small>VALOR DESDE</small>
<strong>€2.995</strong>
<span>2 semanas</span>
</div>
</div>
<div className="programme-dates compact">
<div className="alex-date-item"><svg aria-hidden="true" className="alex-date-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></svg><span className="alex-date-text"><b>Edad:</b> 11 a 17 años</span></div>
<div className="alex-date-item"><svg aria-hidden="true" className="alex-date-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24"><path d="M8 2v4M16 2v4M3 10h18" /><rect height="18" rx="2" width="18" x="3" y="4" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></svg><span className="alex-date-text"><b>Inicio:</b> 4 y 18 de julio</span></div>
<div className="alex-date-item"><svg aria-hidden="true" className="alex-date-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24"><path d="M8 2v4M16 2v4M3 10h18" /><rect height="18" rx="2" width="18" x="3" y="4" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></svg><span className="alex-date-text"><b>Término:</b> 18 de julio y 1 de agosto</span></div>
</div>
</div>
</div>
<div className="jr-fact-grid">
<div className="jr-fact jr-fact-0"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m2 10 10-5 10 5-10 5-10-5Z" /><path d="M6 12v5c4 3 8 3 12 0v-5" /><path d="M22 10v7" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Clases de inglés</div><strong>15 horas</strong><span>Clases de inglés por semana</span></div></div>
<div className="jr-fact jr-fact-1"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><rect height="8" rx="1" width="4" x="3" y="13" /><rect height="12" rx="1" width="4" x="10" y="9" /><rect height="17" rx="1" width="4" x="17" y="4" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Nivel de inglés</div><strong>Todos los niveles</strong><span>Niveles de inglés admitidos</span></div></div>
<div className="jr-fact jr-fact-0"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 18V7m18 11V7M3 14h18v4H3zM6 14V9h6a3 3 0 0 1 3 3v2M15 12h4a2 2 0 0 1 2 2" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Alojamiento</div><strong>Residencia</strong><span>Alexandra College Campus o Trinity Hall</span></div></div>
<div className="jr-fact jr-fact-1"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4 2v7a3 3 0 0 0 6 0V2M7 2v20M19 22V2c-4 2-5 7-5 12h5" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Alimentación</div><strong>Todos los días</strong><span>3 comidas al día</span></div></div>
</div>
<details className="jr-accordion">
<summary>Actividades y detalles del programa <span aria-hidden="true" className="jr-chevron">⌄</span></summary>
<div className="jr-accordion-inner">
<div className="jr-detail-grid">
<div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m2 20 7-12 4 6 3-4 6 10H2Z" /><path d="M9 8V3l5 2-5 2" /></svg></div><h3>Actividades</h3><p>Visitas culturales, excursiones, deportes y actividades recreativas.</p></div>
<div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg></div><h3>Supervisión</h3><p>Actividades supervisadas.</p></div>
<div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M11 13 22 2" /></svg></div><h3>Traslados</h3><p>No incluido, consultar coordinación.</p></div>
<div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /><path d="M5 12h4l2-3 2 6 2-3h4" /></svg></div><h3>Seguro médico</h3><p>Incluido.</p></div>
</div>
<div className="jr-contact"><a aria-label="Consultar por WhatsApp: Inglés + Multi-Activity de Alexandra College" className="jr-contact-btn" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Ingl%C3%A9s%20%2B%20Multi-Activity%20de%20Alexandra%20College%20que%20se%20cursa%20en%20Irlanda.">Solicitar información <span aria-hidden="true">→</span></a></div>
<p className="jr-max">Fechas disponibles: 4 de julio y 18 de julio de 2027</p>
</div>
</details>
</article>
</section>
<section className="wrap campus-feature">
<img alt="Edificio y campus de Alexandra College en Dublín" loading="lazy" src="/beneficios-empresa/irlanda/junior/emerald-cultural-institute/alexandra-college/media/alexandra-campus.webp" />
<div className="campus-panel">
<span className="kicker">CAMPUS Y ALOJAMIENTO</span>
<h2>Alexandra College: campus y residencia en Dublín</h2>
<p>Alexandra College forma parte del Milltown Junior Campus de Emerald Cultural Institute y cuenta con la residencia Hermione Building, inaugurada en 2022. El programa ofrece una experiencia residencial pensada para jóvenes, en un entorno académico con espacios de convivencia y actividades dentro del campus.</p>
<ul>
<li>Residencia en campus con habitaciones compartidas, ropa de cama y toallas incluidas.</li>
<li>Study Hall, áreas de reunión y descanso, espacios de TV y recreación, lavandería, Wi‑Fi gratuito y seguridad 24 horas.</li>
<li>Instalaciones para tenis, básquetbol, atletismo, fútbol, cricket y rugby, además de gimnasio, salón multiuso y teatro.</li>
<li>Entorno supervisado y preparado para combinar clases, vida residencial y actividades después de clase.</li>
</ul>
</div>
</section>
<section className="wrap common-note">
<span className="kicker">INFORMACIÓN GENERAL</span>
<h2>Alojamiento, servicios y condiciones de participación</h2>
<ul className="check">
<li>Los valores publicados corresponden a precios <b>desde</b> el mínimo de 2 semanas.</li>
<li>La cotización final puede variar según la duración elegida y la modalidad informada para cada programa.</li>
<li>Durante el verano hay disponibilidad para distintos niveles de inglés según la modalidad ofrecida por la escuela.</li>
<li>El programa incluye clases, actividades y una experiencia residencial supervisada en campus.</li>
<li>La escuela confirma disponibilidad, calendario final y condiciones de reserva al momento de la postulación.</li>
</ul>
</section>
<section className="wrap closing">
<div>
<span className="kicker">MATCHMYCOURSE</span>
<h2>¿Te interesa estudiar inglés en Alexandra College?</h2>
<p>Podemos ayudarte a conocer las fechas disponibles, revisar las características del programa y resolver tus dudas antes de reservar esta experiencia junior en Dublín.</p>
</div>
<a aria-label="Consultar por WhatsApp: Inglés + Multi-Activity de Alexandra College" className="action buttonlike" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Ingl%C3%A9s%20%2B%20Multi-Activity%20de%20Alexandra%20College%20que%20se%20cursa%20en%20Irlanda.">Solicitar información →</a>
</section>
<p className="wrap lastnote">* La información publicada corresponde al programa junior informado para Alexandra College. Los valores, fechas y disponibilidad deben ser confirmados al momento de la reserva.</p>
</main>
<footer>© 2026 MatchMyCourse · <Link href="/beneficios-empresa">Volver al inicio</Link></footer>
      <MicrositeDialogs />
    </div>
  );
}
