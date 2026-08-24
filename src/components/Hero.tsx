import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import type { TitleLine } from '../i18n/dictionary'

const EASE = [0.32, 0.72, 0, 1] as const

const HERO_VIDEO_URL =
  'https://imyjohoymzmbaytkhhqk.supabase.co/storage/v1/object/public/videos/hero-bg.mp4'

function Hero() {
  const { t } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)

  // 일부 브라우저(특히 모바일)는 배터리 절약 모드 등으로 muted 영상의
  // 자동재생마저 막는다. 마운트 시 play()를 시도하고, 실패했다면 사용자가
  // 화면 아무 곳이나 처음 터치/클릭하는 순간 다시 재생을 시도해 확실히 튼다.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    const tryPlay = () => void video.play().catch(() => {})
    tryPlay()

    const unlock = () => tryPlay()
    window.addEventListener('touchstart', unlock, { once: true, passive: true })
    window.addEventListener('click', unlock, { once: true })

    return () => {
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('click', unlock)
    }
  }, [])

  return (
    <section className="relative min-h-[100dvh] overflow-hidden pt-36 md:pt-44">
      {/* 배경: 동영상 */}
      <video
        ref={videoRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        src={HERO_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        // eslint-disable-next-line react/no-unknown-property
        webkit-playsinline="true"
        preload="auto"
      />

      {/* 배경 오버레이: 텍스트 가독성을 위한 어두운 톤 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-black/40"
      />

      {/* 배경 오버레이: 은은한 파스텔 그라데이션 (연하게) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 z-[2] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent-soft/40 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        {/* 타이포 */}
        <div className="max-w-2xl">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.hero.badge}
          </motion.span>

          <h1 className="mt-7 text-balance font-sans text-[2.7rem] font-bold leading-[1.06] tracking-tightest text-paper drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-[4.2rem]">
            {t.hero.title.map((line, i) => (
              <Line key={i} delay={0.05 + i * 0.08}>
                <TitleLineText line={line} />
              </Line>
            ))}
          </h1>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            {t.hero.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm font-medium text-ink"
              >
                {c}
              </span>
            ))}
          </motion.div>

          <motion.p
            className="mt-6 max-w-md text-balance text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.38 }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          >
            <a
              href="#ai-shortform"
              className="group flex items-center gap-2 rounded-full bg-ink py-3 pl-6 pr-2.5 text-sm font-medium text-paper transition-transform duration-300 ease-fluid active:scale-[0.98]"
            >
              {t.hero.ctaPrimary}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper/15 transition-transform duration-300 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <ArrowUpRight />
              </span>
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 ease-fluid hover:border-ink/30"
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TitleLineText({ line }: { line: TitleLine }) {
  return (
    <>
      {line.map((segment, i) =>
        segment.highlight ? (
          <span key={i} className="text-accent-ink">
            {segment.text}
          </span>
        ) : (
          <span key={i}>{segment.text}</span>
        ),
      )}
    </>
  )
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function ArrowUpRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  )
}

export default Hero
