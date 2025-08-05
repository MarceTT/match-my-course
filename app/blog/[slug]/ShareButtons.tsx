"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from "react-share";

import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

import { motion } from "framer-motion";

interface ShareButtonsProps {
  url: string;
  title: string;
}

const buttonStyles =
  "rounded-full shadow-md hover:scale-105 transition-transform duration-200";

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  return (
    <div className="flex gap-3 items-center">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <FacebookShareButton url={url}>
          <FacebookIcon round size={40} />
        </FacebookShareButton>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon round size={40} />
        </TwitterShareButton>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon round size={40} />
        </WhatsappShareButton>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <LinkedinShareButton url={url} title={title}>
          <LinkedinIcon round size={40} />
        </LinkedinShareButton>
      </motion.div>
    </div>
  );
}
