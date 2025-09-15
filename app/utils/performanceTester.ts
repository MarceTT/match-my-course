"use client";

// Sistema completo de testing de performance
interface PerformanceTest {
  name: string;
  description: string;
  execute: () => Promise<any>;
  baseline?: number;
  target?: number;
  unit: string;
}

interface TestResult {
  name: string;
  value: number;
  unit: string;
  status: 'pass' | 'fail' | 'warning';
  baseline?: number;
  target?: number;
  improvement?: string;
  timestamp: number;
}

interface PerformanceReport {
  summary: {
    totalTests: number;
    passed: number;
    failed: number;
    warnings: number;
    overallScore: number;
  };
  results: TestResult[];
  recommendations: string[];
  timestamp: number;
  duration: number;
}

class PerformanceTester {
  private tests: PerformanceTest[] = [];
  private results: TestResult[] = [];

  constructor() {
    this.initializeTests();
  }

  private initializeTests() {
    // Core Web Vitals Tests
    this.tests.push({
      name: 'First Contentful Paint (FCP)',
      description: 'Time until first content appears',
      execute: this.measureFCP,
      baseline: 2500,
      target: 1200,
      unit: 'ms'
    });

    this.tests.push({
      name: 'Largest Contentful Paint (LCP)',
      description: 'Time until largest content element loads',
      execute: this.measureLCP,
      baseline: 4200,
      target: 2100,
      unit: 'ms'
    });

    this.tests.push({
      name: 'Cumulative Layout Shift (CLS)',
      description: 'Visual stability of page loading',
      execute: this.measureCLS,
      baseline: 0.15,
      target: 0.05,
      unit: 'score'
    });

    this.tests.push({
      name: 'Time to Interactive (TTI)',
      description: 'Time until page is fully interactive',
      execute: this.measureTTI,
      baseline: 5800,
      target: 2400,
      unit: 'ms'
    });

    // Bundle Size Tests
    this.tests.push({
      name: 'Initial Bundle Size',
      description: 'Size of initial JavaScript bundle',
      execute: this.measureBundleSize,
      baseline: 1200,
      target: 480,
      unit: 'KB'
    });

    // Cache Tests
    this.tests.push({
      name: 'Cache Hit Rate',
      description: 'Percentage of requests served from cache',
      execute: this.measureCacheHitRate,
      baseline: 20,
      target: 80,
      unit: '%'
    });

    // Network Tests
    this.tests.push({
      name: 'Image Load Success Rate',
      description: 'Percentage of images that load successfully',
      execute: this.measureImageLoadSuccess,
      baseline: 85,
      target: 98,
      unit: '%'
    });

    // Prefetch Tests
    this.tests.push({
      name: 'Prefetch Effectiveness',
      description: 'Percentage of prefetched resources actually used',
      execute: this.measurePrefetchEffectiveness,
      target: 60,
      unit: '%'
    });

    // Memory Tests
    this.tests.push({
      name: 'Memory Usage',
      description: 'JavaScript heap memory usage',
      execute: this.measureMemoryUsage,
      target: 50,
      unit: 'MB'
    });

    // Navigation Tests
    this.tests.push({
      name: 'Navigation Speed',
      description: 'Time for navigation between pages',
      execute: this.measureNavigationSpeed,
      baseline: 800,
      target: 200,
      unit: 'ms'
    });
  }

