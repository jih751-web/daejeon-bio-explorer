import { NextRequest, NextResponse } from 'next/server'
import { getFirestoreAdmin } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(req: NextRequest) {
  const { code, text } = await req.json()
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })

  const db = getFirestoreAdmin()
  await db.collection('sessions').doc(code).set(
    {
      announcement: text ?? null,
      announcementAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  )

  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })

  const db = getFirestoreAdmin()
  const doc = await db.collection('sessions').doc(code).get()
  const data = doc.data()

  return NextResponse.json({
    text: data?.announcement ?? null,
    updatedAt: data?.announcementAt?.toDate?.().toISOString() ?? null,
  })
}
