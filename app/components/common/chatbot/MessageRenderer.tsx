import React from 'react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Clock, 
  Euro, 
  GraduationCap, 
  Star,
  Users,
  Award,
  Phone,
  CheckCircle
} from "lucide-react"
import Image from "next/image"
import { rewriteToCDN } from "@/app/utils/rewriteToCDN"

interface MessageRendererProps {
  content: string
  sender: "user" | "bot"
}

// Definir tipos para la estructura de precios
interface PriceInfo {
  price: string;
  schedule: string;
  hours: string;
}

interface SchoolPrices {
  morning: PriceInfo | null;
  afternoon: PriceInfo | null;
}

interface School {
  name: string;
  description: string;
  logo: string | null;
  mainImage: string | null;
  prices: SchoolPrices;
}

// Función para detectar si el mensaje contiene información estructurada
const detectMessageType = (content: string): 'school_list' | 'course_info' | 'pricing' | 'general' => {
  // Detectar formato completo con imágenes
  if (content.includes('**') && (content.includes('Descripción') || content.includes('Precio'))) {
    return 'school_list'
  }
  
  // Detectar formato simplificado con lista de escuelas y precios
  if (content.includes('OPCIONES ENCONTRADAS') || 
      (content.match(/\d+\.\s*[A-Za-z]/) && content.includes('AM:') && content.includes('PM:'))) {
    return 'school_list'
  }
  
  return 'general'
}

// Función CORREGIDA para parsear información de escuelas según tu API
const parseSchoolInfo = (content: string): School[] => {
  const schools: School[] = []
  
//   console.log('🔍 Full content to parse:', content) // Debug

  // Nuevo formato basado en la respuesta real de la API
  // Buscar patrón: "1. **Nombre de Escuela**" seguido de detalles
  const schoolRegex = /(\d+)\.\s*\*\*(.*?)\*\*([\s\S]*?)(?=\d+\.\s*\*\*|###|🏆|⚡|$)/g
  let match

  while ((match = schoolRegex.exec(content)) !== null) {
    const schoolNumber = match[1]
    const name = match[2].trim()
    const details = match[3]
    
//     console.log(`🏫 Processing school #${schoolNumber}: ${name}`) // Debug

    // Extraer precio - buscar "💰 Precio: €756"
    const priceMatch = details.match(/💰\s*Precio:\s*€(\d+)/i)
    const price = priceMatch ? priceMatch[1] : null
    
    // Extraer horarios - buscar "📅 Horarios: PM - 13:45 - 17:00 (L - V)"
    const scheduleMatch = details.match(/📅\s*Horarios:\s*(AM|PM)\s*-\s*(.*?)(?:\n|$)/i)
    const period = scheduleMatch ? scheduleMatch[1] : null
    const schedule = scheduleMatch ? scheduleMatch[2].trim() : null
    
    // Extraer descripción - buscar "⭐ Detalle: ..."
    const detailMatch = details.match(/⭐\s*Detalle:\s*(.*?)(?=\n|$)/i)
    const description = detailMatch ? detailMatch[1].trim() : ''

    // Extraer logo - buscar "![Logo](URL)"
    const logoMatch = details.match(/!\[Logo\]\((.*?)\)/i)
    const logo = logoMatch ? logoMatch[1] : null

    // Crear objeto de precio basado en AM/PM
    let prices: SchoolPrices = {
      morning: null,
      afternoon: null
    }

    if (price && schedule && period) {
      const priceInfo: PriceInfo = {
        price: price,
        schedule: schedule,
        hours: '15' // Default
      }

      if (period.toUpperCase() === 'AM') {
        prices.morning = priceInfo
      } else if (period.toUpperCase() === 'PM') {
        prices.afternoon = priceInfo
      }
    }

    schools.push({
      name,
      description,
      logo,
      mainImage: logo, // Usar el logo como imagen principal si no hay otra
      prices
    })
    
//     console.log(`✅ Added school: ${name}, Price: €${price}, Schedule: ${period} - ${schedule}`) // Debug
  }

  // Si no encontramos escuelas con el formato anterior, intentar formato simplificado
  if (schools.length === 0) {
//     console.log('🔄 Trying line-by-line format...') // Debug
    
    const lines = content.split('\n').filter(line => line.trim() !== '')
    let currentSchool: School | null = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Buscar inicio de escuela: "1. Nombre de Escuela" (sin asteriscos)
      const schoolMatch = line.match(/^(\d+)\.\s*(.+)$/)
      
      if (schoolMatch && !line.includes('**')) {
        // Guardar escuela anterior si existe
        if (currentSchool) {
          schools.push(currentSchool)
        }
        
        // Crear nueva escuela
        currentSchool = {
          name: schoolMatch[2].trim(),
          description: '',
          logo: null,
          mainImage: null,
          prices: {
            morning: null,
            afternoon: null
          }
        }
        
//         console.log(`🏫 Found school: ${currentSchool.name}`) // Debug
        continue
      }
      
      if (currentSchool) {
        // Buscar ciudad
        const cityMatch = line.match(/^-\s*Ciudad:\s*(.+)$/i)
        if (cityMatch) {
          continue
        }
        
        // Buscar características/descripción
        const featuresMatch = line.match(/^-\s*Características:\s*(.+)$/i)
        if (featuresMatch) {
          currentSchool.description = featuresMatch[1].trim()
          continue
        }
        
        // Buscar imagen - formato: "- Imagen: ![Babel Academy](URL)"
        const imageMatch = line.match(/^-\s*Imagen:\s*!\[.*?\]\((.*?)\)$/i)
        if (imageMatch) {
          const imageUrl = imageMatch[1].trim()
          currentSchool.mainImage = imageUrl
          currentSchool.logo = imageUrl // También como logo
//           console.log(`🖼️ Found image: ${imageUrl}`) // Debug
          continue
        }
        
        // Buscar precios AM/PM en formato "- AM: €265 (09:00-12:15)"
        const amMatch = line.match(/-\s*AM:\s*€(\d+)\s*\((.*?)\)/i)
        const pmMatch = line.match(/-\s*PM:\s*€(\d+)\s*\((.*?)\)/i)
        
        if (amMatch) {
          currentSchool.prices.morning = {
            price: amMatch[1],
            schedule: amMatch[2],
            hours: '15'
          }
//           console.log(`💰 Found AM price: €${amMatch[1]} (${amMatch[2]})`) // Debug
        }
        
        if (pmMatch) {
          currentSchool.prices.afternoon = {
            price: pmMatch[1],
            schedule: pmMatch[2],
            hours: '15'
          }
//           console.log(`💰 Found PM price: €${pmMatch[1]} (${pmMatch[2]})`) // Debug
        }
      }
    }
    
    // No olvidar la última escuela
    if (currentSchool) {
      schools.push(currentSchool)
    }
  }

//   console.log(`🎯 Total schools parsed: ${schools.length}`) // Debug
//   console.log(`📊 Schools data:`, schools) // Debug
  return schools
}

