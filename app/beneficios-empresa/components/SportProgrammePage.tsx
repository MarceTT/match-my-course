import Image from "next/image";
import Link from "next/link";

import { dmSans } from "@/app/ui/fonts";

/**
 * Announcement page for a sport programme (football with Valencia CF, rugby
 * with Munster Rugby).
 *
 * These are not full programme pages yet: the source states the detailed dates,
 * ages, accommodation and prices are still being prepared, and offers an email
 * instead. They are reproduced as such — a designed announcement, not an empty
 * placeholder.
 *
 * Both are identical apart from the sport, the partner and the hero image, so
 * they share this template and differ only in data.
 */

export interface SportProgrammePageProps {
  /** Eyebrow above the headline, e.g. "CORK · IRLANDA · EXPERIENCIA DEPORTIVA". */
  eyebrow: string;
  title: string;
  heroText: string;
  /** Background photo for the hero, under /public. */
  heroImage: string;
  intro: string;
  /** Explains that the detailed information is still being prepared. */
  pendingNote: string;
  contactHref: string;
  contactLabel: string;
  disclaimer: string;
  /** School and sports-entity badges shown in the side panel. */
  partners: { src: string; alt: string }[];
}

export default function SportProgrammePage({
  eyebrow,
  title,
  heroText,
  heroImage,
  intro,
  pendingNote,
  contactHref,
  contactLabel,
  disclaimer,
  partners,
}: SportProgrammePageProps) {
  return (
    <div className={`${dmSans.className} min-h-screen bg-[#f8faff] text-[#1a2744] antialiased`}>
      <main className="mx-auto mb-[70px] mt-[30px] max-w-[1130px] px-[22px]">
        <section
          className="flex min-h-[400px] items-center rounded-[28px] bg-cover bg-center p-[clamp(25px,6vw,72px)] text-white"
          style={{
            backgroundImage: `linear-gradient(90deg,rgba(7,24,48,.85),rgba(7,24,48,.1)), url('${heroImage}')`,
          }}
        >
          <div>
            <p className="text-[12px] font-extrabold tracking-[2px]">{eyebrow}</p>
            <h1 className="max-w-[740px] text-[clamp(35px,5vw,64px)] font-bold leading-[1.08]">
              {title}
            </h1>
            <p className="max-w-[620px] text-[19px] leading-[1.6]">{heroText}</p>
          </div>
        </section>

        <div className="mt-8 grid grid-cols-[1.5fr_1fr] gap-[22px] max-[720px]:grid-cols-1">
          <section className="rounded-[20px] border border-[#dae4f5] bg-white p-[30px]">
            <h2 className="text-[clamp(24px,3vw,32px)] font-bold">Conoce el programa</h2>
            <p>{intro}</p>
            <p>{pendingNote}</p>
            <a
              href={contactHref}
              className="inline-block rounded-xl bg-[#4662ed] px-[22px] py-[15px] font-bold text-white no-underline"
            >
              {contactLabel}
            </a>
            <p className="text-[15px] text-[#66738b]">{disclaimer}</p>
          </section>

          <aside className="rounded-[20px] border border-[#dae4f5] bg-white p-[30px]">
            <h2 className="text-[clamp(20px,2.4vw,26px)] font-bold">
              Escuela y entidad deportiva
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-5">
              {partners.map((partner) => (
                <Image
                  key={partner.src}
                  src={partner.src}
                  alt={partner.alt}
                  width={360}
                  height={250}
                  className="h-[125px] w-[45%] max-w-[180px] object-contain"
                />
              ))}
            </div>
          </aside>
        </div>

        <p className="mt-6">
          <Link href="/beneficios-empresa">← Volver a los programas</Link>
        </p>
      </main>
    </div>
  );
}
