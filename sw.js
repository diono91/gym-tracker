const CACHE_NAME = 'gym-tracker-v2';
const PRECACHE_URLS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  'https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.all(PRECACHE_URLS.map((url) => cache.add(url).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// El "app shell" (HTML/JS/CSS propio) va network-first: así una versión nueva
// se ve en cuanto hay red, sin quedarse pegado a una copia vieja en caché.
// El resto (imágenes, fuentes, librerías) va cache-first, que es lo que interesa
// para que la app siga funcionando offline y cargue rápido.
function isAppShell(request) {
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  if (request.mode === 'navigate') return true;
  return /\.(html|js|css)$/.test(url.pathname) || url.pathname.endsWith('/');
}

function cachePut(request, response) {
  if (response && response.status === 200) {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (isAppShell(event.request)) {
    // cache:'reload' salta el caché HTTP del navegador, que si no puede
    // devolver una copia vieja y dejar la app pegada a una versión antigua.
    event.respondWith(
      fetch(event.request.url, { cache: 'reload' })
        .then((resp) => cachePut(event.request, resp))
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((resp) => cachePut(event.request, resp))
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
