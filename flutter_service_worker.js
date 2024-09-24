'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"main.dart.js_10.part.js": "3a64d748ad185dab27479fec41e0e9b3",
"version.json": "d9ef271061247dc6745c1c67763767dd",
"main.dart.js_2.part.js": "17f01c23515b219d186ffaef3f00a5de",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"main.dart.js_1.part.js": "3f003087262262e0a34f29615fe6599d",
"main.dart.js_8.part.js": "acad159c8884f1ef9031f5b8d072a16a",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"main.dart.js": "6a7c07c8396c5dffc674a3792ef8b4b0",
"main.dart.js_9.part.js": "7a9516ca7711c7e3d184f11322376408",
"main.dart.js_3.part.js": "317e7b898e2d78af79741684a2b4ff95",
"index.html": "f84aced1be41fb8e299bb7d415346b74",
"/": "f84aced1be41fb8e299bb7d415346b74",
"manifest.json": "88c6d4f21d0dce3ca59c6ddcf00f873e",
"main.dart.js_4.part.js": "5b014b6e137a0fc8402dd717514b9f22",
"flutter_bootstrap.js": "3f4563f113f2fd57cd538e29b960c6a8",
"main.dart.js_7.part.js": "c4f4a2886f48e0ff1c0aa3735b22081f",
"main.dart.wasm": "d10120103dc86c9e7bba8f235586c83c",
"main.dart.mjs": "b999198789d241784a2dbbe62bb50a22",
"main.dart.js_5.part.js": "004c752dd609bfd86ede2fd72e73e2a2",
"assets/AssetManifest.json": "e247fe0ffa68633d31f4ec49aa0cf629",
"assets/AssetManifest.bin": "d92020361b251416fdf7eb37aeae0db1",
"assets/packages/neumorphic/fonts/NeumorphicIcons.ttf": "32be0c4c86773ba5c9f7791e69964585",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/theme/fonts/Inter.ttf": "0a77e23a8fdbe6caefd53cb04c26fabc",
"assets/packages/theme/fonts/Atkinson/AtkinsonHyperlegible-Medium.ttf": "60e3a7a5d60a6b7fd37697576aa60402",
"assets/packages/theme/fonts/Atkinson/AtkinsonHyperlegible-BoldItalic.ttf": "a18eedb73a9ff74da81c1885bc57b779",
"assets/packages/theme/fonts/Atkinson/AtkinsonHyperlegible-Regular.ttf": "8fb90c44f7bc76f6aef38d0696ed0b49",
"assets/packages/theme/fonts/Atkinson/AtkinsonHyperlegible-Bold.ttf": "08fc19673abeac2cafa733008e8662f1",
"assets/packages/theme/fonts/Atkinson/AtkinsonHyperlegible-Italic.ttf": "163da8d6ac918cef1e8ffd56a33849c4",
"assets/packages/theme/fonts/Inter-Italic.ttf": "6dce17792107f0321537c2f1e9f12866",
"assets/packages/theme/fonts/Poppins.otf": "92809afdb41cb4720f930d93b3194c57",
"assets/AssetManifest.bin.json": "5ffda552ce95f33f34a2f0d23ed050f9",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/NOTICES": "3d6f4e686d21c1c7f21a62d9db4202ad",
"assets/FontManifest.json": "219b3743dda0554cb65c478315a9a05c",
"assets/assets/iqmat.svg.vec": "0112bdc0c4e55021cca45181047738ae",
"assets/assets/iqmat.svg": "18be83a0dd82b994a9f8733c11aece83",
"assets/fonts/MaterialIcons-Regular.otf": "b0f6d340485c05089a8c48f1ada71c94",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"main.dart.wasm",
"main.dart.mjs",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
