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
        // 캐릭터 시트 기준 파스텔 팔레트
        canvas: '#FFF0EE', // 아이보리 — 몸통 베이스
        paper: '#FFFFFF',
        ink: '#3A2A22', // 따뜻한 코코아 브라운 (본문)
        muted: '#8A7266',
        line: '#F5DED8',
        // 핑크 — 볼터치·귀 안쪽 (메인 포인트)
        accent: {
          DEFAULT: '#FD95A8',
          soft: '#FFE1E6',
          ink: '#F0728B',
        },
        // 옐로우 — 별 채색 메인
        star: '#FFED92',
        // 오렌지브라운 — 별 아웃라인·섀도
        amber: '#EDA769',
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
