import { NextRequest, NextResponse } from 'next/server'
import { getFirestoreAdmin } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(req: NextRequest) {
  const { code, nickname, observationId, questionType, isCorrect } = await req.json()
  const db = getFirestoreAdmin()

  await db.collection('quizResults').add({
    code,
    nickname,
    observationId,
    questionType: questionType === 'class' ? 'class' : 'species',
    isCorrect,
    answeredAt: FieldValue.serverTimestamp(),
  })

  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const nickname = req.nextUrl.searchParams.get('nickname')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })

  const db = getFirestoreAdmin()
  let query = db.collection('quizResults').where('code', '==', code)
  if (nickname) query = query.where('nickname', '==', nickname)

  const snapshot = await query.get()
  const quizResults = snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      code: data.code,
      nickname: data.nickname,
      observationId: data.observationId,
      questionType: data.questionType === 'class' ? 'class' : 'species',
      isCorrect: data.isCorrect,
      answeredAt: data.answeredAt?.toDate?.().toISOString() ?? null,
    }
  })

  return NextResponse.json({ quizResults })
}
