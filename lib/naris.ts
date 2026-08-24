import { Description } from './types'

interface NarisSpeciesItem {
  scientificNameKor: string | null
  generalSpftrKor: string | null
  ecologySpftrKor: string | null
}

export async function describeFromNaris(scientificName: string): Promise<Description | null> {
  const url = new URL('https://naris.science.go.kr/openapi/selectSpeciesList.do')
  url.searchParams.set('apiKey', process.env.NARIS_API_KEY!)
  url.searchParams.set('nameOfSpecies', scientificName)

  const res = await fetch(url.toString())
  if (!res.ok) return null

  const data: { items: NarisSpeciesItem[] } = await res.json()
  const item = data.items[0]
  if (!item) return null

  const text = item.generalSpftrKor ?? item.ecologySpftrKor
  if (!text) return null

  return { source: 'naris', text }
}
