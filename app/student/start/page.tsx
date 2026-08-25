'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StudentStartPage() {
  const [code, setCode] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function validateAndGo(destination: 'scan' | 'quiz') {
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
      const params = new URLSearchParams({ code, nickname })
      router.push(`/student/${destination}?${params.toString()}`)
    } catch {
      setError('문제가 발생했어요. 다시 시도해주세요')
    }
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-6 text-center">생물탐사 시작하기</h1>
      <label className="block mb-4">
        <span className="text-sm text-slate-600">활동 코드</span>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={4}
          inputMode="numeric"
          className="mt-1 w-full border rounded-lg p-3 text-2xl tracking-widest text-center"
          placeholder="0000"
        />
      </label>
      <label className="block mb-6">
        <span className="text-sm text-slate-600">닉네임</span>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="mt-1 w-full border rounded-lg p-3"
          placeholder="예: 탐험가1"
        />
      </label>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <button onClick={() => validateAndGo('scan')} className="w-full bg-blue-600 text-white py-3 rounded-lg">
        시작하기
      </button>
      <button onClick={() => validateAndGo('quiz')} className="w-full border py-3 rounded-lg mt-3">
        퀴즈만 바로 풀기
      </button>
    </main>
  )
}
