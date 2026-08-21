function CTASection() {
  return (
    <section id="cta" className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-700 px-8 py-16 text-center md:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            지금 바로 시작하세요
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
            14일 무료 체험으로 부담 없이 경험해보세요. 신용카드가 필요하지 않습니다.
          </p>
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="이메일 주소를 입력하세요"
              className="w-full rounded-lg border-0 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              시작하기
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CTASection