// Componente para tarjeta de escuela - MEJORADO para casos sin imágenes
const SchoolCard: React.FC<{ school: School; index: number }> = ({ school, index }) => (
  <Card className="p-0 mb-4 border border-border bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
    {/* Imagen principal - solo si existe */}
    {school.mainImage && (
      <div className="relative h-32 w-full bg-gradient-to-r from-blue-500 to-purple-600">
        <Image
          src={rewriteToCDN(school.mainImage)}
          alt={`${school.name} - Vista principal`}
          fill
          className="object-cover"
          onError={(e) => {
//             console.log('❌ Image failed to load:', school.mainImage)
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Logo superpuesto */}
        {school.logo && (
          <div className="absolute top-3 left-3 w-10 h-10 bg-white rounded-lg p-1.5 shadow-lg">
            <Image
              src={rewriteToCDN(school.logo)}
              alt={`${school.name} - Logo`}
              width={24}
              height={24}
              className="w-full h-full object-contain"
              onError={(e) => {
//                 console.log('❌ Logo failed to load:', school.logo)
              }}
            />
          </div>
        )}
        
        {/* Badge de posición */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 font-bold text-xs">
            #{index + 1}
          </Badge>
        </div>
      </div>
    )}

    <div className="p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {!school.mainImage && school.logo && (
            <div className="w-10 h-10 bg-gray-100 rounded-lg p-1.5">
              <Image
                src={rewriteToCDN(school.logo)}
                alt={`${school.name} - Logo`}
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          
          {/* Badge de posición cuando no hay imagen principal */}
          {!school.mainImage && (
            <Badge variant="secondary" className="text-xs">
              #{index + 1}
            </Badge>
          )}
          
          <div className="flex-1">
            <h3 className="font-bold text-sm text-foreground leading-tight">
              {school.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-xs font-medium">4.8</span>
              </div>
              <Badge variant="outline" className="text-xs">
                Disponible
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Descripción - solo si existe y no es genérica */}
      {school.description && school.description !== 'Información disponible al contactar' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCap className="h-3 w-3" />
            <span className="text-xs font-medium">Sobre la escuela</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pl-5">
            {school.description}
          </p>
        </div>
      )}

      {/* Precios o información de contacto */}
      <div className="space-y-3">
        <Separator />
        
        {(school.prices.morning || school.prices.afternoon) ? (
          // Mostrar precios si existen
          <>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Euro className="h-3 w-3" />
              <span className="text-xs font-medium">Horarios y precios</span>
            </div>
            
            <div className="space-y-2">
              {school.prices.morning && (
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-blue-500 text-white">
                        <Clock className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-blue-900 dark:text-blue-100">
                          Horario Matutino
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          {school.prices.morning.schedule}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-blue-900 dark:text-blue-100">
                        €{school.prices.morning.price}
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        {school.prices.morning.hours}h/sem
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {school.prices.afternoon && (
                <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-orange-500 text-white">
                        <Clock className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-orange-900 dark:text-orange-100">
                          Horario Vespertino
                        </p>
                        <p className="text-xs text-orange-700 dark:text-orange-300">
                          {school.prices.afternoon.schedule}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-orange-900 dark:text-orange-100">
                        €{school.prices.afternoon.price}
                      </p>
                      <p className="text-xs text-orange-700 dark:text-orange-300">
                        {school.prices.afternoon.hours}h/sem
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          // Mostrar información de contacto si no hay precios
          <>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-3 w-3" />
              <span className="text-xs font-medium">Información y precios</span>
            </div>
            
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-gray-500 text-white">
                  <Phone className="h-3 w-3" />
                </div>
                <div>
                  <p className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                    Consultar disponibilidad
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Contacta para horarios y precios actualizados
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>Dublín</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>Grupos reducidos</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 text-xs px-3"
        >
          Más info
        </Button>
      </div>
    </div>
  </Card>
)

// Función para extraer recomendación del bot (SIN flags problemáticos)
const extractRecommendation = (content: string) => {
  const recommendationMatch = content.match(/🏆[\s\S]*?MI RECOMENDACIÓN[\s\S]*?:([\s\S]*?)(?=⚡|$)/)
  const nextStepsMatch = content.match(/⚡[\s\S]*?PRÓXIMOS PASOS[\s\S]*?:([\s\S]*?)$/)

  return {
    recommendation: recommendationMatch ? recommendationMatch[1].trim() : null,
    nextSteps: nextStepsMatch ? nextStepsMatch[1].trim() : null
  }
}

// Componente principal MessageRenderer
export const MessageRenderer: React.FC<MessageRendererProps> = ({ content, sender }) => {
  if (sender === "user") {
    return (
      <div className="text-sm leading-relaxed whitespace-pre-wrap">
        {content}
      </div>
    )
  }

  const messageType = detectMessageType(content)

  // Si es una lista de escuelas, renderizar con formato especial
  if (messageType === 'school_list') {
    const schools = parseSchoolInfo(content)
    const { recommendation, nextSteps } = extractRecommendation(content)
    
    if (schools.length > 0) {
      return (
        <div className="space-y-4">
          {/* Header con análisis si existe */}
          {content.includes('🎯') && content.includes('ANÁLISIS') && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <div className="p-1 rounded-full bg-blue-500 text-white">
                  <Award className="h-3 w-3" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs text-blue-900 dark:text-blue-100 mb-1">
                    Análisis Personalizado
                  </h3>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    {(() => {
                      const match = content.match(/🎯[\s\S]*?ANÁLISIS[\s\S]*?:([\s\S]*?)(?=💰|OPCIONES|$)/)
                      return match ? match[1].trim() : ''
                    })()}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 mb-3">
            <Award className="h-4 w-4 text-primary" />
            <h2 className="font-semibold text-sm text-foreground">
              Escuelas recomendadas para ti
            </h2>
          </div>
          
          {schools.map((school, index) => (
            <SchoolCard key={index} school={school} index={index} />
          ))}
          
          {/* Recomendación del bot */}
          {recommendation && (
            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-2">
                <div className="p-1 rounded-full bg-green-500 text-white">
                  <CheckCircle className="h-3 w-3" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs text-green-900 dark:text-green-100 mb-1">
                    Mi Recomendación
                  </h3>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    {recommendation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Próximos pasos */}
          {nextSteps && (
            <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-start gap-2">
                <div className="p-1 rounded-full bg-purple-500 text-white">
                  <Phone className="h-3 w-3" />
                </div>
                <div className="space-y-2">
                  <div>
                    <h3 className="font-semibold text-xs text-purple-900 dark:text-purple-100 mb-1">
                      Próximos Pasos
                    </h3>
                    <p className="text-xs text-purple-700 dark:text-purple-300">
                      {nextSteps}
                    </p>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    <Badge variant="outline" className="text-xs cursor-pointer hover:bg-secondary/80">
                      📞 Llamar
                    </Badge>
                    <Badge variant="outline" className="text-xs cursor-pointer hover:bg-secondary/80">
                      💬 Chat
                    </Badge>
                    <Badge variant="outline" className="text-xs cursor-pointer hover:bg-secondary/80">
                      📧 Email
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }
  }

  // Para mensajes generales, aplicar formato mejorado
  const formattedContent = content
    .replace(/🎯|💰|🏆|⚡/g, '') // Remover emojis de secciones
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')

  return (
    <div 
      className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: `<p>${formattedContent}</p>` }}
    />
  )
}