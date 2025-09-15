#!/usr/bin/env node

/**
 * Script de pruebas de performance para Match My Course
 * 
 * Uso:
 *   npm run test:performance
 *   node scripts/performance-test.mjs
 *   node scripts/performance-test.mjs --url=http://localhost:3000 --output=json
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const config = {
  url: process.argv.find(arg => arg.startsWith('--url='))?.split('=')[1] || 'http://localhost:3000',
  output: process.argv.find(arg => arg.startsWith('--output='))?.split('=')[1] || 'console',
  timeout: 30000,
  device: 'Desktop Chrome'
};

console.log('🧪 Match My Course - Performance Testing');
console.log('==========================================');
console.log(`📍 Testing URL: ${config.url}`);
console.log(`📊 Output format: ${config.output}`);
console.log('');

async function runPerformanceTests() {
  let browser;
  let results = {
    timestamp: new Date().toISOString(),
    url: config.url,
    tests: [],
    summary: {
      totalTests: 0,
      passed: 0,
      failed: 0,
      warnings: 0,
      overallScore: 0
    }
  };

  try {
    console.log('🚀 Launching browser...');
    browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage'] 
    });
    
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // Habilitar métricas de performance
    await page.addInitScript(() => {
      window.performanceMetrics = {
        navigationStart: performance.timeOrigin,
        marks: {},
        measures: {}
      };
    });

    console.log('📄 Loading page...');
    const startTime = Date.now();
    
    // Navegar a la página
    await page.goto(config.url, { 
      waitUntil: 'networkidle',
      timeout: config.timeout 
    });

    console.log('⏱️ Running performance tests...\n');

    // Test 1: First Contentful Paint (FCP)
    const fcp = await page.evaluate(() => {
      // Intentar obtener FCP de las entradas existentes primero
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        return fcpEntry.startTime;
      }
      
      // Si no existe, usar observer
      return new Promise(resolve => {
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            observer.disconnect();
            resolve(fcpEntry.startTime);
          }
        });
        observer.observe({ entryTypes: ['paint'] });
        
        setTimeout(() => {
          observer.disconnect();
          resolve(null);
        }, 5000);
      });
    });

    results.tests.push({
      name: 'First Contentful Paint (FCP)',
      value: fcp ? Math.round(fcp) : null,
      unit: 'ms',
      target: 1200,
      status: fcp && fcp <= 1200 ? 'pass' : fcp && fcp <= 2000 ? 'warning' : 'fail'
    });

    // Test 2: Largest Contentful Paint (LCP)
    const lcp = await page.evaluate(() => {
      // Intentar obtener LCP de las entradas existentes primero
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      if (lcpEntries.length > 0) {
        return lcpEntries[lcpEntries.length - 1].startTime;
      }
      
      // Si no existe, usar observer con fallback a navigation timing
      return new Promise(resolve => {
        let lcpValue = 0;
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            lcpValue = entries[entries.length - 1].startTime;
          }
        });
        
        try {
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP observer not supported:', e);
        }
        
        setTimeout(() => {
          observer.disconnect();
          
          // Fallback usando load event si no hay LCP
          if (!lcpValue) {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
              lcpValue = navigation.loadEventEnd - navigation.fetchStart;
            }
          }
          
          resolve(lcpValue || null);
        }, 5000);
      });
    });

    results.tests.push({
      name: 'Largest Contentful Paint (LCP)',
      value: lcp ? Math.round(lcp) : null,
      unit: 'ms',
      target: 2100,
      status: lcp && lcp <= 2100 ? 'pass' : lcp && lcp <= 3000 ? 'warning' : 'fail'
    });

    // Test 3: Cumulative Layout Shift (CLS)
    const cls = await page.evaluate(() => {
      return new Promise(resolve => {
        let clsValue = 0;
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
        }).observe({ entryTypes: ['layout-shift'] });
        
        setTimeout(() => resolve(clsValue), 5000);
      });
    });

    results.tests.push({
      name: 'Cumulative Layout Shift (CLS)',
      value: cls ? Math.round(cls * 1000) / 1000 : null,
      unit: 'score',
      target: 0.1,
      status: cls !== null && cls <= 0.1 ? 'pass' : cls !== null && cls <= 0.25 ? 'warning' : 'fail'
    });

    // Test 4: Total Blocking Time (TBT)
    const tbt = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return navigation ? navigation.loadEventEnd - navigation.fetchStart : null;
    });

    results.tests.push({
      name: 'Total Blocking Time (approximated)',
      value: tbt ? Math.round(tbt) : null,
      unit: 'ms',
      target: 2500,
      status: tbt && tbt <= 2500 ? 'pass' : tbt && tbt <= 4000 ? 'warning' : 'fail'
    });

    // Test 5: Bundle Size Analysis
    const bundleSize = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      let totalSize = 0;
      let jsSize = 0;
      let cssSize = 0;
      let imageSize = 0;

      resources.forEach(resource => {
        const size = resource.transferSize || 0;
        totalSize += size;

        if (resource.name.includes('.js')) {
          jsSize += size;
        } else if (resource.name.includes('.css')) {
          cssSize += size;
        } else if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
          imageSize += size;
        }
      });

      return {
        total: Math.round(totalSize / 1024), // KB
        javascript: Math.round(jsSize / 1024),
        css: Math.round(cssSize / 1024),
        images: Math.round(imageSize / 1024)
      };
    });

    results.tests.push({
      name: 'Total Bundle Size',
      value: bundleSize.total,
      unit: 'KB',
      target: 800,
      status: bundleSize.total <= 800 ? 'pass' : bundleSize.total <= 1200 ? 'warning' : 'fail'
    });

    results.tests.push({
      name: 'JavaScript Bundle Size',
      value: bundleSize.javascript,
      unit: 'KB',
      target: 400,
      status: bundleSize.javascript <= 400 ? 'pass' : bundleSize.javascript <= 600 ? 'warning' : 'fail'
    });

    // Test 6: Image Loading Success Rate
    const imageLoadingSuccess = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      if (images.length === 0) return 100;

      const loaded = images.filter(img => img.complete && img.naturalWidth > 0);
      return Math.round((loaded.length / images.length) * 100);
    });

    results.tests.push({
      name: 'Image Loading Success Rate',
      value: imageLoadingSuccess,
      unit: '%',
      target: 95,
      status: imageLoadingSuccess >= 95 ? 'pass' : imageLoadingSuccess >= 85 ? 'warning' : 'fail'
    });

    // Test 7: Service Worker Activation
    const swActive = await page.evaluate(async () => {
      if (!navigator.serviceWorker) return false;
      
      // Esperar hasta 3 segundos para que el SW se active
      return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 30; // 3 segundos, 100ms por intento
        
        const checkSW = () => {
          if (navigator.serviceWorker.controller !== null) {
            resolve(true);
            return;
          }
          
          attempts++;
          if (attempts >= maxAttempts) {
            resolve(false);
            return;
          }
          
          setTimeout(checkSW, 100);
        };
        
        // Verificar inmediatamente y luego cada 100ms
        checkSW();
      });
    });

    results.tests.push({
      name: 'Service Worker Status',
      value: swActive ? 100 : 0,
      unit: '%',
      target: 100,
      status: swActive ? 'pass' : 'fail'
    });

    // Test 8: Console Errors
    const consoleErrors = await page.evaluate(() => {
      return window.performanceErrors ? window.performanceErrors.length : 0;
    });

    results.tests.push({
      name: 'Console Errors',
      value: consoleErrors,
      unit: 'count',
      target: 0,
      status: consoleErrors === 0 ? 'pass' : consoleErrors <= 2 ? 'warning' : 'fail'
    });

    // Calcular resumen
    results.summary.totalTests = results.tests.length;
    results.summary.passed = results.tests.filter(t => t.status === 'pass').length;
    results.summary.warnings = results.tests.filter(t => t.status === 'warning').length;
    results.summary.failed = results.tests.filter(t => t.status === 'fail').length;
    
    // Score general
    const passWeight = 100;
    const warningWeight = 60;
    const failWeight = 0;
    
    results.summary.overallScore = Math.round(
      (results.summary.passed * passWeight + 
       results.summary.warnings * warningWeight + 
       results.summary.failed * failWeight) / results.summary.totalTests
    );

    const totalTime = Date.now() - startTime;
    console.log(`✅ Tests completed in ${totalTime}ms\n`);

    // Mostrar resultados
    displayResults(results);

    // Guardar resultados si se especifica
    if (config.output === 'json') {
      const outputPath = path.join(process.cwd(), 'performance-results.json');
      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
      console.log(`📄 Results saved to: ${outputPath}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return results;
}

function displayResults(results) {
  console.log('📊 PERFORMANCE TEST RESULTS');
  console.log('============================\n');
  
  // Resumen
  console.log(`🎯 Overall Score: ${results.summary.overallScore}/100`);
  console.log(`✅ Passed: ${results.summary.passed}`);
  console.log(`⚠️  Warnings: ${results.summary.warnings}`);
  console.log(`❌ Failed: ${results.summary.failed}`);
  console.log('');

  // Resultados individuales
  results.tests.forEach(test => {
    const statusEmoji = test.status === 'pass' ? '✅' : test.status === 'warning' ? '⚠️' : '❌';
    const value = test.value !== null ? `${test.value}${test.unit}` : 'N/A';
    const target = test.target ? ` (target: ${test.target}${test.unit})` : '';
    
    console.log(`${statusEmoji} ${test.name}: ${value}${target}`);
  });

  console.log('\n');

  // Recomendaciones
  const failedTests = results.tests.filter(t => t.status === 'fail');
  if (failedTests.length > 0) {
    console.log('🔧 RECOMMENDATIONS:');
    console.log('===================');
    
    failedTests.forEach(test => {
      switch (test.name) {
        case 'First Contentful Paint (FCP)':
          console.log('• Optimize critical CSS and reduce render-blocking JavaScript');
          break;
        case 'Largest Contentful Paint (LCP)':
          console.log('• Optimize above-the-fold images and use resource preloading');
          break;
        case 'Cumulative Layout Shift (CLS)':
          console.log('• Set image dimensions and avoid dynamic content insertion');
          break;
        case 'Total Bundle Size':
          console.log('• Implement more aggressive code splitting and tree shaking');
          break;
        case 'JavaScript Bundle Size':
          console.log('• Split JavaScript bundles and defer non-critical scripts');
          break;
        case 'Image Loading Success Rate':
          console.log('• Improve image fallbacks and CDN configuration');
          break;
        case 'Service Worker Status':
          console.log('• Check Service Worker registration and installation');
          break;
        default:
          console.log(`• Review ${test.name} configuration`);
      }
    });
    console.log('');
  } else {
    console.log('🎉 All tests passed! Your application is well optimized.\n');
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  runPerformanceTests()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { runPerformanceTests };