import { NextRequest, NextResponse } from 'next/server'
import { getFirestoreAdmin } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(req: NextRequest) {
  const { code, nickname, phase, answers } = await req.json()
  if (!code || !nickname || (phase !== 'pre' && phase !== 'post')) {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 })
  }
  const db = getFirestoreAdmin()

  await db.collection('surveyResponses').add({
    code,
    nickname,
    phase,
    answers: answers ?? {},
    submittedAt: FieldValue.serverTimestamp(),
  })

  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const nickname = req.nextUrl.searchParams.get('nickname')
  const phase = req.nextUrl.searchParams.get('phase')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })

  const db = getFirestoreAdmin()
  let query = db.collection('surveyResponses').where('code', '==', code)
  if (nickname) query = query.where('nickname', '==', nickname)
  if (phase === 'pre' || phase === 'post') query = query.where('phase', '==', phase)

  const snapshot = await query.get()
  const responses = snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      code: data.code,
      nickname: data.nickname,
      phase: data.phase,
      answers: data.answers ?? {},
      submittedAt: data.submittedAt?.toDate?.().toISOString() ?? null,
    }
  })

  return NextResponse.json({ responses })
}
