'use client'
import { Suspense } from 'react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getSupabaseBrowserClient } from '@/lib/supabase'

function CaptureContent() {
  const router = useRouter()
  const params = useSearchParams()
  const code = params.get('code')!
  const nickname = params.get('nickname')!
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)

    const supabase = getSupabaseBrowserClient()
    const path = `${code}/${Date.now()}-${nickname}.jpg`
    const { error: uploadError } = await supabase.storage
      .from('observation-photos')
      .upload(path, file, { contentType: file.type })

    if (uploadError) {
      setError('사진 업로드에 실패했어요. 다시 시도해주세요')
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage.from('observation-photos').getPublicUrl(path)
    const resultParams = new URLSearchParams({ code, nickname, photoUrl: urlData.publicUrl })
    router.push(`/student/result?${resultParams.toString()}`)
  }

  return (
    <main className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-6">생물 사진을 찍어주세요</h1>
      <label className="block bg-blue-600 text-white py-4 rounded-lg cursor-pointer">
        {uploading ? '업로드 중...' : '사진 찍기 / 선택하기'}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFile}
          disabled={uploading}
        />
      </label>
      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
    </main>
  )
}

export default function CapturePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">로딩 중...</div>}>
      <CaptureContent />
    </Suspense>
  )
}
