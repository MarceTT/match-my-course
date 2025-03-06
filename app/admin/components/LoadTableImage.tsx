import { useState } from "react";
import Image from "next/image";

interface LoadingImageProps {
  src: string;
  alt: string;
}

const LoadingImage: React.FC<LoadingImageProps> = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-20 w-20">
      {isLoading && (
        <div className="absolute inset-0 h-20 w-20 rounded-md bg-primary/10 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        width={80}
        height={80}
        className={`rounded-md transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default LoadingImage;
