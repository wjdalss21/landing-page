import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { useLanguage } from '../i18n/LanguageContext'
import { supabase } from '../lib/supabase'

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

const CTA_VIDEO_URL =
  'https://imyjohoymzmbaytkhhqk.supabase.co/storage/v1/object/public/videos/hero-bg.mp4'

function CTASection() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<SubmitStatus>('idle')
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!supabase || status === 'loading') return

    setStatus('loading')
    const { error } = await supabase.functions.invoke('send-inquiry', {
      body: { email },
    })

    if (error) {
      setStatus('error')
      return
    }
    setStatus('success')
    setEmail('')
  }

  return (
    <section id="contact" className="px-6 py-28 md:py-36">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-paper/15 bg-ink p-1.5">
          <div className="relative overflow-hidden rounded-[calc(2.5rem-0.375rem)] bg-ink px-8 py-20 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] sm:px-16">
            {/* 배경: 동영상 */}
            <video
              ref={videoRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
              src={CTA_VIDEO_URL}
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
              className="pointer-events-none absolute inset-0 z-[1] bg-ink/75"
            />

            {/* 배경 오브 */}
            <div className="pointer-events-none absolute left-1/2 top-0 z-[2] h-72 w-72 -translate-x-1/2 rounded-full bg-accent/30 blur-[100px]" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-paper/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-paper/60">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t.cta.badge}
              </span>

              <h2 className="mx-auto mt-7 max-w-2xl text-balance font-sans text-4xl font-bold leading-tight tracking-tightest text-paper sm:text-5xl">
                {t.cta.headingLines.map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-balance leading-relaxed text-paper/60">
                {t.cta.desc}
              </p>

              {status === 'success' ? (
                <p className="mx-auto mt-10 max-w-md text-balance font-medium text-paper">
                  문의가 접수되었습니다. 빠르게 회신드릴게요!
                </p>
              ) : (
                <form
                  className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.cta.emailPlaceholder}
                    className="w-full rounded-full border border-paper/15 bg-paper/5 px-5 py-3.5 text-paper placeholder-paper/40 transition-colors duration-300 ease-fluid focus:border-accent focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-paper py-3.5 pl-6 pr-2.5 font-medium text-ink transition-transform duration-300 ease-fluid active:scale-[0.98] disabled:opacity-60"
                  >
                    {status === 'loading' ? '전송 중…' : t.cta.submit}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/10 transition-transform duration-300 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                      <ArrowUpRight />
                    </span>
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="mt-4 text-sm text-accent">
                  전송에 실패했습니다. 잠시 후 다시 시도해 주세요.
                </p>
              )}
              <p className="mt-5 text-sm text-paper/40">{t.cta.note}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
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

export default CTASection
