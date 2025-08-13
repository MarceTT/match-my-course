"use client";

import { motion } from "framer-motion";
import { FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from "react-share";

type Props = {
  url: string;
  title: string;
  summary?: string;
  hashtags?: string[];
  via?: string;
  source?: string;
  urlLinkedin?: string;
};

const enc = encodeURIComponent;

const isIOS = () =>
  typeof navigator !== "undefined" &&
  /iphone|ipad|ipod/i.test(navigator.userAgent);

const isAndroid = () =>
  typeof navigator !== "undefined" &&
  /android/i.test(navigator.userAgent);

const tryWebShare = async (title?: string, text?: string, url?: string) => {
  try {
    if (navigator.share) {
      await navigator.share({ title, text, url });
      return true;
    }
  } catch {
    // user cancelled or not available
  }
  return false;
};

// Intenta abrir la app. Si la página NO se oculta (no app abierta), hace fallback web.
// Evita “doble apertura” cancelando el fallback cuando hay visibilitychange/pagehide.
function openAppThenMaybeWeb(appUrl: string, webUrl: string, timeoutMs: number) {
  let fallbackFired = false;

  const clear = () => {
    window.removeEventListener("visibilitychange", onHide, true);
    window.removeEventListener("pagehide", onHide, true);
    window.removeEventListener("blur", onBlur, true);
  };

  const fallback = () => {
    if (fallbackFired) return;
    fallbackFired = true;
    clear();
    // Abrimos en nueva pestaña; si el navegador bloquea, navegamos en la misma
    const win = window.open(webUrl, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = webUrl;
  };

  const onHide = () => {
    // Si la app se abrió, la página suele ir a background => cancelamos fallback
    if (document.hidden) {
      fallbackFired = true;
      clear();
    }
  };

  const onBlur = () => {
    // Algunos navegadores no disparan hidden pero sí blur
    fallbackFired = true;
    clear();
  };

  window.addEventListener("visibilitychange", onHide, true);
  window.addEventListener("pagehide", onHide, true);
  window.addEventListener("blur", onBlur, true);

  // Lanzamos deep link
  window.location.href = appUrl;

  // Solo si seguimos en foreground pasado el timeout, abrimos web
  setTimeout(() => {
    if (!fallbackFired) fallback();
  }, timeoutMs);
}

export default function ShareButtons({
  url,
  title,
  summary,
  hashtags = [],
  via,
  source,
  urlLinkedin,
}: Props) {
  // --- Facebook ---
  const onShareFacebook = async () => {
    // 1) Web Share API (mejor UX en mobile)
    if (await tryWebShare(title, summary, url)) return;

    // 2) Deep link con fallback inteligente
    const web = `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;
    // fb suele requerir un wrapper con el sharer
    const app = `fb://facewebmodal/f?href=${enc(web)}`;

    const timeout = isIOS() ? 1200 : isAndroid() ? 700 : 800;
    openAppThenMaybeWeb(app, web, timeout);
  };

  // --- Twitter/X ---
  const hashtagsStr = hashtags.length ? ` ${hashtags.map((h) => `#${h}`).join(" ")}` : "";
  const tweetText = `${title}${hashtagsStr} ${url}${via ? ` via @${via}` : ""}`;

  const onShareTwitter = async () => {
    if (await tryWebShare(title, summary, url)) return;

    const web = `https://twitter.com/intent/tweet?text=${enc(tweetText)}`;
    const app = `twitter://post?message=${enc(tweetText)}`;

    const timeout = isIOS() ? 1000 : 700;
    openAppThenMaybeWeb(app, web, timeout);
  };

  // --- WhatsApp ---
  const waText = summary ? `${title} — ${summary} ${url}` : `${title} ${url}`;

  const onShareWhatsApp = async () => {
    if (await tryWebShare(title, summary, url)) return;

    const web = `https://api.whatsapp.com/send?text=${enc(waText)}`;
    const app = `whatsapp://send?text=${enc(waText)}`;

    const timeout = isIOS() ? 900 : 500;
    openAppThenMaybeWeb(app, web, timeout);
  };

  // --- LinkedIn ---
  // LinkedIn deep link es inestable; preferimos Web Share API y, si no, sharer web.
  const onShareLinkedIn = async () => {
    if (await tryWebShare(title, summary, url)) return;
    const liUrl = urlLinkedin || url;
    const web = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(liUrl)}`;
    const win = window.open(web, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = web;
  };

  return (
    <div className="flex gap-3 items-center">
      <motion.button
        type="button"
        onClick={onShareFacebook}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Compartir en Facebook"
        className="rounded-full"
      >
        <FacebookIcon round size={40} />
      </motion.button>

      <motion.button
        type="button"
        onClick={onShareTwitter}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Compartir en X (Twitter)"
        className="rounded-full"
      >
        <TwitterIcon round size={40} />
      </motion.button>

      <motion.button
        type="button"
        onClick={onShareWhatsApp}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Compartir en WhatsApp"
        className="rounded-full"
      >
        <WhatsappIcon round size={40} />
      </motion.button>

      <motion.button
        type="button"
        onClick={onShareLinkedIn}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Compartir en LinkedIn"
        className="rounded-full"
      >
        <LinkedinIcon round size={40} />
      </motion.button>
    </div>
  );
}
