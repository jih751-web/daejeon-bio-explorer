import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'
import { generateSessionCode } from '@/lib/sessionCode'

export async function POST(req: NextRequest) {
  const { teacherName } = await req.json().catch(() => ({ teacherName: undefined }))
  const supabase = getSupabaseServerClient()

  let code = generateSessionCode()
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data } = await supabase.from('sessions').select('code').eq('code', code).maybeSingle()
    if (!data) break
    code = generateSessionCode()
  }

  const { error } = await supabase.from('sessions').insert({ code, teacher_name: teacherName ?? null })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ code })
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })

  const supabase = getSupabaseServerClient()
  const { data } = await supabase.from('sessions').select('code').eq('code', code).maybeSingle()
  return NextResponse.json({ exists: !!data })
}
