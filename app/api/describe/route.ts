import { NextRequest, NextResponse } from 'next/server'
import { describeFromNaris } from '@/lib/naris'
import { describeFromWikipedia } from '@/lib/wikipedia'
import { Description } from '@/lib/types'

export async function POST(req: NextRequest) {
  const { scientificName, koreanName } = await req.json()
  if (!scientificName) return NextResponse.json({ error: 'scientificName required' }, { status: 400 })

  const narisResult = await describeFromNaris(scientificName).catch(() => null)
  if (narisResult) return NextResponse.json(narisResult)

  const wikiResult = await describeFromWikipedia(koreanName ?? scientificName).catch(() => null)
  if (wikiResult) return NextResponse.json(wikiResult)

  const fallback: Description = { source: 'none', text: null }
  return NextResponse.json(fallback)
}
