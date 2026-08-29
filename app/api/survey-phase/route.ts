import { NextRequest, NextResponse } from 'next/server'
import { getFirestoreAdmin } from '@/lib/firebase-admin'

export async function POST(req: NextRequest) {
  const { code, phase } = await req.json()
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })

  const db = getFirestoreAdmin()
  await db.collection('sessions').doc(code).set(
    { surveyPhase: phase === 'pre' || phase === 'post' ? phase : null },
    { merge: true }
  )

  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })

  const db = getFirestoreAdmin()
  const doc = await db.collection('sessions').doc(code).get()
  const phase = doc.data()?.surveyPhase
  return NextResponse.json({ phase: phase === 'pre' || phase === 'post' ? phase : null })
}
