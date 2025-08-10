"use client";

import { motion } from "framer-motion";
// Usamos sólo los íconos de react-share (no sus botones)
import { FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from "react-share";

type Props = {
  url: string;
  title: string;
  summary?: string;
  hashtags?: string[]; // sin '#'
  via?: string;        // usuario de X/Twitter (sin @)
  source?: string;     // LinkedIn "source"
  urlLinkedin?: string; // tu URL con cache-buster para LinkedIn (opcional)
};

const isMobile = () =>
  typeof navigator !== "undefined" &&
  /android|iphone|ipad|ipod/i.test(navigator.userAgent);

const enc = encodeURIComponent;

const openWeb = (webUrl: string) => {
  // intenta nueva pestaña; si el navegador bloquea, navega en la misma
  const win = window.open(webUrl, "_blank", "noopener,noreferrer");
  if (!win) window.location.href = webUrl;
};

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
  const onShareFacebook = () => {
    const web = `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;
    if (isMobile()) {
      const app = `fb://facewebmodal/f?href=${enc(web)}`;
      // intenta app; si no existe, tras un breve delay va al sharer web
      window.location.href = app;
      setTimeout(() => openWeb(web), 800);
    } else {
      openWeb(web);
    }
  };

  // --- Twitter/X ---
  const hashtagsStr = hashtags.length ? ` ${hashtags.map(h => `#${h}`).join(" ")}` : "";
  const tweetText = `${title}${hashtagsStr} ${url}${via ? ` via @${via}` : ""}`;
  const onShareTwitter = () => {
    const web = `https://twitter.com/intent/tweet?text=${enc(tweetText)}`;
    if (isMobile()) {
      const app = `twitter://post?message=${enc(tweetText)}`;
      window.location.href = app;
      setTimeout(() => openWeb(web), 700);
    } else {
      openWeb(web);
    }
  };

  // --- WhatsApp ---
  const waText = summary ? `${title} — ${summary} ${url}` : `${title} ${url}`;
  const onShareWhatsApp = () => {
    const web = `https://api.whatsapp.com/send?text=${enc(waText)}`;
    if (isMobile()) {
      const app = `whatsapp://send?text=${enc(waText)}`;
      window.location.href = app;
      setTimeout(() => openWeb(web), 500);
    } else {
      openWeb(web);
    }
  };

  // --- LinkedIn ---
  // Intento de deep link (mejor en Android); si falla, sharer web. Usa tu urlLinkedin con ?v= para cache-buster
  const liUrl = urlLinkedin || url;
  const liText = summary || title;
  const onShareLinkedIn = () => {
    const web = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(liUrl)}`;
    if (isMobile()) {
      const app = `linkedin://shareArticle?mini=true&url=${enc(liUrl)}&title=${enc(title)}&summary=${enc(liText)}${source ? `&source=${enc(source)}` : ""}`;
      window.location.href = app;
      setTimeout(() => openWeb(web), 800);
    } else {
      openWeb(web);
    }
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
