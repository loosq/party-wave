const CACHE_PREFIX = 'team-five-runner-cache';
const CACHE_VER = 'v1';
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

const HTTP_STATUS_OK = 200;
const RESPONSE_SAFE_TYPE = 'basic';

const URLS = [
    '/index.html',
    '/video/main.mp4',
    '/video/poster.png',
    '/images/empty-avatar.png',
    '/images/favicon.png',
    '/images/forum-logo.png',
    '/bundle.js',
    '/fonts/*',
];

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(URLS)).catch((err) => {
                console.error(err);
            }),
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames
                .map((name) => {
                    if (name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                    return null;
                })
                .filter((key) => key !== null),
        )),
    );
});

self.addEventListener('fetch', (evt) => {
    const {request} = evt;

    if (
        request.url.startsWith('chrome-extension')
        || request.url.includes('extension')
        || !(request.url.indexOf('http') === 0)
        || !(request.url.indexOf('localhost') < 0)
    ) {
        return;
    }

    evt.respondWith(
        caches.match(request)
            .then((response) => {
                if (response) {
                    return response;
                }

                const fetchRequest = request.clone();

                return fetch(fetchRequest)
                    .then((resp) => {
                        if (!resp
                                || resp.status !== HTTP_STATUS_OK
                                || resp.type !== RESPONSE_SAFE_TYPE) {
                            return resp;
                        }

                        const responseToCache = resp.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(request, responseToCache);
                            });

                        return resp;
                    });
            }),
    );
});
