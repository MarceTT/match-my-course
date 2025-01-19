import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SchoolStat from "../components/school-component/SchoolStat";
import SchoolDetail from "../components/school-component/SchoolDetail";

const schoolImages = [
    "/images/3.png",
    "/images/1.png",
    "/images/10.png",
    "/images/4.png",
    "/images/2.png"
  ]

const SchoolHome = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="min-h-screen bg-white py-8">
      <SchoolDetail
        images={schoolImages}
        name="Cork English Academy"
        city="Cork"
        address="10 Palmerston Park, Rathmines, Dublin 6, D06 H9X8, Irlanda"
        founded="1980"
        priceLevel={3}
      />
      <div className="mt-6">
        <SchoolStat
          nationalities={23}
          spanishSpeakers={30}
          averageAge={25}
          testimonials={4.7}
        />
      </div>
      </div>
      <h1>School Home</h1>
      <Footer />
    </div>
  );
};

export default SchoolHome;
