import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** 환경변수가 있을 때만 클라이언트를 생성한다. 없으면 정적 데이터로 폴백. */
export const supabase = url && anonKey ? createClient(url, anonKey) : null
export const isSupabaseConfigured = Boolean(url && anonKey)

/** works 테이블의 한 행 */
export type WorkRow = {
  id: string
  category: 'ai' | 'audio' | 'motion'
  title: string
  platform: string | null
  stats: string[] | null
  video_url: string | null
  poster_url: string | null
  link_url: string | null
  sort_order: number | null
}
