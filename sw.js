const CACHE = "frog-pond-v2";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./audio/count_together.mp3", "./audio/frog_math.mp3", "./audio/great_counting.mp3", "./audio/hop_away.mp3", "./audio/how_many_left.mp3", "./audio/how_many_now.mp3", "./audio/in_pond.mp3", "./audio/lets_count.mp3", "./audio/more_hop_in.mp3", "./audio/num_1.mp3", "./audio/num_10.mp3", "./audio/num_2.mp3", "./audio/num_3.mp3", "./audio/num_4.mp3", "./audio/num_5.mp3", "./audio/num_6.mp3", "./audio/num_7.mp3", "./audio/num_8.mp3", "./audio/num_9.mp3", "./audio/praise_did_it.mp3", "./audio/prompt_tap.mp3", "./audio/ribbit.mp3"];
// Self-healing service worker: new worker never waits, activation purges
// every older cache, fetches consult ONLY the current cache.
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.open(CACHE).then(c => c.match(e.request)).then(r => r || fetch(e.request)));
});
