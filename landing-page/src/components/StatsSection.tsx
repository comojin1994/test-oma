import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useCountUp } from '../hooks/useCountUp';

const STATS = [
  { value: 12000, suffix: '+', label: '글로벌 고객사', description: '전 세계 기업들의 선택' },
  { value: 340, suffix: '%', label: '평균 성장률', description: '도입 후 12개월 기준' },
  { value: 99, suffix: '.9%', label: '서비스 가동률', description: '연중무휴 안정적 운영' },
  { value: 50, suffix: 'M+', label: '처리 트랜잭션', description: '매월 신뢰받는 플랫폼' },
];

function StatItem({ stat, start }: { stat: typeof STATS[0]; start: boolean }) {
  const count = useCountUp(stat.value, 2000, start);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center p-6"
    >
      <div className="text-5xl md:text-6xl font-black text-gradient mb-2">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-xl font-bold text-white mb-1">{stat.label}</div>
      <div className="text-sm text-gray-500">{stat.description}</div>
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stats" className="relative py-24 bg-gray-950 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #6366f1, transparent)' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
            숫자로 보는 성과
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            결과가 말해줍니다
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} start={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
