import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import School from "./components/School";
import Footer from "./components/Footer";

//importar la imagen desde images
import Imagen from "../public/images/placeholder_img.svg";
import Carousel from "./components/Carousel";

const schools = [
  {
    name: 'Cork English Academy',
    image: Imagen,
    location: 'Cork',
    rating: 4.6,
    price: 290
  },
  {
    name: 'Cork English World',
    image: Imagen,
    location: 'Cork',
    rating: 4.3,
    price: 190
  },
  {
    name: 'Emerald Cultural Institute',
    image: Imagen,
    location: 'Dublin',
    rating: 4.9,
    price: 390
  },
  {
    name: 'University College Cork',
    image: Imagen,
    location: 'Cork',
    rating: 4.7,
    price: 230
  },
  {
    name: 'Cork English College',
    image: Imagen,
    location: 'Cork',
    rating: 4.5,
    price: 290
  },
  {
    name: 'ATC Language Schools',
    image: Imagen,
    location: 'Dublin',
    rating: 4.3,
    price: 190
  },
  {
    name: 'Centre of English Studies - CES',
    image: Imagen,
    location: 'Dublin',
    rating: 4.9,
    price: 390
  },
  {
    name: 'Apollo Language Centre',
    image: Imagen,
    location: 'Dublin',
    rating: 4.7,
    price: 230
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Carousel />
      <Features />
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {schools.map((school, i) => (
            <School key={i} {...school} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
