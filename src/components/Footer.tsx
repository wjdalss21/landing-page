const FOOTER_LINKS = [
  { label: '기능', href: '#features' },
  { label: '고객사례', href: '#social-proof' },
  { label: '개인정보처리방침', href: '#' },
  { label: '이용약관', href: '#' },
]

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="text-lg font-bold text-brand-600">Landing</div>
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-500 transition-colors hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-sm text-gray-400">
          © 2026 Landing. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
