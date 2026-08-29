'use client'
import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function StudentStartContent() {
  const [code, setCode] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next')

  async function validateAndGo() {
    setError(null)
    if (!/^\d{4}$/.test(code)) {
      setError('활동 코드 4자리를 입력해주세요')
      return
    }
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요')
      return
    }
    try {
      const res = await fetch(`/api/sessions?code=${code}`)
      const data = await res.json()
      if (!data.exists) {
        setError('존재하지 않는 활동 코드예요. 선생님께 다시 확인해주세요')
        return
      }

      const destination = next || '/student/scan'
      const phaseRes = await fetch(`/api/survey-phase?code=${code}`)
      const phaseData = await phaseRes.json()
      if (phaseData.phase === 'pre' || phaseData.phase === 'post') {
        const doneRes = await fetch(
          `/api/survey?code=${code}&nickname=${encodeURIComponent(nickname)}&phase=${phaseData.phase}`
        )
        const doneData = await doneRes.json()
        if ((doneData.responses ?? []).length === 0) {
          const params = new URLSearchParams({ code, nickname, phase: phaseData.phase, next: destination })
          router.push(`/student/survey?${params.toString()}`)
          return
        }
      }

      const params = new URLSearchParams({ code, nickname })
      router.push(`${destination}?${params.toString()}`)
    } catch {
      setError('문제가 발생했어요. 다시 시도해주세요')
    }
  }

  return (
    <main className="min-h-screen max-w-md mx-auto flex flex-col">
      <div
        className="relative shrink-0 overflow-hidden px-6 pt-10 pb-9 text-white"
        style={{ background: 'linear-gradient(180deg, oklch(0.62 0.12 150) 0%, oklch(0.53 0.13 150) 100%)' }}
      >
        <svg className="absolute top-6 right-7 opacity-35" width="52" height="52" viewBox="0 0 24 24" fill="none">
          <path d="M12 3c5 1 8 5 7 11-6 1-10-2-11-7-.4-2 .2-3.5 4-4Z" stroke="white" strokeWidth="1.4" />
        </svg>
        <div className="relative z-10 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 3c5 1 8 5 7 11-6 1-10-2-11-7-.4-2 .2-3.5 4-4Z" stroke="white" strokeWidth="1.8" />
            </svg>
            <span className="text-xs font-bold tracking-wide">대전중앙과학관</span>
          </div>
          <h1 className="font-display text-3xl leading-snug">
            생물 탐사를
            <br />
            시작해요!
          </h1>
          <p className="text-sm opacity-90">전시관 속 동물 친구들을 찾아 떠나볼까요?</p>
        </div>
      </div>

      <div className="flex-1 px-5 pb-8 -mt-6 relative z-10 flex flex-col gap-5">
        <div className="bg-white rounded-3xl p-6 flex flex-col gap-4 shadow-[0_14px_30px_-14px_oklch(0.35_0.08_150_/_0.35)]">
          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-sm font-bold text-neutral-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="var(--color-forest-deep)" strokeWidth="1.8" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="var(--color-forest-deep)" strokeWidth="1.8" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="var(--color-forest-deep)" strokeWidth="1.8" />
              </svg>
              활동 코드 4자리
            </span>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={4}
              inputMode="numeric"
              className="h-16 rounded-2xl bg-forest-soft text-center text-3xl font-display tracking-[0.3em] text-[color:var(--color-forest-deep)] focus:outline-none focus:ring-4 focus:ring-[color:var(--color-sun)]/40"
              placeholder="0000"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-sm font-bold text-neutral-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="3.4" stroke="var(--color-forest-deep)" strokeWidth="1.8" />
                <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" stroke="var(--color-forest-deep)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              닉네임
            </span>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="h-14 rounded-2xl bg-forest-soft px-4 text-base focus:outline-none focus:ring-4 focus:ring-[color:var(--color-sun)]/40"
              placeholder="예: 탐험가1"
            />
          </label>
        </div>

        {error && <p className="text-[color:var(--color-coral)] text-sm font-medium text-center">{error}</p>}

        <button
          onClick={() => validateAndGo()}
          className="h-16 rounded-[20px] text-white font-display text-xl flex items-center justify-center gap-2 shadow-[0_12px_22px_-8px_oklch(0.62_0.17_55_/_0.55)]"
          style={{ background: 'linear-gradient(180deg, var(--color-sun) 0%, var(--color-sun-deep) 100%)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2" />
          </svg>
          탐사 출발!
        </button>

        <div className="flex gap-2.5 items-start bg-sky-soft rounded-2xl px-4 py-3.5 text-[13px] leading-relaxed text-neutral-600">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-px">
            <path d="M12 2 2 7l10 5 10-5-10-5Z" stroke="var(--color-sky)" strokeWidth="1.6" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="var(--color-sky)" strokeWidth="1.6" />
          </svg>
          선생님이 알려주신 활동 코드를 입력하면 탐사를 시작할 수 있어요.
        </div>
      </div>
    </main>
  )
}

export default function StudentStartPage() {
  return (
    <Suspense fallback={<main className="p-8 text-center">불러오는 중...</main>}>
      <StudentStartContent />
    </Suspense>
  )
}
