import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SchoolStat from "../components/school/SchoolStat";
import SchoolDetail from "../components/school/SchoolDetail";
import SchoolHighlights from "../components/school/SchoolHighlights";
import SchoolDescription from "../components/school/SchoolDescription";
import BookingPannel from "../components/common/BookingPannel";
import SchoolTab from "../components/school/SchoolTab";
import Certifications from "../components/school/Certifications";
import Facilities from "../components/school/Facilities";
import OptionsCertification from "../components/school/OptionsCertification";
import SchoolInclusion from "../components/school/SchoolInclusion";
import Accommodation from "../components/school/Accommodation";
import Location from "../components/school/Location";
import Testimonials from "../components/features/Testimonials/Testimonials";

const schoolImages = [
  "/images/3.png",
  "/images/1.png",
  "/images/10.png",
  "/images/4.png",
  "/images/2.png",
];

const SchoolHome = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4">
        <SchoolDetail
          images={schoolImages}
          name="Cork English Academy"
          city="Cork"
          address="10 Palmerston Park, Rathmines, Dublin 6, D06 H9X8, Irlanda"
          founded="1980"
          priceLevel={3}
        />
        <div className="mt-8">
          <SchoolStat
            nationalities={23}
            spanishSpeakers={30}
            averageAge={25}
            testimonials={4.7}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SchoolTab />
            <SchoolHighlights />
            <SchoolDescription />
            <Certifications />
            <Facilities />
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Curso elegido</h3>
              <p className="text-gray-600">
                El curso de inglés general de 25 semanas diseñado para mejorar
                tus habilidades en Speaking, Listening, Reading y Writing,
                enfocándose en la comunicación diaria y el desarrollo del
                vocabulario y la gramática. El curso se divide en módulos de 3
                meses en donde te evaluarán semanalmente. Según como te vaya,
                pueden subirte de nivel antes de tiempo.
              </p>
            </div>
            <OptionsCertification />
            <SchoolInclusion />
            <Accommodation />
            <Location />
            <Testimonials />
          </div>
          <div className="lg:col-span-1">
            <BookingPannel />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchoolHome;
