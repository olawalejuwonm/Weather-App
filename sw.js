let CACHE_NAME = 'my-weather-cache-v1';
let urlsToCache = [
    './',
    './styles/main.css',
    './styles/styles.css',
    './script/main.js',
    './styles/styles.min.css.map',
    './script/Activity.js',
    './favicon.ico',
    './index.html',
    './activity.html',
    './images/drizzle.png',
    './images/1440x450.jpg'

];


self.addEventListener('install', function (event) {
    //The install event is the first event a service worker gets, and it only happens once
    // Perform install steps
    //console.log("install", event); //A promise passed to installEvent.waitUntil() signals the duration and success or failure of your install.
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                // console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
  
    // serve the cat SVG from the cache if the request is
    // same-origin and the path is '/dog.svg'
    if (url.origin == location.origin) {
      event.respondWith(caches.match(url.pathname)
      .then((response) => {
        //   console.log("mic respo", response)
          if (response) {
              return response
          }

      }));
    }
  })
// self.addEventListener('fetch', function (event) {
//     console.log("in fetch")
//     //console.log("fetch", event)
//     // console.log("event.request", event.request)

//     event.respondWith(
//         caches.match(event.request)
//             .then(function (response) {
//                 //console.log("event.request response", response);
//                 // Cache hit - return response
//                 if (response) {
//                     return response;
//                 }

//                 return fetch(event.request).then(
//                     function (response) {
//                         // Check if we received a valid response
//                         //response.type must be basic which indicates that it's a request from our origin. This means that requests to third party assets aren't cached as well
//                         if (!response || response.status !== 200 || response.type !== 'basic') {
//                             return response;
//                         }

//                         // IMPORTANT: Clone the response. A response is a stream
//                         // and because we want the browser to consume the response
//                         // as well as the cache consuming the response, we need
//                         // to clone it so we have two streams.
//                         let responseToCache = response.clone();

//                         //cache the response
//                         caches.open(CACHE_NAME)
//                             .then(function (cache) {
//                                 // console.log("the cache", cache)
//                                 cache.put(event.request, responseToCache);
//                             })
//                             .catch((err) => {
//                                 console.log(err)
//                             });

//                         return response;
//                     }
//                 );
//             })
//     );
// });


//other useful content

//The waiting phase means you're only running one version of your site at once,
// but if you don't need that feature, you can make your new service worker activate sooner by calling self.skipWaiting().
// self.skipWaiting() //for activating new worker immediately
//It doesn't really matter when you call skipWaiting(), as long as it's during 
//or before waiting. It's pretty common to call it in the install event:
// self.addEventListener('install', event => {
//     self.skipWaiting();
  
//     event.waitUntil(
//       // caching etc
//     );
//   });
//Caution: skipWaiting() means that your new service worker is likely controlling pages that were loaded with an older 
//version. This means some of your page's fetches will have been handled by your old service worker, but your new service
// worker will be handling subsequent fetches. If this might break things, don't use skipWaiting().


//The code below if new service worker get activated

// self.addEventListener('activate', function(event) {
    // One common task that will occur in the activate callback is cache management

//     let cacheAllowlist = ['pages-cache-v1', 'blog-posts-cache-v1'];
  
//     event.waitUntil(
//       caches.keys().then(function(cacheNames) {
//         return Promise.all(
//           cacheNames.map(function(cacheName) {
//             if (cacheAllowlist.indexOf(cacheName) === -1) {
//               return caches.delete(cacheName);
//             }
//           })
//         );
//       })
//     );
//   });

//another example of activate
// self.addEventListener('activate', event => {
//     const expectedCaches = ['static-v2'];
//     // delete any caches that aren't in expectedCaches
//     // which will get rid of static-v1
//     event.waitUntil(
//       caches.keys().then(keys => Promise.all(
//         keys.map(key => {
//           if (!expectedCaches.includes(key)) {
//             return caches.delete(key);
//           }
//         })
//       )).then(() => {
//         console.log('V2 now ready to handle fetches!');
//       })
//     );
//   });


//the browser checks for updates automatically after navigations and functional events,
// but you can also trigger them manually:

// navigator.serviceWorker.register('/sw.js').then(reg => {
//     // sometime later…
//     //If you expect the user to be using your site for a long time without reloading, 
//     //you may want to call update() on an interval (such as hourly).
//     reg.update();
//   });

//service worker lifecycle
//   navigator.serviceWorker.register('/sw.js').then(reg => {
//     reg.installing; // the installing worker, or undefined
//     reg.waiting; // the waiting worker, or undefined
//     reg.active; // the active worker, or undefined
  
//     reg.addEventListener('updatefound', () => {
//       // A wild service worker has appeared in reg.installing!
//       const newWorker = reg.installing;
  
//       newWorker.state;
//       // "installing" - the install event has fired, but not yet complete
//       // "installed"  - install complete
//       // "activating" - the activate event has fired, but not yet complete
//       // "activated"  - fully active
//       // "redundant"  - discarded. Either failed install, or it's been
//       //                replaced by a newer version
  
//       newWorker.addEventListener('statechange', () => {
//         // newWorker.state has changed
//       });
//     });
//   });
  
//   navigator.serviceWorker.addEventListener('controllerchange', () => {
//     // This fires when the service worker controlling this page
//     // changes, eg a new worker has skipped waiting and become
//     // the new active worker.
//   });