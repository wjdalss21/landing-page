import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** 등장 지연(초) */
  delay?: number
  /** 이동 거리(px) */
  y?: number
  className?: string
}

const EASE = [0.32, 0.72, 0, 1] as const

/**
 * 뷰포트 진입 시 아래에서 위로 부드럽게 떠오르는 등장 애니메이션.
 * transform/opacity/filter만 사용하여 GPU 안전.
 */
function Reveal({ children, delay = 0, y = 40, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
