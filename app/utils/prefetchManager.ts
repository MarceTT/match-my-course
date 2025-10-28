"use client";

import { QueryClient } from "@tanstack/react-query";

// Tipos para el sistema de prefetch
interface PrefetchConfig {
  enabled: boolean;
  priorityRoutes: string[];
  maxPrefetchPerSession: number;
  prefetchOnHover: boolean;
  prefetchOnIdle: boolean;
  networkThreshold: 'slow' | 'fast' | 'auto';
}

interface PrefetchMetrics {
  prefetchCount: number;
  hitRate: number;
  lastPrefetchTime: number;
  sessionStartTime: number;
  prefetchRate?: number;
}

class PrefetchManager {
  private config: PrefetchConfig;
  private metrics: PrefetchMetrics;
  private prefetchedRoutes: Set<string> = new Set();
  private hoverTimeouts: Map<string, number> = new Map();
  private queryClient: QueryClient | null = null;
  private intersectionObserver: IntersectionObserver | null = null;

  constructor() {
    this.config = {
      enabled: true,
      priorityRoutes: [
        // Landing pages (highest priority)
        '/estudiar-ingles-irlanda',
        '/estudiar-ingles-nueva-zelanda',
        '/irlanda',
        '/nueva-zelanda',

        // Core pages
        '/cursos-ingles-extranjero',
        '/servicios-matchmycourse',
        '/como-funciona-matchmycourse',
        '/quienes-somos',
        '/escuelas-socias',
        '/contacto',

        // Blog and search
        '/blog',
        '/school-search',

        // Secondary pages
        '/testimonios',
        '/mision-vision-matchmycourse'
      ],
      maxPrefetchPerSession: 30,
      prefetchOnHover: true,
      prefetchOnIdle: true,
      networkThreshold: 'auto'
    };

    this.metrics = {
      prefetchCount: 0,
      hitRate: 0,
      lastPrefetchTime: 0,
      sessionStartTime: Date.now()
    };

    if (typeof window !== 'undefined') {
      this.initializeObservers();
      this.setupNetworkDetection();
    }
  }

