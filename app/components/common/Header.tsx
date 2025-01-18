'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { PiUserCircleFill } from "react-icons/pi";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import Logo from "../../../public/logos/logo2.png"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 768 && isMenuOpen) {
            setIsMenuOpen(false)
          }
        }
    
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
      }, [isMenuOpen])


  return (
    <header className="w-full py-8 px-6 bg-white sticky top-0 z-50 lg:bg-opacity-40 lg:backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center text-2xl font-bold lg:ml-6">
          <Image src={Logo} alt="Logo de MatchMyCourse" className="h-12 w-auto mr-2" />
          </Link>
          <nav className="hidden md:flex items-center space-x-4 ml-12">
            <Link href="/blog" className="text-gray-600 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/servicios" className="text-gray-600 hover:text-gray-900">
              Servicios
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
        <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? (
              <IoMdClose className="h-8 w-8 text-gray-600" />
            ) : (
              <CiMenuFries className="h-8 w-8 text-gray-600" />
            )}
          </button>
          <button className="hidden md:block">
            <PiUserCircleFill className="h-8 w-8 text-black" />
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`
          md:hidden fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
            <div className="flex justify-end p-4">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="focus:outline-none"
            aria-label="Cerrar menú"
          >
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-4">
          <Link href="/blog" className="text-2xl text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>
            Blog
          </Link>
          <Link href="/servicios" className="text-2xl text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>
            Servicios
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header