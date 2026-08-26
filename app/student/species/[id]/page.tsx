'use client'
import { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { findSpeciesById } from '@/data/species'
import { CLASS_DESCRIPTIONS, CLASS_HINTS } from '@/data/classDescriptions'
import { buildClassGuessChoices } from '@/lib/quiz'
import { queueOrSend } from '@/lib/offlineQueue'
import { OBSERVATION_TAGS } from '@/lib/types'
import { getSpeciesPhoto } from '@/lib/speciesPhoto'
import { PhotoCredit } from '@/components/PhotoCredit'

type ChipKey = 'taxonomy' | 'features' | 'food' | 'habitat' | 'whyClass'

const CHIPS: { key: ChipKey; label: string; bg: string; fg: string }[] = [
  { key: 'taxonomy', label: '분류는?', bg: 'var(--color-forest-soft)', fg: 'var(--color-forest-deep)' },
  { key: 'features', label: '특징이 뭐예요?', bg: 'var(--color-sun-deep)', fg: 'white' },
  { key: 'food', label: '무엇을 먹나요?', bg: 'var(--color-sky-soft)', fg: 'var(--color-sky)' },
  { key: 'habitat', label: '어디 살아요?', bg: 'var(--color-coral-soft)', fg: 'var(--color-coral)' },
  { key: 'whyClass', label: '왜 이 무리(강)에 속해요?', bg: 'var(--color-violet-soft)', fg: 'var(--color-violet)' },
]

const CHIP_QUESTION_LABEL: Record<ChipKey, string> = Object.fromEntries(
  CHIPS.map((c) => [c.key, c.label])
) as Record<ChipKey, string>

function SpeciesDetailContent() {
  const routeParams = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code')
  const nickname = searchParams.get('nickname')
  const species = findSpeciesById(routeParams.id)

  const [answers, setAnswers] = useState<ChipKey[]>([])
  const [saved, setSaved] = useState(false)
  const [saveQueued, setSaveQueued] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const [guessChoices, setGuessChoices] = useState<{ choices: string[]; correctIndex: number } | null>(null)
  const [guessPicked, setGuessPicked] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!code || !nickname) {
      router.replace(`/student/start?next=${encodeURIComponent(`/student/species/${routeParams.id}`)}`)
    }
  }, [code, nickname, router, routeParams.id])

  useEffect(() => {
    // buildClassGuessChoices shuffles randomly — must run client-side only (after hydration),
    // never during the server render, or the shuffled order would mismatch and break hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (species) setGuessChoices(buildClassGuessChoices(species.taxonomy.class))
    setGuessPicked(null)
    setRevealed(false)
  }, [species])

  if (!species) {
    return <main className="p-4 text-center">생물 정보를 찾을 수 없어요.</main>
  }

  if (!code || !nickname) {
    return <main className="p-4 text-center">활동 코드를 확인하는 중이에요...</main>
  }

  const photo = getSpeciesPhoto(species.id)

  function ask(key: ChipKey) {
    if (!answers.includes(key)) setAnswers((prev) => [...prev, key])
  }

  function answerText(key: ChipKey): string {
    if (key === 'taxonomy') {
      const t = species!.taxonomy
      return `${t.domain} > ${t.kingdom} > ${t.phylum} > ${t.class} > ${t.order} > ${t.family} > ${t.genus} > ${t.species}`
    }
    if (key === 'whyClass') {
      const className = species!.taxonomy.class
      const explanation = CLASS_DESCRIPTIONS[className]
      return explanation
        ? `${species!.koreanName}은(는) ${className}에 속해요. ${explanation}`
        : `${species!.koreanName}은(는) ${className}에 속해요.`
    }
    return species![key]
  }

  function toggleTag(tag: string) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  async function handleSave() {
    try {
      const { queued } = await queueOrSend('/api/observations', {
        code,
        nickname,
        speciesId: species!.id,
        speciesName: species!.koreanName,
        description: species!.features,
        note: note.trim() || null,
        tags,
      })
      setSaved(true)
      setSaveQueued(queued)
    } catch {
      setSaveError('저장에 실패했어요. 다시 시도해주세요')
    }
  }

  return (
    <main className="min-h-screen max-w-md mx-auto flex flex-col">
      <div
        className="relative shrink-0 flex flex-col items-center justify-end gap-2.5 px-6 pb-7 pt-9 text-white"
        style={{ background: 'linear-gradient(160deg, oklch(0.66 0.1 150) 0%, oklch(0.5 0.12 150) 100%)' }}
      >
        <a
          href={`/student/scan?code=${code}&nickname=${nickname}`}
          className="absolute top-5 left-5 w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <div className="relative w-24 h-24 rounded-[28px] bg-white flex items-center justify-center shadow-[0_12px_26px_-10px_oklch(0.3_0.08_150_/_0.5)] border-4 border-white/50 overflow-hidden">
          {photo ? (
            <Image src={photo.url} alt={species.koreanName} fill sizes="96px" className="object-cover" />
          ) : (
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
              <circle cx="7" cy="12" r="2" stroke="var(--color-forest-deep)" strokeWidth="1.6" />
              <circle cx="11" cy="9" r="1.8" stroke="var(--color-forest-deep)" strokeWidth="1.6" />
              <circle cx="15" cy="9" r="1.8" stroke="var(--color-forest-deep)" strokeWidth="1.6" />
              <ellipse cx="12" cy="15.5" rx="5" ry="3.6" stroke="var(--color-forest-deep)" strokeWidth="1.6" />
            </svg>
          )}
        </div>
        <div className="text-center">
          <p className="font-display text-2xl">{species.koreanName}</p>
          <p className="text-[13px] italic opacity-90 mt-0.5">{species.scientificName}</p>
          {photo && <PhotoCredit photo={photo} className="text-white block mt-1" />}
        </div>
      </div>

      {!revealed && guessChoices ? (
        <div className="flex-1 px-6 pt-7 pb-6 flex flex-col gap-4">
          <div className="text-center">
            <p className="text-[13px] font-extrabold text-[color:var(--color-forest-deep)]">먼저 추측해볼까요?</p>
            <p className="font-display text-xl mt-2">이 친구는 어느 무리(강)일까요?</p>
          </div>

          {photo && (
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_10px_22px_-12px_oklch(0.35_0.08_150_/_0.35)]">
              <Image src={photo.url} alt={species.koreanName} fill sizes="400px" className="object-cover" />
            </div>
          )}

          <div className="flex flex-col gap-2.5">
            {guessChoices.choices.map((choice, i) => {
              const isPicked = guessPicked === i
              const isCorrectChoice = guessPicked !== null && i === guessChoices.correctIndex
              return (
                <button
                  key={choice}
                  onClick={() => setGuessPicked(i)}
                  disabled={guessPicked !== null}
                  className="min-h-[58px] rounded-2xl bg-white flex flex-col items-center justify-center gap-0.5 py-2.5 shadow-[0_6px_14px_-10px_oklch(0.35_0.08_150_/_0.3)]"
                  style={
                    isCorrectChoice
                      ? { background: 'var(--color-forest-soft)', boxShadow: '0 0 0 2px var(--color-forest-deep) inset' }
                      : isPicked
                        ? { background: 'var(--color-coral-soft)', boxShadow: '0 0 0 2px var(--color-coral) inset' }
                        : undefined
                  }
                >
                  <span className="font-bold text-[14.5px]">{choice}</span>
                  {CLASS_HINTS[choice] && <span className="text-[11.5px] text-neutral-500 text-center px-3">{CLASS_HINTS[choice]}</span>}
                </button>
              )
            })}
          </div>

          {guessPicked !== null && (
            <p className={guessPicked === guessChoices.correctIndex ? 'text-center font-bold text-[color:var(--color-forest-deep)]' : 'text-center font-bold text-[color:var(--color-coral)]'}>
              {guessPicked === guessChoices.correctIndex ? '정답이에요!' : `아쉬워요. 정답은 ${guessChoices.choices[guessChoices.correctIndex]}`}
            </p>
          )}

          <div className="mt-auto flex flex-col gap-2 items-center">
            {guessPicked !== null && (
              <button
                onClick={() => setRevealed(true)}
                className="w-full h-[54px] rounded-2xl text-white font-display text-[17px]"
                style={{ background: 'linear-gradient(180deg, var(--color-sun) 0%, var(--color-sun-deep) 100%)' }}
              >
                정보 보러 가기
              </button>
            )}
            <button onClick={() => setRevealed(true)} className="text-[13px] font-bold text-neutral-400 underline">
              그냥 볼래요
            </button>
          </div>
        </div>
      ) : (
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6 flex flex-col gap-4">
        <div>
          <p className="text-[13px] font-extrabold text-neutral-500 mb-2.5">궁금한 걸 눌러보세요</p>
          <div className="flex flex-wrap gap-2">
            {CHIPS.map((c) => (
              <button
                key={c.key}
                onClick={() => ask(c.key)}
                className="h-[38px] px-4 rounded-full text-[13.5px] font-bold"
                style={{ background: c.bg, color: c.fg }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {answers.map((key) => (
            <div
              key={key}
              className="bg-white rounded-2xl rounded-tl-[4px] p-3.5 text-[13.5px] leading-relaxed shadow-[0_6px_14px_-10px_oklch(0.35_0.08_150_/_0.35)]"
            >
              <p className="font-extrabold text-[13px] text-[color:var(--color-forest-deep)] mb-1">{CHIP_QUESTION_LABEL[key]}</p>
              {answerText(key)}
            </div>
          ))}
        </div>

        {!saved && (
          <div className="flex flex-col gap-2.5">
            <div>
              <p className="text-[13px] font-extrabold text-neutral-500 mb-2">무엇이 눈에 띄었나요? (선택)</p>
              <div className="flex flex-wrap gap-1.5">
                {OBSERVATION_TAGS.map((tag) => {
                  const active = tags.includes(tag)
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className="h-[32px] px-3.5 rounded-full text-[12.5px] font-bold"
                      style={active ? { background: 'var(--color-forest-deep)', color: 'white' } : { background: 'white', color: 'var(--color-forest-deep)', boxShadow: '0 0 0 1.5px var(--color-forest-soft) inset' }}
                    >
                      {tag}
                    </button>
                  )
                })}
              </div>
            </div>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="예: 나무 위에 앉아 있었어요"
              className="h-12 rounded-2xl bg-white px-4 text-[13.5px] shadow-[0_6px_14px_-10px_oklch(0.35_0.08_150_/_0.3)] focus:outline-none"
            />
          </div>
        )}

        <div className="mt-auto flex flex-col gap-2.5 pt-2">
          {saveError && <p className="text-[color:var(--color-coral)] text-sm text-center">{saveError}</p>}
          {saved && saveQueued && (
            <p className="text-[12.5px] text-center text-neutral-500">오프라인 상태라 연결되면 자동으로 저장돼요</p>
          )}
          <button
            onClick={handleSave}
            disabled={saved}
            className="h-[58px] rounded-2xl text-white font-display text-[17px] flex items-center justify-center gap-2 shadow-[0_10px_20px_-8px_oklch(0.62_0.17_55_/_0.5)] disabled:opacity-70"
            style={{ background: 'linear-gradient(180deg, var(--color-sun) 0%, var(--color-sun-deep) 100%)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 3h12v18l-6-4-6 4V3Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            {saved ? (saveQueued ? '저장 대기 중' : '저장됨') : '내 기록에 저장'}
          </button>
          <div className="flex gap-2.5">
            <a
              href={`/student/scan?code=${code}&nickname=${nickname}`}
              className="flex-1 h-[50px] rounded-2xl bg-white border-[1.5px] border-forest-soft flex items-center justify-center gap-1.5 font-bold text-[13.5px] text-[color:var(--color-forest-deep)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="var(--color-forest-deep)" strokeWidth="1.8" />
                <path d="m20 20-3.5-3.5" stroke="var(--color-forest-deep)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              다른 생물 찾기
            </a>
            <a
              href={`/student/records?code=${code}&nickname=${nickname}`}
              className="flex-1 h-[50px] rounded-2xl bg-white border-[1.5px] border-forest-soft flex items-center justify-center gap-1.5 font-bold text-[13.5px] text-[color:var(--color-forest-deep)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 3h12v18l-6-4-6 4V3Z" stroke="var(--color-forest-deep)" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
              내 기록 보기
            </a>
          </div>
        </div>
      </div>
      )}
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
