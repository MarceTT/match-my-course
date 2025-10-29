"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import prefetchManager from "./utils/prefetchManager";
import performanceMonitor from "./utils/performanceMonitor";

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Optimizar caching - aumentar de 5min a 30min
        staleTime: 1000 * 60 * 30, // 30 minutos
        gcTime: 1000 * 60 * 60,    // 60 minutos cache
        refetchOnWindowFocus: false,
        refetchOnReconnect: 'always',
        retry: (failureCount, error: any) => {
          // No retry en errores 404
          if (error?.status === 404) return false;
          // Máximo 2 reintentos
          return failureCount < 2;
        },
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        retry: 1,
        retryDelay: 1000,
      },
    },
  }));

  // Inicializar sistemas de performance y prefetch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Registrar Service Worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            // console.log('Service Worker registered successfully:', registration);
          })
          .catch((error) => {
            // console.log('Service Worker registration failed:', error);
          });
      }
      
      // Configurar QueryClient en prefetch manager
      prefetchManager.setQueryClient(queryClient);
      
      // Iniciar prefetch de rutas prioritarias
      prefetchManager.prefetchPriorityRoutes();
      
      // Inicializar monitoreo de memory cada 30 segundos
      const memoryInterval = setInterval(() => {
        performanceMonitor.measureMemoryUsage();
      }, 30000);

      // Cleanup
      return () => {
        clearInterval(memoryInterval);
        prefetchManager.cleanup();
      };
    }
  }, [queryClient]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
