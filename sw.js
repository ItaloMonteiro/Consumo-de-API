const CACHE_NAME = `Gatos-aleatorios`;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      './index.html' 

    ]);
  })());
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    try {

      const fetchResponse = await fetch(event.request);

      cache.put(event.request, fetchResponse.clone());

      return fetchResponse;
    } catch (e) {
      const cachedResponse = await cache.match(event.request);

      return cachedResponse;
    }
  })());
});


async function requestBackgroundSync() {
  await self.registration.sync.register('my-tag-name');
}

self.addEventListener('sync', event => {
  if (event.tag === 'my-tag-name') {
      event.waitUntil(doTheWork());
  }
});


async function registerPeriodicSync() {
  await registration.periodicSync.register('get-daily-news', {
      minInterval: 24 * 60 * 60 * 1000
  });
}

self.addEventListener('periodicsync', event => {
  if (event.tag === 'get-daily-news') {
      event.waitUntil(getDailyNewsInCache());
  }
});