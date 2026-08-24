import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DEFAULT_LOCALE, STORAGE_KEY, type Locale } from './locale'
import { dictionary, type Dictionary } from './dictionary'

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'ko' || saved === 'en' || saved === 'ja') return saved
  return DEFAULT_LOCALE
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = (next: Locale) => setLocaleState(next)

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionary[locale] }),
    [locale],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
