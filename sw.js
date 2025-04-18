const CACHE_NAME = 'cylinder-checker-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/app.js',
    '/icon512_maskable.png',
    '/icon512_rounded.png'
];

self.addEventListener('install', (e) =>
{
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) =>
{
    e.respondWith(
        caches.match(e.request)
            .then(response => response || fetch(e.request))
    );
});