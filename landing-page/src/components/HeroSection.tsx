import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import { useMousePosition } from '../hooks/useMousePosition';
import { ParticleBackground } from './ParticleBackground';

const TYPING_WORDS = ['혁신', '성장', '연결', '미래', '가능성'];

export function HeroSection() {
  const typedWord = useTypingAnimation(TYPING_WORDS);
  const { normalized } = useMousePosition();
  const isMobile = window.innerWidth < 768;

  const parallaxX = normalized.x * 15;
  const parallaxY = normalized.y * 10;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950"
    >
      {/* Particle background */}
      <ParticleBackground isMobile={isMobile} />

      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #6366f1, transparent)',
          left: '10%',
          top: '10%',
          x: parallaxX,
          y: parallaxY,
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #a855f7, transparent)',
          right: '10%',
          bottom: '10%',
          x: -parallaxX,
          y: -parallaxY,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass mb-8 text-sm text-indigo-300"
        >
          <Sparkles className="w-4 h-4" />
          <span>새로운 시대의 시작</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-5xl md:text-7xl font-black leading-tight mb-6"
        >
          <span className="text-white">당신의 비즈니스에</span>
          <br />
          <span className="text-gradient">
            {typedWord}
            <span className="animate-pulse ml-1 text-indigo-400">|</span>
          </span>
          <span className="text-white">을 더하다</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          혁신적인 기술과 창의적인 솔루션으로 당신의 비즈니스를 다음 단계로
          이끌어 드립니다. 지금 시작하세요.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99,102,241,0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg transition-all"
          >
            무료로 시작하기
            <ArrowRight className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-glass text-white font-semibold text-lg border border-white/20"
          >
            더 알아보기
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-3 rounded-full bg-indigo-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
