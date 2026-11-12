import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logos/final-logo.png";

import { dmSans } from "@/app/ui/fonts";
import GolfProgramTabs, {
  type GolfProgram,
} from "./GolfProgramTabs";

/**
 * Shared page for the sport-programme pages (Naas and Cork).
 *
 * These two are structurally identical on the source site — same navbar, hero,
 * school badge, two-tab programme switch, gallery and closing — and differ only
 * in content. The original ships them as two near-duplicate HTML files; here
 * they are one template and two data files.
 *
 * Unlike the destination pages, this does NOT use `BeneficiosShell`: the source
 * gives these pages their own stylesheet with a different background (#fafcfe),
 * their own navbar and footer, and a different blue (#4765ed / #4367f6).
 */

export interface GolfGalleryPhoto {
  src: string;
  alt: string;
}

export interface GolfProgrammePageProps {
  /** Small eyebrow above the headline, e.g. "CORK · IRLANDA · CORK ENGLISH COLLEGE". */
  eyebrow: string;
  /** Headline, split in two lines; the second is highlighted. */
  titleTop: string;
  titleHighlight: string;
  heroText: string;
  heroImage: string;
  heroImageAlt: string;
  heroCta: string;
  /** School badge shown beside the intro. */
  school: {
    logo: string;
    logoAlt: string;
    location: string;
  };
  introKicker: string;
  introTitle: string;
  introText: string;
  programs: GolfProgram[];
  /** Optional: Sandford Park School ships no gallery on the source site. */
  gallery?: {
    kicker: string;
    title: string;
    photos: GolfGalleryPhoto[];
    note: string;
  };
  /** Optional campus/accommodation panel, used by the junior school page. */
  campus?: {
    kicker: string;
    title: string;
    body: string;
    items: string[];
  };
  closing: {
    title: string;
    body: string;
    href: string;
    label: string;
  };
  /** Small print under the page, with the brochure disclaimer. */
  disclaimer: string;
}

const SECTION_TITLE =
  "my-4 mb-5 text-[clamp(29px,3.3vw,43px)] font-bold leading-[1.16] tracking-[-1.4px]";
const KICKER = "text-[12px] font-extrabold tracking-[2px] text-[#4765ed]";
const ACTION =
  "inline-block rounded-xl bg-[#4367f6] px-6 py-3.5 font-extrabold text-white no-underline hover:bg-[#304dc8]";

