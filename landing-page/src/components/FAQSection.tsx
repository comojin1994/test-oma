import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type Category = 'all' | 'general' | 'pricing' | 'technical' | 'security';

interface FAQItem {
  category: Exclude<Category, 'all'>;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'general',
    question: 'Hook이란 무엇인가요?',
    answer:
      'Hook은 비즈니스 성장을 가속화하는 올인원 SaaS 플랫폼입니다. 자동화, 분석, 팀 협업 기능을 통해 운영 효율을 극대화하고 매출 성장을 지원합니다.',
  },
  {
    category: 'general',
    question: '무료 체험 기간은 얼마나 되나요?',
    answer:
      '14일간 모든 기능을 무료로 체험하실 수 있습니다. 신용카드 정보 없이도 시작 가능하며, 체험 기간 종료 후 원하는 플랜을 선택하시면 됩니다.',
  },
  {
    category: 'pricing',
    question: '플랜을 언제든지 변경할 수 있나요?',
    answer:
      '네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경 사항은 다음 결제 주기부터 적용됩니다. 업그레이드 시에는 즉시 적용되며 차액은 일할 계산됩니다.',
  },
  {
    category: 'pricing',
    question: '연간 결제 시 할인은 어떻게 되나요?',
    answer:
      '연간 결제 시 월간 결제 대비 약 20% 할인됩니다. Starter 플랜은 월 ₩24,000, Professional 플랜은 월 ₩65,000으로 이용하실 수 있습니다.',
  },
  {
    category: 'technical',
    question: '다른 서비스와 연동이 가능한가요?',
    answer:
      '네, 100개 이상의 외부 서비스와 연동을 지원합니다. Slack, Notion, Google Workspace, Salesforce, HubSpot 등 주요 비즈니스 도구와 API로 연결할 수 있습니다.',
  },
  {
    category: 'technical',
    question: '데이터 마이그레이션은 어떻게 하나요?',
    answer:
      '기존 시스템에서의 데이터 이전을 위한 마이그레이션 도구와 전담 지원을 제공합니다. CSV 임포트, API 연동, 전담 마이그레이션 팀 지원 중 선택하실 수 있습니다.',
  },
  {
    category: 'security',
    question: '데이터 보안은 어떻게 보장되나요?',
    answer:
      'AES-256 암호화, SOC 2 Type II 인증, ISO 27001 인증을 보유하고 있습니다. 모든 데이터는 한국 및 글로벌 데이터센터에서 안전하게 관리되며 GDPR을 준수합니다.',
  },
  {
    category: 'security',
    question: 'GDPR 및 개인정보보호법을 준수하나요?',
    answer:
      '네, GDPR(유럽 일반 데이터 보호 규정)과 한국 개인정보보호법을 완전히 준수합니다. 데이터 처리 동의, 삭제 요청, 데이터 이식성 등 모든 권리를 보장합니다.',
  },
];

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'general', label: '일반' },
  { value: 'pricing', label: '가격' },
  { value: 'technical', label: '기술' },
  { value: 'security', label: '보안' },
];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = FAQS.filter(
    (faq) => activeCategory === 'all' || faq.category === activeCategory
  );

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setOpenIndex(null);
  };

  return (
    <section id="faq" className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
            자주 묻는 질문
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            궁금한 점이 있으신가요?
          </h2>
          <p className="text-gray-400 text-lg">가장 많이 묻는 질문들을 모았습니다</p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
          role="tablist"
          aria-label="FAQ 카테고리"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={activeCategory === cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                activeCategory === cat.value
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <motion.div
              key={`${activeCategory}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-xl bg-gray-800/50 border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => handleToggle(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggle(i);
                  }
                }}
                aria-expanded={openIndex === i}
                className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
              >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-400 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
