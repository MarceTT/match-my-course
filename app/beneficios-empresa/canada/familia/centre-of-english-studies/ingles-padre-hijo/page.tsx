import type { CSSProperties } from "react";

import type { Metadata, Viewport } from "next";
import Link from "next/link";

import MicrositeDialogs from "@/app/beneficios-empresa/components/MicrositeDialogs";

import "@/app/beneficios-empresa/styles/programas/irlanda_junior_emerald-cultural-institute_sandford-park-school.css";
import "@/app/beneficios-empresa/styles/programas/canada_junior_canada-junior.css";

/**
 * /beneficios-empresa/canada/familia/centre-of-english-studies/ingles-padre-hijo — ported from the published source, class for class, against its own
 * stylesheets. Re-port with `scripts/microsite/portMicrosite.py`.
 *
 * The Netlify contact form is replaced by <MicrositeDialogs />, which posts to
 * our own backend; the floating WhatsApp button is dropped because the root
 * layout already mounts one site-wide.
 */

export const metadata: Metadata = {
  title: "Inglés para Padres e Hijos en Toronto | CES Canadá",
  description:
    "Programa de inglés para padres e hijos de CES en Toronto, Canadá. Conoce las clases, alojamiento en familia y actividades. Desde CAD $6.140 por 2 semanas.",
};

export const viewport: Viewport = {
  themeColor: "#4863f5",
};

export default function miliaCentreOfEnglishStudiesInglesPadreHijoPage() {
  return (
    <div className="canada-junior-page">
      <header className="navbar"><Link className="logo" href="/beneficios-empresa"><img alt="MatchMyCourse" src="/beneficios-empresa/assets/logo.png" /></Link><Link className="back" href="/beneficios-empresa/canada#campamentos-experiencias">← Volver a Canadá</Link></header>
<main><section className="hero" data-hero-photo="" style={{'--hero-image': 'url(\'/beneficios-empresa/canada/junior/media/portada-padre-hijo.webp\')'} as CSSProperties}><div className="hero-overlay"></div><div className="hero-copy"><nav aria-label="Ruta de navegación" className="breadcrumb"><Link href="/beneficios-empresa/canada">Canadá</Link><span aria-hidden="true">/</span><span>Programas familiares</span><span aria-hidden="true">/</span><span>Inglés para padres e hijos</span></nav><span className="eyebrow">PROGRAMAS FAMILIARES · CANADÁ</span><h1>Curso de inglés para padres e hijos en Toronto, Canadá</h1><p>Vive una experiencia educativa con tu hijo en Toronto, Canadá. Conoce el programa de inglés para padres e hijos de Centre of English Studies (CES).</p><a className="action" href="#programas">Conoce el programa ↓</a></div></section>
<section className="wrap intro" id="programas"><div><span className="kicker">INGLÉS PADRE E HIJO</span><h2>Inglés en Toronto para padres e hijos: una experiencia en familia</h2><p>Conoce el programa familiar de Centre of English Studies (CES) en Toronto: clases de inglés, alojamiento en familia anfitriona y actividades para compartir una experiencia educativa en Canadá.</p></div></section>
<section aria-label="Alternativas por ciudad" className="wrap program-list"><article className="program-card" data-jr-program="familia" id="toronto">
<div className="program-card-top"><div aria-label="Programa padre e hijo en Toronto" className="program-card-photo has-image" role="img" style={{'--card-photo': 'url(\'/beneficios-empresa/canada/junior/media/padre-hijo-toronto.webp\')', backgroundPosition: 'center center'} as CSSProperties}></div><div className="program-card-content"><span className="kicker">VERANO · 28 DE JUNIO AL 13 DE AGOSTO</span><div className="program-headline"><div><h2>Inglés Padre e Hijo en Toronto</h2><p>Una experiencia de inglés para padres e hijos en Toronto. Consulta las condiciones de participación de adultos y menores.</p></div><div className="price-tag"><small>VALOR DESDE · CAD</small><strong className="jr-current-price">$6.140</strong><span>2 semanas</span></div></div><div className="programme-dates compact"><span><b>Edad de los hijos:</b> 10 a 18 años</span><span><b>Inicio:</b> 28 de junio</span><span><b>Término:</b> 13 de agosto</span></div></div></div>
<div className="jr-fact-grid"><div className="jr-fact jr-fact-0"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m2 10 10-5 10 5-10 5-10-5Z" /><path d="M6 12v5c4 3 8 3 12 0v-5" /><path d="M22 10v7" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Clases de inglés</div><strong>15 horas</strong><span>Por semana</span></div></div><div className="jr-fact jr-fact-1"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><rect height="8" rx="1" width="4" x="3" y="13" /><rect height="12" rx="1" width="4" x="10" y="9" /><rect height="17" rx="1" width="4" x="17" y="4" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Nivel de inglés</div><strong>B2 o superior</strong><span>Nivel informado para el programa</span></div></div><div className="jr-fact jr-fact-0"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 18V7m18 11V7M3 14h18v4H3zM6 14V9h6a3 3 0 0 1 3 3v2M15 12h4a2 2 0 0 1 2 2" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Alojamiento</div><strong>Homestay</strong><span>Familia anfitriona</span></div></div><div className="jr-fact jr-fact-1"><div className="jr-fact-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4 2v7a3 3 0 0 0 6 0V2M7 2v20M19 22V2c-4 2-5 7-5 12h5" /></svg></div><div className="jr-fact-text"><div className="jr-fact-label">Alimentación</div><strong>Todos los días</strong><span>3 comidas al día</span></div></div></div>
<details className="jr-accordion" open={true}><summary>Actividades y detalles del programa <span aria-hidden="true" className="jr-chevron">⌄</span></summary><div className="jr-accordion-inner"><div className="jr-detail-grid"><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 20l7-14 5 8 2-4 4 10Z" /><path d="m6 20 3-5 4 5" /></svg></div><h3>Actividades</h3><p>Actividades de lunes a viernes por la tarde y una excursión los sábados por semana.</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg></div><h3>Supervisión</h3><p>Programa con supervisión.</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg></div><h3>Traslados</h3><p>Incluidos.</p></div><div className="jr-detail"><div className="jr-detail-icon"><svg aria-hidden="true" className="jr-ico" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg></div><h3>Seguro médico</h3><p>Incluido.</p></div></div><div className="jr-contact"><a aria-label="Consultar por WhatsApp: Inglés Padre e Hijo de CES en Toronto" className="jr-contact-btn" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Ingl%C3%A9s%20Padre%20e%20Hijo%20de%20CES%20en%20Toronto%20que%20se%20cursa%20en%20Canad%C3%A1.">Solicitar información <span aria-hidden="true">→</span></a></div></div></details></article></section>
<section className="wrap closing"><div><span className="kicker">MATCHMYCOURSE</span><h2>¿Quieres conocer las condiciones de este programa?</h2><p>Podemos ayudarte a solicitar información sobre el programa disponible en Toronto antes de tomar una decisión.</p></div><a aria-label="Consultar por WhatsApp: Inglés Padre e Hijo de CES en Toronto" className="jr-contact-btn" data-whatsapp-cta="" href="https://wa.me/353831134401?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20programa%20Ingl%C3%A9s%20Padre%20e%20Hijo%20de%20CES%20en%20Toronto%20que%20se%20cursa%20en%20Canad%C3%A1.">Solicitar información →</a></section></main>
<footer>© 2026 MatchMyCourse · <Link href="/beneficios-empresa/canada">Volver a Canadá</Link></footer>
      <MicrositeDialogs />
    </div>
  );
}
