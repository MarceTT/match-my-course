import { Star, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

interface Video {
    id: string;
    title: string;
    thumbnail: string;
    rating: number;
  }


  const videos: Video[] = [
    {
      id: "1",
      title: "Permiso de estudio y trabajo de Irlanda, lo que necesitas saber",
      thumbnail: "https://www.youtube.com/shorts/jP5TMuobGno",
      rating: 4.6,
    },
    {
      id: "2",
      title: "Alojamiento en Irlanda, llegada y durante el viaje",
      thumbnail: "https://www.youtube.com/shorts/jP5TMuobGno",
      rating: 4.5,
    },
    {
      id: "3",
      title: "Metodología y enseñanza de tu curso de inglés",
      thumbnail: "https://www.youtube.com/shorts/jP5TMuobGno",
      rating: 4.5,
    },
    {
      id: "4",
      title: "Requisitos para estudiar y trabajar en Irlanda",
      thumbnail: "https://www.youtube.com/shorts/jP5TMuobGno",
      rating: 4.5,
    },
    {
      id: "5",
      title: "Ingresos y costos de vivir en Irlanda como estudiante de inglés",
      thumbnail: "https://www.youtube.com/shorts/jP5TMuobGno",
      rating: 4.6,
    },
    {
      id: "6",
      title: "¿Qué es el PPS Number y cómo obtenerlo?",
      thumbnail: "https://www.youtube.com/shorts/jP5TMuobGno",
      rating: 4.5,
    },
    {
      id: "7",
      title: "¿Cómo funciona el pago de impuestos en Irlanda?",
      thumbnail: "https://www.youtube.com/shorts/jP5TMuobGno",
      rating: 4.5,
    },
    {
      id: "8",
      title: "¿Cómo obtener el permiso de trabajo en Irlanda?",
      thumbnail: "https://www.youtube.com/shorts/jP5TMuobGno",
      rating: 4.5,
    },
    {
      id: "9",
      title: "¿Que es el PPS Number y como obtenerlo?",
      thumbnail: "https://www.youtube.com/shorts/jP5TMuobGno",
      rating: 4.5,
    },
    {
      id: "10",
      title: "¿Cómo pagar impuestos en Irlanda?",
      thumbnail: "https://www.youtube.com/shorts/jP5TMuobGno",
      rating: 4.5,
    },
    {
      id: "11",
      title: "¿Cómo obtener el permiso de trabajo en Irlanda?",
      thumbnail: "https://www.youtube.com/shorts/jP5TMuobGno",
      rating: 4.5,    
    },
    {
      id: "12",
      title: "¿Cómo pagar impuestos en Irlanda?",
      thumbnail: "https://www.youtube.com/shorts/jP5TMuobGno",
      rating: 4.5,    
    },
  
  ];


  function getYouTubeVideoId(url: string): string | null {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*shorts\/))([^?&/]+)/);
    return match ? match[1] : null;
  }
  
  function VideoCard({ video }: { video: Video }) {
    const videoId = getYouTubeVideoId(video.thumbnail);
    const [imageError, setImageError] = useState(false);
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "/placeholder.svg";
  
    return (
      <Card className="overflow-hidden bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
        <CardContent className="p-0">
          <Link href={`/servicios/${videoId}`} className="block relative aspect-video group">
            <Image src={imageError ? "/placeholder.svg" : thumbnailUrl} alt={video.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" width={640} height={480} onError={() => setImageError(true)} />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
            </div>
          </Link>
          <div className="p-3">
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium mr-1">{video.rating.toFixed(1)}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(video.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
                ))}
              </div>
            </div>
            <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem] mb-2">{video.title}</h3>
            <div className="inline-block bg-yellow-400 text-xs font-semibold px-3 py-1 rounded-full text-black">Gratis</div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  export default function VideoList() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    );
  }



