import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
        // 디스플레이/로고 — IBM Plex
        display: [
          'IBM Plex Sans KR',
          'IBM Plex Sans',
          'Pretendard Variable',
          'sans-serif',
        ],
      },
      colors: {
        // STELLA& 브랜드 컬러 기준 스튜디오 팔레트 (로고 픽셀 추출)
        // canvas는 로고 네이비(#304870, 채도 40%)를 그대로 큰 배경에 칠하면
        // 채도가 낮아 회색처럼 보여서, 같은 색상(hue)을 유지한 채 채도/톤을
        // 높인 진한 네이비를 사용한다. 텍스트·버튼(ink)은 브랜드 원색 그대로.
        canvas: '#0F1F38', // 대형 배경용 진한 네이비 (Hero와 동일 톤)
        paper: '#FFFFFF',
        ink: '#304870', // STELLA& 워드마크 네이비 (메인 컬러)
        muted: '#6B7385',
        line: '#E4E7EC',
        // 핑크 — 로고 스타 마스코트 (포인트)
        accent: {
          DEFAULT: '#F88090',
          light: '#FCC6CD', // 섹션 타이틀용 — 메인 핑크보다 훨씬 연하게
          soft: '#FCE3E7',
          ink: '#E85D78',
        },
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      transitionTimingFunction: {
        fluid: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
