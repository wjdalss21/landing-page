import Reveal from './Reveal'
import { useLanguage } from '../i18n/LanguageContext'

function CTASection() {
  const { t } = useLanguage()
  return (
    <section id="contact" className="px-6 py-28 md:py-36">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-ink/10 bg-ink p-1.5">
          <div className="relative overflow-hidden rounded-[calc(2.5rem-0.375rem)] bg-ink px-8 py-20 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] sm:px-16">
            {/* 배경 오브 */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/30 blur-[100px]" />

            <div className="relative">
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

              <form
                className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder={t.cta.emailPlaceholder}
                  className="w-full rounded-full border border-paper/15 bg-paper/5 px-5 py-3.5 text-paper placeholder-paper/40 transition-colors duration-300 ease-fluid focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-paper py-3.5 pl-6 pr-2.5 font-medium text-ink transition-transform duration-300 ease-fluid active:scale-[0.98]"
                >
                  {t.cta.submit}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/10 transition-transform duration-300 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                    <ArrowUpRight />
                  </span>
                </button>
              </form>
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
