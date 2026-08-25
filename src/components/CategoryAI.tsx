import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import Reveal from './Reveal'
import { useWorks } from '../hooks/useWorks'
import { getAiSamples } from '../data/showcases'
import { useLanguage } from '../i18n/LanguageContext'
import type { Work } from './Showcase'

const EASE = [0.32, 0.72, 0, 1] as const

function CategoryAI() {
  const { locale, t } = useLanguage()
  const samples = useWorks('ai', getAiSamples(locale))

  return (
    <section id="ai-shortform" className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          {/* 좌: 설명 + 프로세스 */}
          <div>
            <Reveal>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                {t.categoryAI.eyebrow}
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-accent-light sm:text-5xl">
                {t.categoryAI.title}
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-paper/70">
                {t.categoryAI.description}
              </p>
            </Reveal>

            <div className="mt-10 flex items-center justify-between">
              {t.categoryAI.steps.map((step, i) => (
                <div key={step.no} className="flex items-center">
                  <Reveal delay={i * 0.08}>
                    <div className="flex w-[90px] flex-col items-center gap-1.5 rounded-xl bg-accent-soft px-1.5 py-2.5 text-center">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-paper/60 font-display text-[10px] font-bold text-accent-ink">
                        {step.no}
                      </span>
                      <h3 className="line-clamp-2 h-[2.75em] text-[11px] font-semibold leading-snug text-accent-ink">
                        {step.title}
                      </h3>
                    </div>
                  </Reveal>
                  {i < t.categoryAI.steps.length - 1 && (
                    <div className="flex w-3 shrink-0 items-center justify-center">
                      <div className="h-0 w-0 border-y-[3px] border-l-[4px] border-y-transparent border-l-accent/70" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 우: 제작 샘플 */}
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6">
            {samples.map((s, i) => (
              <Reveal key={`${s.title}-${i}`} delay={i * 0.1}>
                <SampleCard work={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SampleCard({ work }: { work: Work }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // videoUrl이 있고 외부 linkUrl이 없으면 클릭 시 링크 이동 대신 영상을 바로 재생한다.
  const playsInlineOnClick = Boolean(work.videoUrl) && !work.linkUrl

  const handlePlayClick = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = false
    video.loop = false
    video.controls = true
    video.currentTime = 0
    setIsPlaying(true)
    void video.play().catch(() => {})
  }

  const card = (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: EASE }}
      onClick={playsInlineOnClick && !isPlaying ? handlePlayClick : undefined}
      className={`group overflow-hidden rounded-2xl border border-line bg-paper p-1.5 ${playsInlineOnClick && !isPlaying ? 'cursor-pointer' : ''}`}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-ink">
        {work.videoUrl ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={work.videoUrl}
            poster={work.posterUrl}
            muted
            loop
            playsInline
            preload="metadata"
            onEnded={(e) => {
              setIsPlaying(false)
              e.currentTarget.muted = true
              e.currentTarget.loop = true
              e.currentTarget.controls = false
              e.currentTarget.currentTime = 0
            }}
            onMouseEnter={(e) => {
              if (!isPlaying) void e.currentTarget.play().catch(() => {})
            }}
            onMouseLeave={(e) => {
              if (!isPlaying) {
                e.currentTarget.pause()
                e.currentTarget.currentTime = 0
              }
            }}
          />
        ) : work.posterUrl ? (
          <img
            src={work.posterUrl}
            alt={work.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-fluid group-hover:scale-105"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${work.tone} transition-transform duration-700 ease-fluid group-hover:scale-105`}
          />
        )}
        {/* 재생 버튼 */}
        {!isPlaying && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur-md">
              <svg width="11" height="13" viewBox="0 0 18 20" fill="#fff">
                <path d="M17 8.27a2 2 0 0 1 0 3.46L3 19.8A2 2 0 0 1 0 18.07V1.93A2 2 0 0 1 3 .2l14 8.07z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <p className="mb-1.5 mt-2 line-clamp-2 h-[2.75em] px-1.5 text-xs font-medium leading-snug text-ink">
        {work.title}
      </p>
    </motion.div>
  )

  if (work.linkUrl) {
    return (
      <a
        href={work.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={work.title}
        className="block"
      >
        {card}
      </a>
    )
  }

  return card
}

export default CategoryAI
