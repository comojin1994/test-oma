import { motion } from 'framer-motion';

const CLIENTS = [
  { name: 'TechCorp', abbr: 'TC', color: 'from-blue-500 to-blue-700' },
  { name: 'ScaleUp', abbr: 'SU', color: 'from-green-500 to-emerald-700' },
  { name: 'InnoLab', abbr: 'IL', color: 'from-purple-500 to-purple-700' },
  { name: 'DataFlow', abbr: 'DF', color: 'from-cyan-500 to-cyan-700' },
  { name: 'CloudBase', abbr: 'CB', color: 'from-indigo-500 to-indigo-700' },
  { name: 'FastGrow', abbr: 'FG', color: 'from-orange-500 to-orange-700' },
  { name: 'SmartOps', abbr: 'SO', color: 'from-pink-500 to-rose-700' },
  { name: 'BuildUp', abbr: 'BU', color: 'from-teal-500 to-teal-700' },
  { name: 'NextScale', abbr: 'NS', color: 'from-violet-500 to-violet-700' },
  { name: 'ProTeam', abbr: 'PT', color: 'from-amber-500 to-amber-700' },
];

// Duplicate for seamless infinite scroll
const MARQUEE = [...CLIENTS, ...CLIENTS];

export function ClientLogosSection() {
  return (
    <section
      className="relative py-16 bg-gray-900 border-y border-white/5 overflow-hidden"
      aria-label="고객사 로고"
    >
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-gray-500 text-sm uppercase tracking-widest font-medium"
        >
          12,000+ 기업이 Hook을 신뢰합니다
        </motion.p>
      </div>

      {/* Infinite marquee */}
      <div className="relative overflow-hidden">
        {/* Fade gradients on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-6 w-max"
        >
          {MARQUEE.map((client, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-800/60 border border-white/8 whitespace-nowrap flex-shrink-0"
            >
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${client.color} flex items-center justify-center text-white text-xs font-bold`}
              >
                {client.abbr}
              </div>
              <span className="text-gray-300 font-medium text-sm">{client.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
