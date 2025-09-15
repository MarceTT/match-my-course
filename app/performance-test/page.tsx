"use client";

import React from 'react';
import PerformanceTestPanel from '@/app/components/admin/PerformanceTestPanel';

export default function PerformanceTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🚀 Performance Testing Dashboard
          </h1>
          <p className="text-gray-600">
            Centro de pruebas para medir el impacto de las optimizaciones implementadas
          </p>
        </div>
        
        <PerformanceTestPanel />
      </div>
    </div>
  );
}