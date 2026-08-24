import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })

  const supabase = getSupabaseServerClient()

  const { data: observations, error: obsError } = await supabase
    .from('observations')
    .select('nickname, species_name')
    .eq('code', code)

  if (obsError) return NextResponse.json({ error: obsError.message }, { status: 500 })

  const { data: quizResults, error: quizError } = await supabase
    .from('quiz_results')
    .select('is_correct')
    .eq('code', code)

  if (quizError) return NextResponse.json({ error: quizError.message }, { status: 500 })

  const studentMap = new Map<string, number>()
  const speciesMap = new Map<string, number>()
  for (const o of observations ?? []) {
    studentMap.set(o.nickname, (studentMap.get(o.nickname) ?? 0) + 1)
    speciesMap.set(o.species_name, (speciesMap.get(o.species_name) ?? 0) + 1)
  }

  const students = [...studentMap.entries()]
    .map(([nickname, observationCount]) => ({ nickname, observationCount }))
    .sort((a, b) => b.observationCount - a.observationCount)

  const speciesRanking = [...speciesMap.entries()]
    .map(([speciesName, count]) => ({ speciesName, count }))
    .sort((a, b) => b.count - a.count)

  const total = quizResults?.length ?? 0
  const correct = quizResults?.filter((q) => q.is_correct).length ?? 0
  const quizAccuracy = total === 0 ? 0 : Math.round((correct / total) * 100)

  return NextResponse.json({ students, speciesRanking, quizAccuracy })
}
