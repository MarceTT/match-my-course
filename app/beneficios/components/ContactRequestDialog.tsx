"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/**
 * Contact modal for the /beneficios landing.
 *
 * Ported from the original static page, which submitted to Netlify Forms via
 * `fetch('/')`. That only works on Netlify: here the same markup would POST to
 * the Next.js root and silently lose every lead. This version posts to the
 * existing backend email endpoint instead.
 *
 * Field mapping onto `POST /email` (`sendEmail`), which already carries a rate
 * limiter. Nothing is dropped — `empresa`, the whole point of a corporate
 * benefits form, travels in `details`:
 *   firstName ← nombre      lastName ← apellido
 *   email     ← email       phone    ← telefono
 *   reason    ← "Beneficios corporativos"
 *   details   ← "Empresa: … · Destino: …"
 */

const BENEFICIOS_REASON = "Beneficios corporativos";

const requestSchema = z.object({
  nombre: z.string().trim().min(1, "Ingresa tu nombre").max(100),
  apellido: z.string().trim().min(1, "Ingresa tu apellido").max(100),
  email: z
    .string()
    .trim()
    .min(1, "Ingresa tu correo electrónico")
    .max(180)
    .email("Ingresa un correo electrónico válido"),
  telefono: z.string().trim().min(1, "Ingresa tu número de teléfono").max(35),
  empresa: z.string().trim().min(1, "Ingresa la empresa a la que perteneces").max(180),
});

type RequestValues = z.infer<typeof requestSchema>;

interface ContactRequestDialogProps {
  /** Destination shown in the copy and sent with the lead, e.g. "Irlanda". */
  destination: string;
  open: boolean;
  onClose: () => void;
}

const FIELD_CLASS =
  "mt-1.5 block w-full min-w-0 rounded-[10px] border border-[#cdd5e7] bg-white px-[13px] py-3 text-[15px] text-[#171c2d] outline-offset-2 focus:border-[#4863f5] focus:outline focus:outline-2 focus:outline-[#dce4ff]";
const LABEL_CLASS = "block text-[13px] font-bold leading-[1.5] text-[#30394f]";

export default function ContactRequestDialog({
  destination,
  open,
  onClose,
}: ContactRequestDialogProps) {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestValues>({
    resolver: zodResolver(requestSchema),
    mode: "onSubmit",
  });

  if (!open) return null;

  const onSubmit = async (values: RequestValues) => {
    setFailed(false);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.nombre,
          lastName: values.apellido,
          email: values.email,
          phone: values.telefono,
          reason: BENEFICIOS_REASON,
          details: `Empresa: ${values.empresa} · Destino: ${destination}`,
          message:
            `Solicitud de información sobre programas de larga duración en ${destination}. ` +
            `Empresa: ${values.empresa}.`,
          acceptPolicy: "true",
          acceptTerms: "true",
        }),
      });

      if (!response.ok) throw new Error("No se pudo registrar la solicitud.");
      setSent(true);
    } catch {
      setFailed(true);
    }
  };

  const handleClose = () => {
    setSent(false);
    setFailed(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,27,51,.62)] p-4 backdrop-blur-[3px]"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="max-h-[min(92vh,850px)] w-[min(94vw,560px)] overflow-y-auto rounded-[22px] bg-white px-[18px] py-6 text-[#171c2d] shadow-[0_24px_90px_#111b3570] sm:px-8 sm:pb-8 sm:pt-[30px]"
      >
        <div className="flex items-start justify-between gap-[18px]">
          <div>
            <p className="m-0 mb-2 text-[11px] font-extrabold tracking-[.14em] text-[#4863f5]">
              MATCHMYCOURSE
            </p>
            <h2
              id="contact-title"
              className="m-0 text-[clamp(24px,3vw,30px)] font-bold leading-[1.15] tracking-[-.04em]"
            >
              Solicita más información
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar formulario"
            className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full border-0 bg-[#f0f3fa] text-[26px] leading-none text-[#4d5670]"
          >
            ×
          </button>
        </div>

        {sent ? (
          <div className="pt-[18px] text-center" role="status">
            <h3 className="m-0 mb-2.5 text-[25px] font-bold">Solicitud enviada</h3>
            <p className="m-0 mb-6 leading-[1.6] text-[#57617a]">
              Gracias por contactarnos. Hemos recibido tus datos y pronto nos
              comunicaremos contigo.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="min-h-[49px] w-full rounded-xl border-0 bg-[#4863f5] px-[22px] py-3 font-extrabold text-white"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <p className="mb-[23px] mt-4 text-[15px] leading-[1.55] text-[#57617a]">
              Déjanos tus datos y te contactaremos sobre nuestros programas de larga
              duración en <strong>{destination}</strong>.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <label className={LABEL_CLASS}>
                  Nombre
                  <input
                    {...register("nombre")}
                    autoComplete="given-name"
                    maxLength={100}
                    className={FIELD_CLASS}
                  />
                  {errors.nombre && (
                    <span className="mt-1 block text-[12px] font-normal text-[#b42318]">
                      {errors.nombre.message}
                    </span>
                  )}
                </label>

                <label className={LABEL_CLASS}>
                  Apellido
                  <input
                    {...register("apellido")}
                    autoComplete="family-name"
                    maxLength={100}
                    className={FIELD_CLASS}
                  />
                  {errors.apellido && (
                    <span className="mt-1 block text-[12px] font-normal text-[#b42318]">
                      {errors.apellido.message}
                    </span>
                  )}
                </label>

                <label className={`${LABEL_CLASS} sm:col-span-2`}>
                  Correo electrónico
                  <input
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    maxLength={180}
                    placeholder="ejemplo@empresa.com"
                    className={FIELD_CLASS}
                  />
                  {errors.email && (
                    <span className="mt-1 block text-[12px] font-normal text-[#b42318]">
                      {errors.email.message}
                    </span>
                  )}
                </label>

                <label className={`${LABEL_CLASS} sm:col-span-2`}>
                  Número de teléfono
                  <input
                    {...register("telefono")}
                    type="tel"
                    autoComplete="tel"
                    maxLength={35}
                    placeholder="+56 9 1234 5678"
                    className={FIELD_CLASS}
                  />
                  {errors.telefono && (
                    <span className="mt-1 block text-[12px] font-normal text-[#b42318]">
                      {errors.telefono.message}
                    </span>
                  )}
                </label>

                <label className={`${LABEL_CLASS} sm:col-span-2`}>
                  Empresa a la que perteneces
                  <input
                    {...register("empresa")}
                    autoComplete="organization"
                    maxLength={180}
                    className={FIELD_CLASS}
                  />
                  {errors.empresa && (
                    <span className="mt-1 block text-[12px] font-normal text-[#b42318]">
                      {errors.empresa.message}
                    </span>
                  )}
                </label>
              </div>

              <p className="mb-2.5 mt-[19px] text-[12px] leading-[1.55] text-[#6e778a]">
                Usaremos estos datos únicamente para responder tu solicitud de
                información.
              </p>

              {failed && (
                <p className="m-0 mb-2 text-[13px] text-[#b42318]" aria-live="polite">
                  No se pudo enviar la solicitud. Inténtalo nuevamente.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="min-h-[49px] w-full rounded-xl border-0 bg-[#4863f5] px-[22px] py-3 font-extrabold text-white disabled:cursor-wait disabled:opacity-65"
              >
                {isSubmitting ? "Enviando…" : "Enviar solicitud"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
