import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { useLanguage } from '../i18n/LanguageContext'

function Stats() {
  const { t } = useLanguage()
  return (
    <section id="stats" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="flex items-baseline gap-3">
              <Counter to={200} className="font-sans text-[6rem] font-bold leading-none tracking-tightest text-ink sm:text-[9rem]" />
              <span className="font-display text-5xl font-bold text-accent-ink sm:text-7xl">+</span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="lg:pb-6">
              <p className="text-xl font-semibold text-ink">{t.stats.label}</p>
              <p className="mt-2 max-w-md leading-relaxed text-muted">
                {t.stats.desc}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* 키워드 마퀴 — '움직임' 표현 */}
      <div className="relative mt-20 overflow-hidden border-y border-line py-6">
        <div className="flex w-max animate-marquee gap-4 pr-4">
          {[...t.stats.marquee, ...t.stats.marquee].map((word, i) => (
            <span
              key={i}
              className="flex items-center gap-4 whitespace-nowrap font-display text-2xl font-medium text-ink/80 sm:text-3xl"
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

/** 옐로우 채색 + 오렌지브라운 아웃라인의 스텔라 별 */
function Star() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
      <path
        d="M12 2.5l2.6 6.6L21.5 12l-6.9 2.6L12 21.5l-2.6-6.9L2.5 12l6.9-2.9L12 2.5z"
        fill="#FFED92"
        stroke="#EDA769"
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

export default Stats
