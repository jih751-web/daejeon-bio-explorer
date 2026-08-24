import { NextRequest, NextResponse } from 'next/server'
import { getFirestoreAdmin } from '@/lib/firebase'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(req: NextRequest) {
  const { code, nickname, photoUrl, speciesName, confidence, description } = await req.json()
  const db = getFirestoreAdmin()

  const ref = await db.collection('observations').add({
    code,
    nickname,
    photoUrl,
    speciesName,
    confidence,
    description: description ?? null,
    createdAt: FieldValue.serverTimestamp(),
  })

  return NextResponse.json({ id: ref.id })
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const nickname = req.nextUrl.searchParams.get('nickname')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })

  const db = getFirestoreAdmin()
  let query = db.collection('observations').where('code', '==', code).orderBy('createdAt', 'desc')
  if (nickname) query = db.collection('observations').where('code', '==', code).where('nickname', '==', nickname).orderBy('createdAt', 'desc')

  const snapshot = await query.get()
  const observations = snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      code: data.code,
      nickname: data.nickname,
      photoUrl: data.photoUrl,
      speciesName: data.speciesName,
      confidence: data.confidence,
      description: data.description,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
    }
  })

  return NextResponse.json({ observations })
}