  // Core Web Vitals Measurements
  private measureFCP = (): Promise<number> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(0);
        return;
      }

      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            observer.disconnect();
            resolve(entry.startTime);
            return;
          }
        }
      });

      observer.observe({ entryTypes: ['paint'] });

      // Timeout después de 10 segundos
      setTimeout(() => {
        observer.disconnect();
        resolve(10000);
      }, 10000);
    });
  };

  private measureLCP = (): Promise<number> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(0);
        return;
      }

      let lcpValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          lcpValue = entries[entries.length - 1].startTime;
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // Resolver después de 5 segundos o cuando la página se complete
      setTimeout(() => {
        observer.disconnect();
        resolve(lcpValue || 5000);
      }, 5000);
    });
  };

  private measureCLS = (): Promise<number> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(0);
        return;
      }

      let clsValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const layoutShiftEntry = entry as any;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });

      setTimeout(() => {
        observer.disconnect();
        resolve(Math.round(clsValue * 1000) / 1000);
      }, 5000);
    });
  };

  private measureTTI = (): Promise<number> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(0);
        return;
      }

      // Aproximación usando load event + network quiet period
      const startTime = performance.now();
      
      window.addEventListener('load', () => {
        // Esperar a que la red esté "quieta" (sin requests por 500ms)
        let networkQuietTimer: number;
        let lastNetworkActivity = performance.now();

        const checkNetworkQuiet = () => {
          const now = performance.now();
          if (now - lastNetworkActivity >= 500) {
            resolve(now - startTime);
          } else {
            networkQuietTimer = window.setTimeout(checkNetworkQuiet, 100);
          }
        };

        // Monitor network activity
        const observer = new PerformanceObserver(() => {
          lastNetworkActivity = performance.now();
        });

        observer.observe({ entryTypes: ['resource'] });
        checkNetworkQuiet();

        // Timeout después de 10 segundos
        setTimeout(() => {
          clearTimeout(networkQuietTimer);
          observer.disconnect();
          resolve(performance.now() - startTime);
        }, 10000);
      });
    });
  };

  // Bundle Size Test
  private measureBundleSize = async (): Promise<number> => {
    if (typeof window === 'undefined') return 0;

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    let totalSize = 0;

    for (const resource of resources) {
      if (resource.name.includes('.js') && resource.name.includes('_next')) {
        // Usar transferSize o estimación basada en duration
        totalSize += resource.transferSize || (resource.duration * 10); // Rough estimation
      }
    }

    return Math.round(totalSize / 1024); // KB
  };

  // Cache Tests
  private measureCacheHitRate = async (): Promise<number> => {
    if (typeof window === 'undefined') return 0;

    try {
      const response = await fetch('/api/performance');
      const data = await response.json();
      return Math.round(data.hitRate * 100);
    } catch {
      // Fallback usando PerformanceResourceTiming
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const cachedResources = resources.filter(r => r.transferSize === 0);
      return Math.round((cachedResources.length / resources.length) * 100);
    }
  };

  // Image Load Success Test
  private measureImageLoadSuccess = (): Promise<number> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(100);
        return;
      }

      const images = document.querySelectorAll('img');
      let loadedImages = 0;
      let failedImages = 0;
      let totalImages = images.length;

      if (totalImages === 0) {
        resolve(100);
        return;
      }

      const checkComplete = () => {
        if (loadedImages + failedImages === totalImages) {
          const successRate = (loadedImages / totalImages) * 100;
          resolve(Math.round(successRate));
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          if (img.naturalWidth > 0) {
            loadedImages++;
          } else {
            failedImages++;
          }
        } else {
          img.addEventListener('load', () => {
            loadedImages++;
            checkComplete();
          });
          img.addEventListener('error', () => {
            failedImages++;
            checkComplete();
          });
        }
      });

      checkComplete();

      // Timeout después de 5 segundos
      setTimeout(() => {
        resolve(Math.round((loadedImages / totalImages) * 100));
      }, 5000);
    });
  };

  // Prefetch Effectiveness Test
  private measurePrefetchEffectiveness = async (): Promise<number> => {
    if (typeof window === 'undefined') return 0;

    try {
      // Importar prefetch manager dinámicamente para evitar SSR issues
      const { default: prefetchManager } = await import('./prefetchManager');
      const metrics = prefetchManager.getMetrics();
      return Math.round(metrics.hitRate * 100);
    } catch {
      return 0;
    }
  };

  // Memory Usage Test
  private measureMemoryUsage = (): Promise<number> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(0);
        return;
      }

      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        const usedMB = Math.round(memInfo.usedJSHeapSize / 1024 / 1024);
        resolve(usedMB);
      } else {
        resolve(0);
      }
    });
  };

  // Navigation Speed Test
  private measureNavigationSpeed = (): Promise<number> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(0);
        return;
      }

      // Medir tiempo de navegación usando Navigation Timing API
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigationEntry) {
        const navigationTime = navigationEntry.loadEventEnd - navigationEntry.fetchStart;
        resolve(Math.round(navigationTime));
      } else {
        resolve(0);
      }
    });
  };

  // Ejecutar todas las pruebas
  public async runAllTests(): Promise<PerformanceReport> {
    console.log('🧪 [PerformanceTester] Starting performance tests...');
    const startTime = performance.now();
    this.results = [];

    for (const test of this.tests) {
      try {
        console.log(`🔬 Running: ${test.name}`);
        const value = await test.execute();
        const result = this.evaluateResult(test, value);
        this.results.push(result);
        console.log(`✅ ${test.name}: ${value}${test.unit} (${result.status})`);
      } catch (error) {
        console.error(`❌ ${test.name} failed:`, error);
        this.results.push({
          name: test.name,
          value: 0,
          unit: test.unit,
          status: 'fail',
          timestamp: Date.now()
        });
      }

      // Pequeño delay entre tests
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    const report = this.generateReport(duration);
    console.log('📊 [PerformanceTester] Tests completed!', report);
    
    return report;
  }

  // Evaluar resultado individual
  private evaluateResult(test: PerformanceTest, value: number): TestResult {
    let status: 'pass' | 'fail' | 'warning' = 'pass';
    let improvement: string | undefined;

    // Determinar status basado en target y baseline
    if (test.target !== undefined) {
      if (test.unit === '%' || test.name.includes('Rate') || test.name.includes('Success')) {
        // Para porcentajes, mayor es mejor
        status = value >= test.target ? 'pass' : value >= (test.target * 0.8) ? 'warning' : 'fail';
      } else if (test.name.includes('CLS')) {
        // Para CLS, menor es mejor
        status = value <= test.target ? 'pass' : value <= (test.target * 1.5) ? 'warning' : 'fail';
      } else {
        // Para tiempo/tamaño, menor es mejor
        status = value <= test.target ? 'pass' : value <= (test.target * 1.5) ? 'warning' : 'fail';
      }
    }

    // Calcular mejora vs baseline
    if (test.baseline !== undefined) {
      const improvementPercent = Math.round(((test.baseline - value) / test.baseline) * 100);
      improvement = `${improvementPercent > 0 ? '+' : ''}${improvementPercent}%`;
    }

    return {
      name: test.name,
      value: Math.round(value * 100) / 100,
      unit: test.unit,
      status,
      baseline: test.baseline,
      target: test.target,
      improvement,
      timestamp: Date.now()
    };
  }

  // Generar reporte completo
  private generateReport(duration: number): PerformanceReport {
    const summary = {
      totalTests: this.results.length,
      passed: this.results.filter(r => r.status === 'pass').length,
      failed: this.results.filter(r => r.status === 'fail').length,
      warnings: this.results.filter(r => r.status === 'warning').length,
      overallScore: 0
    };

    // Calcular score general (0-100)
    const passWeight = 100;
    const warningWeight = 60;
    const failWeight = 0;
    
    summary.overallScore = Math.round(
      (summary.passed * passWeight + summary.warnings * warningWeight + summary.failed * failWeight) 
      / summary.totalTests
    );

    const recommendations = this.generateRecommendations();

    return {
      summary,
      results: this.results,
      recommendations,
      timestamp: Date.now(),
      duration
    };
  }

  // Generar recomendaciones basadas en resultados
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];

    this.results.forEach(result => {
      if (result.status === 'fail') {
        switch (result.name) {
          case 'First Contentful Paint (FCP)':
            recommendations.push('🚀 Optimizar Critical CSS y reducir JavaScript bloqueante para mejorar FCP');
            break;
          case 'Largest Contentful Paint (LCP)':
            recommendations.push('🖼️ Optimizar imágenes above-the-fold y usar preload para recursos críticos');
            break;
          case 'Cumulative Layout Shift (CLS)':
            recommendations.push('📐 Especificar dimensiones de imágenes y evitar inserción dinámica de contenido');
            break;
          case 'Initial Bundle Size':
            recommendations.push('📦 Implementar code splitting más agresivo y tree shaking');
            break;
          case 'Cache Hit Rate':
            recommendations.push('🗂️ Revisar configuración del Service Worker y estrategias de cache');
            break;
          case 'Image Load Success Rate':
            recommendations.push('🖼️ Mejorar fallbacks de imágenes y configuración CDN');
            break;
        }
      } else if (result.status === 'warning') {
        recommendations.push(`⚠️ Monitorear ${result.name} - está cerca del límite objetivo`);
      }
    });

    if (recommendations.length === 0) {
      recommendations.push('🎉 ¡Excelente! Todas las métricas están dentro de los objetivos');
    }

    return recommendations;
  }

  // Obtener resultados
  public getResults(): TestResult[] {
    return this.results;
  }
}

// Hook para usar en React
export const usePerformanceTester = () => {
  const tester = new PerformanceTester();

  return {
    runTests: () => tester.runAllTests(),
    getResults: () => tester.getResults()
  };
};

export default PerformanceTester;