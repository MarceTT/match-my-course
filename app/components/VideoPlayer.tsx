interface VideoPlayerProps {
  embed: string;
}

export function VideoPlayer({ embed }: VideoPlayerProps) {
  return (
    <iframe
      className="w-full h-full rounded-xl"
      src={`${embed}?autoplay=1&mute=1`}
      title="YouTube video player"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  );
}
