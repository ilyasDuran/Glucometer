const cacheName = 'gluko-v1';
const assets = ['./', './index.html']; // index.html ismini dosya adınızla değiştirin

// Kurulum ve Dosyaları Önbelleğe Alma
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

// Çevrimdışı Çalışma Desteği
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});