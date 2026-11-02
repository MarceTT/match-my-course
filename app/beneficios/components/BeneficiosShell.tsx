import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logos/final-logo.png";

import { dmSans } from "@/app/ui/fonts";

/**
 * Shared chrome for the ported benefits microsite: the six organic background
 * shapes, the centered-logo header and the one-line footer.
 *
 * These pages deliberately keep the source design (DM Sans, #4863f5) instead of
 * the site theme, so they live outside the `(landings)` route group and render
 * their own header and footer rather than the site ones.
 *
 * The decorative blobs keep `style` for their elliptical `border-radius`,
 * gradients and rotation — Tailwind has no utility for an eight-value radius —
 * while position and size stay in classes so the source's responsive overrides
 * survive.
 */
export default function BeneficiosShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${dmSans.className} relative isolate overflow-x-clip bg-white text-[#171c2d] antialiased`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-190px] top-[-150px] z-0 h-[400px] w-[510px] max-[1050px]:left-[-260px] max-[1050px]:top-[-190px] max-[620px]:left-[-205px] max-[620px]:top-[-105px] max-[620px]:h-[260px] max-[620px]:w-[260px]"
        style={{
          borderRadius: "45% 56% 73% 30% / 65% 58% 47% 40%",
          transform: "rotate(-22deg)",
          background: "linear-gradient(135deg,#91c0ff 0%,#3769f6 65%,#3159dd 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-175px] top-[30px] z-0 h-[440px] w-[380px] max-[1050px]:right-[-280px] max-[620px]:right-[-203px] max-[620px]:top-[95px] max-[620px]:h-[300px] max-[620px]:w-[240px]"
        style={{
          borderRadius: "64% 37% 51% 73% / 54% 58% 40% 63%",
          transform: "rotate(29deg)",
          background: "linear-gradient(145deg,#f5f8ff 12%,#e8efff 95%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-205px] top-[720px] z-0 h-[430px] w-[500px] max-[1050px]:left-[-300px] max-[620px]:left-[-255px] max-[620px]:top-[670px]"
        style={{
          borderRadius: "42% 58% 74% 33% / 55% 35% 70% 49%",
          transform: "rotate(28deg)",
          background: "linear-gradient(120deg,#e0eaff,#f2f6ff 85%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-190px] top-[710px] z-0 h-[510px] w-[480px] max-[1050px]:right-[-320px] max-[620px]:right-[-330px] max-[620px]:top-[1380px]"
        style={{
          borderRadius: "61% 36% 39% 72% / 43% 66% 35% 67%",
          transform: "rotate(-18deg)",
          background: "linear-gradient(155deg,#ffe78b 0%,#ffcc22 78%,#f5b900 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-100px] top-[4px] z-0 h-[340px] w-[400px] border-[3px] border-[#ffcf37] max-[1050px]:left-[-230px] max-[620px]:left-[-270px] max-[620px]:top-[15px]"
        style={{ borderRadius: "60% 40% 60% 35%", transform: "rotate(-24deg)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-125px] top-[890px] z-0 h-[270px] w-[430px] border-[3px] border-[#a6baff] max-[1050px]:right-[-250px] max-[620px]:right-[-290px] max-[620px]:top-[1560px]"
        style={{ borderRadius: "50% 60% 34% 65%", transform: "rotate(22deg)" }}
      />

      <header className="relative z-[2] flex h-[112px] items-center justify-center max-[620px]:h-[89px]">
        <Link href="/beneficios" aria-label="MatchMyCourse, ir a inicio">
          <Image
            src={Logo}
            alt="MatchMyCourse"
            priority
            className="block h-auto w-[min(295px,72vw)]"
          />
        </Link>
      </header>

      {children}

      <footer className="relative z-[2] border-t border-[#edf0f7] px-7 pb-9 pt-[30px] text-center text-[13px] text-[#81889b]">
        © 2026 MatchMyCourse ·{" "}
        <a href="mailto:info@matchmycourse.com" className="text-[#4863f5]">
          info@matchmycourse.com
        </a>
      </footer>
    </div>
  );
}
