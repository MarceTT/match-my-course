import Header from "./components/common/Header";
import Hero from "./components/features/Hero/Hero";
import Features from "./components/Features";
import Footer from "./components/common/Footer";

//importar la imagen desde images
import Carousel from "./components/features/Carousel/Carousel";

import Cork from "../public/images/3.png";
import Cork2 from "../public/images/1.png";
import Dublin from "../public/images/10.png";
import Cork3 from "../public/images/4.png";
import Cork4 from "../public/images/2.png";
import Atc from "../public/images/5.png";
import Ces from "../public/images/9.png";
import Apollo from "../public/images/6.png";
import SchoolPage from "./school/page";

const schools = [
  {
    name: "Cork English Academy",
    image: Cork,
    location: "Cork",
    rating: 4.6,
    price: 290,
  },
  {
    name: "Cork English World",
    image: Cork2,
    location: "Cork",
    rating: 4.3,
    price: 190,
  },
  {
    name: "Emerald Cultural Institute",
    image: Dublin,
    location: "Dublin",
    rating: 4.9,
    price: 390,
  },
  {
    name: "University College Cork",
    image: Cork3,
    location: "Cork",
    rating: 4.7,
    price: 230,
  },
  {
    name: "Cork English College",
    image: Cork4,
    location: "Cork",
    rating: 4.5,
    price: 290,
  },
  {
    name: "ATC Language Schools",
    image: Atc,
    location: "Dublin",
    rating: 4.3,
    price: 190,
  },
  {
    name: "Centre of English Studies - CES",
    image: Ces,
    location: "Dublin",
    rating: 4.9,
    price: 390,
  },
  {
    name: "Apollo Language Centre",
    image: Apollo,
    location: "Dublin",
    rating: 4.7,
    price: 230,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Carousel />
      <Features />
      <div className="container mx-auto px-6 py-16">
        <SchoolPage />
      </div>
      <Footer />
    </div>
  );
} 
