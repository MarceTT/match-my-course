interface VideoPlayerProps {
  embed: string;
}

export function VideoPlayer({ embed }: VideoPlayerProps) {
  return (
    <iframe
      className="w-full h-full rounded-xl"
      src={`${embed}?autoplay=1&mute=1`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
