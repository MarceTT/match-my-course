'use client'

import { useState } from "react";
import { Grid, List, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LuHeart } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";

const schoolImages = [
  "/images/3.png",
  "/images/1.png",
  "/images/10.png",
  "/images/4.png",
  "/images/2.png",
];

const schoolLogos = [
  "/schools/3.png",
  "/schools/1.png",
  "/schools/10.png",
  "/schools/4.png",
  "/schools/2.png",
];

const schools = [
  {
    name: "Emerald Cultural Institute",
    rating: 4.78,
    city: "Cork",
    age: "30 años",
    price: "€3.000",
    image: schoolImages[4],
    logo: schoolLogos[4],
  },
  {
    name: "Cork English College",
    rating: 4.78,
    city: "Cork",
    age: "30 años",
    price: "€3.000",
    image: schoolImages[3],
    logo: schoolLogos[3],
  },
  {
    name: "University College Cork",
    rating: 4.78,
    city: "Cork",
    age: "30 años",
    price: "€3.000",
    image: schoolImages[2],
    logo: schoolLogos[2],
  },
  {
    name: "Emerald Cultural Institute2",
    rating: 4.78,
    city: "Cork",
    age: "30 años",
    price: "€3.000",
    image: schoolImages[1],
    logo: schoolLogos[1],
  },
  {
    name: "Cork English College2",
    rating: 4.78,
    city: "Cork",
    age: "30 años",
    price: "€3.000",
    image: schoolImages[3],
    logo: schoolLogos[3],
  },
  {
    name: "University College Cork22",
    rating: 4.78,
    city: "Cork",
    age: "30 años",
    price: "€3.000",
    image: schoolImages[4],
    logo: schoolLogos[4],
  },
];

interface SchoolListProps {
  isFilterOpen: boolean;
}

const SchoolSearchList = ({ isFilterOpen }: SchoolListProps) => {
  const [viewType, setViewType] = useState<"grid" | "list">("list");

  return (
    <div className={`flex-1 flex flex-col h-[calc(100vh-200px)] ${isFilterOpen ? "mt-64" : "mt-0"}`}>
      <div className="hidden sm:flex justify-end space-x-2 mb-4">
        <Button variant={viewType === "list" ? "default" : "outline"} size="sm" onClick={() => setViewType("list")}>
          <List className="h-4 w-4 mr-2" />
          Lista
        </Button>
        <Button variant={viewType === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewType("grid")}>
          <Grid className="h-4 w-4 mr-2" />
          Cuadrícula
        </Button>
      </div>
      <div
        className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgb(209 213 219) transparent" }}
      >
        <div className={`grid gap-4 ${viewType === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
          {schools.map((school) => (
            <SchoolCard key={school.name} school={school} viewType={viewType} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface School {
  name: string;
  rating: number;
  city: string;
  age: string;
  price: string;
  image: string;
  logo: string;
}

interface SchoolCardProps {
  school: School;
  viewType: "grid" | "list";
}

function SchoolCard({ school, viewType }: SchoolCardProps) {
  return (
    <div className={`relative rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${viewType === "grid" ? "flex flex-col" : "flex flex-col sm:flex-row"}`}>
    <div className={`${viewType === "grid" ? "h-40 w-full" : "lg:h-64 lg:w-64 sm:w-56"} flex-shrink-0 overflow-hidden rounded-lg`}>
      <img
        src={school.image || "/placeholder.svg"}
        alt={school.name}
        className="h-full w-full object-cover"
      />
    </div>
    <div className={`flex flex-1 flex-col ${viewType === "grid" ? "mt-4" : "sm:ml-4"}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold lg:text-2xl lg:font-bold">
            {school.name}
          </h3>
          <div className="mt-1 flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(school.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {school.rating}
            </span>
          </div>
        </div>
        <div className="grid grid-rows-1 gap-2 lg:flex lg:items-center lg:gap-2 lg:mr-4">
          <Button className="bg-[#F15368] hover:bg-[#F15368]/90 rounded-full w-8 h-8 p-0">
            <LuHeart className="w-5 h-5 text-white fill-white" />
          </Button>
        </div>
      </div>
      <div className="mt-2 space-y-1 text-sm text-gray-600">
        <p className="font-bold text-lg lg:text-lg">
          Ciudad: {school.city}
        </p>
        <p className="font-bold text-lg lg:text-lg">
          Antigüedad: {school.age}
        </p>
      </div>
      <div className="mt-4 flex flex-col w-full sm:flex-row items-center justify-between">
        <Image
          src={school.logo}
          alt="Logo"
          className="h-32 w-32 object-contain mb-2 sm:mb-0"
          width={640}
          height={480}
        />
        <div className="text-center sm:text-right">
          <div className="text-xl text-gray-600 lg:text-xl">Desde</div>
          <div className="text-2xl font-semibold lg:text-2xl lg:font-bold">
            {school.price}
          </div>
          <Link href={`/school-detail`}>
            <Button
              className="mt-2 text-lg font-semibold lg:text-lg lg:font-semibold bg-[#5371FF] hover:bg-[#4257FF] text-white"
              size="lg"
            >
              Ver escuela
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}

export default SchoolSearchList;
