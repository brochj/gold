var CACHE_NAME = 'static-v1';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/logo192.png',
                '/logo512.png',
                '/manifest.json',
                '/favicon.ico',
                "/static/css/main.2cce8147.chunk.css",
                "/static/js/main.927601eb.chunk.js",
                "/static/js/main.927601eb.chunk.js.map",
                "/static/js/runtime~main.f8b72173.js",
                "/static/js/runtime~main.f8b72173.js.map",
                "/static/js/2.f1ab4a22.chunk.js",
                "/static/js/2.f1ab4a22.chunk.js.map",
                "/precache-manifest.624749d9e8b7e836d9791fbbd49a98fb.js",
                "/service-worker.js",
                "/static/css/main.2cce8147.chunk.css.map",
                "/static/media/logo.5d5d9eef.svg"
            ]);
        })
    )
});

self.addEventListener('activate', function activator(event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys
                .filter(function (key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function (key) {
                    return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('chamou o fetch');
    if (event.request.method === 'GET') {
      event.respondWith(
        caches.match(event.request)
        .then((cached) => {
          var networked = fetch(event.request)
            .then((response) => {
              let cacheCopy = response.clone()
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, cacheCopy))
              return response;
            })
            .catch(() => caches.match(offlinePage));
          return cached || networked;
        })
      )
    }
    return;
  });

// var CACHE_NAME = 'pwa-cache-broch-v1';

// var urlsToCache = [
//     '/',
//     '/index.html',
//     '/logo192.png',
//     '/logo512.png',
//     '/manifest.json',
//     '/static/js/bundle.js',
//     '/favicon.ico',

// ];

// self.addEventListener('install', function (event) {
//     console.log('Chamou a instalacao');
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(function (cache) {
//                 return cache.addAll(urlsToCache);
//             })
//     );
// });

// // self.addEventListener("activate", event => {
// //     const cacheWhitelist = [CACHE_NAME];
// //     event.waitUntil(
// //         caches.keys().then(keyList =>
// //             Promise.all(keyList.map(key => {
// //                 if (!cacheWhitelist.includes(key)) {
// //                     return caches.delete(key);
// //                 }
// //             }))
// //         )
// //     );
// // });
// self.addEventListener('activate', function activator(event) {
//     console.log('chamou o activate');
//     event.waitUntil(
//       caches.keys().then(function (keys) {
//         return Promise.all(keys
//           .filter(function (key) {
//             return key.indexOf(CACHE_NAME) !== 0;
//           })
//           .map(function (key) {
//             return caches.delete(key);
//           })
//         );
//       })
//     );
//   });



// // self.addEventListener('fetch', function (event) {
// //   event.respondWith(
// //     caches.match(event.request).then(function (cachedResponse) {
// //       return cachedResponse || fetch(event.request);
// //     })
// //   );
// // });

// self.addEventListener('fetch', (event) => {
//     console.log('chamou o fetch');
//     if (event.request.method === 'GET') {
//       event.respondWith(
//         caches.match(event.request)
//         .then((cached) => {
//           var networked = fetch(event.request)
//             .then((response) => {
//               let cacheCopy = response.clone()
//               caches.open(CACHE_NAME)
//                 .then(cache => cache.put(event.request, cacheCopy))
//               return response;
//             })
//             .catch(() => caches.match(offlinePage));
//           return cached || networked;
//         })
//       )
//     }
//     return;
//   });