const CACHE_NAME = 'bio-app-v1'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

// 화면을 한 번이라도 열어본 뒤엔, 신호가 끊겨도 그 화면이 계속 보이도록
// 네트워크 우선 + 실패 시 캐시로 대체하는 전략을 쓴다. API 요청은 절대 캐시하지 않는다
// (관찰기록/퀴즈 저장은 lib/offlineQueue.ts가 별도로 재전송을 책임진다).
self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return
  if (url.pathname.startsWith('/api/')) return

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
        return response
      })
      .catch(() => caches.match(request))
  )
})
