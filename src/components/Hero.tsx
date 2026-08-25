import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import type { TitleLine } from '../i18n/dictionary'

const EASE = [0.32, 0.72, 0, 1] as const

function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-canvas pt-36 md:pt-44">
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-24 lg:grid-cols-[1.3fr_1fr]">
        {/* 좌: 타이포 */}
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
                className="rounded-md border border-line bg-paper px-4 py-1.5 text-sm font-medium text-ink"
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

        {/* 우: 실적 스탯 — 헤드라인과 같은 높이, 중앙 정렬로 크게 */}
        <motion.div
          id="stats"
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          <div className="inline-flex flex-col items-start gap-4 rounded-3xl bg-black/25 px-8 py-8 backdrop-blur-md sm:px-10 sm:py-10">
            <div className="flex items-baseline gap-2">
              <Counter
                to={200}
                className="font-sans text-7xl font-bold leading-none tracking-tightest text-paper sm:text-8xl lg:text-9xl"
              />
              <span className="font-display text-4xl font-bold text-accent sm:text-5xl">
                +
              </span>
            </div>
            <div className="h-px w-16 bg-paper/20" />
            <div>
              <p className="text-lg font-semibold text-paper sm:text-xl">
                {t.stats.label}
              </p>
              <p className="mt-2 max-w-xs leading-relaxed text-paper/60">
                {t.stats.desc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 키워드 마퀴 — '움직임' 표현, 첫 화면 하단 풀블리드 스트립 */}
      <div className="relative z-10 mt-10 overflow-hidden border-t border-paper/15 bg-black/20 py-5 backdrop-blur-sm md:mt-16">
        <div className="flex w-max animate-marquee gap-4 pr-4">
          {[...t.stats.marquee, ...t.stats.marquee].map((word, i) => (
            <span
              key={i}
              className="flex items-center gap-4 whitespace-nowrap font-display text-xl font-medium text-paper/80 sm:text-2xl"
            >
              {word}
              <Star />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/** 브랜드 핑크 채색 + 네이비 아웃라인의 스텔라 별 */
function Star() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
      <path
        d="M12 2.5l2.6 6.6L21.5 12l-6.9 2.6L12 21.5l-2.6-6.9L2.5 12l6.9-2.9L12 2.5z"
        fill="#F88090"
        stroke="#304870"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Counter({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.32, 0.72, 0, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
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
