import { NextRequest, NextResponse } from 'next/server'
import { getFirestoreAdmin } from '@/lib/firebase-admin'
import { generateSessionCode } from '@/lib/sessionCode'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(req: NextRequest) {
  const { teacherName } = await req.json().catch(() => ({ teacherName: undefined }))
  const db = getFirestoreAdmin()

  let code = generateSessionCode()
  for (let attempt = 0; attempt < 5; attempt++) {
    const doc = await db.collection('sessions').doc(code).get()
    if (!doc.exists) break
    code = generateSessionCode()
  }

  await db.collection('sessions').doc(code).set({
    teacherName: teacherName ?? null,
    createdAt: FieldValue.serverTimestamp(),
  })
  return NextResponse.json({ code })
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })

  const db = getFirestoreAdmin()
  const doc = await db.collection('sessions').doc(code).get()
  return NextResponse.json({ exists: doc.exists })
}
