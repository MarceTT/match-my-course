"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import { motion } from "framer-motion";

type ShareButtonsProps = {
  url: string;               // URL absoluta
  title: string;             // Título del post
  summary?: string;          // Excerpt / metaDescription (LinkedIn/WhatsApp)
  hashtags?: string[];       // Sin "#", ej: ["ingles","irlanda"]
  via?: string;              // Usuario de X/Twitter (sin @)
  source?: string;           // Fuente para LinkedIn (ej: "MatchMyCourse")
};

export default function ShareButtons({
  url,
  title,
  summary,
  hashtags = [],
  via,
  source,
}: ShareButtonsProps) {
  // Facebook usa quote y un solo hashtag con '#'
  const fbHashtag = hashtags[0] ? `#${hashtags[0]}` : undefined;

  // WhatsApp: texto que acompaña
  const waTitle = summary ? `${title} — ${summary}` : title;

  return (
    <div className="flex gap-3 items-center">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <FacebookShareButton url={url} hashtag={fbHashtag}>
          <FacebookIcon round size={40} />
        </FacebookShareButton>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <TwitterShareButton url={url} title={title} hashtags={hashtags} via={via}>
          <TwitterIcon round size={40} />
        </TwitterShareButton>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <WhatsappShareButton url={url} title={waTitle} separator=" ">
          <WhatsappIcon round size={40} />
        </WhatsappShareButton>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <LinkedinShareButton url={url} title={title} summary={summary} source={source}>
          <LinkedinIcon round size={40} />
        </LinkedinShareButton>
      </motion.div>
    </div>
  );
}
