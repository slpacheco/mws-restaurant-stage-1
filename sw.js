var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  'restaurant.html',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'css/styles.css',
  'data/restaurants.json',
];

for (let i = 1; i <= 10; i++) {
  urlsToCache.push(`img/${i}.jpg`);
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true})
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});