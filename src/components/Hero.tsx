function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
        <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-700">
          🚀 새로운 방식의 비즈니스 솔루션
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl">
          당신의 비즈니스를
          <br />
          <span className="text-brand-600">한 단계 더</span> 성장시키세요
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 md:text-xl">
          복잡한 작업은 저희에게 맡기고, 당신은 중요한 일에만 집중하세요.
          지금 바로 시작해보세요.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#cta"
            className="w-full rounded-lg bg-brand-600 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-700 sm:w-auto"
          >
            무료로 시작하기
          </a>
          <a
            href="#features"
            className="w-full rounded-lg border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 transition-colors hover:border-gray-400 sm:w-auto"
          >
            자세히 알아보기
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-500">신용카드 없이 14일 무료 체험</p>
      </div>
    </section>
  )
}

export default Hero
