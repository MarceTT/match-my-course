'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SchoolDescriptionProps {
  description: string;
  maxLength?: number;
}

export default function SchoolDescription({
  description,
  maxLength = 500  // Increased from 150 to show more content for SEO
}: SchoolDescriptionProps) {
  // Start expanded for better SEO - Google sees full content on initial render
  const [isExpanded, setIsExpanded] = useState(true);

  // Si la descripción es corta, no mostrar el botón
  const needsToggle = description.length > maxLength;

  // Buscar el final de la última palabra completa antes del maxLength
  const getTruncatedText = () => {
    if (description.length <= maxLength) return description;

    const truncated = description.slice(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');

    // Si hay un espacio, cortar en la última palabra completa
    return lastSpaceIndex > 0
      ? truncated.slice(0, lastSpaceIndex) + '...'
      : truncated + '...';
  };

  // Texto a mostrar: completo si está expandido o es corto, truncado si no
  const displayText = !needsToggle || isExpanded
    ? description
    : getTruncatedText();

  return (
    <div className="space-y-3">
      <p className="text-gray-700 leading-relaxed text-base">
        {displayText}
      </p>

      {needsToggle && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Ver menos' : 'Leer más'}
        >
          {isExpanded ? (
            <>
              Ver menos
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Leer más
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
