import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
  isEnterprise?: boolean;
}

const PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    monthlyPrice: 29000,
    annualPrice: 24000,
    description: '소규모 팀을 위한 시작 플랜',
    features: [
      '최대 5명 팀원',
      '10GB 스토리지',
      '기본 분석 대시보드',
      '이메일 지원',
      'API 접근',
    ],
    highlighted: false,
    cta: '무료로 시작하기',
  },
  {
    name: 'Professional',
    monthlyPrice: 79000,
    annualPrice: 65000,
    description: '성장하는 팀을 위한 프로 플랜',
    features: [
      '무제한 팀원',
      '100GB 스토리지',
      '고급 분석 & AI 인사이트',
      '우선 지원 (24/7)',
      '커스텀 인테그레이션',
      '자동화 워크플로우',
      'SSO 지원',
    ],
    highlighted: true,
    cta: '프로 시작하기',
  },
  {
    name: 'Enterprise',
    monthlyPrice: 0,
    annualPrice: 0,
    description: '대규모 조직을 위한 맞춤 솔루션',
    features: [
      '무제한 모든 기능',
      '무제한 스토리지',
      '전담 계정 매니저',
      'SLA 보장 (99.99%)',
      '온프레미스 옵션',
      '커스텀 계약',
      '보안 감사 지원',
    ],
    highlighted: false,
    cta: '문의하기',
    isEnterprise: true,
  },
];

function formatPrice(price: number) {
  return price.toLocaleString('ko-KR');
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-24 bg-gray-900 dark:bg-gray-900 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #6366f1, transparent)' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
            가격 정책
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            합리적인 가격으로 시작하세요
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            14일 무료 체험, 신용카드 불필요. 언제든지 취소 가능합니다.
          </p>

          {/* Monthly/Annual toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>
              월간
            </span>
            <button
              role="switch"
              aria-checked={isAnnual}
              aria-label="연간 결제로 전환"
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                isAnnual ? 'bg-indigo-500' : 'bg-gray-700'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                  isAnnual ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
              연간{' '}
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/20">
                20% 할인
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-indigo-600 to-purple-700 border border-indigo-400/50 shadow-xl shadow-indigo-500/20'
                  : 'bg-gray-800/50 border border-white/10'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-black whitespace-nowrap">
                    🔥 가장 인기
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className={`text-sm ${plan.highlighted ? 'text-indigo-200' : 'text-gray-400'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                {plan.isEnterprise ? (
                  <div className="text-3xl font-black text-white">문의</div>
                ) : (
                  <>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black text-white">
                        ₩{formatPrice(isAnnual ? plan.annualPrice : plan.monthlyPrice)}
                      </span>
                      <span className={`text-sm mb-2 ${plan.highlighted ? 'text-indigo-200' : 'text-gray-400'}`}>
                        /월
                      </span>
                    </div>
                    {isAnnual && (
                      <p className={`text-xs mt-1 ${plan.highlighted ? 'text-indigo-200' : 'text-gray-500'}`}>
                        연간 결제 시 (월 ₩{formatPrice(plan.monthlyPrice)} 대비)
                      </p>
                    )}
                  </>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.highlighted ? 'text-white' : 'text-indigo-400'
                      }`}
                    />
                    <span className={`text-sm ${plan.highlighted ? 'text-white' : 'text-gray-300'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.a
                href={plan.isEnterprise ? '#contact' : '#'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-indigo-700 hover:bg-gray-100'
                    : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                }`}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          모든 플랜에 14일 무료 체험 포함 · 신용카드 불필요 · 언제든 해지 가능
        </motion.p>
      </div>
    </section>
  );
}
