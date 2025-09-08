"use client"

import { useState } from "react"

interface NavigationItem {
  id: string
  label: string
}

const navigationItems: NavigationItem[] = [
    { id: "destaca", label: "Destaca" },
    { id: "escuela", label: "Escuela" },
    { id: "certificacion", label: "Certificación" },
    { id: "instalaciones", label: "Instalaciones" },
    { id: "curso", label: "Curso" },
    { id: "alojamiento", label: "Alojamiento" },
    { id: "ubicacion", label: "Ubicación" },
    { id: "testimonio", label: "Testimonio" },
  ]

const SchoolTab = () => {
    const [activeTab, setActiveTab] = useState("escuela")

  return (
    <div className="border-b mb-6">
      <nav className="flex space-x-6">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`py-4 px-1 text-sm font-medium relative ${
              activeTab === item.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default SchoolTab