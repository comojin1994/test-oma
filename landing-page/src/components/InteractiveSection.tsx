import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import { CheckCircle } from 'lucide-react';

const BENEFITS = [
  '설치 10분 만에 시작',
  '신용카드 불필요',
  '14일 무료 체험',
  '전담 온보딩 지원',
  '언제든 취소 가능',
  '99.9% 업타임 보장',
];

export function InteractiveSection() {
  const { normalized } = useMousePosition();

  return (
    <section className="relative py-32 bg-gray-900 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.3) 0%, transparent 70%)',
          x: normalized.x * 20,
          y: normalized.y * 20,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6">
              쉬운 시작
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              복잡함은 없애고,
              <br />
              <span className="text-gradient">성과만 남깁니다</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              복잡한 설정 없이 10분 만에 시작할 수 있습니다. 기술 지식이 없어도
              괜찮습니다. 우리가 함께합니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BENEFITS.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Parallax card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main card */}
            <motion.div
              style={{ x: normalized.x * -10, y: normalized.y * -8 }}
              className="relative p-8 rounded-3xl bg-glass border border-white/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-2xl"
                style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                <div className="space-y-3">
                  {[
                    { label: '월 활성 사용자', value: '1.2M+', color: 'text-indigo-400' },
                    { label: '처리 트랜잭션', value: '$89M+', color: 'text-purple-400' },
                    { label: '평균 성장률', value: '+340%', color: 'text-cyan-400' },
                    { label: '고객 만족도', value: '98.7%', color: 'text-green-400' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                    >
                      <span className="text-gray-400 text-sm">{item.label}</span>
                      <span className={`font-bold text-lg ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              style={{ x: normalized.x * 15, y: normalized.y * 12 }}
              className="absolute -top-6 -right-6 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold shadow-lg"
            >
              🚀 No.1 선택
            </motion.div>
            <motion.div
              style={{ x: normalized.x * -15, y: normalized.y * 12 }}
              className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-glass border border-white/20 text-white text-sm font-medium"
            >
              ⭐ 4.9/5 평점
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
