'use client'
import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { KNOWLEDGE_QUESTIONS, ATTITUDE_QUESTIONS } from '@/data/surveyQuestions'
import { findSpeciesById } from '@/data/species'
import { buildClassGuessChoices } from '@/lib/quiz'
import { queueOrSend } from '@/lib/offlineQueue'

const LIKERT = [1, 2, 3, 4, 5]

function SurveyContent() {
  const params = useSearchParams()
  const router = useRouter()
  const code = params.get('code')!
  const nickname = params.get('nickname')!
  const phase = params.get('phase') === 'post' ? 'post' : 'pre'
  const next = params.get('next') || '/student/scan'

  const [choicesByQ, setChoicesByQ] = useState<Record<string, { choices: string[]; correctIndex: number }>>({})
  const [answers, setAnswers] = useState<Record<string, string | boolean | number>>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const map: Record<string, { choices: string[]; correctIndex: number }> = {}
    for (const q of KNOWLEDGE_QUESTIONS) {
      if (q.type !== 'classId') continue
      const species = findSpeciesById(q.speciesId)
      if (species) map[q.id] = buildClassGuessChoices(species.taxonomy.class)
    }
    // buildClassGuessChoices shuffles randomly — must run client-side only (after hydration),
    // never during the server render, or the shuffled order would mismatch and break hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoicesByQ(map)
  }, [])

  const totalCount = KNOWLEDGE_QUESTIONS.length + ATTITUDE_QUESTIONS.length
  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount >= totalCount

  function setAnswer(id: string, value: string | boolean | number) {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  async function handleSubmit() {
    setSubmitting(true)
    setError(null)
    try {
      await queueOrSend('/api/survey', { code, nickname, phase, answers })
      router.push(`${next}?code=${code}&nickname=${nickname}`)
    } catch {
      setError('제출에 실패했어요. 다시 시도해주세요')
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen max-w-md mx-auto flex flex-col pb-28">
      <div
        className="shrink-0 px-6 pt-8 pb-6 text-white"
        style={{ background: 'linear-gradient(160deg, oklch(0.66 0.1 150) 0%, oklch(0.5 0.12 150) 100%)' }}
      >
        <p className="text-xs font-bold opacity-90">{phase === 'pre' ? '사전 검사' : '사후 검사'}</p>
        <h1 className="font-display text-2xl mt-1">간단한 설문에 답해주세요</h1>
        <p className="text-[13px] opacity-90 mt-1">정답이 없는 문항도 있어요. 솔직하게 답해주세요 ({answeredCount}/{totalCount})</p>
      </div>

      <div className="px-5 pt-6 flex flex-col gap-6">
        <div>
          <p className="text-[13px] font-extrabold text-neutral-500 mb-2.5">① 분류 지식</p>
          <div className="flex flex-col gap-4">
            {KNOWLEDGE_QUESTIONS.map((q, i) => {
              if (q.type === 'classId') {
                const species = findSpeciesById(q.speciesId)
                const opts = choicesByQ[q.id]
                return (
                  <div key={q.id} className="bg-white rounded-2xl p-4 shadow-[0_6px_14px_-10px_oklch(0.35_0.08_150_/_0.35)]">
                    <p className="text-[13.5px] font-bold mb-2.5">{i + 1}. {species?.koreanName}은(는) 어느 무리(강)일까요?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {opts?.choices.map((choice) => (
                        <button
                          key={choice}
                          onClick={() => setAnswer(q.id, choice)}
                          className="h-11 rounded-xl text-[13px] font-bold"
                          style={
                            answers[q.id] === choice
                              ? { background: 'var(--color-forest-deep)', color: 'white' }
                              : { background: 'var(--color-forest-soft)', color: 'var(--color-forest-deep)' }
                          }
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              }
              return (
                <div key={q.id} className="bg-white rounded-2xl p-4 shadow-[0_6px_14px_-10px_oklch(0.35_0.08_150_/_0.35)]">
                  <p className="text-[13.5px] font-bold mb-2.5">{i + 1}. {q.statement}</p>
                  <div className="flex gap-2">
                    {[true, false].map((v) => (
                      <button
                        key={String(v)}
                        onClick={() => setAnswer(q.id, v)}
                        className="flex-1 h-11 rounded-xl text-[13px] font-bold"
                        style={
                          answers[q.id] === v
                            ? { background: 'var(--color-forest-deep)', color: 'white' }
                            : { background: 'var(--color-forest-soft)', color: 'var(--color-forest-deep)' }
                        }
                      >
                        {v ? 'O (맞다)' : 'X (아니다)'}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <p className="text-[13px] font-extrabold text-neutral-500 mb-2.5">② 생각과 태도</p>
          <p className="text-[11.5px] text-neutral-400 mb-2.5">1 = 전혀 그렇지 않다 · 5 = 매우 그렇다</p>
          <div className="flex flex-col gap-4">
            {ATTITUDE_QUESTIONS.map((q, i) => (
              <div key={q.id} className="bg-white rounded-2xl p-4 shadow-[0_6px_14px_-10px_oklch(0.35_0.08_150_/_0.35)]">
                <p className="text-[13.5px] font-bold mb-2.5">{i + 1}. {q.statement}</p>
                <div className="flex gap-1.5">
                  {LIKERT.map((v) => (
                    <button
                      key={v}
                      onClick={() => setAnswer(q.id, v)}
                      className="flex-1 h-11 rounded-xl text-[13px] font-bold"
                      style={
                        answers[q.id] === v
                          ? { background: 'var(--color-sky)', color: 'white' }
                          : { background: 'var(--color-sky-soft)', color: 'var(--color-sky)' }
                      }
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-5 pb-6 pt-4 bg-background">
        {error && <p className="text-[color:var(--color-coral)] text-sm text-center mb-2">{error}</p>}
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
          className="w-full h-[58px] rounded-2xl text-white font-display text-[17px] shadow-[0_10px_20px_-8px_oklch(0.62_0.17_55_/_0.5)] disabled:opacity-50"
          style={{ background: 'linear-gradient(180deg, var(--color-sun) 0%, var(--color-sun-deep) 100%)' }}
        >
          {allAnswered ? '제출하기' : `${totalCount - answeredCount}문항 더 답해주세요`}
        </button>
      </div>
    </main>
  )
}

export default function SurveyPage() {
  return (
    <Suspense fallback={<main className="p-8 text-center">불러오는 중...</main>}>
      <SurveyContent />
    </Suspense>
  )
}
