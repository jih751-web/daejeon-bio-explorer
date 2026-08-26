'use client'
import { Suspense, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { searchSpeciesByName } from '@/data/species'
import { getSpeciesPhoto } from '@/lib/speciesPhoto'

function SearchContent() {
  const params = useSearchParams()
  const code = params.get('code')!
  const nickname = params.get('nickname')!
  const [query, setQuery] = useState('')

  const results = searchSpeciesByName(query)

  return (
    <main className="min-h-screen max-w-md mx-auto flex flex-col">
      <div className="px-5 pt-6 pb-3 flex flex-col gap-3.5 shrink-0">
        <h1 className="font-display text-2xl text-[color:var(--color-forest-deep)]">이름으로 찾기</h1>
        <div className="h-[52px] rounded-2xl bg-white flex items-center gap-2.5 px-4 shadow-[0_8px_18px_-12px_oklch(0.35_0.08_150_/_0.35)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#6B6A5C" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="#6B6A5C" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="동물 이름을 입력해보세요"
            className="flex-1 outline-none text-[15px] bg-transparent"
          />
        </div>
      </div>

      {query && (
        <p className="px-5 text-xs text-neutral-500 pb-1">‘{query}’로 검색된 결과 {results.length}개</p>
      )}

      <div className="flex-1 overflow-y-auto px-5 pb-6 pt-1 flex flex-col gap-3">
        {results.map((s) => {
          const photo = getSpeciesPhoto(s.id)
          return (
            <a
              key={s.id}
              href={`/student/species/${s.id}?code=${code}&nickname=${nickname}`}
              className="bg-white rounded-[20px] p-3 flex gap-3.5 items-center shadow-[0_6px_16px_-12px_oklch(0.35_0.08_150_/_0.3)]"
            >
              <span className="relative w-14 h-14 rounded-2xl bg-forest-soft flex items-center justify-center shrink-0 overflow-hidden">
                {photo ? (
                  <Image src={photo.url} alt={s.koreanName} fill sizes="56px" className="object-cover" />
                ) : (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <circle cx="7" cy="12" r="2" stroke="var(--color-forest-deep)" strokeWidth="1.6" />
                    <circle cx="11" cy="9" r="1.8" stroke="var(--color-forest-deep)" strokeWidth="1.6" />
                    <circle cx="15" cy="9" r="1.8" stroke="var(--color-forest-deep)" strokeWidth="1.6" />
                    <ellipse cx="12" cy="15.5" rx="5" ry="3.6" stroke="var(--color-forest-deep)" strokeWidth="1.6" />
                  </svg>
                )}
              </span>
              <div className="min-w-0">
                <p className="font-extrabold text-[15.5px]">{s.koreanName}</p>
                <p className="text-xs italic text-neutral-500 truncate">{s.scientificName}</p>
              </div>
            </a>
          )
        })}
        {query && results.length === 0 && (
          <p className="text-neutral-500 text-sm text-center pt-8">검색 결과가 없어요.</p>
        )}
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
