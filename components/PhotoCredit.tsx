import { SpeciesPhoto } from '@/lib/speciesPhoto'

export function PhotoCredit({ photo, className = '' }: { photo: SpeciesPhoto; className?: string }) {
  if (!photo.artist && !photo.license) return null

  const label = [photo.artist, photo.license].filter(Boolean).join(' · ')

  return (
    <a
      href={photo.sourceUrl ?? undefined}
      target="_blank"
      rel="noreferrer"
      className={`text-[10.5px] underline underline-offset-2 opacity-80 ${className}`}
    >
      사진: {label} (Wikipedia)
    </a>
  )
}
