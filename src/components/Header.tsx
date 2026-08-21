const NAV_ITEMS = [
  { label: '기능', href: '#features' },
  { label: '고객사례', href: '#social-proof' },
  { label: '시작하기', href: '#cta' },
]

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-bold text-brand-600">
          Landing
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-600"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#cta"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          무료로 시작하기
        </a>
      </div>
    </header>
  )
}

export default Header
