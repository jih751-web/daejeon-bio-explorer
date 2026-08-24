import { NextRequest, NextResponse } from 'next/server'
import { identifySpecies, isLowConfidence } from '@/lib/inaturalist'

export async function POST(req: NextRequest) {
  const { photoUrl } = await req.json()
  if (!photoUrl) return NextResponse.json({ error: 'photoUrl required' }, { status: 400 })

  try {
    const candidates = await identifySpecies(photoUrl)
    return NextResponse.json({ candidates, lowConfidence: isLowConfidence(candidates) })
  } catch (err) {
    return NextResponse.json({ error: '인식에 실패했어요. 잠시 후 다시 시도해주세요' }, { status: 502 })
  }
}
