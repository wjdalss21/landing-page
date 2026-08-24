import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import CategoryAI from './components/CategoryAI'
import Showcase from './components/Showcase'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import { getAudioWorks, getMotionWorks } from './data/showcases'
import { useLanguage } from './i18n/LanguageContext'

function App() {
  const { locale, t } = useLanguage()

  return (
    <div className="min-h-screen bg-canvas">
      <div className="grain-overlay" aria-hidden />
      <Header />
      <main>
        <Hero />
        <Stats />
        <CategoryAI />
        <Showcase
          id="audio-webtoon"
          category="audio"
          eyebrow={t.audioWebtoon.eyebrow}
          title={t.audioWebtoon.title}
          description={t.audioWebtoon.description}
          fallbackWorks={getAudioWorks(locale)}
          aspect="aspect-[9/16]"
          gridClass="md:grid-cols-3 lg:grid-cols-5"
        />
        <Showcase
          id="motion-toon"
          category="motion"
          eyebrow={t.motionToon.eyebrow}
          title={t.motionToon.title}
          description={t.motionToon.description}
          fallbackWorks={getMotionWorks(locale)}
          aspect="aspect-square"
          gridClass="md:grid-cols-3"
        />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App
