import { useLanguage } from '../i18n/LanguageContext'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <a
              href="#"
              className="font-display text-3xl font-bold tracking-tight text-black"
            >
              STELLA&amp;
            </a>
            <p className="mt-4 max-w-xs leading-relaxed text-muted">
              {t.footer.tagline}
            </p>
            <a
              href="https://stelland.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors duration-300 ease-fluid hover:border-accent"
            >
              {t.footer.visitSite}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-accent-ink transition-transform duration-300 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </span>
            </a>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {t.footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted transition-colors duration-300 ease-fluid hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.copyright}</p>
          <p className="font-display">{t.footer.slogan}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
