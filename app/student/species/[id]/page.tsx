'use client'
import { Suspense, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { findSpeciesById } from '@/data/species'

type ChipKey = 'taxonomy' | 'features' | 'food' | 'habitat'

const CHIPS: { key: ChipKey; label: string }[] = [
  { key: 'taxonomy', label: '분류는?' },
  { key: 'features', label: '특징이 뭐예요?' },
  { key: 'food', label: '무엇을 먹나요?' },
  { key: 'habitat', label: '어디 살아요?' },
]

function SpeciesDetailContent() {
  const routeParams = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')!
  const nickname = searchParams.get('nickname')!
  const species = findSpeciesById(routeParams.id)

  const [answers, setAnswers] = useState<ChipKey[]>([])
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  if (!species) {
    return <main className="p-4 text-center">생물 정보를 찾을 수 없어요.</main>
  }

  function ask(key: ChipKey) {
    if (!answers.includes(key)) setAnswers((prev) => [...prev, key])
  }

  function answerText(key: ChipKey): string {
    if (key === 'taxonomy') {
      const t = species!.taxonomy
      return `${t.domain} > ${t.kingdom} > ${t.phylum} > ${t.class} > ${t.order} > ${t.family} > ${t.genus} > ${t.species}`
    }
    return species![key]
  }

  async function handleSave() {
    try {
      const res = await fetch('/api/observations', {
        method: 'POST',
        body: JSON.stringify({
          code,
          nickname,
          speciesId: species!.id,
          speciesName: species!.koreanName,
          description: species!.features,
        }),
      })
      if (!res.ok) throw new Error()
      setSaved(true)
    } catch {
      setSaveError('저장에 실패했어요. 다시 시도해주세요')
    }
  }

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-1">{species.koreanName}</h1>
      <p className="text-sm text-slate-500 mb-6">{species.scientificName}</p>

      <div className="space-y-2 mb-6">
        {CHIPS.map((c) => (
          <button
            key={c.key}
            onClick={() => ask(c.key)}
            className="border rounded-lg px-4 py-2 mr-2"
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        {answers.map((key) => (
          <div key={key} className="bg-slate-100 rounded-lg p-3 text-sm">
            {answerText(key)}
          </div>
        ))}
      </div>

      {saveError && <p className="text-red-600 text-sm mb-2">{saveError}</p>}
      <button
        onClick={handleSave}
        disabled={saved}
        className="w-full bg-blue-600 text-white py-3 rounded-lg mb-3"
      >
        {saved ? '저장됨' : '내 기록에 저장'}
      </button>
      <a href={`/student/scan?code=${code}&nickname=${nickname}`} className="block text-center border py-3 rounded-lg">
        다른 생물 찾기
      </a>
    </main>
  )
}

export default function SpeciesDetailPage() {
  return (
    <Suspense fallback={<main className="p-4 text-center">불러오는 중...</main>}>
      <SpeciesDetailContent />
    </Suspense>
  )
}
