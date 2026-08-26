import { SPECIES, findSpeciesById } from '@/data/species'
import { Observation, QuizResult } from './types'

export type BadgeCategory = 'discovery' | 'quiz' | 'special'

export interface Badge {
  id: string
  name: string
  tier: string | null
  description: string
  category: BadgeCategory
}

const TIER_NAMES = ['브론즈', '실버', '골드']

/** 강(class)별 전체 종 수와, 종 수에 비례한 티어 임계값(브론즈/실버/골드)을 계산한다. */
function buildClassThresholds(): Map<string, { total: number; tiers: { tier: string; count: number }[] }> {
  const totals = new Map<string, number>()
  for (const s of SPECIES) {
    totals.set(s.taxonomy.class, (totals.get(s.taxonomy.class) ?? 0) + 1)
  }

  const result = new Map<string, { total: number; tiers: { tier: string; count: number }[] }>()
  for (const [className, total] of totals) {
    const raw = [
      Math.max(1, Math.ceil(total * 0.1)),
      Math.max(1, Math.ceil(total * 0.25)),
      Math.max(1, Math.ceil(total * 0.5)),
    ]
    const uniqueCounts = [...new Set(raw.map((n) => Math.min(n, total)))].sort((a, b) => a - b)
    const tiers = uniqueCounts.map((count, i) => ({ tier: TIER_NAMES[i] ?? TIER_NAMES[TIER_NAMES.length - 1], count }))
    result.set(className, { total, tiers })
  }
  return result
}

const CLASS_THRESHOLDS = buildClassThresholds()

const AQUATIC_CLASSES = ['조기어강', '경골어강', '연골어강']

function distinctSpeciesIds(observations: Observation[]): Set<string> {
  return new Set(observations.map((o) => o.speciesId))
}

function speciesClassCounts(observations: Observation[]): Map<string, Set<string>> {
  const byClass = new Map<string, Set<string>>()
  for (const speciesId of distinctSpeciesIds(observations)) {
    const className = findSpeciesById(speciesId)?.taxonomy.class
    if (!className) continue
    if (!byClass.has(className)) byClass.set(className, new Set())
    byClass.get(className)!.add(speciesId)
  }
  return byClass
}

function classMasterBadges(observations: Observation[]): Badge[] {
  const byClass = speciesClassCounts(observations)
  const badges: Badge[] = []
  for (const [className, found] of byClass) {
    const info = CLASS_THRESHOLDS.get(className)
    if (!info) continue
    const earnedTier = [...info.tiers].reverse().find((t) => found.size >= t.count)
    if (earnedTier) {
      badges.push({
        id: `class-master-${className}`,
        name: `${className} 마스터`,
        tier: earnedTier.tier,
        description: `${className}에서 ${found.size}종을 찾았어요 (${info.total}종 중).`,
        category: 'discovery',
      })
    }
  }
  return badges
}

function classifierExplorerBadge(observations: Observation[]): Badge | null {
  const distinctClasses = speciesClassCounts(observations).size
  const tiers = [
    { tier: TIER_NAMES[2], count: 8 },
    { tier: TIER_NAMES[1], count: 5 },
    { tier: TIER_NAMES[0], count: 3 },
  ]
  const earned = tiers.find((t) => distinctClasses >= t.count)
  if (!earned) return null
  return {
    id: 'classifier-explorer',
    name: '분류 탐험가',
    tier: earned.tier,
    description: `서로 다른 강(class) ${distinctClasses}개를 발견했어요.`,
    category: 'discovery',
  }
}

function invertebratePioneerBadge(observations: Observation[]): Badge | null {
  const nonChordates = [...distinctSpeciesIds(observations)].filter(
    (id) => findSpeciesById(id)?.taxonomy.phylum !== '척삭동물문'
  )
  if (nonChordates.length < 3) return null
  return {
    id: 'invertebrate-pioneer',
    name: '무척추 개척자',
    tier: null,
    description: `척추동물이 아닌 생물을 ${nonChordates.length}종 발견했어요.`,
    category: 'discovery',
  }
}

function siblingFinderBadge(observations: Observation[]): Badge | null {
  const byClass = new Map<string, Set<string>>()
  for (const speciesId of distinctSpeciesIds(observations)) {
    const species = findSpeciesById(speciesId)
    if (!species) continue
    const key = species.taxonomy.class
    if (!byClass.has(key)) byClass.set(key, new Set())
    byClass.get(key)!.add(species.taxonomy.order)
  }
  const match = [...byClass.entries()].find(([, orders]) => orders.size >= 3)
  if (!match) return null
  return {
    id: 'sibling-finder',
    name: '형제 찾기',
    tier: null,
    description: `${match[0]} 안에서 서로 다른 목(order)을 ${match[1].size}개 발견했어요.`,
    category: 'discovery',
  }
}

