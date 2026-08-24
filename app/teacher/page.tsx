'use client'
import { useState } from 'react'

export default function TeacherPage() {
  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function issueCode() {
    setLoading(true)
    const res = await fetch('/api/sessions', { method: 'POST', body: JSON.stringify({}) })
    const data = await res.json()
    setCode(data.code)
    setLoading(false)
  }

  return (
    <main className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-6">오늘의 활동 코드 발급</h1>
      <button
        onClick={issueCode}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        {loading ? '발급 중...' : '코드 발급'}
      </button>
      {code && (
        <div className="mt-8">
          <p className="text-sm text-slate-500">학생들에게 이 코드를 알려주세요</p>
          <p className="text-5xl font-bold tracking-widest mt-2">{code}</p>
          <a href={`/teacher/dashboard/${code}`} className="text-blue-600 underline block mt-4">
            대시보드로 이동
          </a>
        </div>
      )}
    </main>
  )
}
