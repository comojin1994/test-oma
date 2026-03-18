import { motion } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

const NAV_LINKS = [
  { label: '소개', href: '#hero' },
  { label: '특징', href: '#features' },
  { label: '성과', href: '#stats' },
  { label: '시작하기', href: '#cta' },
];

export function Navbar() {
  const { scrollY } = useScrollProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = scrollY > 50;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-glass py-3 shadow-lg shadow-black/20' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#hero"
          className="flex items-center gap-2 text-white font-bold text-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-gradient">Hook</span>
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
              whileHover={{ y: -2 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold glow-indigo"
          >
            무료 시작
          </motion.a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-glass border-t border-white/10 px-6 py-4"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="block mt-4 text-center px-4 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            무료 시작
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
