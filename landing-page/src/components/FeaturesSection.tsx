import { motion } from 'framer-motion';
import { Zap, Shield, BarChart3, Globe, Cpu, Heart } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: '초고속 성능',
    description: '최적화된 인프라로 업계 최고 수준의 속도를 경험하세요. 지연 없는 실시간 처리.',
    color: 'from-yellow-400 to-orange-500',
    glow: 'rgba(251,191,36,0.3)',
  },
  {
    icon: Shield,
    title: '엔터프라이즈 보안',
    description: '군사급 암호화와 다중 인증으로 비즈니스 데이터를 완벽하게 보호합니다.',
    color: 'from-green-400 to-emerald-600',
    glow: 'rgba(52,211,153,0.3)',
  },
  {
    icon: BarChart3,
    title: '실시간 분석',
    description: '직관적인 대시보드로 비즈니스 인사이트를 실시간으로 파악하고 의사결정을 내리세요.',
    color: 'from-blue-400 to-indigo-600',
    glow: 'rgba(96,165,250,0.3)',
  },
  {
    icon: Globe,
    title: '글로벌 확장성',
    description: '전 세계 어디서나 동일한 성능을 보장하는 분산 아키텍처로 글로벌 시장을 공략하세요.',
    color: 'from-indigo-400 to-purple-600',
    glow: 'rgba(129,140,248,0.3)',
  },
  {
    icon: Cpu,
    title: 'AI 기반 자동화',
    description: '최신 AI 기술을 활용한 스마트 자동화로 반복 업무를 제거하고 핵심에 집중하세요.',
    color: 'from-purple-400 to-pink-600',
    glow: 'rgba(192,132,252,0.3)',
  },
  {
    icon: Heart,
    title: '24/7 전담 지원',
    description: '언제 어디서나 전문가 팀이 신속하게 지원합니다. 혼자가 아닙니다.',
    color: 'from-pink-400 to-rose-600',
    glow: 'rgba(251,113,133,0.3)',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 bg-gray-950">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
            핵심 기능
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            왜 <span className="text-gradient">Hook</span>인가요?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            비즈니스 성장을 가속화하는 강력한 기능들을 한 곳에서 경험하세요
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  boxShadow: `0 20px 60px ${feature.glow}`,
                  transition: { duration: 0.2 },
                }}
                className="relative p-6 rounded-2xl bg-glass border border-white/5 cursor-default overflow-hidden group"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${feature.glow}, transparent 70%)` }}
                />

                <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="relative text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="relative text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
