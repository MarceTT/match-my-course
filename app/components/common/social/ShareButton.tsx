"use client";

import { motion } from "framer-motion";
import { FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from "react-share";
import { ShareButtonProps } from "./types";

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
    // Siempre intentar abrir en nueva pestaña primero
    const win = window.open(webUrl, "_blank", "noopener,noreferrer");
    // Solo navegar en la misma página si el popup fue bloqueado y no hay otra opción
    if (!win) {
      // Intentar una vez más con características de ventana específicas
      const retryWin = window.open(webUrl, "_blank", "width=600,height=400,scrollbars=yes,resizable=yes");
      if (!retryWin) {
        // Último recurso: navegar en la misma página
        window.location.href = webUrl;
      }
    }
  };

  const onHide = () => {
    if (document.hidden) {
      fallbackFired = true;
      clear();
    }
  };

  const onBlur = () => {
    fallbackFired = true;
    clear();
  };

  window.addEventListener("visibilitychange", onHide, true);
  window.addEventListener("pagehide", onHide, true);
  window.addEventListener("blur", onBlur, true);

  window.location.href = appUrl;

  setTimeout(() => {
    if (!fallbackFired) fallback();
  }, timeoutMs);
}

export default function ShareButton({
  platform,
  url,
  title,
  summary,
  hashtags = [],
  via,
  urlLinkedin,
  size = 'md',
  className = "",
}: ShareButtonProps) {
  const getSizeValue = () => {
    switch (size) {
      case 'sm': return 32;
      case 'lg': return 48;
      default: return 40;
    }
  };

  const sizeValue = getSizeValue();

  const handleShare = async () => {
    switch (platform) {
      case 'facebook': {
        if (await tryWebShare(title, summary, url)) return;
        const web = `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;
        const app = `fb://facewebmodal/f?href=${enc(web)}`;
        const timeout = isIOS() ? 1200 : isAndroid() ? 700 : 800;
        openAppThenMaybeWeb(app, web, timeout);
        break;
      }
      case 'twitter': {
        if (await tryWebShare(title, summary, url)) return;
        const hashtagsStr = hashtags.length ? ` ${hashtags.map((h) => `#${h}`).join(" ")}` : "";
        const tweetText = `${title}${hashtagsStr} ${url}${via ? ` via @${via}` : ""}`;
        const web = `https://twitter.com/intent/tweet?text=${enc(tweetText)}`;
        const app = `twitter://post?message=${enc(tweetText)}`;
        const timeout = isIOS() ? 1000 : 700;
        openAppThenMaybeWeb(app, web, timeout);
        break;
      }
      case 'whatsapp': {
        if (await tryWebShare(title, summary, url)) return;
        const waText = summary ? `${title} — ${summary} ${url}` : `${title} ${url}`;
        const web = `https://api.whatsapp.com/send?text=${enc(waText)}`;
        const app = `whatsapp://send?text=${enc(waText)}`;
        const timeout = isIOS() ? 900 : 500;
        openAppThenMaybeWeb(app, web, timeout);
        break;
      }
      case 'linkedin': {
        if (await tryWebShare(title, summary, url)) return;
        const liUrl = urlLinkedin || url;
        const web = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(liUrl)}`;
        // Intentar abrir en nueva pestaña primero
        const win = window.open(web, "_blank", "noopener,noreferrer");
        if (!win) {
          // Segundo intento con características específicas
          const retryWin = window.open(web, "_blank", "width=600,height=400,scrollbars=yes,resizable=yes");
          if (!retryWin) {
            // Último recurso: navegar en la misma página
            window.location.href = web;
          }
        }
        break;
      }
    }
  };

  const getIcon = () => {
    switch (platform) {
      case 'facebook':
        return <FacebookIcon round size={sizeValue} />;
      case 'twitter':
        return <TwitterIcon round size={sizeValue} />;
      case 'whatsapp':
        return <WhatsappIcon round size={sizeValue} />;
      case 'linkedin':
        return <LinkedinIcon round size={sizeValue} />;
    }
  };

  const getAriaLabel = () => {
    switch (platform) {
      case 'facebook': return "Compartir en Facebook";
      case 'twitter': return "Compartir en X (Twitter)";
      case 'whatsapp': return "Compartir en WhatsApp";
      case 'linkedin': return "Compartir en LinkedIn";
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleShare}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={getAriaLabel()}
      className={`rounded-full ${className}`}
    >
      {getIcon()}
    </motion.button>
  );
}