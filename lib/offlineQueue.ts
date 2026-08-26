'use client'
import { useEffect, useSyncExternalStore } from 'react'

interface QueuedRequest {
  id: string
  url: string
  body: unknown
  createdAt: number
}

const STORAGE_KEY = 'bio-offline-queue'
const CHANGE_EVENT = 'bio-offline-queue-changed'

function readQueue(): QueuedRequest[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeQueue(queue: QueuedRequest[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(queue))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

async function trySend(url: string, body: unknown): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'POST', body: JSON.stringify(body) })
    return res.ok
  } catch {
    return false
  }
}

/** 네트워크 요청을 시도하고, 실패하면(오프라인 등) 나중에 재전송하도록 큐에 담아둔다. */
export async function queueOrSend(url: string, body: unknown): Promise<{ queued: boolean }> {
  const sent = navigator.onLine ? await trySend(url, body) : false
  if (sent) return { queued: false }

  const queue = readQueue()
  queue.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, url, body, createdAt: Date.now() })
  writeQueue(queue)
  return { queued: true }
}

/** 쌓인 요청을 순서대로 재전송한다. 실패하면 그 지점에서 멈춘다(아직 오프라인일 가능성). */
export async function flushQueue(): Promise<void> {
  let queue = readQueue()
  while (queue.length > 0) {
    const [next, ...rest] = queue
    const sent = await trySend(next.url, next.body)
    if (!sent) break
    queue = rest
    writeQueue(queue)
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

function getOnlineSnapshot() {
  return navigator.onLine
}

function getOnlineServerSnapshot() {
  return true
}

function getPendingSnapshot() {
  return readQueue().length
}

function getPendingServerSnapshot() {
  return 0
}

export function useOfflineQueueStatus() {
  const isOnline = useSyncExternalStore(subscribe, getOnlineSnapshot, getOnlineServerSnapshot)
  const pendingCount = useSyncExternalStore(subscribe, getPendingSnapshot, getPendingServerSnapshot)

  useEffect(() => {
    function handleOnline() {
      flushQueue()
    }
    window.addEventListener('online', handleOnline)
    const interval = setInterval(() => {
      if (navigator.onLine) flushQueue()
    }, 15000)
    return () => {
      window.removeEventListener('online', handleOnline)
      clearInterval(interval)
    }
  }, [])

  return { isOnline, pendingCount }
}
