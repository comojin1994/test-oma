import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const TESTIMONIALS = [
  { name: '김대표', company: 'TechStart', text: '매출이 3배 뛰었어요. 믿기지 않는 결과입니다.' },
  { name: '이팀장', company: 'ScaleUp', text: '도입 2주 만에 업무 효율이 40% 향상됐습니다.' },
  { name: '박CTO', company: 'InnoLab', text: '개발 시간이 절반으로 줄었고 품질은 더 높아졌습니다.' },
];

export function CTASection() {
  return (
    <section id="cta" className="relative py-32 bg-gray-950 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.3) 0%, transparent 60%)',
              'radial-gradient(ellipse at 80% 50%, rgba(168,85,247,0.3) 0%, transparent 60%)',
              'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.3) 0%, transparent 60%)',
            ],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-glass border border-white/10"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">"{t.text}"</p>
              <div>
                <div className="text-white font-semibold">{t.name}</div>
                <div className="text-gray-500 text-sm">{t.company}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            14일 무료 체험, 신용카드 불필요.
            <br />
            오늘 시작하는 사람이 내일의 승자입니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 60px rgba(99,102,241,0.7)',
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(99,102,241,0.4)',
                  '0 0 40px rgba(168,85,247,0.6)',
                  '0 0 20px rgba(99,102,241,0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-black text-xl"
            >
              무료로 시작하기
              <ArrowRight className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full bg-glass border border-white/20 text-white font-semibold text-xl"
            >
              데모 요청하기
            </motion.a>
          </div>

          <p className="mt-6 text-gray-600 text-sm">
            이미 12,000+ 기업이 Hook을 선택했습니다
          </p>
        </motion.div>
      </div>
    </section>
  );
}
