import { createClient, SupabaseClient } from '@supabase/supabase-js'

let serverClient: SupabaseClient | null = null

// service role 키 사용 — 서버(Route Handler)에서만 호출할 것
export function getSupabaseServerClient(): SupabaseClient {
  if (!serverClient) {
    serverClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return serverClient
}

// anon 키 사용 — 브라우저에서 사진 업로드 시 호출
export function getSupabaseBrowserClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
