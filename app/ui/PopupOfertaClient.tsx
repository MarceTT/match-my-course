"use client";

import dynamic from "next/dynamic";

// Lazy load promotional popup (no SSR needed)
const PopupOferta = dynamic(() => import("./promotional-popup"), {
  ssr: false,
  loading: () => null
});

interface PopupOfertaClientProps {
  scrollTrigger?: number;
}

export default function PopupOfertaClient({ scrollTrigger = 200 }: PopupOfertaClientProps) {
  return <PopupOferta scrollTrigger={scrollTrigger} />;
}
