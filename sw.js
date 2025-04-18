const CACHE_NAME = 'cylinder-checker-v1.0.0';
const ASSETS = [
    '/',
    '/index.html',
    '/app.js',
    '/cylinderguide.jpeg',
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
self.addEventListener('activate', (e) =>
{
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
        ))
    );
});