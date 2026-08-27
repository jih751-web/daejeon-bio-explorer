'use client'
import { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { buildQuizQuestions, QuizQuestion } from '@/lib/quiz'
import { QuizResult } from '@/lib/types'
import { computeBadges, Badge } from '@/lib/badges'
import { BadgeList } from '@/components/BadgeList'
import { queueOrSend } from '@/lib/offlineQueue'
import { getSpeciesPhoto } from '@/lib/speciesPhoto'

function QuizContent() {
  const params = useSearchParams()
  const code = params.get('code')!
  const nickname = params.get('nickname')!

  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [pickedIndex, setPickedIndex] = useState<number | null>(null)
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([])

  useEffect(() => {
    fetch(`/api/observations?code=${code}&nickname=${nickname}`)
      .then((r) => r.json())
      .then((data) => setQuestions(buildQuizQuestions(data.observations ?? [])))
      .catch(() => setError('문제가 발생했어요. 다시 시도해주세요'))
  }, [code, nickname])

  useEffect(() => {
    if (questions.length === 0 || index < questions.length) return
    fetch(`/api/quiz?code=${code}&nickname=${nickname}`)
      .then((r) => r.json())
      .then((data: { quizResults?: QuizResult[] }) => {
        const observations = questions.map((q) => q.observation)
        const badges = computeBadges({ observations, quizResults: data.quizResults ?? [] })
        setEarnedBadges(badges.filter((b) => b.category === 'quiz'))
      })
      .catch(() => {})
  }, [index, questions, code, nickname])

  async function handleAnswer(choiceIndex: number) {
    const q = questions[index]
    const isCorrect = choiceIndex === q.correctIndex
    setFeedback(isCorrect ? 'correct' : 'wrong')
    setPickedIndex(choiceIndex)
    if (isCorrect) setCorrectCount((c) => c + 1)

    try {
      await queueOrSend('/api/quiz', { code, nickname, observationId: q.observation.id, questionType: q.type, isCorrect })
    } catch {
      // Silently ignore answer submission failures to avoid blocking the quiz.
      // The student's score record for this question will be lost, but they can continue.
    }
  }

  function handleNext() {
    setFeedback(null)
    setPickedIndex(null)
    setIndex((i) => i + 1)
  }

  if (error) return <main className="p-8 text-center text-[color:var(--color-coral)]">{error}</main>
  if (questions.length === 0)
    return <main className="p-8 text-center text-neutral-500">아직 저장한 기록이 없어요. 생물을 찾아서 먼저 저장해보세요</main>
  if (index >= questions.length) {
    return (
      <main className="min-h-screen max-w-md mx-auto flex flex-col items-center justify-center gap-3 px-8 text-center">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l2.9 6 6.6.6-5 4.5 1.5 6.5L12 16.8 6 19.6l1.5-6.5-5-4.5 6.6-.6L12 2Z" stroke="var(--color-sun-deep)" strokeWidth="1.4" strokeLinejoin="round" fill="var(--color-sun-soft)" />
        </svg>
        <p className="font-display text-2xl text-[color:var(--color-forest-deep)]">퀴즈 완료!</p>
        <p className="text-neutral-500">{questions.length}문제 중 {correctCount}개 맞혔어요</p>
        {earnedBadges.length > 0 && (
          <div className="w-full pt-2">
            <p className="text-[13px] font-extrabold text-neutral-500 mb-2">이번 퀴즈로 딴 배지</p>
            <BadgeList badges={earnedBadges} />
          </div>
        )}
        <a
          href={`/student/records?code=${code}&nickname=${nickname}`}
          className="mt-2 text-[13.5px] font-bold text-[color:var(--color-forest-deep)] underline"
        >
          내 기록에서 전체 배지 보기
        </a>
      </main>
    )
  }

  const q = questions[index]
  const letters = ['A', 'B', 'C', 'D']
  const letterColors = ['var(--color-forest-deep)', 'var(--color-sky)', 'var(--color-coral)', 'var(--color-violet)']
  // 종 맞히기 문제는 정답(생물 이름)이 드러나므로 사진을 보여주지 않는다 — 강 맞히기 문제만 사진을 보여준다.
  const photo = q.type === 'class' ? getSpeciesPhoto(q.observation.speciesId) : null

  return (
    <main className="min-h-screen max-w-md mx-auto flex flex-col">
      <div className="px-6 pt-6 flex items-center gap-3 shrink-0">
        <div className="flex-1 flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-2 rounded-full"
              style={{ background: i < index ? 'var(--color-forest-deep)' : 'var(--color-forest-soft)' }}
            />
          ))}
        </div>
        <div className="flex items-center gap-1 bg-[color:var(--color-sun-deep)] text-white text-[13px] font-extrabold px-3 py-1.5 rounded-full">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l2.9 6 6.6.6-5 4.5 1.5 6.5L12 16.8 6 19.6l1.5-6.5-5-4.5 6.6-.6L12 2Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          {correctCount}/{questions.length}
        </div>
      </div>

      <div className="px-7 pt-6 pb-2 text-center shrink-0">
        <p className="text-[13px] font-extrabold text-[color:var(--color-forest-deep)]">{index + 1}번째 문제</p>
        <p className="font-display text-xl mt-2 leading-snug">
          {q.type === 'class' ? (
            '이 동물은 어느 무리(강)에 속할까요?'
          ) : q.observation.description ? (
            <>
              이 특징을 가진 생물은?
              <br />
              <span className="font-sans font-normal text-[15px] text-neutral-600">
                {q.observation.description.replaceAll(q.observation.speciesName, '○○○')}
              </span>
            </>
          ) : (
            '이 생물은 무엇일까요?'
          )}
        </p>
      </div>

      <div className="mx-7 mt-3.5 bg-white rounded-3xl p-5 flex flex-col items-center gap-2 shadow-[0_10px_22px_-12px_oklch(0.35_0.08_150_/_0.35)] shrink-0">
        <div className="relative w-[84px] h-[84px] rounded-[26px] bg-sky-soft flex items-center justify-center overflow-hidden">
          {photo ? (
            <Image src={photo.url} alt="" fill sizes="84px" className="object-cover" />
          ) : (
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
              <path d="M4 13c3-6 13-6 16 0-3 2-13 2-16 0Z" stroke="var(--color-sky)" strokeWidth="1.6" />
            </svg>
          )}
        </div>
        <p className="font-extrabold text-[15px]">
          {q.type === 'class' ? q.observation.speciesName : q.observation.speciesName.replaceAll(/./g, '?')}
        </p>
      </div>

      <div className="px-7 pt-5 pb-7 flex flex-col gap-3 flex-1">
        {q.choices.map((choice, i) => {
          const isPicked = pickedIndex === i
          const isCorrectChoice = feedback !== null && i === q.correctIndex
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={feedback !== null}
              className="h-[58px] rounded-2xl bg-white flex items-center gap-3.5 px-4 font-bold text-[14.5px] shadow-[0_6px_14px_-10px_oklch(0.35_0.08_150_/_0.3)] disabled:opacity-90"
              style={
                isCorrectChoice
                  ? { background: 'var(--color-forest-soft)', boxShadow: '0 0 0 2px var(--color-forest-deep) inset' }
                  : isPicked
                    ? { background: 'var(--color-coral-soft)', boxShadow: '0 0 0 2px var(--color-coral) inset' }
                    : undefined
              }
            >
              <span
                className="w-8 h-8 rounded-[10px] flex items-center justify-center font-display text-[15px] text-white shrink-0"
                style={{ background: letterColors[i % letterColors.length] }}
              >
                {letters[i]}
              </span>
              {choice}
            </button>
          )
        })}
      </div>

      {feedback && (
        <div className="px-7 pb-7 flex flex-col gap-3 items-center shrink-0">
          <p className={feedback === 'correct' ? 'text-[color:var(--color-forest-deep)] font-bold' : 'text-[color:var(--color-coral)] font-bold'}>
            {feedback === 'correct' ? '정답이에요!' : `아쉬워요. 정답은 ${q.choices[q.correctIndex]}`}
          </p>
          <button
            onClick={handleNext}
            className="w-full h-[54px] rounded-2xl text-white font-display text-[17px] flex items-center justify-center"
            style={{ background: 'linear-gradient(180deg, var(--color-sun) 0%, var(--color-sun-deep) 100%)' }}
          >
            다음 문제
          </button>
        </div>
      )}
    </main>
  )
}

export default function QuizPage() {
  return (
    <Suspense fallback={<main className="p-8 text-center">로딩 중...</main>}>
      <QuizContent />
    </Suspense>
  )
}
