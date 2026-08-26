/**
 * data/species.ts의 274종에 대해 위키백과(영문) 문서의 대표 사진(썸네일)을 찾아
 * public/species-photos/<id>.jpg 로 내려받고, data/speciesPhotos.json에 저작자·라이선스
 * 정보를 함께 기록한다. 사진을 못 찾은 종은 건너뛰고 마지막에 목록으로 보여준다.
 *
 * 실행: node --experimental-strip-types scripts/fetch-species-photos.mts
 */
import { writeFile, mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { SPECIES } from '../data/species.ts'

const USER_AGENT = 'DaejeonScienceMuseumBioApp/1.0 (educational field-trip webapp; non-commercial)'
const OUT_DIR = path.resolve(import.meta.dirname, '../public/species-photos')
const MANIFEST_PATH = path.resolve(import.meta.dirname, '../data/speciesPhotos.json')
const THUMB_SIZE = 480
const DELAY_MS = 600

interface PhotoResult {
  found: boolean
  ext?: string
  license?: string
  artist?: string
  sourceUrl?: string
}

interface WikiPage {
  pageimage?: string
  thumbnail?: { source: string }
  imageinfo?: { extmetadata?: Record<string, { value: string }> }[]
}

interface WikiApiResponse {
  query?: { pages?: Record<string, WikiPage> }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, '').trim()
}

async function wikiApi(params: Record<string, string>): Promise<WikiApiResponse> {
  const url = new URL('https://en.wikipedia.org/w/api.php')
  for (const [k, v] of Object.entries({ format: 'json', origin: '*', ...params })) url.searchParams.set(k, v)

  let lastError: Error | null = null
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
    if (res.ok) return res.json()
    if (res.status === 429) {
      const retryAfter = Number(res.headers.get('retry-after'))
      const waitMs = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 2000 * 2 ** attempt
      await sleep(waitMs)
      lastError = new Error(`wiki api 429`)
      continue
    }
    throw new Error(`wiki api ${res.status}`)
  }
  throw lastError
}

async function findPageImage(title: string): Promise<{ pageimage: string; thumbUrl: string } | null> {
  // 1차: 학명으로 정확한 문서 제목 조회 (리다이렉트 따라감)
  let data = await wikiApi({
    action: 'query',
    titles: title,
    prop: 'pageimages',
    piprop: 'thumbnail|name',
    pithumbsize: String(THUMB_SIZE),
    redirects: '1',
  })
  let pages: WikiPage[] = Object.values(data.query?.pages ?? {})
  let page = pages.find((p) => p.thumbnail && p.pageimage)
  if (page) return { pageimage: page.pageimage!, thumbUrl: page.thumbnail!.source }

  // 2차: 검색으로 폴백 (동의어·표기 차이 대응)
  data = await wikiApi({
    action: 'query',
    generator: 'search',
    gsrsearch: title,
    gsrlimit: '1',
    prop: 'pageimages',
    piprop: 'thumbnail|name',
    pithumbsize: String(THUMB_SIZE),
  })
  pages = Object.values(data.query?.pages ?? {})
  page = pages.find((p) => p.thumbnail && p.pageimage)
  if (page) return { pageimage: page.pageimage!, thumbUrl: page.thumbnail!.source }

  return null
}

async function getImageMeta(filename: string): Promise<{ license?: string; artist?: string }> {
  const data = await wikiApi({
    action: 'query',
    titles: `File:${filename}`,
    prop: 'imageinfo',
    iiprop: 'extmetadata',
  })
  const pages: WikiPage[] = Object.values(data.query?.pages ?? {})
  const meta = pages[0]?.imageinfo?.[0]?.extmetadata
  if (!meta) return {}
  return {
    license: meta.LicenseShortName?.value ? stripHtml(meta.LicenseShortName.value) : undefined,
    artist: meta.Artist?.value ? stripHtml(meta.Artist.value) : undefined,
  }
}

async function downloadTo(url: string, filePath: string): Promise<void> {
  let lastError: Error | null = null
  for (let attempt = 0; attempt < 6; attempt++) {
    if (attempt > 0) await sleep(2000 * 2 ** (attempt - 1))
    try {
      const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
      if (!res.ok) throw new Error(`download ${res.status}`)
      const buffer = Buffer.from(await res.arrayBuffer())
      await writeFile(filePath, buffer)
      return
    } catch (err) {
      lastError = err as Error
    }
  }
  throw lastError
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const limitArg = process.argv.find((a) => a.startsWith('--limit='))
  const limit = limitArg ? Number(limitArg.split('=')[1]) : undefined

  const manifest: Record<string, PhotoResult> = await readFile(MANIFEST_PATH, 'utf-8')
    .then((raw) => JSON.parse(raw))
    .catch(() => ({}))

  const remaining = SPECIES.filter((s) => !manifest[s.id]?.found)
  const targets = limit ? remaining.slice(0, limit) : remaining
  console.log(`이미 확보된 사진: ${SPECIES.length - remaining.length}개, 이번에 다시 시도: ${targets.length}개\n`)

  const notFound: { id: string; koreanName: string; scientificName: string }[] = []
  let foundCount = 0

  for (const [i, species] of targets.entries()) {
    process.stdout.write(`[${i + 1}/${targets.length}] ${species.koreanName} (${species.scientificName}) ... `)
    try {
      const found = await findPageImage(species.scientificName)
      if (!found) {
        console.log('사진 없음')
        manifest[species.id] = { found: false }
        notFound.push({ id: species.id, koreanName: species.koreanName, scientificName: species.scientificName })
        await sleep(DELAY_MS)
        continue
      }

      const ext = found.thumbUrl.match(/\.(jpg|jpeg|png|gif|webp)(?:\?|$)/i)?.[1]?.toLowerCase() ?? 'jpg'
      const filePath = path.join(OUT_DIR, `${species.id}.${ext}`)
      await downloadTo(found.thumbUrl, filePath)

      const meta = await getImageMeta(found.pageimage)
      manifest[species.id] = {
        found: true,
        ext,
        license: meta.license,
        artist: meta.artist,
        sourceUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(species.scientificName.replace(/ /g, '_'))}`,
      }
      foundCount++
      console.log(`찾음 (${meta.license ?? '라이선스 미상'})`)
    } catch (err) {
      console.log(`오류: ${(err as Error).message}`)
      manifest[species.id] = { found: false }
      notFound.push({ id: species.id, koreanName: species.koreanName, scientificName: species.scientificName })
    }
    await sleep(DELAY_MS)
    if ((i + 1) % 20 === 0) await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n')
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n')

  const totalFound = SPECIES.filter((s) => manifest[s.id]?.found).length
  const totalNotFound = SPECIES.filter((s) => !manifest[s.id]?.found)

  console.log('\n=== 결과 요약 (이번 실행) ===')
  console.log(`사진 찾음: ${foundCount} / ${targets.length}`)

  console.log('\n=== 전체 누적 결과 ===')
  console.log(`사진 찾음: ${totalFound} / ${SPECIES.length}`)
  console.log(`사진 못 찾음: ${totalNotFound.length}`)
  if (totalNotFound.length > 0) {
    console.log('\n못 찾은 종 목록:')
    for (const s of totalNotFound) console.log(`- ${s.koreanName} (${s.scientificName}) [${s.id}]`)
  }
}

main()
