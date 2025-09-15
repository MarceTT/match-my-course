import React from "react";
import Image from "next/image";
import Logo from "@/public/logos/matchmycourse-final-logo-white.png";
import Link from "next/link";

const EbookHeader = () => {

  return (
    <header className="py-3 lg:py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-sm relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-row items-center mt-2 sm:justify-between justify-center">
          {/* Logo */}
          <div className="header_logo">
            <Link href="/">
            <Image
              src={Logo}
              alt="Match My Course Logo"
              width={200}
              height={39}
              className="w-52 h-auto sm:w-40 md:w-48 lg:w-52"
              priority
              draggable={false}
            />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EbookHeader;