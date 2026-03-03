'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SchoolDescriptionProps {
  description: string;
  maxLength?: number;
}

export default function SchoolDescription({
  description,
  maxLength = 200
}: SchoolDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Si la descripción es corta, no mostrar el botón
  const needsToggle = description.length > maxLength;

  // Texto a mostrar: completo si está expandido o es corto, truncado si no
  const displayText = !needsToggle || isExpanded
    ? description
    : `${description.slice(0, maxLength)}...`;

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
