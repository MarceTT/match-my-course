"use client";

import { useState } from "react";
import ContactRequestDialog from "./ContactRequestDialog";

/**
 * The "Más información" CTA on each long-duration programme card.
 *
 * In the original static page a single dialog was shared and its destination
 * was written into a hidden input on click (`data-contact-destination`). Here
 * each card owns its own button and modal state, so the destination is a prop
 * and cannot get out of sync with the card the user actually clicked.
 */
export default function ProgrammeCtaButton({ destination }: { destination: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-[22px] inline-flex w-full items-center justify-center rounded-full border-0 bg-[#4863f5] px-6 py-3.5 font-extrabold text-white shadow-[0_12px_24px_rgba(72,99,245,.22)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_28px_rgba(72,99,245,.28)] focus-visible:-translate-y-0.5 sm:w-auto"
      >
        Más información
      </button>

      <ContactRequestDialog
        destination={destination}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
