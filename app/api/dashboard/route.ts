import { NextRequest, NextResponse } from 'next/server'
import { getFirestoreAdmin } from '@/lib/firebase'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })

  const db = getFirestoreAdmin()

  const obsSnapshot = await db.collection('observations').where('code', '==', code).get()
  const quizSnapshot = await db.collection('quizResults').where('code', '==', code).get()

  const studentMap = new Map<string, number>()
  const speciesMap = new Map<string, number>()
  for (const doc of obsSnapshot.docs) {
    const { nickname, speciesName } = doc.data()
    studentMap.set(nickname, (studentMap.get(nickname) ?? 0) + 1)
    speciesMap.set(speciesName, (speciesMap.get(speciesName) ?? 0) + 1)
  }

  const students = [...studentMap.entries()]
    .map(([nickname, observationCount]) => ({ nickname, observationCount }))
    .sort((a, b) => b.observationCount - a.observationCount)

  const speciesRanking = [...speciesMap.entries()]
    .map(([speciesName, count]) => ({ speciesName, count }))
    .sort((a, b) => b.count - a.count)

  const total = quizSnapshot.size
  const correct = quizSnapshot.docs.filter((doc) => doc.data().isCorrect).length
  const quizAccuracy = total === 0 ? 0 : Math.round((correct / total) * 100)

  return NextResponse.json({ students, speciesRanking, quizAccuracy })
}
