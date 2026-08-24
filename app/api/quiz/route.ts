import { NextRequest, NextResponse } from 'next/server'
import { getFirestoreAdmin } from '@/lib/firebase'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(req: NextRequest) {
  const { code, nickname, observationId, isCorrect } = await req.json()
  const db = getFirestoreAdmin()

  await db.collection('quizResults').add({
    code,
    nickname,
    observationId,
    isCorrect,
    answeredAt: FieldValue.serverTimestamp(),
  })

  return NextResponse.json({ ok: true })
}
