import type { Metadata, Viewport } from "next";
import Link from "next/link";

import ExperiencesCarousel from "@/app/beneficios-empresa/components/ExperiencesCarousel";
import MicrositeDialogs from "@/app/beneficios-empresa/components/MicrositeDialogs";

import "@/app/beneficios-empresa/styles/programas/nueva-zelanda_junior_rela_ingles-actividades_style.css";
import "@/app/beneficios-empresa/styles/programas/nueva-zelanda_junior_rela_ingles-actividades_inline.css";

/**
 * /beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades — ported from the published source, class for class, against its own
 * stylesheets. Re-port with `scripts/microsite/portMicrosite.py`.
 *
 * The Netlify contact form is replaced by <MicrositeDialogs />, which posts to
 * our own backend; the floating WhatsApp button is dropped because the root
 * layout already mounts one site-wide.
 */

export const metadata: Metadata = {
  title: "Inglés y Actividades en Rotorua desde los 14 Años | RELA",
  description:
    "Aprende inglés en Rotorua con RELA: 25 horas semanales, actividades culturales y de aventura, homestay opcional y fechas durante 2027. Desde los 14 años.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

export default function NuevaZelandaJuniorRelaInglesActividadesPage() {
  return (
    <>
      <header className="navbar"><Link className="logo" href="/beneficios-empresa"><img alt="MatchMyCourse" src="/beneficios-empresa/assets/logo.png" /></Link><Link className="back" href="/beneficios-empresa/nueva-zelanda">← Volver a Nueva Zelanda</Link></header>
<main>
<section className="hero">
<img alt="Paisaje natural de Rotorua, Nueva Zelanda" className="hero-image" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/media/rotorua-hero.webp" />
<div aria-hidden="true" className="hero-overlay"></div>
<div className="hero-copy"><span className="eyebrow">ROTORUA · NUEVA ZELANDA · RELA</span>
<h1>Aprende inglés y descubre <em>Rotorua a través de sus actividades</em></h1>
<p>Estudia inglés en Rotorua con Rotorua English Language Academy (RELA) y aprovecha las tardes para conocer la cultura local, los paisajes geotermales y las actividades de aventura. Programa disponible desde los 14 años, con distintas fechas durante 2027.</p>
<a className="action" href="#programa">Conoce el programa ↓</a>
</div>
</section>
<section className="wrap intro" id="programa">
<div><span className="kicker">ROTORUA ENGLISH LANGUAGE ACADEMY</span>
<h2>Clases por la mañana, <span className="rela-intro-accent">aventuras por la tarde</span></h2>
<p>El programa English with Activities de Rotorua English Language Academy (RELA) permite aprender inglés y descubrir uno de los destinos más atractivos de Nueva Zelanda. Durante las mañanas, los estudiantes participan en clases de inglés y, por las tardes, disfrutan de actividades organizadas para explorar la naturaleza, conocer la cultura local y vivir nuevas experiencias.</p>
</div>
<div className="logo-school rela-school-logo"><img alt="Logotipo oficial Rotorua English Language Academy (RELA)" height="999" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/media/rela-logo-oficial.png" width="760" /></div>
</section>
<section aria-label="Programa disponible" className="wrap program-list">
<article className="program-card">
<div className="program-card-top"><div className="program-card-photo"><img alt="Estudiantes en una experiencia educativa en Rotorua English Language Academy" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/media/rela-class.webp" /></div><div className="program-card-content"><span className="kicker">RELA · ENGLISH WITH ACTIVITIES</span><div className="program-headline">
<div>
<h2>English with Activities de RELA</h2>
<p>Combina clases de inglés por las mañanas con actividades culturales, excursiones y experiencias de aventura por las tardes, descubriendo los atractivos naturales y turísticos de Rotorua.</p>
</div>
<div className="price-tag">
<small>VALOR</small>
<strong>NZD $760</strong>
<span>Por semana</span>
</div>
</div><div className="programme-dates compact rela-age-only"><span className="rela-age-item"><svg aria-hidden="true" className="rela-age-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="7" r="3.5" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></svg><span><b>Edad:</b> Desde 14 años</span></span></div></div></div><div className="jr-fact-grid"><div className="jr-fact jr-fact-0"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m2 10 10-5 10 5-10 5-10-5Z" /><path d="M6 12v5c4 3 8 3 12 0v-5" /><path d="M22 10v7" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Clases de inglés</div><strong>25 horas</strong><span>Clases de inglés por semana</span></div></div><div className="jr-fact jr-fact-1"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><rect height="8" rx="1" width="4" x="3" y="13" /><rect height="12" rx="1" width="4" x="10" y="9" /><rect height="17" rx="1" width="4" x="17" y="4" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Nivel de inglés</div><strong>Todos los niveles</strong><span>Sin nivel mínimo exigido.</span></div></div><div className="jr-fact jr-fact-0"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 18V7m18 11V7M3 14h18v4H3zM6 14V9h6a3 3 0 0 1 3 3v2M15 12h4a2 2 0 0 1 2 2" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Alojamiento</div><strong>Homestay</strong><span>Familia anfitriona · NZD $350 por semana (adicional al programa).</span></div></div><div className="jr-fact jr-fact-1"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4 2v7a3 3 0 0 0 6 0V2M7 2v20M19 22V2c-4 2-5 7-5 12h5" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Alimentación</div><strong>Según homestay</strong><span>Desayuno y cena; almuerzo también los fines de semana y festivos.</span></div></div></div><details className="jr-accordion"><summary>Actividades y detalles del programa <span aria-hidden="true" className="jr-chevron">⌄</span></summary><div className="jr-accordion-inner"><div className="jr-detail-grid"><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m2 20 7-12 4 6 3-4 6 10H2Z" /><path d="M9 8V3l5 2-5 2" /></svg></div><h3>Actividades</h3><p>Actividades culturales, recreativas y de aventura organizadas por RELA.</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg></div><h3>Supervisión</h3><p>Guía de RELA durante las actividades organizadas</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M11 13 22 2" /></svg></div><h3>Traslados</h3><p>Traslados generales/aeropuerto: consultar coordinación. Transporte a actividades programadas de RELA: incluido.</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /><path d="M5 12h4l2-3 2 6 2-3h4" /></svg></div><h3>Seguro médico</h3><p>Incluido</p></div></div><section aria-label="Fechas disponibles 2027" className="rela-dates-detail"><h3>Fechas disponibles 2027</h3><div className="rela-dates-grid"><div className="rela-date-box"><span>PERIODO 1</span><strong>05 de enero – 05 de febrero de 2027</strong></div><div className="rela-date-box"><span>PERIODO 2</span><strong>22 de marzo – 09 de abril de 2027</strong></div><div className="rela-date-box"><span>PERIODO 3</span><strong>05 de julio – 20 de agosto de 2027</strong></div><div className="rela-date-box"><span>PERIODO 4</span><strong>11 de octubre – 05 de noviembre de 2027</strong></div></div></section><div className="jr-contact"><a aria-label="Consultar por WhatsApp: Inglés + Multi-Activity de Sandford Park School" className="jr-contact-btn" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Ingl%C3%A9s%20%2B%20Multi-Activity%20de%20Sandford%20Park%20School%20que%20se%20cursa%20en%20Nueva%20Zelanda.">Solicitar información <span aria-hidden="true">→</span></a></div></div></details></article>
</section>
<section className="wrap rela-activities" id="actividades">
<div className="rela-section-heading rela-carousel-heading">
<span className="kicker">DESCUBRE ROTORUA</span>
<h2>Naturaleza, cultura y <span className="rela-carousel-accent">experiencias en Rotorua</span></h2>
<p>Rotorua es uno de los destinos más reconocidos de Nueva Zelanda por sus actividades de aventura, paisajes geotermales y experiencias culturales. Descubre algunas de las experiencias que puedes vivir mientras aprendes inglés con RELA.</p>
</div>
<div aria-label="Fotografías de experiencias en Rotorua" aria-roledescription="carrusel" className="rela-carousel" data-rela-carousel="" tabIndex={0}>
<div className="rela-carousel-window">
<div className="rela-carousel-track" data-rela-track="">
<figure aria-hidden="false" aria-label="1 de 14" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Pasarelas entre árboles en Redwoods, Rotorua" decoding="async" height="774" loading="eager" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-01.webp" style={{objectPosition: 'center 55%'}} width="1160" />
<figcaption className="rela-carousel-caption">Redwoods Treewalk</figcaption>
</figure>
<figure aria-hidden="true" aria-label="2 de 14" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Personas caminando por un bosque en Rotorua" decoding="async" height="773" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-02.webp" style={{objectPosition: 'center 50%'}} width="1160" />
<figcaption className="rela-carousel-caption">Caminata por Redwoods</figcaption>
</figure>
<figure aria-hidden="true" aria-label="3 de 14" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Participantes en una piscina exterior rodeada de naturaleza" decoding="async" height="870" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-03.webp" style={{objectPosition: 'center 47%'}} width="1160" />
<figcaption className="rela-carousel-caption">Relajación y naturaleza</figcaption>
</figure>
<figure aria-hidden="true" aria-label="4 de 14" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Paisaje con agua geotermal y vapor en Rotorua" decoding="async" height="770" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-04.webp" style={{objectPosition: 'center 55%'}} width="1160" />
<figcaption className="rela-carousel-caption">Paisajes geotermales</figcaption>
</figure>
<figure aria-hidden="true" aria-label="5 de 14" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Vista superior de un área geotermal con pasarelas" decoding="async" height="869" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-05.webp" style={{objectPosition: 'center 55%'}} width="1160" />
<figcaption className="rela-carousel-caption">Entornos geotermales</figcaption>
</figure>
<figure aria-hidden="true" aria-label="6 de 14" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Construcción tradicional maorí rodeada de naturaleza" decoding="async" height="774" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-06.webp" style={{objectPosition: 'center 54%'}} width="1160" />
<figcaption className="rela-carousel-caption">Cultura maorí</figcaption>
</figure>
<figure aria-hidden="true" aria-label="7 de 14" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Grupo de estudiantes posando en Rotorua" decoding="async" height="870" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-07.webp" style={{objectPosition: 'center 48%'}} width="1160" />
<figcaption className="rela-carousel-caption">Experiencias en Rotorua</figcaption>
</figure>
<figure aria-hidden="true" aria-label="8 de 14" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Participantes en pistas de luge de Skyline Rotorua" decoding="async" height="900" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-08.webp" style={{objectPosition: 'center 53%'}} width="900" />
<figcaption className="rela-carousel-caption">Skyline Rotorua</figcaption>
</figure>
<figure aria-hidden="true" aria-label="9 de 14" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Grupo de estudiantes internacionales reunidos en una actividad social" decoding="async" height="774" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-09.webp" style={{objectPosition: 'center 50%'}} width="1160" />
<figcaption className="rela-carousel-caption">Convivencia internacional</figcaption>
</figure>
<figure aria-hidden="true" aria-label="10 de 14" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Vehículo anfibio turístico en un lago de Rotorua" decoding="async" height="773" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-10.webp" style={{objectPosition: 'center 50%'}} width="1160" />
<figcaption className="rela-carousel-caption">Rotorua Duck Tours</figcaption>
</figure>
<figure aria-hidden="true" aria-label="11 de 14" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Grupo de amigos disfrutando un paisaje de lago" decoding="async" height="900" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-11.webp" style={{objectPosition: 'center 55%'}} width="675" />
<figcaption className="rela-carousel-caption">Paseos junto a los lagos</figcaption>
</figure>
<figure aria-hidden="true" aria-label="12 de 14" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Estudiantes alrededor de una mesa frente a un lago" decoding="async" height="900" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-12.webp" style={{objectPosition: 'center 55%'}} width="900" />
<figcaption className="rela-carousel-caption">Encuentros junto al lago</figcaption>
</figure>
<figure aria-hidden="true" aria-label="13 de 14" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Visitante junto a animales de granja" decoding="async" height="900" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-13.webp" style={{objectPosition: 'center 50%'}} width="675" />
<figcaption className="rela-carousel-caption">Experiencia rural</figcaption>
</figure>
<figure aria-hidden="true" aria-label="14 de 14" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Grupo participando en una actividad de rafting" decoding="async" height="773" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-14.webp" style={{objectPosition: 'center 52%'}} width="1160" />
<figcaption className="rela-carousel-caption">Rafting en Rotorua</figcaption>
</figure>
<figure aria-hidden="true" aria-label="Copia de la primera diapositiva" aria-roledescription="diapositiva" className="rela-carousel-slide" role="group">
<img alt="Pasarelas entre árboles en Redwoods, Rotorua" decoding="async" height="774" loading="lazy" src="/beneficios-empresa/nueva-zelanda/junior/rela/ingles-actividades/./media/experiencias/rotorua-01.webp" style={{objectPosition: 'center 55%'}} width="1160" />
<figcaption className="rela-carousel-caption">Redwoods Treewalk</figcaption>
</figure>
</div>
<button aria-label="Ver fotografía anterior" className="rela-carousel-arrow rela-carousel-prev" data-rela-prev="" type="button"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg></button>
<button aria-label="Ver fotografía siguiente" className="rela-carousel-arrow rela-carousel-next" data-rela-next="" type="button"><svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg></button>
</div>
<div aria-label="Seleccionar fotografía" className="rela-carousel-dots" data-rela-dots="" role="group"></div>
</div>
</section>
<section className="wrap closing rela-contact">
<div><span className="kicker">MATCHMYCOURSE</span><h2>Consulta las próximas fechas con MatchMyCourse</h2><p>Te ayudamos a conocer las fechas disponibles, las condiciones de participación, el alojamiento y los servicios adicionales para encontrar la alternativa más adecuada.</p></div>
<a className="action rela-action-link" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Ingl%C3%A9s%20%2B%20Actividades%20de%20RELA%20Rotorua%20que%20se%20cursa%20en%20Nueva%20Zelanda.">Consultar disponibilidad ↗</a>
</section>
</main>
<footer className="rela-footer"><Link href="/beneficios-empresa/nueva-zelanda">← Volver a Nueva Zelanda</Link> · © 2026 MatchMyCourse</footer>
      <ExperiencesCarousel />
      <MicrositeDialogs />
    </>
  );
}
