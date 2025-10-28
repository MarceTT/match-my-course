// Service Worker para Match My Course
// Optimización de cache para assets críticos y performance

const CACHE_NAME = 'match-my-course-v6'; // Improved external API caching
const SW_VERSION = 'v2.4.0'; // Version tracking
const CDN_CACHE = 'mmc-cdn-v2';
const API_CACHE = 'mmc-api-v2';

// Métricas de performance
let cacheHits = 0;
let cacheMisses = 0;

// Assets críticos para caché inmediato
const CRITICAL_ASSETS = [
  '/',
  '/favicon.ico',
  '/placeholder.svg',
  '/offline.html',
  '/irlanda',
  '/nueva-zelanda',
  '/estudiar-ingles-irlanda',
  '/estudiar-ingles-nueva-zelanda',
  '/blog',
  '/cursos-ingles-extranjero',
  '/servicios-matchmycourse',
  '/como-funciona-matchmycourse'
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
    Promise.all([
      // Limpiar caches obsoletos
      caches.keys().then((cacheNames) => {
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
      }),
      // Habilitar navigation preload
      self.registration.navigationPreload ?
        self.registration.navigationPreload.enable().then(() => {
          console.log('[SW] Navigation preload enabled');
        }) : Promise.resolve()
    ]).then(() => {
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

  // Permitir cache de API externa del backend
  const isExternalBackend = url.origin !== self.location.origin &&
                           url.hostname.includes('backend') ||
                           url.hostname.includes('api');

  // Skip solo para recursos que no sean del backend
  if (url.origin !== self.location.origin && !isExternalBackend) {
    return;
  }

  // Determinar estrategia basada en la URL
  let strategy = determineStrategy(url);

  event.respondWith(
    handleRequest(request, strategy, event)
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

  // APIs externas del backend (cachear con network-first)
  if (url.hostname.includes('backend') ||
      url.hostname.includes('localhost:8500') ||
      url.pathname.includes('/schools') ||
      url.pathname.includes('/courses')) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // APIs internas
  if (API_URLS.some(apiPath => url.pathname.startsWith(apiPath))) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // Páginas HTML - usar stale-while-revalidate para mejor UX
  if (url.pathname === '/' ||
      url.pathname.startsWith('/cursos/') ||
      url.pathname.startsWith('/blog/') ||
      url.pathname.startsWith('/irlanda') ||
      url.pathname.startsWith('/nueva-zelanda') ||
      url.pathname.startsWith('/estudiar-ingles-') ||
      url.pathname.includes('/school-search') ||
      url.pathname.includes('/servicios') ||
      url.pathname.includes('/como-funciona') ||
      url.pathname.includes('/quienes-somos') ||
      url.pathname.includes('/escuelas-socias') ||
      url.pathname.includes('/contacto')) {
    return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
  }

  // Default: network first
  return CACHE_STRATEGIES.NETWORK_FIRST;
}

// Manejar request según estrategia
async function handleRequest(request, strategy, event) {
  const url = new URL(request.url);

  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return handleCacheFirst(request);

    case CACHE_STRATEGIES.NETWORK_FIRST:
      return handleNetworkFirst(request, event);

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
    cacheHits++;
    return cachedResponse;
  }

  cacheMisses++;
  
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
async function handleNetworkFirst(request, event) {
  const cacheName = getCacheName(request.url);

  try {
    // Intentar usar preloadResponse para navegación
    const preloadResponse = event && event.preloadResponse ? await event.preloadResponse : null;
    if (preloadResponse) {
      console.log('[SW] Using preloaded response');
      cacheHits++; // Preload = optimization hit
      return preloadResponse;
    }

    const networkResponse = await fetch(request);
    cacheMisses++; // Network request = cache miss
    
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
      cacheHits++; // Fallback a cache = hit
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
  if (cachedResponse) {
    cacheHits++;
    return cachedResponse;
  }

  cacheMisses++;
  return fetchPromise;
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

// Exponer métricas a través de mensaje
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_CACHE_STATS') {
    const hitRate = cacheHits / (cacheHits + cacheMisses) || 0;
    event.ports[0].postMessage({
      cacheHits,
      cacheMisses,
      hitRate: Math.round(hitRate * 100),
      timestamp: Date.now(),
      version: SW_VERSION
    });
  }
});

console.log('[SW] Service Worker loaded successfully');