function aquaticExplorerBadge(observations: Observation[]): Badge | null {
  const found = new Set(
    [...distinctSpeciesIds(observations)]
      .map((id) => findSpeciesById(id)?.taxonomy.class)
      .filter((c): c is string => !!c && AQUATIC_CLASSES.includes(c))
  )
  if (found.size < 2) return null
  return {
    id: 'aquatic-explorer',
    name: '물 만난 탐험가',
    tier: null,
    description: `어류 계열(${[...found].join('·')})에서 두루 발견했어요.`,
    category: 'discovery',
  }
}

function fieldGuideBadge(observations: Observation[]): Badge | null {
  const count = distinctSpeciesIds(observations).size
  const percent = (count / SPECIES.length) * 100
  const tiers = [
    { tier: TIER_NAMES[2], pct: 20 },
    { tier: TIER_NAMES[1], pct: 10 },
    { tier: TIER_NAMES[0], pct: 5 },
  ]
  const earned = tiers.find((t) => percent >= t.pct)
  if (!earned) return null
  return {
    id: 'field-guide',
    name: '도감 완성도',
    tier: earned.tier,
    description: `전체 ${SPECIES.length}종 중 ${count}종을 도감에 채웠어요.`,
    category: 'discovery',
  }
}

function lightningExpeditionBadge(observations: Observation[]): Badge | null {
  const times = observations
    .map((o) => (o.createdAt ? new Date(o.createdAt).getTime() : null))
    .filter((t): t is number => t !== null)
    .sort((a, b) => a - b)

  for (let i = 0; i + 4 < times.length; i++) {
    if (times[i + 4] - times[i] <= 10 * 60 * 1000) {
      return {
        id: 'lightning-expedition',
        name: '번개 탐사',
        tier: null,
        description: '10분 안에 5종을 발견했어요.',
        category: 'discovery',
      }
    }
  }
  return null
}

function firstStepBadge(observations: Observation[]): Badge | null {
  if (observations.length === 0) return null
  return {
    id: 'first-step',
    name: '첫 발자국',
    tier: null,
    description: '첫 생물을 기록에 저장했어요.',
    category: 'discovery',
  }
}

function firstFinderBadge(observations: Observation[], allClassObservations: Observation[]): Badge | null {
  if (allClassObservations.length === 0) return null

  const earliestByspecies = new Map<string, { nickname: string; time: number }>()
  for (const o of allClassObservations) {
    if (!o.createdAt) continue
    const time = new Date(o.createdAt).getTime()
    const current = earliestByspecies.get(o.speciesId)
    if (!current || time < current.time) {
      earliestByspecies.set(o.speciesId, { nickname: o.nickname, time })
    }
  }

  const nickname = observations[0]?.nickname
  if (!nickname) return null
  const firstCount = [...earliestByspecies.values()].filter((v) => v.nickname === nickname).length
  if (firstCount === 0) return null
  return {
    id: 'first-finder',
    name: '첫 발견자',
    tier: null,
    description: `학급에서 가장 먼저 발견한 생물이 ${firstCount}종 있어요.`,
    category: 'discovery',
  }
}

function classCollabBadge(allClassObservations: Observation[]): Badge | null {
  const distinctCount = distinctSpeciesIds(allClassObservations).size
  const tiers = [
    { tier: TIER_NAMES[1], count: 100 },
    { tier: TIER_NAMES[0], count: 50 },
  ]
  const earned = tiers.find((t) => distinctCount >= t.count)
  if (!earned) return null
  return {
    id: 'class-collab',
    name: '학급 합동',
    tier: earned.tier,
    description: `우리 학급이 함께 ${distinctCount}종을 발견했어요.`,
    category: 'special',
  }
}

