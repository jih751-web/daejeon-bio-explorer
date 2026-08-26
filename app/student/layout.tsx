'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useOfflineQueueStatus } from '@/lib/offlineQueue'
import { Announcement } from '@/lib/types'

function StudentChrome({ children }: { children: React.ReactNode }) {
  const params = useSearchParams()
  const code = params.get('code')
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [dismissedAt, setDismissedAt] = useState<string | null>(() =>
    code && typeof window !== 'undefined' ? sessionStorage.getItem(`announcement-dismissed-${code}`) : null
  )
  const { isOnline, pendingCount } = useOfflineQueueStatus()

  useEffect(() => {
    if (!code) return

    function load() {
      fetch(`/api/announcement?code=${code}`)
        .then((r) => r.json())
        .then(setAnnouncement)
        .catch(() => {})
    }
    load()
    const interval = setInterval(load, 20000)
    return () => clearInterval(interval)
  }, [code])

  function dismiss() {
    if (!code || !announcement?.updatedAt) return
    sessionStorage.setItem(`announcement-dismissed-${code}`, announcement.updatedAt)
    setDismissedAt(announcement.updatedAt)
  }

  const showAnnouncement = !!announcement?.text && !!announcement.updatedAt && announcement.updatedAt !== dismissedAt

  return (
    <>
      {showAnnouncement && (
        <div
          className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 text-white text-[13.5px] font-bold"
          style={{ background: 'linear-gradient(90deg, var(--color-sun-deep), var(--color-sun))' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M12 8v5M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" />
          </svg>
          <span className="flex-1">{announcement!.text}</span>
          <button onClick={dismiss} className="shrink-0 w-6 h-6 rounded-full bg-white/25 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
      {(!isOnline || pendingCount > 0) && (
        <div className="sticky top-0 z-10 flex items-center gap-2 px-4 py-2 text-[12.5px] font-bold bg-neutral-700 text-white">
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[color:var(--color-sun)]' : 'bg-neutral-400'}`} />
          {isOnline ? `저장 중이던 기록을 보내고 있어요 (${pendingCount}개 남음)` : `오프라인 상태예요 — 연결되면 자동으로 저장돼요${pendingCount > 0 ? ` (${pendingCount}개 대기 중)` : ''}`}
        </div>
      )}
      {children}
    </>
  )
}

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={children}>
      <StudentChrome>{children}</StudentChrome>
    </Suspense>
  )
}
