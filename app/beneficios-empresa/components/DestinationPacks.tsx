import Image from "next/image";
import Link from "next/link";

import SchoolGalleryDialog, { type GalleryPhoto } from "./SchoolGalleryDialog";

/**
 * Programme-pack page for a destination (Inglaterra, Escocia, Canadá).
 *
 * In the original these were three separate static HTML files that duplicate
 * the same markup with different copy and figures. Here it is one template:
 * the rendered output stays faithful, and a price or a wording only has to be
 * corrected in one place.
 *
 * The expandable detail uses the native `<details>`/`<summary>` elements, like
 * the original, so the page needs no client JavaScript and stays accessible.
 */

export interface PackPrice {
  /** Formatted amount as shown, e.g. "£1.567". */
  amount: string;
  /** Duration label, e.g. "2 semanas". */
  label: string;
}

export interface PackDetail {
  label: string;
  value: string;
}

export interface DestinationPack {
  /** Card cover image under /public. */
  image: string;
  imageAlt: string;
  /** Badge over the photo, e.g. "Centre of English Studies · Londres". */
  photoCaption: string;
  /** Small eyebrow, e.g. "LONDRES · INGLÉS GENERAL". */
  kicker: string;
  title: string;
  /**
   * School badge logo under /public. Optional: some schools ship no logo on
   * the source site (Mount Maunganui, for one), and the heading simply renders
   * without it rather than showing a placeholder.
   */
  logo?: string;
  logoAlt?: string;
  hours: string;
  prices: PackPrice[];
  /** Note under the price row. */
  priceNote: string;
  /** Currency caption, rendered in italics after the bullet. */
  currencyNote: string;
  details: PackDetail[];
  breakdown: {
    intro: string;
    items: string[];
    note: string;
  };
  contactHref: string;
  contactLabel: string;
  /** Optional photo gallery, shown as a button inside the expanded detail. */
  gallery?: {
    eyebrow: string;
    triggerLabel: string;
    photos: GalleryPhoto[];
  };
}

export interface DestinationPacksProps {
  overline: string;
  /** Page title; the country is highlighted in the brand colour. */
  titlePrefix: string;
  titleHighlight: string;
  intro: string;
  packsLabel: string;
  packs: DestinationPack[];
  advice: {
    overline: string;
    title: string;
    body: string;
    href: string;
    label: string;
  };
}

