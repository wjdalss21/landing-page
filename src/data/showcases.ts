import type { Work } from '../components/Showcase'
import type { Locale } from '../i18n/locale'

// Supabase Storage(qr-codes 버킷, public)에 업로드된 QR코드 이미지
const QR_BASE =
  'https://imyjohoymzmbaytkhhqk.supabase.co/storage/v1/object/public/qr-codes'
// Supabase Storage(thumbnails 버킷, public)에 업로드된 썸네일 이미지
const THUMB_BASE =
  'https://imyjohoymzmbaytkhhqk.supabase.co/storage/v1/object/public/thumbnails'
// Supabase Storage(videos 버킷, public)에 업로드된 원본 영상
const VIDEO_BASE =
  'https://imyjohoymzmbaytkhhqk.supabase.co/storage/v1/object/public/videos'

type LocalizedWork = {
  title: Record<Locale, string>
  platform?: Record<Locale, string>
  stats: Record<Locale, string[]>
  tone: string
  qrUrl: string
  posterUrl: string
  linkUrl?: string
  videoUrl?: string
}

function localize(work: LocalizedWork, locale: Locale): Work {
  return {
    title: work.title[locale],
    platform: work.platform?.[locale],
    stats: work.stats[locale],
    tone: work.tone,
    qrUrl: work.qrUrl,
    posterUrl: work.posterUrl,
    linkUrl: work.linkUrl,
    videoUrl: work.videoUrl,
  }
}

// CATEGORY 01 — AI 숏폼 애니메이션 제작 샘플
const AI_SAMPLES_RAW: LocalizedWork[] = [
  {
    title: { ko: '〈아린〉', en: '〈Arin〉', ja: '〈アリン〉' },
    stats: { ko: [], en: [], ja: [] },
    tone: 'from-amber to-star',
    posterUrl: `${THUMB_BASE}/ai-1.png`,
    qrUrl: `${QR_BASE}/ai-3.png`,
  },
  {
    title: { ko: '〈SANTA〉', en: '〈SANTA〉', ja: '〈SANTA〉' },
    stats: { ko: [], en: [], ja: [] },
    tone: 'from-ink to-accent-ink',
    posterUrl: `${THUMB_BASE}/ai-2.png`,
    qrUrl: `${QR_BASE}/ai-1.png`,
    videoUrl: `${VIDEO_BASE}/ai-1.mp4`,
  },
  {
    title: {
      ko: '〈이번 생은 제대로 키워드리겠습니다, 폐하!〉',
      en: "〈This Time, I'll Raise You Right, Your Majesty!〉",
      ja: '〈今度こそちゃんと育てます、陛下！〉',
    },
    stats: { ko: [], en: [], ja: [] },
    tone: 'from-accent to-amber',
    posterUrl: `${THUMB_BASE}/ai-3.png`,
    qrUrl: `${QR_BASE}/ai-2.png`,
    videoUrl: `${VIDEO_BASE}/ai-2.mp4`,
  },
]

