/* Rendement — service worker (même principe que Baby Name).
   S'installe tout de suite : l'app devient installable dès la première visite
   et reste disponible hors ligne. Incrémenter CACHE à chaque mise en ligne. */
const CACHE = "rendement-2";
const BASE = ["./", "./index.html",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png", "./icons/favicon-32.png", "./icons/favicon-64.png"];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(BASE.map(u => c.add(u).catch(() => {})))));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if(req.mode === "navigate"){
    // la page : le réseau d'abord pour recevoir les mises à jour, le cache hors ligne
    e.respondWith(fetch(req, { cache:"no-cache" }).then(r => {
      const c = r.clone(); caches.open(CACHE).then(x => x.put("./index.html", c)); return r;
    }).catch(() => caches.match("./index.html").then(r => r || caches.match("./"))));
    return;
  }
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => {
    if(res.ok){ const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
    return res;
  })));
});
