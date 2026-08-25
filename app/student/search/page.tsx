'use client'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { searchSpeciesByName } from '@/data/species'

function SearchContent() {
  const params = useSearchParams()
  const code = params.get('code')!
  const nickname = params.get('nickname')!
  const [query, setQuery] = useState('')

  const results = searchSpeciesByName(query)

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">이름으로 찾기</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="예: 사자, 올빼미..."
        className="w-full border rounded-lg p-3 mb-4"
      />
      <div className="space-y-2">
        {results.map((s) => (
          <a
            key={s.id}
            href={`/student/species/${s.id}?code=${code}&nickname=${nickname}`}
            className="block border rounded-lg p-3"
          >
            <p className="font-bold">{s.koreanName}</p>
            <p className="text-xs text-slate-500">{s.scientificName}</p>
          </a>
        ))}
        {query && results.length === 0 && <p className="text-slate-500 text-sm">검색 결과가 없어요.</p>}
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="p-4 text-center">불러오는 중...</main>}>
      <SearchContent />
    </Suspense>
  )
}