export default function GolfProgrammePage({
  eyebrow,
  titleTop,
  titleHighlight,
  heroText,
  heroImage,
  heroImageAlt,
  heroCta,
  school,
  introKicker,
  introTitle,
  introText,
  programs,
  gallery,
  campus,
  closing,
  disclaimer,
}: GolfProgrammePageProps) {
  return (
    <div
      className={`${dmSans.className} min-h-screen bg-[#fafcfe] leading-[1.6] text-[#151e34] antialiased`}
    >
      {/*
        Resets for the root layout's critical-CSS `header{...}` element rule
        (white background, shadow, sticky), which would otherwise paint a white
        bar over this page's #fafcfe background.
      */}
      <header className="relative mx-auto flex max-w-[1240px] items-center justify-between !bg-transparent px-[25px] py-[21px] !shadow-none max-[700px]:p-[17px]">
        <Link href="/beneficios-empresa">
          <Image
            src={Logo}
            alt="MatchMyCourse"
            priority
            className="h-auto w-[197px] max-[700px]:w-[155px]"
          />
        </Link>
        <Link
          href="/beneficios-empresa"
          className="text-sm font-bold text-[#59677c] no-underline"
        >
          ← Volver a programas
        </Link>
      </header>

      <main>
        <section className="relative mx-auto min-h-[560px] max-w-[1280px] overflow-hidden rounded-[26px] bg-[#175e4c] max-[700px]:min-h-[520px] max-[700px]:rounded-none">
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,29,39,.86),rgba(10,45,54,.58)_48%,rgba(9,29,39,.03))]"
          />
          <div className="relative max-w-[780px] px-16 py-24 text-white max-[700px]:px-[26px] max-[700px]:py-[75px]">
            <span className="text-[12px] font-extrabold tracking-[2px] text-[#b1f0ca]">
              {eyebrow}
            </span>
            <h1 className="my-5 text-[clamp(37px,5.4vw,68px)] font-bold leading-[1.12] tracking-[-2.7px]">
              {titleTop}
              <br />
              <em className="not-italic text-[#b4f6cf]">{titleHighlight}</em>
            </h1>
            <p className="max-w-[650px] text-[19px] leading-[1.75] max-[700px]:text-base">
              {heroText}
            </p>
            <a href="#programas" className={`mt-3 ${ACTION}`}>
              {heroCta}
            </a>
          </div>
        </section>

        <section
          id="programas"
          className="mx-auto flex max-w-[1160px] items-center justify-between gap-[46px] px-7 pb-[55px] pt-20 max-[700px]:flex-col max-[700px]:pt-[55px]"
        >
          <div className="max-w-[750px]">
            <span className={KICKER}>{introKicker}</span>
            <h2 className={SECTION_TITLE}>{introTitle}</h2>
            <p className="text-[18px] text-[#59677c]">{introText}</p>
          </div>
          <div className="min-w-[180px] text-center max-[700px]:hidden">
            <Image
              src={school.logo}
              alt={school.logoAlt}
              width={125}
              height={125}
              className="h-[125px] w-[125px] object-contain"
            />
            <span className="block text-[13px] text-[#59677c]">{school.location}</span>
          </div>
        </section>

        <section className="mx-auto max-w-[1160px] px-7">
          <GolfProgramTabs programs={programs} />
        </section>

        {campus && (
          <section className="mx-auto max-w-[1160px] px-7 pt-[55px]">
            <div className="rounded-[22px] border border-[#dde4ee] bg-white p-[34px] max-[700px]:p-[22px]">
              <span className={KICKER}>{campus.kicker}</span>
              <h2 className={SECTION_TITLE}>{campus.title}</h2>
              <p className="text-[17px] text-[#59677c]">{campus.body}</p>
              <ul className="mt-4 list-disc pl-[19px] leading-[1.9] text-[#485a72]">
                {campus.items.map((item) => (
                  <li key={item} className="mb-[7px]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {gallery && (
          <section className="mx-auto max-w-[1160px] px-7 pb-[85px] pt-[55px]">
            <span className={KICKER}>{gallery.kicker}</span>
            <h2 className={SECTION_TITLE}>{gallery.title}</h2>
            <div className="grid grid-cols-[1.3fr_1fr_1fr] grid-rows-[200px_200px] gap-[13px] max-[700px]:grid-cols-2 max-[700px]:grid-rows-[170px_170px]">
              {gallery.photos.map((photo, index) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  width={900}
                  height={600}
                  loading="lazy"
                  className={`h-full w-full rounded-2xl object-cover ${
                    index === 0 ? "row-span-2 max-[700px]:row-auto" : ""
                  }`}
                />
              ))}
            </div>
            <p className="text-[13px] text-[#69798e]">{gallery.note}</p>
          </section>
        )}

        <section className="mx-auto mb-[30px] flex max-w-[1160px] items-center justify-between gap-5 rounded-[22px] bg-[#eff3ff] p-[42px] max-[700px]:mx-[17px] max-[700px]:mb-[26px] max-[700px]:flex-col max-[700px]:p-[25px]">
          <div>
            <span className={KICKER}>MATCHMYCOURSE</span>
            <h2 className={SECTION_TITLE}>{closing.title}</h2>
            <p className="max-w-[620px] text-[#59677c]">{closing.body}</p>
          </div>
          <a href={closing.href} className={`whitespace-nowrap ${ACTION}`}>
            {closing.label}
          </a>
        </section>

        <p className="mx-auto max-w-[1160px] px-7 pb-[55px] text-[12px] text-[#69798e]">
          {disclaimer}
        </p>
      </main>

      <footer className="bg-[#eef2f8] p-[30px] text-center text-[13px] text-[#617084]">
        © 2026 MatchMyCourse · <Link href="/beneficios-empresa">Volver al inicio</Link>
      </footer>
    </div>
  );
}