  // Inicializar observadores
  private initializeObservers() {
    // Intersection Observer para prefetch cuando elementos son visibles
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLAnchorElement) {
            const href = entry.target.href;
            if (this.shouldPrefetch(href)) {
              this.scheduleIdlePrefetch(href);
            }
          }
        });
      },
      {
        rootMargin: '200px', // Prefetch cuando esté a 200px de ser visible
        threshold: 0.1
      }
    );

    // Observar todos los links existentes
    this.observeLinks();

    // Observar nuevos links agregados dinámicamente
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const links = element.querySelectorAll('a[href^="/"]');
            links.forEach((link) => {
              this.intersectionObserver?.observe(link);
            });
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Observar links para prefetch
  private observeLinks() {
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach((link) => {
      this.intersectionObserver?.observe(link);
      
      // Agregar event listeners para hover si está habilitado
      if (this.config.prefetchOnHover) {
        link.addEventListener('mouseenter', this.handleLinkHover.bind(this));
        link.addEventListener('mouseleave', this.handleLinkLeave.bind(this));
      }
    });
  }

  // Manejar hover sobre links
  private handleLinkHover(event: Event) {
    const target = event.target as HTMLAnchorElement;
    const href = target.href;

    if (!this.shouldPrefetch(href)) return;

    // Delay para evitar prefetch en hovers accidentales
    const timeoutId = window.setTimeout(() => {
      this.prefetchRoute(href, 'hover');
    }, 150);

    this.hoverTimeouts.set(href, timeoutId);
  }

  // Manejar cuando se sale del hover
  private handleLinkLeave(event: Event) {
    const target = event.target as HTMLAnchorElement;
    const href = target.href;
    
    const timeoutId = this.hoverTimeouts.get(href);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.hoverTimeouts.delete(href);
    }
  }

  // Configurar detección de red
  private setupNetworkDetection() {
    // Detectar tipo de conexión
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const updateNetworkThreshold = () => {
        if (connection.effectiveType === '4g' || connection.effectiveType === '3g') {
          this.config.networkThreshold = 'fast';
        } else {
          this.config.networkThreshold = 'slow';
        }
      };

      updateNetworkThreshold();
      connection.addEventListener('change', updateNetworkThreshold);
    }

    // Ajustar prefetch basado en data saver
    if ('connection' in navigator && (navigator as any).connection.saveData) {
      this.config.enabled = false;
    }
  }

  // Verificar si se debe hacer prefetch de una ruta
  private shouldPrefetch(url: string): boolean {
    if (!this.config.enabled) return false;
    if (this.metrics.prefetchCount >= this.config.maxPrefetchPerSession) return false;
    if (this.prefetchedRoutes.has(url)) return false;

    // Verificar conexión de red
    if (this.config.networkThreshold === 'slow') return false;

    // Verificar que sea una ruta interna
    try {
      const urlObj = new URL(url);
      if (urlObj.origin !== window.location.origin) return false;
    } catch {
      return false;
    }

    return true;
  }

  // Prefetch durante tiempo idle
  private scheduleIdlePrefetch(url: string) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.prefetchRoute(url, 'idle');
      }, { timeout: 2000 });
    } else {
      setTimeout(() => {
        this.prefetchRoute(url, 'idle');
      }, 100);
    }
  }

  // Ejecutar prefetch de una ruta
  public async prefetchRoute(url: string, trigger: 'hover' | 'idle' | 'priority'): Promise<void> {
    if (!this.shouldPrefetch(url)) return;

    try {
      this.prefetchedRoutes.add(url);
      this.metrics.prefetchCount++;
      this.metrics.lastPrefetchTime = Date.now();

      // Prefetch de la página
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = 'document';
      document.head.appendChild(link);

      // Si es una página de escuela, prefetch los datos también
      if (url.includes('/cursos/') && url.includes('/escuelas/')) {
        await this.prefetchSchoolData(url);
      }

      // Tracking para analytics
      if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
        window.gtag('event', 'prefetch_executed', {
          url: url,
          trigger: trigger,
          prefetch_count: this.metrics.prefetchCount
        });
      }

      console.log(`[PrefetchManager] Prefetched ${url} (trigger: ${trigger})`);

    } catch (error) {
      console.error(`[PrefetchManager] Failed to prefetch ${url}:`, error);
      this.prefetchedRoutes.delete(url);
      this.metrics.prefetchCount--;
    }
  }

  // Prefetch específico para datos de escuela
  private async prefetchSchoolData(url: string): Promise<void> {
    if (!this.queryClient) return;

    // Extraer schoolId de la URL
    const match = url.match(/\/escuelas\/[^\/]+\/([^\/\?]+)/);
    if (!match) return;

    const schoolId = match[1];

    try {
      // Prefetch datos de la escuela
      await this.queryClient.prefetchQuery({
        queryKey: ['school', schoolId],
        queryFn: async () => {
          const response = await fetch(`/api/schools/${schoolId}`);
          if (!response.ok) throw new Error('Failed to fetch school');
          return response.json();
        },
        staleTime: 1000 * 60 * 30, // 30 minutos
      });

      console.log(`[PrefetchManager] Prefetched school data for ${schoolId}`);
    } catch (error) {
      console.error(`[PrefetchManager] Failed to prefetch school data:`, error);
    }
  }

  // Configurar QueryClient para prefetch de datos
  public setQueryClient(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  // Prefetch rutas prioritarias al cargar la aplicación
  public async prefetchPriorityRoutes(): Promise<void> {
    // Esperar a que la página se cargue completamente
    if (document.readyState !== 'complete') {
      await new Promise(resolve => {
        window.addEventListener('load', resolve, { once: true });
      });
    }

    // Prefetch rutas prioritarias con delay
    for (const route of this.config.priorityRoutes) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Spacing entre prefetches
      await this.prefetchRoute(route, 'priority');
    }
  }

  // Obtener métricas de performance
  public getMetrics(): PrefetchMetrics & { prefetchedRoutes: string[] } {
    const sessionDuration = Date.now() - this.metrics.sessionStartTime;
    const prefetchRate = this.metrics.prefetchCount / (sessionDuration / 60000); // per minute

    return {
      ...this.metrics,
      hitRate: this.calculateHitRate(),
      prefetchedRoutes: Array.from(this.prefetchedRoutes),
      prefetchRate
    };
  }

  // Calcular hit rate
  private calculateHitRate(): number {
    const navigationEntries = performance.getEntriesByType('navigation');
    const resourceEntries = performance.getEntriesByType('resource');
    
    const prefetchedResources = resourceEntries.filter(entry => 
      this.prefetchedRoutes.has(entry.name)
    );

    return prefetchedResources.length > 0 ? 
      prefetchedResources.length / this.metrics.prefetchCount : 0;
  }

  // Limpiar recursos
  public cleanup(): void {
    this.intersectionObserver?.disconnect();
    this.hoverTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.hoverTimeouts.clear();
  }

  // Configurar opciones
  public configure(newConfig: Partial<PrefetchConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// Singleton instance
const prefetchManager = new PrefetchManager();

// Hook para usar en React components
export const usePrefetchManager = () => {
  return {
    prefetchRoute: (url: string) => prefetchManager.prefetchRoute(url, 'priority'),
    getMetrics: () => prefetchManager.getMetrics(),
    configure: (config: Partial<PrefetchConfig>) => prefetchManager.configure(config),
  };
};

export default prefetchManager;