'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { buildQuizQuestions, QuizQuestion } from '@/lib/quiz'

function QuizContent() {
  const params = useSearchParams()
  const code = params.get('code')!
  const nickname = params.get('nickname')!

  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/observations?code=${code}&nickname=${nickname}`)
      .then((r) => r.json())
      .then((data) => setQuestions(buildQuizQuestions(data.observations ?? [])))
      .catch(() => setError('문제가 발생했어요. 다시 시도해주세요'))
  }, [code, nickname])

  async function handleAnswer(choiceIndex: number) {
    const q = questions[index]
    const isCorrect = choiceIndex === q.correctIndex
    setFeedback(isCorrect ? 'correct' : 'wrong')

    try {
      await fetch('/api/quiz', {
        method: 'POST',
        body: JSON.stringify({ code, nickname, observationId: q.observation.id, isCorrect }),
      })
    } catch {
      // Silently ignore answer submission failures to avoid blocking the quiz.
      // The student's score record for this question will be lost, but they can continue.
    }
  }

  function handleNext() {
    setFeedback(null)
    setIndex((i) => i + 1)
  }

  if (error) return <main className="p-8 text-center text-red-600">{error}</main>
  if (questions.length === 0) return <main className="p-8 text-center">기록을 3개 이상 저장하면 퀴즈를 풀 수 있어요</main>
  if (index >= questions.length) return <main className="p-8 text-center text-xl font-bold">퀴즈 완료!</main>

  const q = questions[index]

  return (
    <main className="p-8 max-w-md mx-auto text-center">
      <p className="text-sm text-slate-500 mb-2">{index + 1} / {questions.length}</p>
      <p className="font-bold mb-4">
        {q.observation.description ? (
          <>이 특징을 가진 생물은?<br /><span className="font-normal text-slate-600">{q.observation.description.replaceAll(q.observation.speciesName, '○○○')}</span></>
        ) : (
          '이 생물은 무엇일까요?'
        )}
      </p>
      <div className="space-y-2">
        {q.choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={feedback !== null}
            className="w-full border rounded-lg py-3"
          >
            {choice}
          </button>
        ))}
      </div>
      {feedback && (
        <div className="mt-4">
          <p className={feedback === 'correct' ? 'text-green-600' : 'text-red-600'}>
            {feedback === 'correct' ? '정답이에요!' : `아쉬워요. 정답은 ${q.choices[q.correctIndex]}`}
          </p>
          <button onClick={handleNext} className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-3">
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
