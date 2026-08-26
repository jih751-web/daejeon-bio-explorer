import { Badge } from '@/lib/badges'

const CATEGORY_COLORS: Record<Badge['category'], { bg: string; fg: string }> = {
  discovery: { bg: 'var(--color-forest-soft)', fg: 'var(--color-forest-deep)' },
  quiz: { bg: 'var(--color-sky-soft)', fg: 'var(--color-sky)' },
  special: { bg: 'var(--color-sun-soft)', fg: 'var(--color-sun-deep)' },
}

const TIER_RING: Record<string, string> = {
  브론즈: 'oklch(0.6 0.1 55)',
  실버: 'oklch(0.75 0.01 250)',
  골드: 'oklch(0.78 0.16 80)',
}

export function BadgeList({ badges }: { badges: Badge[] }) {
  if (badges.length === 0) {
    return <p className="text-neutral-500 text-sm">아직 획득한 배지가 없어요. 계속 탐사해보세요!</p>
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {badges.map((badge) => {
        const color = CATEGORY_COLORS[badge.category]
        const ring = badge.tier ? TIER_RING[badge.tier] : undefined
        return (
          <div
            key={`${badge.id}-${badge.tier ?? 'flat'}`}
            title={badge.description}
            className="flex items-center gap-2 rounded-full pl-1.5 pr-3.5 py-1.5"
            style={{ background: color.bg, boxShadow: ring ? `0 0 0 2px ${ring}` : undefined }}
          >
            <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2l2.9 6 6.6.6-5 4.5 1.5 6.5L12 16.8 6 19.6l1.5-6.5-5-4.5 6.6-.6L12 2Z"
                  stroke={color.fg}
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  fill={ring ? color.bg : 'none'}
                />
              </svg>
            </span>
            <span className="text-[12.5px] font-bold" style={{ color: color.fg }}>
              {badge.name}
              {badge.tier && <span className="opacity-70"> · {badge.tier}</span>}
            </span>
          </div>
        )
      })}
    </div>
  )
}
