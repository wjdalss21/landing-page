const STATS = [
  { value: '10,000+', label: '활성 사용자' },
  { value: '99.9%', label: '서비스 가동률' },
  { value: '4.9/5', label: '고객 만족도' },
]

const TESTIMONIALS = [
  {
    quote: '도입 후 업무 효율이 3배 이상 올랐습니다. 정말 만족스러워요.',
    name: '김민수',
    role: '스타트업 대표',
  },
  {
    quote: '직관적인 인터페이스 덕분에 팀 전체가 금방 적응했습니다.',
    name: '이지은',
    role: '프로덕트 매니저',
  },
  {
    quote: '고객 지원이 빠르고 친절해서 믿고 사용하고 있습니다.',
    name: '박준호',
    role: '마케팅 리드',
  },
]

function SocialProof() {
  return (
    <section id="social-proof" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-extrabold text-brand-600">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl bg-white p-8 shadow-sm"
            >
              <blockquote className="text-gray-700">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {t.name}
                  </div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialProof
