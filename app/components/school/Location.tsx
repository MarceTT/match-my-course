"use client"

import React from 'react'
import { BsPersonWalking } from "react-icons/bs";

const Location = () => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Ubicación</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600">
          <BsPersonWalking className="w-5 h-5" />
          <span>9 minutos caminando al centro de la ciudad</span>
        </div>

        <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.7399999999998!2d-8.4746!3d51.8968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48425a0e7d7c3a6f%3A0x77b6f9c17c6c6f7!2sCork%20English%20Academy!5e0!3m2!1sen!2sie!4v1621436289123!5m2!1sen!2sie"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`text-lg ${star <= 3.9 ? "text-yellow-400" : "text-gray-300"}`}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600">3.9</span>
          <span className="text-sm text-blue-600 hover:underline cursor-pointer">53 reviews</span>
        </div>
      </div>
    </div>
  )
}

export default Location