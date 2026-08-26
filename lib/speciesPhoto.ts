import photosManifest from '@/data/speciesPhotos.json'

export interface SpeciesPhoto {
  url: string
  license: string | null
  artist: string | null
  sourceUrl: string | null
}

interface ManifestEntry {
  found: boolean
  ext?: string
  license?: string
  artist?: string
  sourceUrl?: string
}

const manifest = photosManifest as Record<string, ManifestEntry>

/** 위키백과에서 자동으로 확보한 종 사진(없으면 null). 저작자 표시가 필요한 CC 라이선스 정보도 함께 준다. */
export function getSpeciesPhoto(speciesId: string): SpeciesPhoto | null {
  const entry = manifest[speciesId]
  if (!entry?.found || !entry.ext) return null
  return {
    url: `/species-photos/${speciesId}.${entry.ext}`,
    license: entry.license ?? null,
    artist: entry.artist ?? null,
    sourceUrl: entry.sourceUrl ?? null,
  }
}
