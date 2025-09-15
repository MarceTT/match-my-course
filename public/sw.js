// Service Worker para Match My Course
// Optimización de cache para assets críticos y performance

const CACHE_NAME = 'match-my-course-v5'; // Fix external API blocking with origin check
const SW_VERSION = 'v2.3.0'; // Version tracking
const CDN_CACHE = 'mmc-cdn-v1';
const API_CACHE = 'mmc-api-v1';

// Assets críticos para caché inmediato
const CRITICAL_ASSETS = [
  '/',
  '/favicon.ico',
  '/placeholder.svg',
  '/offline.html', // Crear página offline
];

// Patrones de URLs para diferentes estrategias de cache
const CDN_URLS = [
  'https://d2wv8pxed72bi5.cloudfront.net/',
  'https://flagcdn.com/',
  'https://images.unsplash.com/',
];

const API_URLS = [
  '/api/schools',
  '/api/seo',
];

// Estrategias de cache
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  CACHE_ONLY: 'cache-only',
  NETWORK_ONLY: 'network-only'
};

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => {
        // Force activate para actualizar inmediatamente
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Cache installation failed:', error);
      })
  );
});

// Activar Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        // Limpiar caches obsoletos
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== CDN_CACHE && 
                cacheName !== API_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Tomar control de todas las páginas inmediatamente
        return self.clients.claim();
      })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip para requests que no son GET
  if (request.method !== 'GET') {
    return;
  }

  // Skip para requests de extension del navegador
  if (url.protocol === 'chrome-extension:' || 
      url.protocol === 'moz-extension:') {
    return;
  }

  // Skip para APIs externas (diferente dominio/puerto)
  if (url.origin !== self.location.origin) {
    console.log('[SW] Skipping external API:', url.href);
    return;
  }

  // Determinar estrategia basada en la URL
  let strategy = determineStrategy(url);
  
  event.respondWith(
    handleRequest(request, strategy)
  );
});

// Determinar estrategia de cache basada en URL
function determineStrategy(url) {
  // Assets estáticos (CSS, JS, imágenes)
  if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|webp|svg|woff2?)$/)) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }

  // CDN de imágenes
  if (CDN_URLS.some(cdnUrl => url.href.startsWith(cdnUrl))) {
    return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
  }

  // APIs
  if (API_URLS.some(apiPath => url.pathname.startsWith(apiPath))) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // Páginas HTML
  if (url.pathname === '/' || 
      url.pathname.startsWith('/cursos/') ||
      url.pathname.startsWith('/blog/')) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // Default: network first
  return CACHE_STRATEGIES.NETWORK_FIRST;
}

// Manejar request según estrategia
async function handleRequest(request, strategy) {
  const url = new URL(request.url);
  
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return handleCacheFirst(request);
    
    case CACHE_STRATEGIES.NETWORK_FIRST:
      return handleNetworkFirst(request);
    
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return handleStaleWhileRevalidate(request);
    
    default:
      return fetch(request);
  }
}

// Cache First: Para assets estáticos
async function handleCacheFirst(request) {
  const cacheName = getCacheName(request.url);
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // Solo cachear respuestas exitosas
    if (networkResponse.status === 200) {
      // Clonar antes de usar
      const responseClone = networkResponse.clone();
      
      // Cache con TTL para imágenes
      if (request.url.includes('cloudfront') || 
          request.url.includes('flagcdn') ||
          request.url.includes('unsplash')) {
        
        // Agregar headers de cache
        const headers = new Headers(responseClone.headers);
        headers.set('Cache-Control', 'public, max-age=86400'); // 24 horas
        headers.set('sw-cached-at', Date.now().toString());
        
        const modifiedResponse = new Response(responseClone.body, {
          status: responseClone.status,
          statusText: responseClone.statusText,
          headers: headers
        });
        
        cache.put(request, modifiedResponse.clone());
        return modifiedResponse;
      } else {
        cache.put(request, responseClone);
      }
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    
    // Fallback offline
    if (request.destination === 'document') {
      return caches.match('/offline.html') || 
             new Response('Página no disponible offline', { 
               status: 503,
               headers: { 'Content-Type': 'text/plain' }
             });
    }
    
    // Placeholder para imágenes
    if (request.destination === 'image') {
      return caches.match('/placeholder.svg') ||
             new Response('', { status: 503 });
    }
    
    throw error;
  }
}

// Network First: Para HTML y APIs
async function handleNetworkFirst(request) {
  const cacheName = getCacheName(request.url);
  
  try {
    const networkResponse = await fetch(request);
    
    // Cachear respuestas exitosas
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      const responseClone = networkResponse.clone();
      
      // TTL más corto para APIs (5 minutos)
      if (request.url.includes('/api/')) {
        const headers = new Headers(responseClone.headers);
        headers.set('sw-cached-at', Date.now().toString());
        headers.set('sw-ttl', '300000'); // 5 minutos en ms
        
        const modifiedResponse = new Response(responseClone.body, {
          status: responseClone.status,
          statusText: responseClone.statusText,
          headers: headers
        });
        
        cache.put(request, modifiedResponse.clone());
      } else {
        cache.put(request, responseClone);
      }
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error.message);
    
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Verificar TTL para APIs
      if (request.url.includes('/api/')) {
        const cachedAt = cachedResponse.headers.get('sw-cached-at');
        const ttl = cachedResponse.headers.get('sw-ttl');
        
        if (cachedAt && ttl) {
          const age = Date.now() - parseInt(cachedAt);
          if (age > parseInt(ttl)) {
            throw error; // Cache expirado
          }
        }
      }
      
      return cachedResponse;
    }
    
    throw error;
  }
}

// Stale While Revalidate: Para CDN assets
async function handleStaleWhileRevalidate(request) {
  const cacheName = getCacheName(request.url);
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Revalidar en background
  const fetchPromise = fetch(request).then(response => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cachedResponse);
  
  // Devolver cache inmediatamente si existe
  return cachedResponse || fetchPromise;
}

// Obtener nombre de cache apropiado
function getCacheName(url) {
  if (CDN_URLS.some(cdnUrl => url.startsWith(cdnUrl))) {
    return CDN_CACHE;
  }
  
  if (url.includes('/api/')) {
    return API_CACHE;
  }
  
  return CACHE_NAME;
}

// Limpiar cache periódicamente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Performance monitoring
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/performance')) {
    // Enviar métricas de cache hit/miss
    const cacheHits = self.cacheHits || 0;
    const cacheMisses = self.cacheMisses || 0;
    
    event.respondWith(
      new Response(JSON.stringify({
        cacheHits,
        cacheMisses,
        hitRate: cacheHits / (cacheHits + cacheMisses) || 0,
        timestamp: Date.now()
      }), {
        headers: { 'Content-Type': 'application/json' }
      })
    );
  }
});

console.log('[SW] Service Worker loaded successfully');