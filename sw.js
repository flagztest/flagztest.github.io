const CACHE_NAME = 'flagzilla-cache-vMAX_v3'; // 🌟 Поменяли имя кэша для сброса памяти iOS
const ASSETS = [
    './',
    './index.html', 
    './godzilla.webp',
    './favicon.png'
];

// Установка воркера и сохранение каркаса приложения
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// Активация и удаление старого кэша
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Перехват запросов
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
            return cachedResponse || fetch(e.request);
        })
    );
});