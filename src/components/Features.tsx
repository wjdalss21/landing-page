const FEATURES = [
  {
    icon: '⚡',
    title: '빠른 속도',
    description: '최적화된 성능으로 어떤 작업도 지연 없이 즉시 처리합니다.',
  },
  {
    icon: '🔒',
    title: '안전한 보안',
    description: '엔터프라이즈급 보안으로 데이터를 안전하게 보호합니다.',
  },
  {
    icon: '📊',
    title: '실시간 분석',
    description: '한눈에 보이는 대시보드로 데이터 기반 의사결정을 돕습니다.',
  },
  {
    icon: '🤝',
    title: '손쉬운 협업',
    description: '팀원 모두가 실시간으로 함께 작업할 수 있습니다.',
  },
]

function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            왜 우리를 선택해야 할까요?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            비즈니스 성장에 필요한 모든 것을 하나의 솔루션에 담았습니다.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
