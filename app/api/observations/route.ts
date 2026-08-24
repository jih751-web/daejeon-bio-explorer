import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { code, nickname, photoUrl, speciesName, confidence, description } = await req.json()
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from('observations')
    .insert({
      code,
      nickname,
      photo_url: photoUrl,
      species_name: speciesName,
      confidence,
      description: description ?? null,
    })
    .select('id')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ id: data.id })
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const nickname = req.nextUrl.searchParams.get('nickname')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })

  const supabase = getSupabaseServerClient()
  let query = supabase.from('observations').select('*').eq('code', code).order('created_at', { ascending: false })
  if (nickname) query = query.eq('nickname', nickname)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // DB는 snake_case, 프런트는 Observation(camelCase)을 기대하므로 여기서 변환한다
  const observations = (data ?? []).map((row) => ({
    id: row.id,
    code: row.code,
    nickname: row.nickname,
    photoUrl: row.photo_url,
    speciesName: row.species_name,
    confidence: row.confidence,
    description: row.description,
    createdAt: row.created_at,
  }))

  return NextResponse.json({ observations })
}
