/* 가라스시 발주 - Service Worker
 * Build: 20260709-1100
 * 전략: network-first → 캐시 폴백
 */
const CACHE = 'garasushi-order-v20260709-1100';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './logo.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE))
      // 새 버전은 사용자 확인(SKIP_WAITING 메시지) 후 활성화됨
  );
});

// index.html에서 사용자 확인 후 보내는 즉시 활성화 요청
self.addEventListener('message', e => {
  if(e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
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