function quizChallengerBadges(quizResults: QuizResult[]): Badge[] {
  if (quizResults.length === 0) return []
  const badges: Badge[] = []

  badges.push({
    id: 'quiz-participant',
    name: '퀴즈 도전자',
    tier: TIER_NAMES[0],
    description: '퀴즈에 처음 도전했어요.',
    category: 'quiz',
  })

  const sorted = [...quizResults].sort(
    (a, b) => (a.answeredAt ? new Date(a.answeredAt).getTime() : 0) - (b.answeredAt ? new Date(b.answeredAt).getTime() : 0)
  )
  let maxStreak = 0
  let streak = 0
  for (const r of sorted) {
    streak = r.isCorrect ? streak + 1 : 0
    maxStreak = Math.max(maxStreak, streak)
  }
  if (maxStreak >= 5) {
    badges.push({
      id: 'quiz-streak',
      name: '퀴즈 도전자',
      tier: TIER_NAMES[1],
      description: `${maxStreak}문제를 연속으로 맞혔어요.`,
      category: 'quiz',
    })
  }

  const total = quizResults.length
  const correct = quizResults.filter((r) => r.isCorrect).length
  if (total >= 10 && correct / total >= 0.8) {
    badges.push({
      id: 'quiz-accuracy',
      name: '퀴즈 도전자',
      tier: TIER_NAMES[2],
      description: `${total}문제 중 ${correct}문제를 맞혔어요 (정답률 ${Math.round((correct / total) * 100)}%).`,
      category: 'quiz',
    })
  }

  return badges
}

function perfectRunBadge(quizResults: QuizResult[]): Badge | null {
  if (quizResults.length < 5) return null
  if (!quizResults.every((r) => r.isCorrect)) return null
  return {
    id: 'perfect-run',
    name: '퍼펙트 런',
    tier: null,
    description: `${quizResults.length}문제를 전부 맞혔어요.`,
    category: 'quiz',
  }
}

function wrongAnswerRecoveryBadge(quizResults: QuizResult[], observations: Observation[]): Badge | null {
  const speciesByObservation = new Map(observations.map((o) => [o.id, o.speciesId]))
  const bySpecies = new Map<string, { isCorrect: boolean; time: number }[]>()

  for (const r of quizResults) {
    const speciesId = speciesByObservation.get(r.observationId)
    if (!speciesId || !r.answeredAt) continue
    if (!bySpecies.has(speciesId)) bySpecies.set(speciesId, [])
    bySpecies.get(speciesId)!.push({ isCorrect: r.isCorrect, time: new Date(r.answeredAt).getTime() })
  }

  for (const attempts of bySpecies.values()) {
    const sorted = [...attempts].sort((a, b) => a.time - b.time)
    const firstWrongIndex = sorted.findIndex((a) => !a.isCorrect)
    if (firstWrongIndex === -1) continue
    if (sorted.slice(firstWrongIndex + 1).some((a) => a.isCorrect)) {
      return {
        id: 'wrong-answer-recovery',
        name: '오답 복구',
        tier: null,
        description: '틀렸던 문제를 다시 도전해서 맞혔어요.',
        category: 'quiz',
      }
    }
  }
  return null
}

function hiddenBadges(observations: Observation[]): Badge[] {
  const badges: Badge[] = []

  const fossilHunter = [...distinctSpeciesIds(observations)].some((id) => {
    const className = findSpeciesById(id)?.taxonomy.class
    return className && CLASS_THRESHOLDS.get(className)?.total === 1
  })
  if (fossilHunter) {
    badges.push({
      id: 'hidden-fossil-hunter',
      name: '화석 사냥꾼',
      tier: null,
      description: '이 대륙에 단 하나뿐인 무리를 찾아냈어요.',
      category: 'special',
    })
  }

  const counts = new Map<string, number>()
  for (const o of observations) counts.set(o.speciesId, (counts.get(o.speciesId) ?? 0) + 1)
  if ([...counts.values()].some((c) => c >= 3)) {
    badges.push({
      id: 'hidden-regular',
      name: '단골손님',
      tier: null,
      description: '같은 생물을 세 번 넘게 다시 찾아왔어요.',
      category: 'special',
    })
  }

  return badges
}

export interface ComputeBadgesInput {
  observations: Observation[]
  quizResults: QuizResult[]
  allClassObservations?: Observation[]
}

export function computeBadges({ observations, quizResults, allClassObservations = [] }: ComputeBadgesInput): Badge[] {
  const badges: Badge[] = [
    ...classMasterBadges(observations),
    classifierExplorerBadge(observations),
    invertebratePioneerBadge(observations),
    siblingFinderBadge(observations),
    aquaticExplorerBadge(observations),
    fieldGuideBadge(observations),
    lightningExpeditionBadge(observations),
    firstStepBadge(observations),
    firstFinderBadge(observations, allClassObservations.length > 0 ? allClassObservations : observations),
    classCollabBadge(allClassObservations.length > 0 ? allClassObservations : observations),
    ...quizChallengerBadges(quizResults),
    perfectRunBadge(quizResults),
    wrongAnswerRecoveryBadge(quizResults, observations),
    ...hiddenBadges(observations),
  ].filter((b): b is Badge => b !== null)

  return badges
}
