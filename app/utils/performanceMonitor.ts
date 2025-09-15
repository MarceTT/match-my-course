"use client";

// Sistema de monitoreo de performance para medir impacto de optimizaciones
class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
    }
  }

  private initializeObservers() {
    try {
      // Observer para LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry;
        this.recordMetric('LCP', lastEntry.startTime);
        
        // Enviar a GTM si está disponible
        if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
          window.gtag('event', 'performance_lcp', {
            value: Math.round(lastEntry.startTime),
            custom_parameter: 'optimized_version'
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // Observer para FCP (First Contentful Paint)
      const fcpObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.recordMetric('FCP', entry.startTime);
            
            if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
              window.gtag('event', 'performance_fcp', {
                value: Math.round(entry.startTime),
                custom_parameter: 'optimized_version'
              });
            }
          }
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(fcpObserver);

      // Observer para CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const layoutShiftEntry = entry as any;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
        this.recordMetric('CLS', clsValue);
        
        if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
          window.gtag('event', 'performance_cls', {
            value: Math.round(clsValue * 1000),
            custom_parameter: 'optimized_version'
          });
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);

    } catch (error) {
      console.warn('Performance observers not supported:', error);
    }
  }

  // Medir tiempo de componentes React
  measureComponentRender(componentName: string, renderFunction: () => void) {
    const startTime = performance.now();
    renderFunction();
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    this.recordMetric(`component_render_${componentName}`, renderTime);
    
    // Log si el render es muy lento (>16ms para 60fps)
    if (renderTime > 16) {
      console.warn(`Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms`);
    }
    
    return renderTime;
  }

  // Medir tiempo de carga de chunks
  measureChunkLoad(chunkName: string) {
    const startTime = performance.now();
    
    return {
      end: () => {
        const loadTime = performance.now() - startTime;
        this.recordMetric(`chunk_load_${chunkName}`, loadTime);
        
        if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
          window.gtag('event', 'chunk_load_time', {
            chunk_name: chunkName,
            load_time: Math.round(loadTime),
            custom_parameter: 'code_splitting_optimization'
          });
        }
        
        return loadTime;
      }
    };
  }

  // Medir efectividad del cache
  measureCacheHit(queryKey: string, isHit: boolean) {
    const metric = `cache_${isHit ? 'hit' : 'miss'}_${queryKey}`;
    this.recordMetric(metric, isHit ? 1 : 0);
    
    if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
      window.gtag('event', 'cache_performance', {
        query_key: queryKey,
        cache_result: isHit ? 'hit' : 'miss',
        custom_parameter: 'react_query_optimization'
      });
    }
  }

  // Medir uso de memoria
  measureMemoryUsage() {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory;
      this.recordMetric('memory_used', memInfo.usedJSHeapSize);
      this.recordMetric('memory_total', memInfo.totalJSHeapSize);
      this.recordMetric('memory_limit', memInfo.jsHeapSizeLimit);
      
      // Alert si el uso de memoria es muy alto
      const memoryUsagePercent = (memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100;
      if (memoryUsagePercent > 80) {
        console.warn(`High memory usage: ${memoryUsagePercent.toFixed(1)}%`);
      }
    }
  }

  private recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }

  // Obtener estadísticas de performance
  getPerformanceReport() {
    const report: Record<string, any> = {};
    
    for (const [metricName, values] of this.metrics.entries()) {
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      const min = Math.min(...values);
      const max = Math.max(...values);
      
      report[metricName] = {
        average: Math.round(avg * 100) / 100,
        min: Math.round(min * 100) / 100,
        max: Math.round(max * 100) / 100,
        samples: values.length
      };
    }
    
    return report;
  }

  // Limpiar observers
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Singleton instance
const performanceMonitor = new PerformanceMonitor();

// Hook para uso en React
export const usePerformanceMonitor = () => {
  return {
    measureComponentRender: performanceMonitor.measureComponentRender.bind(performanceMonitor),
    measureChunkLoad: performanceMonitor.measureChunkLoad.bind(performanceMonitor),
    measureCacheHit: performanceMonitor.measureCacheHit.bind(performanceMonitor),
    measureMemoryUsage: performanceMonitor.measureMemoryUsage.bind(performanceMonitor),
    getReport: performanceMonitor.getPerformanceReport.bind(performanceMonitor)
  };
};

export default performanceMonitor;