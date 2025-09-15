"use client";

import ShareButton from "./ShareButton";
import { ShareButtonsProps } from "./types";

export default function ShareButtons({
  url,
  title,
  summary,
  hashtags = [],
  via,
  source,
  urlLinkedin,
  variant = 'full',
  platforms = ['facebook', 'twitter', 'whatsapp', 'linkedin'],
  size = 'md',
  className = "",
}: ShareButtonsProps) {
  const getGapClass = () => {
    switch (size) {
      case 'sm': return 'gap-2';
      case 'lg': return 'gap-4';
      default: return 'gap-3';
    }
  };

  const getContainerClass = () => {
    const baseClass = `flex items-center ${getGapClass()}`;
    
    switch (variant) {
      case 'minimal':
        return `${baseClass} justify-center`;
      case 'icon-only':
        return `${baseClass} justify-start`;
      default:
        return `${baseClass}`;
    }
  };

  return (
    <div className={`${getContainerClass()} ${className}`}>
      {platforms.map((platform) => (
        <ShareButton
          key={platform}
          platform={platform}
          url={url}
          title={title}
          summary={summary}
          hashtags={hashtags}
          via={via}
          urlLinkedin={urlLinkedin}
          size={size}
        />
      ))}
    </div>
  );
}