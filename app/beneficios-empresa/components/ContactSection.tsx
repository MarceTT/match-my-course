"use client";

import { useState } from "react";

import ContactRequestDialog from "./ContactRequestDialog";

/**
 * Contact entry point for the landing.
 *
 * The source page ends with a Netlify-powered <dialog> plus a hidden form that
 * Netlify detects at deploy time. Neither works outside Netlify — the form
 * would post to the Next.js root and silently drop every lead — so the trigger
 * is reproduced here and the submission goes through `ContactRequestDialog`,
 * which posts to our own backend email endpoint.
 */
export default function ContactSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="section" id="contacto-cta">
      <div className="container center">
        <h2>Solicita más información</h2>
        <p>
          Déjanos tus datos y te contactamos para resolver tus dudas sobre los programas.
        </p>
        <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
          Solicitar información
        </button>
      </div>

      <ContactRequestDialog
        destination="Consulta general"
        open={open}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
