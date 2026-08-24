import { useEffect, useState } from 'react'
import { supabase, type WorkRow } from '../lib/supabase'
import type { Work } from '../components/Showcase'

// 포스터 폴백 그라데이션 팔레트 (video_url이 없을 때)
const TONES = [
  'from-ink to-accent-ink',
  'from-accent to-amber',
  'from-amber to-star',
  'from-accent-ink to-accent',
  'from-star to-amber',
  'from-ink to-amber',
]

function mapRow(row: WorkRow, i: number): Work {
  return {
    title: row.title,
    platform: row.platform ?? undefined,
    stats: row.stats ?? [],
    tone: TONES[i % TONES.length],
    videoUrl: row.video_url ?? undefined,
    posterUrl: row.poster_url ?? undefined,
    linkUrl: row.link_url ?? undefined,
  }
}

/**
 * 카테고리별 작품 목록을 Supabase에서 불러온다.
 * Supabase 미설정·에러·빈 결과이면 fallback(정적 데이터)을 그대로 사용.
 */
export function useWorks(
  category: WorkRow['category'],
  fallback: Work[],
): Work[] {
  const [remoteWorks, setRemoteWorks] = useState<Work[] | null>(null)

  useEffect(() => {
    if (!supabase) return
    let active = true

    supabase
      .from('works')
      .select('*')
      .eq('category', category)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!active || error || !data || data.length === 0) return
        setRemoteWorks((data as WorkRow[]).map(mapRow))
      })

    return () => {
      active = false
    }
  }, [category])

  return remoteWorks ?? fallback
}