// CATEGORY 02 — 오디오웹툰
const AUDIO_WORKS_RAW: LocalizedWork[] = [
  {
    title: { ko: '집이없어', en: 'I Have No Home', ja: '家がない' },
    platform: {
      ko: '네이버웹툰',
      en: 'Naver Webtoon',
      ja: 'NAVERウェブトゥーン',
    },
    stats: {
      ko: ['300화 완결 · 평균 별점 9.9', '2021 오늘의 우리만화상'],
      en: [
        '300 episodes completed · Avg. rating 9.9',
        "2021 Today's Webtoon Award",
      ],
      ja: ['全300話完結・平均評点9.9', '2021 今日の我が漫画賞'],
    },
    tone: 'from-ink to-accent-ink',
    posterUrl: `${THUMB_BASE}/audio-1.png`,
    qrUrl: `${QR_BASE}/audio-1.png`,
    videoUrl: `${VIDEO_BASE}/audio-1.mp4`,
  },
  {
    title: {
      ko: '살아남은 로맨스',
      en: 'Surviving Romance',
      ja: '生き残ったロマンス',
    },
    platform: {
      ko: '네이버웹툰',
      en: 'Naver Webtoon',
      ja: 'NAVERウェブトゥーン',
    },
    stats: {
      ko: ['유료 대여작 최초 별점 9.98', '단행본 7권 · 다국어 연재'],
      en: [
        'First paid-rental title to reach a 9.98 rating',
        '7-volume print edition · serialized in multiple languages',
      ],
      ja: ['有料貸本作品初の評点9.98', '単行本7巻・多言語連載'],
    },
    tone: 'from-accent to-amber',
    posterUrl: `${THUMB_BASE}/audio-2.png`,
    qrUrl: `${QR_BASE}/audio-2.png`,
    videoUrl: `${VIDEO_BASE}/audio-2.mp4`,
  },
  {
    title: {
      ko: '시월드가 내게 집착한다',
      en: 'My In-Laws Are Obsessed With Me',
      ja: '義実家が私に執着する',
    },
    platform: {
      ko: '네이버웹툰',
      en: 'Naver Webtoon',
      ja: 'NAVERウェブトゥーン',
    },
    stats: {
      ko: ['영어판 구독 160만 · 조회 1.38억', '판타지 로맨스 최상위'],
      en: [
        '1.6M English subscribers · 138M views',
        'Top-tier fantasy romance',
      ],
      ja: ['英語版購読160万・閲覧1.38億', 'ファンタジーロマンス最上位'],
    },
    tone: 'from-amber to-star',
    posterUrl: `${THUMB_BASE}/audio-3.png`,
    qrUrl: `${QR_BASE}/audio-3.png`,
    videoUrl: `${VIDEO_BASE}/audio-3.mp4`,
  },
  {
    title: { ko: '프레너미', en: 'Frenemy', ja: 'フレネミー' },
    platform: {
      ko: '카카오웹툰',
      en: 'Kakao Webtoon',
      ja: 'カカオウェブトゥーン',
    },
    stats: {
      ko: ['누적 조회 1.4억 · 관심 134만', '카카오 대표 스포츠 IP'],
      en: [
        '140M cumulative views · 1.34M follows',
        "Kakao's flagship sports IP",
      ],
      ja: ['累計閲覧1.4億・関心134万', 'カカオ代表スポーツIP'],
    },
    tone: 'from-accent-ink to-accent',
    posterUrl: `${THUMB_BASE}/audio-4.png`,
    qrUrl: `${QR_BASE}/audio-4.png`,
    videoUrl: `${VIDEO_BASE}/audio-4.mp4`,
  },
  {
    title: {
      ko: '악녀를 죽여줘',
      en: 'Kill the Villainess',
      ja: '悪女を殺して',
    },
    platform: { ko: '카카오페이지', en: 'Kakao Page', ja: 'カカオページ' },
    stats: {
      ko: ['누적 열람 4,300만 · 별점 10.0', '카카오페이지 대표 로판'],
      en: [
        '43M cumulative reads · Perfect 10.0 rating',
        "Kakao Page's flagship fantasy romance",
      ],
      ja: ['累計閲覧4,300万・評点10.0', 'カカオページ代表ロファン'],
    },
    tone: 'from-star to-amber',
    posterUrl: `${THUMB_BASE}/audio-5.png`,
    qrUrl: `${QR_BASE}/audio-5.png`,
    videoUrl: `${VIDEO_BASE}/audio-5.mp4`,
  },
]

// CATEGORY 03 — 모션툰
const MOTION_WORKS_RAW: LocalizedWork[] = [
  {
    title: {
      ko: '배트맨: 웨인 패밀리 어드벤쳐',
      en: 'Batman: Wayne Family Adventures',
      ja: 'バットマン：ウェイン・ファミリー・アドベンチャーズ',
    },
    stats: {
      ko: ['DC 코믹스 공식 IP', '네이버웹툰 오리지널'],
      en: ['Official DC Comics IP', 'Naver Webtoon Original'],
      ja: ['DCコミックス公式IP', 'NAVERウェブトゥーンオリジナル'],
    },
    tone: 'from-ink to-amber',
    posterUrl: `${THUMB_BASE}/motion-1.png`,
    qrUrl: `${QR_BASE}/motion-1.png`,
    videoUrl: `${VIDEO_BASE}/motion-1.mp4`,
  },
  {
    title: {
      ko: '타인은 지옥이다',
      en: 'Hell Is Other People',
      ja: '他人は地獄だ',
    },
    stats: {
      ko: ['누적 조회 상위 스릴러', '드라마 영상화 원작'],
      en: [
        'Top-ranked thriller by views',
        'Source material for a live-action drama',
      ],
      ja: ['累計閲覧上位スリラー', 'ドラマ映像化原作'],
    },
    tone: 'from-ink to-accent-ink',
    posterUrl: `${THUMB_BASE}/motion-2.png`,
    qrUrl: `${QR_BASE}/motion-2.png`,
    videoUrl: `${VIDEO_BASE}/motion-2.mp4`,
  },
  {
    title: { ko: '더 복서', en: 'The Boxer', ja: 'ザ・ボクサー' },
    stats: {
      ko: ['스포츠 액션', '타격감과 사운드 시너지'],
      en: ['Sports action', 'Synergy of hit impact and sound design'],
      ja: ['スポーツアクション', '打撃感とサウンドのシナジー'],
    },
    tone: 'from-accent-ink to-accent',
    posterUrl: `${THUMB_BASE}/motion-3.png`,
    qrUrl: `${QR_BASE}/motion-3.png`,
    videoUrl: `${VIDEO_BASE}/motion-3.mp4`,
  },
]

export function getAiSamples(locale: Locale): Work[] {
  return AI_SAMPLES_RAW.map((w) => localize(w, locale))
}

export function getAudioWorks(locale: Locale): Work[] {
  return AUDIO_WORKS_RAW.map((w) => localize(w, locale))
}

export function getMotionWorks(locale: Locale): Work[] {
  return MOTION_WORKS_RAW.map((w) => localize(w, locale))
}
