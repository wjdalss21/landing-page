import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { LOCALES, LOCALE_LABELS, type Locale } from '../i18n/locale'

const SITE_URL = 'https://stelland.io/'
const EASE = [0.32, 0.72, 0, 1] as const
const LOGO_URL =
  'https://imyjohoymzmbaytkhhqk.supabase.co/storage/v1/object/public/thumbnails/logo-horizontal.png'

function Header() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()

  const NAV_ITEMS = [
    { label: t.header.nav.ai, href: '#ai-shortform' },
    { label: t.header.nav.audio, href: '#audio-webtoon' },
    { label: t.header.nav.motion, href: '#motion-toon' },
  ]

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5">
        <div className="flex w-full max-w-3xl items-center justify-between rounded-2xl border border-line/80 bg-paper/70 py-2.5 pl-6 pr-2.5 shadow-[0_8px_30px_-12px_rgba(11,11,12,0.15)] backdrop-blur-xl">
          <a href="#" className="flex items-center" aria-label="STELLA& 홈">
            <img src={LOGO_URL} alt="STELLA&" className="h-5 w-auto sm:h-6" />
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-accent-ink transition-colors duration-300 ease-fluid hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 rounded-full bg-ink py-2 pl-4 pr-2 text-sm font-medium text-paper transition-transform duration-300 ease-fluid active:scale-[0.98] sm:flex"
            >
              {t.header.officialSite}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/15 transition-transform duration-300 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <ArrowUpRight />
              </span>
            </a>

            {/* 모바일 햄버거 → X 모프 */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.header.menuClose : t.header.menuOpen}
              className="relative flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            >
              <motion.span
                className="absolute h-[1.5px] w-5 rounded-full bg-ink"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
              <motion.span
                className="absolute h-[1.5px] w-5 rounded-full bg-ink"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 풀스크린 오버레이 */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-canvas/90 px-8 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {[
              ...NAV_ITEMS,
              { label: t.header.projectInquiry, href: '#contact', external: false },
              { label: `${t.header.officialSite} ↗`, href: SITE_URL, external: true },
            ].map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                target={'external' in item && item.external ? '_blank' : undefined}
                rel={
                  'external' in item && item.external
                    ? 'noopener noreferrer'
                    : undefined
                }
                onClick={() => setOpen(false)}
                className="font-display text-5xl font-bold tracking-tight text-paper"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.08 * i }}
              >
                {item.label}
              </motion.a>
            ))}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {LOCALES.map((loc) => (
                <MobileLocaleButton key={loc} locale={loc} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-1 rounded-full border border-line/80 bg-paper px-3 text-xs font-semibold uppercase tracking-wide text-ink transition-colors duration-300 ease-fluid hover:border-ink/30"
      >
        {locale}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-11 z-50 min-w-[7.5rem] overflow-hidden rounded-2xl border border-line/80 bg-paper py-1.5 shadow-[0_20px_40px_-20px_rgba(11,11,12,0.3)]"
            >
              {LOCALES.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    setLocale(loc)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2 text-sm transition-colors duration-200 hover:bg-accent-soft/60 ${
                    loc === locale ? 'font-semibold text-accent-ink' : 'text-ink'
                  }`}
                >
                  {LOCALE_LABELS[loc]}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileLocaleButton({ locale }: { locale: Locale }) {
  const { locale: current, setLocale } = useLanguage()
  return (
    <button
      type="button"
      onClick={() => setLocale(locale)}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-300 ease-fluid ${
        current === locale
          ? 'border-accent bg-accent text-ink'
          : 'border-paper/30 text-paper/60 hover:text-paper'
      }`}
    >
      {LOCALE_LABELS[locale]}
    </button>
  )
}

function ArrowUpRight() {
  return (
    <svg
      width="13"
      height="13"
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

export default Header
