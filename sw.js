const cacheName = 'gluko-v2'; // Versiyonu güncelledik (Önbelleği yenilemek için şart!)
const assets = [
  './', 
  './index.html', 
  './manifest.json',
  './beep.ogg', // Ses dosyanı buraya ekledin
  './Glucometer.png', // İkonun çevrimdışı çalışması için önemli
  'https://cdn.jsdelivr.net/npm/sweetalert2@11',
  'https://unpkg.com/html5-qrcode',
  'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@5/dark.css' // CSS dosyasını da ekleyelim
];

// Kurulum ve Dosyaları Önbelleğe Alma
self.addEventListener('install', e => {
  self.skipWaiting(); // Yeni versiyonun hemen aktif olması için
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Dosyalar önbelleğe alınıyor...');
      return cache.addAll(assets);
    })
  );
});

// Eski Önbellekleri Temizleme (Hafıza dolmasın diye)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Çevrimdışı Çalışma Desteği
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      // Önbellekte varsa ordan ver, yoksa internetten çek
      return res || fetch(e.request);
    })
  );
});