export default function DestinationPacks({
  overline,
  titlePrefix,
  titleHighlight,
  intro,
  packsLabel,
  packs,
  advice,
}: DestinationPacksProps) {
  return (
    <main className="relative z-[1] mx-auto max-w-[1240px] px-7 pb-[90px] max-[520px]:px-[17px] max-[520px]:pb-[55px]">
      <Link
        href="/beneficios-empresa"
        className="mb-[26px] mt-0.5 inline-block text-[13px] font-bold text-[#4863f5]"
      >
        ← Volver a los destinos
      </Link>

      <section
        aria-labelledby="page-title"
        className="mx-auto mb-1.5 max-w-[920px] px-2.5 pb-[22px] pt-5 text-center max-[520px]:pt-2.5"
      >
        <p className="m-0 text-[12px] font-extrabold tracking-[.16em] text-[#4863f5]">
          {overline}
        </p>
        <h1
          id="page-title"
          className="my-3 mb-[18px] text-[clamp(38px,5vw,66px)] font-extrabold leading-[1.08] tracking-[-.06em]"
        >
          {titlePrefix} <span className="text-[#4863f5]">{titleHighlight}</span>
        </h1>
      </section>

      <section aria-label={packsLabel}>
        <div className="mx-auto mb-8 max-w-[920px] px-2 pb-[23px] pt-3 text-center">
          <p className="mx-auto max-w-[780px] text-[18px] leading-[1.75] text-[#5f6b84]">
            {intro}
          </p>
        </div>

        <div className="grid grid-cols-2 items-start gap-6 max-[900px]:grid-cols-1">
          {packs.map((pack) => (
            <article
              key={pack.kicker}
              className="overflow-hidden rounded-[23px] border border-[#e7ebf7] bg-white shadow-[0_8px_26px_#1a2c5015] transition-[transform,box-shadow] duration-[230ms] hover:-translate-y-[3px] hover:shadow-[0_13px_32px_#1a2c5020]"
            >
              <div className="relative isolate overflow-hidden">
                <Image
                  src={pack.image}
                  alt={pack.imageAlt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="block h-[205px] w-full object-cover max-[900px]:h-[240px] max-[530px]:h-[170px]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 top-[42%] z-[1] bg-[linear-gradient(transparent,rgba(9,20,39,.69))]"
                />
                <span className="absolute bottom-[17px] left-[19px] z-[2] text-[clamp(16px,1.7vw,21px)] font-extrabold tracking-[-.025em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,.35)] max-[530px]:bottom-[13px] max-[530px]:left-4 max-[530px]:text-[17px]">
                  {pack.photoCaption}
                </span>
              </div>

              <div className="px-[23px] pb-4 pt-[22px] max-[530px]:px-4 max-[530px]:pb-3 max-[530px]:pt-[18px]">
                <div className="flex items-center justify-between gap-2.5">
                  <div className="min-w-0">
                    <p className="m-0 mb-[7px] text-[11px] font-extrabold tracking-[.10em] text-[#526cf5]">
                      {pack.kicker}
                    </p>
                    <h3 className="m-0 mb-[7px] text-[clamp(22px,2.3vw,28px)] font-extrabold leading-[1.1] tracking-[-.05em] text-[#171b2c]">
                      {pack.title}
                    </h3>
                  </div>
                  {pack.logo && (
                    <Image
                      src={pack.logo}
                      alt={pack.logoAlt ?? ""}
                      width={340}
                      height={116}
                      className="h-auto max-h-[58px] w-[34%] max-w-[170px] flex-shrink-0 rounded-xl bg-white object-contain p-0.5 max-[530px]:max-w-[100px]"
                    />
                  )}
                </div>

                <p className="my-[17px] mb-3.5 text-[clamp(17px,1.65vw,19px)] font-extrabold tracking-[-.02em] text-[#1e2b47]">
                  {pack.hours}
                </p>

                <div
                  className="grid gap-0 rounded-[17px] bg-[linear-gradient(110deg,#eaf9ef,#def8e7)] px-[3px] py-[15px]"
                  style={{
                    gridTemplateColumns: `repeat(${pack.prices.length},minmax(0,1fr))`,
                  }}
                >
                  {pack.prices.map((price, index) => (
                    <div
                      key={price.label}
                      className={`min-w-0 px-1 py-0.5 text-center ${
                        index > 0 ? "border-l border-[#bce5ca]" : ""
                      }`}
                    >
                      <strong className="block whitespace-nowrap text-[clamp(20px,2.2vw,29px)] tracking-[-.055em] text-[#108b45]">
                        {price.amount}
                      </strong>
                      <span className="whitespace-nowrap text-[clamp(14px,1.4vw,16px)] font-extrabold text-[#496458] max-[530px]:text-sm">
                        {price.label}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mx-px mb-[15px] mt-[9px] text-[13px] leading-[1.5] text-[#536078] max-[520px]:text-[12.5px]">
                  {pack.priceNote}
                </p>
                <p className="mb-[15px] mt-[5px] text-[0.88rem] leading-[1.45] text-[#59657b]">
                  • <em className="italic">{pack.currencyNote}</em>
                </p>

                <details className="group mt-4 border-t border-[#e6eaf4]">
                  <summary className="flex cursor-pointer list-none items-center justify-between pb-2 pt-4 text-[16px] font-extrabold text-[#23314f] [&::-webkit-details-marker]:hidden">
                    <span className="mr-[11px] text-[27px] font-normal leading-none text-[#4863f5]">
                      ›
                    </span>
                    Ver detalles del programa
                    <span
                      aria-hidden
                      className="ml-auto text-[24px] text-[#4863f5] transition-transform duration-200 group-open:rotate-180"
                    >
                      ⌄
                    </span>
                  </summary>

                  <div className="pb-2 pt-5">
                    <div className="grid grid-cols-2 gap-3 max-[530px]:grid-cols-1">
                      {pack.details.map((detail) => (
                        <div key={detail.label} className="rounded-[14px] bg-[#f4f6fc] p-[15px]">
                          <small className="mb-[7px] block text-[13px] font-bold text-[#73809a]">
                            {detail.label}
                          </small>
                          <strong className="block text-[15px] leading-[1.55] text-[#20283b]">
                            {detail.value}
                          </strong>
                        </div>
                      ))}
                    </div>

                    <div className="my-[18px] rounded-[14px] bg-[#f6f8ff] px-5 py-[18px] text-[15px] leading-[1.65] text-[#253047]">
                      <strong className="text-[18px]">¿Qué incluye el precio total?</strong>
                      <p className="mb-3 mt-[7px]">{pack.breakdown.intro}</p>
                      <ul className="m-0 list-disc pl-5">
                        {pack.breakdown.items.map((item) => (
                          <li key={item} className="py-[3px]">
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 text-[13px] text-[#59657b]">{pack.breakdown.note}</p>
                    </div>

                    {pack.gallery && (
                      <SchoolGalleryDialog
                        eyebrow={pack.gallery.eyebrow}
                        triggerLabel={pack.gallery.triggerLabel}
                        photos={pack.gallery.photos}
                      />
                    )}

                    <a
                      href={pack.contactHref}
                      className="block rounded-xl bg-[#4863f5] px-4 py-[15px] text-center text-[15px] font-extrabold text-white"
                    >
                      {pack.contactLabel}
                    </a>
                  </div>
                </details>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-[82px] flex items-center justify-between gap-[22px] rounded-[30px] border border-[#e7eaf9] bg-[linear-gradient(120deg,#f1f5ff,#fff9e7)] p-[39px] max-[700px]:block">
        <div>
          <p className="m-0 text-[12px] font-extrabold tracking-[.16em] text-[#4863f5]">
            {advice.overline}
          </p>
          <h2 className="my-2 text-[clamp(27px,3vw,36px)] font-bold tracking-[-.045em]">
            {advice.title}
          </h2>
          <p className="max-w-[600px] leading-[1.6] text-[#667087]">{advice.body}</p>
        </div>
        <a
          href={advice.href}
          className="whitespace-nowrap rounded-xl bg-[#4863f5] px-[21px] py-4 font-extrabold text-white hover:bg-[#334de6] max-[700px]:mt-2.5 max-[700px]:inline-block"
        >
          {advice.label}
        </a>
      </section>
    </main>
  );
}
