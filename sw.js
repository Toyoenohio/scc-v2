const CACHE_VERSION = 'v2';
const CACHE_NAME = `scc-${CACHE_VERSION}`;

const urlsToCache = [
  '/',
  '/index.html'
];

// Install event - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('[SW] Error cacheando:', err))
  );
  // Forzar activación inmediata
  self.skipWaiting();
});

// Activate event - limpiar caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return cacheName.startsWith('scc-') && cacheName !== CACHE_NAME;
          })
          .map(cacheName => {
            console.log('[SW] Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      // Tomar control de todas las pestañas abiertas
      return self.clients.claim();
    })
  );
});

// Fetch event - estrategia Network First con fallback a cache
self.addEventListener('fetch', event => {
  // Solo manejar peticiones GET
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Si la respuesta de red es válida, actualizar el cache
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Si falla la red, intentar desde cache
        return caches.match(event.request);
      })
  );
});

// Escuchar mensajes desde la app
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
