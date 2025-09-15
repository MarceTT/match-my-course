export interface ShareButtonsProps {
  url: string;
  title: string;
  summary?: string;
  hashtags?: string[];
  via?: string;
  source?: string;
  urlLinkedin?: string;
  variant?: 'full' | 'minimal' | 'icon-only';
  platforms?: ('facebook' | 'twitter' | 'whatsapp' | 'linkedin')[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ShareButtonProps {
  platform: 'facebook' | 'twitter' | 'whatsapp' | 'linkedin';
  url: string;
  title: string;
  summary?: string;
  hashtags?: string[];
  via?: string;
  urlLinkedin?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}