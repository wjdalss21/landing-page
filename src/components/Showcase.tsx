import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import Reveal from './Reveal'
import { useWorks } from '../hooks/useWorks'
import type { WorkRow } from '../lib/supabase'

const EASE = [0.32, 0.72, 0, 1] as const

export type Work = {
  title: string
  platform?: string
  stats: string[]
  tone: string
  videoUrl?: string
  posterUrl?: string
  qrUrl?: string
  linkUrl?: string
}

type ShowcaseProps = {
  id: string
  category: WorkRow['category']
  eyebrow: string
  title: string
  description: string
  fallbackWorks: Work[]
  aspect?: string
  gridClass?: string
  note?: { title: string; desc: string }
}

function Showcase({
  id,
  category,
  eyebrow,
  title,
  description,
  fallbackWorks,
  aspect = 'aspect-[9/16]',
  gridClass = 'md:grid-cols-3',
  note,
}: ShowcaseProps) {
  const works = useWorks(category, fallbackWorks)

  return (
    <section id={id} className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-ink">
                {eyebrow}
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {title}
              </h2>
            </div>
            <p className="max-w-md text-balance leading-relaxed text-muted">
              {description}
            </p>
          </div>
        </Reveal>

        <div className={`mt-14 grid grid-cols-2 gap-4 sm:gap-5 ${gridClass}`}>
          {works.map((work, i) => (
            <Reveal key={`${work.title}-${i}`} delay={(i % 3) * 0.08}>
              <WorkCard work={work} aspect={aspect} />
            </Reveal>
          ))}
        </div>

        {note && (
          <Reveal delay={0.15}>
            <div className="mt-10 rounded-[1.5rem] bg-accent-soft/60 p-7 sm:p-8">
              <p className="font-semibold text-accent-ink">{note.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {note.desc}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function WorkCard({ work, aspect }: { work: Work; aspect: string }) {
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
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: EASE }}
      onClick={playsInlineOnClick && !isPlaying ? handlePlayClick : undefined}
      className={`group overflow-hidden rounded-[1.4rem] border border-line bg-paper p-1.5 shadow-[0_20px_40px_-30px_rgba(58,42,34,0.4)] ${playsInlineOnClick && !isPlaying ? 'cursor-pointer' : ''}`}
    >
      {/* 포스터 / 동영상 */}
      <div className={`relative ${aspect} overflow-hidden rounded-[1rem] bg-ink`}>
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

        {!isPlaying && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-11 w-11 translate-y-1 items-center justify-center rounded-full border border-white/40 bg-white/15 opacity-80 backdrop-blur-md transition-all duration-500 ease-fluid group-hover:translate-y-0 group-hover:opacity-100">
              <svg width="12" height="14" viewBox="0 0 18 20" fill="#fff">
                <path d="M17 8.27a2 2 0 0 1 0 3.46L3 19.8A2 2 0 0 1 0 18.07V1.93A2 2 0 0 1 3 .2l14 8.07z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* 메타 */}
      <div className="px-2.5 py-4">
        <h3 className="font-semibold text-ink">{work.title}</h3>
        {work.platform && (
          <span className="mt-2 inline-block rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent-ink">
            {work.platform}
          </span>
        )}
        <div className="mt-3 space-y-0.5">
          {work.stats.map((s) => (
            <p key={s} className="text-[13px] leading-snug text-muted">
              {s}
            </p>
          ))}
        </div>
      </div>
    </motion.article>
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

export default Showcase
