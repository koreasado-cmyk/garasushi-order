/* 가라스시 발주 - Service Worker
 * Build: 20260529-1856
 * 전략: network-first → 캐시 폴백
 */
const CACHE = 'garasushi-order-v20260529-1856';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './logo.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const sameOrigin = new URL(req.url).origin === self.location.origin;
  if(!sameOrigin) return;
  e.respondWith(
    fetch(req)
      .then(resp => {
        if(resp && resp.status === 200){
          const cl = resp.clone();
          caches.open(CACHE).then(c => c.put(req, cl));
        }
        return resp;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
