import { Description } from './types'

export async function describeFromWikipedia(name: string): Promise<Description | null> {
  const url = `https://ko.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
  const res = await fetch(url)
  if (!res.ok) return null

  const data: { extract?: string } = await res.json()
  if (!data.extract) return null

  return { source: 'wikipedia', text: data.extract }
}
